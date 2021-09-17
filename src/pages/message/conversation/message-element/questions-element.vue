<template>
  <message-bubble :message="message" class="questions-message">
    <view class="questions-element">
      <view class="questions-title">
        猜你想要
      </view>
      <view class="question-list">
        <view class="question-item">
          <view class="question-item__text">
            业务问答1（内容暂无）
          </view>
          <view class="question-item__icon icon-face"></view>
        </view>
        <view class="question-item">
          <view class="question-item__text">
            业务问答1（内容暂无）
          </view>
          <view class="question-item__icon icon-face"></view>
        </view>
        <view class="question-item">
          <view class="question-item__text">
            业务问答1（内容暂无）
          </view>
          <view class="question-item__icon icon-face"></view>
        </view>
        <view class="question-item">
          <view class="question-item__text">
            业务问答1（内容暂无）
          </view>
          <view class="question-item__icon icon-face"></view>
        </view>
        <view class="question-item">
          <view class="question-item__text">
            业务问答1（内容暂无）
          </view>
          <view class="question-item__icon icon-face"></view>
        </view>
      </view>
    </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";

export default {
  name: "TextElement",
  components: {
    MessageBubble,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    payload() {
      if (!this.message) {
        return {};
      }
      return this.message.payload;
    },
  },
  methods: {
  },
};
</script>

<style>
.questions-element {
  
}
.questions-title {
  color: #111;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24rpx;
}
.question-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 448rpx;
  background: #f9f9f9;
  border-radius: 4px;
  padding: 16rpx 16rpx 16rpx 32rpx;
  box-sizing: border-box;
}
.question-item + .question-item {
  margin-top: 24rpx;
}
.question-item__text {
  flex: 1;
  color: #35C4C4;
  font-size: 14px;
  line-height: 20px;
  margin-right: 16rpx;
}
.question-item__icon {
  flex: none;
  color: #666;
  font-size: 16px;
}
</style>
