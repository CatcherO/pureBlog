<template>
  <div class="tags-list">
    <TagItem 
      v-for="tag in tags" 
      :key="tag" 
      :tag="tag"
      @click="handleTagClick(tag)"
    />
  </div>
</template>

<script setup lang="ts">
import TagItem from './TagItem.vue';

defineProps({
  tags: {
    type: Array as () => string[],
    required: true
  }
});

function handleTagClick(tag: string) {
  console.log('IndexTags接收到标签点击:', tag);
  // 这个函数是为了确保事件冒泡和处理，实际点击处理已在TagItem组件内完成
  
  // 在首页中点击标签时，可以直接跳转到标签页
  if (typeof window !== 'undefined' && 
      !window.location.pathname.includes('/pages/tags')) {
    const baseUrl = window.location.origin;
    const tagUrl = `${baseUrl}/pages/tags?tag=${encodeURIComponent(tag)}`;
    console.log('从IndexTags跳转到标签页:', tagUrl);
    window.location.href = tagUrl;
  }
}
</script>

<style scoped>
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
}
</style> 