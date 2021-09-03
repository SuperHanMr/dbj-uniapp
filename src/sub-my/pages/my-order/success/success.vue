<template>
  <view class="container">
    <custom-navbar
      title="????AAAA"
      :opacity="scrollTop/100"
      :showBack="false"
    >
    </custom-navbar>

    <view
      class="basic-info"
      :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
    >
      <image
        src="../../../../static/order/complete.png"
        mode=""
      ></image>
      <!-- <view class="info">
				<view class="header1">交易完成</view>
				<view class="header2">感谢您的支持～</view>
			</view> -->
      <view class="info">
        <view class="header1">订单取消成功</view>
        <view class="header2">您已取消该订单，欢迎再次购买～</view>
      </view>
      <!-- 	<view class="info">
				<view class="header1">提交成功</view>
				<view class="header2">退款申请已提交，感谢您的支持～</view>
			</view> -->
    </view>

    <view class="button-container">
      <view class="complete-button">
        完成
      </view>
      <view class="detail-button">
        查看详情
      </view>
    </view>
  </view>
</template>

<script>
import { bgImg } from "../../../../static/order/success@2x.png";
export default {
  data() {
    return {
      bgImg: bgImg,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  background: #f6f7f7;
  .basic-info {
    height: 600rpx;
    display: flex;
    background-color: skyblue;
    flex-flow: column nowrap;
    align-items: center;
    image {
      margin-top: 200rpx;
      width: 184rpx;
      height: 184rpx;
      object-fit: cover;
      margin-bottom: 16rpx;
    }
    .info {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .header1 {
        height: 48rpx;
        line-height: 48rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 12rpx;
      }
      .header2 {
        font-size: 26rpx;
        height: 48rpx;
        line-height: 48rpx;
        color: #ffffff;
      }
    }
  }

  .button-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    .complete-button,
    .detail-button {
      width: 396rpx;
      height: 88rpx;
      border-radius: 12rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: 500;
    }

    .complete-button {
      margin-top: 200rpx;
      line-height: 88rpx;
      color: #ffffff;
      background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
    }
    .detail-button {
      margin-top: 40rpx;
      color: #333333;
      border: 2rpx solid #dedede;
      box-sizing: border-box;
      line-height: 84rpx;
    }
  }
}
</style>
