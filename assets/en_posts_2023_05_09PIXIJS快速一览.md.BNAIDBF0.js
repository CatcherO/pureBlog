import{_ as i,c as a,o as t,ar as e}from"./chunks/framework.Dw9xXWbv.js";const o=JSON.parse('{"title":"PIXIJS 快速一览","description":"","frontmatter":{"title":"PIXIJS 快速一览","date":"2023-05-09T00:00:00.000Z","tags":["PIXIJS","游戏开发","动画效果","前端开发","渲染引擎"]},"headers":[],"relativePath":"en/posts/2023/05/09PIXIJS快速一览.md","filePath":"en/posts/2023/05/09PIXIJS快速一览.md","lastUpdated":1742015773000}'),h={name:"en/posts/2023/05/09PIXIJS快速一览.md"};function p(n,s,l,k,r,d){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="pixijs-快速一览" tabindex="-1">PIXIJS 快速一览 <a class="header-anchor" href="#pixijs-快速一览" aria-label="Permalink to &quot;PIXIJS 快速一览&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>笔者在这篇文章中介绍了 PIXIJS，一个快速、轻量、开源的渲染引擎，适合前端开发者用于创建小游戏和动画效果。文章强调 PIXIJS 并非一个完整的游戏开发框架，而是专注于图像和动画的呈现。笔者通过简单的示例代码说明了 PIXIJS 的基本构建块，包括应用舞台、精灵、容器和纹理等。</p><p>此外，笔者阐述了容器的角色，它帮助组织舞台中的对象，提供了遮罩和滤镜功能。对于图形的创建，笔者提供了示例代码，并提醒开发者在使用后注意卸载以避免内存泄漏。文章还提到交互和文本处理的基本知识，强调性能优化的重要性。最后，笔者鼓励读者通过实践来深化对 PIXIJS 的理解，并欢迎反馈以改进自己的学习。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>还记得我们最开始选择计算机专业的时候，是多少人抱着做一个游戏的初心选择这个专业的。结果一进去就跟随大众方向做了软件开发，然后就没然后了。</p><p>所以，最近稍微空闲下来了，就想着自己做一个小游戏出来玩玩或者说练练手。自己作为前端开发，所以就没必要单独学习 Unity 或者说虚幻引擎这类的工具了。就直接找个 webGL 相关的游戏引擎来用用吧，然后我就发现了 PIXIJS，感觉不错，我们一起来学学它。</p><p>作为前端，<a href="https://pixijs.com/gallery/" target="_blank" rel="noreferrer">学了它不仅可以做一个小游戏，以后做一些有意思的动画效果也可以用到它</a>，可谓是一举多得，该学！</p><blockquote><p>注：本文为 PIXI 入门教程，不会深入</p></blockquote><h2 id="是什么" tabindex="-1">是什么 <a class="header-anchor" href="#是什么" aria-label="Permalink to &quot;是什么&quot;">​</a></h2><p>官网原文：<a href="https://pixijs.io/guides/basics/what-pixijs-is.html" target="_blank" rel="noreferrer">PixiJS 是什么</a></p><p>笔者感觉的主要特点就是：</p><ol><li>快</li><li>轻量</li><li>开源</li></ol><p>软件开发中一个非常重要的思想就是“小而美 ”，当然原话笔者忘了，这是现在笔者想到的最符合这个意思的一句话。</p><blockquote><p>有所为，有所不为，即找准边界</p></blockquote><p>就好比 UNIX 的文件系统的设计理念：</p><blockquote><p>每个 Unix 文件都只是一系列字节的组合。文件内容的结构或组织方式只由处理它的程序决定，文件系统本身并不关心文件中的内容。这意味着任何程序都可以读取或写入任何文件。</p><p>每个 Unix 文件都只是一系列字节的组合。文件内容的结构或组织方式只由处理它的程序决定，文件系统本身并不关心文件中的内容。这意味着任何程序都可以读取或写入任何文件。</p></blockquote><p>回到这里，PIXI 就只是一个渲染引擎，它既不是一个框架，也不是一个游戏动画库、音频库，就好比官网中说到：</p><blockquote><p>如果您正在为您的下一个基于 Web 的项目寻找一个专注、快速和高效的渲染引擎，PixiJS 可能是一个非常合适的选择。</p><p>如果您需要一个完整的游戏开发框架，具有原生绑定和丰富的 UI 库，您可能需要探索其他选项。</p></blockquote><p>那如何理解渲染引擎这个关键词呢？简单来说：就是负责将代码中描述的图像和动画内容呈现在屏幕上的工具。</p><h2 id="最小的一个例子" tabindex="-1">最小的一个例子 <a class="header-anchor" href="#最小的一个例子" aria-label="Permalink to &quot;最小的一个例子&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">doctype</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://pixijs.download/release/pixi.min.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 创建应用并插入 DOM</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> app </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Application</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">640</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">360</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      document.body.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">appendChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(app.view);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 创建图像对象并放入应用中</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sprite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.Sprite.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;sample.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      app.stage.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sprite);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      app.ticker.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">delta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// 动画处理，比如平移</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>好，到现在你应该记住一个基本的 PIXI 例子应该有：</p><ul><li><a href="https://pixijs.io/guides/basics/scene-graph.html" target="_blank" rel="noreferrer">应用舞台(<code>app.stage</code>)</a></li><li><a href="https://pixijs.io/guides/basics/sprites.html" target="_blank" rel="noreferrer">跳舞的精灵(如<code>sprite</code>)</a></li><li><a href="https://pixijs.io/guides/basics/render-loop.html" target="_blank" rel="noreferrer">音乐节奏(<code>ticker</code>)</a></li></ul><h2 id="容器-container" tabindex="-1">容器(Container) <a class="header-anchor" href="#容器-container" aria-label="Permalink to &quot;容器(Container)&quot;">​</a></h2><p>当舞台中跳舞的人多了之后，分队(分组)就显得很有必要了。<code>Container</code>就是扮演这样一个角色。有了它，舞台中就形成了类似于 DOM 树的结构了，<code>app.stage</code>作为根节点。</p><blockquote><p>几乎每种类型的显示对象也都派生自 <code>Container</code></p></blockquote><p>比如上述中的<code>sprite</code>也继承于它，但为什么不用<code>sprite</code>来分组呢？想想<code>sprite</code>还实现了许多特定领域的方法和属性，虽然也可以作为<code>container</code>来使用，但是不是成了炮弹打蚊子了呢？浪费！</p><p>除分组功能之外，<code>container</code>还有以下两个常见作用：</p><ul><li>遮罩：PS 里面的蒙版，前端里面的<code>overflow: hidden</code>；值得注意的是，那些继承于<code>container</code>的对象肯定也有这个属性(功能)，比如<code>Graphics</code>创建几何图形作为几何遮罩等等；</li><li>滤镜：比如模糊效果，通过在容器上设置过滤器，容器包含的屏幕区域都会有这个滤镜效果。</li></ul><h2 id="纹理-textures" tabindex="-1">纹理(Textures) <a class="header-anchor" href="#纹理-textures" aria-label="Permalink to &quot;纹理(Textures)&quot;">​</a></h2><p>简单来说就是某片屏幕区域的像素源，比如常见的就是加载一个图像作为该屏幕的像素源。</p><p>加载过程：<code>Source Image</code> &gt; <code>Loader</code> &gt; <code>BaseTexture</code> &gt; <code>Texture</code></p><p>解释一下几个关键词：</p><p><code>Loader</code>：提供了用于异步加载图像和音频文件等资源的工具，而后面两个听名字你应该就知道是啥关系了：</p><ul><li><code>BaseTexture</code>是一个低级别的纹理数据源，它定义了一个纹理的加载和处理方式，并提供了一些用于控制纹理属性、缓存处理、加载管理和镜像等操作的方法。<code>BaseTexture</code>实例通常包含一张或多张纹理图像的数据信息，这些图像可以是来自于网络的 URL，也可以是 Canvas 画布或者图片资源等。</li><li>而<code>Texture</code>则是<code>BaseTexture</code>的高级封装，它包含一个或多个用于渲染的纹理，同时也具有基于<code>BaseTexture</code>的镜像、缩放、平移等变换操作。<code>Texture</code>类提供了许多有用的方法和属性，比如调整纹理的尺寸、获取纹理的 UV 贴图、设置填充模式等等。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> baseTexture</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.BaseTexture.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./textures/game.png&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> texture</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Texture</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  baseTexture,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Rectangle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">75</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">88</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sprite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sprite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Texture);</span></span></code></pre></div><p>注意：不常用的纹理记得手动卸载<code>destory()</code>。</p><h2 id="图形-graphics" tabindex="-1">图形(Graphics) <a class="header-anchor" href="#图形-graphics" aria-label="Permalink to &quot;图形(Graphics)&quot;">​</a></h2><p>就是创建所谓直线、矩形、圆形、贝塞尔曲线能你能想到的图形；</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. 先创建结构</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Graphics</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beginFill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0xff0000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">drawRect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. 后添加</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.stage.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj);</span></span></code></pre></div><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230509102112.png" alt=""></p><p><a href="https://pixijs.io/examples/#/graphics/simple.js" target="_blank" rel="noreferrer">你可以在这里找到绘制这些图形的代码</a></p><p>同样需要注意卸载<code>destory()</code>，PIXI 并不会自动回收。</p><h2 id="互动" tabindex="-1">互动 <a class="header-anchor" href="#互动" aria-label="Permalink to &quot;互动&quot;">​</a></h2><blockquote><p><a href="https://pixijs.download/release/docs/PIXI.DisplayObject.html" target="_blank" rel="noreferrer">DisplayObject</a>是引擎可以呈现的任何内容的核心类。它是精灵、文本、复杂图形、容器等的基类，并为这些对象提供许多通用功能。如移动、缩放、旋转和组合等</p></blockquote><p>任何<code>DisplayObject</code>派生对象（<code>Sprite</code>、<code>Container</code> 等）都可以通过将其<code>interactive</code>属性设置为<code>true</code>来实现交互，比如对某个图片监听点击事件：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sprite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.Sprite.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/some/texture.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); sprite.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;pointerdown&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;clicked!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); });</span></span></code></pre></div><p>默认情况下，PixiJS 使用交互式对象的边界矩形来确定鼠标或触摸事件是否“点击”了该对象。有时候，比如我们需要对一个复杂的图形创建点击区域，并只想记录该形状内的点击，就需要<a href="https://pixijs.download/release/docs/PIXI.AnimatedSprite.html#hitArea" target="_blank" rel="noreferrer">DisplayObject 的 hitArea 属性</a></p><p>除此之外，你还可以通过<code>hitTest</code>在某一区域寻找可交互对象，用来做碰撞检测比较合适：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> globalPt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PIXI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> app.renderer.plugins.interaction.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hitTest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(globalPt);</span></span></code></pre></div><p>注意：前端中有事件捕获和事件冒泡等阶段，而这里也是树结构，所以如果您的容器或其他对象具有您知道永远不会交互的复杂子树，则可以将<code>interactiveChildren</code>属性设置为<code>false</code>，命中测试算法将在检查悬停和单击事件时跳过这些子树。</p><h2 id="文本-text" tabindex="-1">文本(Text) <a class="header-anchor" href="#文本-text" aria-label="Permalink to &quot;文本(Text)&quot;">​</a></h2><p>没啥说的，就创建文本对象，然后文本对象有一些常见的样式属性，这对于前端程序员来说一点也不陌生。</p><p>官网中提到有一些注意的地方：</p><blockquote><p>首先，更改现有文本字符串需要重新生成该文本的内部渲染，这是一个缓慢的操作，如果您每帧更改许多文本对象，可能会影响性能。如果您的项目需要同时在屏幕上显示大量经常更改的文本，请考虑使用 <a href="https://pixijs.download/release/docs/PIXI.BitmapText.html" target="_blank" rel="noreferrer">PIXI.BitmapText 对象</a>，该对象使用固定的位图字体，当文本更改时不需要重新生成。</p><p>其次，缩放文本时要小心。将文本对象的比例设置为 &gt; 1.0 将导致模糊/像素显示，因为文本不会以看起来清晰所需的更高分辨率重新呈现 - 它仍然与生成时的分辨率相同。为了解决这个问题，您可以改为以更高的初始尺寸和缩小比例进行渲染。这将使用更多内存，但会让您的文本始终看起来清晰明快。</p></blockquote><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>本文主要叙述了 PIXI 作为渲染引擎包含三种基本的要素：</p><ol><li>场景，根节点就是<code>app.stage</code></li><li>里面的对象，如<code>Container</code>、<code>Sprite</code>、<code>Graphics</code>、<code>Text</code>等等</li><li>时间线<code>Ticker</code>，每一帧该做什么</li></ol><p>本文没有讲述例子，但程序员的学习肯定少不了实践，官网这里有非常多了<a href="https://pixijs.io/examples/#/demos-basic/container.js" target="_blank" rel="noreferrer">入门教程示例</a></p><p>好，没了，休息休息~</p><p>笔者目前也是作为 PIXI 的新手，如果上述中有一些理解不到位或者说错误的地方，欢迎友善指出</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://pixijs.io/guides/" target="_blank" rel="noreferrer">PIXI 官网 Guides</a></li></ul>`,64)]))}const g=i(h,[["render",p]]);export{o as __pageData,g as default};
