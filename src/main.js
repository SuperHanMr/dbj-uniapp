import Vue from 'vue'
import App from './App'
import store from './store'
// import gdp from './js_sdk/gio-minp.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.ENV = process.env;

// GIO埋点
// gdp("init",
// 	process.env.VUE_APP_GIO_ACCOUNT_ID,
// 	process.env.VUE_APP_GIO_DATASOURCE_ID,
// 	uni.getAccountInfoSync().miniProgram.appId, {
// 		version: uni.getAccountInfoSync().miniProgram.version,
// 		host: "apibdp.dabanjia.com",
// 		vue: Vue
// 	}
// )

const app = new Vue({
	store,
	...App
})
app.$mount()
