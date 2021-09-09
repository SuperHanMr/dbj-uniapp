<template>
  <view class="sub-title">
    <view v-if="haveLeftBorder" class="sub-title-l"></view>
    <view class="text">{{text}}</view>
  </view>
</template>

<script>
  export default {
    props: {
      text: {
        type: String
      },
      haveLeftBorder: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .sub-title {
    height: 108rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    background: #ffffff;
    border-radius: 16rpx 16rpx 0rpx 0rpx;

    .sub-title-l {
      width: 6rpx;
      height: 32rpx;
      background: #333333;
      border-radius: 0rpx 200rpx 200rpx 0rpx;
      margin-right: 18rpx;
    }

    .text {
      width: 256rpx;
      height: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: left;
      color: #333333;
      line-height: 44rpx;
    }
  }
</style>
