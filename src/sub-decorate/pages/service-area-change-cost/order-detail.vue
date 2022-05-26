<template>
  <view class="order-detail-wrapper">
    <view class="order-overview">
      <view class="order-status">
        <view class="title">
          设计师服务增量
        </view>
        <view :class="'status'">
          待付款
        </view>
      </view>
      <view class="order-no">变更单号：{{"DJ2324923i4923i4392042"}}</view>
    </view>
    <view class="order-detail">
      <!-- <image :src="detailData.designerInfo.avatar" class="goods-item-img"></image>
      <view class="goods-info">
        <view class="goods-desc">
          <text class="goods-type">{{"设计师服务"}}</text>
          {{detailData.name}}
        </view>
        <view class="spu-class">
          <view class='tag'>{{detailData.houseType}}</view>
        </view>
        <view class="spu-class">
          <view class='tag'>{{detailData.designerInfo.name}}｜设计师</view>
        </view>
        <view class="goods-spec">
          <view class="goods-money price-font">
            ￥
            <text
              class="integer-price">{{detailData.serviceMinPrice?(detailData.serviceMinPrice/100).toFixed(2).split(".")[0]:0}}</text>
            <text>.{{detailData.serviceMinPrice?  (detailData.serviceMinPrice/100).toFixed(2).split(".")[1]:0}}</text>
            <text>/平米</text>
          </view>
          <view class="total-num" v-if="!buySquareMeter">1套</view>
        </view>
        <view class="buy-num" v-if="buySquareMeter">
          <text v-if="isIMCard">{{buyNum}}㎡</text>
          <view v-else>
            <input type="digit" v-model="buyNum" /><text>㎡</text>
          </view>
        </view>
      </view> -->

      <view class="service-info">
        <image src="" class="service-info-img"></image>
        <view class="service-info-detail">
          <view class="service-info-top">
            <text class="service-type">{{"设计师服务"}}</text>
            <text class="spu-name">{{"SPU名称SPU名称SPU名称SPU名称SPU名称SPU名称SPU名称SPU名称"}}</text>
          </view>
          <view class="service-info-middle">
            全屋 | 平层 | 60-100平
          </view>
          <view class="service-info-bottom">
            ￥59.00/平米
          </view>
        </view>

      </view>
      <view class="order-change-detail">
        <view class="total-price">
          <text class="symbol">￥</text>
          <text class="price price-font">{{"590.00"}}</text>
        </view>
        <view class="divider"></view>
        <view class="chang-info-detail">
          <view class="change-area">增加面积：10平米</view>
          <view class="change-info">已购买：120平米；变更后：130平米</view>
        </view>
      </view>
    </view>
    <view class="remarks">
      <view>注：</view>
      <view>
        该增项金额是根据您房屋实际需要补充的面积核算后的金额；
        支付完成后服务者会根据变更后的面积为您提供服务。
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "OrderDetail",
  props: {
    goodsDetail: {
      type: Object,
      default: {}
    },
  },
  computed: {
  },
  data() {
    return {
      detailData: {
        houseType: "全屋"
      }
    }
  },
  methods: {
    handleStatusClass(status) {
      let res = "";
      switch(status) {
        case 1:
          res = "payment"
          break;
        case 2:
          res = "refund";
          break;
        default:
          res = "";
      }
      return res;
    }
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
        display: flex;
        flex-direction: column;
        .service-info-top {
          .service-type {
            height: 30rpx;
            padding: 2rpx 10rpx 2rpx 10rpx;
            margin-right: 4rpx;
            border-radius: 4rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #333333;
            line-height: 28rpx;
            text-align: center;
            // vertical-align: middle;
            background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
          }
          .spu-name {
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
          font-size: 32rpx;
          color: #666666;
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


  .goods-item {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .goods-item .good-tip {
    width: 100%;
  }

  .good-tip .item-reduce-box {
    bottom: 0;
  }

  .goods-item .goodsItemImg {
    width: 192rpx;
    height: 192rpx;
    display: block;
    margin-right: 24rpx;
    border-radius: 8rpx;
  }

  .goods-item .goods-info {
    height: 200rpx;
    position: relative;
    flex: 1;
  }

  .goods-info .goods-desc {
    width: 260rpx;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    vertical-align: middle;
    padding-bottom: 2rpx;
  }

  .goods-info .goods-desc .goods-type {
    height: 30rpx;
    padding: 2rpx 10rpx 2rpx 10rpx;
    margin-right: 4rpx;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #333333;
    line-height: 28rpx;
    text-align: center;
    vertical-align: middle;
    background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
  }

  .goods-info .buy-num {
    display: flex;
    align-items: center;
    width: fit-content;
    text-overflow: ellipsis;
    padding: 0 4rpx;
    margin-top: 2rpx;
    font-size: 22rpx;
    position: absolute;
    bottom: 0;
    right: 0;
    align-items: baseline;
  }

  .buy-num view {
    display: flex;
  }

  .buy-num input {
    text-align: center;
    width: 108rpx;
    height: 48rpx;
    border-radius: 6rpx;
    background-color: #F2F2F2;
    margin-right: 12rpx;
  }

  .buy-num text {
    display: flex;
    align-items: center;
  }

  .goods-info .goods-spec {
    width: fit-content;
    text-overflow: ellipsis;
    padding: 0 4rpx;
    margin-top: 2rpx;
    font-size: 22rpx;
    position: absolute;
    top: 0;
    right: 0;
    align-items: baseline;
  }

  .goods-info .spu-class {
    position: relative;
    margin-top: 10rpx;
  }

  .goods-info .tag {
    font-size: 22rpx;
    color: #999999;
    line-height: 38rpx;
    text-align: center;
    border-radius: 6rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 270rpx;
    text-align: left;
  }

  .goods-info .total-num {
    font-size: 28rpx;
    color: #999999;
    float: right;
  }

  .goods-info .sku-deposit {
    float: right;
  }

</style>