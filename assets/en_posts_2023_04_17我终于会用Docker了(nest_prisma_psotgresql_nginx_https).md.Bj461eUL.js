import{_ as a,c as n,o as i,ar as p}from"./chunks/framework.Dw9xXWbv.js";const d=JSON.parse('{"title":"我终于会用 Docker 了(nest+prisma+psotgresql+nginx+https)","description":"","frontmatter":{"title":"我终于会用 Docker 了(nest+prisma+psotgresql+nginx+https)","date":"2023-04-17T00:00:00.000Z","tags":["docker","nest","prisma","postgresql","nginx","https"]},"headers":[],"relativePath":"en/posts/2023/04/17我终于会用Docker了(nest+prisma+psotgresql+nginx+https).md","filePath":"en/posts/2023/04/17我终于会用Docker了(nest+prisma+psotgresql+nginx+https).md","lastUpdated":1742015773000}'),e={name:"en/posts/2023/04/17我终于会用Docker了(nest+prisma+psotgresql+nginx+https).md"};function l(t,s,r,h,o,k){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="我终于会用-docker-了-nest-prisma-psotgresql-nginx-https" tabindex="-1">我终于会用 Docker 了(nest+prisma+psotgresql+nginx+https) <a class="header-anchor" href="#我终于会用-docker-了-nest-prisma-psotgresql-nginx-https" aria-label="Permalink to &quot;我终于会用 Docker 了(nest+prisma+psotgresql+nginx+https)&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>笔者在这篇文章中分享了自己使用 Docker 进行 NestJS 后端服务部署的实践经历。文章首先介绍了 Docker 的基本概念和优势，比如简化应用部署和跨平台的可移植性。随后，笔者列出了常用的 Docker 命令并详细解释了 Dockerfile 和 docker-compose.yml 的编写过程，以实现 NestJS、PostgreSQL 和 Nginx 的整合部署。</p><p>在实战部分，笔者提供了项目目录结构、Dockerfile 示例以及 docker-compose 配置，强调了持久化存储和环境变量的使用。此外，笔者还分享了在使用 Prisma 时遇到的一个小问题，提醒读者注意容器间的连接配置。</p><p>整体而言，本文不仅是对 Docker 基础知识的回顾，也展示了实际操作中的一些细节与坑点，旨在帮助读者更好地理解和应用 Docker 技术。希望对大家的部署工作有所帮助。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>这次自己有一个 NestJS 后端服务需要自己部署了，之前部署 node 服务可能更多是 pm2 那一套，自己的项目可以尝试各种各样的技术，所以这次就尝试一下早就想用的 docker 来实际部署一下</p><p>本文会讲什么：对于 docker 的理解，docker 必知必会的命令，以及最后是笔者的实战部署，和一些踩坑记录； 本文不会讲什么：docker 更深层次的原理，即本文更多是一篇应用性文章，欢迎继续阅读后续章节；</p><h2 id="基本概念介绍" tabindex="-1">基本概念介绍 <a class="header-anchor" href="#基本概念介绍" aria-label="Permalink to &quot;基本概念介绍&quot;">​</a></h2><h3 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h3><p>如果是计算机专业的学生，那么是肯定学过操作系统的，而学这门课程有一门操作系统实验，需要自己在 linux 上通过模拟器再运行一个非常低版本的 linux，笔者隐约记得好像是 0.11 那个版本，因为这个版本代码相对来说都是比较核心主要的功能，用来学习是非常不错的。</p><p>在操作系统运行一个可以运行其他环境的&quot;系统环境&quot;，这不就是 Docker 的概念吗。或者如果你没有上述的经历，那总在本机运行过 VM 吧，甚至说 win11 中的 wsl 总知道吧。</p><p><strong>基本概念就是这个：在 linux 系统上运行一个&quot;系统环境&quot;，官方叫做容器。</strong></p><p>那这个所谓的&quot;系统环境&quot;可以做什么呢，当然是运行一些我们常用的东西，如 node、mysql、redis 以及我们自己的应用程序等。</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230417094610.png" alt=""><a href="https://www.docker.com/resources/what-container/" target="_blank" rel="noreferrer">图片来源</a></p><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>好，问题又来了，为什么不直接在该 linux 系统上运行这些环境：这个问题用 Docker 的主要优势就能回答：</p><p><strong>1）简化应用程序部署和依赖管理</strong></p><p>Docker 是将应用程序和其依赖项打包在一个容器中，避免了复杂的依赖管理和手动安装，因此可以快速部署和更新应用程序。</p><p>怎么理解：</p><ul><li>python 打包 exe 用过吧：它会将其依赖的所有环境一起打包最后成为一个可执行文件，形成了这样一个可执行文件，是不是用户只需要双击就能打开，不需要像程序员一样安装各种复杂的依赖</li><li>前端的 electron 用过吧：它也将应用程序与浏览器环境打包在一起了，用户也可以直接使用你的应用程序了</li><li>这么理解：有了它，我们就可以直接把这个&quot;软件包&quot;进行部署，而没有它，我们就需要到用户的主机，去干什么<code>pip install</code>之类的，真累~</li></ul><p><strong>2）跨平台和环境可移植性</strong></p><p>Docker 容器可以在任何操作系统、云平台和虚拟化环境中运行，保证了应用程序在不同环境下的稳定性和可靠性。</p><p>也是第一点所讲到的，既然都打包成了一个软件包，那么就可以非常方便地运行在各个环境之中了：</p><ul><li>想想 Java 虚拟机 JVM，Java 刚出的时候主打的就是一个可移植性，其就是通过先编译成字节码，也就是那个<code>.class</code>文件，然后该文件就可以在任何安装了 JVM 的系统上运行了。</li><li>Docker 也是，只要该环境安装了 Docker，那么由其打包的&quot;软件包&quot;也就能直接运行了</li></ul><h3 id="一些关键词及概念" tabindex="-1">一些关键词及概念 <a class="header-anchor" href="#一些关键词及概念" aria-label="Permalink to &quot;一些关键词及概念&quot;">​</a></h3><p>想入门某个领域，第一步就是得先了解该领域特有的关键热词，下面是 Docker 中常用的一些关键词及概念简介：</p><ol><li><strong>Docker 镜像(Image)</strong>: Docker 镜像是一个轻量级的、可移植的、自包含的软件包，其中包含了运行某个应用程序所需的所有文件、配置和依赖项。</li><li><strong>Docker 容器(Container)</strong>: Docker 容器是由 Docker 镜像创建的运行实例，容器中包含了所有运行应用程序所需的文件、配置和依赖项，以及运行时环境。</li></ol><blockquote><p>镜像与容器的概念就和程序与进程的概念是一致的，一个是乐谱，另外一个就是正在演奏的音乐了</p></blockquote><ol start="4"><li><strong>Docker 仓库(Registry)</strong>: Docker 仓库是一个用于存储和共享 Docker 镜像的中央存储库，Docker Hub 是一个公共的 Docker 仓库。</li><li><strong>Dockerfile</strong>: Dockerfile 是一个文本文件，其中包含了一组指令，用于自动化构建 Docker 镜像。就和 C 语言中的 Makefile 差不多。</li><li><strong>Docker Compose</strong>: Docker Compose 是一个工具，用于定义和运行多个 Docker 容器组成的应用程序，并管理它们之间的交互。</li><li><strong>Docker 网络(Network)</strong>: Docker 网络是一种机制，用于在多个 Docker 容器之间建立网络连接，以实现容器之间的通信。</li><li><strong>Docker 数据卷(Volume)</strong>: Docker 数据卷是一种机制，用于在 Docker 容器和主机之间共享数据。</li><li><strong>Docker daemon</strong>：是 Docker 的核心组件之一，也称为 Docker 引擎。它是一个长期运行的后台进程，负责管理 Docker 镜像、容器、网络和存储卷等资源。</li></ol><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230417094716.png" alt=""><a href="https://algodaily.com/lessons/what-is-a-container-a-docker-tutorial" target="_blank" rel="noreferrer">图片来源</a></p><p><em>相关概念如果不理解也没关系，后续实战时看看这些东西到底长啥样，就自然而然就明白了</em></p><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><p>这里简单索引并介绍一下笔者自己常用的一些关于 docker 及 docker-compose 相关的命令，希望对你所有帮助：</p><table tabindex="0"><thead><tr><th>命令</th><th>作用</th><th>备注</th></tr></thead><tbody><tr><td><code>docker ps -n 5</code></td><td>查看正在运行的前 5 个容器</td><td>数字代表前几个，也可以不加-n，就是所有；就和<code>ps -ef</code>查看正在运行的进程一样</td></tr><tr><td><code>docker rm $(docker ps -a -q)</code></td><td>删除所有已经停止的容器</td><td>无</td></tr><tr><td><code>docker tag [镜像 id] [新镜像名称]:[新镜像标签]</code></td><td>根据 id 为某个镜像添加名称及标签</td><td>偶尔镜像名字显示<code>&lt;none&gt;</code>时极其有用</td></tr><tr><td>略</td><td>容器/镜像的导入与导出</td><td><a href="https://zhuanlan.zhihu.com/p/619626619" target="_blank" rel="noreferrer">参考链接</a></td></tr><tr><td><code>docker-compose up -d</code></td><td>启动并后台运行</td><td>无</td></tr><tr><td><code>docker exec -i -t containerId /bin/bash</code></td><td>进入到容器内部，并启动一个 bash shell，开始交互式操作</td><td>CTRL+D 退出</td></tr></tbody></table><p>Docker 与 Docker-compose：构建镜像</p><table tabindex="0"><thead><tr><th>命令</th><th>作用</th><th>备注</th></tr></thead><tbody><tr><td><code>docker build -t nest-api .</code></td><td>在当前目录<code>.</code>构建镜像，默认使用 Dockerfile 文件</td><td>-f 指定任一 Dockerfile 文件；-t 代表镜像名</td></tr><tr><td><code>docker-compose build</code></td><td>在当前目录，通过默认的 docker-compose.yml 文件进行构建</td><td>略</td></tr></tbody></table><p>一般一个 Dockerfile 对应一个容器，如果我们要部署多个容器，就需要每次运行各个不同的 Dockerfile，为了简化 docker 的复杂操作，就有了 dcoekr-compose，它就可以在其 yml 文件上写多个镜像进行部署容器</p><p>还有就是这里有一个 shell 脚本，后续会使用该<code>setup.sh</code>，作用就是每次更新部署时在对应目录运行就可以了：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/usr/bin/env bash</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#image_version=\`date +%Y%m%d%H%M\`;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 关闭容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> down</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 构建镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动并后台运行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> logs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodejs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对空间进行自动清理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> system</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prune</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span></span></code></pre></div><h2 id="实战" tabindex="-1">实战 <a class="header-anchor" href="#实战" aria-label="Permalink to &quot;实战&quot;">​</a></h2><p>现在，你已经了解了 Docker 的相关概念以及 Docker 的一些常用操作了，下面就进入实战让你练练手并加深理解。</p><p>我的项目文件目录如下：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nest-api</span></span>
<span class="line"><span>├─ .dockerignore</span></span>
<span class="line"><span>├─ .eslintrc.js</span></span>
<span class="line"><span>├─ .github</span></span>
<span class="line"><span>│  └─ workflows</span></span>
<span class="line"><span>│     └─ ci.yml</span></span>
<span class="line"><span>├─ .gitignore</span></span>
<span class="line"><span>├─ .graphqlconfig</span></span>
<span class="line"><span>├─ .node-version</span></span>
<span class="line"><span>├─ .prettierrc.json</span></span>
<span class="line"><span>├─ .vscode</span></span>
<span class="line"><span>│  └─ extensions.json</span></span>
<span class="line"><span>├─ docker-compose.db.yml</span></span>
<span class="line"><span>├─ docker-compose.migrate.yml</span></span>
<span class="line"><span>├─ docker-compose.yml</span></span>
<span class="line"><span>├─ Dockerfile</span></span>
<span class="line"><span>├─ Dockerfile.alpine</span></span>
<span class="line"><span>├─ LICENSE</span></span>
<span class="line"><span>├─ nest-cli.json</span></span>
<span class="line"><span>├─ package-lock.json</span></span>
<span class="line"><span>├─ package.json</span></span>
<span class="line"><span>├─ pull-env.sh</span></span>
<span class="line"><span>├─ .env</span></span>
<span class="line"><span>├─ README.md</span></span>
<span class="line"><span>├─ run.sh</span></span>
<span class="line"><span>├─ setup.sh</span></span>
<span class="line"><span>├─ src[略]</span></span>
<span class="line"><span>略...</span></span></code></pre></div><h3 id="prisma-nest-应用的-dockerfile" tabindex="-1">prisma+nest 应用的 Dockerfile <a class="header-anchor" href="#prisma-nest-应用的-dockerfile" aria-label="Permalink to &quot;prisma+nest 应用的 Dockerfile&quot;">​</a></h3><p>编写自己的 NestJS 应用需要的 Dockerfile：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FROM node:16-alpine AS builder</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Create app directory</span></span>
<span class="line"><span>WORKDIR /app</span></span>
<span class="line"><span></span></span>
<span class="line"><span># A wildcard is used to ensure both package.json AND package-lock.json are copied</span></span>
<span class="line"><span>COPY package*.json ./</span></span>
<span class="line"><span>COPY prisma ./prisma/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Install app dependencies</span></span>
<span class="line"><span>RUN npm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>COPY . .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUN npm run build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FROM node:16-alpine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WORKDIR /app</span></span>
<span class="line"><span></span></span>
<span class="line"><span>COPY --from=builder /app/node_modules ./node_modules</span></span>
<span class="line"><span>COPY --from=builder /app/package*.json ./</span></span>
<span class="line"><span>COPY --from=builder /app/dist ./dist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EXPOSE 3000</span></span>
<span class="line"><span>CMD [ &quot;npm&quot;, &quot;run&quot;, &quot;start:prod&quot; ]</span></span></code></pre></div><p>这些英文单词都是一看就差不多懂得命令这里就不过多赘述了，其中<code>FROM node:16-alpine</code>代表该镜像继承自 node 镜像，毕竟是个 node 应用嘛；<code>apline</code>版本更加轻量，打包体积更小，一般来说不去编写哪些 C++扩展都是够用的。</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230417111640.png" alt=""></p><p><a href="https://juejin.cn/post/6844904006184091662#heading-6" target="_blank" rel="noreferrer">图片来源</a></p><h3 id="nest-应用-postgresql-niginx-的-yml-配置" tabindex="-1">nest 应用+postgresql+niginx 的 yml 配置 <a class="header-anchor" href="#nest-应用-postgresql-niginx-的-yml-配置" aria-label="Permalink to &quot;nest 应用+postgresql+niginx 的 yml 配置&quot;">​</a></h3><p>此时相当于我们就有我们自己应用的镜像文件了，但其依赖的环境还没有，比如 postgresql；还有就是我需要的 nginx，这些都是有现成的，所以就不用自己构建了，直接使用；但想要将它们弄在一起，就需要编写<code>docker-compose.yml</code>文件，如下：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.8&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  nest-api</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nest-api</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      dockerfile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Dockerfile</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3000:3000&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    depends_on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">postgres</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    env_file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.env</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  postgres</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">postgres:13</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">postgres</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">always</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;5432:5432&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    env_file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.env</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">postgres:/var/lib/postgresql/data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  nginx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx:stable-alpine</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 指定服务镜像</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 容器名称</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">always</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 # 重启方式</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:                          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 映射端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;80:80&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;443:443&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:                        </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 挂载数据卷</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/localtime:/etc/localtime</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/ubuntu/work/nginx/conf.d:/etc/nginx/conf.d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/ubuntu/work/nginx/logs:/var/log/nginx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/ubuntu/work/nginx/cert:/etc/nginx/cert</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    depends_on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:                     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动顺序</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nest-api</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  postgres</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nest-db</span></span></code></pre></div><p>其中<code>volumes</code>的意思就是让容器中的某个文件与操作系统中的某个文件进行对应，从而做到持久化存储。</p><h3 id="配置-niginx" tabindex="-1">配置 niginx <a class="header-anchor" href="#配置-niginx" aria-label="Permalink to &quot;配置 niginx&quot;">​</a></h3><p>上述中的：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/ubuntu/work/nginx/conf.d:/etc/nginx/conf.d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/ubuntu/work/nginx/logs:/var/log/nginx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/home/ubuntu/work/nginx/cert:/etc/nginx/cert</span></span></code></pre></div><p>冒号前面的路径是我自己在操作系统环境中创建的路径，你也可以根据自己的习惯进行创建，然后对应到容器的路径就可以了</p><p><strong>1）conf.d 配置</strong></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/ubuntu/work/nginx/conf.d/default.conf</span></span></code></pre></div><p>该文件内容如下：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server {</span></span>
<span class="line"><span>  listen 443 ssl http2;</span></span>
<span class="line"><span>  server_tokens off;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  root /var/www/html;</span></span>
<span class="line"><span>  index index.html index.htm;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 修改为自己的域名</span></span>
<span class="line"><span>  server_name api.example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  client_max_body_size 4M;</span></span>
<span class="line"><span>  # ssl 证书存放位置</span></span>
<span class="line"><span>  ssl_certificate /etc/nginx/cert/api.example.com.pem;</span></span>
<span class="line"><span>  ssl_certificate_key /etc/nginx/cert/api.example.com.key;</span></span>
<span class="line"><span>  ssl_session_timeout 5m;</span></span>
<span class="line"><span>  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span>  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span>  ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 访问 / 路径时执行反向代理</span></span>
<span class="line"><span>  location / {</span></span>
<span class="line"><span>    # 这里 nodejs 是 node 容器名</span></span>
<span class="line"><span>    proxy_pass http://nest-api:3000;</span></span>
<span class="line"><span>    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>    proxy_set_header Host $host;</span></span>
<span class="line"><span>    # 后端的 Web 服务器可以通过 X-Forwarded-For 获取用户真实 IP</span></span>
<span class="line"><span>    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>    # 允许客户端请求的最大单文件字节数</span></span>
<span class="line"><span>    client_max_body_size 15M;</span></span>
<span class="line"><span>    # 缓冲区代理缓冲用户端请求的最大字节数</span></span>
<span class="line"><span>    client_body_buffer_size 128k;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>   listen 80;</span></span>
<span class="line"><span>   #请填写绑定证书的域名</span></span>
<span class="line"><span>   server_name api.example.com; </span></span>
<span class="line"><span>   #把 http 的域名请求转成 https</span></span>
<span class="line"><span>   return 301 https://$host$request_uri; </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>2）cert 文件夹</p><p>记得放入你下载的 ssl 证书就可以了。</p><p>3）logs</p><p>对应的日志，有问题就就<code>cat</code>一下，看里面有 error 不</p><h3 id="prisma-的一个踩坑" tabindex="-1">prisma 的一个踩坑 <a class="header-anchor" href="#prisma-的一个踩坑" aria-label="Permalink to &quot;prisma 的一个踩坑&quot;">​</a></h3><p>这是 prisma 需要的 databaseURL：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>DATABASE_URL=postgresql://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${POSTGRES_DB}?schema=\${DB_SCHEMA}&amp;sslmode=prefer</span></span></code></pre></div><p>其中<code>DB_HOST</code>在 nest 运行在本地的时候，比如你启动了 postgresql，然后<code>npm run start:dev</code>，这时候<code>DB_HOST=localhost</code></p><p>而当你 nest 运行在容器中，比如部署的时候<code>docker-compose up -d</code>，就需要改为对应容器的名字<code>postgres</code></p><p>我确实忘改了😭😭😭</p><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>笔者在本文主要叙述了如下部分，也可以当作自检清单：</p><ol><li>docker 是什么</li><li>docker 的优势，为什么要使用它</li><li>docker 相关的关键词及概念</li><li>常用命令</li><li>最后用了现在比较新的一些技术栈部署实践</li></ol><p>本文实战部分没有每步都截图演示，假的理由是因为自己试试比啥都好，真实原因是懒得再去运行截图了...</p><p>最后希望本文对你有所帮助，如果本文中理解有误或者操作配置不当，也希望互帮互助，在评论区中友善指出...</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/7147483669299462174" target="_blank" rel="noreferrer">前端全栈之路 - 玩转 Docker (基础)</a></li><li><a href="https://juejin.cn/post/7132533610707419173" target="_blank" rel="noreferrer">如何通过 Dockerfile 优化 Nestjs 镜像大小</a></li><li><a href="https://juejin.cn/post/6844904006184091662" target="_blank" rel="noreferrer">使用 Jenkins + Docker + Nginx + MySQL + Redis 自动部署 Node 项目</a></li><li><a href="https://juejin.cn/post/6844904004296638478" target="_blank" rel="noreferrer">给前端写的 Docker+Node+Nginx+Mongo 的本地开发+部署实战</a></li><li><a href="https://juejin.cn/post/7169485484568084510" target="_blank" rel="noreferrer">使用 GitHub Actions 完成 Nest 项目自动打包并发布到服务器</a></li><li><a href="https://juejin.cn/post/7205508171523604540" target="_blank" rel="noreferrer">Nestjs | 实践：如何编写生产环境下的 Dockerfile?</a></li><li><a href="https://juejin.cn/post/7175937839069134903" target="_blank" rel="noreferrer">Nest 系列（八）一路坎坷，我实现了最简便的方式打包部署 nestjs+prisma 应用</a></li><li><a href="https://github.com/docker/compose-cli/issues/1537" target="_blank" rel="noreferrer">Running docker compose up -d (strconv.Atoi: parsing &quot;&quot;: invalid syntax)</a></li><li><a href="https://cloud.tencent.com/document/product/400/35244" target="_blank" rel="noreferrer">Nginx 服务器 SSL 证书安装部署</a></li><li><a href="https://www.quanxiaoha.com/docker/docker-nginx-install-ssl.html" target="_blank" rel="noreferrer">Docker Nginx 配置安装 SSL 证书（支持 Https 访问）</a></li><li><a href="https://notiz.dev/blog/prisma-migrate-deploy-with-docker" target="_blank" rel="noreferrer">Prisma Migrate: Deploy Migration with Docker</a></li></ul>`,79)]))}const g=a(e,[["render",l]]);export{d as __pageData,g as default};
