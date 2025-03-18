import{_ as e,c as T,o as l,ar as a,j as t,a as o}from"./chunks/framework.Dw9xXWbv.js";const c=JSON.parse('{"title":"浅谈搜索引擎原理","description":"","frontmatter":{"title":"浅谈搜索引擎原理","date":"2023-08-17T00:00:00.000Z","tags":["搜索引擎","爬虫","倒排索引","PageRank","搜索模块"]},"headers":[],"relativePath":"posts/2023/08/17浅谈搜索引擎原理.md","filePath":"posts/2023/08/17浅谈搜索引擎原理.md","lastUpdated":1742015773000}'),s={name:"posts/2023/08/17浅谈搜索引擎原理.md"},r={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},i={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"58.095ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 25678.1 1000","aria-hidden":"true"};function n(d,Q,m,p,h,g){return l(),T("div",null,[Q[3]||(Q[3]=a('<h1 id="浅谈搜索引擎原理" tabindex="-1">浅谈搜索引擎原理 <a class="header-anchor" href="#浅谈搜索引擎原理" aria-label="Permalink to &quot;浅谈搜索引擎原理&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>笔者在这篇文章中回顾了搜索引擎的基本结构和工作原理，旨在帮助读者扩展相关知识。搜索引擎的架构可分为离线系统和在线系统，前者负责数据收集、清洗和索引，后者则进行用户交互和搜索结果的返回。爬虫策略的选择至关重要，通常采用广度优先爬取以获取重要网页。</p><p>在处理网页内容时，笔者强调了结构化内容提取和网页去重的重要性。PageRank 算法被提及作为评估网页质量的经典方法，而倒排索引则是实现高效检索的关键技术。最后，笔者简要描述了搜索模块的工作流程，从用户输入搜索词到结果返回，强调了用户体验的重要性。总的来说，本文为理解搜索引擎的运作提供了一个清晰的框架。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>两年前笔者做过一个<a href="https://github.com/Justin3go/xiu-search" target="_blank" rel="noreferrer">小型搜索引擎</a>，虽然代码现在看来很烂，但毕竟总归实现了一个非常基础的搜索引擎，最近又需要用到相关技术，所以又回顾了一下搜索引擎的知识。但是，由于之前也没有任何的博客或者笔记记录当时的过程，所以现在回顾起来比较耗时。</p><p>所以这也是笔者为什么要写博客的原因之一，这篇文章就来梳理一下一个搜索引擎，如大家常见的 Baidu、Google，的基本结构是怎么样的。</p><p>值得注意的是，本文不会详细叙述某一个技术细节，在“具体”和“抽象”之中本文更加偏抽象一点，所以，就算读者没用过<code>Python</code>或者并不做这方面的工作，也应该能看懂并可能有些许作用，算是扩展一下自己的知识面吧，毕竟搜索引擎太常见了，上网必备的。</p><h2 id="基本架构" tabindex="-1">基本架构 <a class="header-anchor" href="#基本架构" aria-label="Permalink to &quot;基本架构&quot;">​</a></h2><p><img src="https://oss.justin3go.com/blogs/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E6%9E%B6%E6%9E%84%E5%9B%BE.png" alt=""></p><p>如上就是一个搜索引擎最基本的结构了。当然，现在的搜索引擎越来越人性化，结构肯定更为复杂，比如使用 AI 去理解用户的输入，对用户进行画像等等，同样输入“苹果”，关注科技的用户的搜索排序结果与关注农产品的用户搜索排序结果显然会有所差异。</p><p>这里仅以上述基本结构做介绍，否则可以写本小说了。就算仅介绍上述基本结构，其中的技术细节也非常多，随便单独拿出来一个技术细节都可以写一篇文章了，所以还在再啰嗦一下<strong>本文的定位</strong>：扩展大家的知识面，带大家了解认识搜索引擎的内部。</p><p>本小节将简单介绍这个基本结构，后续小节会理一些重要/经典的技术作为扩展。好了，废话不多说了，进入正题：</p><p>首先，我们可以将上述结构分解为两个部分：</p><ol><li>离线系统：图中的上半部分（数据收集、清洗、整理、索引模块），这些部分不需要实时运行</li><li>在线系统：图中的下半部分（搜索接口、检索、排序和摘要计算模块），这些需要快速响应，必须在线运行</li></ol><p><img src="https://oss.justin3go.com/blogs/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E6%9E%B6%E6%9E%84%E5%9B%BE%E7%A6%BB%E7%BA%BF%E7%B3%BB%E7%BB%9F%E4%B8%8E%E5%9C%A8%E7%BA%BF%E7%B3%BB%E7%BB%9F.png" alt=""></p><p>搜索引擎的主要数据来源于网页，最后也以网页的形式作为输出。其中数据部分为搜索引擎的内部表示，比如<a href="https://zh.wikipedia.org/wiki/%E5%80%92%E6%8E%92%E7%B4%A2%E5%BC%95" target="_blank" rel="noreferrer">倒排索引</a>、<a href="https://zh.wikipedia.org/wiki/%E7%9F%A5%E8%AD%98%E5%9C%96%E8%AD%9C" target="_blank" rel="noreferrer">知识图谱</a>之类。</p><p>然后，笔者再将上上图中过程做一个描述，方便大家理解：</p><ol><li>爬虫采取某种策略爬取互联网上的网页，获取到网页库</li><li>采用某种方式如正则、网页标签结构分析等方式拿到网页中有用的内容（标题、描述、内容...），生成网页对象库</li><li>对该网页对象库进行索引，为了后续搜索速度，采用倒排索引（原因后续详细介绍），既然叫索引，那就是空间换时间，提高速度用的，现在理解这点就好</li><li>等待一段时间，数据较为丰富的时候，此时在线系统就可以开始接受用户交互了</li><li>用户通过前端搜索接口输入搜索词</li><li>搜索引擎通过该搜索词与索引库进行查找比对，找出相关性最高的一些网页</li><li>排序（不同权重计算，如相关性、时效性、用户画像、网页是否花钱【doge】等）</li><li>对网页内容进行摘要处理，把与搜索词最相关的内容放在摘要部分</li><li>返回展示即可</li></ol><p>整体过程相信读者们已经了解，接下来将对其中重要的技术进行理解，如爬虫的策略、为什么要使用倒排索引、如何做到相关性比对之类的。请读者移步下一小节：</p><h2 id="爬虫策略" tabindex="-1">爬虫策略 <a class="header-anchor" href="#爬虫策略" aria-label="Permalink to &quot;爬虫策略&quot;">​</a></h2><blockquote><p>本小节你需要有一定的数据结构-图的知识，深度优先算法与广度优先算法的基础</p></blockquote><p>在讲策略之前，你首先需要知道爬虫的基本任务是什么，简单来说就两步：</p><ol><li>将给定的种子站点的 URL 所代表的网页内容下载下来</li><li>提取该网页中包含的全部 URL，重复第一个步骤</li></ol><p>如此，种子网站的选用就非常重要了，通常是一些权威级别的导航网站；然后就是如何指定爬取的策略了，比如获取到网页中的全部 URL，是对其中一个 URL 进行深度爬取还是将该网页包含的这些 URL 进行广度爬取呢等等</p><p>通常来说，爬取策略选择广度优先爬取，原因如下：</p><ol><li>首先，重要的网页往往离种子站点的距离较近，这符合直觉。我们通常在打开某些新闻网站时，进入眼帘的往往是最重要的新闻。随着不断地冲浪(可以理解为深度不断加深)，所看到的网页的重要性越来越低，甚至偶尔会出现无法访问的情况。</li><li>其次，WWW 的深度只有 19，没有我们想象的那么深，到达某一个网页的路径通常很多，总会存在一条很短的路径到达。</li><li>最后，广度优先策略有利于多爬虫合作抓取。这是因为该策略开始抓取的网页通常都是站内网页，逐渐才会遇到站外链接，因此抓取的封闭性较强。</li></ol><p>除此之外，你还应该考虑如下技术细节：</p><ol><li>提取出来的 URL 是绝对路径还是相对路径，相对路径的话就应该进行拼接</li><li>通过某种方式（如哈希-<a href="https://zh.wikipedia.org/wiki/%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8" target="_blank" rel="noreferrer">布隆过滤器</a>）保存已经抓取过的 URL，避免重复抓取</li><li>哪些网页具有优先权，比如反链的数量与质量，域名的后缀（com、cn、org），距离种子网站的深度等等指标都可以决定网页的优先权，从而在有限的资源里，抓取更重要的网页内容。</li><li>网页变化了怎么办，如何实现重访策略，是以同样的频率重访已经抓取过的全部网页，还是根据不同网页的更新频率决定重访该个体页面的频率</li><li>爬虫自身的技术问题：爬虫与反爬虫，如何提速</li><li>友好性工作，遵守<a href="https://zh.wikipedia.org/wiki/Robots.txt" target="_blank" rel="noreferrer">ROBOT 协议</a></li><li>非列表页数据的获取，比如京东淘宝的数据很多都藏在搜索框中</li><li>略略略...</li></ol><h2 id="网页结构分析" tabindex="-1">网页结构分析 <a class="header-anchor" href="#网页结构分析" aria-label="Permalink to &quot;网页结构分析&quot;">​</a></h2><h3 id="提取出结构化内容" tabindex="-1">提取出结构化内容 <a class="header-anchor" href="#提取出结构化内容" aria-label="Permalink to &quot;提取出结构化内容&quot;">​</a></h3><p>本小节主要为对于已经下载的网页（一堆 HTML 文本文件），如何提取出其中有用的信息。</p><p>网页对象中常见的信息包括但不限于：</p><ol><li>网页使用的字符编码(charset)</li><li>网页使用的语言(language)</li><li>网页的发布时间(time)</li><li>网页的关键词信息(keywords)</li><li>网页的标题(title)</li><li>正文标题(content title)</li><li>正文(content)</li><li>正向链接(link)</li><li>锚文本(anchor text)</li></ol><p>如何提取其中的信息就极为重要，对于特定的网页，特定的网站，我们也许可以找到提取规律，使用正则表达式直接拿到想要的数据，但是对于互联网上成千上万的数据，搜索引擎就得找到一个统一的策略方法去提取 HTML 中的有用内容。</p><p>这也是为什么前端需要尽量使用语义化标签的原因，除了给人看，更多是给搜索引擎这类机器看。</p><p>但是，很多前端工程师都是<code>div</code>标签一个走天下，根本不会遵守规范，并且内容部分也不会仅仅包含在一个标签中，所以这时候搜索引擎就需要提取其中的 class 类名、标签名，比如<code>class=&quot;content&quot; &lt;p&gt;&lt;/p&gt;</code>多半就是内容标签，由此可以指定投票机制，包含哪些标签的加分，最后拿到最优解。</p><h3 id="网页去重" tabindex="-1">网页去重 <a class="header-anchor" href="#网页去重" aria-label="Permalink to &quot;网页去重&quot;">​</a></h3><p>刚才在爬虫策略中也提到了避免重复爬取，这里也是避免重复，两者有什么区别呢？</p><p>前者是 URL 重复，后者是网页内容重复或高度相似，大家都懂的==&gt;COPY、COPY、COPY 导致的，即使不同的 URL，网页内容也可能是重复的，所以这时候就需要进行第二次去重，去重也涉及到两个步骤：</p><ol><li>如何判断网页是重复的或者高度相似的</li><li>多个重复的到底该保留哪一个 URL 对应的网页内容，比如从版权的角度考虑要尊重原创，如何判断原创呢？</li></ol><p><strong>1）网页查重</strong></p><p>为了避免本文陷入算法的细节陷阱中，这里仅简单列出几种常见的文档查重算法思想供了解，需要深入自行搜索关键词即可（后续也可能单独写一篇文章来详细介绍）：</p><ol><li>文本分块签名算法：采用分块的方法，利用 hash 函数计算每一块的哈希值，如果相同块的数量大于某个阈值，则认为是相似的；难点在于确定分块数量和阈值</li><li>Shingle</li><li>I-Match</li><li>SimHash</li></ol><p><strong>2）网页去重</strong></p><p>网页查重的目标是消重，消重不可避免地会遇到这样一个问题，即在相同或者相似的网页集合中保留哪一个，而消除哪一个些呢？比如某网页 A 被复制为 B，复制为 C，复制为 D</p><ul><li><strong>从版权的角度考虑</strong>，应该尊重原创，过滤转载者复制的网页，即保留网页 A；</li><li><strong>从网页寿命的角度考虑</strong>，过滤掉那些网站质量不高的网页，保留大型网站的网页；</li><li><strong>从容易实现的角度考虑</strong>，保留首先被爬虫抓取的网页，丢弃后续抓取的相同或相似网页。</li></ul><p>最后一种方法最为简单实用，由于保留了先被爬虫抓取的网页，同时很大程度上也保证了优先保留原创网页的原则，因此被广泛采用。</p><h3 id="pagerank" tabindex="-1">PageRank <a class="header-anchor" href="#pagerank" aria-label="Permalink to &quot;PageRank&quot;">​</a></h3><p><a href="https://en.wikipedia.org/wiki/PageRank" target="_blank" rel="noreferrer">PageRank</a>可以说是历史上颠覆性的算法了，非常经典，它是判断网页质量的重要指标。</p><p>PageRank 的计算基于以下两个基本假设：</p><ol><li>一个网页被多个网页指向，则它是重要网页，又称为权威(Authority)网页；一个网页虽然没有被多个网页指向，但是它被某个重要网页指向，则它也是重要网页；一个网页的重要性被平均的传递到它所指向的网页；</li><li>假定用户一开始随机的访问网页集合中的一个网页，以后跟随网页的链接浏览网页，不回退浏览，浏览某个网页的概率就是该网页的 PageRank 值。</li></ol><p>认识一下网页链接，很明显是一个有向图数据结构：</p><p><img src="https://oss.justin3go.com/blogs/%E7%BD%91%E9%A1%B5%E9%93%BE%E6%8E%A5%E5%85%B3%E7%B3%BBpagerank.png" alt=""></p>',54)),t("p",null,[Q[2]||(Q[2]=o("Pagerank 的计算公式如下： ")),t("mjx-container",r,[(l(),T("svg",i,Q[0]||(Q[0]=[a('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D443" d="M287 628Q287 635 230 637Q206 637 199 638T192 648Q192 649 194 659Q200 679 203 681T397 683Q587 682 600 680Q664 669 707 631T751 530Q751 453 685 389Q616 321 507 303Q500 302 402 301H307L277 182Q247 66 247 59Q247 55 248 54T255 50T272 48T305 46H336Q342 37 342 35Q342 19 335 5Q330 0 319 0Q316 0 282 1T182 2Q120 2 87 2T51 1Q33 1 33 11Q33 13 36 25Q40 41 44 43T67 46Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628ZM645 554Q645 567 643 575T634 597T609 619T560 635Q553 636 480 637Q463 637 445 637T416 636T404 636Q391 635 386 627Q384 621 367 550T332 412T314 344Q314 342 395 342H407H430Q542 342 590 392Q617 419 631 471T645 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(751,0)"><path data-c="1D445" d="M230 637Q203 637 198 638T193 649Q193 676 204 682Q206 683 378 683Q550 682 564 680Q620 672 658 652T712 606T733 563T739 529Q739 484 710 445T643 385T576 351T538 338L545 333Q612 295 612 223Q612 212 607 162T602 80V71Q602 53 603 43T614 25T640 16Q668 16 686 38T712 85Q717 99 720 102T735 105Q755 105 755 93Q755 75 731 36Q693 -21 641 -21H632Q571 -21 531 4T487 82Q487 109 502 166T517 239Q517 290 474 313Q459 320 449 321T378 323H309L277 193Q244 61 244 59Q244 55 245 54T252 50T269 48T302 46H333Q339 38 339 37T336 19Q332 6 326 0H311Q275 2 180 2Q146 2 117 2T71 2T50 1Q33 1 33 10Q33 12 36 24Q41 43 46 45Q50 46 61 46H67Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628Q287 635 230 637ZM630 554Q630 586 609 608T523 636Q521 636 500 636T462 637H440Q393 637 386 627Q385 624 352 494T319 361Q319 360 388 360Q466 361 492 367Q556 377 592 426Q608 449 619 486T630 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(1510,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(1899,0)"><path data-c="1D434" d="M208 74Q208 50 254 46Q272 46 272 35Q272 34 270 22Q267 8 264 4T251 0Q249 0 239 0T205 1T141 2Q70 2 50 0H42Q35 7 35 11Q37 38 48 46H62Q132 49 164 96Q170 102 345 401T523 704Q530 716 547 716H555H572Q578 707 578 706L606 383Q634 60 636 57Q641 46 701 46Q726 46 726 36Q726 34 723 22Q720 7 718 4T704 0Q701 0 690 0T651 1T578 2Q484 2 455 0H443Q437 6 437 9T439 27Q443 40 445 43L449 46H469Q523 49 533 63L521 213H283L249 155Q208 86 208 74ZM516 260Q516 271 504 416T490 562L463 519Q447 492 400 412L310 260L413 259Q516 259 516 260Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(2649,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(3315.8,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(4371.6,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(4760.6,0)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(5482.8,0)"><path data-c="2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(6483,0)"><path data-c="1D451" d="M366 683Q367 683 438 688T511 694Q523 694 523 686Q523 679 450 384T375 83T374 68Q374 26 402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487H491Q506 153 506 145Q506 140 503 129Q490 79 473 48T445 8T417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157Q33 205 53 255T101 341Q148 398 195 420T280 442Q336 442 364 400Q369 394 369 396Q370 400 396 505T424 616Q424 629 417 632T378 637H357Q351 643 351 645T353 664Q358 683 366 683ZM352 326Q329 405 277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q233 26 290 98L298 109L352 326Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(7003,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(7614.2,0)"><path data-c="2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(8614.4,0)"><path data-c="1D451" d="M366 683Q367 683 438 688T511 694Q523 694 523 686Q523 679 450 384T375 83T374 68Q374 26 402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487H491Q506 153 506 145Q506 140 503 129Q490 79 473 48T445 8T417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157Q33 205 53 255T101 341Q148 398 195 420T280 442Q336 442 364 400Q369 394 369 396Q370 400 396 505T424 616Q424 629 417 632T378 637H357Q351 643 351 645T353 664Q358 683 366 683ZM352 326Q329 405 277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q233 26 290 98L298 109L352 326Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(9134.4,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(9523.4,0)"><path data-c="1D443" d="M287 628Q287 635 230 637Q206 637 199 638T192 648Q192 649 194 659Q200 679 203 681T397 683Q587 682 600 680Q664 669 707 631T751 530Q751 453 685 389Q616 321 507 303Q500 302 402 301H307L277 182Q247 66 247 59Q247 55 248 54T255 50T272 48T305 46H336Q342 37 342 35Q342 19 335 5Q330 0 319 0Q316 0 282 1T182 2Q120 2 87 2T51 1Q33 1 33 11Q33 13 36 25Q40 41 44 43T67 46Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628ZM645 554Q645 567 643 575T634 597T609 619T560 635Q553 636 480 637Q463 637 445 637T416 636T404 636Q391 635 386 627Q384 621 367 550T332 412T314 344Q314 342 395 342H407H430Q542 342 590 392Q617 419 631 471T645 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(10274.4,0)"><path data-c="1D445" d="M230 637Q203 637 198 638T193 649Q193 676 204 682Q206 683 378 683Q550 682 564 680Q620 672 658 652T712 606T733 563T739 529Q739 484 710 445T643 385T576 351T538 338L545 333Q612 295 612 223Q612 212 607 162T602 80V71Q602 53 603 43T614 25T640 16Q668 16 686 38T712 85Q717 99 720 102T735 105Q755 105 755 93Q755 75 731 36Q693 -21 641 -21H632Q571 -21 531 4T487 82Q487 109 502 166T517 239Q517 290 474 313Q459 320 449 321T378 323H309L277 193Q244 61 244 59Q244 55 245 54T252 50T269 48T302 46H333Q339 38 339 37T336 19Q332 6 326 0H311Q275 2 180 2Q146 2 117 2T71 2T50 1Q33 1 33 10Q33 12 36 24Q41 43 46 45Q50 46 61 46H67Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628Q287 635 230 637ZM630 554Q630 586 609 608T523 636Q521 636 500 636T462 637H440Q393 637 386 627Q385 624 352 494T319 361Q319 360 388 360Q466 361 492 367Q556 377 592 426Q608 449 619 486T630 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(11033.4,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="msub" transform="translate(11422.4,0)"><g data-mml-node="mi"><path data-c="1D447" d="M40 437Q21 437 21 445Q21 450 37 501T71 602L88 651Q93 669 101 677H569H659Q691 677 697 676T704 667Q704 661 687 553T668 444Q668 437 649 437Q640 437 637 437T631 442L629 445Q629 451 635 490T641 551Q641 586 628 604T573 629Q568 630 515 631Q469 631 457 630T439 622Q438 621 368 343T298 60Q298 48 386 46Q418 46 427 45T436 36Q436 31 433 22Q429 4 424 1L422 0Q419 0 415 0Q410 0 363 1T228 2Q99 2 64 0H49Q43 6 43 9T45 27Q49 40 55 46H83H94Q174 46 189 55Q190 56 191 56Q196 59 201 76T241 233Q258 301 269 344Q339 619 339 625Q339 630 310 630H279Q212 630 191 624Q146 614 121 583T67 467Q60 445 57 441T43 437H40Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(617,-150) scale(0.707)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(12443,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="TeXAtom" data-mjx-texclass="ORD" transform="translate(12832,0)"><g data-mml-node="mo"><path data-c="2F" d="M423 750Q432 750 438 744T444 730Q444 725 271 248T92 -240Q85 -250 75 -250Q68 -250 62 -245T56 -231Q56 -221 230 257T407 740Q411 750 423 750Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mi" transform="translate(13332,0)"><path data-c="1D436" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q484 659 454 652T382 628T299 572T226 479Q194 422 175 346T156 222Q156 108 232 58Q280 24 350 24Q441 24 512 92T606 240Q610 253 612 255T628 257Q648 257 648 248Q648 243 647 239Q618 132 523 55T319 -22Q206 -22 128 53T50 252Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(14092,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="msub" transform="translate(14481,0)"><g data-mml-node="mi"><path data-c="1D447" d="M40 437Q21 437 21 445Q21 450 37 501T71 602L88 651Q93 669 101 677H569H659Q691 677 697 676T704 667Q704 661 687 553T668 444Q668 437 649 437Q640 437 637 437T631 442L629 445Q629 451 635 490T641 551Q641 586 628 604T573 629Q568 630 515 631Q469 631 457 630T439 622Q438 621 368 343T298 60Q298 48 386 46Q418 46 427 45T436 36Q436 31 433 22Q429 4 424 1L422 0Q419 0 415 0Q410 0 363 1T228 2Q99 2 64 0H49Q43 6 43 9T45 27Q49 40 55 46H83H94Q174 46 189 55Q190 56 191 56Q196 59 201 76T241 233Q258 301 269 344Q339 619 339 625Q339 630 310 630H279Q212 630 191 624Q146 614 121 583T67 467Q60 445 57 441T43 437H40Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(617,-150) scale(0.707)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(15501.6,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(15890.6,0)"><path data-c="2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(16668.6,0)"><path data-c="2E" d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(17113.2,0)"><path data-c="2E" d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(17557.9,0)"><path data-c="2E" d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(18002.6,0)"><path data-c="2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(18780.6,0)"><path data-c="1D443" d="M287 628Q287 635 230 637Q206 637 199 638T192 648Q192 649 194 659Q200 679 203 681T397 683Q587 682 600 680Q664 669 707 631T751 530Q751 453 685 389Q616 321 507 303Q500 302 402 301H307L277 182Q247 66 247 59Q247 55 248 54T255 50T272 48T305 46H336Q342 37 342 35Q342 19 335 5Q330 0 319 0Q316 0 282 1T182 2Q120 2 87 2T51 1Q33 1 33 11Q33 13 36 25Q40 41 44 43T67 46Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628ZM645 554Q645 567 643 575T634 597T609 619T560 635Q553 636 480 637Q463 637 445 637T416 636T404 636Q391 635 386 627Q384 621 367 550T332 412T314 344Q314 342 395 342H407H430Q542 342 590 392Q617 419 631 471T645 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(19531.6,0)"><path data-c="1D445" d="M230 637Q203 637 198 638T193 649Q193 676 204 682Q206 683 378 683Q550 682 564 680Q620 672 658 652T712 606T733 563T739 529Q739 484 710 445T643 385T576 351T538 338L545 333Q612 295 612 223Q612 212 607 162T602 80V71Q602 53 603 43T614 25T640 16Q668 16 686 38T712 85Q717 99 720 102T735 105Q755 105 755 93Q755 75 731 36Q693 -21 641 -21H632Q571 -21 531 4T487 82Q487 109 502 166T517 239Q517 290 474 313Q459 320 449 321T378 323H309L277 193Q244 61 244 59Q244 55 245 54T252 50T269 48T302 46H333Q339 38 339 37T336 19Q332 6 326 0H311Q275 2 180 2Q146 2 117 2T71 2T50 1Q33 1 33 10Q33 12 36 24Q41 43 46 45Q50 46 61 46H67Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628Q287 635 230 637ZM630 554Q630 586 609 608T523 636Q521 636 500 636T462 637H440Q393 637 386 627Q385 624 352 494T319 361Q319 360 388 360Q466 361 492 367Q556 377 592 426Q608 449 619 486T630 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(20290.6,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="msub" transform="translate(20679.6,0)"><g data-mml-node="mi"><path data-c="1D447" d="M40 437Q21 437 21 445Q21 450 37 501T71 602L88 651Q93 669 101 677H569H659Q691 677 697 676T704 667Q704 661 687 553T668 444Q668 437 649 437Q640 437 637 437T631 442L629 445Q629 451 635 490T641 551Q641 586 628 604T573 629Q568 630 515 631Q469 631 457 630T439 622Q438 621 368 343T298 60Q298 48 386 46Q418 46 427 45T436 36Q436 31 433 22Q429 4 424 1L422 0Q419 0 415 0Q410 0 363 1T228 2Q99 2 64 0H49Q43 6 43 9T45 27Q49 40 55 46H83H94Q174 46 189 55Q190 56 191 56Q196 59 201 76T241 233Q258 301 269 344Q339 619 339 625Q339 630 310 630H279Q212 630 191 624Q146 614 121 583T67 467Q60 445 57 441T43 437H40Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(617,-150) scale(0.707)"><path data-c="1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(21770.8,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="TeXAtom" data-mjx-texclass="ORD" transform="translate(22159.8,0)"><g data-mml-node="mo"><path data-c="2F" d="M423 750Q432 750 438 744T444 730Q444 725 271 248T92 -240Q85 -250 75 -250Q68 -250 62 -245T56 -231Q56 -221 230 257T407 740Q411 750 423 750Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mi" transform="translate(22659.8,0)"><path data-c="1D436" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q484 659 454 652T382 628T299 572T226 479Q194 422 175 346T156 222Q156 108 232 58Q280 24 350 24Q441 24 512 92T606 240Q610 253 612 255T628 257Q648 257 648 248Q648 243 647 239Q618 132 523 55T319 -22Q206 -22 128 53T50 252Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(23419.8,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="msub" transform="translate(23808.8,0)"><g data-mml-node="mi"><path data-c="1D447" d="M40 437Q21 437 21 445Q21 450 37 501T71 602L88 651Q93 669 101 677H569H659Q691 677 697 676T704 667Q704 661 687 553T668 444Q668 437 649 437Q640 437 637 437T631 442L629 445Q629 451 635 490T641 551Q641 586 628 604T573 629Q568 630 515 631Q469 631 457 630T439 622Q438 621 368 343T298 60Q298 48 386 46Q418 46 427 45T436 36Q436 31 433 22Q429 4 424 1L422 0Q419 0 415 0Q410 0 363 1T228 2Q99 2 64 0H49Q43 6 43 9T45 27Q49 40 55 46H83H94Q174 46 189 55Q190 56 191 56Q196 59 201 76T241 233Q258 301 269 344Q339 619 339 625Q339 630 310 630H279Q212 630 191 624Q146 614 121 583T67 467Q60 445 57 441T43 437H40Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(617,-150) scale(0.707)"><path data-c="1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z" style="stroke-width:3;"></path></g></g><g data-mml-node="mo" transform="translate(24900.1,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(25289.1,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g></g></g>',1)]))),Q[1]||(Q[1]=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mi",null,"P"),t("mi",null,"R"),t("mo",{stretchy:"false"},"("),t("mi",null,"A"),t("mo",{stretchy:"false"},")"),t("mo",null,"="),t("mo",{stretchy:"false"},"("),t("mn",null,"1"),t("mo",null,"−"),t("mi",null,"d"),t("mo",{stretchy:"false"},")"),t("mo",null,"+"),t("mi",null,"d"),t("mo",{stretchy:"false"},"("),t("mi",null,"P"),t("mi",null,"R"),t("mo",{stretchy:"false"},"("),t("msub",null,[t("mi",null,"T"),t("mn",null,"1")]),t("mo",{stretchy:"false"},")"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mo",null,"/")]),t("mi",null,"C"),t("mo",{stretchy:"false"},"("),t("msub",null,[t("mi",null,"T"),t("mn",null,"1")]),t("mo",{stretchy:"false"},")"),t("mo",null,"+"),t("mo",null,"."),t("mo",null,"."),t("mo",null,"."),t("mo",null,"+"),t("mi",null,"P"),t("mi",null,"R"),t("mo",{stretchy:"false"},"("),t("msub",null,[t("mi",null,"T"),t("mi",null,"n")]),t("mo",{stretchy:"false"},")"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mo",null,"/")]),t("mi",null,"C"),t("mo",{stretchy:"false"},"("),t("msub",null,[t("mi",null,"T"),t("mi",null,"n")]),t("mo",{stretchy:"false"},")"),t("mo",{stretchy:"false"},")")])],-1))])]),Q[4]||(Q[4]=a('<p>其中：</p><ul><li>PR(A)表示网页 A 的 PageRank 值；</li><li>d 是一个介于 0 和 1 之间的阻尼因子，表示用户点击链接继续浏览的概率；</li><li>PR(Ti)表示指向网页 A 的其他网页 Ti 的 PageRank 值；</li><li>C(Ti)表示网页 Ti 的出链数量。</li></ul><p><strong>简单来说，每个网页的 PageRank 值由指向它的其他网页的 PageRank 值决定，并且与这些链接的数量有关。</strong></p><p>在计算过程中，会通过迭代的方法不断更新每个网页的 PageRank 值，直到达到收敛。这个过程可以理解为网页之间相互传递 PageRank 值的过程，最终得到每个网页的最终 PageRank 值。</p><p>需要注意的是，PageRank 计算公式中的阻尼因子 d 是用来避免概率泄漏的问题，它表示用户点击链接继续浏览的概率。一般来说，阻尼因子的值取 0.85。</p><h2 id="倒排索引" tabindex="-1">倒排索引 <a class="header-anchor" href="#倒排索引" aria-label="Permalink to &quot;倒排索引&quot;">​</a></h2><blockquote><p>在此之前你应该有自然语言处理的基础--分词（把一段话分成多个词）</p></blockquote><p>这里考虑的就是如何存储该结构化内容以达到用户检索时可以迅速查找，快速响应的效果，所以这里使用了倒排索引的技术，既然有倒排索引，那必然就有正排索引，了解它俩的区别你就自然知道了为什么要使用倒排索引了。</p><p><strong>正排索引</strong>就是我们常见的思维：以文档为主键</p><p><img src="https://oss.justin3go.com/blogs/%E6%AD%A3%E6%8E%92%E7%B4%A2%E5%BC%95.png" alt=""></p><p>此时，用户如果搜索关键词“苹果”，按照这种存储方式，搜索引擎就只能通过文档 ID 去一行一行遍历，查找该文档是否包含“苹果”这个关键词，显然效率是非常低的。</p><p>而<strong>倒排索引</strong>就是以关键词为主键：</p><p><img src="https://oss.justin3go.com/blogs/%E5%80%92%E6%8E%92%E7%B4%A2%E5%BC%95.png" alt=""></p><p>此时，用户输入关键词，就可以很快找到对应关键词那一行，从而找到哪些文档包含了该关键词，再对这些文档进行下一步的操作...</p><p>这里简单介绍了为什么要使用倒排索引，但倒排索引的建立过程也是较为复杂且值得研究的部分，继续挖坑，后续可能单开文章介绍。</p><h2 id="搜索模块" tabindex="-1">搜索模块 <a class="header-anchor" href="#搜索模块" aria-label="Permalink to &quot;搜索模块&quot;">​</a></h2><p>上述几个章节都是离线模块的介绍，本章节就是在线系统的讲解了，从用户输入搜索词开始，到返回对应的网页列表结束，如下是一个完整的过程图：</p><p><img src="https://oss.justin3go.com/blogs/%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%9D%97%E7%9A%84%E8%BF%87%E7%A8%8B%E8%AF%A6%E7%BB%86.png" alt=""></p><p>简单描述一下：</p><ol><li>用户输入搜索词</li><li>对搜索词进行处理，比如去掉停用词，“北京的故宫”==&gt; “北京”,“故宫”</li><li>从索引库中找到与这些关键词相关的文档</li><li>检索词表示与文档表示做相似度计算（布尔模型、向量空间模型等等）</li><li>取出前 K 个文档</li><li>通过一系列手段进行排序</li><li>摘要，可以是离线摘要，就是提前对网页做出摘要处理</li><li>生成结果</li></ol><p>当然，肯定是有缓存技术的，不过这对于程序员来说太常见了，这里就不单独介绍了，但毋庸置疑其是非常重要的。</p><p>当然，一切都是为了用户体验，搜索接口中如下操作也是极为影响用户体验的：</p><ul><li>搜索智能能提示</li><li>文本纠错</li><li>搜索词高亮显示（需要记录关键词在文档中的偏移位置）</li><li>略...</li></ul><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>搜索引擎的内容非常之多，本文斗胆谈了谈搜索引擎，对其基本架构及较为关键的技术进行了简单介绍，希望对你有所帮助，扩展一下大家的知识面。</p>',25))])}const u=e(s,[["render",n]]);export{c as __pageData,u as default};
