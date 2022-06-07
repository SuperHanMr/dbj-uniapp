<template>
  <view class="container">
    <view
      class="body-main"
      :style="{ paddingBottom: containerPaddingBottom + 'rpx' }"
      @click="handleDetail()"
    >
      <!-- 标签 -->
      <view
        class="pic"
        v-if="
          (orderStatus == 2 || showIcon) &&
          dataList.type == 1 &&
          !dataList.stockType
        "
      >
        <!-- 当该商品处于待发货标签时，则对应退款、退款关闭、退款失败状态 -->
        <view
          class="icon-status1"
          v-if="
            dataList.showRefundBtn ||
            dataList.refundBillStatus == 3 ||
            dataList.refundBillStatus == 4 ||
            dataList.refundBillStatus == 5 ||
            dataList.shipmentStatus == 0
          "
        >
          待发货
        </view>

        <view class="icon-status1" v-if="dataList.shipmentStatus == 1">
          待收货
        </view>

        <!-- 当该商品正在退款中显示退款中标签，则对应取消退款状态 -->
        <view
          class="icon-status1"
          v-if="
            dataList.refundBillStatus == 0 || dataList.refundBillStatus == 1
          "
        >
          退款中
        </view>
        <!--  当该商品处于已退款状态时，则对应退款成功状态 -->
        <view class="icon-status2" v-if="dataList.refundBillStatus == 2">
          已退款
        </view>
        <image
          :src="`${dataList.imgUrl}?x-oss-process=image/resize,m_mfit,w_272,h_272`"
          mode=""
        />
      </view>
      <view class="pic" v-else>
        <image
          :src="`${dataList.imgUrl}?x-oss-process=image/resize,m_mfit,w_272,h_272`"
          mode=""
        />
      </view>

      <view class="basic-info">
        <view class="name-attr">
          <view class="text">
            <!-- <text class="icon">{{dataList.type == 2?'服务':'物品'}}</text> -->
            <text class="icon">{{ handleIcon(dataList) }}</text>
            <text class="name">{{ dataList.fullName }}</text>
          </view>
          <view class="attr" v-if="isEvaluate">
            <text style="margin-right: 24rpx" v-if="dataList.scaleProperties">{{
              dataList.scaleProperties
            }}</text>
            <text style="margin-right: 24rpx" v-else>{{
              dataList.skuName
            }}</text>
          </view>
          <view class="attr" v-else>
            <text style="margin-right: 24rpx" v-if="refundType">{{
              dataList.scaleProperties
            }}</text>
            <text style="margin-right: 24rpx" v-else>{{
              dataList.salesProperties
            }}</text>
          </view>
        </view>

        <view class="common-price">
          <!-- 商品价格 -->
          <view class="product-price">
            <text style="font-size: 22rpx">￥</text>
            <text class="price-font"
              >{{ handlePrice(dataList.price)[0] }}.</text
            >
            <text style="font-size: 22rpx" class="price-font">{{
              handlePrice(dataList.price)[1]
            }}</text>
          </view>

          <view style="color: #999999" v-if="refundType"
            >共{{ dataList.refundNumber || 1 }}{{ dataList.unit || "件" }}</view
          >
          <view style="color: #999999" v-else
            >共{{ dataList.number || 1 }}{{ dataList.unit || "件" }}</view
          >
        </view>
      </view>
    </view>

    <view
      class="apply-refund-container"
      :style="{ paddingTop: 0 }"
      v-if="dataList.showRefundBtn && orderStatus == 2 && dataList.type == 1"
    >
      <view class="button" @click.stop="particalRefund"> 申请退款 </view>
    </view>
    <!-- //退款状态 refundBillStatus（ 0待确认 1退款中 2退款完成 3已拒绝 4已取消 5退款失败) -->
    <view
      class="apply-refund-container"
      :style="{ paddingTop: 0 }"
      v-if="
        refundApplyMode == 1 &&
        productNum > 1 &&
        !dataList.showRefundBtn &&
        orderStatus == 2 &&
        dataList.type == 1 &&
        dataList.stockType == 0 &&
        dataList.refundBillStatus > -1
      "
    >
      <view
        class="button"
        v-if="dataList.refundBillStatus == 0 || dataList.refundBillStatus == 1"
        @click.stop="refundCancel"
      >
        取消退款
      </view>

      <view
        class="button"
        v-if="dataList.refundBillStatus == 2"
        @click.stop="refundSuccess"
      >
        退款成功
      </view>

      <view
        class="button"
        v-if="dataList.refundBillStatus == 5"
        @click.stop="refundFailed"
      >
        退款失败
      </view>

      <view
        class="button"
        v-if="
          (dataList.refundBillStatus == 3 || dataList.refundBillStatus == 4) &&
          dataList.shipmentStatus == 0
        "
        @click.stop="refundClose"
      >
        退款关闭
      </view>
    </view>
    <view
      class="warehouse-container"
      v-if="
        dataList.type == 1 &&
        orderStatus == 2 &&
        dataList.stockType &&
        dataList.stockType == 1
      "
      :style="{
        marginTop:
          !dataList.showRefundBtn &&
          orderStatus == 2 &&
          dataList.type == 1 &&
          dataList.stockType == 0 &&
          dataList.refundBillStatus > -1
            ? '0'
            : '20rpx',
      }"
    >
      <view class="left">
        <text class="text1">我的仓库</text>
        <text class="text2 price-font">{{ dataList.stockNumber || 0 }}</text>
      </view>
      <view class="line" />
      <view class="right">
        <view class="item">
          <text class="text1">运送中</text>
          <text class="text2 price-font">{{ dataList.frozenNumber || 0 }}</text>
        </view>
        <view class="item">
          <text class="text1">已收货</text>
          <text class="text2 price-font">{{
            dataList.receiveNumber || 0
          }}</text>
        </view>
        <view class="item">
          <text class="text1">已退</text>
          <text class="text2 price-font">{{ dataList.returnNumber || 0 }}</text>
        </view>
      </view>
    </view>

    <view
      class="discount-container3"
      v-if="
        (orderStatus == 1 || orderType == 2) &&
        dataList.type == 2 &&
        dataList.deposit
      "
      :style="{ paddingBottom: orderType == 2 ? '0' : '24rpx' }"
    >
      <view class="right">
        <view class="item">
          <text>押金</text>
          <text class="price-font" style="color: #333333"
            >￥{{ handlePrice(dataList.deposit)[0] }}.{{
              handlePrice(dataList.deposit)[1]
            }}</text
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "order-item",
  props: {
    paddingBottom: {
      type: Number,
      default: 32,
    },
    iconStatus: {
      type: Number,
      default: 0,
    },
    dataList: {
      type: Object,
      default: {},
    },
    isEvaluate: {
      //是否是待评价列表使用
      type: String,
      default: "",
    },
    orderStatus: {
      //1 待付款 2 进行中 3 已完成
      type: Number,
    },
    refundType: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    orderType: {
      //1.材料 2.服务
      type: Number,
    },
    productNum: {
      type: Number,
    },
    refundApplyMode: {
      type: Number,
    },
  },
  data() {
    return {
      containerPaddingBottom: "32",
    };
  },
  mounted() {
    if (
      (this.dataList.stockType &&
        this.dataList.stockType == 1 &&
        this.dataList.type == 1 &&
        this.orderStatus == 2) ||
      (this.dataList.showRefundBtn && this.orderStatus == 2) ||
      this.orderType == 2
    ) {
      this.containerPaddingBottom = 0;
    }
  },

  methods: {
    handleDetail() {
      this.$emit("handleDetail");
    },
    handleIcon(item) {
      switch (item.type) {
        case 1:
          return "物品";
        case 2:
          return "服务";
        case 6:
          if (item.additionalServices) {
            return "附加服务";
          } else {
            return "设计师服务";
          }
      }
    },
    // 点击图片 跳转到设计师个人主页
    gotoPersonalPage(data) {
      console.log("data===", data);
      if (data.type == 6) {
        if (!data.additionalServices) {
          uni.navigateTo({
            url: `/sub-classify/pages/product-detail/service-product-index?spuId=${data.spuId}`,
          });
        }
      } else {
        if (!data.orderStatus) {
          uni.navigateTo({
            url: `order-detail/order-detail?orderId=${data.id}&from=waitPay`,
          });
        } else {
          uni.navigateTo({
            url: `order-detail/order-detail?orderId=${data.id}`,
          });
        }
      }
    },

    handlePrice(price) {
      return Number(price || 0)
        .toFixed(2)
        .split(".");
    },

    particalRefund() {
      this.$emit("toApplayForRefund");
    },

    refundCancel() {
      this.$emit("refundCancel");
    },
    refundSuccess() {
      this.$emit("refundSuccess");
    },
    refundFailed() {
      this.$emit("refundFailed");
    },
    refundClose() {
      this.$emit("refundClose");
    },
  },
};
</script>

<style lang="scss" scoped>
.body-main {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  // height: 136rpx;
  // padding-bottom:32rpx;
  flex-flow: row nowrap;
  .pic {
    margin-right: 16rpx;
    position: relative;
    .icon-status1,
    .icon-status2 {
      position: absolute;
      width: 84rpx;
      height: 32rpx;
      line-height: 32rpx;
      background: #f4f5f6 linear-gradient(314deg, #ffbf38 0%, #ffa94f 100%);
      border-radius: 8rpx 0 16rpx 0;
      font-size: 20rpx;
      text-align: center;
      color: #ffffff;
      letter-spacing: 1rpx;
    }
    .icon-status2 {
      background: #f4f5f6 linear-gradient(135deg, #20d4b9 0%, #29d6e0 100%);
    }
    image {
      width: 136rpx;
      height: 136rpx;
      display: block;
      box-sizing: border-box;
      border-radius: 8rpx;
      border: 0.5px solid #f4f4f4;
    }
  }
  .basic-info {
    display: flex;
    flex: 1;
    flex-flow: row nowrap;
    // justify-content: space-between;
    align-items: center;
    .name-attr {
      // max-width: 349rpx;
      display: flex;
      flex: 1;
      flex-flow: column nowrap;
      margin-right: 24rpx;
      .text {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 26rpx;
        line-height: 36 rpx;
        max-width: 349rpx;
        .icon {
          // width: 60rpx;
          // height: 30rpx;
          // line-height: 30rpx;
          // margin-right: 4rpx;
          // margin-bottom: 4rpx;
          // border-radius: 4rpx;
          // color: #212121;
          // font-weight: 600;
          // background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
          // font-size: 20rpx;
          // text-align: center;
          // display: inline-block;
          // vertical-align: 13%;
          padding: 3rpx 8rpx 1rpx;
          margin-right: 8rpx;
          line-height: 30rpx;
          border-radius: 4rpx;
          letter-spacing: 0.2px;
          color: #222222;
          font-weight: 600;
          font-size: 21rpx;
          text-align: center;
          display: inline-block;
          background: -webkit-linear-gradient(
            359.52deg,
            #b4eee1 0.28%,
            #eafcd7 99.48%
          );
          background: linear-gradient(90.48deg, #b4eee1 0.28%, #eafcd7 99.48%);
          vertical-align: 13%;
        }
        .name {
          font-size: 26rpx;
          color: #333333;
          line-height: 32rpx;
        }
      }
      .attr {
        margin-top: 12rpx;
        font-size: 22rpx;
        color: #999999;
        text {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .common-price {
      display: flex;
      // flex: 1;
      flex-flow: column nowrap;
      align-items: flex-end;
      font-size: 22rpx;
      line-height: 40rpx;
      .product-price {
        height: 32rpx;
        font-size: 32rpx;
        margin-bottom: 12rpx;
      }
    }
  }
}

.warehouse-container {
  margin-bottom: 40rpx;
  padding: 18rpx 0;
  height: 98rpx;
  box-sizing: border-box;
  background: #fafcfc;
  border-radius: 16rpx;
  border: 2rpx solid #e4f0f0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .left {
    width: 174rpx;
    box-sizing: border-box;
  }
  .line {
    width: 2rpx;
    height: 36rpx;
    background: #e4eded;
  }
  .right {
    width: 510rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .item {
      width: 170rpx;
      box-sizing: border-box;
    }
  }
  .left,
  .right .item {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
    .text1 {
      color: #808080;
      font-size: 22rpx;
      margin-bottom: 14rpx;
    }
    .text2 {
      color: #333333;
      font-size: 28rpx;
      font-weight: 500;
    }
  }
}

.apply-refund-container {
  padding: 24rpx 0 32rpx 0;
  display: flex;
  justify-content: flex-end;
  .button {
    width: 160rpx;
    height: 56rpx;
    line-height: 52rpx;
    text-align: center;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 16rpx;
    border: 2rpx solid #eaeaea;
    font-size: 24rpx;
    font-weight: 400;
    color: #111111;
  }
}
.discount-container {
  padding-bottom: 16rpx;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  font-size: 22rpx;
  color: #999999;

  .left,
  .right {
    .item {
      width: 302rpx;
      height: 32rpx;
      display: flex;
      flex: 1;
      color: #333333;
      font-size: 22rpx;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8rpx;
      .item-left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        image {
          width: 24rpx;
          height: 24rpx;
          object-fit: cover;
        }
      }
    }

    .item:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .line1 {
    width: 2rpx;
    height: 40rpx;
    background: #ebebeb;
    margin: 16rpx 40rpx;
  }

  .line2 {
    width: 2rpx;
    height: 20rpx;
    background: #ebebeb;
    margin: 6rpx 40rpx;
  }
}

.discount-container3 {
  padding-bottom: 24rpx;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
  font-size: 22rpx;
  color: #999999;
  .right {
    .item {
      width: 302rpx;
      height: 32rpx;
      line-height: 32rpx;
      display: flex;
      flex: 1;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-bottom: 8rpx;
      text {
        font-size: 22rpx;
        color: #333;
      }
    }
  }
}
</style>
