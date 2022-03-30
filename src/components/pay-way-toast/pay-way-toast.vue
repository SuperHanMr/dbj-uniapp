<template>
  <view class="good-toast">
    <uni-popup ref="payWayToast" type="bottom" @maskClick="close">
      <view class="close" @click="close"></view>
      <view class="toast-content">
        <view class="title">请选择支付方式</view>
        <view class="text">
          <view class="text-box" @click="select(0)">
            <view :class="{'selected-text': !payWayTag}">在线支付</view>
            <view class="unselected-icon" :class="{'selected-icon': !payWayTag}"></view>
          </view>
          <view class="text-box" @click="select(1)">
            <view :class="{'selected-text': payWayTag}">公司转账</view>
            <view class="unselected-icon" :class="{'selected-icon': payWayTag}"></view>
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
        payWayTag: 0
      }
    },
    methods: {
      showPupop() {
        this.$refs.payWayToast.open()
      },
      close() {
        this.$emit('payWay', this.payWayTag)
        this.$refs.payWayToast.close()
      },
      select(tag) {
        this.payWayTag = tag
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
    background-image: url("../../static/close.png");
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
    color: #111111;
    font-weight: 500;
    text-align: center;
    line-height: 100rpx;
  }

  .text-box{
    font-size: 30rpx;
    padding: 32rpx 38rpx;
    color: #111111;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
  .selected-text{
    color: #111111;
    font-weight: 500;
  }
  .unselected-icon{
    width: 48rpx;
    height: 48rpx;
    background-image: url("../../static/pay-way-unselected.png");
    background-size: contain;
  }
  .selected-icon{
    background-image: url("../../static/pay-way-selected.png");
  }
</style>
