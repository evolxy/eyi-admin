<template>
  <div>
    <div>
      <a-button type="primary" icon="sync" @click="loadData">刷新列表数据</a-button>
      <a-divider type="vertical"/>
      <a-button type="primary" icon="upload" @click="showUploadModal">上传文件</a-button>
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
        <span v-if="imgExt.indexOf(record.extension) > -1">
          <a @click="handlePreview(record)">查看详情</a>
          <a-divider type="vertical"/>
        </span>
        <a @click="handleDelete(record)">删除</a>
        <a-divider type="vertical"/>
        <a @click="handleCopyUrl(record)">复制url</a>
      </template>
    </a-table>
    <a-modal
      @cancel="handleOk"
      :title="previewAlt"
      :footer="null"
      :visible="showPreview">
      <img :src="previewSrc" :alt="previewAlt" width="90%">
    </a-modal>
    <upload-modal ref="uploadModal" @ok="loadData"/>
  </div>
</template>

<script>
import UploadModal from '@/views/fileManager/uploadModal'
import request from '@/utils/request'

export default {
  name: 'FileManagerIndex',
  components: {
    UploadModal
  },
  data () {
    return {
      imgExt: ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'bmp', 'webp', 'psd', 'svg'],
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
      this.showPreview = true
      this.previewSrc = record.storePath
      this.previewAlt = record.originName
    },
    handleDelete (record) {
      this.$confirm({
        title: '是否删除删除',
        content: record.originName + ' ?',
        onOk () {
          request({ url: '/store/file/' + record.id, method: 'delete' }).then(res => {
            this.$message.success(res.msg || '删除成功')
          }).catch(err => {
            this.$message.error('删除失败！' + err)
          })
          this.loadData(1)
        },
        onCancel () {
        }
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
    loadData (p) {
      if (p) {
        this.pagination.current = 1
      }
      request({
        url: '/store/file/page',
        method: 'get',
        params: { current: this.pagination.current, size: this.pagination.pageSize }
      }).then(res => {
        this.dataSource = [].concat(res.data.content)
        this.pagination.total = Number.parseInt(res.data.totalElements)
        this.pagination.current = Number.parseInt(res.data.current)
        this.pagination.pageSize = Number.parseInt(res.data.size)
      }).catch(err => {
        this.$message.error(err.message || '查询失败')
      })
    },
    showUploadModal () {
      this.$refs.uploadModal.showModal()
    }
  },
  created () {
    this.loadData(1)
  }
}
</script>

<style scoped>

</style>
