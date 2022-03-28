<template>
  <view class="good-toast">
    <uni-popup ref="payWayToast" type="bottom">
      <view class="close" @click="close"></view>
      <view class="toast-content">
        <view class="title">请选择支付方式</view>
        <view class="text">
          <view>
            <view :class="{'select-text': !selectTag}">在线支付</view>
            <view :class="{'select-icon': !selectTag}"></view>
          </view>
          <view>
            <view>公司转账</view>
            <view></view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        selectTag: 0
      }
    },
    methods: {
      showPupop() {
        this.$refs.payWayToast.open()
      },
      close() {
        this.$refs.payWayToast.close()
      }
    }
  }
</script>

<style scoped>
  .good-toast {
    position: relative;
  }

  .close {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    top: 14rpx;
    right: 14rpx;
    background-image: url("../../static/image/close.png");
    background-size: contain;
  }

  .toast-content {
    max-height: 1000rpx;
    overflow: scroll;
    background-color: #f5f6f7;
    border-radius: 16px 16px 0px 0px;
  }

  .title {
    height: 100rpx;
    font-size: 32rpx;
    color: #333333;
    font-weight: 500;
    text-align: center;
    line-height: 100rpx;
  }

  .text {
    padding: 0 32rpx 50rpx;
  }

  p {
    text-align: justify;
    text-indent: 2em;
    color: #999999;
    margin-top: 24rpx;
  }
</style>
