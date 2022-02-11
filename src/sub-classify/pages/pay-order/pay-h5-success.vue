<template>
  <view class="page">
    <view v-if="payStatus">
      <view class="pay-box">
        <view class="pay-success"></view>
        <view class="text1">恭喜您，支付成功</view>
        <view class="text2">感谢您的支持</view>
      </view>
      <view class="back-btn" @click="backApplication">返回应用</view>
    </view>
    <view v-else>
      <view class="pay-box">
        <view class="pay-fail"></view>
        <view class="text1">支付失败</view>
      </view>
      <view class="fail-button">
        <button @click="backApplication">取消支付</button>
        <button @click="rePay">重新支付</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    payH5
  } from "../../../api/classify.js";
  export default {
    data() {
      return {
        payStatus: 0,
        payTal: '',
        payRedirectUrl: ''
      }
    },
    onLoad(e) {
      this.payStatus = Number(e.payStatus)
      this.payTal = e.payTal
      this.payRedirectUrl = e.payRedirectUrl
    },
    methods: {
      rePay() {
        let params = {
          payTal: this.payTal
        }
        payH5(params).then((data) => {
          let payUrl = data.url + this.payRedirectUrl
          location.href = payUrl
        })
      },
      backApplication() {
        location.href = 'gome://m.gome.com.cn/appHome_2.html'
      }
    }
  }
</script>

<style>
  uni-page-body {
    background-color: #FFFFFF;
  }
</style>
<style scoped>
  .page {
    overflow: hidden;
  }

  .pay-box {
    text-align: center;
    margin-top: 100rpx;
  }

  .pay-success {
    display: inline-block;
    width: 224rpx;
    height: 224rpx;
    background-image: url("../../static/image/pay_h5_success.png");
    background-size: contain;
  }

  .pay-fail {
    display: inline-block;
    width: 224rpx;
    height: 224rpx;
    background-image: url("../../static/image/pay_h5_fail.png");
    background-size: contain;
  }

  .text1 {
    font-weight: 500;
    font-size: 48rpx;
    color: #222222;
  }

  .text2 {
    font-size: 28rpx;
    color: #999999;
  }

  .back-btn {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    margin: auto;
    width: 686rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 16rpx;
    color: #ffffff;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
  }


  .fail-button {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    margin: auto;
    width: 686rpx;
    height: 88rpx;
    display: flex;
    justify-content: space-between;
  }

  .fail-button button:nth-child(1) {
    width: 320rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 16rpx;
    font-weight: 500;
    font-size: 32rpx;
    background-color: #fff;
    color: #333333;
    border: 1rpx solid #CCCCCC;
  }

  .fail-button button:nth-child(2) {
    width: 320rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 16rpx;
    font-weight: 500;
    font-size: 32rpx;
    color: #ffffff;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
  }
</style>
