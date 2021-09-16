import TIM from 'tim-wx-sdk'
import store from '@/store'

const state = store.state.message;
const dispatch = store.dispatch;
const commit = store.commit;

/**
 * 增强腾讯IM，加入业务逻辑
 * @param {Object} tim
 */
function enhanceTim(tim) {
  enhanceSendMessage(tim);
  enhanceGetConversationProfile(tim);
  enhanceGetMessageList(tim);
}

/**
 * 增强发送消息逻辑，如果是在线客服并且群是关闭状态下，则只调用后台接口 
 * @param {Object} tim
 */
function enhanceSendMessage(tim) {
  const _sendMessage = tim.sendMessage;
  const response = (msg) => ({
    code: 0,
    data: {
      message: msg
    }
  });
  const getMessageForShow = (msg) => {
    if (msg.type === TIM.TYPES.MSG_TEXT) {
      return msg.payload.text;
    }
    if (msg.type === TIM.TYPES.MSG_IMAGE) {
      return '[图片]'
    }
    if (msg.type === TIM.TYPES.MSG_AUDIO) {
      return '[语音]'
    }
    if (msg.type === TIM.TYPES.MSG_CUSTOM) {
      return '[自定义消息]'
    }
    return '[' + msg.type +']';
  }
  const convertToLastMessage = (msg) => ({
    fromAccount: msg.from,
    lastTime: msg.time,
    messageForShow: getMessageForShow(msg),
    payload: {
      ...msg.payload
    },
    type: msg.type
  });
  tim.sendMessage = function(msg) {
    console.log("send message enhance:", msg, state);
    if (msg.conversationID === state.cstServConv.conversationID) {
      if (!state.cstServConv.isAvailable) {
        commit("setCustomerLastMessage", convertToLastMessage(msg));
        return Promise.resolve(response(msg));
      }
    }
    return _sendMessage(msg);
  }
}

/**
 * 增强获取会话信息逻辑，如果是系统会话，则直接返回对应的会话 
 * @param {Object} tim
 */
function enhanceGetConversationProfile(tim) {
  const _getConversationProfile = tim.getConversationProfile;
  const response = (conv) => ({
    code: 0,
    data: {
      conversation: conv
    }
  })
  tim.getConversationProfile = function(conversationID) {
    return new Promise((resolve, reject) => {
      if (conversationID === state.cstServConv.conversationID) {
        if (conversationID === "CUSTOMER") {
          commit("setCustomerAvailable", false);
          resolve(response(state.cstServConv));
        } else {
          _getConversationProfile(conversationID).then(({data}) => {
            commit("setCustomerAvailable", true);
            resolve(response(state.cstServConv));
          }).catch(err => {
            commit("setCustomerAvailable", false);
            resolve(response(state.cstServConv));
          })
        }
      } else if (conversationID === state.sysConv.conversationID) {
        resolve(response(state.sysConv));
      } else if (conversationID === state.itaConv.conversationID) {
        resolve(response(state.itaConv));
      } else {
        _getConversationProfile(conversationID).then((res) => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      }
    })
  }
}

/**
 * 增强获取消息列表
 * @param {Object} tim
 */
function enhanceGetMessageList(tim) {
  const _getMessageList = tim.getMessageList;
  const response = (list, isCompleted, nextID) => ({
    code: 0,
    data: {
      nextReqMessageID: nextID || '',
      isCompleted: isCompleted || false,
      messageList: list,
    }
  })
  tim.getMessageList = function(params) {
    console.log("enhance get message list:", params);
    const { conversationID, nextReqMessageID, count } = params;
    if (conversationID === state.cstServConv.conversationID) {
      return Promise.resolve(response([], true, ''));
    }
    return _getMessageList(params);
  }
}

export default enhanceTim;