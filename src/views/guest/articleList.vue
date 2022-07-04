<template>
  <div>
    <a-layout>
      <a-layout-sider width="400" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
        <user-details />
      </a-layout-sider>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div ><article /></div>
      </a-layout-content>
    </a-layout>

  </div>
</template>

<script>

import UserDetails from '@/views/account/center/userDetails'
import Article from '@/views/account/center/page/Article'
export default {
  name: 'ArticleList',
  components: { UserDetails, Article }
}
</script>

<style scoped>

</style>
