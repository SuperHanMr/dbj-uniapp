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
    /**
     * 更新tabBar的Badge
     * 调用时机：tabBar页面显示的时候
     *  原因是在非tabbar页面中调用setTabBarBadge和removeTabBarBadge会失败
     * @param {Object} context
     */
    updateTabBarBadge(context) {
      // 设置消息未读数
      let totalCount = context.getters.totalUnreadCount;
      if (totalCount > 0) {
        uni.setTabBarBadge({
          index: 3,
          text: totalCount > 99 ? "99+" : totalCount + ""
        })
      } else {
        uni.removeTabBarBadge({
          index: 3
        })
      }
    }
  },
  modules: {
    message,
		merchantEntry
  },
  plugins: [createLogger()]
})
