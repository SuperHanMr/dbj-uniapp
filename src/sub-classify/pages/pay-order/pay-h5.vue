<template>
  <view class="pay-h5">
    <view class="pay-num">
      <view>应付金额</view>
      <view>¥<text class="price-font pay-font">{{totalPrice}}</text></view>
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
      微信支付 ¥ {{totalPrice}}
    </view>
    <uni-popup ref="payDialog" type="bottom" :mask-click="false">
      <view class="pay-toast">
        <view class="close" @click="closeToast">取消支付</view>
        <view class="toast-content">
          <view class="title">确认支付</view>
          <view class="text">
            <view v-if="refundable">
              <h3>七天无理由退换</h3>
              <p>
                签收后7天内由于客户主观原因申请退货，买家需承担退货产生的物流、上楼搬运等费用。退货需保证商品完好（无破损、未使用），且不影响二次销售。如商品已安装、缺少配件、外观破损等任一商品不完好场景，均不适用7天无理由退货
              </p>
            </view>
            <view v-else>
              <h2>无质量问题不退换</h2>
              <p>
                非产品质量问题，不支持退换货。如收到货物发现质量问题，请把产品外包装、批次及产品质量问题及时拍照，联系售后客服。
              </p>
            </view>
          </view>
        </view>
      </view>
 
    </uni-popup>
  </view>
</template>

<script>
  import {
    payH5
  } from "../../../api/classify.js";
  export default {
    data() {
      return {
        totalPrice: 0,
        payTal: '',
        isPay: false
      }
    },
    onLoad(e) {
      this.totalPrice = Number(e.totalPrice)
      this.payTal = e.payTal
      this.$nextTick(() => {
        this.$refs.payDialog.open();
      })
    },
    methods: {
      pay() {
        let params={
          payTal: this.payTal
        }
        payH5(params).then((data) => {
          let payUrl = data.url + '&redirect_url=' + location.href + '&type=pay_redirect';
          location.href = payUrl
        }, (err) => {
          let payUrl = location.href + '&redirect_url=' + location.href + '&type=pay_redirect';
          location.href = payUrl
        })
      },
      closeToast() {
        this.$refs.payDialog.close();
      }
    }
  }
</script>
<style scoped lang="scss">
.pay-h5{
  height: calc(100% - 70rpx);
  position: relative;
  color: #333333;
  padding: 32rpx;
  font-size: 30rpx;
  background-color: #FFFFFF;
}
.pay-num{
  position: absolute;
  top: 140rpx;
  left: 0;
  right: 0;
  text-align: center;
}
.pay-font{
  font-size: 78rpx;
  color: #222222;
}
.pay-way-box{
  position: absolute;
  top: 400rpx;
  left: 0;
  width: 100%;
  padding-left: 35rpx;
  padding-bottom: 35rpx;
  border-bottom: 1rpx solid #F2F3F3;
}
.pay-way{
  margin-top: 66rpx;
  display: flex;
  width: 680rpx;
  align-items: center;
  justify-content: space-between;
}
.icon-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180rpx;
}
.choose-pay{
  width: 48rpx;
  height: 48rpx;
  background-image: url("../../static/image/choose-pay.png");
  background-size: contain;
}
.wechat-icon{
  width: 32rpx;
  height: 32rpx;
  background-image: url("../../static/image/wechat_icon.png");
  background-size: contain;
}
.pay-btn{
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
  }

  p {
    text-align: justify;
    text-indent: 2em;
    color: #999999;
    margin-top: 24rpx;
  }
</style>
