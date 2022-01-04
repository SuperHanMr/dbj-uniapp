import Vue from 'vue'
import App from './App'
import store from './store'
import gdp from './js_sdk/gio-minp.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.ENV = process.env;

// GIO埋点
gdp("init",
	process.env.VUE_APP_GIO_ACCOUNT_ID,
	process.env.VUE_APP_GIO_DATASOURCE_ID,
	uni.getAccountInfoSync().miniProgram.appId, {
		version: uni.getAccountInfoSync().miniProgram.version,
		host: "apibdp.dabanjia.com",
		vue: Vue
	}
)

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
