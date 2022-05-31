<template>
  <view class="order-detail-wrapper">
    <view class="order-overview">
      <view class="order-status">
        <view class="title">
          设计师服务{{ detailData.type == 1 ?"增量": "减量"}}
        </view>
        <view :class="{ 'status': true, 'status-green': detailData.status == 2,
          'status-orange': detailData.status == 5 || detailData.status == 6 }">
          {{ getStatusStr(detailData.status) }}
        </view>
      </view>
      <view class="order-no">变更单号：{{ detailData.changeOrderNo }}</view>
    </view>
    <view class="order-detail">
      <view class="service-info">
        <image :src="detailData.imageUrl" class="service-info-img"></image>
        <view class="service-info-detail">
          <view class="service-info-top">
            <text class="service-type">{{"设计师服务"}}</text>
            <text class="spu-name">{{ detailData.spuName }}</text>
          </view>
          <view class="service-info-middle">
            {{ detailData.skuName }}
          </view>
          <view class="service-info-bottom">
            <view class="price-detail">
              <text class="symbol">￥</text>
              <text class="price">{{ (detailData.price / 100).toFixed(2) }}</text>
              <text class="unit">/{{ detailData.unit }}</text>
            </view>
          </view>
        </view>

      </view>
      <view class="order-change-detail">
        <view class="total-price">
          <text class="symbol">￥</text>
          <text class="price price-font">{{ (detailData.amount / 100).toFixed(2) }}</text>
        </view>
        <view class="divider"></view>
        <view class="chang-info-detail">
          <view class="change-area">{{ detailData.type == 1 ? "增加":"减少" }}面积：{{detailData.newNum}}{{ detailData.unit }}</view>
          <view class="change-info">已购买：{{ detailData.oldNum }}{{ detailData.unit }}；
            变更后：{{ changedArea }}{{ detailData.unit }}</view>
        </view>
      </view>
    </view>
    <view class="remarks">
      <view>注：</view>
      <view v-if="detailData.type == 1">
        该增量金额是根据您房屋实际需要补充的面积核算后的金额；
        支付完成后服务者会根据变更后的面积为您提供服务。
      </view>
      <view v-else>
        该减量金额是根据您房屋实际需要减少的面积核算后的金额；
        您同意后系统将退还您差额，服务者会根据变更后的面积为您提供服务。
      </view>

    </view>
  </view>
</template>
<script>
export default {
  name: "OrderDetail",
  props: {
    detailData: {
      type: Object,
      default: {}
    }
  },
  computed: {
    changedArea(){
      const {newNum, oldNum} = this.detailData;
      if(this.detailData.type == 1) {
        return +oldNum + newNum;
      } else {
        return oldNum - newNum;
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getStatusStr(status) {
      let res = "";
      switch(status) {
        case 2:
          res = "待确认";
          break;
        case 3:
          res = "已拒绝";
          break;
        case 5:
          res = "待付款";
          break;
        case 6:
          res = "退款中";
          break;
        case 7:
          res = "已支付";
          break;
        case 8:
          res = "已退款";
          break;
      }
      return res;
    },
  }
}
</script>
<style scoped lang="scss">
.order-detail-wrapper {
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  border-radius: 32rpx;

  .order-overview {
    background: #fafafa;
    padding: 32rpx;
    border-radius: 32px 32px 0 0;
    .order-status {
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      .status {
        color: #999999;
      }
      .status-green{
        color: #00BFB6;
      }
      .status-orange{
        color: #FE9000;
      }
      .payment {
        color: #FE9000;
      }
      .refund {
        color: #00BFB6;
      }

    }

    .order-no {
      font-size: 26rpx;
      color: #999999;
    }
  }

  .order-detail {
    padding: 0 32rpx;
    .service-info {
      margin: 24rpx 0;
      display: flex;
      .service-info-img {
        flex: 0 0 150rpx;
        width: 150rpx;
        height: 150rpx;
        margin-right: 16rpx;
        border-radius: 12rpx;
        background: #cfcfcf;
      }
      .service-info-detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        .service-info-top {
          display: flex;
          .service-type {
            height: 30rpx;
            padding: 2rpx 10rpx 2rpx 10rpx;
            margin-right: 10rpx;
            border-radius: 4rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #333333;
            line-height: 28rpx;
            text-align: center;
            background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
          }
          .spu-name {
            flex: 1;
            width: 260rpx;
            font-size: 28rpx;
            color: #333333;
            line-height: 40rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .service-info-middle {
          font-size: 22rpx;
          color: #999999;
        }
        .service-info-bottom {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          font-size: 32rpx;
          color: #666666;
          .price-detail {
            .symbol {
              font-size: 22rpx;
            }
            .price {
              font-family: PriceFont;
              font-size: 32rpx;
            }
            .unit {
              font-size: 20rpx;
            }
          }

        }
      }

    }
    .order-change-detail {
      display: flex;
      align-items: center;
      padding: 20rpx 32rpx;
      background: #fafafa;
      border: 1rpx solid #f2f2f2;
      border-radius: 12rpx;

      .total-price {
        color: #f83112;
        .symbol {
          font-size: 24rpx;
        }
        .price {
          font-size: 32rpx;
        }
      }

      .divider {
        height: 16rpx;
        border-right: 1rpx solid #cfcfcf;
        margin: 0 24rpx;
      }

      .chang-info-detail {
        .change-area {
          font-size: 22rpx;
          line-height: 26rpx;
          color: #333333;
        }
        .change-info {
          font-size: 20rpx;
          line-height: 26rpx;
          color: #999999;
        }
      }

    }
  }

  .remarks {
    padding: 32rpx;
    font-size: 24rpx;
    color: #999999;
  }
}

</style>