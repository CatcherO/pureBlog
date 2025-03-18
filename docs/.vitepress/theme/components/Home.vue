<template>
  <div class="home-container">
    <template v-for="post in curPosts" :key="post.url">
      <h3 :id="post.title" class="post-title">
        <a :href="post.url">{{ post.title }}</a>
        <a
          class="header-anchor"
          :href="`#${post.title}`"
          :aria-label="`Permalink to &quot;${post.title}&quot;`"
          >​</a
        >
        <div class="post-date source-han-serif">{{ post.date.string }}</div>
      </h3>
      <IndexTags :tags="post.tags" />
      <div v-if="post.excerpt" v-html="post.excerpt"></div>
    </template>

    <div class="pagination-container">
      <t-pagination
        v-model="current"
        v-model:pageSize="pageSize"
        :total="total"
        size="small"
        :showPageSize="false"
        :showPageNumber="!isMobile()"
        :showJumper="isMobile()"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vitepress";
import { MessagePlugin } from "tdesign-vue-next";
import type { PaginationProps } from "tdesign-vue-next";

import { data as posts } from "../posts.data.mjs";
import { isMobile } from "../utils/mobile";
import IndexTags from "./IndexTags.vue";

const route = useRoute();

const getPage = () => {
  const search = route.query;
  const searchParams = new URLSearchParams(search);

  return Number(searchParams.get("page") || "1");
};

const current = ref(getPage());
const pageSize = ref(10);
const total = ref(posts.length);

// Handle route changes
const router = useRouter();
router.onAfterRouteChange = (to) => {
  current.value = getPage();
};

const curPosts = computed(() => {
  return posts.slice(
    (current.value - 1) * pageSize.value,
    current.value * pageSize.value
  );
});

const onCurrentChange: PaginationProps["onCurrentChange"] = (
  index,
  pageInfo
) => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", index.toString());
  window.history.replaceState({}, "", url);

  window.scrollTo({
    top: 0,
  });
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
}

/* 去掉.vp-doc li + li 的 margin-top */
.pagination-container {
  margin-top: 60px;

  :deep(li) {
    margin-top: 0px;
  }
}

.mr-2 {
  margin-right: 2px;
}

.post-title {
  margin-bottom: 6px;
  margin-top: 60px;
  border-top: 0px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    font-weight: 400;
    flex: 1;
  }

  .post-date {
    position: static;
    z-index: 1;
    opacity: 0.6;
    font-size: 16px;
    font-weight: normal;
    margin-left: 16px;
    color: var(--vp-c-text-2);
  }

  &:hover .post-date {
    opacity: 0.8;
  }

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
    
    .post-date {
      margin-left: 0;
      margin-top: 4px;
    }
  }
  
  &:first-child {
    margin-top: 20px;
  }
}
</style>
