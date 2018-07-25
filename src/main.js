// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from './common/js/i18n'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import './common/static/style.css'

let base_URL = ''
let customUrl = window.location.href.split('/')[2]
if (customUrl == '10.42.6.49') {//内网
  base_URL = 'http://10.42.6.49'
} else if (customUrl == '210.75.250.249') {//外网
  base_URL = 'http://210.75.250.249'
} 

import axios from 'axios'
// axios.defaults.baseURL=base_URL+"/web"
// axios.defaults.baseURL='http://210.75.250.249/web'
axios.defaults.baseURL='http://192.168.1.103:8082/web'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$http = axios
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

import './common/js/http'
import util from './common/js/util'
import './common/js/VeeValidates'
router.beforeEach((to, from, next) => {
  if (to.review) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem('token') != null) {
      next()
    } else {
      // 通过vuex state获取当前的token是否存在
      next({ path: '/' })
    }
  } else {
    next()
  }
})
Vue.prototype.VClear = function(time) {//清除验证信息
  setTimeout(() => {
    this.$validator.errors.clear()
  }, time)
  this.$store.commit('set_dateRenovate', true)
}
Vue.use(util)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
