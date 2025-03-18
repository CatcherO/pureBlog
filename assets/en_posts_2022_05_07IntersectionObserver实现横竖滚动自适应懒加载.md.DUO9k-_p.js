import{_ as i,c as a,o as n,ar as t}from"./chunks/framework.Dw9xXWbv.js";const o=JSON.parse('{"title":"IntersectionObserver 实现横竖滚动自适应懒加载","description":"","frontmatter":{"title":"IntersectionObserver 实现横竖滚动自适应懒加载","date":"2022-05-07T00:00:00.000Z","tags":["IntersectionObserver","懒加载","横竖滚动","自适应"]},"headers":[],"relativePath":"en/posts/2022/05/07IntersectionObserver实现横竖滚动自适应懒加载.md","filePath":"en/posts/2022/05/07IntersectionObserver实现横竖滚动自适应懒加载.md","lastUpdated":1742015773000}'),e={name:"en/posts/2022/05/07IntersectionObserver实现横竖滚动自适应懒加载.md"};function h(k,s,l,p,r,E){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="intersectionobserver-实现横竖滚动自适应懒加载" tabindex="-1">IntersectionObserver 实现横竖滚动自适应懒加载 <a class="header-anchor" href="#intersectionobserver-实现横竖滚动自适应懒加载" aria-label="Permalink to &quot;IntersectionObserver 实现横竖滚动自适应懒加载&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>在这篇文章中，笔者分享了如何使用<code>IntersectionObserver</code>实现横竖滚动的懒加载功能，特别是在使用<code>vitepress</code>编写个人网站时遇到的需求。由于组件中可能存放大量图片，懒加载显得尤为重要。<code>IntersectionObserver</code> API 允许我们监测元素与视窗的交叉状态，从而决定何时加载该元素。</p><p>文章详细介绍了<code>IntersectionObserver</code>的构造方法及其方法，包括<code>observe</code>、<code>unobserve</code>等。笔者的思路是，首先观察容器的可见性，如果容器可见，则开始观察其中图片的可见性，这样便实现了竖向懒加载和横向懒加载的结合。通过示例代码，笔者展示了如何在<code>onMounted</code>生命周期钩子中设置这些观察器，并在图片进入视口时加载它们，最终实现了流畅的懒加载效果。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>这几天使用<code>vitepress</code><a href="https://juejin.cn/post/7160499086271971364" target="_blank" rel="noreferrer">编写个人网站的时候</a>，编写了一个存放图片的组件，理所当然的，这个组件应该实现图片懒加载，并且由于这个组件存放的图片可以是非常多的，所以实现懒加载就显得极为重要了，但是由于我实现这个组件的方式有点特别，是用盒子的背景图来存放图片的，并且支持横向滚动，所以大致搜索了下了解到了<code>IntersectionObserver</code>这个 api 非常适合我用来实现这个功能（缺点就是兼容性可能差点）；</p><h2 id="intersectionobserver-简要介绍" tabindex="-1">IntersectionObserver 简要介绍 <a class="header-anchor" href="#intersectionobserver-简要介绍" aria-label="Permalink to &quot;IntersectionObserver 简要介绍&quot;">​</a></h2><p>直接来到<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver" target="_blank" rel="noreferrer">MDN</a></p><p>介绍的比较简单，当然这个 api 使用起来也简单，但是实现的功能却可以非常丰富，这篇文章就仅仅介绍其可以实现的一种功能就是横竖滚动懒加载。</p><p>这个 api 的原理就是观察目标元素与其祖先元素或顶级文档视窗交叉状态，所以在我的例子中竖向滚动懒加载就是观察组件容器与根元素的交叉状态，而横向滚顶就是观察组件图片项与组件容器的交叉状态，这里简单提一下思路，后续通过代码详细介绍具体实现。</p><p>回到这个 api，要想使用这个 api，首先我们得使用它提供得构造器创建一个<code>IntersectionObserver</code>对象</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> io</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IntersectionObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(callback, options)</span></span></code></pre></div><p>这个对象接收两个参数：</p><ul><li>callback: 当其监听到目标元素的可见部分穿过了一个或多个阈 (thresholds)时，会执行指定的回调函数。</li><li>options: 一些选项，比如指定 root 是谁</li></ul><p>然后这个对象有如下几个方法供我们使用：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IntersectionObserver.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">disconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使 IntersectionObserver 对象停止监听工作。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IntersectionObserver.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使 IntersectionObserver 开始监听一个目标元素。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IntersectionObserver.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">takeRecords</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回所有观察目标的 IntersectionObserverEntry 对象数组。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IntersectionObserver.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unobserve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使 IntersectionObserver 停止监听特定目标元素。</span></span></code></pre></div><p>下面是官方给的一个示例：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 无限滚动的功能（footer 出现在了视口中就加载 10 个项）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> intersectionObserver </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IntersectionObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">entries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // If intersectionRatio is 0, the target is out of view</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // and we do not need to do anything.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (entries[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].intersectionRatio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  loadItems</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Loaded new items&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// start observing</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">intersectionObserver.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.scrollerFooter&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span></code></pre></div><p>其中<code>entries</code>是一个数组，每个成员都是一个<a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry" target="_blank" rel="noreferrer"><code>IntersectionObserverEntry</code></a>对象，我们每次<code>.observe(element)</code>时，<code>entries</code>里就会多一个对应的项，相当于如果我们要观察多个目标元素，就需要在回调函数里进行统一处理。 介绍两个我们要用的<code>IntersectionObserverEntry</code>对象属性：</p><ul><li><code>target</code>：被观察的目标元素，是一个 DOM 节点对象</li><li><code>intersectionRatio</code>：目标元素的可见比例，即<code>intersectionRect</code>占<code>boundingClientRect</code>的比例，完全可见时为<code>1</code>，完全不可见时小于等于<code>0</code></li></ul><h2 id="many-pictures-组件介绍" tabindex="-1">many-pictures 组件介绍 <a class="header-anchor" href="#many-pictures-组件介绍" aria-label="Permalink to &quot;many-pictures 组件介绍&quot;">​</a></h2><p>这是我自己编写的一个小组件，用来存放多张图片的容器，下面是它的样子</p><p><img src="https://oss.justin3go.com/blogs/demo-many-pictures.gif" alt="demo-many-pictures"></p><p>目前在多个容器同时使用的话动画上会有卡顿，后续优化，但不妨碍我们讲解懒加载这个功能的实现。</p><p>可以看到如果我们在同一个页面中使用多次这个组件，或者这个组件放在其他内容的下面，初始加载消耗的实现就会特别大，比如我们这个页面使用了 100 个这个容器，就需要在页面初始时加载这个用户看不见的容器，这显然是不可行的，这就是我们平常所见的图片懒加载</p><p>如果我们这里使用<code>windows.onscroll</code>的那种懒加载方法的话，虽然可以，但是这是个全局方法，我并不是很想在我这个局部组件中使用它，而且它还需要进行节流操作，每次还要去获取图片距离顶部的高度，视窗的高度，滚动的距离等等，比较麻烦</p><p>而使用这个新的 api 的话一切都迎刃而解了...</p><p>其次，我们可以看到每个容器中也可以容纳多张图片，当这个容器中容纳了 100 张图片的时候，在这个容器加载的时候，就需要加载这个容器中包含的所有的 100 张图片，即使用户看不见右边没显示的图片，这显然是不合理的，所以这就是我们将要做的横向滚动懒加载</p><h2 id="自适应懒加载实现" tabindex="-1">自适应懒加载实现 <a class="header-anchor" href="#自适应懒加载实现" aria-label="Permalink to &quot;自适应懒加载实现&quot;">​</a></h2><p>所以，到现在，我们手头上有了<code>IntersectionObserver</code>这个工具，然后需求就是实现容器的竖向懒加载和图片的横向懒加载。</p><p>确定思路：我们首先观察容器与视窗是否有交叉（是否显示给了用户），如果显示了就开始加载这个容器，这个加载容器的意思就是开始观察图片，然后就是观察图片与这个容器是否有交叉，如果有，就加载这个图片 <img src="https://oss.justin3go.com/blogs/lazy.png" alt=""> 思路有了，代码就简单了，下面贴了对应代码的实现，当然你也可以直接访问这个组件实现的 github 链接查看所有的代码(<a href="https://github.com/Justin3go/many-pictures" target="_blank" rel="noreferrer">源码链接</a>)</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onMounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (props.lazy) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 图片</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ioImg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IntersectionObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">entries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        entries.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (entry.intersectionRatio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 是否出现在了可视区域</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> option</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> entry.target;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // 图片链接放在这个属性上的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> imgUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> option.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;data-img&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          option.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`background-image: url(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">imgUrl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">})\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ioImg.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unobserve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(option);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        root: mark.value, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 横向懒加载</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    );</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 容器</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ioContainer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IntersectionObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">entries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      entries.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">entry</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (entry.intersectionRatio </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> container</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> entry.target;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> container.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelectorAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.option&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ioImg.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(item);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        isLoad.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ioContainer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unobserve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(container);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ioContainer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(mark.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NodeListOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mark.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelectorAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.option&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> imgUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;data-img&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      item.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`background-image: url(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">imgUrl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">})\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>最后，效果图如下： <img src="https://oss.justin3go.com/blogs/demo-many-pictures.gif" alt="demo-many-pictures"></p>`,33)]))}const g=i(e,[["render",h]]);export{o as __pageData,g as default};
