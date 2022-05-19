<template>
  <div class="markdown-container">
    <div class="container">
      <mavon-editor
        v-model="content"
        ref="md"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @change="change"
        @save="saveArticle"
        :ishljs="true"
        :code-style="codeStyle"
        style="min-height: 600px"
      />
    </div>
  </div>
</template>
<script>
// 该组件中注释掉的代码为局部注册的方式。
// import { mavonEditor } from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
// import axios from 'axios'
import file from '@/api/fileManager'

export default {
  data: function () {
    return {
      content: '',
      html: '',
      codeStyle: 'agate',
      configs: {}
    }
  },
  // components: {
  //   mavonEditor
  // },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      // const formData = new FormData()
      // formData.append('file', $file)
      // console.log('formData ', formData)
      // 将下面上传接口替换为你自己的服务器接口
      // axios({
      //   url: '/common/upload',
      //   method: 'post',
      //   data: formData,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then(url => {
      //   this.$refs.md.$img2Url(pos, url)
      // })
      file.uploadImg($file).then(res => {
        if (res.success) {
          const url = res.data
          console.log('res ', res)
          this.$refs.md.$img2Url(pos, url)
        }
      })
    },
    saveArticle (value, render) {
      console.log('save ', value, render)
    },
    $imgDel (pos) {
      this.$imgDel(pos)
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.html = render
    },
    submit () {
      console.log(this.content)
      console.log(this.html)
      this.$message.success('提交成功！')
    }
  }
}
</script>
<style scoped>

</style>
