<template>
  <view class="conversation-container" :class="{bgWhite: type === CONV_TYPES.INTERACTION}">
    <scroll-view
      :scroll-top="scrollTop"
      :scroll-y="true"
      :refresher-enabled="false"
      :refresher-triggered="false"
      :scroll-with-animation="false"
      :scroll-anchoring="true"
      :refresher-threshold="10"
      id="messageList"
      class="message-list"
      @scroll="handleMessageListScroll"
      @scrolltoupper="handlePulling"
      @click="handleMessageListClick"
    >
      <view v-if="!isCompleted" class="loading-wrapper">
        <image class="loading-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/loading.gif"></image>
      </view>
      <view v-if="unreadCount >= 8" class="unread-msg-tip" @click="scrollToUnreadStart">
        <view class="tip-icon icon-ic_shanghua"></view>{{ unreadCount > 99 ? "99+" : unreadCount }}条新消息
      </view>
      <template v-if="currentMessageList.length">
        <view v-if="type === CONV_TYPES.COMMON || type === CONV_TYPES.CUSTOMER" id="listBody" class="message-list-body">
          <template v-for="(msg, idx) in currentMessageList">
            <view
              v-if="showTimeTag(msg, currentMessageList[idx - 1], idx)"
              :key="msg.ID"
              class="message-tags-time"
            >{{ formatMessageTime(msg.time) }}</view>
            <view v-if="unreadCount >= 8 && (currentMessageList.length - idx === unreadCount)" :key="msg.ID" :id="'startBar' + msg.ID" class="unread-message-start-bar"></view>
            <message-item :key="msg.ID" :message="msg"></message-item>
          </template>
        </view>
        <view v-else-if="type === CONV_TYPES.SYSTEM" id="listBody" class="message-list-body" style="padding-bottom: 48rpx">
          <template v-for="(msg, idx) in currentMessageList">
            <view
              :key="msg.ID"
              class="message-tags-time"
            >{{ formatMessageTime(msg.time) }}</view>
            <message-item-system :key="msg.ID" :message="msg"></message-item-system>
          </template>
        </view>
        <view v-else-if="type === CONV_TYPES.INTERACTION" id="listBody" class="message-list-body" style="padding-bottom: 48rpx; background: #fff;">
          <message-item-interaction
            v-for="(msg, idx) in currentMessageList"
            :key="msg.ID" 
            :message="msg"
          ></message-item-interaction>
        </view>
      </template>
      <view v-else-if="type === CONV_TYPES.SYSTEM && loaded" class="empty-container">
        <image class="empty-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/empty.png"></image>
        <view class="empty-tip">
          {{ emptyTip }}
        </view>
      </view>
    </scroll-view>
    <message-send-box v-if="type === CONV_TYPES.COMMON || type === CONV_TYPES.CUSTOMER"></message-send-box>
    <reply-box v-if="type === CONV_TYPES.INTERACTION" />
  </view>
</template>

<script>
  import { getTim, addListener, removeListener } from "@/utils/tim.js"
  import MessageSendBox from "./message-send-box.vue"
  import ReplyBox from "./reply-box.vue"
  import MessageItem from "./message-element/message-item.vue"
  import MessageItemSystem from "./message-element/message-item-system.vue"
  import MessageItemInteraction from "./message-element/message-item-interaction.vue"
  import { mapState } from "vuex";
  import { calendarFormat } from "@/utils/date.js"
  import TIM from 'tim-wx-sdk'

  export default {
    components: {
      MessageSendBox,
      ReplyBox,
      MessageItem,
      MessageItemSystem,
      MessageItemInteraction,
    },
    data() {
      return {
        clientHeight: 0,
        preScrollHeight: 0,
        scrollTop: 0,
        currentScrollTop: 0,
        unreadCount: 0,
        unreadStartBarPos: 0, //未读消息块的相对父容器的位置
        loaded: false
      }
    },
    computed: {
      ...mapState({
        CONV_TYPES: (state) => state.message.CONV_TYPES,
        cstServConv: (state) => state.message.cstServConv,
        conversationList: (state) => state.message.conversationList,
        currentConversation: (state) => state.message.currentConversation,
        currentMessageList: (state) => state.message.currentMessageList,
        chatGroupList: (state) => state.message.chatGroupList,
        isCompleted: (state) => state.message.isCompleted,
        isRequesting: (state) => state.message.isRequesting,
        isAppendMessageList: (state) => state.message.isAppendMessageList,
      }),
      type() {
        if (!this.currentConversation.conversationID) {
          return '';
        }
        return this.currentConversation.systemType || this.CONV_TYPES.COMMON;
      },
      emptyTip() {
        return ({
          [this.CONV_TYPES.CUSTOMER]: "暂无消息",
          [this.CONV_TYPES.SYSTEM]: "暂无系统消息",
          [this.CONV_TYPES.INTERACTION]: "暂无互动消息",
          [this.CONV_TYPES.COMMON]: "暂无消息",
        })[this.type] || "暂无消息";
      }
    },
    watch: {
      currentMessageList(list, oldList) {
        if (list.length) {
          if (oldList.length) {
            if (this.isAppendMessageList) {
              this.keepOnBottom();
            } else {
              this.keepCurrentPosition();
            }
          } else {
            this.scrollToBottom();
          }
        }
      },
    },
    mounted() {
      uni.$on("scroll-to-bottom", this.scrollToBottom);
      uni.$on("keyboard-change", this.handleKeyboardChange);
      this.$once("hook:beforeDestroy", () => {
        uni.$off("scroll-to-bottom", this.scrollToBottom);
        uni.$off("keyboard-change", this.handleKeyboardChange);
      });
      const query = uni.createSelectorQuery().in(this);
      this.messageListNodesRef = query.select("#messageList");
      
      this.messageListRectTask = this.messageListNodesRef.boundingClientRect();
      this.messageListOffsetTask = this.messageListNodesRef.scrollOffset();
      // setTimeout(() => {
      //   this.listBodyNodesRef = query.select("#listBody");
      //   this.listBodyRectTask = this.listBodyNodesRef.boundingClientRect();
      // }, 200);
      this.messageListRectTask.exec((arr) => {
        let [rectOpt, offsetOpt] = arr;
        this.clientHeight = rectOpt.height;
      });;
      addListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      this.$once("hook:beforeDestroy", () => {
        removeListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      })
    },
    beforeDestroy() {
      this.messageListRectTask = null;
      this.messageListOffsetTask = null;
      this.messageListNodesRef = null;
      
      // this.listBodyRectTask = null;
      // this.listBodyNodesRef = null;
    },
    onLoad(options) {
      if (options.id === "CUSTOMER") {
        let conv = this.cstServConv;
        uni.setNavigationBarTitle({
        　　title: conv.name
        });
        this.$store.dispatch("checkoutConversation", conv.conversationID).then(res => {
          this.loaded = true;
        })
      } else {
        uni.setNavigationBarTitle({
        　　title: options.name || ""
        });
        let conv = this.conversationList.find(item => item.conversationID === options.id);
        if (conv) {
          this.unreadCount = conv.unreadCount || 0;
        }
        this.$store.dispatch("checkoutConversation", options.id).then(res => {
          this.loaded = true;
          this.requestGroupMembers();
          // 未读数大于15时，把除去15之后剩余的未读消息都拉取过来
          if (this.unreadCount > 15) {
            this.$store.dispatch("requestMessageList", {
              conversationID: options.id,
              count: this.unreadCount - 15
            }).then(this.calcUnreadStartBarPos);
          } else if (this.unreadCount >= 8){
            this.calcUnreadStartBarPos();
          }
          if (!options.name) {
            if (this.currentConversation.userProfile) {
              uni.setNavigationBarTitle({
              　　title: this.currentConversation.userProfile.nick
              });
            } else if (this.currentConversation.groupProfile) {
              uni.setNavigationBarTitle({
              　　title: this.currentConversation.groupProfile.introduction
              });
            }
          }
        })
      }
    },
    onUnload() {
      this.$store.commit("resetConversation");
    },
    methods: {
      showTimeTag(message, prevMessage, idx) {
        if (idx == 0) {
          return this.isCompleted;
        }
        if (prevMessage) {
          return message.time - prevMessage.time > 300;
        }
        return true;
      },
      formatMessageTime(time) {
        return calendarFormat(time*1000, {
          sameDay: 'HH:mm',
          nextDay: '[明天] HH:mm',
          lastDay: '[昨天] HH:mm',
          last2Day: '[前天] HH:mm',
          sameYear: 'MM-DD HH:mm',
          sameElse: 'YYYY/MM/DD HH:mm'
        });
      },
      keepOnBottom() {
        // 距离底部20px内强制滚到底部,否则提示有新消息
        if (this.preScrollHeight - this.clientHeight - this.currentScrollTop < 20) {
          this.$nextTick(() => {
            this.messageListOffsetTask.exec((arr) => {
              let [rectOpt, offsetOpt] = arr;
              if (offsetOpt.scrollHeight === this.scrollTop) {
                // 这样处理是因为当scrollTop的值无变化时，就不会触发元素的滚动
                this.scrollTop = offsetOpt.scrollHeight + 1;
                this.currentScrollTop = offsetOpt.scrollHeight;
              } else {
                this.currentScrollTop = this.scrollTop = offsetOpt.scrollHeight;
              }
              this.preScrollHeight = offsetOpt.scrollHeight;
            });
          })
        } else {
          this.messageListOffsetTask.exec((arr) => {
            let [rectOpt, offsetOpt] = arr;
            this.preScrollHeight = offsetOpt.scrollHeight;
          });
        }
      },
      // 保持当前位置
      keepCurrentPosition() {
        let prevScrollBottom = this.preScrollHeight - this.currentScrollTop;
        this.$nextTick(() => {
          this.messageListOffsetTask.exec((arr) => {
            let [rectOpt, offsetOpt] = arr;
            this.currentScrollTop = this.scrollTop = offsetOpt.scrollHeight - prevScrollBottom - 50;
            this.preScrollHeight = offsetOpt.scrollHeight;
          });
        })
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.messageListOffsetTask.exec((arr) => {
            let [rectOpt, offsetOpt] = arr;
            if (offsetOpt.scrollHeight === this.scrollTop) {
              // 这样处理是因为当scrollTop的值无变化时，就不会触发元素的滚动
              this.scrollTop = offsetOpt.scrollHeight + 1;
              this.currentScrollTop = offsetOpt.scrollHeight;
            } else {
              this.currentScrollTop = this.scrollTop = offsetOpt.scrollHeight;
            }
            this.preScrollHeight = offsetOpt.scrollHeight;
          });
        })
      },
      handleKeyboardChange(height) {
        this.scrollToBottom();
      },
      handleMessageListScroll(e) {
        this.currentScrollTop = e.detail.scrollTop;
        // 滚动到未读消息的开头时，隐藏未读消息数量的提示
        if (this.unreadCount > 0) {
          if (this.currentScrollTop <= this.unreadStartBarPos + 10) {
            this.unreadCount = 0;
            this.unreadStartBarPos = 0;
          }
        }
      },
      handlePulling() {
        if (this.isRequesting || this.isCompleted) {
          return;
        }
        this.$store.dispatch("requestMessageList", this.currentConversation.conversationID);
      },
      onReceiveMessage(event) {
        let messageList = event.data || [];
        console.log("messageList receive:", messageList);
        messageList = this.handleMessageListBeforePush(messageList);
        this.$store.commit("pushCurrentMessageList", messageList);
        getTim().setMessageRead({ conversationID: this.currentConversation.conversationID });
        this.handleGroupNameUpate(messageList);
        this.scrollToBottom();
      },
      handleGroupNameUpate(messageList) {
        let updateNameMsgs = messageList.filter(msg => msg.type === TIM.TYPES.MSG_GRP_TIP && msg.payload.operationType === TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED);
        if (updateNameMsgs.length) {
          let msg = updateNameMsgs[updateNameMsgs.length - 1];
          let newName = msg.payload.newGroupProfile.introduction;
          uni.setNavigationBarTitle({
          　　title: newName
          });
        }
      },
      handleMessageListBeforePush(messageList) {
        if (this.type === this.CONV_TYPES.CUSTOMER) {
          //客服群中有客服时，智能客服的回复消息是有administrator发出的，需要转换
          messageList.forEach(msg => {
            if (msg.from === 'administrator' && msg.type === TIM.TYPES.MSG_CUSTOM) {
              msg.nick = "智能客服";
              msg.avatar = "https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/smart-service%402x.png";
            }
          })
        }
        return messageList;
      },
      handleMessageListClick() {
        uni.$emit("message-list-click");
      },
      requestGroupMembers() {
        if (this.currentConversation.type === TIM.TYPES.CONV_GROUP && 
          this.type !== this.CONV_TYPES.CUSTOMER) {
          let chatGroupId = 0;
          let currentConvId = this.currentConversation.conversationID;
          for(let i = 0; i < this.chatGroupList.length; i++) {
            let group = this.chatGroupList[i];
            if (currentConvId === "GROUP" + group.imGroupId) {
              chatGroupId = group.id;
              break;
            }
          }
          if (chatGroupId) {
            this.$store.dispatch("requestDBGroupMemberList", chatGroupId);
          }
        }
      },
      calcUnreadStartBarPos() {
        let msg = this.currentMessageList[this.currentMessageList.length - this.unreadCount];
        if (msg) {
          const query = uni.createSelectorQuery().in(this);
          let listBodyNodesRef = query.select("#listBody");
          let startBarNodeRef = query.select("#startBar" + msg.ID);
          if (listBodyNodesRef && startBarNodeRef) {
            listBodyNodesRef.boundingClientRect()
            startBarNodeRef.boundingClientRect().exec((arr) => {
              let [listRect, barRect] = arr;
              this.unreadStartBarPos = -(listRect.top - barRect.top);
              console.log("unread start bar position:", this.unreadStartBarPos);
            })
          }
        }
      },
      // 滚动到未读消息的开始处
      scrollToUnreadStart() {
        this.scrollTop = this.unreadStartBarPos;
        this.unreadCount = 0;
        this.unreadStartBarPos = 0;
      }
    }
  }
</script>

<style>
  .conversation-container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .conversation-container::before {
    content: " ";
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f4f4f4;
    transform: scaleY(0.5);
  }
  .bgWhite {
    background: #fff;
  }
  .message-list {
    flex: 1;
    overflow-y: auto;
  }
  .message-tags-time {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 40rpx 0 0;
  }
  .unread-msg-tip {
    position: fixed;
    background: #fff;
    right: 0;
    top: 14px;
    height: 38px;
    line-height: 38px;
    padding: 0 8px 0 12px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 30px 0px 0px 30px;
    color: #00C2B8;
    font-size: 13px;
  }
  
  .unread-msg-tip .tip-icon {
    display: inline-block;
    font-size: 18px;
    margin-right: 2px;
    vertical-align: -2px;
  }
  .unread-message-start-bar {
    width: 100%;
    height: 1rpx;
    background: transparent;
  }
  
  .video-player-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .video-player {
    width: 100%;
    height: 100%;
  }
  .video-close-btn{
    position: absolute;
    z-index: 1;
    right: 40rpx;
    top: 24rpx;
    color: #fff;
    width: 28px;
    height: 28px;
  }
  .loading-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 12px;
  }
  .loading-img {
    width: 20px;
    height: 20px;
  }
  .empty-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .empty-img {
    width: 248rpx;
    height: 248rpx;
  }
  .empty-tip {
    color: #999;
    margin-top: 24rpx;
    font-size: 13px;
  }
</style>
