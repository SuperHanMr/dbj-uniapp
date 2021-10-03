<template>
  <view class="design" @click="gotoPage">
    <!-- <image class="icon"></image> -->
    <i v-if="text === '设计图'" class="icon-shejitu icon" style="color: #ffb568;"></i>
    <i v-if="text === '精算单'" class="icon-Bdandanju icon" style="color: #ffb568;"></i>
    <i v-if="text === '工地视频'" class="icon-zhibo icon" style="color: #ffb568;"></i>
    <i v-if="text === '施工'" class="icon-shigong icon" style="color: #ffb568;"></i>
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
    background: #ffffff;
    border-radius: 25rpx;
  }

  .icon {
    font-size: 32rpx;
    margin-right: 8rpx;
    border-radius: 50%;
    box-sizing: border-box;
    /* border: 2rpx solid #f2f5f8; */
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
    height: 12rpx;
    width: 16rpx;
  }
</style>
