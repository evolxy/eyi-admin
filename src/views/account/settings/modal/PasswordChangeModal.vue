<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item>
          <a-input
            :placeholder="$t('account.settings.security.old-password')"
            v-decorator="[
              'oldPassword',
              {
                rules: [
                  {
                    required: true,
                    message: $t('account.settings.security.old-password')
                  }
                ]
              }
            ]"/>
        </a-form-item>
        <a-form-item>
          <a-input-password
            :placeholder="$t('account.settings.security.new-password')"
            v-decorator="[
              'newPassword',
              {
                rules: [
                  {
                    min: 6,
                    max: 18,
                    message: $t('account.settings.security.new-password-len')
                  },
                  {
                    pattern: /^[0-9A-Za-z\\^%&,;=?$@]*$/,
                    message: $t('account.settings.security.new-password-invalid-character')
                  }
                ]
              }
            ]"/>
        </a-form-item>
        <a-form-item>
          <a-input-password
            :placeholder="$t('account.settings.security.new-password-rewrite')"
            v-decorator="[
              'newPasswordRewrite',
              {
                rules: [ { validator:passwordRewriteValidator } ]
              }
            ]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import md5 from 'md5'
import { changePass } from '@/api/user'
import store from '@/store'

export default {
  name: 'PasswordChangeModal',
  data () {
    return {
      title: '修改密码',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    passwordRewriteValidator (rule, value, callback) {
      const passwd = this.form.getFieldsValue(['newPassword'])['newPassword']
      if (value && value === passwd) {
        callback()
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback(this.$t('account.settings.security.new-password-rewrite-msg'))
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const password = values.password
          let passwordStrength = 0
          const sp = new RegExp(/[\^%&,;=?$@]/)
          const upper = new RegExp(/[A-Z]/)
          const lower = new RegExp(/[a-z]/)
          const num = new RegExp(/[0-9]/)
          if (sp.test(password)) {
            passwordStrength++
          }
          if (upper.test(password)) {
            passwordStrength++
          }
          if (lower.test(password)) {
            passwordStrength++
          }
          if (num.test(password)) {
            passwordStrength++
          }
          values.passwordStrength = passwordStrength
          // 加密新旧密码
          values.oldPassword = md5(values.oldPassword)
          values.newPassword = md5(values.newPassword)
          Reflect.deleteProperty(values, 'newPasswordRewrite')
          changePass(values).then(res => {
            if (res.success) {
              this.$message.success(res.msg || '修改成功')
              this.visible = false
              localStorage.removeItem('userInfo')
              localStorage.removeItem('EYI-TOKEN')
              // 重定向到登录页
              store.dispatch('Logout').then(() => {
                setTimeout(() => {
                  this.$router.push({
                    path: '/user/login'
                  })
                }, 1500)
              })
            } else {
              this.$message.error(res.msg || '修改失败')
            }
          })
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
