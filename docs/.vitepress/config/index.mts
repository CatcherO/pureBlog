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

export default defineConfig({
  // 使用自定义域名时设置base为'/'
  base: '/',
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