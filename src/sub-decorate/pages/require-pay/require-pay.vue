<template>
  <view>
    <view class="store">
      <view class="header">
        {{detail.storeName}}
      </view>
      <view
        class="items"
        v-for="(sub,subIndex) in detail.details"
        :key="subIndex"
      >
        <image
          class="img"
          :src="sub.imgUrl"
          mode=""
        ></image>
        <view class="content">
          <view class="title">
            <text class="tip"></text>
            {{sub.fullName}}
          </view>
          <view>
            <view class="spec">
              {{sub.scaleProperties}}
            </view>
          </view>

          <view class="sub-title">
            本次要货{{sub.requireNumber}}{{sub.unit}}
          </view>
          <view class="price">
            <text class="unit">¥</text> <text class="price-font">{{sub.price}}</text> /{{sub.unit}}
          </view>
        </view>
      </view>

      <view class="other-pay border-top">
        <view class="title">
          运费
        </view>
        <view class="amount">
          <text class="unit">¥ </text> {{detail.freight}}
        </view>
      </view>

      <view class="other-pay ">
        <view class="title">
          搬运费
        </view>
        <view class="amount">
          <text class="unit">¥ </text> {{detail.handlingFees}}
        </view>
      </view>
    </view>
    <view class="recharge-row">

      <view
        v-if="couponList.length"
        class="row-item"
        style="margin-bottom: 32rpx;"
        @click="clickCoupon"
      >
        <image
          class="card-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
          mode=""
        >
        </image>
        <view>
          <text>优惠券</text>
        </view>
        <view style="flex:1">
        </view>
        <view
          v-if="selectCoupon&&selectCoupon.total"
          class="card-price"
        >
          <text style="margin-right:4rpx ;">-</text> <text style="margin-right:2rpx ;">¥</text>
          {{(selectCoupon.total/100).toFixed(2)}}
        </view>
        <image
          class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_more.svg"
          mode=""
        >
        </image>
      </view>
      <view
        v-if="haveCard"
        class="row-item"
        @click="clickCard"
      >
        <image
          class="card-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
          mode=""
        >
        </image>
        <view>
          <text>储值卡</text>
          <text class="card-sub">(可用余额:{{(cardBalance/100).toFixed(2)}}元)</text>
        </view>
        <view style="flex:1">
        </view>
        <view
          v-if="cardClick"
          class="card-price"
        >
          <text style="margin-right:4rpx ;">-</text> <text style="margin-right:2rpx ;">¥</text>{{(this.cardPrice/100).toFixed(2)}}
        </view>
        <image
          v-if="cardClick"
          class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_selected.png"
          mode=""
        >
        </image>
        <image
          v-if="!cardClick&&cardBalance"
          class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_unselected.png"
          mode=""
        >
        </image>
        <view
          v-if="!cardClick&&!cardBalance"
          class="select-disable"
        >
        </view>
      </view>
    </view>
    <view class="pay-way">
      <text>支付方式</text>

      <view
        v-if="payChannel"
        class="flex-center"
      >
        <image
          class="card-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
          mode=""
        >
        </image><text>储值卡支付</text>

      </view>
      <view v-else>
        <!-- <view class="wechat_icon"></view> -->
        <text>在线支付</text>
      </view>
    </view>

    <view style="height: 200rpx;">

    </view>
    <bottom-btn
      :showDefaultBtn="false"
      bgcolor="#FFF"
    >
      <template v-slot:default>
        <view
          class="reject-btn"
          @click="onReject"
        >
          拒绝申请
        </view>
        <view style="flex: 1;">

        </view>
        <view
          class="agree-btn"
          @click="payOrder"
        >

          同意 <text v-if="totalPrice">并支付¥ {{payPrice}}</text>
        </view>
      </template>

    </bottom-btn>
    <uni-popup
      ref="payDialog"
      type="bottom"
    >
      <pay-dialog
        :payChannel="payChannel"
        :payChannelPrice="payChannelPrice"
        @payOrder="onConform"
        @closePayDialog="closePayDialog"
      ></pay-dialog>
    </uni-popup>
    <uni-popup
      ref="couponDialog"
      type="bottom"
    >
      <coupon-dialog
        :couponList="couponList"
        @onSelect="onSelectCoupon"
        @close="closeCoupon"
      ></coupon-dialog>
    </uni-popup>
  </view>
  </view>
</template>

<script>
import {
  requireListDetail,
  requireConfirm,
  payFreight,
} from "../../../api/decorate.js";
import { getBalance } from "../../../api/user.js";
import { log } from "../../../utils/log.js";
export default {
  data() {
    return {
      id: "18",
      list: [],
      detail: {},
      cardClick: false,
      haveCard: false, //是否有会员卡
      cardBalance: 0, //会员卡余额
      couponList: [],
      selectCoupon: {
        total: 10000,
      },
    };
  },
  computed: {
    payChannel() {
      var res = Number(this.totalPrice) * 100 - this.cardBalance;
      //支付渠道 true 储值卡  false 微信
      console.log(
        this.cardClick && res > 0,
        res,
        Number(this.totalPrice) * 100
      );
      if (this.cardClick && res <= 0) {
        return true;
      } else {
        return false;
      }
    },
    payChannelPrice() {
      //提示框价格
      if (!this.payChannel) {
        return (
          (Number(this.totalPrice) * 100 - this.cardBalance) /
          100
        ).toFixed(2);
      } else {
        return this.totalPrice;
      }
    },
    cardPrice() {
      var res = Number(this.totalPrice) * 100 - this.cardBalance;
      if (res >= 0) {
        return this.cardBalance;
      } else {
        return Number(this.totalPrice) * 100;
      }
    },
    payPrice() {
      if (this.cardClick) {
        var res = Number(this.totalPrice) * 100 - this.cardBalance;
        if (res <= 0) {
          return "0.00";
        }
        return String((res / 100).toFixed(2));
      } else {
        console.log(this.totalPrice);
        return this.totalPrice;
      }
    },

    totalPrice() {
      if (this.detail.handlingFees || this.detail.freight) {
        return (this.detail.handlingFees + this.detail.freight).toFixed(2);
      } else {
        return 0;
      }
    },
  },
  methods: {
    onSelectCoupon(item) {
      this.selectCoupon = item;
    },
    closeCoupon() {
      this.$refs.couponDialog.close();
    },
    clickCoupon() {
      this.$refs.couponDialog.open();
    },
    closePayDialog() {
      this.$refs.payDialog.close();
    },
    clickCard() {
      if (this.cardBalance) {
        this.cardClick = !this.cardClick;
      }
    },
    onReject() {
      uni.showModal({
        content: "是否拒绝要货申请",
        success: (res) => {
          if (res.confirm) {
            this.toReject();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    toReject() {
      requireConfirm({
        requireId: this.id,
        status: 4,
      }).then((e) => {
        uni.navigateBack({});
      });
    },
    payOrder() {
      if (this.cardClick) {
        this.$refs.payDialog.open();
        return;
      }
      this.onConform();
    },
    onConform() {
      if (!this.totalPrice) {
        requireConfirm({
          requireId: this.id,
          status: 2,
        }).then((e) => {
          uni.navigateBack({});
        });
      } else {
        let openid = getApp().globalData.openId;
        payFreight({
          orderId: this.detail.orderId,
          goodsRequireId: this.id,
          payType: 1,
          openid,
          isCardPay: this.cardClick,
        }).then((e) => {
          const cardPayComplete = e.cardPayComplete;

          if (!cardPayComplete) {
            const payInfo = e.wechatPayJsapi;
            uni.requestPayment({
              provider: "wxpay",
              ...payInfo,
              success(res) {
                uni.showToast({
                  title: "支付成功",
                });
                uni.navigateBack({});
              },
              fail(e) {
                console.log(e);
                log({
                  type: "wx-pay-fail",
                  page: "require-pay",
                  data: e,
                  openId: getApp().globalData.openId,
                  openIdLocal: uni.getStorageSync("openId"),
                });
              },
            });
          } else {
            uni.showToast({
              title: "支付成功",
            });
            uni.navigateBack({});
          }
        });
      }
    },
    getDetail() {
      requireListDetail({
        id: this.id,
      }).then((e) => {
        this.detail = e;
      });
    },
    submit() {
      uni.redirectTo({
        url: "../require-success/require-success",
      });
    },
  },
  onLoad(e) {
    const data = getApp().globalData.decorateMsg.msgBody;
    let res = JSON.parse(data);
    this.id = res.requireId;
    console.log(getApp().globalData.decorateMsg);
    console.log(this.id);
    this.getDetail();
    getBalance().then((e) => {
      if (e != null) {
        this.haveCard = true;
        this.cardBalance = e;
      }
    });
  },
  onShow() {
    if (!getApp().globalData.openId) {
      //确保拿到openId，否则无法支付
      getApp().globalData.openId = uni.getStorageSync("openId");
    }
  },
};
</script>

<style lang="scss" scoped>
.recharge-row {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 32rpx;
  font-size: 28rpx;

  .row-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

.mt26 {
  margin-top: 26rpx;
}

.select-disable {
  width: 36rpx;
  height: 36rpx;
  background: #f5f5f5;
  border: 1rpx solid #e8e8e8;
  border-radius: 50%;
  margin-left: 16rpx;
}

.pay-way,
.pledge,
.remarks {
  padding: 5rpx 32rpx;
  background-color: #ffffff;
  margin-top: 25rpx;
  font-size: 28rpx;
  font-family: PingFangSC, PingFangSC-Regular;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104rpx;
  line-height: 104rpx;
}

.card-img {
  width: 32rpx;
  height: 32rpx;
  margin-right: 12rpx;
}

.card-price {
  font-family: PriceFont;
  font-size: 28rpx;
  color: #ff3347;
}

.card-sub {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
}

.selected-img {
  width: 36rpx;
  height: 36rpx;
  margin-left: 16rpx;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-way .wechat_icon {
  vertical-align: sub;
  display: inline-block;
  width: 32rpx;
  height: 32rpx;
  background-image: url("../../static/wechat_icon.png");
  background-size: contain;
  margin-right: 12rpx;
  background-color: #fff;
}

.price-font {
  font-size: 28rpx;
  font-weight: 500;
}

.price-uit {
  font-size: 22rpx;
}

.tip {
  display: inline-block;
}

.spec {
  display: inline-block;
  background: #fafafa;
  border: 1rpx solid #f0f0f0;
  border-radius: 6rpx;
  padding: 6rpx 12rpx;
  font-size: 22rpx;
  color: #999999;
}

.price {
  color: #333333;
  font-size: 24rpx;
}

.spec {
  display: inline-block;
  background: #fafafa;
  border: 1rpx solid #f0f0f0;
  border-radius: 6rpx;
  padding: 6rpx 12rpx;
  font-size: 22rpx;
  color: #999999;
}

.price {
  color: #333333;
  font-size: 24rpx;
}

.reject-btn {
  width: 188rpx;
  height: 88rpx;
  line-height: 88rpx;
  opacity: 1;
  border: 1rpx solid #cccccc;
  border-radius: 16rpx;
  text-align: center;
  color: #666666;
  font-size: 30rpx;
  margin-left: 32rpx;
}

.agree-btn {
  width: 466rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  color: #ffffff;
  font-size: 30rpx;
  background: linear-gradient(135deg, #00bfaf, #00bfbc);
  border-radius: 16rpx;
  margin-right: 32rpx;
}

.store {
  padding: 0 32rpx;
  background-color: #fff;
  margin-bottom: 16rpx;

  .items {
    display: flex;
    padding: 0 0 32rpx 0;

    .img {
      width: 192rpx;
      height: 192rpx;
      border: 1rpx solid #f4f4f4;
      border-radius: 8rpx;
      background-color: yellow;
    }

    .content {
      flex: 1;
      margin-left: 24rpx;

      .title {
        color: #333333;
        font-size: 28rpx;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
      }

      .sub-title {
        margin-top: 16rpx;
        font-size: 22rpx;
        color: #999999;
        text-align: end;
      }
    }
  }

  .header {
    width: 100%;
    height: 74rpx;
    display: flex;
    align-items: flex-end;
    color: #333333;
    font-size: 28rpx;
    font-weight: 500;
    margin-bottom: 32rpx;
  }
}

.other-pay {
  height: 70rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .amount {
    font-size: 26rpx;
    color: #333333;

    .unit {
      font-size: 22rpx;
    }
  }

  .amount {
    font-size: 26rpx;
    color: #333333;
  }
}

.border-top {
  border-top: 1rpx solid #f4f4f4;
}
</style>
