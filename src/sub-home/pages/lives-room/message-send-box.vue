<template>
  <view 
    v-show="replyBoxShow"
    class="message-send-box"
    @click.stop="handleBoxClick"
    >
    <cover-view class="box-cover" @click.stop="handleBoxClick"></cover-view>
    <textarea
      v-model="replyContent"
      id="replyInput"
      :focus="replyInputFocus"
      :show-confirm-bar="false"
      :cursor-spacing="16"
      auto-height
      class="reply-send-input" 
      placeholder-class="reply-send-input-placeholder" 
      placeholder="说的什么..."
      @keyboardheightchange="handleKeyboardShow"
    />
    <cover-view
      class="reply-send-btn"
      :class="{disabled: replyBtnDisabled}"
      :style="{bottom: btnBottom + 'px'}"
      @click="sendTextMessage">发送</cover-view>
  </view>
</template>

<script>
import TIM from 'tim-wx-sdk';
import {
  getTim
} from "../../../utils/tim.js"
export default {
  name: "MessageSendBoxForLive",
  props: {
    groupId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      replyContent: '',
      replyInputFocus: false,
      replyBoxShow: false,
      keyboardHeight: 0,
    }
  },
  computed: {
    replyBtnDisabled() {
      return !this.replyContent.trim();
    },
    btnBottom() {
      return this.keyboardHeight + 18;
    }
  },
  mounted() {
    uni.$on("show-live-send-box", this.showReplyBox);
    this.$once("hook:beforeDestroy", () => {
      uni.$off("show-live-send-box", this.showReplyBox);
    });
    uni.$on("live-room-click", this.hideReplyBox);
    this.$once("hook:beforeDestroy", () => {
      uni.$off("live-room-click", this.hideReplyBox);
    });
  },
  methods: {
    showReplyBox(payload) {
      this.replyBoxShow = true;
      this.$nextTick(() => {
        this.replyInputFocus = true;
      });
    },
    hideReplyBox() {
      this.replyInputFocus = false;
      this.replyBoxShow = false;
    },
    handleBoxClick(e) {
    },
    handleKeyboardShow(e) {
      const { height } = e.detail || {};
      this.keyboardHeight = height || 0;
      if (height > 0) {
        
      } else {
        this.hideReplyBox();
      }
    },
    sendTextMessage() {
      const message = getTim().createTextMessage({
        to: this.groupId,
        conversationType: TIM.TYPES.CONV_GROUP,
        payload: { text: this.replyContent },
      });
      this.$emit("add-message", message);
      getTim().sendMessage(message).then(() => {
        this.replyContent = "";
        this.hideReplyBox();
      }).catch((err) => {
        console.error("发送消息失败：", err);
      });
    },
  }
}
</script>

<style>
  .message-send-box {
    display: flex;
    flex-flow: row nowrap;
    background: #fff;
    padding: 10px 10px 10px 16px;
    align-items: flex-end;
    position: relative;
  }
  .box-cover {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
  .reply-send-input {
    flex: 1;
    box-sizing: content-box;
    background: #f5f5f5;
    flex: 1;
    border-radius: 38rpx;
    padding: 20rpx 32rpx;
    font-size: 14px;
    color: #111;
    max-height: 180rpx;
    margin-right: 48px;
  }
  .reply-send-input-placeholder {
    color: #ccc;
    font-size: 14px;
  }
  .reply-send-btn {
    position: absolute;
    z-index: 2;
    right: 8px;
    bottom: 18px;
    flex: none;
    font-size: 12px;
    padding: 0 20rpx;
    height: 22px;
    line-height: 22px;
    background: #35C4C4;
    color: #fff;
    border-radius: 11px;
  }
  .reply-send-btn.disabled {
    color: #999;
    background: #fff;
  }
</style>
