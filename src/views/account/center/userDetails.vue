<template>
  <a-card :bordered="false">
    <div class="account-center-avatarHolder">
      <div class="avatar">
        <img :src="userInfo.avatar">
      </div>
      <div class="username">{{ userInfo.nickname }}</div>
      <div class="bio">{{ userInfo.introduce }}</div>
    </div>
    <div>
      <span><a-icon type="info-circle" /> 生日：{{ userInfo.birthday }}</span>
      <a-divider/>
      <span><a-icon type="info-circle" /> 性别：{{ userInfo.gender }}</span>
      <a-divider/>
      <span><a-icon type="info-circle" /> 邮箱：{{ userInfo.email }}</span>
    </div>
    <a-divider/>
    <!--    <a-divider :dashed="true"/>-->

    <!--    <div class="account-center-team">-->
    <!--      <div class="teamTitle">团队</div>-->
    <!--      <a-spin :spinning="teamSpinning">-->
    <!--        <div class="members">-->
    <!--          <a-row>-->
    <!--            <a-col :span="12" v-for="(item, index) in teams" :key="index">-->
    <!--              <a>-->
    <!--                <a-avatar size="small" :src="item.avatar"/>-->
    <!--                <span class="member">{{ item.name }}</span>-->
    <!--              </a>-->
    <!--            </a-col>-->
    <!--          </a-row>-->
    <!--        </div>-->
    <!--      </a-spin>-->
    <!--    </div>-->
  </a-card>
</template>

<script>
import { stationMasterInfo } from '@/api/user'

export default {
  name: 'UserDetails',
  data () {
    return {
      userInfo: {
        avatar: '@/assets/log.svg',
        nickname: '一一',
        introduce: '这人很懒， 什么都没写',
        birthday: '2001-11-11',
        gender: '男',
        email: 'eyi.adm@qq.com'
      }
    }
  },
  methods: {
  },
  created () {
    stationMasterInfo().then(res => {
      if (res.success) {
        this.userInfo = res.data
      }
    })
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
