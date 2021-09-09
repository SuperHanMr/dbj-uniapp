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
      @click="handleMessageListClick"
     >
      <template v-for="(msg, idx) in currentMessageList">
        <div
          v-if="showTimeTag(msg, currentMessageList[idx - 1])"
          :key="msg.ID"
          class="message-tags-time"
        >{{ formatMessageTime(msg.time) }}</div>
        <message-item  :message="msg"></message-item>
      </template>
    </scroll-view>
    <message-send-box></message-send-box>
  </view>
</template>

<script>
  import { getTim, addListener, removeListener } from "@/utils/tim.js"
  import MessageSendBox from "./message-send-box.vue"
  import MessageItem from "./message-element/message-item.vue"
  import { mapState } from "vuex";
  import { calendarFormat } from "@/utils/date.js"
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
        refresherTriggered: false,
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
      this.getMessageListOffsetTask = {
        executor: null,
        callback: null
      };
      this.getMessageListRectTask = {
        executor: null,
        callback: null
      };
      uni.$on("scroll-to-bottom", this.scrollToBottom);
      this.$once("hook:beforeDestroy", () => {
        uni.$off("scroll-to-bottom", this.scrollToBottom);
      })
      const query = uni.createSelectorQuery().in(this);
      this.messageListNodesRef = query.select("#messageList");
      this.getMessageListRect((options) => {
        this.clientHeight = options.height;
      });
      addListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      this.$once("hook:beforeDestroy", () => {
        removeListener("MESSAGE_RECEIVED", this.onReceiveMessage);
      })
    },
    beforeDestroy() {
      this.getMessageListOffsetTask.executor = null;
      this.getMessageListOffsetTask.callback = null;
      this.getMessageListRectTask.executor = null;
      this.getMessageListRectTask.callback = null;
      this.messageListNodesRef = null;
    },
    onLoad(options) {
      this.$store.dispatch("checkoutConversation", options.id).then(() => {
        uni.setNavigationBarTitle({
        　　title: this.name
        });
      });
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
      //封装改方法，是因为每次调用scrollOffset时，会把参数中的函数放到执行队列中，
      //导致回调函数被执行多次
      getMessageListOffset(cb) {
        this.getMessageListOffsetTask.callback = cb;
        if (!this.getMessageListOffsetTask.executor) {
          this.getMessageListOffsetTask.executor = this.messageListNodesRef.scrollOffset((options) => {
            console.log("get offset executor", this.getMessageListOffsetTask.executor);
            this.getMessageListOffsetTask.callback(options)
          });
        }
        this.getMessageListOffsetTask.executor.exec();
      },
      getMessageListRect(cb) {
        this.getMessageListRectTask.callback = cb;
        if (!this.getMessageListRectTask.executor) {
          this.getMessageListRectTask.executor = this.messageListNodesRef.scrollOffset((options) => {
            this.getMessageListRectTask.callback(options)
          });
        }
        this.getMessageListRectTask.executor.exec();
      },
      keepOnBottom() {
        // 距离底部20px内强制滚到底部,否则提示有新消息
        if (this.preScrollHeight - this.clientHeight - this.currentScrollTop < 20) {
          this.$nextTick(() => {
            this.getMessageListOffset((options) => {
              if (options.scrollHeight === this.scrollTop) {
                // 这样处理是因为当scrollTop的值无变化时，就不会触发元素的滚动
                this.scrollTop = options.scrollHeight + 1;
                this.currentScrollTop = options.scrollHeight;
              } else {
                this.currentScrollTop = this.scrollTop = options.scrollHeight;
              }
              this.preScrollHeight = options.scrollHeight;
            });
          })
        } else {
          this.getMessageListOffset((options) => {
            this.preScrollHeight = options.scrollHeight;
          });
        }
      },
      // 保持当前位置
      keepCurrentPosition() {
        let prevScrollBottom = this.preScrollHeight - this.currentScrollTop;
        this.$nextTick(() => {
          this.getMessageListOffset((options) => {
            this.currentScrollTop = this.scrollTop = options.scrollHeight - prevScrollBottom - 50;
            this.preScrollHeight = options.scrollHeight;
          });
        })
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.getMessageListOffset((options) => {
            if (options.scrollHeight === this.scrollTop) {
              // 这样处理是因为当scrollTop的值无变化时，就不会触发元素的滚动
              this.scrollTop = options.scrollHeight + 1;
              this.currentScrollTop = options.scrollHeight;
            } else {
              this.currentScrollTop = this.scrollTop = options.scrollHeight;
            }
            this.preScrollHeight = options.scrollHeight;
          });
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
      },
      handleMessageListClick() {
        uni.$emit("message-list-click");
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
  .message-tags-time {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 40rpx 0;
  }
</style>
