<template>
  <view>
    <warehouse-item
      :showBtns="false"
      :showSubtitle="false"
      :showBack="type==0&&ownered"
      :itemBtn="type==2&&ownered"
      :showPrePrice="false"
      :item="res"
      @backGoodItem="toBackGoodItem"
      @applyBackItem="applyBackItem"
    >
    </warehouse-item>
    <view
      v-if="type!=0"
      class="detail-price"
    >
      <!-- 	<view class="detail-price-row">
				<view class="detail-price-row-font">
					商品总价
				</view>
				<view style="flex:1">
				</view>
				<view class="detail-price-row-font">
					¥
				</view>
				<view class="detail-price-row-num">
					{{res.totalAmount}}
				</view>
			</view> -->
      <view class="detail-price-row">
        <view
          class="detail-price-row-font"
          @click="openPopup(false)"
        >

          运费
        </view>
        <i
          class="icon-jingsuandan_rengongfeiyongwenhaoicon icon-tips"
          @click="openPopup(false)"
        ></i>
        <view style="flex:1">
        </view>
        <view class="detail-price-row-font">
          ¥
        </view>
        <view class="detail-price-row-num">
          {{res.freight}}
        </view>

      </view>
      <view class="detail-price-row">
        <view
          class="detail-price-row-font"
          @click="openPopup(true)"
        >
          搬运费
        </view>
        <i
          class="icon-jingsuandan_rengongfeiyongwenhaoicon icon-tips"
          @click="openPopup(true)"
        ></i>
        <view style="flex:1">
        </view>
        <view class="detail-price-row-font">
          ¥
        </view>
        <view class="detail-price-row-num">
          {{res.handlingFees}}
        </view>

      </view>
      <!-- 	<view class="detail-price-row">
				<view class="detail-price-row-font">
					商家优惠
				</view>
				<view style="flex:1">

				</view>
				<view class="detail-price-row-font">
					¥
				</view>
				<view class="detail-price-row-num">
					{{res.storeDiscount}}
				</view>

			</view> -->
      <view class="total-pay">
        <view class="total-pay-title">
          实付款
        </view>
        <view class="total-pay-amount">
          <text class="totoal-pay-num">￥</text>
          <text class="totoal-pay-num-z">{{String(res.realPayment).split('.')[0]}}</text>
          <text class="totoal-pay-num">.{{String(res.realPayment).split('.')[1] || '00'}}</text>
        </view>
      </view>
    </view>

    <view class="order-info">
      <view class="order-info-title">
        订单信息
      </view>
      <view class="order-info-row">
        <view class="order-info-row-pre">
          订单编号:
        </view>
        <view class="order-info-row-con">
          {{res.orderNo}}
        </view>
        <view
          class="copy"
          @click="copy"
        >
          复制
        </view>
      </view>
      <view class="order-info-row">
        <view class="order-info-row-pre">
          创建时间:
        </view>
        <view class="order-info-row-con">
          {{res.createTime |formatDate}}
        </view>
      </view>
      <view class="order-info-row">
        <view class="order-info-row-pre">
          付款时间:
        </view>
        <view class="order-info-row-con">
          {{res.payTime |formatDate}}
        </view>
      </view>
      <view class="order-info-row">
        <view class="order-info-row-pre">
          支付方式:
        </view>
        <view class="order-info-row-con">
          {{payType(res.payType)}}
        </view>
      </view>
      <view
        v-if="res.requireNo"
        class="order-info-row"
      >
        <view class="order-info-row-pre">
          要货单号:
        </view>
        <view class="order-info-row-con">
          {{res.requireNo}}
        </view>
      </view>
      <view
        v-if="res.requireTime"
        class="order-info-row"
      >
        <view class="order-info-row-pre">
          要货时间:
        </view>
        <view class="order-info-row-con">
          {{res.requireTime |formatDate}}
        </view>
      </view>
    </view>
    <view
      v-if="ownered"
      class="bottom-btn"
    >
      <view
        v-if="type==0"
        class="refund-btn"
        @click="toBack"
      >
        退库存
      </view>
      <view
        v-if="type==0"
        @click="toRequire"
        class="big-btn"
      >
        要货
      </view>
      <view
        v-if="type==1"
        class="confirm-btn"
        @click="onConfirmGoods"
      >
        确认收货
      </view>
      <view
        v-if="type==2&&res&&res.overallRefunded"
        class="apply-refund"
        @click="applyRefund"
      >
        申请退款
      </view>

    </view>

    <uni-popup
      ref="popup"
      type="bottom"
    >
      <view class="header-popup">
        {{isBan?'搬运费说明':'运费说明'}}

        <view
          class="close-popup"
          @click="closePopup"
        >
          <i class="icon-xiaochengxu_youshangjiaodankuangguanbi_ic close-icon-popup"></i>

        </view>
      </view>
      <scroll-view
        :scroll-y="true"
        class="popup-content"
      >
        <view
          v-for="(item,index) in tipsList"
          :key="item.id"
          :class="{'fontbold':index==1||index==3}"
          style="margin-top: 24rpx;"
        >
          <text style="margin-left: 32rpx;"></text>
          <text
            style="line-height: 44rpx;"
            space="emsp"
            decode="true"
          > &nbsp&nbsp{{item}}</text>
        </view>

        <view class="holder">

        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import { formatDate } from "../../../utils/common.js";
import {
  deliveredDetail,
  receivedDetail,
  refundDetail,
} from "../../../api/order.js";
import { confirmGoods, judgeOwner } from "../../../api/decorate.js";
export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      pay_time: "1631515894",
      res: {},
      type: -1,
      id: "",
      projectId: "",
      ownered: false,
      isBan: false,
      tipsList: [],
    };
  },
  onLoad(e) {
    // ["待发货", "待收货", "已收货", "退款"], 0,1,2

    let type = e.type;
    this.type = type;
    this.projectId = e.projectId;
    judgeOwner({
      projectId: this.projectId,
    }).then((e) => {
      this.ownered = e.ownered;
    });
    let id = e.id;
    this.id = id;
    this.loadData(type, id);
  },
  methods: {
    openPopup(isBan) {
      this.isBan = isBan;
      if (isBan) {
        this.tipsList = [
          "由于装修场景的特殊性，在打扮家app购买商品时支付搬运费分为两种情况",
          "零售场景：",
          "在商品结算时支付店铺规定的搬运费",
          "装修要货场景：",
          "搬运费为业主预约发货（管家要货）时产生；",
          "每次要货搬运费计算规则如下",
          "楼梯房搬运费=商品要货数量*每层搬运费*（楼层数-1）+入户费*商品要货数量；",
          "电梯房搬运费=入户费*商品要货数量",
        ];
      } else {
        this.tipsList = [
          "由于装修场景的特殊性，在打扮家app购买商品时支付运费分为两种情况",
          "零售场景：",
          "在商品结算时支付店铺规定的运费（达到店铺满减规则减免当次运费）",
          "装修要货场景：",
          "运费为业主预约发货（管家、工人、业主要货）时产生的费用，购买下单后仅计算用户可获得的免费次数，不产生实际运费；",
          "用户在购买商品时，不同卖家有不同的运费收取标准，如下：",
          "（1）同一店铺内商品，每次要货根据要货数量支付运费；",
          "（2）同一店铺内商品，达到减免运费费用后，根据获得的减免运费次数，减免要货时的费用",
        ];
      }
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    toRequire() {
      let list = this.res.stockAppVOS;
      list = list.filter((e) => {
        return e.stockNumber > 0;
      });
      list.forEach((e) => {
        e.count = e.stockNumber;
      });

      getApp().globalData.naviData = list;
      uni.navigateTo({
        url: `/sub-decorate/pages/require-goods/require-goods?projectId=${this.projectId}`,
      });
    },
    applyBackItem(item) {
      let params = {
        stockAppVOS: [item],
      };
      getApp().globalData.naviData = params;
      uni.navigateTo({
        url: `../warehouse-refund/warehouse-refund?type=0&refundType=2&id=${this.id}`,
      });
    },
    toBackGoodItem(item) {
      let params = {
        stockAppVOS: [item],
      };
      getApp().globalData.naviData = params;
      uni.navigateTo({
        url: `../warehouse-refund/warehouse-refund?type=1&id=${this.id}`,
      });
    },
    toBack() {
      getApp().globalData.naviData = this.res;
      uni.navigateTo({
        url: `../warehouse-refund/warehouse-refund?type=1&id=${this.id}`,
      });
    },
    applyRefund() {
      let vm = this;

      getApp().globalData.naviData = vm.res;
      uni.navigateTo({
        url: `../warehouse-refund/warehouse-refund?type=0&refundType=1&id=${this.id}`,
      });
    },
    onConfirmGoods() {
      let vm = this;
      uni.showModal({
        title: "是否确认收货?",
        success: function (res) {
          if (res.confirm) {
            confirmGoods({
              id: vm.id,
            }).then((e) => {
              uni.showToast({
                title: "确认收货成功",
                icon: "none",
              });
              uni.navigateBack({});
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    payType(type) {
      if (type == 1) {
        return "微信支付";
      } else if (type == 2) {
        return "支付宝支付";
      } else if (type == 3) {
        return "国美支付";
      } else if (type == 4) {
        return "储值卡支付";
      } else if (type == 5) {
        return "微信支付|储值卡支付";
      } else {
        return "其他";
      }
    },
    loadData(type, id) {
      if (type == 0) {
        deliveredDetail({
          orderId: id,
        }).then((e) => {
          if (e.stockAppVOS && e.stockAppVOS.length) {
            e.stockAppVOS.forEach((sub) => {
              sub.totoalNum = sub.number;
              sub.number = sub.stockNumber;
            });
          }
          this.res = e;
        });
      } else if (type == 1 || type == 2) {
        receivedDetail({
          id,
        }).then((e) => {
          if (e.stockAppVOS && e.stockAppVOS.length) {
            e.stockAppVOS.forEach((sub) => {
              sub.totoalNum = sub.number;
              sub.number = sub.requireNumber
                ? sub.requireNumber
                : sub.stockNumber;
              console.log("!!!!~~~~~");
              console.log(sub.number);
            });
          }
          this.res = e;
        });
      } else if (type == 3) {
        refundDetail({
          id,
        }).then((e) => {
          if (e.stockAppVOS && e.stockAppVOS.length) {
            e.stockAppVOS.forEach((sub) => {
              sub.totoalNum = sub.number;
              sub.number = sub.stockNumber;
            });
          }
          this.res = e;
        });
      }
    },
    copy() {
      let orderId = this.res.orderNo;
      console.log(orderId);
      uni.setClipboardData({
        data: orderId.toString(),
        success: function () {
          console.log("success");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fontbold {
  font-weight: bold;
}

.popup-content {
  background-color: #fff;
  max-height: 700rpx;
  font-size: 28rpx;
  padding: 32rpx;
  overflow: auto;

  color: #333333;

  .holder {
    height: 200rpx;
  }
}

.header-popup {
  width: 750rpx;
  height: 104rpx;
  background: #ffffff;
  border-radius: 32rpx 32rpx 0rpx 0rpx;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333333;
  font-weight: 500;
  font-size: 32rpx;
  border-bottom: 1rpx solid #f2f2f2;
  .close-popup {
    position: absolute;
    top: 12rpx;
    right: 16rpx;
    width: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .close-icon-popup {
      color: #333333;
      font-size: 30rpx;
    }
  }
}

.icon-tips {
  font-size: 24rpx;
  margin-left: 8rpx;
  color: #999999;
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 136rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 30rpx;
  background: #fefffe;

  .confirm-btn {
    width: 248rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    opacity: 1;
    background: linear-gradient(135deg, #36d9cd, #28c6c6);
    border-radius: 12rpx;
    margin-right: 32rpx;
    color: #ffffff;
    font-size: 32rpx;
  }

  .refund-btn {
    width: 188rpx;
    height: 88rpx;
    opacity: 1;
    border: 1px solid #cccccc;
    border-radius: 16rpx;
    margin-right: 32rpx;
    text-align: center;
    line-height: 88rpx;
    font-size: 30rpx;
    color: #666666;
  }

  .big-btn {
    width: 466rpx;
    height: 88rpx;
    line-height: 88rpx;
    opacity: 1;
    background: linear-gradient(135deg, #00ccbe, #00c2bf);
    border-radius: 16rpx;
    margin-right: 32rpx;
    font-weight: 500;
    font-size: 30rpx;
    color: #ffffff;
    text-align: center;
  }

  .apply-refund {
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    opacity: 1;
    background: #ffffff;
    border: 1rpx solid #eaeaea;
    border-radius: 16rpx;
    font-size: 24rpx;
    color: #111111;
    margin-right: 32rpx;
  }
}

.copy {
  width: 72rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  border: 1rpx solid #eaeaea;
  border-radius: 8rpx;
  color: #111111;
  font-size: 20rpx;
  margin-left: 20rpx;
}

.detail-price {
  background-color: #ffffff;
  padding: 32rpx;
  margin-bottom: 16rpx;

  &-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #808080;

    &-num {
      font-size: 28rpx;
    }

    &-font {
      font-size: 24rpx;
    }
  }

  .total-pay {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 32rpx;

    &-title {
      color: #333333;
      font-size: 26rpx;
      margin-right: 16rpx;
    }
  }

  .total-pay-amount {
    display: table-cell;
    vertical-align: bottom;
  }

  .totoal-pay-num {
    color: #ff3347;
    font-size: 26rpx;
  }

  .totoal-pay-num-z {
    color: #ff3347;
    font-size: 40rpx;
  }
}

.order-info {
  background-color: #ffffff;
  padding: 32rpx;
  margin-bottom: 16rpx;

  &-title {
    color: #333333;
    font-size: 30rpx;
  }

  &-row {
    margin-top: 16rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    &-pre {
      color: #999999;
      font-size: 28rpx;
    }

    &-con {
      color: #333333;
      font-size: 28rpx;
      margin-left: 16rpx;
    }
  }
}
</style>
