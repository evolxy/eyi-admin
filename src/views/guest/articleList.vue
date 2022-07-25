<template>
  <div class="parent">
    <div class="page-header-index-wide page-header-wrapper-grid-content-main cont">
      <a-row :gutter="24">
        <a-col :md="24" :lg="7">
          <user-details />
        </a-col>
        <a-col :md="24" :lg="17">
          <article-page style="margin-left: 20px"></article-page>
        </a-col>
      </a-row>
    </div>
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
.parent {
  width: 100%;
  height: 100%;
  text-align: center;
}

.cont {
  margin-top: 4%;
  display: inline-block;
  text-align: left;
  width: 60%;
}
</style>
