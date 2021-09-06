//测试使用，接口提供后修改为从后端获取签名
import {
  genTestUserSig
} from "@/utils/debug/GenerateTestUserSig.js"
import TIM from 'tim-wx-sdk'
import {
  getTim,
  getSafeTim
} from "@/utils/tim.js"
const message = {
  state: {
    cstServConv: {
      type: "NOTIFICATION",
      name: "在线客服"
    },
    sysConv: {
      type: "NOTIFICATION",
      name: "系统消息",
    },
    itaConv: {
      type: "NOTIFICATION",
      name: "互动消息",
    },
    isIMlogin: false,
    currentIMUserId: '',
    currentIMUserSig: '',
    conversationList: [],
    currentConversation: {},
    currentMessageList: [],
    newMessageMap: {},
    messagePageSize: 15,
    nextReqMessageID: '',
    isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
  },
  mutations: {
    resetConversation(state) {
      state.currentMessageList = [];
      state.nextReqMessageID = '';
      state.isCompleted = false;
      state.currentConversation = {};
    },
    /**
     * 更新会话列表
     * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
     * @param {Object} state
     * @param {Conversation[]} conversationList
     */
    updateConversationList(state, conversationList) {
      state.conversationList = conversationList.filter(conv => {
        if (conv.type === TIM.TYPES.CONV_GROUP) {
          return true;
        }
        if (conv.type === TIM.TYPES.CONV_C2C) {
          return true;
        }
        return false;
      });
    },
    /**
     * 将消息插入当前会话列表
     * 调用时机：收/发消息事件触发时
     * @param {Object} state
     * @param {Message[]|Message} data
     * @returns
     */
    pushCurrentMessageList(state, data) {
      // 还没当前会话，则跳过
      if (!state.currentConversation.conversationID) {
        return
      }
      let list = [];
      if (Array.isArray(data)) {
        // 筛选出当前会话的消息
        list = data.filter(item => item.conversationID === state.currentConversation.conversationID)
      } else if (data.conversationID === state.currentConversation.conversationID) {
        list = [data];
      }
      state.newMessageMap = list.reduce((obj, msg) => {
        obj[msg.ID] = true;
        return obj;
      }, {})
      state.currentMessageList = state.currentMessageList.concat(list);
    },
  },
  actions: {
    requestIMSig(context, userId) {
      return new Promise((resolve, reject) => {        
        let {
          userSig
        } = genTestUserSig(userId);
        resolve({userSig});
      });
    },
    loginIM(context, userId) {
      return context.dispatch("requestIMSig", userId).then(res => {
        let userSig = res.userSig;
        context.state.currentIMUserId = userId;
        context.state.currentIMUserSig = userSig;
        return getTim().login({
          userID: userId,
          userSig: userSig
        })
      }).then(res => {
        context.state.isIMlogin = true;
      }).catch(err => {
        context.state.isIMlogin = false;
        console.error("IM login error.", err);
      });
    },
    requestConversationList(context) {
      getSafeTim().then(tim => tim.getConversationList()).then(res => {
        if (res.code === 0) {
          context.commit("updateConversationList", res.data.conversationList || []);
        }
      });
    },
    /**
     * 获取消息列表
     * 调用时机：打开某一会话时或下拉获取历史消息时
     * @param {Object} context
     * @param {String} conversationID
     */
    requestMessageList(context, conversationID) {
      if (context.state.isCompleted) {
        return Promise.resolve();
      }
      const { nextReqMessageID, messagePageSize, currentMessageList } = context.state
      return getTim().getMessageList({ conversationID, nextReqMessageID, count: messagePageSize }).then(imReponse => {
        console.log("get message list:", conversationID, imReponse, 11111)
        // 更新messageID，续拉时要用到
        context.state.nextReqMessageID = imReponse.data.nextReqMessageID
        context.state.isCompleted = imReponse.data.isCompleted
        // 更新当前消息列表，从头部插入
        context.state.currentMessageList = [...imReponse.data.messageList, ...currentMessageList]
      })
    },
    /**
     * 切换会话
     * 调用时机：切换会话时
     * @param {Object} context
     * @param {String} conversationID
     */
    checkoutConversation(context, conversationID) {
      console.log("check conversation:", conversationID, 'prev conversation:', context.state.currentConversation.conversationID);
      // 1.切换会话前，将切换前的会话进行已读上报
      if (context.state.currentConversation.conversationID) {
        const prevConversationID = context.state.currentConversation.conversationID
        getTim().setMessageRead({ conversationID: prevConversationID }).catch(e => { })
        //切换会话时，清空消息
        if (prevConversationID !== conversationID) {
          context.commit("resetConversation");
        }
      }
      // 2.待切换的会话也进行已读上报
      getTim().setMessageRead({ conversationID }).catch(e => { })
      context.state.currentConversation = {
        conversationID
      }
      // 3.2 获取消息列表
      context.dispatch('requestMessageList', conversationID);
    }
  }
}

export default message;
