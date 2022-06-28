<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
    <password-change-modal ref="passwordModal"></password-change-modal>
    <password-question-change-modal ref="questionModal"></password-question-change-modal>
    <spare-email-change-modal ref="emailChangeModal"></spare-email-change-modal>
  </a-list>
</template>

<script>
import PasswordChangeModal from '@/views/account/settings/modal/PasswordChangeModal'
import { securityInfo } from '@/api/user'
import PasswordQuestionChangeModal from '@/views/account/settings/modal/PasswordQuestionChangeModal'
import SpareEmailChangeModal from '@/views/account/settings/modal/SpareEmailChangeModal'
export default {
  components: { SpareEmailChangeModal, PasswordQuestionChangeModal, PasswordChangeModal },
  created () {
      securityInfo().then(res => {
        if (res.success) {
          this.additionalInfo = res.data
        }
      })
  },
  data () {
    return {
      additionalInfo: {}
    }
  },
  methods: {
    passwordStrength () {
      switch (this.additionalInfo.passwordStrength) {
        case 1:
          return '弱'
        case 2:
          return '较弱'
        case 3:
          return '较强'
        case 4:
          return '强'
      }
    }
  },
  filters: {
  },
  computed: {
    data () {
        return [
        {
          title: this.$t('account.settings.security.password'),
          description: this.$t('account.settings.security.password-description'),
          value: this.passwordStrength(),
          actions: { title: this.$t('account.settings.security.modify'),
            callback: () => { this.$refs.passwordModal.showModal() } }
        },
        {
          title: this.$t('account.settings.security.phone'),
          description: this.$t('account.settings.security.phone-description'),
          value: this.additionalInfo.phone,
          actions: { title: this.$t('account.settings.security.modify'),
            callback: () => { this.$message.success('This is a message of success') } }
        },
        {
          title: this.$t('account.settings.security.question'),
          description: this.$t('account.settings.security.question-description'),
          value: this.additionalInfo.question ? '已设置' : '未设置',
          actions: { title: this.$t('account.settings.security.set'),
          callback: () => { this.$refs.questionModal.showModal(this.additionalInfo) } }
        },
        {
          title: this.$t('account.settings.security.email'),
          description: this.$t('account.settings.security.email-description'),
          value: this.additionalInfo.emailAddr,
          actions: { title: this.$t('account.settings.security.modify'),
          callback: () => { this.$refs.emailChangeModal.showModal() } }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
