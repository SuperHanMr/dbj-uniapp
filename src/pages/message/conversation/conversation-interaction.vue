<template>
  <view class="conversation-interaction-container">
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
      @scrolltolower="handlePulling"
      @click="handleMessageListClick"
    >
      <view v-if="messageListReverse.length" id="listBody" class="message-list-body" style="">
        <message-item-interaction
          v-for="(msg, idx) in messageListReverse"
          :key="msg.ID" 
          :message="msg"
        ></message-item-interaction>
      </view>
      <view v-else-if="loaded" class="empty-container">
        <image class="empty-img" src="https://ali-image-test.dabanjia.com/image/20220110/16/1641804745453_9800%24img_sys_NoSystemmessage.png"></image>
        <view class="empty-tip">
          暂无互动消息~
        </view>
      </view>
    </scroll-view>
    <reply-box />
  </view>
</template>

<script>
  import { getTim, addListener, removeListener } from "@/utils/tim.js"
  import ReplyBox from "./reply-box.vue"
  import MessageItemInteraction from "./message-element/message-item-interaction.vue"
  import { mapState } from "vuex";
  import { calendarFormat } from "@/utils/date.js"
  import TIM from 'tim-wx-sdk'

  export default {
    components: {
      ReplyBox,
      MessageItemInteraction,
    },
    data() {
      return {
        scrollTop: 0,
        currentScrollTop: 0,
        loaded: false
      }
    },
    computed: {
      ...mapState({
        itaConv: (state) => state.message.itaConv,
        currentConversation: (state) => state.message.currentConversation,
        currentMessageList: (state) => state.message.currentMessageList,
        isCompleted: (state) => state.message.isCompleted,
        isRequesting: (state) => state.message.isRequesting,
      }),
      messageListReverse() {
        return [...this.currentMessageList].reverse();
      }
    },
    mounted() {
      addListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      this.$once("hook:beforeDestroy", () => {
        removeListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      })
    },
    onLoad() {
      uni.setNavigationBarTitle({
      　　title: this.itaConv.name
      });
      this.$store.dispatch("checkoutConversation", this.itaConv.conversationID).then(res => {
        this.loaded = true;
      })
    },
    onUnload() {
      this.$store.commit("resetConversation");
    },
    methods: {
      keepOnTop() {
        if (this.scrollTop === 0 && this.currentScrollTop !== 0) {
          this.scrollTop = -1;
        } else {
          this.currentScrollTop = this.scrollTop = 0;
        }
      },
      handleKeyboardChange(height) {
        this.keepOnTop();
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
        this.keepOnTop();
      },
      handleMessageListClick() {
        uni.$emit("message-list-click");
      },
    }
  }
</script>

<style>
  .conversation-interaction-container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #fff;
  }
  .conversation-interaction-container::before {
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
  .message-list {
    flex: 1;
    overflow-y: auto;
  }
  .message-list-body {
    padding-bottom: 48rpx; 
    background: #fff;
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
    color: #CBCCCC;
    margin-top: 24rpx;
    font-size: 12px;
  }
</style>
