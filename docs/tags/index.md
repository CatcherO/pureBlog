---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<script setup>
// 重定向到正确的标签页
if (typeof window !== 'undefined') {
  const currentUrl = new URL(window.location.href);
  const redirectUrl = new URL(window.location.origin + '/pages/tags');
  
  // 保留查询参数
  currentUrl.searchParams.forEach((value, key) => {
    redirectUrl.searchParams.set(key, value);
  });
  
  console.log('从/tags/重定向到:', redirectUrl.toString());
  window.location.href = redirectUrl.toString();
}
</script>

<div>正在重定向到标签页...</div> 