<template>
  <view class="design" @click="gotoPage">
    <image class="icon" :src="iconUrl"></image>
    <view class="text">{{text}}</view>
    <view class="gotopage icon-shangpinxiangqing_ic_guigepeisongxuanzejiantou"></view>
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
    padding: 0 8rpx;
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
    /* margin-right: 2rpx; */
  }

  .gotopage {
    color: #333;
    font-size: 18rpx;
    margin-top: 2rpx;
  }
</style>
