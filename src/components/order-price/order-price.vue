<template>
  <view class="container">
    <view class="line"></view>

    <view class="body">
      <!-- 总价 -->
      <view class="price-item">
        <view>总价</view>
        <view>
          <text>￥</text>
          <text class="price-style">{{handlePrice(data.totalAmount)[0]}}.{{handlePrice(data.totalAmount)[1]}}</text>
        </view>
      </view>
      <!-- 运费  有仓库默认显示  无仓库必显示-->
      <view
        class="price-item"
        v-if="data.showFreight && data.stockType == 0"
      >
        <view class="title">
          <text style="margin-right: 8rpx;">运费</text>
          <text class="icon">?</text>
        </view>
        <view>
          <text>￥</text>
          <text class="price-style">{{handlePrice(data.freight)[0]}}.{{handlePrice(data.freight)[1]}}</text>
        </view>
      </view>

      <!-- 搬运费  有仓库默认显示  无仓库必显示-->
      <view
        class="price-item"
        v-if="data.showFreight && data.stockType == 0 "
      >
        <view class="title">
          <text style="margin-right: 8rpx;">搬运费</text>
          <text class="icon">?</text>
        </view>
        <view>
          <text>￥</text>
          <text class="price-style">{{handlePrice(data.handlingFees)[0]}}.{{handlePrice(data.handlingFees)[1]}}</text>
        </view>
      </view>

      <!-- 有押金就显示 -->
      <view
        class="price-item"
        v-if="data.depositTotalAmount"
      >
        <view class="title">
          <text style="margin-right: 8rpx;">总押金</text>
        </view>
        <view>
          <text>￥</text>
          <text class="price-style">{{handlePrice(data.depositTotalAmount)[0]}}.{{handlePrice(data.depositTotalAmount)[1]}}</text>
        </view>
      </view>

      <!-- 有商家优惠就显示 -->
      <view
        class="price-item"
        v-if="data.storeDiscount"
      >
        <view>商家优惠</view>
        <view>
          <text>￥</text>
          <text class="price-style">{{handlePrice(data.storeDiscount)[0]}}.{{handlePrice(data.storeDiscount)[1]}}</text>
        </view>
      </view>

      <!-- 有平台优惠就显示 -->
      <view
        class="price-item"
        v-if="data.platformDiscount"
      >
        <view>平台优惠</view>
        <view>
          <text>￥</text>
          <text class="price-style">{{handlePrice(data.platformDiscount)[0]}}.{{handlePrice(data.platformDiscount)[1]}}</text>
        </view>
      </view>

    </view>
    <!-- 待付款 -->
    <view
      class="footer1"
      v-if="waitPay"
    >
      <view class="has-pay"  v-if="data.totalActualIncomeAmount">
        <text style="margin-right: 12rpx;">已付款</text>
        <text>
          <text>￥</text>
          <text style="font-size: 40rpx;">{{handlePrice(data.totalActualIncomeAmount)[0]}}.</text>
          <text>{{handlePrice(data.totalActualIncomeAmount)[1]}}</text>
        </text>
      </view>
			
      <view v-else >
        <text style="margin-right: 12rpx;">已付款</text>
        <text style="color: #FF3347;">
          <text>￥</text>
          <text style="font-size: 40rpx;">{{handlePrice(data.orderReceivableAmount)[0]}}.</text>
          <text>{{handlePrice(data.orderReceivableAmount)[1]}}</text>
        </text>
      </view>
    </view>

    <!-- 其他情况 -->
    <view
      class="footer"
      v-else
    >
      <text style="margin-right: 12rpx;">实付</text>
      <text style="color: #FF3347;">
        <text>￥</text>
        <text style="font-size: 40rpx;">{{handlePrice(data.actuallyPayAmount)[0]}}.</text>
        <text>{{handlePrice(data.actuallyPayAmount)[1]}}</text>
      </text>
    </view>

  </view>

</template>

<script>
export default {
  name: "order-price",
  props: {
    data: {
      // required:true,
      type: Object,
    },
    // 是否是待付款
    waitPay: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },
  methods: {
    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border-radius: 0 0 24rpx 24rpx;
  background-color: #ffffff;
  margin-bottom: 16rpx;
  .line {
    width: 100%;
    height: 1rpx;
    background: #f2f2f2;
    border-radius: 2rpx;
  }
  .body {
    padding: 22rpx 32rpx 0;
    .price-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      color: #808080;
      font-size: 24rpx;
      font-weight: 400;
      margin-bottom: 16rpx;
      .title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .icon {
          width: 24rpx;
          height: 24rpx;
          border: 2rpx solid #999999;
          border-radius: 50%;
          line-height: 24rpx;
          text-align: center;
        }
      }
    }
    .price-item:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .footer {
    padding: 24rpx 32rpx;
    color: #333333;
    font-size: 26rpx;
    text-align: right;
  }
  .footer1 {
    padding: 24rpx 32rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    font-size: 26rpx;
    .has-pay {
      color: #999999;
      margin-right: 40rpx;
    }
  }
}
.price-style {
  font-size: 28rpx;
}
</style>
