<template>
  <view class="im-message-item" @click="handleClick">
    <view class="im-message-avatar">
      <slot name="avatar">
        <group-avatars :list="avatar" />
      </slot>
    </view>
    <view class="im-message-content">
      <view class="im-message-name">
        {{ name }}
      </view>
      <view v-if="message" class="im-message-msg">
        {{ message }}
      </view>
    </view>
    <view class="im-message-info">
      <view class="im-message-time">
        {{ time }}
      </view>
      <view v-if="conversation.unreadCount > 0" class="unread-count">
        {{ conversation.unreadCount }}
      </view>
    </view>
  </view>
</template>

<script>
  import TIM from 'tim-wx-sdk'
  import { calendarFormat } from "@/utils/date.js"
  import GroupAvatars from "@/components/group-avatars/group-avatars.vue"
  export default {
    name: "ConversationItem",
    props: ["conversation"],
    components: {
      GroupAvatars
    },
    computed: {
      name() {
        if (this.conversation.type === "NOTIFICATION") {
          return this.conversation.name;
        }
        if (this.conversation.type === TIM.TYPES.CONV_C2C) {
          return this.conversation.userProfile.nick || this.conversation.userProfile.userID;
        }
        if (this.conversation.type === TIM.TYPES.CONV_GROUP) {
          return this.conversation.groupProfile.name || this.conversation.groupProfile.groupID;
        }
        return this.conversation.toAccount;
      },
      avatar() {
        if (this.conversation.type === TIM.TYPES.CONV_C2C) {
          return [this.conversation.userProfile.avatar];
        }
        return ["http://iph.href.lu/100x100", "http://iph.href.lu/100x100"];
      },
      message() {
        if (this.conversation.lastMessage) {
          let message = this.conversation.lastMessage;
          if (message && message.type === TIM.TYPES.MSG_CUSTOM) {
            try {
              let payloadData = JSON.parse(message.payload.data);
              if (payloadData.type === "img_message") {
                return "[图片]"
              }
              if (payloadData.type === "video_message") {
                return "[视频]"
              }
            } catch (e) {
              console.error(e);
            }
          }
          return this.conversation.lastMessage.messageForShow;
        }
        return "";
      },
      time() {
        if (this.conversation.lastMessage) {
          var time = this.conversation.lastMessage.lastTime;
          return calendarFormat(time*1000, {
            sameDay: 'HH:mm',
            nextDay: '[明天] HH:mm',
            lastDay: '[昨天]',
            last2Day: '[前天]',
            sameYear: 'MM-DD',
            sameElse: 'YYYY/MM/DD'
          });
        }
        return "";
      }
    },
    methods: {
      handleClick() {
        let convId = this.conversation.conversationID;
        if (this.conversation.type === "NOTIFICATION") {
          uni.navigateTo({
            url: "/pages/message/conversation/conversation-noti?id=" + convId,
          });
        } else {
          uni.navigateTo({
            url: "/pages/message/conversation/conversation?id=" + convId,
          });
        }
      }
    }
  }
</script>

<style>
  .im-message-item {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: 24rpx 32rpx;
    align-items: center;
    box-sizing: border-box;
    position: relative;
  }
  
  .im-message-avatar,
  .im-message-avatar .avatar-image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 6px;
  }
  
  .im-message-avatar {
    margin-right: 24rpx;
  }
  
  .im-message-content {
    flex: 1;
    margin-right: 148rpx;
    height: 100rpx;
    box-sizing: border-box;
    padding-top: 12rpx;
    overflow: hidden;
  }
  
  .im-message-name {
    line-height: 44rpx;
    font-size: 16px;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .im-message-msg {
    margin-top: 4rpx;
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .im-message-info {
    position: absolute;
    right: 32rpx;
    top: 24rpx;
    height: 100rpx;
    padding-top: 16rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    justify-content: top;
    line-height: 28rpx;
    box-sizing: border-box;
  }
  
  .im-message-time {
    font-size: 10px;
    color: #bbb;
  }
  
  .unread-count {
    margin-top: 12rpx;
    height: 32rpx;
    min-width: 32rpx;
    line-height: 32rpx;
    background: #ff3b30;
    border-radius: 16rpx;
    padding: 0 6rpx;
    font-size: 12px;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }
</style>
