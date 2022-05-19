<template>
  <div>
    <froala :config="config"></froala>
  </div>
</template>

<script>
export default {
  name: 'FroalaEditor',
  data () {
    return {
      config: {
        zIndex: 1200,
        height: '800',
        toolbarSticky: true,
        autofocus: true,
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
        language: 'zh_cn',
        imageDefaultWidth: 500,
        imageUploadURL: '',
        videoUploadURL: '',
        fileUploadURL: '',
        imageManagerLoadURL: '',
        requestHeaders: {
          EYI_TOKEN: localStorage.eyiToken
        },
        events: {
          'froalaEditor.initialized': (e, editor) => {
            this.editor = editor
          },
          'froalaEditor.contentChanged': (e, editor) => {
            this.$emit('on-change', editor.html.get(true))
          }
        }
      }
    }
  },
  methods: {
    setHtml (html) {
      if (this.editor) {
        this.editor.html.set(html)
      }
    }
  }
}
</script>

<style scoped>

</style>
