// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from 'vitepress/theme' // https://vitepress.dev/zh/guide/extending-default-theme#using-different-fonts
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

import "./style.css";
import Comment from "./components/Comment.vue";
import ImageViewer from "./components/ImageViewer.vue"
import GoBack from "./components/GoBack.vue";
import TagItem from "./components/TagItem.vue";
import IndexTags from "./components/IndexTags.vue";
import Home from "./components/Home.vue";
import HomeEn from "./components/HomeEn.vue";
import Archive from "./components/Archive.vue";
import ArchiveEn from "./components/ArchiveEn.vue";
import ThemeColors from "./ThemeColors.vue";
import TDesignDark from "./components/TDesignDark.vue";

export default {
	...Theme,
	Layout: () => {
		return h(Theme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-after": () => h(Comment),
			"doc-top": () => [h(ImageViewer), h(ThemeColors), h(TDesignDark)],
			"aside-top": () => h(GoBack),
		});
	},

	enhanceApp({ app, router }: any) {
		app.component("Comment", Comment);
		app.component("ImageViewer", ImageViewer);
		app.component("GoBack", GoBack);
		app.component("TagItem", TagItem);
		app.component("IndexTags", IndexTags);
		app.component("Home", Home);
		app.component("HomeEn", HomeEn);
		app.component("Archive", Archive);
		app.component("ArchiveEn", ArchiveEn);
		
		// 添加导航事件处理
		if (router) {
			// 兼容旧博客的中文路径，重定向到新路径，避免外链失效
			router.onAfterRouteChanged = (to: string) => {
				console.log('路由变更:', to)
				
				if (to.startsWith(encodeURI('/博客/'))) {
					const newUrl = to.replace(encodeURI('/博客/'), '/posts/')
					window.location.href = newUrl
				}

				if (to.startsWith(encodeURI('/笔记/'))) {
					const newUrl = to.replace(encodeURI('/笔记/'), '/notes/')
					window.location.href = newUrl
				}
				
				// 在导航完成后检查URL参数，处理可能的标签选择
				const pathname = window.location.pathname;
				console.log('当前路径名:', pathname)
				
				// 处理标签页路径
				if (pathname.endsWith('/pages/tags') || 
					pathname.endsWith('/pages/tags.html')) {
					const urlParams = new URLSearchParams(window.location.search)
					const tagParam = urlParams.get('tag')
					console.log('URL参数中的标签:', tagParam)
					
					if (tagParam) {
						// 使用分层延迟策略确保组件已加载
						// 先发送一个短延迟的事件
						setTimeout(() => {
							console.log('触发首次标签选择事件:', tagParam)
							window.dispatchEvent(new CustomEvent('tag-selected', { 
								detail: tagParam,
								bubbles: true,
								composed: true
							}))
						}, 100)
						
						// 再发送一个长延迟的事件，确保页面完全加载
						setTimeout(() => {
							console.log('触发二次标签选择事件:', tagParam)
							window.dispatchEvent(new CustomEvent('tag-selected', { 
								detail: tagParam,
								bubbles: true,
								composed: true
							}))
						}, 500)
					}
				} else if (pathname.endsWith('/tags/') || pathname.endsWith('/tags')) {
					// 重定向到正确的标签页路径
					const currentUrl = new URL(window.location.href)
					const redirectUrl = new URL(window.location.origin + '/pages/tags')
					
					// 保留查询参数
					currentUrl.searchParams.forEach((value, key) => {
						redirectUrl.searchParams.set(key, value)
					})
					
					console.log('从/tags/重定向到:', redirectUrl.toString())
					window.location.href = redirectUrl.toString()
				}
			}
		}
	},
};

