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
  
  // 如果已经在标签页，则直接由父组件处理
  if (window.location.pathname.endsWith('/pages/tags') || 
      window.location.pathname.endsWith('/pages/tags.html')) {
    // 不需要触发额外的事件，父组件的toggleTag函数会处理
    console.log('在标签页内，由toggleTag直接处理');
  } else {
    // 不在标签页，导航到标签页并传递标签参数
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
  padding: 1px 6px;
  border-radius: 4px;
  background-color: transparent;
  color: var(--vp-c-text-1);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  position: relative;
  overflow: hidden;
  margin-bottom: 3px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: none;
  text-decoration: none;
  margin-right: 4px;
}

.tag:hover {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-color: var(--vp-c-brand);
  text-decoration: none;
}

.tag.active {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  font-weight: 500;
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-color: var(--vp-c-brand);
  text-decoration: none;
}

.tag sup {
  margin-left: 2px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 3px;
  padding: 0px 3px;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.25s ease;
}

.tag:hover sup,
.tag.active sup {
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
}

@media screen and (max-width: 768px) {
  .tag {
    padding: 1px 4px;
    font-size: 0.7rem;
    margin-bottom: 2px;
    margin-right: 3px;
  }
  
  .tag sup {
    padding: 0px 2px;
    font-size: 0.6rem;
    margin-left: 1px;
  }
}
</style> 