<template>
  <div>
    <a-table :columns="columns" :data-source="data">
    </a-table>
  </div>
</template>

<script>
import { articleList } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  data () {
    return {
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '简介',
          dataIndex: 'subTitle',
          key: 'subTitle'
        },
        {
          title: '分类',
          dataIndex: 'catalogs',
          key: 'catalogs'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: []
    }
  },
  methods: {},
  created () {
    articleList().then(res => {
      if (res.success) {
        this.dataSource = [].concat(res.data.content)
      }
    })
  }
}
</script>

<style scoped>

</style>
