<template>
  <view class="comment-and-reply-element">
    <view class="comment-avatar">
      <image class="avatar" :src="avatar" mode="aspectFill"></image>
    </view>
    <view class="comment-body">
      <view class="comment-main">
        <view class="comment-left">
          <view class="comment-author">
            柚子
          </view>
          <view class="comment-content">
            回复了您的评论
          </view>
          <view class="comment-time">
            30分钟前
          </view>
        </view>
        <view class="comment-right">
          <image class="content-image" :src="avatar" mode="aspectFill"></image>
        </view>
      </view>
      <view class="reply-body">
        <view class="reply-content">
          设计风格很喜欢，爱了设计风格很喜欢，爱
        </view>
        <view class="reply-btn">
          <view class="icon-face reply-btn-icon"></view>
          回复
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "CommentAndReplyElement",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      avatar: "http://iph.href.lu/100x100"
    }
  }
}
</script>

<style>
.comment-and-reply-element {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  padding-top: 32rpx;
  background: #fff;
}
.comment-avatar {
  margin: 0 16rpx 0 32rpx;
  flex: none;
}
.comment-avatar .avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
}
.comment-body {
  flex: 1;
  padding-right: 32rpx;
  padding-bottom: 32rpx;
  border-bottom: 1px solid #f5f5f5;
  overflow: hidden;
}
.comment-main {
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.comment-left {
  flex: 1;
  overflow: hidden;
  margin-right: 12rpx;
}
.comment-right {
  flex: none;
}
.comment-author {
  font-size: 16px;
  line-height: 24px;
  color: #999;
}
.comment-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  font-size: 14px;
  line-height: 18px;
  margin-top: 2px;
}
.comment-time {
  font-size: 10px;
  line-height: 12px;
  color: #aaa;
  margin-top: 6px;
}
.content-image {
  width: 112rpx;
  height: 112rpx;
  border-radius: 8px;
}
.reply-body {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 16rpx 16rpx 24rpx 24rpx;
  margin-top: 24rpx;
}
.reply-content {
  font-size: 14px;
  color: #333;
  line-height: 20px;
}
.reply-btn {
  margin-top: 24rpx;
  color: #35c4c4;
  font-size: 13px;
  line-height: 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.reply-btn-icon {
  margin-right: 10rpx;
}
</style>
