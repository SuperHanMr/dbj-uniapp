import Vue from 'vue'
import App from './App'
import store from './store'

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
import {VueJsonp} from 'vue-jsonp'
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
const _navigateTo = uni.navigateTo;
uni.navigateTo = function(options) {
  // 如果是跳转登录页面
  if (/\/login\/login$/.test(options.url)) {
    console.log("H5跳转登录页");
    let gomeUrl = process.env.VUE_APP_GOME_H5;
    // 是否是打扮家域名，如果是打扮家域名登录成功之后返回打扮家域名
    let fromDbj = /(meiwu365|dabanjia)\.com/.test(window.location.origin);
    if (fromDbj) {
      window.location.href = gomeUrl + '/gome-login.html?fromDbj=true' + window.location.hash;
    } else {
      window.location.href = gomeUrl + '/gome-login.html' + window.location.hash;
    }
  } else {
    _navigateTo(options);
  }
}
let params = (function (a) {
  var ret = {},
    seg = a.search.replace(/^\?/, '').split('&'),
    len = seg.length, i = 0, s;
  for (; i < len; i++) {
    if (!seg[i]) { continue; }
    s = seg[i].split('=');
    ret[s[0]] = s[1];
  }
  return ret;
})(window.location);
function removeUrlToken() {
  window.location.replace('/' + (params.isGomeMp ? '?isGomeMp=true' : '') + window.location.hash);
}
if (params.token) {
  if (params.token === "CLEAR") {
    uni.clearStorageSync("scn");
    uni.clearStorageSync("userId");
    removeUrlToken();
  } else {
    uni.setStorage({
      key: "scn",
      data: params.token,
      success: function() {
        console.log("save scn success");
        removeUrlToken();
      },
      fail: function(e) {
        console.error("save scn fail!", e);
        localStorage.setItem("scn", params.token);
        removeUrlToken();
      }
    });
  }
}
// #endif

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.ENV = process.env;

const app = new Vue({
  store,
  ...App
})
Vue.mixin({
  onLoad(e){
    if(typeof e === "object"&&e.scene){
      let scene = decodeURIComponent(e.scene) || "";
      let obj = {};
      let arr = scene.split("&");
      arr.forEach(str => {
        let a = str.split("=");
        obj[a[0]] = a[1];
      });
      Object.keys(obj).forEach((key)=>{
        if(!key in e){
          e[key]=obj[key]
        }
      })
    }
  }
})
app.$mount()

// #ifdef H5
// 是否在国美小程序中的标记
if (params.isGomeMp) {
  app.globalData.isInGomeMp = true;
} else {
  app.globalData.isInGomeMp = false;
}
// #endif
