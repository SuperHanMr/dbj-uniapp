<template>
  <view class="good-toast">
    <uni-popup ref="safeToast" type="bottom">
      <view class="close" @click="close"></view>
      <view class="toast-content">
        <view class="title">退换说明</view>
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
    </uni-popup>
  </view>
</template>

<script>
  export default {
    props: {
      expensesType: 0,
      refundable: true
    },
    data() {
      return {}
    },
    methods: {
      showPupop() {
        this.$refs.safeToast.open()
      },
      close() {
        this.$refs.safeToast.close()
      }
    }
  }
</script>

<style scoped>
  .good-toast {
    position: relative;
  }

  .close {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    top: 14rpx;
    right: 14rpx;
    background-image: url("../../static/image/close.png");
    background-size: contain;
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
