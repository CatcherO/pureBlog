<template>
  <div class="archive-container">
    <template v-for="[year, postGroup] in postGroups" :key="year">
      <h2 :id="year" class="post-title">
        <a
          class="header-anchor"
          :href="`#${year}`"
          :aria-label="`Permalink to &quot;${year}&quot;`"
          >​</a
        >
        <div class="post-year hollow-text source-han-serif">{{ year }}</div>
      </h2>
      <div class="post-container" v-for="post in postGroup" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
        <span class="post-date">
          {{ post.date.monthDay }}
        </span>
      </div> 
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import type { PaginationProps } from "tdesign-vue-next";
import { TimeIcon } from "tdesign-icons-vue-next";

import { data as posts } from "../posts.data.mjs";
import { isMobile } from "../utils/mobile";

// 处理数据
const data = computed(() => {
  return {};
});

const postGroups = computed(() => {
  const groups = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const year = post.date.year;
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)?.push(post);
  });
  return groups;
});
</script>

<style lang="scss" scoped>
.archive-container {
  width: 100%;
}

.mr-2 {
  margin-right: 2px;
}

.post-title {
  margin-bottom: 6px;
  border-top: 0px;
  position: relative;
  top: 0;
  left: 0;

  .post-year {
    position: absolute;
    top: -6px;
    left: -10px;
    z-index: -1;
    opacity: .16;
    font-size: 86px;
    font-weight: 900;
  }
}

.post-container {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;

  > a {
    font-weight: 400;
  }

  .post-date {
    opacity: .6;
  }
}

.hollow-text {
  /* 设置文本颜色为透明 */
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style> 