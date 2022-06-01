<template>
  <view>
    <view
      class="product-box"
      :class="{
        'message-send': isMine,
      }"
    >
      <view class="message-bubble-avatar">
        <image class="avatar" :src="avatar" mode="aspectFill"></image>
      </view>
      <view class="message-body">
        <text class="name-text" v-if="!isMine">{{message.nick}}</text>
        <view class="message-box">
          <view class="message-title">服务消息确认</view>
          <view class="message-content-box">
            <view class="message-content" v-for="(item, index) in messageItem" :key="'text'+messageInfo.id+index"><text>{{item}}</text></view>
            <button class="detail-btn" @click="showDialogOperate">查看详情</button>
          </view>
          <view class="message-status">
            <image v-if="messageInfo.state == 0" src="../../../../static/message-wait.png" class="message-icon"></image>
            <image v-if="messageInfo.state == 1" src="../../../../static/message-agree.png" class="message-icon"></image>
            <image v-if="messageInfo.state == 2" src="../../../../static/message-refuse.png" class="message-icon"></image>
            <text
              class="message-text"
              :class="messageInfo.state == 0 ? 'message-wait' : messageInfo.state == 1 ? 'message-agree' : messageInfo.state == 2 ? 'message-refuse' : ''"
            >
              {{messageInfo.state == 0 ? '待确认' : messageInfo.state == 1 ? '已同意' : messageInfo.state == 2 ? '已拒绝' : ''}}
            </text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="showDialog" class="message-dialog">
      <view class="dialog-title">
        <view class="dialog-title-text">温馨提示</view>
        <image class="dialog-title-img" src="../../../../static/close.png" @click="closeDialogOperate"></image>
      </view>
      <view class="dialog-content">
        <view class="message-content-box">
          <view class="message-content" v-for="(item, index) in messageItem" :key="'dialog'+messageInfo.id"><text>{{item}}</text></view>
          <text class="message-code">服务单编号：{{messageInfo.serveNo}}</text>
        </view>
        <view class="dialog-state-box">
          <button class="state-btn state-refuse" v-if="messageInfo.state == 0" @click="refuseOperate">拒绝</button>
          <button class="state-btn state-agree" v-if="messageInfo.state == 0" @click="agreeOperate">同意</button>
          <view class="dialog-state dialog-state-agree" v-if="messageInfo.state == 1">已同意</view>
          <view class="dialog-state dialog-state-refuse" v-if="messageInfo.state == 2">已拒绝</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MessageBubble from "./message-bubble";
import { designAgreedMsg, designRejectedMsg, getMessageState } from "@/api/message.js";
export default {
  name: "productTemplate",
  components: {},
  props: {
    message: {
      type: Object,
      required: true,
    },
    hasDialog: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      showDialog: false,
    }
  },
  computed: {
    isMine() {
      return this.message.flow === "out";
    },
    avatar() {
      return this.message.avatar || "https://ali-image.dabanjia.com/static/mp/dabanjia/images/avatar-default.png";
    },
    messageInfo() {
      return this.message.payloadData.params;
    },
    messageItem() {
      this.messageInfo.content.replace(/↵/g, '\n');
      return this.messageInfo.content.split('\n');
    }
  },
  watch: {
    message: {
      handler(data) {
        if (data.payloadData.params.state != 1 && data.payloadData.params.state != 2) {
          this.changeState();
        }
      },
      deep:true,
      immediate: true
    }
  },
  methods: {
    agreeOperate() {
      let that = this;
      designAgreedMsg({
        serveId: that.messageInfo.serveId,
        id: that.messageInfo.id
      }).then(res => {
        that.showDialog = false;
        that.$set(that.message.payloadData.params, 'state', 1);
      })
    },
    refuseOperate() {
      let that = this;
      designRejectedMsg({
        serveId: that.messageInfo.serveId,
        id: that.messageInfo.id
      }).then(res => {
        that.showDialog = false;
        that.$set(that.message.payloadData.params, 'state', 2);
      })
    },
    changeState() {
      getMessageState(this.messageInfo.id).then(res => {
        this.$set(this.message.payloadData.params, 'state', res.state);
        this.$forceUpdate();
      })
    },
    showDialogOperate() {
      if (!this.hasDialog) {
        this.showDialog = true;
        this.$emit("change", true);
      }
    },
    closeDialogOperate() {
      this.showDialog = false;
      this.$emit("change", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-box {
  display: flex;
  align-items: flex-start;
  padding: 24rpx 128rpx 24rpx 32rpx;
  .message-bubble-avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 6rpx;
    .avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 6px;
    }
  }
  .message-body {
    width: 510rpx;
    margin: 0 24rpx;
    .name-text {
      color: #999;
      font-size: 12px;
      max-width: 300rpx;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
    }
    .message-box {
      background: #ffffff;
      width: 510rpx;
      .message-title {
        width: 510rpx;
        height: 78rpx;
        line-height: 78rpx;
        text-align: center;
        font-size: 26rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #111111;
      }
      .message-content-box {
        padding: 30rpx 24rpx 19rpx 24rpx;
        .message-content {
          font-size: 26rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
          line-height: 36rpx;
          margin-bottom: 20rpx;
        }
        .detail-btn {
          width: 100%;
          height: 72rpx;
          line-height: 72rpx;
          background: #ffffff;
          border: 1rpx solid #cccccc;
          border-radius: 8rpx;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
      }
      .message-status {
        border-top: 1rpx solid #f2f2f2;
        height: 97rpx;
        line-height: 97rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .message-icon {
          width: 26rpx;
          height: 26rpx;
          margin-right: 8rpx;
        }
        .message-text {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
        }
        .message-wait {
          color: #fe9908;
          background: #fef7f6;
        }
        .message-agree {
          color: #5bbc3e;
          background: #fcf8f5;
        }
        .message-refuse {
          color: #fe5147;
          background: #f5fcf6;
        }
      }
    }
  }
}
.message-send {
  flex-direction: row-reverse;
  padding: 24rpx 32rpx 24rpx 128rpx;
}
.message-dialog {
  width: 670rpx;
  position: fixed;
  bottom: 120rpx;
  left: 40rpx;
  background: #ffffff;
  border-radius: 16rpx;
  z-index: 99;
  .dialog-title {
    display: flex;
    align-items: center;
    height: 104rpx;
    border-radius: 16rpx 16rpx 0 0;
    .dialog-title-text {
      margin-left: 80rpx;
      width: 510rpx;
      text-align: center;
      line-height: 104rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #111111;
    }
    .dialog-title-img {
      width: 64rpx;
      height: 64rpx;
    }
  }
  .dialog-content {
    padding: 0 32rpx;
    .message-content-box {
      max-height: 490rpx;
      overflow-y: auto;
    }
    .message-content {
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 36rpx;
      margin-top: 20rpx;
    }
    .message-code {
      display: inline-block;
      height: 54rpx;
      background: #edf0f0;
      border-radius: 6rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      line-height: 54rpx;
      margin-top: 20rpx;
      padding: 0 16rpx;
    }
    .dialog-state-box {
      margin-top: 32rpx;
      margin-bottom: 48rpx;
      height: 88rpx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .state-btn {
        width: 286rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 30rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        border-radius: 8rpx;
        margin: 0;
      }
      .state-refuse {
        color: #333333;
        border: 1rpx solid #979797;
      }
      .state-agree {
        color: #ffffff;
        font-weight: 600;
        background: linear-gradient(93deg,#fa3b34 5%, #ff6a33 100%);
      }
      .dialog-state {
        width: 606rpx;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 30rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
      }
      .dialog-state-agree {
        color: #5bbc3e;
        background: #f5fbf6;
      }
      .dialog-state-refuse {
        color: #fe5147;
        background: #fef7f6;
      }
    }
  }
}
</style>
