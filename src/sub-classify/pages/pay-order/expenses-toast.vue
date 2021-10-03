<template>
  <view class="good-toast">
    <uni-popup ref="expensesToast" type="bottom">
      <view class="close" @click="close"></view>
      <view class="toast-content">
        <view v-if='expensesType === 1'>
          <view class="title">运费说明</view>
          <view class="text">
            <p>
              由于装修场景的特殊性，在打扮家app购买商品时支付运费分为两种情况
            </p>
            <p>
              零售场景：
            </p>
            <p>
              在商品结算时支付店铺规定的运费（达到店铺满减规则减免当次运费）
            </p>
            <p>
              装修要货场景：
            </p>
            <p>
              运费为业主预约发货（管家、工人、业主要货）时产生的费用，购买下单后仅计算用户可获得的免费次数，不产生实际运费；
            </p>
            <p>
              用户在购买商品时，不同卖家有不同的运费收取标准，如下：
            </p>
            <p class='tag'>
              （1）同一店铺内商品，每次要货根据要货数量支付运费；
            </p>
            <p class='tag'>
              （2）同一店铺内商品，达到减免运费费用后，根据获得的减免运费次数，减免要货时的费用
            </p>
          </view>
        </view>
        <view v-if='expensesType === 2'>
          <view class="title">搬运费说明</view>
          <view class="text">
            <p>由于装修场景的特殊性，在打扮家app购买商品时支付搬运费分为两种情况</p>
            <p>零售场景：</p>
            <p>在商品结算时支付店铺规搬运费</p>
            <p>装修要货场景：</p>
            <p>搬运费为业主预约发货（管家要货）时产生；</p>
            <p>搬运费计算规则如下:</p>
            <p>楼梯房搬运费=商品要货数量*每层搬运费*（楼层数-1）+入户费*商品要货数量;电梯房搬运费=入户费*商品要货数量</p>
          </view>
        </view>
        <view v-if='expensesType === 3'>
          <view class="title">押金说明</view>
          <view class="text">
            <p>这是押金</p>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    props: {
      expensesType: 0
    },
    data() {
      return {

      }
    },
    methods: {
      showPupop() {
        console.log("show")
        this.$refs.expensesToast.open()
      },
      close() {
        this.$refs.expensesToast.close()
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
    color: #333333;
    margin-top: 24rpx;
  }
</style>
