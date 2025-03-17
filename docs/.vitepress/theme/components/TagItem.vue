<template>
  <a 
    :href="tagLink" 
    class="tag"
    :class="{ active: isActive }"
    @click.prevent="handleClick"
  >
    {{ tag }} 
    <sup v-if="count">{{ count }}</sup>
  </a>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import { useRouter, useData } from 'vitepress';

// 定义事件
const emit = defineEmits(['click']);

const props = defineProps({
  tag: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const { site } = useData();

// 确保链接格式统一
const tagLink = computed(() => {
  return `/pages/tags?tag=${encodeURIComponent(props.tag)}`;
});

function handleClick() {
  console.log('标签点击事件:', props.tag, '当前路径:', window.location.pathname);
  
  // 首先触发点击事件，确保父组件可以处理
  emit('click', props.tag);
  
  // 如果已经在标签页，则只触发自定义事件
  if (window.location.pathname.endsWith('/pages/tags') || 
      window.location.pathname.endsWith('/pages/tags.html')) {
    // 触发自定义事件以通知父组件
    console.log('在标签页内触发标签选择事件:', props.tag);
    
    // 立即触发一次事件
    window.dispatchEvent(new CustomEvent('tag-selected', { 
      detail: props.tag,
      bubbles: true, // 确保事件冒泡
      composed: true // 确保事件可以穿过Shadow DOM边界
    }));
    
    // 稍后再触发一次，确保接收方已准备好
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('tag-selected', { 
        detail: props.tag 
      }));
    }, 50);
  } else {
    // 否则导航到标签页并传递标签参数
    console.log('跳转到标签页:', tagLink.value);
    // 使用完整的URL，包括域名部分
    const baseUrl = window.location.origin;
    const fullUrl = baseUrl + tagLink.value;
    console.log('完整URL:', fullUrl);
    window.location.href = fullUrl;
  }
}
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 16px;
  background-color: transparent;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: none;
  text-decoration: none;
  margin-right: 8px;
}

.tag:hover {
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border-color: var(--vp-c-brand-light);
}

.tag.active {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  font-weight: 500;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}

.tag sup {
  margin-left: 5px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1px 5px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.25s ease;
}

.tag.active sup {
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand-dark);
}

@media screen and (max-width: 768px) {
  .tag {
    padding: 2px 8px;
    font-size: 0.75rem;
    margin-bottom: 4px;
  }
  
  .tag sup {
    padding: 0px 4px;
    font-size: 0.65rem;
  }
}
</style> 