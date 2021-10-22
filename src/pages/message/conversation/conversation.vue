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
      <template v-if="currentMessageList.length">
        <view v-if="type === CONV_TYPES.COMMON || type === CONV_TYPES.CUSTOMER" id="listBody" class="message-list-body">
          <template v-for="(msg, idx) in currentMessageList">
            <view
              v-if="showTimeTag(msg, currentMessageList[idx - 1])"
              :key="msg.ID"
              class="message-tags-time"
            >{{ formatMessageTime(msg.time) }}</view>
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
        loaded: false
      }
    },
    computed: {
      ...mapState({
        CONV_TYPES: (state) => state.message.CONV_TYPES,
        cstServConv: (state) => state.message.cstServConv,
        currentConversation: (state) => state.message.currentConversation,
        currentMessageList: (state) => state.message.currentMessageList,
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
      setTimeout(() => {
        this.listBodyNodesRef = query.select("#listBody");
        this.listBodyRectTask = this.listBodyNodesRef.boundingClientRect();
      }, 200);
      this.messageListRectTask.exec((arr) => {
        console.log(arr, 11111);
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
      
      this.listBodyRectTask = null;
      this.listBodyNodesRef = null;
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
        this.$store.dispatch("checkoutConversation", options.id).then(res => {
          this.loaded = true;
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
      showTimeTag(message, prevMessage) {
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
      handleMessageListClick() {
        uni.$emit("message-list-click");
      },
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
