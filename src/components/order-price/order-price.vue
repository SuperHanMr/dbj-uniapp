<template>
  <view class="container">
    <view class="line"></view>

    <view class="body">
      <!-- 总价 -->
      <view class="price-item">
        <view>总价</view>
        <view>
					<text>￥</text>
          <text class="price-style price-font">
            {{handlePrice(data.totalAmount)[0]}}.{{handlePrice(data.totalAmount)[1] || ''}}
          </text>
        </view>
      </view>
      <!-- 运费  有仓库默认显示  无仓库必显示-->
      <view v-if="data.showFreight" class="price-item">
        <view class="title">
          <text style="margin-right: 8rpx;">运费</text>
          <image class="icon" src="../../static/price_icon.svg" mode="" @click="readExpenses(1)"/>
        </view>
        <view v-if="waitPay">
          <text v-if="data.stockType==1">--</text>
          <text v-else>
            <text>￥</text>
            <text class="price-style price-font">{{handlePrice(data.freight)[0]}}.{{handlePrice(data.freight)[1]}}</text>
          </text>
        </view>
        <view v-else>
          <text>￥</text>
          <text class="price-style price-font">{{handlePrice(data.freight)[0]}}.{{handlePrice(data.freight)[1]}}</text>
        </view>
      </view>

      <!-- 搬运费  有仓库默认显示  无仓库必显示-->
      <view v-if="data.showFreight" class="price-item">
        <view class="title">
          <text style="margin-right: 8rpx;">搬运费</text>
          <image class="icon" src="../../static/price_icon.svg" mode=""  @click="readExpenses(2)"/>
        </view>
        <view v-if="waitPay">
          <text v-if="data.stockType==1">--</text>
          <text v-else>
            <text>￥</text>
            <text class="price-style price-font">{{handlePrice(data.handlingFees)[0]}}.{{handlePrice(data.handlingFees)[1]}}</text>
          </text>
        </view>
        <view v-else>
          <text>￥</text>
          <text class="price-style price-font">{{handlePrice(data.handlingFees)[0]}}.{{handlePrice(data.handlingFees)[1]}}</text>
        </view>
      </view>

      <!-- 有押金就显示 -->
      <view v-if="data.depositTotalAmount" class="price-item">
        <view class="title">
          <text style="margin-right: 8rpx;">总押金</text>
        </view>
        <view>
          <text>￥</text>
          <text class="price-style price-font">{{handlePrice(data.depositTotalAmount)[0]}}.{{handlePrice(data.depositTotalAmount)[1]}}</text>
        </view>
      </view>
      <!-- 有减项抵扣就显示 -->
      <view v-if="data.deductAmount" class="price-item">
        <view>减项抵扣</view>
				<view>
          <text>-￥</text>
          <text class="price-style price-font">{{handlePrice(data.deductAmount)[0]}}.{{handlePrice(data.deductAmount)[1]}}</text>
        </view>
      </view>

      <!-- 有商家优惠就显示 -->
      <view v-if="data.storeDiscount" class="price-item" >
        <view>商家优惠</view>
				<view>
          <text>-￥</text>
          <text class="price-style price-font">{{handlePrice(data.storeDiscount)[0]}}.{{handlePrice(data.storeDiscount)[1]}}</text>
        </view>
      </view>

      <!-- 有平台优惠就显示 -->
      <view v-if="data.platformDiscount" class="price-item">
        <view>平台优惠</view>
        <view>
          <text>-￥</text>
          <text class="price-style price-font">{{handlePrice(data.platformDiscount)[0]}}.{{handlePrice(data.platformDiscount)[1]}}</text>
        </view>
      </view>
      <!-- 使用储值卡付款就显示-->
      <view  v-if="data.cardAmount" class="price-item">
        <view>储值卡</view>
        <view>
          <text>-￥</text>
          <text class="price-style price-font">{{handlePrice(data.cardAmount)[0]}}.{{handlePrice(data.cardAmount)[1]}}</text>
        </view>
      </view>
    </view>

    <!-- 待付款 -->
		<!-- 此处还差判断条件 -->
		<view v-if="waitPay && data.type==1 && data.stockType == 1" class="complainStyle">
			辅材类商品下单时不收取运费搬运费，具体费用将在仓库要货时产生并另行结算
		</view>
		
    <view v-if="waitPay" class="footer1">
      <view v-if="data.totalActualIncomeAmount" class="has-pay">
        <text style="margin-right: 12rpx;">已付款</text>
        <text class="price-font">
          <text>￥</text>
          <text style="font-size: 40rpx;" class="price-font">{{handlePrice(data.totalActualIncomeAmount)[0]}}.</text>
          <text class="price-font">{{handlePrice(data.totalActualIncomeAmount)[1]}}</text>
        </text>
      </view>
      <view v-if="data.totalActualIncomeAmount">
        <text style="margin-right: 12rpx;color:#333333;">剩余支付金额</text>
        <text style="color: #F83112;" class="price-font" >
          <text>￥</text>
          <text style="font-size: 40rpx;">{{handlePrice(data.payAmount)[0]}}.</text>
          <text>{{handlePrice(data.payAmount)[1]}}</text>
        </text>
      </view>

      <view v-if="!data.totalActualIncomeAmount">
        <text style="margin-right: 12rpx;color:#333333;">需付款</text>
        <text v-if="payPrice" class="price-font" style="color: #F83112;" >
          <text>￥</text>
          <text style="font-size: 40rpx;">{{handlePrice(payPrice)[0]}}.</text>
          <text>{{handlePrice(payPrice)[1]}}</text>
        </text>
        <text v-else style="color: #F83112;" class="price-font">
          <text>￥</text>
          <text style="font-size: 40rpx;">{{handlePrice(data.payAmount)[0]}}.</text>
          <text>{{handlePrice(data.payAmount)[1]}}</text>
        </text>
      </view>
    </view>

    <!-- 其他情况 -->
    <view v-else class="footer">
      <view v-if="orderFailed">
        <text style="margin-right: 12rpx;">实付款</text>
        <text style="color: #F83112;" class="price-font" >
          <text>￥</text>
          <text style="font-size: 40rpx;" class="price-font">{{handlePrice(data.payAmount)[0]}}.</text>
          <text class="price-font">{{handlePrice(data.payAmount)[1]}}</text>
        </text>
      </view>
      <view v-else>
        <text style="margin-right: 12rpx;">实付</text>
        <text style="color: #F83112;" class="price-font">
          <text>￥</text>
          <text style="font-size: 40rpx;" class="price-font">{{handlePrice(data.actuallyPayAmount)[0]}}.</text>
          <text class="price-font">{{handlePrice(data.actuallyPayAmount)[1]}}</text>
        </text>
      </view>
    </view>
    <expenses-toast  ref='expensesToast' :expensesType="expensesType" />
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
    orderFailed: {
      type: Boolean,
      default: false,
    },
    payPrice: {
      type: String,
    },
  },

  data() {
    return {
      expensesType: "",
    };
  },
  methods: {
    handlePrice(price) {
      if (!price) return ["0", "00"];
      let list = String(price).split(".");
      // return [list[0], list[1]]
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
    readExpenses(num) {
      this.expensesType = num;
      this.$refs.expensesToast.showPupop();
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
    height: 0.5px;
    background: #f2f3f3;
    border-radius: 2rpx;
  }
  .body {
    padding: 32rpx 32rpx 0;
    .price-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      color: #808080;
      font-size: 24rpx;
      font-weight: 400;
      margin-bottom: 20rpx;
      .title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
				text{
					color: #666666;	
				}
        .icon {
          width: 24rpx;
          height: 24rpx;
          object-fit: cover;
        }
      }
    }
    .price-item:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
	.complainStyle{
		margin: 32rpx 32rpx 0;
		padding: 18rpx 24rpx;
		width: 686rpx;
		height: 96rpx;
		background: #FCFCFC;
		box-sizing: border-box;
		border: 1rpx solid #F3F3F3;
		box-sizing: border-box;
		border-radius: 12rpx;
		font-size: 22rpx;
		line-height: 30rpx;
		color: #999999;
	}

  .footer {
    padding: 32rpx;
    color: #333333;
    font-size: 26rpx;
    text-align: right;
  }
  .footer1 {
    padding: 32rpx;
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
