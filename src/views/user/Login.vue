<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" :tab="$t('user.login.tab-login-credentials')">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="$t('user.login.message-invalid-credentials')" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.username.placeholder')"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: $t('user.userName.required') }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              :placeholder="$t('user.login.password.placeholder')"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input-password>
          </a-form-item>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  type="text"
                  :placeholder="$t('user.login.mobile.verification-code.placeholder')"
                  v-decorator="[
                    'verificationCode',
                    {rules: [{ required: true, message: $t('user.login.mobile.verification-code.placeholder') }], validateTrigger: 'change'}
                  ]"
                >
                  <a-icon slot="prefix" type="android" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-form-item>
                <img
                  @click="handleCaptcha"
                  alt="captcha"
                  style="background: white"
                  :src="this.codeImg"
                  v-if="this.codeImg"
                  width="80"
                  height="32"/>
              </a-form-item>
            </a-col>
          </a-row>

        </a-tab-pane>
        <a-tab-pane key="tab2" :tab="$t('user.login.tab-login-email-captcha')">
          <a-form-item>
            <a-input size="large" type="text" :placeholder="$t('user.login.email-captcha.placeholder')" v-decorator="['email', {rules: [{ required: true, pattern: /^.*?$/, message: $t('user.login.email-captcha.placeholder') }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="form" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['captcha', {rules: [{ required: true, message: $t('user.verification-code.required') }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">{{ $t('user.login.remember-me') }}</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >{{ $t('user.login.forgot-password') }}</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          @click="handleLogin"
        >{{ $t('user.login.login') }}</a-button>
      </a-form-item>

      <!--      <div class="user-login-other">-->
      <!--        <span>{{ $t('user.login.sign-in-with') }}</span>-->
      <!--        <a>-->
      <!--          <a-icon class="item-icon" type="alipay-circle"></a-icon>-->
      <!--        </a>-->
      <!--        <a>-->
      <!--          <a-icon class="item-icon" type="taobao-circle"></a-icon>-->
      <!--        </a>-->
      <!--        <a>-->
      <!--          <a-icon class="item-icon" type="weibo-circle"></a-icon>-->
      <!--        </a>-->
      <!--        <router-link class="register" :to="{ name: 'register' }">{{ $t('user.login.signup') }}</router-link>-->
      <!--      </div>-->
    </a-form>

    <!--    <two-step-captcha-->
    <!--      v-if="requiredTwoStepCaptcha"-->
    <!--      :visible="stepCaptchaVisible"-->
    <!--      @success="stepCaptchaSuccess"-->
    <!--      @cancel="stepCaptchaCancel"-->
    <!--    ></two-step-captcha>-->
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
// import { get2step } from '@/api/login'
import { captcha, login } from '@/api/user'

export default {
  name: 'Login',
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      codeId: '',
      codeImg: '',
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
    this.handleCaptcha()
    // get2step({ })
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleCaptcha () {
      captcha().then(res => {
        if (res.success) {
          this.form.setFieldsValue({ captcha: '', verificationCode: '' })
          this.codeId = res.data.id
          this.codeImg = 'data:image/png;base64,' + res.data.img
        }
      })
    },
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      if (key === 'tab2') {
        this.state.loginType = 1
        this.loginType = 1
      } else {
        this.state.loginType = 0
        this.loginType = 0
      }
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.password = md5(values.password)
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      if (e) {
        e.preventDefault()
      }
      const { form: { validateFields }, state } = this

      validateFields(['email'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          // const hide = this.$message.loading('验证码发送中..', 0)
          const param = { email: this.form.getFieldsValue(['email']) }
          captcha(param).then(res => {
            if (res.success) {
              this.codeId = res.data.id
            }
          })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    handleLogin () {
      let params
      if (this.loginType === 0) {
        this.form.validateFields(['username', 'password', 'verificationCode'], (err, values) => {
          if (!err) {
            values.captcha = values.verificationCode
            Reflect.deleteProperty(values, 'verificationCode')
            // 加密password
            params = values
            params.password = md5(values.password)
          }
        })
      } else if (this.loginType === 1) {
        this.form.validateFields(['captcha'], (err, values) => {
          if (!err) {
            params = values
          }
        })
      }
      // code
      params.codeId = this.codeId
      // console.log('form data ', params)
      login(params).then(res => {
        if (res.success) {
          this.loginSuccess(res)
        } else {
          this.handleCaptcha()
          this.$message.error(res.msg || '登录失败')
        }
      })
    },
    loginSuccess (res) {
      // console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      localStorage.setItem('EYI-TOKEN', 'eyi ' + res.data)
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
