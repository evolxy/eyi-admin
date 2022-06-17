<template>
  <div class="markdown-container">
    <a-form :form="form" :layout="formLayout">
      <a-row>
        <a-col span="3">
        </a-col>
        <a-button type="primary" @click="submit"> <a-icon type="save" />保存 </a-button>
      </a-row>
      <a-row>
        <a-form-item v-show="false">
          <a-input
            v-decorator="['id']"/>
        </a-form-item>
        <a-form-item label="标题" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input
            v-decorator="[
              'title',
              { rules: [{ required: true , message:''}] },
            ]"
            placeholder="请输入标题" />
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="简介" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-input
            type="textarea"
            v-decorator="[
              'subTitle',
              { rules: [{ required: true , message:''}] },
            ]"
            placeholder="请输入简介" />
        </a-form-item>
      </a-row>
      <a-row>
        <!--     标签   -->
        <a-form-item label="分类" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <template v-for="(tag, index) in tags">
              <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                <a-tag :color="tagColors[Math.floor(Math.random()* 7) % 7]" :key="tag" :closable="index >= 0" @close="() => handleClose(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag :color="tagColors[Math.floor(Math.random()* 7) % 7]" v-else :key="tag" :closable="index >= 0" @close="() => handleClose(tag)">
                {{ tag }}
              </a-tag>
            </template>
            <a-input
              v-if="inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              :value="inputValue"
              @change="handleInputChange"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
              <a-icon type="plus" />
            </a-tag>
          </div>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="正文" :label-col="labelCol" :wrapper-col="wrapperCol" class="container">
          <mavon-editor
            v-model="content"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            @change="change"
            :ishljs="true"
            :code-style="codeStyle"
            :toolbars="toolbars"
            style="min-height: 600px"
          />
        </a-form-item>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { uploadImg } from '@/api/fileManager'
import { saveArticle } from '@/api/article'

export default {
  name: 'MarkDownEditor',
  components: {
  },
  data: function () {
    return {
      formLayout: 'horizontal',
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
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
      },
      tags: [],
      inputVisible: false,
      inputValue: '',
      content: '',
      tagColors: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple']
    }
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      uploadImg(formData).then(res => {
        if (res.success) {
          const url = res.data
          console.log('res ', res)
          this.$refs.md.$img2Url(pos, url)
        }
      })
    },
    $imgDel (pos) {
      console.log('img del')
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.html = render
    },
    submit () {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const formData = values
          formData.mdContent = this.content
          formData.content = this.html
          const catalogs = []
          this.tags.forEach(item => {
            catalogs.push({ 'catalogName': item })
          })
          formData.catalogs = [].concat(catalogs)
          // console.log('form data', formData)
          saveArticle(formData).then(res => {
            if (res.success) {
              this.$message.success(res.msg || '保存成功')
            } else {
              this.$message.error(res.msg || '保存失败')
            }
          })
        } else {
          this.$message.error(err || '保存失败')
        }
      })
    },
    handleClose (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.tags = tags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputChange (e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    },
    getTagColor () {
      const len = this.tags.length
      const number = len % this.tagColors.length
      return this.tagColors[number]
    }
  }
}
</script>
<style scoped>

</style>
