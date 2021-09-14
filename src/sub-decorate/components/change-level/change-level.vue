<template>
  <view class="wrap">
    <image class="top-bg" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/top_bg%402x.png"></image>
    <view class="title">
      <view class="left">
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_level.svg"></image>
        <view>选择您想要更换人工的等级</view>
      </view>
      <view class="right left">
        <view>什么是人工等级</view>
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_why.svg"></image>
      </view>
    </view>
    <view class="r-d-g">
      <group-radio-me :items="radioItems" :defaultV="0" @change="change"></group-radio-me>
    </view>
    <view class="line"></view>
    <view class="price-count">所有人工费用总和：¥1000.00</view>
    <view class="btn-wrap">
      <view class="cancel">取消</view>
      <view class="submit">确定更改</view>
    </view>
  </view>
</template>

<script>
  import GroupRadioMe from "../radio-group-me/radio-group-me.vue"
  export default {
    components: {
      GroupRadioMe
    },
    data() {
      return {
        radioItems: [{
          label: "中级",
          value: 0
        }, {
          label: "高级",
          value: 1
        }, {
          label: "特高级",
          value: 2
        }, {
          label: "钻石",
          value: 3
        }, ],
        radioValue: null
      }
    },
    methods: {
      change(value) {
        this.radioValue = value
        this.$emit("changeLevel", value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 586rpx;
    background: #fff;
    border-radius: 32rpx 32rpx 2rpx 2rpx;
    padding: 40rpx 32rpx 0;
    box-sizing: border-box;
  }

  .top-bg {
    width: 750rpx;
    height: 146rpx;
    position: absolute;
    top: 0;
    left: 0;
  }

  .title {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 64rpx;
    z-index: 9;

    .left {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;

      image {
        width: 32rpx;
        height: 32rpx;
      }

      view {
        height: 44rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #c5a58d;
        line-height: 44rpx;
      }
    }
    .right {
      view {
        height: 32rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #c5a58d;
        line-height: 32rpx;
      }
      image{
        width: 26rpx;
        height: 26rpx;
      }
    }
  }
  .r-d-g {
    margin-bottom: 62rpx;
    height: 98rpx;
    z-index: 9;
  }
  .line {
    height: 2rpx;
    background-color: #F0F0F0;
  }
  .price-count {
    text-align: center;
    height: 40rpx;
    opacity: 1;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
    padding: 42rpx 0 58rpx;
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 136rpx;
    background: #fefffe;
    .cancel {
      width: 326rpx;
      height: 88rpx;
      border: 2rpx solid #00bfb6;
      border-radius: 16rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #00bfb6;
      line-height: 88rpx;
    }
    .submit {
      width: 326rpx;
      height: 88rpx;
      opacity: 1;
      background: linear-gradient(135deg,#00bfaf, #00bfbc);
      border-radius: 16rpx;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 88rpx;
    }
  }
</style>
