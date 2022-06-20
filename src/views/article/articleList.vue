<template>
  <div>
    <a-button
      style="margin-bottom: 10px"
      @click="handleAdd"
      type="primary">
      <a-icon type="plus" />
      新建
    </a-button>
    <a-table
      ref="table"
      size="small"
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :rowKey="(record) => record.id">
      <span slot="tagsSlot" slot-scope="text, record">
        <a-tag
          v-for="tag in record.catalogs"
          :key="tag.id"
          :color="tagColors[record.catalogs.indexOf(tag) % 7]"
        >
          {{ tag.catalogName }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button @click="handleDel(record)">删除</a-button>
        <a-divider type="vertical" />
        <a-button @click="handleEdit(record)">编辑</a-button>
      </span>
    </a-table>
    <markdown-editor ref="editorForm" @ok="loadData"></markdown-editor>
  </div>
</template>

<script>
import { articleList, removeArticle } from '@/api/article'
import MarkdownEditor from '@/views/editor/markdownEditor'

export default {
  name: 'ArticleList',
  components: {
    MarkdownEditor
  },
  data () {
    return {
      pagination: {
        current: 1,
        defaultCurrent: 1,
        pageSize: 10,
        total: 1,
        // eslint-disable-next-line no-return-assign
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize,
        showTotal: total => `共${total}条数据`,
        showQuickJumper: true,
        showSizeChanger: true
      },
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
          key: 'catalogs',
          scopedSlots: { customRender: 'tagsSlot' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tagColors: ['pink', 'cyan', 'red', 'blue', 'orange', 'green', 'purple'],
      dataSource: []
    }
  },
  methods: {
    loadData (p) {
      if (p) {
        this.pagination.current = 1
      }
      const params = { current: this.pagination.current, size: this.pagination.pageSize }
      articleList(params).then(res => {
        this.dataSource = [].concat(res.data.content)
        this.pagination.total = Number.parseInt(res.data.totalElements)
        this.pagination.current = Number.parseInt(res.data.current)
        this.pagination.pageSize = Number.parseInt(res.data.size)
      })
    },
    handleAdd () {
      this.$refs.editorForm.title = '新建文档'
      this.$refs.editorForm.add()
    },
    handleEdit (record) {
      this.$refs.editorForm.title = '编辑文档'
      this.$refs.editorForm.upd(record)
    },
    handleDel (record) {
      const _this = this
      this.$confirm({
        title: '删除确认',
        content: '是否确认删除 ' + record.title,
        onOk () {
          removeArticle(record.id).then(res => {
            if (res.success) {
              _this.$message.success('已删除')
              _this.loadData(1)
            } else {
              _this.$message.success(res.msg || '删除失败')
            }
          })
        },
        okText: '删除',
        cancelText: '取消'
      })
    }
  },
  created () {
    this.loadData(1)
  }
}
</script>

<style scoped>

</style>
