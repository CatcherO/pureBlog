import{_ as t,c as a,o as i,ar as e}from"./chunks/framework.Dw9xXWbv.js";const d=JSON.parse('{"title":"(极简)给个人博客添加订阅功能","description":"","frontmatter":{"title":"(极简)给个人博客添加订阅功能","date":"2023-03-31T00:00:00.000Z","tags":["订阅","GitHub","Issue","邮件","个人博客","订阅功能"]},"headers":[],"relativePath":"posts/2023/03/31极简地给个人博客添加订阅功能.md","filePath":"posts/2023/03/31极简地给个人博客添加订阅功能.md","lastUpdated":1742015773000}'),o={name:"posts/2023/03/31极简地给个人博客添加订阅功能.md"};function l(p,s,r,n,h,g){return i(),a("div",null,s[0]||(s[0]=[e('<h1 id="极简-给个人博客添加订阅功能" tabindex="-1">(极简)给个人博客添加订阅功能 <a class="header-anchor" href="#极简-给个人博客添加订阅功能" aria-label="Permalink to &quot;(极简)给个人博客添加订阅功能&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>笔者今天分享了一种极简的个人博客订阅功能实现方式，主要是通过 GitHub 的 Issue 来完成。</p><p>当前主流的订阅方式包括 RSS 和邮件订阅，但笔者认为这些方法都存在一定的局限性，尤其是邮件服务的费用和功能限制。通过 GitHub，读者只需点击链接即可订阅，之后笔者在该 Issue 下评论，订阅用户便会收到通知邮件。实现方式非常简单，只需在博客中添加一行链接代码，并确保锁定该 Issue 以避免其他评论。虽然这种方法依赖于 GitHub，无法统计订阅人数，但对于追求简约的用户来说，确实是个不错的选择。笔者也鼓励读者提供更好的解决方案，期待共同探讨。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>今天给大家分享一种极简的给自己个人博客添加订阅功能的方式，就目前而言，各个个人博客的订阅方式以如下方式为主流：</p><ul><li>RSS 订阅</li><li>一些邮件订阅服务</li><li>自建服务（没必要）</li></ul><p>RSS 我基本没用过，应该前些年非常火，了解了一下好像也不是很通用，如果读者没有使用 RSS 的习惯的话，比如笔者自己就不怎么使用这类产品。</p><p>而笔者基本上是通过邮件获取对于其他文章的订阅的，但如果想要在自己的博客给读者添加邮件订阅的功能，就需要去买相关的邮件服务，对这方面的花费笔者感觉不值当，并且限制也多，如下是 mailchimp 的费用与功能对应关系：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331145753.png" alt=""></p><p>然后今天在突然收到 github 发送的邮件之后（是一封订阅了某仓库 Issue 的邮件），似乎有了一定的灵感...</p><h2 id="效果演示" tabindex="-1">效果演示 <a class="header-anchor" href="#效果演示" aria-label="Permalink to &quot;效果演示&quot;">​</a></h2><p>话不多说，先上效果！</p><h3 id="读者订阅" tabindex="-1">读者订阅 <a class="header-anchor" href="#读者订阅" aria-label="Permalink to &quot;读者订阅&quot;">​</a></h3><p><strong>1）点击订阅链接跳转</strong>，笔者博客：<a href="https://justin3go.com" target="_blank" rel="noreferrer">justin3go.com</a> 欢迎订阅笔者的月刊。</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331151113.png" alt=""></p><p><strong>2）在该 Issue 上订阅</strong>：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331151348.png" alt=""></p><p>好，订阅完成，读者的操作也非常简单。而到这里，相信大家差不多也明白其中的实现方式了...</p><h3 id="通知读者" tabindex="-1">通知读者 <a class="header-anchor" href="#通知读者" aria-label="Permalink to &quot;通知读者&quot;">​</a></h3><p>接下来，笔者就只需要在该 Issue 下进行评论，对应订阅的用户就可以接收到由 github 发送的相关信息以及邮件：</p><p><strong>1）评论 Issue</strong></p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331152020.png" alt=""></p><p><strong>2）读者接收到信息</strong>：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331152130.png" alt=""></p><p>以及邮件也会接受到信息：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331152331.png" alt=""></p><h2 id="使用方式-一行代码" tabindex="-1">使用方式（一行代码） <a class="header-anchor" href="#使用方式-一行代码" aria-label="Permalink to &quot;使用方式（一行代码）&quot;">​</a></h2><p>很简单，就是在你的个人博客某位置添加一个跳转链接就可以了，如下是我在 vitepress 中添加跳转链接到<code>footer</code>的方式：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331152537.png" alt=""></p><p>完整代码：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://github.com/Justin3go/Justin3goBlogComment/issues/114&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;_blank&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;在 github 上订阅本博客月刊&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>恭喜你，OK 了！记得填上自己的仓库链接...</p><p><strong>值得注意的是</strong>：</p><ol><li>我们需要锁定该 Issue，避免其他人评论：</li></ol><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331152822.png" alt=""></p><ol start="2"><li>我们可以 pin 上该 Issue，方便其他人查看仓库时查看</li><li>我们可以将该 Issue 的内容稍微修改一下： <img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230331152939.png" alt=""></li></ol><h2 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h2><ul><li>依赖 github，需要跳转到 github</li><li>无法统计订阅人数</li></ul><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>其实最开始是想写个类似<code>Gitalk</code>的组件，但笔者也去看了下<a href="https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28" target="_blank" rel="noreferrer">github 的开放 API</a>，好像在这部分没有找到对应的订阅 Issue 的 API，不然其实这里就可以实现不用跳转页面即可订阅的功能了。</p><p>笔者较懒，这部分的调研可能并不尽善尽美，所以如果你有其他较好的方式或者想法，欢迎友善评论...</p><p><img src="https://oss.justin3go.com/blogs/QQ%E5%9B%BE%E7%89%8720230331154119.jpg" alt=""></p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://gitalk.github.io/" target="_blank" rel="noreferrer">有受 gitalk 的启发</a></li></ul>',45)]))}const c=t(o,[["render",l]]);export{d as __pageData,c as default};
