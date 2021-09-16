
import TIM from 'tim-wx-sdk'
import {
  getTim,
  getSafeTim,
  addListener,
  cleanListeners
} from "@/utils/tim.js"
import {
  getGroupList
} from "@/api/message.js";

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
    cstServConv: {
      conversationID: "NOTIFICATION-cstServ",
      type: "NOTIFICATION",
      name: "在线客服"
    },
    sysConv: {
      conversationID: "NOTIFICATION-sys",
      type: "NOTIFICATION",
      name: "系统消息",
    },
    itaConv: {
      conversationID: "NOTIFICATION-ita",
      type: "NOTIFICATION",
      name: "互动消息",
    },
    isIMlogin: false,
    currentIMUserId: '',
    currentIMUserSig: '',
    conversationList: [], //腾讯会话列表
    chatGroupList: [], //后台返回的群列表
    groupMembersMap: {}, //按照群id缓存群成员信息
    currentConversation: {},
    currentMessageList: [],
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
              ...conv,
              ...state.cstServConv,
              conversationID: conv.conversationID
            };
            return false;
          }
          return true;
        }
        if (conv.type === TIM.TYPES.CONV_C2C) {
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
      // XXX: 伪造消息
      messageList = messageList.concat([{
        ID: "GROUPgroup_3176_1099_1_1-4-test",
        avatar: "https://ali-image-test.dabanjia.com/image/20210107/1609984385396_8922%242.jpg",
        conversationID: "GROUPgroup_3176_1099_1_1",
        conversationType: "GROUP",
        flow: "out",
        from: "zeus_452",
        nick: "赵文浩1",
        time: 1631351202,
        payload: {
          data: '{"type":"group_questionnaire_message","template":"card","name":"张三","test": "hello"}'
        },
        type: "TIMCustomElem"
      }])
      // XXX end
      messageList.forEach(parseCustomMessage);
      // 更新messageID，续拉时要用到
      state.nextReqMessageID = nextReqMessageID
      state.isCompleted = isCompleted
      // 更新当前消息列表，从头部插入
      state.currentMessageList = messageList.concat(state.currentMessageList);
      state.isAppendMessageList = false;
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
        context.state.isIMlogin = true;
        addListener("CONVERSATION_LIST_UPDATED", (event) => {
          let conversationList = event.data || [];
          context.commit("updateConversationList", conversationList);
        });
        context.dispatch("requestConversationList");
        context.dispatch("requestDBGroupList");
      }).catch(err => {
        context.state.isIMlogin = false;
        console.error("IM login error.", err);
      });
    },
    logoutIM(context) {
      return getTim().logout().then(() => {
        cleanListeners();
        context.state.isIMlogin = false;
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
        groupList.forEach(group => {
          context.dispatch("requestGroupMemberList", group.imGroupId);
        })
        context.commit("setChatGroupList", groupList);
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
      });
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
      // 3. 获取会话信息
      return getTim().getConversationProfile(conversationID).then(({ data }) => {
        // 3.1 更新当前会话
        context.state.currentConversation = data.conversation;
        // 3.2 获取消息列表
        return context.dispatch('requestMessageList', conversationID);
      });
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
  }
}

export default message;
