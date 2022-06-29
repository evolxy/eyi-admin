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
          :placeholder="$t('account.settings.security.spare-email')"
          v-decorator="[
            'emailAddr',
            {
              rules: [
                {
                  required: true,
                  message: $t('account.settings.security.spare-email')
                },
                {
                  pattern: /^[A-Za-z0-9\-_]+[A-Za-z0-9\.\-_]*[A-Za-z0-9\-_]+@[A-Za-z0-9]+[A-Za-z0-9\.\-_]*(\.[A-Za-z0-9\.\-_]+)*[A-Za-z0-9]+\.[A-Za-z0-9]+[A-Za-z0-9\.\-_]*[A-Za-z0-9]+$$/,
                  message: $t('account.settings.security.spare-email-msg')
                }
              ]
            }
          ]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { changeAdditionalInfo } from '@/api/user'

export default {
  name: 'SpareEmailChangeModal',
  data () {
    return {
      form: this.$form.createForm(this),
      title: '备用邮箱修改',
      visible: false,
      oldEmail: '',
      confirmLoading: false
    }
  },
  methods: {
    showModal (info) {
      this.visible = true
      this.oldEmail = info.emailAddr
      if (info) {
        this.$nextTick(() => {
          this.form.setFieldsValue({ emailAddr: info.emailAddr })
        })
      }
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.emailAddr === this.oldEmail) {
            this.$message.error('不能与原辅助邮箱相同')
            return
          }
          changeAdditionalInfo(values).then(res => {
            if (res.success) {
              this.$message.success('已发送激活邮件到邮箱，请及时激活！')
              this.close()
            } else {
              this.$message.error(res.msg || '修改失败')
            }
          }).catch(e => {
            this.$message.error('修改失败')
            console.log('change spare email addr ', e)
          })
        }
      })
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
