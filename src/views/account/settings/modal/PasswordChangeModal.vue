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
            ]" />
        </a-form-item>
        <a-form-item>
          <a-input
            :placeholder="$t('account.settings.security.new-password')"
            v-decorator="[
              'newPassword',
              {
                rules: [
                  {
                    min: 6,
                    max: 18,
                    message: $t('account.settings.security.new-password')
                  }
                ]
              }
            ]" />
        </a-form-item>
        <a-form-item>
          <a-input
            :placeholder="$t('account.settings.security.new-password-rewrite')"
            v-decorator="[
              'newPasswordRewrite',
              {rules: [ {validator:passwordRewriteValidator}]}
            ]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'PasswordChangeModal',
  data () {
    return {
      title: '',
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
      console.log('check ')
      const passwd = this.form.getFieldsValue(['newPassword'])
      if (value && value === passwd) {
        callback()
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('请输入正确的密码')
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const password = values.password
          let passwordStrength = 0
          const sp = new RegExp(/[\\^%&,;=?$@]/)
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
        }
      })
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
