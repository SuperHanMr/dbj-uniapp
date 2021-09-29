<template>
  <view 
    v-show="replyBoxShow"
    class="reply-container">
    <textarea
      v-model="replyContent"
      id="replyInput"
      :focus="replyInputFocus"
      :show-confirm-bar="false"
      :cursor-spacing="16"
      auto-height
      class="reply-send-input" 
      placeholder-class="reply-send-input-placeholder" 
      :placeholder="replyPlaceholder"
    />
    <view
      class="reply-send-btn"
      :class="{disabled: replyBtnDisabled}"
      @click="handleReplyMessage">发送</view>
  </view>
</template>

<script>
import { replyMessage } from "@/api/message.js"
export default {
  name: "ReplyBox",
  data() {
    return {
      replyContent: '',
      replyInputFocus: false,
      replyBoxShow: false,
      replyPlaceholder: '回复'
    }
  },
  computed: {
    replyBtnDisabled() {
      return !this.replyContent.trim();
    }
  },
  mounted() {
    uni.$on("show-reply-box", this.showReplyBox);
    this.$once("hook:beforeDestroy", () => {
      uni.$off("show-reply-box", this.showReplyBox);
    });
    uni.$on("message-list-click", this.hideReplyBox);
    this.$once("hook:beforeDestroy", () => {
      uni.$off("message-list-click", this.hideReplyBox);
    });
  },
  methods: {
    showReplyBox(payload) {
      let { userName } = payload;
      this.replyPlaceholder = "回复@" + userName;
      if (this.commentInfo) {
        if (!(this.commentInfo.businessId === payload.businessId &&
          this.commentInfo.businessType === payload.businessType &&
          this.commentInfo.isReply === payload.isReply &&
          this.commentInfo.replyId === payload.replyId)
        ) {
          // 如果不是同一个消息，则清空回复内容
          this.replyContent = "";
        }
      }
      this.commentInfo = payload;
      this.replyBoxShow = true;
      this.$nextTick(() => {
        this.replyInputFocus = true;
      });
    },
    hideReplyBox() {
      this.replyInputFocus = false;
      this.replyBoxShow = false;
    },
    handleReplyMessage() {
      let {
        userName,
        businessId,
        businessType,
        isReply,
        replyId,
      } = this.commentInfo;
      let params = {
        businessId: businessId, //业务id【必须】
        businessType: businessType, //业务类型 业务类型 1：案例 2：装修现场/个人首页【必须】
        content: this.replyContent.trim(),
        zeusAnonymous: 0 //是否匿名 0：不匿名 1：匿名
      }
      if (isReply) {
        params.replyId = replyId;
      }
      replyMessage(params).then(res => {
        this.replyContent = "";
        this.hideReplyBox();
        uni.showToast({
          title: "回复成功",
          icon: "success"
        });
      }).catch(err => {
        uni.showToast({
          title: err.message || "回复失败",
          icon: "error"
        });
      })
    }
  }
}
</script>

<style>
  .reply-container {
    display: flex;
    flex-flow: row nowrap;
    background: #fff;
    padding: 10px 10px 10px 16px;
    align-items: flex-end;
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
  }
  .reply-send-input-placeholder {
    color: #ccc;
    font-size: 14px;
  }
  .reply-send-btn {
    flex: none;
    font-size: 12px;
    padding: 0 20rpx;
    margin-left: 8rpx;
    margin-bottom: 16rpx;
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
