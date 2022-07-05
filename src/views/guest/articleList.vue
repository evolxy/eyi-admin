<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main" >
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <user-details />
      </a-col>
      <a-col :md="24" :lg="17">
        <article-page style="margin-left: 20px"></article-page>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import UserDetails from '@/views/account/center/userDetails'
import { ArticlePage } from '@/views/account/center/page'
export default {
  name: 'ArticleList',
  components: { UserDetails, ArticlePage }
}
</script>

<style scoped>
.cont{
  position: fixed;
  height: 100%;
  width: 100%;
  background: linear-gradient(red, blue); /* 标准的语法 */
}
</style>
