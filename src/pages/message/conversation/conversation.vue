<template>
  <view class="conversation-container">
    <scroll-view
      :scroll-top="scrollTop"
      :scroll-y="true"
      :refresher-enabled="true"
      :scroll-with-animation="true"
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
        currentScrollTop: 0
      }
    },
    computed: {
      ...mapState({
        currentConversation: (state) => state.message.currentConversation,
        currentMessageList: (state) => state.message.currentMessageList,
      })
    },
    watch: {
      currentMessageList(list, oldList) {
        if (list.length) {
          if (oldList.length) {
            this.keepOnBottom();
          } else {
            this.scrollToBottom();
          }
        }
      }
    },
    mounted() {
      uni.setNavigationBarTitle({
      　　title: this.currentConversation.conversationID
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
        this.$store.dispatch("requestMessageList", this.currentConversation.conversationID);
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
