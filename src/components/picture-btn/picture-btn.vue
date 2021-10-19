<template>
  <view class="design" @click="gotoPage">
    <image class="icon" :src="iconUrl"></image>
    <view class="text">{{text}}</view>
    <image class="gotopage" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
  </view>
</template>

<script>
  export default {
    props: ["text", "iconUrl"],
    methods: {
      gotoPage() {
        this.$emit("gotoPage", this.text)
      }
    }
  }
</script>

<style scoped>
  .design {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 0 14rpx 0 8rpx;
    height: 48rpx;
    border: 1rpx solid #f5f6f6;
    background: #ffffff;
    border-radius: 25rpx;
  }

  .icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 8rpx;
    border-radius: 50%;
    box-sizing: border-box;
  }

  view.text {
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 32rpx;
    margin-right: 8rpx;
  }

  image.gotopage {
    height: 18rpx;
    width: 24rpx;
  }
</style>
