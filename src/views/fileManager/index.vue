<template>
  <div>
    <div>
      <a-button type="primary" icon="sync" @click="loadData">刷新列表数据 </a-button>
    </div>
    <a-table
      ref="table"
      size="small"
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      :rowKey="(record) => record.id"
    >
      <template slot="action" slot-scope="text, record">
        <a @click="handlePreview(record)">查看详情</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record)">删除</a>
        <a-divider type="vertical" />
        <a @click="handleCopyUrl(record)">复制url</a>
      </template>
      <a-modal v-model="showPreview" @Ok="handleOk" title="Basic Modal">
        <img :src="previewSrc" :alt="previewAlt">
      </a-modal>
    </a-table>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'FileManagerIndex',
  components: {
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          key: 'index',
          width: 100,
          align: 'center',
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: '原始文件名',
          dataIndex: 'originName',
          key: 'originName'
        },
        {
          title: '上传时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '存储位置',
          dataIndex: 'storePath',
          key: 'storePath'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      current: 1,
      size: 10,
      total: 10,
      pagination: {
        current: this.current,
        defaultCurrent: 1,
        pageSize: this.size,
        total: this.total,
        // eslint-disable-next-line no-return-assign
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize,
        showTotal: total => `共${total}条数据`,
        showQuickJumper: true,
        showSizeChanger: true
      },
      showPreview: false,
      previewSrc: '',
      previewAlt: '',
      dataSource: []
    }
  },
  methods: {
    handleOk () {
      this.showPreview = false
    },
    handlePreview (record) {
      console.log(record)
      this.showPreview = true
      this.previewSrc = record.storePath
      this.previewAlt = record.originName
    },
    handleDelete (record) {
      this.$confirm({
        title: '是否删除删除',
        content: record.originName + ' ?',
        onOk () {
          request({ url: '/store/fdfs/' + record.id, method: 'delete' }).then(res => {
            this.$message.success(res.message)
            this.loadData()
          }).catch(err => {
            this.$message.error('删除失败！' + err)
          })
        },
        onCancel () {}
      })
    },
    handleCopyUrl (record) {
      const input = document.createElement('input')
      input.value = record.storePath
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      this.$message.success('复制成功')
      document.body.removeChild(input)
    },
    loadData () {
      request({ url: '/store/fdfs/page', method: 'get', params: { page: 1, size: 10 } }).then(res => {
        this.dataSource = [].concat(res.data.content)
        this.total = res.data.numberOfElements
        this.current = res.data.number + 1
        this.size = res.data.size
      }).catch(err => {
        this.$message.error(err.message || '查询失败')
      })
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
