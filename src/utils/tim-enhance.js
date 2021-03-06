import TIM from 'tim-wx-sdk'
import store from '@/store'
import {
  getSmartQuestionList,
  sendSmartAnswer,
  saveSmartMessage,
  getMessageList
} from "@/api/message.js"

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
  enhanceGetMessageListForCountLimit(tim);
  enhanceGetConversationList(tim);
}

/**
 * 创建智能客服的消息
 * @param {Object} type 消息类型
 * @param {Object} payload 消息内容
 */
function createSmartMessage(type, payload) {
  const time = payload.time || Math.round(new Date().getTime()/1000);
  const msg = {
    ID: "SMART-CUSTMER-" + time,
    nick: "智能客服",
    avatar: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/message/smart_service.png",
    flow: "in",
    time: time,
    from: "SMART-CUSTMER",
    conversationType: TIM.TYPES.CONV_GROUP,
    conversationID: state.cstServConv.conversationID,
    type: type,
    payload: {},
  }
  if (type === TIM.TYPES.MSG_CUSTOM) {
    msg.payload.data = JSON.stringify(payload.data);
    msg.payloadData = payload.data;
  } else if (type === TIM.TYPES.MSG_TEXT) {
    msg.payload.text = payload.text;
  }
  return msg;
}

/**
 * 转换成腾讯IM格式消息
 * @param {Object} payload
 */
function covertToIMMessage(message, conversationID) {
  let type = message.customMessage ? TIM.TYPES.MSG_CUSTOM : TIM.TYPES.MSG_TEXT;
  let userId = message.userInfo.identifier || message.sender;
  let conversationType = TIM.TYPES.CONV_C2C;
  if (/^GROUP/.test(conversationID)) {
    conversationType = TIM.TYPES.CONV_GROUP;
  }
  const msg = {
    ID: message.seq,
    nick: message.userInfo.nickName,
    avatar: message.userInfo.faceUrl,
    flow: "zeus_" + userId === state.currentIMUserId ? "out" : "in",
    time: message.timestamp,
    from: "zeus_" + userId,
    conversationType: conversationType,
    conversationID: conversationID,
    type: type,
    payload: {},
  }
  if (type === TIM.TYPES.MSG_CUSTOM) {
    msg.payload.data = JSON.stringify(message.customMessage);
    msg.payloadData = message.customMessage;
  } else if (type === TIM.TYPES.MSG_TEXT) {
    msg.payload.text = message.messageNodeList[0].content;
  }
  return msg;
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
    console.log("send message enhance1:", msg, state);
    if (msg.type === "AGENT_STATUS") {
      const payloadData = {
        type: msg.payload.type,
        params: msg.payload
      };
      const smMsg = createSmartMessage(TIM.TYPES.MSG_CUSTOM, {
        data: payloadData
      });
      commit("pushCurrentMessageList", smMsg);
      uni.$emit("scroll-to-bottom");
      return Promise.resolve(smMsg);
    } else if (msg.type === "MSG_QUESTION_LIST") {
      // 发送智能客服的问题列表消息
      return getSmartQuestionList().then(res => {
        const payloadData = {
          type: "questions_message",
          params: {
            questions: res || []
          }
        };
        const smMsg = createSmartMessage(TIM.TYPES.MSG_CUSTOM, {
          data: payloadData
        });
        commit("pushCurrentMessageList", smMsg);
        uni.$emit("scroll-to-bottom");
      });
    } else if (msg.type === "MSG_QUESTION"){
      // 选择智能客服问题时发送消息
      const { question, id } = msg.payload;
      let groupId = 0;
      if (state.cstServConv.groupDB) {
        groupId = state.cstServConv.groupDB.id;
      }
      let params = {
        id: id,
        chatGroupId: groupId
      };
      const message = tim.createTextMessage({
        to: state.cstServConv.conversationID.replace(/^GROUP/, ''),
        conversationType: state.cstServConv.type,
        payload: { text: question },
      });
      commit("pushCurrentMessageList", message);
      uni.$emit("scroll-to-bottom");
      return sendSmartAnswer(params).then(res => {
        const { answer } = res;
        const answerMsg = createSmartMessage(TIM.TYPES.MSG_TEXT, {
          text: answer
        });
        commit("setCustomerLastMessage", convertToLastMessage(answerMsg));
        commit("pushCurrentMessageList", answerMsg);
        uni.$emit("scroll-to-bottom");
      }).catch(e => {
        console.log("向后端插入问题消息失败！", e);
        let { data } = e;
        if (data.code === 3704) {
          // 已经有客服了，问题消息和答案消息由后端发
          commit("removeMessageFromCurrentList", message);
          uni.$emit("scroll-to-bottom");
        }
      });
    } else if (msg.conversationID === state.cstServConv.conversationID) {
      // 不管群是否可用，先用IM发消息，失败再走后端
      return new Promise((resolve, reject) => {
        _sendMessage(msg).then(res => {
          resolve(res);
        }).catch(err => {
          console.log("向客服群发消息失败，走后台保存消息", err.message);
          commit("setCustomerLastMessage", convertToLastMessage(msg));
          let params = {
            groupId: state.cstServConv.conversationID.replace(/^GROUP/, '')
          };
          if (msg.type === TIM.TYPES.MSG_CUSTOM) {
            params.type = "CUSTOM";
            params.data = {
              data: msg.payload.data
            };
          } else {
            params.type = "TEXT";
            params.data = {
              content: msg.payload.text
            };
          }
          saveSmartMessage(params).then(res => {
            resolve(response(msg));
          });
        })
      });
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
      if (conversationID === state.cstServConv.conversationID || conversationID === "CUSTOMER") {
        if (conversationID === "CUSTOMER") {
          commit("setCustomerAvailable", false);
          resolve(response(state.cstServConv));
        } else {
          _getConversationProfile(conversationID).then(({data}) => {
            commit("setCustomerAvailable", true);
            resolve(response(state.cstServConv));
          }).catch(err => {
            console.log("在线客服会话Profile获取失败！", err.message);
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
  });
  // 将智能客服会话中从后台获取的消息转换成im消息格式
  const convertToIMMessageForSmart = (message, conversationID) => {
    let msg = {};
    if (message.sender === 0) {
      let text = (message.customMessage && message.customMessage.params) ? message.customMessage.params.content : ""
      msg = createSmartMessage(TIM.TYPES.MSG_TEXT, {
        time: message.timestamp,
        text: text
      })
    } else {
      msg = covertToIMMessage(message, conversationID);
    }
    msg.seq = message.seq;
    msg.ID = message.timestamp + "#" + message.seq;
    return msg;
  }
  tim.getMessageList = function(params) {
    console.log("enhance get message list:", params);
    const { conversationID, nextReqMessageID, count } = params;
    if (conversationID === "CUSTOMER") {
      return Promise.resolve(response([], true, ''));
    }
    if (conversationID === state.cstServConv.conversationID) {
      // 在线客服消息，从后台接口获取
      let arr = (nextReqMessageID || "").split("#");
      let endTime = Number(arr[0]) || undefined;
      let req = Number(arr[1]) || undefined;
      let query = {
        imChatGroupId: conversationID.replace(/^GROUP/, ''),
        req: req,
        endTime: endTime,
        msgNum: count,
        sort: true,
        type: 0
      };
      return getMessageList(query).then(res => {
        let list = (res || []).map(msg => convertToIMMessageForSmart(msg, conversationID));
        let nextMessage = list[list.length - 1];
        let isCompleted = true;
        let nextID = 0;
        if (nextMessage) {
          isCompleted = nextMessage.seq == 1; //最后一条的seq为1代表数据拉完了
          nextID = nextMessage.ID;
        }
        if (list.length < count) {
          isCompleted = true;
        }
        return response(list.reverse(), isCompleted, nextID);
      });
    }
    return _getMessageList(params);
  }
}

/**
 * 增强获取消息列表，处理腾讯IM一次最多获取15条的限制
 * @param {Object} tim
 */
function enhanceGetMessageListForCountLimit(tim) {
  const _getMessageList = tim.getMessageList;
  const response = (list, isCompleted, nextID) => ({
    code: 0,
    data: {
      nextReqMessageID: nextID || '',
      isCompleted: isCompleted || false,
      messageList: list,
    }
  });
  let requestingConvId = ''; // 请求中的会话id
  tim.getMessageList = function(params) {
    console.log("enhance getMessageList for count limit", params);
    const { conversationID, nextReqMessageID, count } = params;
    if (conversationID === requestingConvId) {
      return Promise.reject(new Error("会话在请求中，拒绝再次请求"));
    }
    if (count > 15) {
      return new Promise((resolve, reject) => {
        requestingConvId = conversationID;
        let rest = count;
        let nextId = nextReqMessageID;
        let list = [];
        const getNextPage = () => {
          _getMessageList({ 
            conversationID: conversationID, 
            nextReqMessageID: nextId , 
            count: rest > 15 ? 15 : rest 
          }).then(imRes => {
            const { nextReqMessageID, isCompleted, messageList } = imRes.data;
            nextId = nextReqMessageID;
            list = (messageList || []).concat(list);
            rest = rest - 15;
            if (isCompleted) {
              requestingConvId = '';
              resolve(response(list, true, nextReqMessageID));
            } else if (rest > 0) {
              getNextPage();
            } else {
              requestingConvId = '';
              resolve(response(list, isCompleted, nextReqMessageID));
            }
          })
        }
        getNextPage();
      });
    } else {
      return _getMessageList(params);
    }
  }
}

/**
 * 增强获取会话列表，处理IM的bug：当没有获取群的Profile时候，
 * 会话列表无法得到的数据里groupProfile.introduction为空
 * @param {Object} tim
 */
function enhanceGetConversationList(tim) {
  const _getConversationList = tim.getConversationList;
  let initMap = {};
  tim.getConversationList = function(options) {
    return new Promise((resolve, reject) => {
      _getConversationList(options).then(res => {
        const convList = res.data.conversationList || [];
        let count = 0;
        let done = 0;
        convList.forEach(conv => {
          if (conv.type === TIM.TYPES.CONV_GROUP && !initMap[conv.conversationID]) {
            initMap[conv.conversationID] = true;
            count++;
            tim.getConversationProfile(conv.conversationID).then(p => {
              conv.groupProfile = p.data.conversation.groupProfile;
              done++;
              if (done === count) {
                resolve(res);
              }
            })
          }
        });
        if (count === 0) {
          resolve(res);
        }
      });
    });
  }
}

export default enhanceTim;