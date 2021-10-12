
import TIM from 'tim-wx-sdk'
import {
  getTim,
  getSafeTim,
  addListener,
  cleanListeners,
  isSDKReady
} from "@/utils/tim.js"
import {
  getGroupList,
  getAgentStatus,
  createC2CChat
} from "@/api/message.js";

const CONV_TYPES = {
  CUSTOMER: 1, //客服会话
  SYSTEM: 2, //系统消息会话
  INTERACTION: 3, //互动消息会话
  COMMON: 99  //普通会话
}

// 解析自定义消息，并把payload.data字符串值解析后放到message的payloadData属性上
const parseCustomMessage = (msg) => {
  if (msg.type === TIM.TYPES.MSG_CUSTOM) {
    let payloadData = {};
    try {
      payloadData = JSON.parse(msg.payload.data);
    } catch (e) {
      console.error(e);
    }
    msg.payloadData = payloadData;
  }
  return msg;
}

const message = {
  state: {
    CONV_TYPES: CONV_TYPES,
    cstServConv: {
      conversationID: "CUSTOMER",
      type: TIM.TYPES.CONV_GROUP,
      systemType: CONV_TYPES.CUSTOMER,
      isAvailable: false,
      name: "在线客服"
    },
    sysConv: {
      conversationID: "C2Cadministrator",
      type: TIM.TYPES.CONV_C2C,
      systemType: CONV_TYPES.SYSTEM,
      name: "系统消息",
    },
    itaConv: {
      conversationID: "C2CcommentAndReply",
      type: TIM.TYPES.CONV_C2C,
      systemType: CONV_TYPES.INTERACTION,
      name: "互动消息",
    },
    isIMLogin: false,
    currentIMUserId: '',
    currentIMUserSig: '',
    conversationList: [], //腾讯会话列表
    chatGroupList: [], //后台返回的群列表
    groupMembersMap: {}, //按照群id缓存群成员信息
    currentConversation: {},
    currentMessageList: [],
    customerMessageList: [], //客服消息列表，前端存一份
    isAppendMessageList: false, //是否消息后面拼接新消息
    newMessageMap: {},
    messagePageSize: 15,
    nextReqMessageID: '',
    isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
    isRequesting: false, //是否正在请求消息
    currentSoundUrl: '', //正在播放的语音url
    soundPlayStatus: 'stop', //语音播放状态，可用值有 stop playing pause
    innerAudioContext: null, //音频播放器
    showVideoPlayer: false, //显示视频播放器
    currentVideoUrl: '', //当前播放的视频地址
  },
  getters: {
    //系统消息未读个数，可以监听该数据变化，判断是否有系统消息
    systemUnreadCount(state) {
      return state.sysConv.unreadCount || 0;
    },
    //全部未读数
    totalUnreadCount(state) {
      let total = 0;
      total += state.cstServConv.unreadCount || 0;
      total += state.sysConv.unreadCount || 0;
      total += state.itaConv.unreadCount || 0;
      state.conversationList.forEach(conv => {
        if (conv.unreadCount) {
          total += conv.unreadCount;
        }
      })
      return total;
    }
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
          // 如果是客服群
          if (/_2_13$/.test(conv.conversationID)) {
            state.cstServConv = {
              ...state.cstServConv,
              ...conv,
              conversationID: conv.conversationID
            };
            return false;
          }
          if (conv.groupProfile && conv.groupProfile.type === TIM.TYPES.GRP_AVCHATROOM) {
            return false;
          }
          return true;
        }
        if (conv.type === TIM.TYPES.CONV_C2C) {
          // 如果是系统消息
          if (conv.conversationID === state.sysConv.conversationID) {
            state.sysConv = {
              ...state.sysConv,
              ...conv
            };
            return false;
          }
          //如果是互动消息
          if (conv.conversationID === state.itaConv.conversationID) {
            state.itaConv = {
              ...state.itaConv,
              ...conv
            };
            return false;
          }
          // 如果单聊不是到人的会话，则忽略掉
          if (!/^C2Czeus_/.test(conv.conversationID)) {
            console.warn("非法会话，已忽略", conv);
            return false;
          }
          return true;
        }
        return false;
      });
    },
    /**
     * 将消息插入当前会话的消息列表
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
      state.isAppendMessageList = true;
      list.forEach(parseCustomMessage);
      state.currentMessageList = state.currentMessageList.concat(list);
    },
    /**
     * 将消息插入当前会话的消息列表头部，并记录下次请求的参数
     * 调用时机：向上滑动拉取消息记录时
     * @param {Object} state
     * @param {Object} payload
     */
    prependCurrentMessageList(state, payload) {
      let {
        nextReqMessageID,
        isCompleted,
        messageList = [],
      } = payload;
      messageList.forEach(parseCustomMessage);
      // 更新messageID，续拉时要用到
      state.nextReqMessageID = nextReqMessageID
      state.isCompleted = isCompleted
      // 更新当前消息列表，从头部插入
      state.currentMessageList = messageList.concat(state.currentMessageList);
      state.isAppendMessageList = false;
    },
    /**
     * 从当前消息列表中移除消息
     * 调用时机：发送消息失败时，将消息从消息列表中移除
     * @param {Object} state
     * @param {Message} message
     */
    removeMessageFromCurrentList(state, message) {
      let idx = state.currentMessageList.indexOf(message);
      if (idx >= 0) {
        state.currentMessageList.splice(idx, 1);
      }
    },
    updateSoundStatus(state, payload) {
      const { status, url } = payload;
      if (status === "playing") {
        state.currentSoundUrl = url;
        state.soundPlayStatus = "playing";
      } else if (status === "pause") {
        state.soundPlayStatus = "pause";
      } else if (status === "stop") {
        state.currentSoundUrl = "";
        state.soundPlayStatus = "stop";
      }
    },
    showMessageVideoPlayer(state, url) {
      state.currentVideoUrl = url;
      state.showVideoPlayer = true;
    },
    closeMessageVideoPlayer(state, url) {
      state.showVideoPlayer = false;
    },
    setChatGroupList(state, list) {
      state.chatGroupList = (list || []).filter(grp => {
        //在线客服群
        if (grp.businessType ===  2 && grp.type === 13) {
          state.cstServConv = {
            ...state.cstServConv,
            conversationID: "GROUP" + grp.imGroupId,
            groupDB: grp,
          }
          return false;
        }
        return true;
      });
    },
    setCustomerAvailable(state, available) {
      state.cstServConv = {
        ...state.cstServConv,
        isAvailable: available
      };
    },
    setCustomerLastMessage(state, lastMessage) {
      state.cstServConv = {
        ...state.cstServConv,
        lastMessage: lastMessage
      };
    },
    setIMLogin(state, isLogin) {
      state.isIMLogin = isLogin;
    }
  },
  actions: {
    loginIM(context, payload) {
      const {
        userId,
        userSig
      } = payload;
      context.state.currentIMUserId = userId;
      context.state.currentIMUserSig = userSig;
      return getTim().login({
        userID: userId,
        userSig: userSig
      }).then(res => {
        context.commit("setIMLogin", true);
        addListener("CONVERSATION_LIST_UPDATED", (event) => {
          let conversationList = event.data || [];
          context.commit("updateConversationList", conversationList);
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
        }, "IM-CONVERSATION_LIST_UPDATED");
        addListener("MESSAGE_RECEIVED", (event) => {
          let messageList = event.data || [];
          let systemMessageList = messageList.filter(msg => msg.conversationID === context.state.sysConv.conversationID);
          if (systemMessageList.length) {
            uni.$emit("system-messages", systemMessageList);
          }
        }, "IM-MESSAGE_RECEIVED");
        context.dispatch("requestConversationList");
        context.dispatch("requestDBGroupList");
      }).catch(err => {
        context.commit("setIMLogin", false);
        console.error("IM login error.", err);
      });
    },
    logoutIM(context) {
      return getTim().logout().then(() => {
        cleanListeners();
        context.commit("setIMLogin", false);
      });
    },
    requestConversationList(context) {
      return getSafeTim().then(tim => tim.getConversationList()).then(res => {
        if (res.code === 0) {
          context.commit("updateConversationList", res.data.conversationList || []);
        }
      });
    },
    /**
     * 从后台获取群列表
     * @param {Object} context
     */
    requestDBGroupList(context) {
      getGroupList().then(data => {
        const groupList = data.chatGroupBusinessDTOList || [];
        context.commit("setChatGroupList", groupList);
        context.state.chatGroupList.forEach(group => {
          context.dispatch("requestGroupMemberList", group.imGroupId);
        })
      });
    },
    /**
     * 从腾讯获取群成员信息
     */
    requestGroupMemberList(context, groupId) {
      return getSafeTim().then(tim => tim.getGroupMemberList({ 
        groupID: groupId, 
        count: 30,
        offset:0 ,
      })).then(imResponse => {
        console.log("get member list:", imResponse);
        const memberList = imResponse.data.memberList || [];
        context.state.groupMembersMap[groupId] = memberList;
        return memberList;
      }).catch(err => {
        console.error("get member list error:", groupId, err);
      })
    },
    /**
     * 获取消息列表
     * 调用时机：打开某一会话时或下拉获取历史消息时
     * @param {Object} context
     * @param {String} conversationID
     */
    requestMessageList(context, conversationID) {
      console.log("requestMessageList", conversationID, context.state.isCompleted)
      if (context.state.isCompleted) {
        return Promise.resolve();
      }
      const { nextReqMessageID, messagePageSize, currentMessageList } = context.state
      context.state.isRequesting = true;
      return getTim().getMessageList({ conversationID, nextReqMessageID, count: messagePageSize }).then(imReponse => {
        context.state.isRequesting = false;
        context.commit("prependCurrentMessageList", imReponse.data);
      }).catch(err => {
        console.error("获取消息列表出错：", err);
      })
    },
    /**
     * 切换会话
     * 调用时机：切换会话时
     * @param {Object} context
     * @param {String} conversationID
     */
    checkoutConversation(context, conversationID) {
      console.log("check conversation:", conversationID);
      // 2.待切换的会话也进行已读上报 
      if (conversationID === 'CUSTOMER' || conversationID === context.state.cstServConv.conversationID) {
        if (context.state.cstServConv.isAvailable) {
          getTim().setMessageRead({ conversationID }).catch(e => { })
        }
      } else {
        getTim().setMessageRead({ conversationID }).catch(e => { })
      }
      // 3. 获取会话信息
      return getTim().getConversationProfile(conversationID).then(({data}) => {
        const conversation = data.conversation;
        console.log("conversation  data:", conversation);
        // 3.1 更新当前会话 
        context.state.currentConversation = conversation;
        if (conversation.systemType === CONV_TYPES.CUSTOMER) {
          return context.dispatch("requestMessageList", conversationID).then(() => {
            getAgentStatus(getApp().globalData.userInfo.id).then(res => {
              let { isGroupButlerExist, queuePosition } = res;
              if (isGroupButlerExist) {
                getTim().sendMessage({
                  type: "AGENT_STATUS",
                  payload: {
                    type: queuePosition == 0 ? "custom_agant_coming" : "custom_agant_waiting",
                    position: queuePosition
                  }
                });
              } else {
                getTim().sendMessage({
                  type: "MSG_QUESTION_LIST",
                });
              }
            }).catch(e => {
              getTim().sendMessage({
                type: "MSG_QUESTION_LIST",
              });
            });
          });
        }
        // 3.2 获取消息列表
        return context.dispatch('requestMessageList', conversationID);
      }).catch(err => {
        console.error("获取会话信息出错：", err);
        setTimeout(function() {
          if (!isSDKReady()) {
            uni.navigateTo({
              url: "/pages/login/login",
            });
          }
        }, 50);
      })
    },
    playMessageSound(context, payload) {
      if (!context.state.innerAudioContext) {
        context.state.innerAudioContext = uni.createInnerAudioContext();
        context.state.innerAudioContext.onEnded(() => {
          context.commit("updateSoundStatus", { status: "stop" });
        });
        context.state.innerAudioContext.onStop(() => {
          context.commit("updateSoundStatus", { status: "stop" });
        });
        context.state.innerAudioContext.onError((err) => {
          console.error("sound play error:", err);
          context.commit("updateSoundStatus", { status: "stop" });
        });
        context.state.innerAudioContext.onPause(() => {
          context.commit("updateSoundStatus", { status: "pause" });
        });
        context.state.innerAudioContext.onPlay(() => {
          context.commit("updateSoundStatus", { status: "playing", url: context.state.innerAudioContext.src });
        });
      }
      const { url } = payload;
      const prevSoundUrl = context.state.currentSoundUrl;
      const status = context.state.soundPlayStatus;
      if (url === prevSoundUrl && status === "playing") {
        context.state.innerAudioContext.pause();
      } else {
        context.state.innerAudioContext.src = url;
        context.state.innerAudioContext.play();
      }
    },
    playMessageVideo(context, payload) {
      const { url } = payload;
      context.commit("showMessageVideoPlayer", url);
    },
    preivewMessageImage(context, payload) {
      const { url } = payload;
      let urls = [];
      context.state.currentMessageList.forEach(msg => {
        if (msg.type === TIM.TYPES.MSG_CUSTOM && msg.payloadData.type === 'img_message') {
          urls.push(msg.payloadData.fileUrl);
        }
      });
      let idx = urls.indexOf(url)
      uni.previewImage({
        urls: urls,
        current: idx >= 0 ? idx : 0,
        indicator: 'number'
      });
    },
    /**
     * 打开在线客服会话
     * @param {Object} context
     */
    openCustomerConversation(context) {
      if (!isSDKReady()) {
        uni.navigateTo({
          url: "/pages/login/login",
        });
        return;
      }
      let { conversationID, name } = context.state.cstServConv;
      uni.navigateTo({
        url: "/pages/message/conversation/conversation?id=" + conversationID + "&name=" + name,
      });
    },
    /**
     * 打开单聊
     * @param {Object} context
     * @param {Object} userId
     */
    openC2CConversation(context, userId) {
      if (!isSDKReady()) {
        uni.navigateTo({
          url: "/pages/login/login",
        });
        return;
      }
      const conversationList = context.state.conversationList;
      const userIMID = "zeus_" + userId;
      const convId = TIM.TYPES.CONV_C2C + userIMID;
      
      let params = {
        sourceZeusId: getApp().globalData.userInfo.id,
        targetZeusId: userId
      }
      createC2CChat(params).then(res => {
        uni.navigateTo({
          url: "/pages/message/conversation/conversation?id=" + convId,
        });
      });
    }
  }
}

export default message;
