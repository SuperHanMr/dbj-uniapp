<template>
  <view class="pay-h5">
    <view class="pay-num">
      <view>应付金额</view>
      <view>¥<text class="price-font pay-font">{{(totalPrice/100).toFixed(2)}}</text></view>
    </view>
    <view class="pay-way-box">
      <view>请选择支付方式</view>
      <view class="pay-way">
        <view class="icon-box">
          <view class="wechat-icon"></view>
          <view>微信支付</view>
        </view>
        <view class="choose-pay"></view>
      </view>
    </view>
    <view class="pay-btn price-font" @click="pay">
      微信支付 ¥ {{(totalPrice/100).toFixed(2)}}
    </view>
    <uni-popup ref="payDialog" type="bottom" :mask-click="false">
      <view class="pay-toast">
        <!-- <view class="close" @click="closeToast">取消支付</view> -->
        <view class="toast-content">
          <view class="title">确认支付</view>
          <view class="text">
            <view>
              <image src="../../static/image/h5-pay.png" mode="" class="pay-icon"></image>
            </view>
            <view>请确认微信支付
              是否已完成</view>
            <view class="pay-button">
              <button @click="checkPay">已完成支付</button>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import {
    payH5,
    checkPay
  } from "../../../api/classify.js";
  export default {
    data() {
      return {
        totalPrice: 0,
        payTal: '',
        isPay: false,
        payRecordId: 0,
        isRedirect: 0
      }
    },
    onLoad(e) {
      this.totalPrice = Number(e.totalPrice)
      this.payTal = e.payTal
      this.payRecordId = e.payRecordId
      this.isRedirect = Number(e.isRedirect)
      if (this.isRedirect) {
        this.$nextTick(() => {
          this.$refs.payDialog.open()
        })
      }
      console.log('gome://m.gome.com.cn/appHome_2.html')
      // this.$nextTick(() => {
      //   this.$refs.payDialog.open()
      // })
    },
    methods: {
      pay() {
        let params = {
          payTal: this.payTal
        }
        payH5(params).then((data) => {
          let payUrl = data.url + encodeURIComponent(location.href + '&isRedirect=1')
          // let payUrl = data.url + 'gome://m.gome.com.cn/appHome_2.html'
          location.href = payUrl
        })
      },
      checkPay() {
        let params = {
          payRecordId: this.payRecordId
        }
        checkPay(params).then((data) => {
          if (data.payStatus) {
            uni.navigateTo({
              url: './pay-h5-success?payStatus=1'
            })
          } else {
            checkPay(params).then((data) => {// 如果查询订单支付失败，再次查询
              if (data.payStatus) {
                uni.navigateTo({
                  url: './pay-h5-success?payStatus=1'
                })
              } else {
                checkPay(params).then((data) => {
                  if (data.payStatus) {
                    uni.navigateTo({
                      url: './pay-h5-success?payStatus=1'
                    })
                  } else {
                    uni.navigateTo({
                      url: `./pay-h5-success?payStatus=0&payTal=${this.payTal}&payRedirectUrl=${encodeURIComponent(location.href + '&isRedirect=1')}`
                    })
                  }
                })
              }
            })
          }
        })
      },
    }
  }
</script>
<style scoped lang="scss">
  .pay-h5 {
    height: calc(100% - 70rpx);
    position: relative;
    color: #333333;
    padding: 32rpx;
    font-size: 30rpx;
    background-color: #FFFFFF;
    font-family: "PingFang SC";
  }

  .pay-num {
    position: absolute;
    top: 140rpx;
    left: 0;
    right: 0;
    text-align: center;
  }

  .pay-font {
    font-size: 78rpx;
    color: #222222;
  }

  .pay-way-box {
    position: absolute;
    top: 400rpx;
    left: 0;
    width: 100%;
    padding-left: 35rpx;
    padding-bottom: 35rpx;
    border-bottom: 1rpx solid #F2F3F3;
  }

  .pay-way {
    margin-top: 66rpx;
    display: flex;
    width: 680rpx;
    align-items: center;
    justify-content: space-between;
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 180rpx;
  }

  .choose-pay {
    width: 48rpx;
    height: 48rpx;
    background-image: url("../../static/image/choose-pay.png");
    background-size: contain;
  }

  .wechat-icon {
    width: 32rpx;
    height: 32rpx;
    background-image: url("../../static/image/wechat_icon.png");
    background-size: contain;
  }

  .pay-btn {
    position: absolute;
    left: 0;
    right: 0;
    height: 88rpx;
    width: 680rpx;
    bottom: 32rpx;
    margin: auto;
    text-align: center;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
    border-radius: 8px;
    color: #FFFFFF;
    line-height: 88rpx;
  }


  .pay-toast {
    position: relative;
  }

  .close {
    position: absolute;
    height: 100rpx;
    line-height: 100rpx;
    right: 14rpx;
    color: #666666;
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
    color: #333333;
    font-weight: 500;
    text-align: center;
    line-height: 100rpx;
  }

  .text {
    padding: 0 32rpx 50rpx;
    text-align: center;
    font-weight: 500;
  }

  .pay-icon {
    width: 224rpx;
    height: 224rpx;
  }

  p {
    text-align: justify;
    text-indent: 2em;
    color: #999999;
    margin-top: 24rpx;
  }

  .pay-button {
    margin-top: 130rpx;
    display: flex;
    width: 680rpx;
    justify-content: space-between;
  }

  .pay-button button {
    width: 680rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 16rpx;
    font-weight: 500;
    font-size: 32rpx;
    color: #ffffff;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
  }
</style>
