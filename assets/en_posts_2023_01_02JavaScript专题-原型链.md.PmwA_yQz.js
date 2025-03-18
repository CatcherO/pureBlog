import{_ as i,c as a,o as n,ar as t}from"./chunks/framework.Dw9xXWbv.js";const d=JSON.parse('{"title":"JavaScript 专题-原型链","description":"","frontmatter":{"title":"JavaScript 专题-原型链","date":"2023-01-02T00:00:00.000Z","tags":["JavaScript","原型链","原型","原型继承","原型链继承"]},"headers":[],"relativePath":"en/posts/2023/01/02JavaScript专题-原型链.md","filePath":"en/posts/2023/01/02JavaScript专题-原型链.md","lastUpdated":1742015773000}'),p={name:"en/posts/2023/01/02JavaScript专题-原型链.md"};function h(l,s,e,k,r,o){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="javascript-专题-原型链" tabindex="-1">JavaScript 专题-原型链 <a class="header-anchor" href="#javascript-专题-原型链" aria-label="Permalink to &quot;JavaScript 专题-原型链&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>在这篇文章中，笔者深入探讨了 JavaScript 中的原型链及其相关概念。首先，原型（<code>prototype</code>）被定义为每个构造函数的内置属性，允许实例共享属性和方法。通过示例，笔者展示了如何创建构造函数及其原型对象，并解释了实例如何通过内部指针<code>[[Prototype]]</code>访问原型上的属性和方法。接着，笔者详细描述了原型链的概念，强调每个对象都有指向其原型的指针，形成层级关系。</p><p>值得注意的是，原型对象中的<code>constructor</code>属性并不总是可靠的类型判断工具，因为其可能被覆盖。文章最后，笔者提供了一些参考资料，鼓励读者深入理解原型和原型链的机制。这一系列内容不仅加深了对 JavaScript 的理解，也为更复杂的概念打下了基础。</p><blockquote><p>此专题系列为又一次重新阅读了《高程 4》后，对 JavaScript 重难点进行了梳理，希望能融会贯通，加深印象，更进一步...</p></blockquote><h2 id="原型定义" tabindex="-1">原型定义 <a class="header-anchor" href="#原型定义" aria-label="Permalink to &quot;原型定义&quot;">​</a></h2><blockquote><p>这里通过多方面对原型进行描述，因为其实大家多多少少都接触过原型相关的知识，不理解可能只需要某句话就能点破，希望对你有所帮助。</p></blockquote><p><strong>原型<code>prototype</code>其实就是每个构造函数的一个内置属性</strong>，或者说每个函数都有这样一个属性，毕竟所有函数都可以做构造函数，当然箭头函数除外，那只是 JS 简化一些写法的机制，与普通函数有一定区别。任何时候我们在创建一个普通函数时，都会按照特定的规则为这个函数创建一个<code>prototype</code>属性，所以我们可以访问它。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;exec...&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.city </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Beijing&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">skill</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;coding...&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>这个<code>prototype</code>属性是一个对象</strong>，这个原型对象上的属性和方法都可以被对应的构造函数创建的实例所共享，这点也是原型最重要的性质之一。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Justin3go&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;XXX&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.name, p2.name);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.city, p2.city);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">skill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">skill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><pre><code>exec... 
exec... 
Justin3go XXX 
Beijing Beijing
coding...
coding...
</code></pre><blockquote><p><strong>值得注意</strong>的是，实例并没有<code>prototype</code>属性，只有构造函数拥有该属性。如果你了解<code>new</code>操作符的过程的话可能对此比较清楚，它只是在实例化的过程中会把构造函数的<code>prototype</code>赋值给实例的一个内部特性指针<code>[[Prototype]]</code>上，然后浏览器会在每个实例对象上暴露<code>__proto__</code>执行访问操作。后续 ES6 才规范了<code>Object.getPrototype()</code>方法访问原型</p></blockquote><p>我们可以把原型对象作为每个相关实例的上层作用域，通俗来说就是实例上没有的变量名，会往上层作用域找，这里就是先找的自己的原型对象里面是否包含该变量名；既然是作用域，当实例上包含和原型同名的方法或属性时，访问的就只会是实例自己定义的了，这就是常说的覆盖。</p><p>这个原型对象中除了自定义的属性和方法，还有就是一个特殊的属性叫做<code>constructor</code>，其指向构造函数。这样，所有的实例都可以访问该属性从而获取自己的构造函数了</p><h2 id="深入理解原型" tabindex="-1">深入理解原型 <a class="header-anchor" href="#深入理解原型" aria-label="Permalink to &quot;深入理解原型&quot;">​</a></h2><p>这里我们再来梳理一下这个过程：</p><ol><li>首先我们创建了一个构造函数想要去生成一些实例对象</li><li>JS 会自动给这个构造函数生成一个原型对象</li><li>然后我们基于原型的特性把想要共享的属性和方法添加到了构造函数的原型上</li><li>之后我们实例化的时候会将构造函数的原型对象赋值给实例对象中的内部指针，注意赋值不是复制，只是指向，实例和构造函数的原型都是一个</li><li>然后我们访问实例对象中的属性，发现实例本身没有，就会自动去找原型上的</li></ol><p><img src="https://oss.justin3go.com/blogs/%E5%8E%9F%E5%9E%8B%E9%93%BEdemo%E7%9A%84%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B.png" alt=""></p><p>然后在这个例子中，我们再来梳理一下关于构造函数、实例、原型的一个关系，下面这个图就可以非常清晰明了的表达了：</p><p><img src="https://oss.justin3go.com/blogs/%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0_%E5%AE%9E%E4%BE%8B_%E5%8E%9F%E5%9E%8B%E7%9A%84%E5%85%B3%E7%B3%BB.png" alt=""></p><h2 id="原型链" tabindex="-1">原型链 <a class="header-anchor" href="#原型链" aria-label="Permalink to &quot;原型链&quot;">​</a></h2><p>在 JavaScript 中，我们都知道每个对象都有一个<code>[[Prototype]]</code>指针指向其原型对象，而原型对象也是对象，所以原型对象也包含一个<code>[[Prototype]]</code>指针指向更上一层的原型对象。这就是形成我们常说的原型链的基础。</p><p><img src="https://oss.justin3go.com/blogs/%E5%8E%9F%E5%9E%8B%E9%93%BE.png" alt=""></p><p>我们再简化一下这张图，让你对链的加深一下记忆：</p><p><img src="https://oss.justin3go.com/blogs/%E5%8E%9F%E5%9E%8B%E9%93%BE%E7%AE%80%E7%89%88.png" alt=""></p><h2 id="关于原型对象中的constructor属性" tabindex="-1">关于原型对象中的<code>constructor</code>属性 <a class="header-anchor" href="#关于原型对象中的constructor属性" aria-label="Permalink to &quot;关于原型对象中的\`constructor\`属性&quot;">​</a></h2><p>这里说说我们经常见到的一个问题就是为什么不要使用对象的<code>constructor</code>属性来判断该对象属于哪类：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arr1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr1.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Array);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Person);</span></span></code></pre></div><pre><code>true
true
</code></pre><p><code>constructor</code>虽然可以拿来判断类型，但是不是百分百准确的，比如如果创建一个对象来改变它的原型，<code>constructor</code>就不能用来判断数据类型了</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){};</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	skill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;coding...&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	city: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;beijing&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Person);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p1.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><pre><code>false
[Function: Object]
</code></pre><p>这是因为我们是以对象字面量<code>{}</code>来直接对原型进行赋值的，而之前是通过点操作符增加属性的，前者是完全覆盖，所以原型改变了，而<code>{}</code>是<code>Object()</code>的简化方式，所以此时该原型的<code>constructor</code>就等于<code>Object</code>了，所以这里就是<code>false</code>了</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li>《JavaScript 高级程序设计》(第 4 版)</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain</a></li></ul>`,36)]))}const c=i(p,[["render",h]]);export{d as __pageData,c as default};
