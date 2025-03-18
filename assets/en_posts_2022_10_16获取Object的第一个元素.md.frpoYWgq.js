import{_ as i,c as a,o as t,ar as e}from"./chunks/framework.Dw9xXWbv.js";const o=JSON.parse('{"title":"获取 Object 的第一个元素","description":"","frontmatter":{"title":"获取 Object 的第一个元素","date":"2022-10-16T00:00:00.000Z","tags":["JavaScript","Object","解构","ES6"]},"headers":[],"relativePath":"en/posts/2022/10/16获取Object的第一个元素.md","filePath":"en/posts/2022/10/16获取Object的第一个元素.md","lastUpdated":1742015773000}'),n={name:"en/posts/2022/10/16获取Object的第一个元素.md"};function l(h,s,p,k,r,E){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="获取-object-的第一个元素" tabindex="-1">获取 Object 的第一个元素 <a class="header-anchor" href="#获取-object-的第一个元素" aria-label="Permalink to &quot;获取 Object 的第一个元素&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>在这篇文章中，笔者探讨了如何从一个 JavaScript 对象中获取第一个元素。由于对象的属性是无序的，笔者指出，使用<code>Object.keys</code>和<code>for in</code>方法时，迭代的顺序并不总是符合预期。为了解释这一点，笔者总结了对象属性迭代的规律：</p><ol><li>数字或字符串形式的数字作为键时，按升序排序。</li><li>普通字符串类型的键按定义顺序输出。</li><li>Symbols 与字符串类型的规则相同。</li><li>如果存在三种类型的键，优先顺序为数字键 -&gt; 字符串键 -&gt; Symbol 键。</li></ol><p>根据这些规则，笔者提出可以通过解构赋值的方式优雅地获取对象的第一个元素，从而满足实际业务需求。最后，文章附上了相关的参考链接，供读者深入了解对象属性的迭代顺序。</p><hr><blockquote><p>目前遇到个业务需要获取 Object 中的第一个元素，具体背景这里不详细介绍，如果将数据改为数组的形式改动量较大，需要改接口定义层面，所以这里简单偷个懒</p></blockquote><h2 id="object-中的键值迭代是无序的" tabindex="-1">Object 中的键值迭代是无序的 <a class="header-anchor" href="#object-中的键值迭代是无序的" aria-label="Permalink to &quot;Object 中的键值迭代是无序的&quot;">​</a></h2><p>JS 基础中的知识，也经常在一些八股文中看到就是<code>Map</code>和<code>Object</code>中的区别之一就是 Object 中的属性是无序的，而 Map 中的属性是有序的，那我们如何保证我们通过<code>Object.keys</code>等方法和<code>for in</code>方法迭代的第一个属性是我们预期的第一个呢？</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sym</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;foo&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    a: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;123&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    b: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;456&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    c: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;789&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;111&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;222&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;333&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">keys</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">values</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj));</span></span></code></pre></div><pre><code>[ &#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;a&#39;, &#39;b&#39;, &#39;c&#39; ]
[ &#39;111&#39;, &#39;222&#39;, &#39;333&#39;, &#39;123&#39;, &#39;456&#39;, &#39;789&#39; ]
</code></pre><p>可以看到这个顺序并不是我们实际定义的顺序，实际情况可能比上述情况更加复杂，所以一般来说都说 Obect 内部属性的顺序是无序的。</p><h2 id="object-中的键值迭代是有规律的" tabindex="-1">Object 中的键值迭代是有规律的 <a class="header-anchor" href="#object-中的键值迭代是有规律的" aria-label="Permalink to &quot;Object 中的键值迭代是有规律的&quot;">​</a></h2><p>这就需要我们我们去确定对象迭代的内部机制是什么，这里直接说结论，具体过程可以参考<a href="https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/" target="_blank" rel="noreferrer">这篇文章</a>和<a href="https://juejin.cn/post/6932494622661083150" target="_blank" rel="noreferrer">这篇文章</a></p><ol><li>数字或者字符串类型的数字当作 key 时，输出是按照升序排序的</li><li>普通的字符串类型的 key，就按照定义的顺序输出</li><li>Symbols 也是和字符串类型的规则一样</li><li>如果是三种类型的 key 都有，那么顺序是 1 -&gt; 2 -&gt; 3</li></ol><p>我这里主要考虑我的业务场景，根据上述结论，也就是说我们只要 key 是字符串，那么其遍历顺序就是我们定义的顺序，这就符合我们的需求了</p><h2 id="回到主题-获取第一个元素" tabindex="-1">回到主题：获取第一个元素 <a class="header-anchor" href="#回到主题-获取第一个元素" aria-label="Permalink to &quot;回到主题：获取第一个元素&quot;">​</a></h2><p>最后，就是获取对象的第一个元素了，这里就不使用什么<code>for</code>循环再<code>break</code>了，这里可以直接使用解构优雅地获取：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	a: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;123&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	b: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;234&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	c: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;345&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line highlighted"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">firstItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Object.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">values</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这里</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(firstItem);</span></span></code></pre></div><pre><code>123
</code></pre><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6932494622661083150" target="_blank" rel="noreferrer">https://juejin.cn/post/6932494622661083150</a></li><li><a href="https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/" target="_blank" rel="noreferrer">https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/</a></li></ul>`,22)]))}const c=i(n,[["render",l]]);export{o as __pageData,c as default};
