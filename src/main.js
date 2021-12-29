import Vue from 'vue'
import App from './App'
import store from './store'
import {VueJsonp} from 'vue-jsonp'
// #ifdef MP-WEIXIN
import gdp from './js_sdk/gio-minp.js'

// 小程序GIO埋点
gdp("init",
  process.env.VUE_APP_GIO_ACCOUNT_ID,
  process.env.VUE_APP_GIO_DATASOURCE_ID,
  uni.getAccountInfoSync().miniProgram.appId, {
    version: uni.getAccountInfoSync().miniProgram.version,
    host: "apibdp.dabanjia.com",
    vue: Vue
  }
)
// #endif

// #ifdef H5
Vue.use(VueJsonp)
// H5中模拟获取胶囊按钮的位置
uni.getMenuButtonBoundingClientRect = function() {
  const systemInfo = uni.getSystemInfoSync();
  let statusBarHeight = systemInfo.statusBarHeight || 0;
  let windowWidth = systemInfo.windowWidth || 375;
  return {
    bottom: statusBarHeight + 36,
    height: 32,
    left: windowWidth - 94,
    right: windowWidth - 7,
    top: statusBarHeight + 4,
    width: 87
  }
}
uni.showShareMenu = function() {
  console.log("H5 showShareMenu not implement")
}


// #endif
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.ENV = process.env;

const app = new Vue({
  store,
  ...App
})
app.$mount()
