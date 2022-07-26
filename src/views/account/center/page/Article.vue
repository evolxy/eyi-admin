<template>
  <a-list
    size="large"
    rowKey="id"
    :loading="loading"
    itemLayout="vertical"
    :dataSource="data"
  >
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <icon-text type="like-o" :text="item.likeCount" />
        <icon-text type="message" :text="item.commentCount" />
      </template>
      <a-list-item-meta>
        <a slot="title" @click="articleDetail(item.articleId)">{{ item.title }}</a>
        <template slot="description">
          <span v-for="(r, i) in item.catalogs" :key="i">
            <a-tag :color="tagColors[i%7]">{{ r.catalogName }}</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content :description="item.subTitle" :owner="item.createName" :avatar="item.createAvatar" :article-id="item.articleId" :updateTime="item.updateTime" />
    </a-list-item>
    <div slot="footer" v-if="showMore" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<script>
import { ArticleListContent } from '@/components'
import IconText from '@/views/list/search/components/IconText'
import { apiArticleList } from '@/api/article'

export default {
  name: 'Article',
  components: {
    IconText,
    ArticleListContent
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      showMore: false,
      page: 1,
      tagColors: ['pink', 'cyan', 'red', 'blue', 'orange', 'green', 'purple'],
      size: 10,
      data: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    articleDetail (articleId) {
      this.$router.push('/view/article/' + articleId)
    },
    getList () {
      this.loading = true
      const param = { page: this.page, size: this.size }
      apiArticleList(param).then(res => {
        if (res.success) {
          this.data = [].concat(res.data.content)
          this.showMore = this.data.length === this.size
          this.page++
        }
      })
      this.loading = false
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    }
  }
}
</script>

<style scoped>

</style>
