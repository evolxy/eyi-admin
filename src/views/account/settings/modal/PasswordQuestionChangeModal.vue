<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-form :form="form">
      <a-form-item>
        <a-input
          :placeholder="$t('account.settings.security.question-input')"
          v-decorator="[
            'question',
            {
              rules: [
                {
                  required: true,
                  message: $t('account.settings.security.question-input-msg')
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          :placeholder="$t('account.settings.security.answer-input')"
          v-decorator="[
            'answer',
            {
              rules: [
                {
                  required: true,
                  message: $t('account.settings.security.answer-input-msg')
                }
              ]
            }
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { changeAdditionalInfo } from '@/api/user'

export default {
  name: 'PasswordQuestionChangeModal',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      title: '修改',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          changeAdditionalInfo(values).then(res => {
            if (res.success) {
              this.visible = false
              this.form.resetFields()
              this.$message.success('更新成功')
            }
          })
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    },
    showModal (info) {
      if (info) {
        const { question } = info
        this.$nextTick(() => {
          this.form.setFieldsValue({ question: question })
        })
        this.form.getFieldsValue(['question'])
      }
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>
