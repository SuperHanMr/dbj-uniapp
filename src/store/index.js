
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import message from './modules/message'
import merchantEntry from "./modules/merchant-entry.js";
import {requestDesignerTopRank} from "@/api/home-find-design";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    designTopRank: {}, // 设计师榜单top10，用于私聊展示设计师排行标签
    houseId:-1,// 房屋Id
  },
  getters:{
    getHouseId(state){
      return state.houseId
    }
  },
  mutations: {
    setDesignTopRank(state, payload) {
      state.designTopRank = payload;
    },
    setHouseId(state,houseId){
      state.houseId = houseId
    }
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
      let decorateCount = getApp().globalData.decorateMsgNum
      // console.log(decorateCount,"<><><><><><><><>")
      if (decorateCount > 0) {
        uni.setTabBarBadge({
          index: 2,
          text: decorateCount > 99 ? "99+" : decorateCount + ""
        })
      } else {
        uni.removeTabBarBadge({
          index: 2
        })
      }
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
    },
    requestDesignTopRank(context) {
      requestDesignerTopRank().then(designList => {
        if (designList && designList instanceof Array) {
          let designTopRank = designList.reduce(
            (map, designer, index) => {
              if (designer.searchDesignerVO?.id) {
                map[`zeus_${designer.searchDesignerVO.id}`] = index + 1;
              }
              return map;
            },
            {}
          );
          context.commit('setDesignTopRank', designTopRank)
        }
      })
    }
  },
  modules: {
    message,
		merchantEntry
  },
  plugins: [createLogger()]
})
