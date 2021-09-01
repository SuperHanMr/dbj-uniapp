import Vue from 'vue'
import App from './App'
import store from './store'
import { createTim } from './utils/tim.js'
import { SDKAPPID } from "./utils/debug/GenerateTestUserSig.js"


const tim = createTim(SDKAPPID)
console.log(tim, 1111)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
