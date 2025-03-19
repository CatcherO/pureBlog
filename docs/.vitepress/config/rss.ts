import path from "node:path";
import { writeFileSync } from "node:fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";
import blogConfig from '../../../blogConfig.json'

const themeName = blogConfig.theme || 'default'
const themeConfig = (blogConfig as any)[themeName] || {}
const rssConfig = themeConfig.rss || {}

export async function createRssFileZH(config: SiteConfig) {
  const feed = new Feed({
    title: rssConfig.title,
    description: rssConfig.description,
    id: rssConfig.id === 'hostname' ? rssConfig.hostname : rssConfig.id,
    link: rssConfig.link === 'hostname' ? rssConfig.hostname : rssConfig.link,
    language: rssConfig.language,
    image: rssConfig.image,
    favicon: rssConfig.favicon,
    copyright: rssConfig.copyright,
  });

  const posts = await createContentLoader("posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break;
    }

    feed.addItem({
      title: frontmatter.title,
      id: `${rssConfig.hostname}${url}`,
      link: `${rssConfig.hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: rssConfig.author?.name || "Justin3go",
          email: rssConfig.author?.email || "just@justin3go.com",
          link: rssConfig.author?.link || "https://justin3go.com",
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

export async function createRssFileEN(config: SiteConfig) {
  // 使用英文配置，如果没有则回退到中文配置
  const enRssConfig = themeConfig.enRss || rssConfig;
  
  const feed = new Feed({
    title: enRssConfig.title,
    description: enRssConfig.description,
    id: enRssConfig.id === 'hostname' ? enRssConfig.hostname : enRssConfig.id,
    link: enRssConfig.link === 'hostname' ? enRssConfig.hostname : enRssConfig.link,
    language: enRssConfig.language || "en-US",
    image: enRssConfig.image,
    favicon: enRssConfig.favicon,
    copyright: enRssConfig.copyright,
  });

  const posts = await createContentLoader("en/posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break;
    }

    feed.addItem({
      title: frontmatter.title,
      id: `${enRssConfig.hostname}${url}`,
      link: `${enRssConfig.hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: enRssConfig.author?.name || "Justin3go",
          email: enRssConfig.author?.email || "just@justin3go.com",
          link: enRssConfig.author?.link || "https://justin3go.com",
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, "feed-en.xml"), feed.rss2(), "utf-8");
}
