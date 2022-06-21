<template>
  <a-modal
    :title="title"
    :visible="visible"
    ok-text="上传"
    cancel-text="取消"
    @ok="uploadFile"
    @cancel="handleClose"
    class="container">
    <a-upload
      name="file"
      :multiple="true"
      :file-list="fileList"
      :custom-request="uploadFile"
      :before-upload="beforeUpload"
      :headers="headers"
      @change="handleChange"
    >
      <a-button type="primary"> <a-icon type="plus-square" /> 选择文件 </a-button>
    </a-upload>
  </a-modal>
</template>

<script>
import { uploadAll } from '@/api/fileManager'
export default {
  name: 'UploadModal',
  data () {
    return {
      uploading: false,
      title: '文件上传',
      visible: false,
      headers: {},
      fileList: []
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    uploadFile () {
      const _this = this
      const formData = new FormData()
      this.fileList.forEach(file => {
        formData.append('files', file)
      })
      // console.log('form data ', formData.get('files[]'))
      uploadAll(formData).then(res => {
        if (res.success) {
          _this.$message.success('上传成功')
          this.close()
        } else {
          _this.$message.error('上传失败')
        }
      }).catch(err => {
        console.log(err)
        _this.$message.error('上传失败')
      })
    },
    handleChange () {},
    beforeUpload (file, fileList) {
      this.fileList = [...this.fileList, file]
      console.log('before ', this.fileList)
      return false
    },
    close () {
      this.visible = false
      this.fileList = []
      this.$emit('ok')
    },
    handleClose () {
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
