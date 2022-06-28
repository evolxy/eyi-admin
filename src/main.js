// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
// import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import MavonEdit from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//
import jQuery from 'jquery'
import VueFroala from 'vue-froala-wysiwyg'
import NProgress from 'nprogress'

require('froala-editor/js/froala_editor.pkgd.min')
require('froala-editor/js/languages/zh_cn')
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')
Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.use(VueFroala)
Vue.use(MavonEdit)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
// 路由
router.beforeEach((to, from, next) => {
  // 有token 或跳转目的为登录页则放行
  const token = localStorage.getItem('EYI-TOKEN')
  if (token || to.path === '/user/login') {
    next()
  } else {
    next({
      name: 'login',
      query: { redirect: to.meta.redirect }
    })
    NProgress.done()
  }
})

window.umi_plugin_ant_themeVar = themePluginConfig.theme
window.$ = jQuery
window.jQuery = jQuery
new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex, Logo message
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
