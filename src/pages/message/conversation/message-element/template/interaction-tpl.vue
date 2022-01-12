<template>
  <view class="comment-and-reply-element">
    <view class="comment-avatar">
      <image class="avatar" :src="userAvatar" mode="aspectFill"></image>
    </view>
    <view class="comment-body">
      <view class="comment-main">
        <view class="comment-left">
          <view class="comment-user-name">
            {{ userName }}
          </view>
          <view class="comment-content">
            {{ content }}
          </view>
          <view class="comment-time">
            {{ formatMessageTime(message.time) }}
          </view>
        </view>
        <view v-if="thumbnail" class="comment-right">
          <image class="content-image" :src="thumbnail" mode="aspectFill"></image>
          <image v-if="isVideo" class="play-icon" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_play%402x.png" />
        </view>
      </view>
      <view v-if="comment" class="reply-body">
        <view class="reply-content">
          {{ comment }}
        </view>
        <view class="reply-btn" @click.stop="handleReply">
          <view class="icon-huifuic reply-btn-icon"></view>
          回复
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { calendarFormat } from "@/utils/date.js";
import { compileTemplateStr as compile } from "@/utils/util.js";
export default {
  name: "InteractionTemplate",
  props: {
    template: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    data() {
      return this.message.payloadData.params || {};
    },
    userAvatar() {
      return compile(this.template.body.userAvatar)(this.data);
    },
    userName() {
      return compile(this.template.body.userName)(this.data);
    },
    content() {
      return compile(this.template.body.content)(this.data);
    },
    thumbnail() {
      return compile(this.template.body.thumbnail)(this.data);
    },
    isVideo() {
      return compile(this.template.body.isVideo)(this.data) == "true";
    },
    comment() {
      return compile(this.template.body.comment)(this.data);
    },
    businessId() {
      return +compile(this.template.body.businessId)(this.data);
    },
    businessType() {
      return +compile(this.template.body.businessType)(this.data);
    },
    isReply() {
      return compile(this.template.body.isReply)(this.data) == "true";
    },
    replyId() {
      return +compile(this.template.body.replyId)(this.data);
    },
  },
  methods: {
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
    handleReply() {
      uni.$emit("show-reply-box", {
        userName: this.userName,
        businessId: this.businessId,
        businessType: this.businessType,
        isReply: this.isReply,
        replyId: this.replyId,
      });
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
  width: 112rpx;
  height: 112rpx;
  position: relative;
}
.comment-user-name {
  font-size: 16px;
  line-height: 24px;
  color: #111;
  font-weight: bold;
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
.play-icon {
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  top: 50%;
  left: 50%;
  margin-top: -24rpx;
  margin-left: -24rpx;
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
  color: #FA462A;
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
