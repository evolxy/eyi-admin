<template>
  <div class="container">
    <a-page-header
      style="background: transparent"
      title="返回"
      @back="handleBack"
    >
      <template slot="extra" v-if="showLoginBtn">
        <a-button @click="handleLogin" type="primary">
          <a-icon type="smile" />登录
        </a-button>
      </template>
    </a-page-header>
    <h1 class="title">{{ data.title }}</h1>
    <h2 class="sub-title">{{ data.subTitle }}</h2>
    <a-divider />
    <div v-html="data.content" class="content"></div>
    <a-divider />
    <h3 class="sub-title">最后编辑于 {{ data.updateTime }} </h3>
    <a-space size="large">
      <a-button type="primary" @click="handleLike">
        <span v-if="liked"><a-icon type="dislike"/> 踩</span>
        <span v-else><a-icon type="like"/> 赞</span>
      </a-button>
    </a-space>
  </div>
</template>

<script>
import { apiArticleDetail } from '@/api/article'

export default {
  name: 'ArticleView',
  data () {
    return {
      showLoginBtn: true,
      liked: false,
      data: {},
      visible: false
    }
  },
  created () {
    const articleId = this.$route.params['articleId']
    this.detail(articleId)
  },
  async mounted () {
    const link = document.createElement('link')
    link.type = 'text/CSS'
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/agate.min.css'
    document.head.appendChild(link)
  },
  methods: {
    detail (articleId) {
      apiArticleDetail({ articleId: articleId }).then(res => {
        if (res.success) {
          this.data = res.data
        } else {
          this.$message.error(res.msg || '查询失败')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleBack () {
      this.$router.go(-1)
    },
    handleLogin () {
      this.$router.push('/user/login')
    },
    handleLike () {
      this.liked = !this.liked
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 2%;
}
.title {
  font-size: xxx-large;
  color: crimson;
}
.sub-title {
  font-size: x-large;
  color: #ff7e05;
}
.container > h3{
  color: blueviolet;
}
.content {
  text-align: left;
  margin-left: 4%;
  margin-right: 4%;
}
</style>
