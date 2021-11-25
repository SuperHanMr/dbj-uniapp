<template>
  <view class="title">
    <view class="t-name">{{type === 1 ?  '拆除服务增项费' : '拆除服务减项费'}}</view>
    <view class="money">{{type === 1 ? '增项需补金额' : '减项退还金额'}}：<text class="unit">￥</text><text
        class="price-font">{{(money/100).toFixed(2) || 1999.99}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      money: {
        type: Number
      },
      type: {
        type: Number,
        required: true
      }
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    padding: 0 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 96rpx;
    background: #fafafa;

    .t-name {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #333333;
      line-height: 40rpx;
    }

    .money {
      height: 32rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      color: #ff3347;
      line-height: 32rpx;
    }

    .price-font {
      font-size: 30rpx;
    }

    .unit {margin-top: 2rpx;}
  }
</style>
