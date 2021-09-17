<template>
  <view class="good-toast">
   <uni-popup ref="expensesToast" type="bottom">
        <view class="close" @click="close"></view>
        <view class="toast-content">
                <view v-if='expensesType === 1'>
                  <view class="title">运费说明</view>
                  <view class="text">
                    <p>
                      由于装修场景的特殊性，在打扮家app的物品消费运费实际产生为业主预约发货（管家要货）时产生，购买下单时仅计算用户可获得的免费次数，不产生实际运费；
                    </p>
                    <p>
                      用户在购买商品时，不同卖家有不同的运费收取标准，如下：
                    </p>
                    <p class='tag'>
                      （1）统一店铺内商品，每次要货收取固定运费；
                      <!-- <sapn class="order">(1)</sapn>
          						<span class="order-text">统一店铺内商品，每次要货收取固定运费</span> -->
                    </p>
                    <p class='tag'>
                      （2）同一店铺内商品，每满一定金额赠送一定的免运费要货次数
                      <!-- <span class="order">(2)</span>
          						<span class="order-text">同一店铺内商品，每满一定金额赠送一定的免运费要货次数</span> -->
                    </p>
                  </view>
                </view>
                <view v-if='expensesType === 2'>
                  <view class="title">搬运费说明</view>
                  <view class="text">
                    <p>1. 商品搬运费计算规则：</p>
                    <p>楼梯房搬运费=商品要货数量*每层搬运费*（楼层数-1）+入户费*商品要货数量</p>
                    <p>电梯房搬运费=入户费*商品要货数量</p>
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
    props:{
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
  .good-toast{
    position: relative;
  }
  .close{
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    top: 14rpx;
    right: 14rpx;
    background-image: url("../../static/image/close.png");
    background-size: contain;
  }
  .toast-content{
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
