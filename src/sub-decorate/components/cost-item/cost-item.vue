<template>
  <view class="cost-item">
    <view class="item-top">
      <view class="item-top-left">
        <image class="icon"></image>
        <text class="title">量房</text>
        <text class="tip">占比20%</text>
      </view>
      <view class="item-top-right">
        <text>¥</text>66.00
      </view>
    </view>
    <view class="item-content">
      <view class="item-content-left">
        -
        <text>人工(中级)</text>
      </view>
      <view class="item-content-right">
        ¥66
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data(){
      return{}
    }
  }
</script>

<style lang="scss" scoped>
  .const-item{
    width: 100%;
    height: 256rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 12px;
    .item-top{
      height: 120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32rpx 0 46rpx;
      .item-top-left{
        image{
          width: 40rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }
        .title{
          font-size: 30rpx;
          font-weight: 500;
          color: #333;
          margin: 16rpx;
        }
        .tip{
          font-size: 22rpx;
          font-weight: 500;
          color: #999;
        }
      }
      .item-top-right{
        font-weight: 500;
        color: #333;
        font-size: 36rpx;
        text{
          font-size: 24rpx;
        }
      }
    }
    .item-content{
      margin: 0 24rpx;
      padding: 0 22rpx 0 24rpx;
      height: 52px;
      opacity: 1;
      background: #fbfbfb;
      border-radius: 10px; 
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
