<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-form :form="form">
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'SpareEmailChangeModal',
  data () {
    return {
      form: this.$form.createForm(this),
      title: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk () {
      this.close()
    },
    handleCancel () {
      this.close()
    },
    close () {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
