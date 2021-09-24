import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import message from './modules/message'
import merchantEntry from "./modules/merchant-entry.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    message,
		merchantEntry
  },
  plugins: [createLogger()]
})
