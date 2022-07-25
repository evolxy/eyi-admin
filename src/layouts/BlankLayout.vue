<template>

  <div id="blankLayout" class="blank-layout-wrapper">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'BlankLayout',
  components: {},
  mounted () {
    document.body.classList.add('blankLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('blankLayout')
  }
}
</script>

<style lang='less' scoped>
#blankLayout.blank-layout-wrapper {
  height: 100%;
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-content {
      padding: 32px 0 24px;
      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }
    }

  }
}
</style>
