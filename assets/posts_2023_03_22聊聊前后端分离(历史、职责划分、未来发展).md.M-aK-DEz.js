import{_ as r,c as a,o as t,ar as l}from"./chunks/framework.Dw9xXWbv.js";const d=JSON.parse('{"title":"聊聊前后端分离(历史、职责划分、未来发展)","description":"","frontmatter":{"title":"聊聊前后端分离(历史、职责划分、未来发展)","date":"2023-03-22T00:00:00.000Z","tags":["前后端分离","全栈","互联网","SPA","微服务","BFF","Serverless"]},"headers":[],"relativePath":"posts/2023/03/22聊聊前后端分离(历史、职责划分、未来发展).md","filePath":"posts/2023/03/22聊聊前后端分离(历史、职责划分、未来发展).md","lastUpdated":1742015773000}'),o={name:"posts/2023/03/22聊聊前后端分离(历史、职责划分、未来发展).md"};function i(s,e,n,p,h,g){return t(),a("div",null,e[0]||(e[0]=[l('<h1 id="聊聊前后端分离-历史、职责划分、未来发展" tabindex="-1">聊聊前后端分离(历史、职责划分、未来发展) <a class="header-anchor" href="#聊聊前后端分离-历史、职责划分、未来发展" aria-label="Permalink to &quot;聊聊前后端分离(历史、职责划分、未来发展)&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>笔者在这篇文章中深入探讨了前后端分离的历史、职责划分及未来发展。前后端分离的出现可以从业务和技术两个层面理解，随着互联网的普及和用户基数的增加，功能业务变得复杂，促使了这一模式的发展。文章梳理了前后端分离的五个重要阶段：传统 MVC 架构、Ajax 的出现、SPA 的普及、微服务架构和 BFF 模式，以及 Serverless 架构的兴起。</p><p>笔者强调，前后端的职责划分不仅仅是页面操作和数据库操作的区分，还包括如何在前端和后端之间有效分配业务处理和数据计算。笔者认为，尽量将可在前端处理的数据放在前端进行处理，以提高响应速度和降低服务器压力，但也指出了需放在后端处理的特定情况。最后，笔者鼓励前端工程师具备全栈思维，从全局出发思考前端问题，以更好适应未来的发展趋势。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>3 月下旬了，时间过得真快，才发觉已经有几周没写文章了😠。</p><p>前面写了一篇<a href="https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/02/19%E6%94%BE%E5%BC%83Cookie-Session%EF%BC%8C%E6%8B%A5%E6%8A%B1JWT%EF%BC%9F.html" target="_blank" rel="noreferrer">Cookie-Session 与 JWT 对比</a>这样一篇文章，引发了我对未来前后端分离模式的一个思考。你可能会问，这两者能扯上什么关系？请听我慢慢道来...</p><p>其实了解这两者区别的应该都清楚，主要就是把登录态的存储是放在前端（用户设备上）存储还是放在后端（服务器）上存储的一个区别，具体的优缺点这里不过多赘述，可以查看一下往期文章。</p><p>所以，这相当于就涉及到了某些业务处理既可以交给前端，又可以交给后端，甚至前端后端都需要处理一下（如权限管理，数据校验这类）。这就是前后端的一个职责划分。</p><p>这与边缘计算与云计算的概念是类似的。前端相当于边缘计算，把一些计算和业务放在用户设备进行处理；而后端就相当于云计算，操作在中心化服务器上进行处理的。这里解释一下边缘计算与云计算的概念：</p><ul><li>边缘计算（Edge Computing）是一种分布式计算模型，它将计算和数据存储放置在接近数据源的边缘设备上，如传感器、路由器、智能手机等，以减少数据传输延迟和网络拥塞。</li><li>边缘计算与云计算不同，云计算是将数据存储在云端数据中心，边缘计算则是将计算资源放在靠近数据源的设备上。这使得数据能够更快地处理和分析，以及更好地保护数据隐私和安全。</li></ul><p>所以就想着梳理一下前后端分离的相关知识，以对全局更加了解，从而更好的服务于作为前端工程师的岗位😏😏😏</p><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>总的来说，可以从以下两个层面解释前后端分离的出现：</p><ol><li><strong>业务</strong>：时代的发展=&gt;互联网的普及=&gt;用户基数的增加=&gt;功能业务的复杂=&gt;前后端分离</li><li><strong>技术</strong>：业务的复杂=&gt;有技术的需求=&gt;Ajax 的出现、SPA 的普及等等=&gt;前后端分离</li></ol><p>关于前后端分离时代的划分，网上的文章各不相同，虽然划分的名词不同，但主要内容，脉络还是一致，这里笔者更愿意以技术名词将其划分为如下 5 个部分：</p><ol><li>传统 MVC 架构</li><li>Ajax 的出现</li><li>SPA 的普及</li><li>微服务架构的发展 &amp; BFF</li><li>Serverless 架构的兴起</li></ol><h2 id="_1-传统-mvc-架构" tabindex="-1">1.传统 MVC 架构 <a class="header-anchor" href="#_1-传统-mvc-架构" aria-label="Permalink to &quot;1.传统 MVC 架构&quot;">​</a></h2><p>其基本结构图如下：</p><p><img src="https://oss.justin3go.com/blogs/%E4%BC%A0%E7%BB%9FMVC%E6%9E%B6%E6%9E%84.png" alt=""></p><p>这种架构下，<strong>前后端的代码紧密耦合，难以分离</strong></p><p>比如前端代码中经常嵌入后端的 java 代码，导致前端开发人员必须具备后端开发的知识和技能，而后端开发人员也必须了解前端的技术。</p><p>这种架构在开发和维护方面较为困难，随着 Web 应用的复杂性不断提高，这种架构逐渐显得力不从心。</p><h2 id="_2-ajax-的出现" tabindex="-1">2.Ajax 的出现 <a class="header-anchor" href="#_2-ajax-的出现" aria-label="Permalink to &quot;2.Ajax 的出现&quot;">​</a></h2><p>随着 Ajax 技术的出现，前端页面可以异步获取数据，不必每次都刷新整个页面。这使得前端页面的功能和交互性大大提高，用户体验得到了显著的改善。同时，后端可以通过提供 RESTful API，为前端页面提供数据和服务，两者之间的耦合性逐渐降低。</p><p>具体来说，这里还是先将目光注视在上面的那张图上：</p><ul><li>之前页面更新的步骤是重新请求页面，服务器根据 View 中嵌入的后端动态代码生成带有数据的页面，然后返回给用户端。这种也就是整个页面全部更新。</li><li>而现在，View 中可以不用再嵌入后端的代码了，数据的更新只需在浏览器端通过网络请求后端提供的 RESTful 接口，然后使用 JS 操作 DOM 重新渲染页面即可。这种也就是页面局部更新。</li></ul><p>下图就是通过 Ajax 请求的时序图：</p><p><img src="https://oss.justin3go.com/blogs/Ajax%E8%AF%B7%E6%B1%82%E6%97%B6%E5%BA%8F%E5%9B%BE.png" alt=""></p><p>你可以简单理解为 Ajax 技术替换了前端内嵌后端代码这项技术，前端虽然不用学习后端代码或者模板语法这类技术，但是作为有得必有失，就需要学习 Ajax 这项技术。但总归比学习后端语法的学习成本低。</p><p>Ajax 技术的出现是前后端分离兴起的前提条件。</p><h2 id="_3-spa-的普及" tabindex="-1">3.SPA 的普及 <a class="header-anchor" href="#_3-spa-的普及" aria-label="Permalink to &quot;3.SPA 的普及&quot;">​</a></h2><p>刚开始前端还是<a href="https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58" target="_blank" rel="noreferrer">MPA（Mutiple Page Application）</a>，此时虽然后续页面的局部更新不依赖于后端代码内嵌，只依赖于接口；但每个 URL 与前端页面的对应关系仍然还是由后端进行控制，此时前后端仍然有一定的耦合，所以有些文章将这 MPA+Ajax 这种情况叫做半分离时代。</p><p>随着技术的进步，为了更高的提高开发效率，<a href="https://en.wikipedia.org/wiki/Single-page_application" target="_blank" rel="noreferrer">SPA（Single Page Application）</a>逐渐普及，我们的前端 MV* 时代开始到来...</p><p>如下是 SPA 时代下前后端分离的架构图（前端以 MVVM 为例）：</p><p><img src="https://oss.justin3go.com/blogs/%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E7%9A%84SPA%E6%9E%B6%E6%9E%84.png" alt=""></p><p>此时前后端才是所谓的分离，通过 JSON 进行数据交互，路由由前端自行控制，从而实现前后端的真正解耦。</p><h2 id="_4-微服务架构的发展-bff" tabindex="-1">4.微服务架构的发展 &amp; BFF <a class="header-anchor" href="#_4-微服务架构的发展-bff" aria-label="Permalink to &quot;4.微服务架构的发展 &amp; BFF&quot;">​</a></h2><p>随着 NodeJS 的成熟，一个叫做 BFF(Backend For Frontend)的技术架构出现在了开发者的视野中，BFF 是为了解决微服务架构中的前端和后端之间的耦合问题而提出的，它是 Web 应用程序的后端和前端之间的中间层。</p><p>BFF 模式通过将前端和后端之间的接口逻辑放在一个单独的服务中，将前端与后端之间的耦合度降低到最低。<strong>这个服务只为前端提供特定的接口，而不是提供整个后端系统的接口</strong>。这使得前端团队可以专注于开发他们需要的接口，而后端团队则可以专注于为不同的客户端（如 Web 和移动应用程序）提供最佳的服务。</p><p>如下是带有 BFF 的架构图：</p><p><img src="https://oss.justin3go.com/blogs/%E5%BE%AE%E6%9C%8D%E5%8A%A1%E6%9E%B6%E6%9E%84%E4%B8%AD%E7%9A%84BFF.png" alt=""></p><p>在前后端中间增加了一个 BFF，就相当于设计模式中的适配器模式，解耦。具体来说，有如下优势：</p><ol><li><strong>专注于前端需求</strong>：BFF 是为了满足前端需求而设计的，因此它可以专注于前端需要的功能和性能，而无需考虑其他方面的问题。这使得 BFF 能够更好地满足前端的需求，提供更好的用户体验。</li><li><strong>灵活性</strong>：由于 BFF 是一个中间层，可以自由选择技术栈，并在不影响其他层的情况下进行更改和优化。这使得 BFF 非常灵活，可以根据需要快速进行调整和改进。</li><li><strong>可扩展性</strong>：BFF 可以在需要时轻松地进行扩展。当有新的前端功能需要实现时，可以向 BFF 添加新的服务或更改现有的服务，而无需修改后端的代码。</li><li><strong>性能优化</strong>：BFF 可以通过将请求从前端分离出来并使用专门的服务来处理它们来提高性能。这可以使 BFF 在需要时缓存数据，减少网络延迟，并减轻后端的负担。</li><li><strong>更好的安全性</strong>：BFF 可以在前端和后端之间提供额外的安全性。例如，BFF 可以处理授权和身份验证，从而减少后端的安全风险。</li></ol><p>总的来说，BFF 架构模式提供了许多优势，包括专注于前端需求、灵活性、可扩展性、性能优化和更好的安全性。这些优势可以帮助开发团队更好地满足前端需求并提供更好的用户体验。</p><h2 id="_5-serverless-架构的兴起" tabindex="-1">5.Serverless 架构的兴起 <a class="header-anchor" href="#_5-serverless-架构的兴起" aria-label="Permalink to &quot;5.Serverless 架构的兴起&quot;">​</a></h2><p>BFF 由一般前端程序员开发，即使 BFF 是为前端服务的，从工作职责上区分是属于前端，但总归是一个后端服务的，意味着前端程序员也需要处理高并发、部署、负载均衡、备份冗灾、监控报警等等一系列对于前端程序员相对来说比较陌生的事物。</p><p>而这个问题就可以很好的被 Serverless 解决。</p><p><a href="https://en.wikipedia.org/wiki/Serverless_computing" target="_blank" rel="noreferrer">Serverless 架构</a>是一种云计算模型，它通过将代码运行环境和基础设施的管理交给云服务提供商来简化应用程序开发和部署。以下是 Serverless 如何促进前后端分离的几个方面：</p><ol><li><strong>无需管理服务器</strong>：使用 Serverless，开发人员无需考虑服务器的管理，例如配置、扩展和维护等问题。这意味着前端和后端开发人员可以更专注于自己的领域，而无需关心服务器的运行和管理。</li><li><strong>独立部署</strong>：Serverless 架构允许独立部署每个函数或服务。这使得前端和后端开发人员可以根据需要独立地开发、测试和部署他们的代码，而不需要等待其他团队完成其工作。</li><li><strong>适合微服务架构</strong>：Serverless 架构非常适合微服务架构，其中应用程序被拆分成多个小型服务。每个服务可以独立开发和部署，从而促进前后端分离。</li><li><strong>按需计费</strong>：Serverless 按照每个函数的实际使用量进行计费，而不是预先支付一定量的服务器资源。这意味着前端和后端开发人员可以仅针对实际使用的资源进行支付，并根据需要进行扩展。</li></ol><p>总的来说，Serverless 架构模式通过简化基础设施管理、独立部署、适合微服务架构和按需计费等方式促进前后端分离。这使得开发人员可以更专注于自己的领域，而不必担心服务器管理和资源预测等问题。</p><p>此时前端程序员就只需在 BFF 中调用一下 RPC/HTTP，写写 JS 处理一下逻辑。前后端分离得到进一步发展...</p><h2 id="一些想法-前后端职责" tabindex="-1">一些想法（前后端职责） <a class="header-anchor" href="#一些想法-前后端职责" aria-label="Permalink to &quot;一些想法（前后端职责）&quot;">​</a></h2><p><a href="https://2014.jsconfchina.com/slides/herman-taobaoweb/index.html#/69" target="_blank" rel="noreferrer">这篇文章演示</a>提到了关于前后端的一个简单的职责划分，如下图：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230322190954.png" alt=""></p><p>这里笔者不过多赘述，仅仅想谈的是随着技术的发展（V8、WebWorker、Webassembly、WebGL，TensorflowJS 等等），浏览器端可以承受更多的业务处理和数据计算。</p><p><strong>这就意味着在浏览器端不仅仅只能操作 DOM，展示数据了，同样也可以承受一定的业务处理，数据计算</strong>。并且相对于在中心服务器进行处理，这种在用户设备上进行处理有如下优势：</p><ul><li>减少网络传输，提高响应速度</li><li>降低服务器压力</li><li>特定情况下可以保护用户隐私</li></ul><p>举个常见的例子，比如使用 TensorflowJS 调用浏览器摄像头，从而识别用户的肢体动作进行交互，而识别的模型程序既可以放在中心服务器，现在也可以放在前端，并且也较为成熟了。所以该怎么选择呢？</p><p>这个答案大家应该都比较清楚，自然放在是前端，毕竟视频的传输极其消耗网络带宽，以及摄像头是较为隐私的部分了。</p><p>说了这么多，现在进入正题，也就是笔者想说的想法就是：除开页面操作一般属于前端，数据库操作一般属于后端，其他的业务处理、数据计算其实前后端现在几乎都能处理。就像登录态的处理：Cookie-Session 是把登录态放在中心化服务器上，JWT 是将登录态分发给到各个用户设备上一样。</p><p><strong>所以怎么选择就非常重要了，而笔者这里认为能放在前端处理的数据尽量放在前端处理，除开以下特殊情况需要放在中心化服务器中进行处理</strong>：</p><ul><li><strong>安全</strong>：某些计算策略、业务处理策略不能公布出来</li><li><strong>多个用户的数据处理</strong>：用户端（前端）自然只能处理该用户的数据，所以多个用户的数据处理只能由服务器进行处理</li><li><strong>多个设备的协同</strong>：这个肯定需要服务器的帮助</li><li><strong>复杂度特别高的计算</strong>：虽然目前用户设备一般性能都不差，但对于一些高复杂度的处理还是只能放在服务器上运算，不能造成用户卡顿，影响用户体验</li></ul><p>尽量放在前端处理的好处就是上面提到的：</p><ul><li>减少网络传输，提高响应速度</li><li>降低服务器压力</li><li>特定情况下可以保护用户隐私</li></ul><p>这就意味着我们前端工程师就不能仅仅只懂得写页面、操作页面了，得有全栈思维、产品思维，从功能点、业务出发，站在全局思考前端问题...</p><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>上述的想法部分笔者实践经验较少，更多可能是纸上谈兵，并没有进行所谓的啥比较全面的可行性分析等等。同时也是借这个契机来梳理一下关于前后端分离模式的一个历史综述，希望对你有所帮助或者能引发你的思考。</p><p>如果你有一些宝贵的经验，欢迎友善评论😉</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://blog.csdn.net/fuzhongmin05/article/details/81591072" target="_blank" rel="noreferrer">前后端分离架构概述</a></li><li><a href="https://zhuanlan.zhihu.com/p/29996622" target="_blank" rel="noreferrer">浅谈前后端分离与实践（一）</a></li><li><a href="https://dev.to/zenstack/frontend-backend-and-the-blurring-line-in-between-2h59" target="_blank" rel="noreferrer">Frontend, Backend, and the Blurring Line In-Between</a></li><li><a href="https://2014.jsconfchina.com/slides/herman-taobaoweb/index.html#/100" target="_blank" rel="noreferrer">淘宝前后端分离解决方案</a></li><li><a href="https://www.zhihu.com/question/28207685" target="_blank" rel="noreferrer">Web 前后端分离的意义大吗？</a></li><li><a href="https://www.reddit.com/r/webdev/comments/spr2db/confused_about_web_app_architecture_and/" target="_blank" rel="noreferrer">Confused about web app architecture and separation of frontend and backend</a></li><li><a href="https://zhuanlan.zhihu.com/p/196637639" target="_blank" rel="noreferrer">Web 开发的历史发展技术演变</a></li><li><a href="https://juejin.cn/post/6844904185427673095" target="_blank" rel="noreferrer">你学 BFF 和 Serverless 了吗</a></li></ul>',71)]))}const _=r(o,[["render",i]]);export{d as __pageData,_ as default};
