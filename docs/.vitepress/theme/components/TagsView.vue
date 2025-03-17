<template>
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
    <div v-else-if="Object.keys(data).length === 0" class="no-posts">暂无标签</div>
    <div v-else class="tags-container">
        <div class="tags-wrapper">
            <div class="tags">
                <TagItem
                    v-for="(items, key) in data"
                    :key="key"
                    :tag="key"
                    :count="items.length"
                    :is-active="selectTag === key"
                    @click="toggleTag(key)"
                />
            </div>
            <div class="tags-fade-left"></div>
            <div class="tags-fade-right"></div>
            <div class="tags-fade-top"></div>
            <div class="tags-fade-bottom"></div>
        </div>
        <div class="content-divider"></div>
        <transition name="fade" mode="out-in">
            <div v-if="selectTag && data[selectTag]" :key="selectTag" class="content-wrapper">
                <div class="tag-header">
                    {{ selectTag }} <span class="tag-count">({{ data[selectTag].length }})</span>
                </div>
                <div class="posts-container">
                    <a
                        :href="withBase(article.url)"
                        v-for="(article, index) in data[selectTag]"
                        :key="index"
                        class="posts"
                        :style="{ '--index': index }"
                    >
                        <div class="post-container">
                            <div class="post-dot"></div>
                            {{ article.title }}
                        </div>
                        <div class="date">{{ article.date.string }}</div>
                    </a>
                    <div v-if="data[selectTag].length === 0" class="no-posts">
                        该标签下暂无文章
                    </div>
                    <div class="posts-fade-bottom"></div>
                </div>
            </div>
            <div v-else key="empty" class="no-tag-selected">
                请选择一个标签查看相关文章
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { withBase, useRouter } from 'vitepress'
import { initTags } from '../utils/initTags'
import type { TagsData } from '../utils/initTags'
import TagItem from './TagItem.vue'
// @ts-ignore
import { data as blogPosts } from "../posts.data.mts";

// 使用响应式状态
const loading = ref(true)
const posts = ref<Post[]>([])
const selectTag = ref('')
const router = useRouter()

interface Post {
    title: string
    url: string
    date: {
      time: number
      string: string
      year: string 
      monthDay: string
    }
    tags: string[]
    excerpt: string | undefined
}

// 处理数据
const data = computed<TagsData>(() => {
    const result = initTags(posts.value)
    if (Object.keys(result).length > 0) {
        console.log('标签数据已生成，共有标签:', Object.keys(result).length);
        Object.keys(result).forEach(tag => {
            console.log(`- ${tag}: ${result[tag].length}篇文章`);
        });
    }
    return result
})

// 切换标签
function toggleTag(tag: string) {
    console.log('切换标签:', tag, '当前选中:', selectTag.value);
    
    if (selectTag.value === tag) {
        selectTag.value = '';
    } else {
        selectTag.value = tag;
        
        // 检查标签数据
        if (data.value[tag]) {
            console.log(`选中标签 ${tag} 下有 ${data.value[tag].length} 篇文章`);
        } else {
            console.warn(`标签 ${tag} 在数据中不存在!`);
        }
    }
    
    // 更新URL参数，但不刷新页面
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        if (selectTag.value) {
            url.searchParams.set('tag', selectTag.value)
        } else {
            url.searchParams.delete('tag')
        }
        window.history.replaceState({}, '', url.toString())
    }
}

// 监听标签选择事件
function handleTagSelected(event: CustomEvent) {
    const tag = event.detail
    console.log('TagsView收到标签选择事件:', tag);
    if (tag && typeof tag === 'string') {
        // 使用nextTick确保DOM已更新
        nextTick(() => {
            selectTag.value = tag;
            
            // 检查标签数据
            if (data.value[tag]) {
                console.log(`通过事件选中标签 ${tag} 下有 ${data.value[tag].length} 篇文章`);
            } else {
                console.warn(`事件选中的标签 ${tag} 在数据中不存在!`);
            }
            
            // 更新URL参数，但不刷新页面
            if (typeof window !== 'undefined') {
                const url = new URL(window.location.href)
                url.searchParams.set('tag', tag)
                window.history.replaceState({}, '', url.toString())
            }
        })
    }
}

// 客户端加载数据
onMounted(async () => {
    try {
        console.log('TagsView组件已挂载');
        
        // 在挂载时添加自定义事件监听
        if (typeof window !== 'undefined') {
            window.addEventListener('tag-selected', handleTagSelected as EventListener)
        }
        
        // 加载博客文章数据
        posts.value = blogPosts
        console.log('加载的博客文章数量:', posts.value.length);
        
        // 从URL获取标签参数
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search)
            const tagParam = urlParams.get('tag')
            console.log('URL中的标签参数:', tagParam);
            
            if (tagParam) {
                // 延迟处理以确保数据已加载
                setTimeout(() => {
                    selectTag.value = tagParam
                    console.log('从URL设置选中标签:', selectTag.value);
                    
                    // 检查标签数据
                    if (data.value[tagParam]) {
                        console.log(`URL选中标签 ${tagParam} 下有 ${data.value[tagParam].length} 篇文章`);
                    } else {
                        console.warn(`URL选中的标签 ${tagParam} 在数据中不存在!`);
                    }
                }, 100);
            } else if (Object.keys(data.value).length > 0) {
                selectTag.value = Object.keys(data.value)[0] || ''
                console.log('默认选中第一个标签:', selectTag.value);
            }
        }
    } catch (error) {
        console.error('加载博客文章失败:', error)
    } finally {
        loading.value = false
    }
})

onBeforeUnmount(() => {
    // 清理事件监听
    if (typeof window !== 'undefined') {
        window.removeEventListener('tag-selected', handleTagSelected as EventListener)
    }
})

// 监听selectTag变化，确保视图更新
watch(selectTag, (newTag) => {
    console.log('selectTag变化:', newTag);
    
    if (newTag && data.value[newTag]) {
        const articleCount = data.value[newTag].length;
        console.log(`当前选中标签 ${newTag} 下有 ${articleCount} 篇文章`);
    }
});
</script>

<style scoped>
.tags-container {
    display: flex;
    flex-direction: column;
    margin: 25px 0 35px;
    position: relative;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.content-divider {
    height: 1px;
    background-color: var(--vp-c-divider-light);
    margin: 20px 0;
    opacity: 0.6;
}

.tags-wrapper {
    position: relative;
    padding: 0 15px;
}

.tags-fade-left, .tags-fade-right, .tags-fade-top, .tags-fade-bottom, .posts-fade-bottom {
    position: absolute;
    pointer-events: none;
    z-index: 1;
}

.tags-fade-left, .tags-fade-right {
    top: 0;
    height: 100%;
    width: 30px;
}

.tags-fade-top, .tags-fade-bottom {
    left: 0;
    width: 100%;
    height: 25px;
}

.tags-fade-top {
    top: 0;
    background: linear-gradient(to bottom, var(--vp-c-bg) 30%, rgba(var(--vp-c-bg-rgb), 0.2) 80%, transparent);
}

.tags-fade-bottom {
    bottom: 0;
    background: linear-gradient(to top, var(--vp-c-bg) 30%, rgba(var(--vp-c-bg-rgb), 0.2) 80%, transparent);
}

.tags-fade-left {
    left: 0;
    background: linear-gradient(to right, var(--vp-c-bg) 30%, rgba(var(--vp-c-bg-rgb), 0.2) 80%, transparent);
}

.tags-fade-right {
    right: 0;
    background: linear-gradient(to left, var(--vp-c-bg) 30%, rgba(var(--vp-c-bg-rgb), 0.2) 80%, transparent);
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 10px 0;
    max-height: 150px;
    overflow-y: auto;
    padding: 15px 5px 12px;
    border-radius: 12px;
    position: relative;
    scrollbar-width: none; /* Firefox */
}

/* 隐藏滚动条 */
.tags::-webkit-scrollbar {
    display: none;
}

.tag-header {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 10px 0;
    position: relative;
    color: var(--vp-c-text-1);
    border-bottom: 1px solid var(--vp-c-divider-light);
    margin-bottom: 20px;
    margin-top: 10px;
    opacity: 0;
    animation: slideIn 0.4s ease 0.2s forwards;
    font-family: 'Source Han Serif', serif;
}

.tag-count {
    font-size: 1rem;
    color: var(--vp-c-text-2);
    margin-left: 8px;
    font-weight: normal;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
}

.tag-header::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 48px;
    height: 1px;
    background-color: var(--vp-c-brand);
    transition: width 0.3s ease;
}

.loading, .no-posts {
    text-align: center;
    padding: 40px 0;
    color: var(--vp-c-text-2);
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--vp-c-bg-soft);
    border-top: 3px solid var(--vp-c-brand);
    border-radius: 50%;
    margin-bottom: 12px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.posts-container {
    max-height: 500px;
    overflow-y: auto;
    padding-right: 10px;
    scrollbar-width: none; /* Firefox */
    position: relative;
}

.posts-container::-webkit-scrollbar {
    display: none;
}

.posts {
    padding: 12px 16px;
    margin: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 8px;
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg-soft-mute);
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
    animation-delay: calc(0.05s * var(--index, 0));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.posts:hover {
    background-color: var(--vp-c-bg-soft);
    transform: translateX(5px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
}

.post-container {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 0.95rem;
}

.post-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--vp-c-brand);
    margin-right: 12px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
}

.posts:hover .post-dot {
    transform: scale(1.4);
}

.date {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    flex-shrink: 0;
    padding-left: 15px;
    font-family: 'Source Han Serif', serif;
    opacity: 0.85;
}

.posts-fade-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to top, var(--vp-c-bg) 20%, rgba(var(--vp-c-bg-rgb), 0.1) 90%, transparent);
    opacity: 0.9;
}

@media screen and (max-width: 768px) {
    .tags-container {
        margin: 20px 0;
    }
    
    .content-divider {
        margin: 15px 0;
    }
    
    .posts-container {
        max-height: 400px;
    }

    .tags {
        gap: 6px;
        max-height: 140px;
        padding: 10px 5px;
    }
    
    .tag-header {
        font-size: 1.25rem;
        padding: 12px 0;
        margin-bottom: 12px;
    }
    
    .tag-count {
        font-size: 0.9rem;
    }
    
    .posts {
        padding: 12px 15px;
    }
    
    .date {
        font-size: 0.75rem;
        padding-left: 10px;
    }
    
    .post-dot {
        width: 6px;
        height: 6px;
        margin-right: 10px;
    }
    
    .loading-spinner {
        width: 32px;
        height: 32px;
        border-width: 2px;
    }
    
    .loading, .no-posts {
        padding: 30px 0;
    }
    
    .tags-fade-top, .tags-fade-bottom {
        height: 20px;
    }
    
    .tags-fade-left, .tags-fade-right {
        width: 20px;
    }
    
    .posts-fade-bottom {
        height: 40px;
    }
    
    .post-container {
        font-size: 0.9rem;
    }
}

.content-wrapper {
    opacity: 0;
    animation: fadeIn 0.4s ease forwards;
}

.no-tag-selected {
    text-align: center;
    padding: 30px 0;
    color: var(--vp-c-text-2);
    font-style: italic;
    opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style> 