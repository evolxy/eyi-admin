<template>
  <div class="markdown-container">
    <a-row>
      <a-col span="3">
      </a-col>
      <a-button type="primary" @click="saveArticle"> <a-icon type="save" />保存 </a-button>
    </a-row>
    <a-form :model="form" layout="horizontal" >
      <a-form-item v-show="false">
        <a-input
          v-decorator="['id']"/>
      </a-form-item>
      <a-form-item label="标题" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input
          v-decorator="[
            'title',
            { rules: [{ required: true }] },
          ]"
          placeholder="请输入标题" />
      </a-form-item>
      <a-form-item label="简介" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input
          type="textarea"
          v-decorator="[
            'subTitle',
            { rules: [{ required: true }] },
          ]"
          placeholder="请输入简介" />
      </a-form-item>
      <a-form-item label="正文" :label-col="labelCol" :wrapper-col="wrapperCol" >
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
            :toolbars="toolbars"
            style="min-height: 600px"
          />
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import file from '@/api/fileManager'

export default {
  name: 'MarkDownEditor',
  components: {
  },
  data: function () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      content: '',
      html: '',
      form: this.$form.createForm(this),
      codeStyle: 'agate',
      configs: {},
      toolbars: {
        'bold': true,
        'italic': true,
        'header': true,
        'underline': true,
        'strikethrough': true,
        'mark': true,
        'superscript': true,
        'subscript': true,
        'quote': true,
        'ol': true,
        'ul': true,
        'link': true,
        'imagelink': true,
        'code': true,
        'table': true,
        'undo': true,
        'redo': true,
        'trash': true,
        // 'save': true,
        'alignleft': true,
        'aligncenter': true,
        'alignright': true,
        'navigation': true,
        'subfield': true,
        'fullscreen': true,
        'readmodel': true,
        'htmlcode': true,
        'help': true,
        'preview': true
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.form.setFieldsValue({ content: '# 测试' })
    })
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      file.uploadImg(formData).then(res => {
        if (res.success) {
          const url = res.data
          console.log('res ', res)
          this.$refs.md.$img2Url(pos, url)
        }
      })
    },
    saveArticle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('values ', values)
          this.$message.success('提交成功！')
        }
      })
    },
    $imgDel (pos) {
      this.$imgDel(pos)
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.html = render
    },
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('values ', values)
          this.$message.success('提交成功！')
        }
      })
      this.$message.success('提交成功！')
    }
  }
}
</script>
<style scoped>

</style>
