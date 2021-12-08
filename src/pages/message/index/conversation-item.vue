<template>
  <view class="im-message-item" @click="handleClick">
    <view class="im-message-avatar">
      <image 
        v-if="conversation.systemType === CONV_TYPES.CUSTOMER" 
        class="im-avatar-image" 
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_customer_service@2x.png">
      </image>
      <image
        v-else-if="conversation.systemType === CONV_TYPES.SYSTEM" 
        class="im-avatar-image" 
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_system@2x.png">
      </image>
      <image
        v-else-if="conversation.systemType === CONV_TYPES.INTERACTION" 
        class="im-avatar-image" 
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_interaction@2x.png">
      </image>
      <group-avatars v-else :list="avatar" />
    </view>
    <view class="im-message-content">
      <view class="im-message-name">
        {{ name }}
      </view>
      <view v-if="message" class="im-message-msg">
        <text v-if="hasAtMeMsg" class="remind">[有人@我]</text>{{ message }}
      </view>
    </view>
    <view class="im-message-info">
      <view v-if="message" class="im-message-time">
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
  import MessageTemplate from "@/utils/message-template.json";
  import InteractionTemplate from "@/utils/interaction_tpl.json";
  import { calendarFormat } from "@/utils/date.js"
  import { compileTemplateStr as compile } from "@/utils/util.js";
  import GroupAvatars from "@/components/group-avatars/group-avatars.vue"
  import { mapState } from "vuex"
  const atUserReg = /@(.+?)\[(zeus_\d+)\]/g;
  export default {
    name: "ConversationItem",
    props: ["conversation"],
    components: {
      GroupAvatars
    },
    computed: {
      ...mapState({
        CONV_TYPES: (state) => state.message.CONV_TYPES,
        groupMembersMap: (state) => state.message.groupMembersMap
      }),
      toAccount() {
        return this.conversation.conversationID.replace(this.conversation.type, '');
      },
      hasAtMeMsg() {
        return !!(this.conversation.groupAtInfoList && this.conversation.groupAtInfoList.length)
      },
      name() {
        if (this.conversation.systemType) {
          return this.conversation.name;
        }
        if (this.conversation.type === TIM.TYPES.CONV_C2C) {
          return this.conversation.userProfile.nick || this.conversation.userProfile.userID;
        }
        if (this.conversation.type === TIM.TYPES.CONV_GROUP) {
          if (this.conversation.groupProfile && this.conversation.groupProfile.introduction) {
            return this.conversation.groupProfile.introduction;
          }
          if (this.conversation.groupDB) {
            return this.conversation.groupDB.introduction;
          }
          return this.conversation.groupProfile.groupID;
        }
        return this.toAccount;
      },
      avatar() {
        if (this.conversation.systemType) {
          return [];
        }
        if (this.conversation.type === TIM.TYPES.CONV_C2C) {
          return [this.conversation.userProfile.avatar];
        }
        if (this.conversation.type === TIM.TYPES.CONV_GROUP) {
          const memberList = this.groupMembersMap[this.toAccount];
          return (memberList || []).map(m => m.avatar);
        }
        return [];
      },
      message() {
        let message = this.conversation.lastMessage;
        if (message) {
          if (message.type === TIM.TYPES.MSG_TEXT) {
            return message.messageForShow.replace(atUserReg, "@$1 ");
          } else if (message.type === TIM.TYPES.MSG_CUSTOM) {
            try {
              let payloadData = JSON.parse(message.payload.data);
              if (payloadData.type === "img_message") {
                return "[图片]"
              }
              if (payloadData.type === "video_message") {
                return "[视频]"
              }
              if (payloadData.type === "file_message") {
                return "[文件]"
              }
              let template = MessageTemplate[payloadData.type] || InteractionTemplate[payloadData.type];
              if (template && template.summary) {
                return compile(template.summary)(payloadData.params || {});
              }
              return "[不支持的消息类型]"
            } catch (e) {
              console.error(e);
            }
          }
          return message.messageForShow;
        }
        if (this.conversation.systemType === this.CONV_TYPES.CUSTOMER) {
          return "您有问题可在此咨询在线客服";
        }
        if (this.conversation.systemType === this.CONV_TYPES.SYSTEM) {
          return "暂无服务通知";
        }
        if (this.conversation.systemType === this.CONV_TYPES.INTERACTION) {
          return "暂无互动消息";
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
        if (this.conversation.systemType === this.CONV_TYPES.INTERACTION) {
          uni.navigateTo({
            url: "/pages/message/conversation/conversation-interaction"
          });
        } else {
          let convId = this.conversation.conversationID;
          uni.navigateTo({
            url: "/pages/message/conversation/conversation?id=" + convId + "&name=" + this.name,
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
  .im-message-item:active {
    background-color: #fafafa;
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
  .remind {
    color: #FA4D32;
    margin-right: 4px;
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
