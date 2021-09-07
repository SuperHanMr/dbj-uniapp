<template>
  <view class="conversation-container">
    <scroll-view
      :scroll-top="scrollTop"
      :scroll-y="true"
      :refresher-enabled="refresherEnabled"
      :refresher-triggered="refresherTriggered"
      :scroll-with-animation="false"
      id="messageList"
     class="message-list"
     @scroll="handleMessageListScroll"
     @refresherrefresh="handlePulling"
     >
      <message-item v-for="msg in currentMessageList" :key="msg.ID" :message="msg"></message-item>
    </scroll-view>
    <message-send-box></message-send-box>
  </view>
</template>

<script>
  import { getTim, addListener, removeListener } from "@/utils/tim.js"
  import MessageSendBox from "./message-send-box.vue"
  import MessageItem from "./message-element/message-item.vue"
  import { mapState } from "vuex";
  import TIM from 'tim-wx-sdk'
  export default {
    components: {
      MessageSendBox,
      MessageItem,
    },
    data() {
      return {
        clientHeight: 0,
        preScrollHeight: 0,
        scrollTop: 0,
        currentScrollTop: 0,
        refresherEnabled: true,
        refresherTriggered: false
      }
    },
    computed: {
      ...mapState({
        currentConversation: (state) => state.message.currentConversation,
        currentMessageList: (state) => state.message.currentMessageList,
        isCompleted: (state) => state.message.isCompleted,
        isRequesting: (state) => state.message.isRequesting,
        isAppendMessageList: (state) => state.message.isAppendMessageList
      }),
      name() {
        if (this.currentConversation.type === TIM.TYPES.CONV_C2C) {
          return this.currentConversation.userProfile.nick || this.currentConversation.userProfile.userID;
        }
        if (this.currentConversation.type === TIM.TYPES.CONV_GROUP) {
          return this.currentConversation.groupProfile.name || this.currentConversation.groupProfile.groupID;
        }
        return this.currentConversation.conversationID;
      },
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
      isCompleted(val) {
        this.refresherEnabled = !val;
      }
    },
    mounted() {
      uni.setNavigationBarTitle({
      　　title: this.name
      });
      const query = uni.createSelectorQuery().in(this);
      this.messageListNodesRef = query.select("#messageList");
      this.messageListNodesRef.boundingClientRect((options) => {
        this.clientHeight = options.height;
      }).exec();
      addListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      this.$once("hook:beforeDestroy", () => {
        removeListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      })
    },
    onLoad(options) {
      this.$store.dispatch("checkoutConversation", options.id);
    },
    onUnload() {
      this.$store.commit("resetConversation");
    },
    methods: {
      keepOnBottom() {
        // 距离底部20px内强制滚到底部,否则提示有新消息
        if (this.preScrollHeight - this.clientHeight - this.currentScrollTop < 20) {
          this.$nextTick(() => {
            this.messageListNodesRef.scrollOffset((options) => {
              this.currentScrollTop = this.scrollTop = options.scrollHeight;
              this.preScrollHeight = options.scrollHeight;
            }).exec();
          })
        } else {
          this.messageListNodesRef.scrollOffset((options) => {
            this.preScrollHeight = options.scrollHeight;
          }).exec();          
        }
      },
      // 保持当前位置
      keepCurrentPosition() {
        let prevScrollBottom = this.preScrollHeight - this.currentScrollTop;
        this.$nextTick(() => {
          this.messageListNodesRef.scrollOffset((options) => {
            this.currentScrollTop = this.scrollTop = options.scrollHeight - prevScrollBottom - 50;
            this.preScrollHeight = options.scrollHeight;
          }).exec();
        })
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.messageListNodesRef.scrollOffset((options) => {
            this.currentScrollTop = this.scrollTop = options.scrollHeight;
            this.preScrollHeight = options.scrollHeight;
          }).exec();
        })
      },
      handleMessageListScroll(e) {
        this.currentScrollTop = e.detail.scrollTop;
      },
      handlePulling() {
        if (this.isRequesting) {
          return;
        }
        this.$store.dispatch("requestMessageList", this.currentConversation.conversationID).then(() => {
          this.refresherTriggered = true;
        })
      },
      onReceiveMessage(event) {
        let messageList = event.data || [];
        console.log("messageList receive:", messageList);
        this.$store.commit("pushCurrentMessageList", messageList);
        getTim().setMessageRead({ conversationID: this.currentConversation.conversationID });
      }
    }
  }
</script>

<style>
  .conversation-container {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    overflow: hidden;
  }
  .message-list {
    flex: 1;
    overflow-y: auto;
  }
</style>
