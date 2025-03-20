# VitePress 博客模板

![部署状态](https://img.shields.io/github/actions/workflow/status/yourusername/vitepress-blog-template/deploy.yml?branch=main&label=部署)
![GitHub最新发布](https://img.shields.io/github/v/release/yourusername/vitepress-blog-template?include_prereleases&label=最新版本)
![许可证](https://img.shields.io/github/license/yourusername/vitepress-blog-template?label=许可证)

一个基于 VitePress 的博客模板，支持多主题、多语言、RSS 订阅等功能。简单配置即可快速部署到 GitHub Pages。

## 特性

- 📝 使用 Markdown 编写博客
- 🌙 自动深色模式支持
- 🎨 自定义主题颜色
- 🌍 多语言支持 (中文/英文)
- 📰 RSS 订阅支持
- 🏷️ 标签分类
- 🔍 全文搜索
- 📱 响应式设计
- 🚀 一键部署到 GitHub Pages

## 快速开始

### 从模板创建（推荐）

1. 点击此仓库页面顶部的 **Use this template** 按钮
2. 选择 **Create a new repository**
3. 输入你的仓库名称，推荐使用 `blog` 或 `your-username.github.io`
4. 将仓库设为公开或私有（注意：GitHub Pages需要公开仓库，除非你使用GitHub Pro）
5. 点击 **Create repository from template**

### 克隆并手动设置

```bash
# 克隆仓库
git clone https://github.com/yourusername/vitepress-blog-template.git my-blog
cd my-blog

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

## 自定义配置

所有配置都集中在 `blogConfig.json` 文件中，你可以轻松修改：

1. 修改 `theme` 选择使用的主题，默认为 `"default"`
2. 更新站点信息：标题、描述、主机地址等
3. 修改导航菜单、页脚和社交链接
4. 自定义主题颜色

## 部署到 GitHub Pages

此模板已配置好 GitHub Actions 工作流，可自动部署到 GitHub Pages：

1. 前往你的仓库 **Settings > Pages**
2. 在 **Source** 部分，选择 **GitHub Actions**
3. 推送任何更改到 `main` 分支将自动触发部署

你还可以通过修改 `blogConfig.json` 中的 `site.basePath` 来设置基础路径：

- 如果使用自定义域名或仓库名为 `username.github.io`，设置为 `"/"`
- 否则设置为 `"/你的仓库名"`

## 使用自定义域名

1. 前往仓库 **Settings > Pages**
2. 在 **Custom domain** 部分输入你的域名
3. 创建一个名为 `CNAME` 的文件到 `docs/public/` 目录，内容为你的域名
4. 在你的域名注册商那里添加DNS记录，将域名指向你的GitHub Pages

## 文件结构

```
.
├── blogConfig.json    # 博客配置文件
├── docs               # 文档源文件
│   ├── .vitepress     # VitePress 配置
│   ├── posts          # 中文博客文章
│   ├── en             # 英文内容
│   │   └── posts      # 英文博客文章
│   ├── pages          # 特殊页面 (关于、归档等)
│   ├── public         # 静态资源
│   └── index.md       # 首页
├── .github/workflows  # GitHub Actions 工作流配置
└── package.json       # 项目依赖
```

## 编写博客文章

在 `docs/posts` 目录下创建新的 Markdown 文件，文件名格式建议为 `YYYY-MM-DD-title.md`。

文章 frontmatter 示例：

```md
---
title: 文章标题
date: 2024-01-01
tags: [tag1, tag2]
cover: /images/cover.jpg
---

文章内容...
```

## 自定义主题颜色

你可以通过修改 `blogConfig.json` 中的颜色配置自定义网站主题色：

```json
{
  "colors": {
    "light": {
      "brand": {
        "1": "#2949a4", // 主色调
        "2": "#0749ff", // 更亮的色调
        "3": "#7494ec", // 更浅的色调
        "soft": "rgba(110, 156, 190, 0.14)" // 柔和的背景色
      }
    },
    "dark": {
      "brand": {
        "1": "#aa9100", // 暗色模式主色调
        "2": "#d5b811", // 暗色模式更亮的色调
        "3": "#ecce23", // 暗色模式更浅的色调
        "soft": "rgba(186, 186, 186, 0.14)" // 暗色模式柔和的背景色
      }
    }
  }
}
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT 