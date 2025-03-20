import { defineConfig, type SiteConfig } from 'vitepress'
// 自动导入 TDesign 
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

import { createRssFileZH, createRssFileEN } from "./rss";
import { handleHeadMeta } from "./handleHeadMeta";

import blogConfig from '../../../blogConfig.json'

const themeName = blogConfig.theme || 'default'
const config = (blogConfig as any)[themeName]?.config || {}
const siteConfig = (blogConfig as any)[themeName]?.site || {}

// 获取GitHub Pages的base路径
const getBase = () => {
  // 使用环境变量或配置文件中的值
  if (process.env.BASE_PATH) return process.env.BASE_PATH
  if (siteConfig.basePath) return siteConfig.basePath
  
  // GitHub Pages的默认模式：如果不是自定义域名，使用仓库名作为base
  // 本地开发时使用'/'
  return process.env.NODE_ENV === 'production' && !process.env.CUSTOM_DOMAIN 
    ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || ''}` 
    : '/'
}

export default defineConfig({
  // 动态设置base路径，适配GitHub Pages
  base: getBase(),
  ...config,
  async transformHead(context) {
    return handleHeadMeta(context)
  },
  buildEnd: (config: SiteConfig) => {
    createRssFileZH(config);
    createRssFileEN(config);
  },
  vite: {
    plugins: [
      // ...
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
    ],
  },
})