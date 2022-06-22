<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">

        <a-form layout="vertical" :form="form">
          <!--          <a-form-item-->
          <!--            :label="$t('account.settings.basic.username')"-->
          <!--          >-->
          <!--            <a-input-->
          <!--              v-decorator="['username', { rules: [{ required: true , message:''}] }]"-->
          <!--              :placeholder="$t('account.settings.basic.username-message')" />-->
          <!--          </a-form-item>-->

          <a-form-item
            :label="$t('account.settings.basic.nickname')"
          >
            <a-input
              v-decorator="['nickname', { rules: [{ required: true , message:''}] }]"
              :placeholder="$t('account.settings.basic.nickname-message')" />
          </a-form-item>

          <!--          <a-form-item-->
          <!--            :label="$t('account.settings.basic.email')"-->
          <!--            :required="false"-->
          <!--          >-->
          <!--            <a-input-->
          <!--              v-decorator="['email', { rules: [{ required: true , message:''}] }]"-->
          <!--              placeholder="example@qq.com"/>-->
          <!--          </a-form-item>-->

          <a-form-item
            :label="$t('account.settings.basic.gender')"
            :required="false"
          >
            <a-radio-group name="genderGroup" default-value="1" v-decorator="['gender']">
              <a-radio value="1">
                男
              </a-radio>
              <a-radio value="0">
                女
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.birthday')"
            :required="false"
          >
            <a-date-picker
              format="YYYY-MM-DD"
              v-decorator="['birthday', { rules: [{ required: true , message:''}] }]"
              :placeholder="$t('account.settings.basic.birthday-message')"
              :disabled-date="disabledDate"
            />
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea
              v-decorator="['introduce', { rules: [{ required: true , message:''}] }]"
              rows="4"
              :placeholder="$t('account.settings.basic.profile-message')"/>
          </a-form-item>

          <a-form-item>
            <a-button @click="handleSubmit" type="primary">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img" :alt="$t('account.settings.basic.avatar-alt')"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setAvatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import moment from 'moment/moment'
import { updateInfo, userInfo } from '@/api/user'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      preview: {},
      form: this.$form.createForm(this),
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  mounted () {
    let user = localStorage.getItem('userInfo')
    if (!user) {
      userInfo().then(res => {
        if (res.success) {
          user = JSON.stringify(res.data)
        }
      })
    }
    user = JSON.parse(user)
    user.gender = user.gender === '男' ? '1' : '0'
    console.log('user', user)
    this.option.img = user.avatar
    this.form.setFieldsValue(user)
  },
  methods: {
    setAvatar (url) {
      this.option.img = url
    },
    disabledDate (current) {
      // Can select days before today and today
      return current && current > moment().endOf('day')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('form ', values)
          values.birthday = this.formatDate(values.birthday)
          values.gender = values.gender ? values.gender : 0
          values.avatar = this.option.img
          console.log('form ', values)
          updateInfo(values).then(res => {
            if (res.success) {
              this.$message.success('修改成功')
            }
          })
        }
      })
    },
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
