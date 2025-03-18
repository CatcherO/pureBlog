import{_ as o,c as t,o as a,ar as d}from"./chunks/framework.Dw9xXWbv.js";const u=JSON.parse('{"title":"Node 内存控制","description":"","frontmatter":{"title":"Node 内存控制","date":"2022-06-11T00:00:00.000Z","tags":["Node.js","V8","内存","垃圾回收","内存泄漏","深入浅出 NodeJS"]},"headers":[],"relativePath":"en/posts/2022/06/11Node内存控制.md","filePath":"en/posts/2022/06/11Node内存控制.md","lastUpdated":1742015773000}'),c={name:"en/posts/2022/06/11Node内存控制.md"};function r(p,e,s,l,i,n){return a(),t("div",null,e[0]||(e[0]=[d('<h1 id="node-内存控制" tabindex="-1">Node 内存控制 <a class="header-anchor" href="#node-内存控制" aria-label="Permalink to &quot;Node 内存控制&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>在重新阅读《深入浅出 NodeJS》的过程中，我深入了解了 Node.js 的内存控制机制。Node.js 基于 V8 引擎，其内存使用受到限制，64 位系统约为 1.4GB，32 位系统约为 0.7GB，尽管物理内存可能更大。这是由于 V8 的垃圾回收机制设计，旨在优化性能，避免长时间的停顿。</p><p>我学习了 V8 的内存管理是通过分代垃圾回收机制进行的，包括新生代和老生代两部分。新生代使用 Scavenge 算法，快速回收短生命周期对象；老生代则结合 Mark-Sweep 和 Mark-Compact 算法，清理长生命周期对象。全停顿问题促使了增量标记等优化策略的出现，进一步提高了应用的响应能力。此外，内存泄漏的常见原因包括缓存未过期、队列消费不及时及作用域未释放，理解这些有助于我在实际开发中更好地监控和管理内存。</p><hr><blockquote><p>这是重新阅读《深入浅出 NodeJS》的相关笔记，这次阅读发现自己依旧收获很多，而第一次阅读的东西也差不多忘记完了，所以想着这次过一遍脑子，用自己的理解输出一下，方便记忆以及以后回忆...</p></blockquote><h2 id="基本介绍" tabindex="-1">基本介绍 <a class="header-anchor" href="#基本介绍" aria-label="Permalink to &quot;基本介绍&quot;">​</a></h2><p>说到<code>node</code>对于内存的控制，可能最先想到的就是<code>node</code>是基于 V8 构建，因此在<code>node</code>中通过<code>JavaScript</code>使用内存时就会发现只能使用部分内存（64 位系统约为 1.4GB，32 位系统约为 0.7GB）。在这样的限制下，将会导致<code>node</code>无法直接操作大内存对象，即使你本机的物理内存有 32GB 也不行，这与我们传统上的认知形成了一定的差别，接下来先解释一下为什么有这样的差别：</p><blockquote><p>注：64 位系统约为 1.4GB，32 位系统约为 0.7GB 为默认，也可以用户自定义<code>--max-old-space-size</code>和<code>--max-new-space-size</code>来调整，不过只能在启动时指定，<code>node</code>无法运行中自动扩充</p></blockquote><p>首先，V8 的设计就是在浏览器的应用场景下完成的，这套内存管理机制在浏览器下使用是绰绰有余的，只是在<code>node</code>中使用有些限制，当然，也有其他方式来解决，只是不能让开发者随心所欲地使用大内存了。</p><p>其实深层原因是 V8 的垃圾回收机制的限制，每次垃圾回收都必须让<code>JavaScript</code>线程暂停，如果垃圾回收时间过长会导致应用的性能和响应能力都会直线下降，所以 V8 当时的考虑直接限制堆内存是一个好的选择；这中停顿叫做“全停顿”，V8 为此也还做了许多优化，这个后续章节会讲到</p><p>回到这一部分，介绍一个比较常见的命令：我们在<code>node</code>中输入<code>process.memoryUsage()</code>，就可以很方便地查看<code>node</code>内存使用量的相关信息：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020221107183347.png" alt=""></p><p>简单解释一下其中的含义，<a href="https://nodejs.org/docs/latest-v14.x/api/process.html#process_process_memoryusage" target="_blank" rel="noreferrer">详细参考</a></p><blockquote><p>注：V8 中的所有<code>JavaScript</code>对象都是通过堆来进行分配的</p></blockquote><ul><li><code>rss</code>：Resident Set Size，是该进程所占用的总空间量，包含所有<code>C++</code>和<code>JavaScript</code>对象和代码</li><li><code>heapTotal</code>：已经申请到的堆内存</li><li><code>heapUsed</code>：当前使用的堆内存</li><li><code>external</code>：指绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用情况</li><li><code>arrayBuffers</code>：包含的<code>Buffer</code>对象，该值包含在<code>external</code>中</li></ul><p>值得注意的是：V8 在上述变量中只负责了堆内存的分配，<code>external</code>包含的内存并不是通过 V8 管理的，所以我们在<code>external</code>中操作的东西可以不受 V8 的内存限</p><h2 id="垃圾回收机制" tabindex="-1">垃圾回收机制 <a class="header-anchor" href="#垃圾回收机制" aria-label="Permalink to &quot;垃圾回收机制&quot;">​</a></h2><p>总的来说，V8 的垃圾回收策略是基于分代式垃圾回收机制，分为新生代和老生代。其中新生代的对象为存活时间较短的对象，老生代的对象为存活时间较长的对象，这里先介绍结论，具体原因后续讲到。</p><h3 id="新生代" tabindex="-1">新生代 <a class="header-anchor" href="#新生代" aria-label="Permalink to &quot;新生代&quot;">​</a></h3><blockquote><p>新生代中主要通过 Scavenge 算法进行垃圾回收，这是典型的空间换时间的算法，会牺牲一半的存储空间，但速度较快，正好与新生代中对象的特点相对应</p></blockquote><p>该算法主要采取复制的方式进行的垃圾回收，如下图所示：</p><p><img src="https://oss.justin3go.com/blogs/%E6%96%B0%E7%94%9F%E4%BB%A3%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%9C%BA%E5%88%B6.png" alt=""></p><p>之前提到过这个算法与新生代的特点向符合，解释一下，新生代里面对象的特点就是生命周期较短，所以在下一次复制过程中存活的对象一般来说是比较少的，而这个算法是只复制存活的对象，所以时间效率上有优异的表现，同时这中将存活中的对象直接在另一半内存空间中依次排列，不会产生老生代那种算法的内存碎片问题（后续会讲到）</p><h3 id="晋升" tabindex="-1">晋升 <a class="header-anchor" href="#晋升" aria-label="Permalink to &quot;晋升&quot;">​</a></h3><p>其实一开始对象声明的时候，V8 也不知道这个对象是否生命周期较短，那它是如何判断从而将对象区分到新生代区域和老生代区域之中的呢?</p><p>答案就是本小节的标题，“晋升”：当一个对象经过多次复制依然存活时或者该对象 To 空间的占用比超出限制（一般 25%），它将会被执行晋升操作，放入到老生代区域之中（注意：只要这两个条件满足一个，就会执行晋升操作，这是个“或”条件）</p><h3 id="老生代" tabindex="-1">老生代 <a class="header-anchor" href="#老生代" aria-label="Permalink to &quot;老生代&quot;">​</a></h3><p>结合老生代的特点，V8 在老生代中主要采取了<code>Mark-Sweep</code>和<code>Mark-Compact</code>相结合的方式进行垃圾回收，就是标记清除和标记整理</p><p><strong>标记清除</strong>：</p><ul><li>标记阶段：标记活着的对象</li><li>清除阶段：清除没被标记的对象</li></ul><blockquote><p>老生代的特点就是存活时间长，即失活对象的占比一般来说是比较小的，所以这里是清除死亡的对象是合理的。而不是与新生代算法一致，复制活着的对象，并且由于老生代对象占用内存较大，所以分出一半空间来说也是不合理的</p></blockquote><p><img src="https://oss.justin3go.com/blogs/%E6%A0%87%E8%AE%B0%E6%B8%85%E9%99%A4.png" alt=""></p><p><strong>标记整理</strong>：在标记清除的基础上提出来的，在对象标记为死亡后，整理的过程中，会将活着的对象往一边移动，移动完成后，直接清理掉边界外的内存。</p><p>注意：V8 并不是直接采取标记整理的方式来管理老生代，而是通过标记清除和标记整理相结合的方式进行处理，因为它们在处理效率上有较大差别，毕竟标记清理多做了移动的操作。</p><table tabindex="0"><thead><tr><th>回收算法</th><th><code>Mark-Sweep</code></th><th><code>Mark-compact</code></th><th><code>Scavenge</code></th></tr></thead><tbody><tr><td>速度</td><td>中等</td><td>最慢</td><td>最快</td></tr><tr><td>空间开销</td><td>少（有碎片）</td><td>少（无碎片）</td><td>双倍空间（无碎片）</td></tr><tr><td>是否移动对象</td><td>否</td><td>是</td><td>是</td></tr></tbody></table><p>这种分层级处理方式在计算机中非常常见，最容易想到的就是比如速度上<code>寄存器 &gt; 内存 &gt; 外存</code>，而价格上<code>寄存器 &lt; 内存 &lt; 外存</code>，所以计算机的存储结构就采取了三级分层策略来平衡速度与价格；就像 V8 中于内存的处理是在时间和空间以及内存碎片等维度上进行平衡的。</p><p>所以在取舍中，V8 主要使用标记清除算法，在空间不足以对新生代晋升过来的对象进行分配的时候才使用标记整理算法（如下图）</p><p><img src="https://oss.justin3go.com/blogs/%E6%A0%87%E8%AE%B0%E6%95%B4%E7%90%86.png" alt=""></p><h2 id="全停顿问题" tabindex="-1">全停顿问题 <a class="header-anchor" href="#全停顿问题" aria-label="Permalink to &quot;全停顿问题&quot;">​</a></h2><p>上述中的三种基本垃圾回收算法都需要将应用逻辑（<code>JavaScript</code>执行线程）暂停下来，待执行完垃圾回收后再恢复执行应用逻辑，这样做是为了避免<code>JavaScript</code>应用逻辑与垃圾回收器看到的不一致的情况。这种行为就是文章前面提到的“全停顿”；</p><p>而且老生代通常配置得较大，且活动对象较多，全堆垃圾回收得标记、清理、整理等动作造成得停顿就会比较可怕，需要优化：</p><p>这就是“增量标记”出现的原因，具体过程就是将原本要以口气停顿完成的动作改为增量标记的方式，也就是拆分为寻多个小“步进”，每做完一个“步进”就让<code>JavaScript</code>执行一小会儿</p><p>同时还有延迟清理与增量式整理，让清理和整理的动作也变成增量式等一系列优化操作，这里不深入研究。</p><h2 id="内存泄漏" tabindex="-1">内存泄漏 <a class="header-anchor" href="#内存泄漏" aria-label="Permalink to &quot;内存泄漏&quot;">​</a></h2><p>通常造成内存泄漏的原因有这些：</p><ul><li>缓存：把内存作缓存，却没有过期策略清除，导致越来越多</li><li>队列消费不及时：生产速度远远大于消费速度，队列长度没做限制的话就会无限变大，导致内存泄漏</li><li>作用域未释放</li></ul><h2 id="内存监控及内存泄漏解决方案" tabindex="-1">内存监控及内存泄漏解决方案 <a class="header-anchor" href="#内存监控及内存泄漏解决方案" aria-label="Permalink to &quot;内存监控及内存泄漏解决方案&quot;">​</a></h2><p>TODO，功力不够，后续来补，主要是还没实践经验，这里先挖个坑。。。</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li>《深入浅出 NodeJS》</li><li><a href="https://xenojoshua.com/posts/2018/01/node-memory" target="_blank" rel="noreferrer">https://xenojoshua.com/posts/2018/01/node-memory</a></li><li><a href="https://nodejs.org/docs/latest-v14.x/api/process.html#process_process_memoryusage" target="_blank" rel="noreferrer">https://nodejs.org/docs/latest-v14.x/api/process.html#process_process_memoryusage</a></li></ul>',51)]))}const m=o(c,[["render",r]]);export{u as __pageData,m as default};
