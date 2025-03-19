# VitePress 博客模板

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)

一个基于 VitePress 的博客模板，支持多主题、多语言、RSS 订阅等功能。简单配置即可快速部署到 Netlify。

## 特性

- 📝 使用 Markdown 编写博客
- 🌙 自动深色模式支持
- 🎨 自定义主题颜色
- 🌍 多语言支持 (中文/英文)
- 📰 RSS 订阅支持
- 🏷️ 标签分类
- 🔍 全文搜索
- 📱 响应式设计
- 🚀 一键部署到 Netlify

## 快速开始

### 使用 GitHub 模板

1. 点击 GitHub 仓库上的 "Use this template" 按钮
2. 创建你自己的仓库
3. 克隆你的仓库到本地

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

### 自定义配置

1. 修改 `blogConfig.json` 文件中的配置：
   - 修改 `theme` 为 `"default"` 或你自己创建的主题名称
   - 更新站点信息：标题、描述、主机地址等
   - 修改导航菜单、页脚和社交链接

2. 添加自己的博客文章到 `docs/posts` 目录（中文）和 `docs/en/posts` 目录（英文）

### 部署到 Netlify

1. 将代码推送到你的 GitHub 仓库
2. 在 [Netlify](https://app.netlify.com/) 上注册账号
3. 点击 "New site from Git" 按钮
4. 选择你的 GitHub 仓库
5. 构建设置已经在 `netlify.toml` 文件中配置好，无需更改
6. 点击 "Deploy site" 按钮

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
├── netlify.toml       # Netlify 配置
└── package.json       # 项目依赖
```

## 编写博客文章

在 `docs/posts` 目录下创建新的 Markdown 文件，文件名格式建议为 `YYYY-MM-DD-title.md`。

文章 frontmatter 示例：

```md
---
title: 文章标题
date: 2024-01-01
tags:
  - tag1
  - tag2
cover: https://example.com/image.jpg
---

文章内容...
```

## 自定义主题

### 颜色配置

你可以通过修改 `blogConfig.json` 中的颜色配置来自定义网站的主题色：

```json
{
  "theme": "yourTheme",
  "yourTheme": {
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
}
```

颜色配置会自动应用于网站的各个部分，包括链接、按钮、标题等元素。

### 其他主题配置

如果你想创建自己的主题，可以在 `blogConfig.json` 中添加新的主题配置：

```json
{
  "theme": "yourTheme",
  "yourTheme": {
    // 主题配置
  }
}
```

## 许可证

MIT 