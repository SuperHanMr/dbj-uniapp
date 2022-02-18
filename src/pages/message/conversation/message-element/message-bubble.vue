<template>
  <view
    class="message-bubble"
    :class="{
      'message-send': isMine,
      'no-padding': noPadding,
      new: isNew
    }"
  >
    <view class="message-bubble-avatar">
      <image class="avatar" :src="avatar" mode="aspectFill"></image>
    </view>
    <view class="message-bubble-main">
      <view class="message-bubble-header">
        <view class="message-username-wrapper"><text class="message-username">{{name}}</text></view>
        <view v-if="designTopRank[zesuId]" class="message-rank-wrapper">
          <view class="message-rank">TOP.{{designTopRank[zesuId]}}</view>
          <view class="message-rank-tip">最具价值</view>
        </view>
      </view>
      <view class="message-bubble-body" :style="bodyStyle" @click="$emit('body-click')">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MessageBubble",
  props: {
    message: {
      type: Object,
      required: true,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    bodyStyle: {
      type: String,
      default: "",
    }
  },
  computed: {
    ...mapState({
      newMessageMap: (state) => state.message.newMessageMap,
      designTopRank: (state) => state.designTopRank,
    }),
    isNew() {
      return this.newMessageMap[this.message.ID] || false;
    },
    isMine() {
      return this.message.flow === "out";
    },
    zesuId() {
      return this.message.from;
    },
    avatar() {
      return this.message.avatar || "https://ali-image.dabanjia.com/static/mp/dabanjia/images/avatar-default.png";
    },
    name() {
      return this.message.nick || this.message.from;
    },
    payloadData() {
      return this.message.payloadData || {};
    },
  }
};
</script>

<style lang="scss">
.message-bubble {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  padding: 24rpx 128rpx 24rpx 32rpx;

  .message-bubble-avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 6px;
    margin-right: 24rpx;
    .avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 6px;
      object-fit: cover;
    }
  }

  .message-bubble-main {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
  }

  .message-bubble-header {
    display: flex;
    flex-direction: row;
    align-items: center;
      .message-username-wrapper{
        display: inline-block;
      }

      .message-rank-wrapper{
        display: inline-block;
        margin-left: 12rpx;
        vertical-align: middle;
        line-height: 21rpx;
        white-space: nowrap;
        .message-rank{
          display: inline-block;
          vertical-align: middle;
          height: 30rpx;
          padding: 0 8rpx;
          font-size: 20rpx;
          line-height: 30rpx;
          background: linear-gradient(180deg, #FFEBCC 0%, #FFE5B7 100%);
          border-top-left-radius: 4rpx;
          border-bottom-left-radius: 4rpx;
          color: #865E41;
        }
        .message-rank-tip{
          display: inline-block;
          vertical-align: middle;
          height: 30rpx;
          padding: 0 8rpx;
          font-size: 20rpx;
          line-height: 30rpx;
          background: #F7D397;
          border-top-right-radius: 4rpx;
          border-bottom-right-radius: 4rpx;
          color: #865E41;
        }
      }
    }

  .message-username {
    color: #999;
    font-size: 12px;
    max-width: 300rpx;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
  }
  .message-bubble-body {
    padding: 16rpx 24rpx;
    background: #fff;
    border-radius: 2px 8px 8px 8px;
  }

  // &.new .message-bubble-body {
  //   transform: scale(0);
  //   transform-origin: top left;
  //   animation: bounce 500ms linear both;
  // }

  &.message-send {
    padding: 24rpx 32rpx 24rpx 128rpx;
    flex-flow: row-reverse nowrap;
    .message-bubble-avatar {
      margin-right: 0;
      margin-left: 24rpx;
    }
    .message-bubble-main {
      align-items: flex-end;
    }
    .message-bubble-header {
      display: none;
    }
    .message-bubble-body {
      border-radius: 8px 2px 8px 8px;
      background: #FA4D32;
    }
    // &.new .message-bubble-body {
    //   transform: scale(0);
    //   transform-origin: top right;
    //   animation: bounce 500ms linear both;
    // }
  }

  &.no-padding .message-bubble-body {
    padding: 0;
    border-radius: 8px;
    font-size: 0;
  }
}

@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}
</style>
