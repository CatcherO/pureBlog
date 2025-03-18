import{_ as a,c as n,o as i,ar as p}from"./chunks/framework.Dw9xXWbv.js";const d=JSON.parse('{"title":"自托管项目工具 plane 管理自己的 TodoList","description":"","frontmatter":{"title":"自托管项目工具 plane 管理自己的 TodoList","date":"2023-09-29T00:00:00.000Z","tags":["plane","TodoList","Django","Docker","HTTPS"]},"headers":[],"relativePath":"posts/2023/09/29自托管项目工具plane管理自己的TodoList.md","filePath":"posts/2023/09/29自托管项目工具plane管理自己的TodoList.md","lastUpdated":1742015773000}'),e={name:"posts/2023/09/29自托管项目工具plane管理自己的TodoList.md"};function l(t,s,h,o,c,k){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="自托管项目工具-plane-管理自己的-todolist" tabindex="-1">自托管项目工具 plane 管理自己的 TodoList <a class="header-anchor" href="#自托管项目工具-plane-管理自己的-todolist" aria-label="Permalink to &quot;自托管项目工具 plane 管理自己的 TodoList&quot;">​</a></h1><blockquote><p>✨文章摘要（AI生成）</p></blockquote><p>笔者最近发现了一个名为<code>plane</code>的开源项目管理工具，作为 Jira 的替代品，后端使用 Django 框架。经过简单的部署，笔者将其用于管理自己的 TodoList。部署过程相对简单，主要依赖 Docker，按照官方文档的指示进行操作，同时确保了 HTTPS 的安全性。</p><p>在配置 NGINX 时，笔者特别设置了不同的端口以避免冲突，并在<code>docker-compose.yml</code>文件中定义了服务的结构。通过配置 SSL 证书，笔者成功实现了 HTTP 到 HTTPS 的重定向。为了保持系统的优雅性，笔者选择了通过 NGINX 代理进行解耦，而不是直接修改<code>plane</code>的源代码。</p><p>在使用上，笔者将每年的计划视为一个项目，并利用标签和视图功能对 TodoList 进行分类和过滤。尽管<code>plane</code>仍存在一些 bug，笔者对其未来的改进充满期待，并希望在使用中找到更高效的管理方式。</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>前面一段时间发现了这个<code>plane</code>项目管理工具，号称 jira 的开源替代，然后看了看，这个项目的后端竟然是使用的 Django 框架，瞬间就对这个 plane 仓库产生了兴趣，于是就稍微折腾了一下，自部署了这个 plane 工具，作为自己的项目管理工具以及 TodoList 管理工具。</p><h2 id="基本部署" tabindex="-1">基本部署 <a class="header-anchor" href="#基本部署" aria-label="Permalink to &quot;基本部署&quot;">​</a></h2><p>首先项目里面的东西是非常重要的，且有些也比较隐私，所以 https 对于笔者来说是必不可少的。</p><p>得益于 docker 的优势，部署起来非常简单，基本上根据<a href="https://docs.plane.so/self-hosting" target="_blank" rel="noreferrer">官方文档</a>的自托管教程来就行，不过第一步笔者是直接 clone 的整个仓库，因为还是想学习一下，如果你只是单纯的想部署，不想管其中的代码，则可以按照官方文档的那些参数进行 clone，笔者的命令如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git@github.com:makeplane/plane.git</span></span></code></pre></div><p>然后运行其中的<code>setup.sh</code>文件，由于笔者是使用的 https，所以命令如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./setup.sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://plane.justin3go.com</span></span></code></pre></div><p>然后根据其提示进行输入即可...</p><p>最后，配置根目录下的环境变量，比如：</p><ol><li>如果需要发送邮件，记得配置邮箱</li><li>pg 的账号密码最好改一下</li><li><code>ENABLE_SIGNUP</code>笔者是设置的<code>0</code>，不允许注册，因为是自用</li><li>反正根据自己情况配置即可，默认的配置也行，大不了不满意再改就是</li></ol><p>然后运行如下命令即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker compose -f docker-compose-hub.yml up</span></span></code></pre></div><h2 id="https-nginx-相关配置" tabindex="-1">https-&gt;nginx 相关配置 <a class="header-anchor" href="#https-nginx-相关配置" aria-label="Permalink to &quot;https-&gt;nginx 相关配置&quot;">​</a></h2><p>非常值得注意的是，<code>NGINX_PORT</code>需要设置为另外一个端口，因为笔者这里是在同一台机器上部署两个 nginx，其中一个 nginx 来作为 https 的代理转发，比如笔者设置为<code>NGINX_PORT=8888</code>，此时项目结构为这样的：</p><p><img src="https://oss.justin3go.com/blogs/https_plane%E7%9A%84nginx%E7%BB%93%E6%9E%84.png" alt=""></p><p>这里同样笔者还是使用 docker 安装的 https_nginx，在<code>/root/work/nginx</code>目录中进行操作：</p><p>该目录结构为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nginx</span></span>
<span class="line"><span>├─ cert</span></span>
<span class="line"><span>│  ├─ plane.justin3go.com.key</span></span>
<span class="line"><span>│  └─ plane.justin3go.com.pem</span></span>
<span class="line"><span>├─ conf.d</span></span>
<span class="line"><span>│  └─ default.conf</span></span>
<span class="line"><span>├─ docker-compose.yml</span></span>
<span class="line"><span>├─ dockerReset.sh</span></span>
<span class="line"><span>└─ logs</span></span>
<span class="line"><span>   ├─ access.log</span></span>
<span class="line"><span>   └─ error.log</span></span></code></pre></div><p>cert 下的文件就不多说了，就是自己去 ssl 那里下载的相关证书文件</p><p>conf.d 文件如下，做了以下操作：</p><ol><li>监听 443 端口，设置 ssl，并代理转发到 8888 端口</li><li>监听 80，重定向到 443</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 443 ssl http2;</span></span>
<span class="line"><span>    server_tokens off;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 修改为自己的域名</span></span>
<span class="line"><span>    server_name plane.justin3go.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # ssl 证书存放位置</span></span>
<span class="line"><span>    ssl_certificate /etc/nginx/cert/plane.justin3go.com.pem;</span></span>
<span class="line"><span>    ssl_certificate_key /etc/nginx/cert/plane.justin3go.com.key;</span></span>
<span class="line"><span>    ssl_session_timeout 5m;</span></span>
<span class="line"><span>    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span>    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span>    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    root /www/data/;</span></span>
<span class="line"><span>    access_log /var/log/nginx/access.log;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    client_max_body_size 4M;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_pass http://plane.justin3go.com:8888/;       </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    root /www/data/;</span></span>
<span class="line"><span>    #请填写绑定证书的域名</span></span>
<span class="line"><span>    server_name plane.justin3go.com; </span></span>
<span class="line"><span>    #把 http 的域名请求转成 https</span></span>
<span class="line"><span>    return 301 https://plane.justin3go.com$request_uri; </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>docker-compose.yml 文件如下：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;3.8&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  nginx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx:stable-alpine</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # 指定服务镜像</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx_https</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 容器名称</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">always</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                 # 重启方式</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:                          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 映射端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;80:80&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;443:443&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    volumes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:                        </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 挂载数据卷</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/localtime:/etc/localtime</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/root/work/nginx/conf.d:/etc/nginx/conf.d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/root/work/nginx/logs:/var/log/nginx</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/root/work/nginx/cert:/etc/nginx/cert</span></span></code></pre></div><p>dockerReset.sh 是一个非常简单的 docker 命令的脚本文件，看自己的情况是否需要：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 关闭容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除容器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker-compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> down</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对空间进行自动清理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> system</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prune</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看日志</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># docker logs plane-proxy;</span></span></code></pre></div><p>上述 nginx-https 配置笔者也会全部上传到<a href="https://github.com/Justin3go/nginx-https-template" target="_blank" rel="noreferrer">这个仓库</a>中，方便使用，如果大家需要的话。</p><p>最后，运行如下命令即可：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./dockerReset.sh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># run shell script</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./dockerReset.sh</span></span></code></pre></div><p>注：需要先运行 plane 的 docker 镜像，再运行这边 nginx-https 的 docker 镜像，因为 plane 那边的会有条命令删除 default.conf 文件，所以先后顺序不能调换。</p><h2 id="部署杂谈" tabindex="-1">部署杂谈 <a class="header-anchor" href="#部署杂谈" aria-label="Permalink to &quot;部署杂谈&quot;">​</a></h2><p>其实你也可以直接更改 plane 项目中的 docker-compose-hub.yml 文件，将其中的 proxy 部分改为 docker-compose.yml 中的 proxy 部分并修改为上述的 https 配置，这也是笔者最开始部署的时候采用的方法，不过由于更改了 plane 项目的源代码，不太优雅，所以就再增加了一个 nginx 代理进行解耦。</p><h2 id="plane-基本介绍" tabindex="-1">plane 基本介绍 <a class="header-anchor" href="#plane-基本介绍" aria-label="Permalink to &quot;plane 基本介绍&quot;">​</a></h2><p>你可以在<a href="https://docs.plane.so/workspaces" target="_blank" rel="noreferrer">这个链接</a>中看到 plane 的核心概念，这里就不过多介绍了，基本上就是平常大家接触的那些概念，并且文档也非常清晰。</p><h2 id="作为自己的-todolist" tabindex="-1">作为自己的 TodoList <a class="header-anchor" href="#作为自己的-todolist" aria-label="Permalink to &quot;作为自己的 TodoList&quot;">​</a></h2><p>让 plane 作为项目管理工具大家应该都轻车熟路了，而这里笔者将其作为个人的 TodoList 管理工具，基本思路如下：</p><p>每一年的计划作为一个项目，比如几个月后还会有个人规划 2024 之类的：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230929150755.png" alt=""></p><p>通过 labels 来区分规划中的不同分类：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230929151014.png" alt=""></p><p>views 来过滤视图：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230929151117.png" alt=""></p><p>当然，更多功能结合 todolist 的方式笔者也还在探索中，比如通过 cycle 作为我的一天计划之类的，iusse 视图也有甘特图，日历图之类的展示方式，也非常方便：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230929151343.png" alt=""></p><p>以及展板之类的统计图，一年之后来看应该会有所感概：</p><p><img src="https://oss.justin3go.com/blogs/Pasted%20image%2020230929151439.png" alt=""></p><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>管理项目和管理自己其实有异曲同工之妙，希望能找到一种合理的方式使用这个 Plane 工具；</p><p>值得一提的是，plane 目前还有不少 bug，比如项目背景图不能修改，网站图标不显示之类的，这个 iusse 里面也有，期待其变得更好，当然，如果有精力也可以试试贡献代码。</p>`,55)]))}const g=a(e,[["render",l]]);export{d as __pageData,g as default};
