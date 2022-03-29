<template>
  <view class="application-wrap">
    <view class="title-wrap add-item" v-if="changeOrderData.increasedItems">
      <title :money="changeOrderData.increasedAmount" :label="msg.workTypeName+'服务增项费'" labelAmount="增项需补金额"></title>
      <view class="list">
        <change-item v-for="(item, index) in changeOrderData.increasedItems" :itemData="item" :key="index">
        </change-item>
      </view>
      <view class="zhu">注：</view>
      <view class="tips">该增项金额是根据您房屋实际需要补充的工艺项核算后的金额；支付完成后服务者会根据增加的工艺项为您提供服务</view>
    </view>
    <view class="title-wrap subtract-item" v-if="changeOrderData.reducedItems">
      <title :money="changeOrderData.reducedAmount" :label="msg.workTypeName+'服务减项费'" labelAmount="减项退还金额"></title>
      <view class="list">
        <change-item v-for="(item, index) in changeOrderData.reducedItems" :itemData="item" :key="index"></change-item>
      </view>
      <view class="zhu">注：</view>
      <view class="tips">该减项金额是根据您房屋实际需要减少的工艺项；您同意后会按照变更后的结果为您服务并退还减少的工艺项的差额</view>
    </view>
    <view class="summary">
      <view class="add-money" v-if="changeOrderData.increasedItems">
        <view class="label">增项费用</view>
        <view class="money price-font">￥<text
            class="ft-28">{{changeOrderData.increasedAmount ? (changeOrderData.increasedAmount/100).toFixed(2) : 0}}</text>
        </view>
      </view>
      <view class="recd-money" v-if="changeOrderData.reducedItems">
        <view class="label">减项费用</view>
        <view class="money price-font">-￥<text
            class="ft-28">{{changeOrderData.reducedAmount ? (changeOrderData.reducedAmount/100).toFixed(2) : 0}}</text>
        </view>
      </view>
      <view class="total-money">
        <view class="label">合计</view>
        <view class="money price-font">{{changeOrderData.totalAmount < 0 ? "-" : ""}}￥<text
            class="ft-28">{{(Math.abs(changeOrderData.totalAmount)/100).toFixed(2)}}</text></view>
      </view>
    </view>
    <view class="store-money-card" v-if="changeOrderData.totalAmount > 0">
      <view class="yu-e">
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/ic_store_store_card2x.png"></image>
        <view class="c-1">储值卡</view>
        <view class="c-2">(可用余额：￥{{(cardBalance/100).toFixed(2)}})</view>
      </view>
      <check-box :borderRadius="'50%'" height="36rpx" width="36rpx" :checked="isCardPay" @change="changStoreValueCard"
        @click='changeValue'>
      </check-box>
    </view>
    <view class="pay-way" v-if="changeOrderData.totalAmount > 0">
      <view class="label">支付方式</view>
      <view class="wx" v-if="totalAmount > 0" @click="morePayWay">{{payWayTag?'公司转账':'在线支付'}}
        <view class="more_pay_icon"></view>
      </view>
      <view class="store-pay" v-else>储值卡支付</view>
    </view>
    <view class='remarks'>
      <text>备注</text>
      <view class="remarks-right">
        <textarea type="text" maxlength="200" v-model="remarks" cursor-spacing="15px"
          placeholder-class="text-placeholder"
          style="width:100%;line-height: 46rpx;min-height: 90rpx;height: 85%;overflow: scroll;padding-top: 30rpx;"
          placeholder="选填,说点什么～" />
      </view>
    </view>
    <view class="pay-wrap">
      <view class="b-t-1" @click="refuse">拒绝申请</view>
      <view class="b-t-1 b-t-p" v-if="changeOrderData.totalAmount > 0" @click="submitCard">同意并支付<text
          class="unit price-font">￥</text><text class="price-font">{{totalAmount}}</text></view>
      <view class="b-t-1 b-t-p" v-if="changeOrderData.totalAmount === 0" @click="submit(0)">同意申请</view>
      <view class="b-t-1 b-t-p" v-if="changeOrderData.totalAmount < 0" @click="submit(-1)">同意并退还您<text
          class="unit price-font">￥</text><text
          class="price-font">{{(Math.abs(changeOrderData.totalAmount)/100).toFixed(2)}}</text></view>
    </view>
    <uni-popup ref="payDialog" type="bottom">
      <pay-dialog :payChannelPrice="payChannelPrice" @payOrder="submit(2)" @closePayDialog="closePayDialog">
      </pay-dialog>
    </uni-popup>
    <pay-way-toast ref='payWayToast' @payWay="payWay"></pay-way-toast>
  </view>
</template>

<script>
  import Title from "./item-title.vue";
  import ChangeItem from "./change-item.vue";
  import CheckBox from "../../components/check-box/check-box.vue";
  import {
    log
  } from "../../../utils/log.js";
  import {
    getBalance
  } from "../../../api/user.js";
  import {
    createChangeOrderApi,
    refundApi,
    agreeChangeOrderApi,
    getChangeOrderApi,
  } from "../../../api/changeOrder.js";
  export default {
    components: {
      Title,
      ChangeItem,
      CheckBox,
    },
    data() {
      return {
        isCardPay: false,
        msg: {},
        cardBalance: 0,
        remarks: "",
        changeOrderData: {},
        payWayTag: 0,
        payType: 0
      };
    },
    computed: {

      totalAmount() {
        if (this.isCardPay) {
          let temp = this.cardBalance - this.changeOrderData.totalAmount;
          if (temp >= 0) {
            return 0;
          } else {
            return (
              (this.changeOrderData.totalAmount - this.cardBalance) /
              100
            ).toFixed(2);
          }
        } else {
          return (this.changeOrderData.totalAmount / 100).toFixed(2);
        }
      },
      payChannelPrice() {
        //提示框价格
        let temp = this.cardBalance - this.changeOrderData.totalAmount;
        if (temp <= 0) {
          return (this.cardBalance / 100).toFixed(2);
        } else {
          return (this.changeOrderData.totalAmount / 100).toFixed(2);
        }
      },
    },
    onLoad(option) {
      console.log(
        "getApp().globalData.decorateMsg：",
        getApp().globalData.decorateMsg
      );
      if (
        getApp().globalData.decorateMsg.msgType ===
        "sys_change_order_owner_confirm"
      ) {
        this.msg = getApp().globalData.decorateMsg;
      } else {}

      uni.setNavigationBarTitle({
        title: this.msg.workTypeName + "工艺项变更申请",
      });
    },
    onShow() {
      this.getChangeOrderList();
      this.getBalance();
    },
    methods: {
      morePayWay() {
        this.$refs.payWayToast.showPupop();
      },
      payWay(payWayTag) {
        this.payWayTag = payWayTag
        if (this.payWayTag) {
          this.payType = 6
        }
      },
      changeValue() {
        this.isCardPay = !this.isCardPay
      },
      closePayDialog() {
        this.$refs.payDialog.close();
      },
      getBalance() {
        getBalance().then((e) => {
          if (e != null) {
            this.cardBalance = e;
          }
        });
      },
      changStoreValueCard(value) {
        console.log("isCardPay", value);
        this.isCardPay = value;
      },
      submitCard() {
        if (this.isCardPay) {
          this.$refs.payDialog.open();
        } else {
          this.submit(1);
        }
      },
      submit(flag) {
        let title, content;
        if (flag === 1) {
          title = "是否同意工艺项变更申请";
          content = `并支付￥${this.totalAmount}`;
        } else if (flag === -1) {
          title = "是否同意工艺项变更申请";
          content = `退还您￥${(
          Math.abs(this.changeOrderData.totalAmount) / 100
        ).toFixed(2)}`;
        } else if (flag === 0) {
          title = "是否同意工艺项变更申请";
          content = "";
        }
        let that = this;
        if (flag === 2) {
          that.createPayOrder();
        } else {
          uni.showModal({
            content,
            title,
            cancelText: "取消",
            cancelColor: "#333333",
            confirmText: "同意",
            confirmColor: "#00BFB6",
            success(res) {
              if (res.confirm) {
                if (flag === 1 || flag === -1) {
                  that.createPayOrder();
                } else if (flag === 0) {
                  that.createPayOrder();
                  // that.agreeChangeOrder()
                }
              } else if (res.cancel) {
                console.log("用户取消了变更单申请的提交");
              }
            },
            fail() {},
          });
        }
      },
      refuse() {
        console.log("拒绝申请变更");
        uni.navigateTo({
          url: `/sub-decorate/pages/refused-apply/refused-apply?changeOrderId=${this.msg?.changeOrderId}`,
        });
      },
      getChangeOrderList() {
        getChangeOrderApi({
          id: this.msg?.changeOrderId,
        }).then((data) => {
          console.log("变更单data：", data);
          if (data) {
            this.changeOrderData = data;
            this.isCardPay = this.cardBalance >= this.changeOrderData.totalAmount
          }
          // this.changeOrderData = data
        });
      },
      agreeChangeOrder() {
        //TODO
        agreeChangeOrderApi({
          changeOrderId: this.msg?.changeOrderId,
        }).then((data) => {
          console.log(data);
          uni.switchTab({
            url: "/pages/decorate/index/index",
          });
        });
      },
      createPayOrder() {
        //TODO
        //#ifdef MP-WEIXIN
        let bodyObj = {
          remarks: this.remarks,
          payType: this.payType ? this.payType : 1, //"int //支付方式  1微信支付",
          openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
          sourceId: 100, //"long //订单来源渠道  1app  100小程序",
          changeId: this.msg.changeOrderId, //"long //变更单id",
          isCardPay: this.isCardPay, //"boolean //是否使用储值卡支付  默认false"
        };
        createChangeOrderApi(bodyObj).then((data) => {
          if (!data) {
            // 退款跳转装修首页
            uni.switchTab({
              url: "/pages/decorate/index/index",
            });
            return;
          }
          if (this.payWayTag) {
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${data.remittanceCode}&amount=${data.amount}`
            })
            return;
          }
          const {
            wechatPayJsapi,
            cardPayComplete,
            id
          } = data;
          if (!cardPayComplete) {
            uni.requestPayment({
              provider: "wxpay",
              ...wechatPayJsapi,
              success(res) {
                console.log("付款成功", res);
                uni.switchTab({
                  url: "/pages/decorate/index/index",
                });
              },
              fail(e) {
                console.log(e);
                const {
                  errMsg
                } = e;
                if (errMsg.indexOf("cancel") !== -1) {
                  uni.navigateTo({
                    url: `/sub-my/pages/my-order/my-order?index=1&firstEntry=true`,
                  });
                  log({
                    type: "wx-pay-fail",
                    page: "gj-process-cost",
                    data: e,
                    openId: getApp().globalData.openId,
                    openIdLocal: uni.getStorageSync("openId"),
                  });
                } else {
                  uni.showToast({
                    title: "支付失败",
                    icon: "none",
                    duration: 3000,
                  });
                }
              },
            });
          } else {
            uni.redirectTo({
              url: `/sub-classify/pages/pay-order/pay-success?orderId=${id}`,
            });
          }
        });
        //#endif
        //#ifdef H5
        let bodyObj = {
          remarks: this.remarks,
          payType: 3, //"int //支付方式  1微信支付",
          deviceType: 2,
          openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
          sourceId: 100, //"long //订单来源渠道  1app  100小程序",
          changeId: this.msg.changeOrderId, //"long //变更单id",
          isCardPay: this.isCardPay, //"boolean //是否使用储值卡支付  默认false"
        };
        createChangeOrderApi(bodyObj).then((data) => {
          if (!data) {
            // 退款跳转装修首页
            uni.switchTab({
              url: "/pages/decorate/index/index",
            });
            return;
          }
          const {
            wechatPayJsapi,
            cardPayComplete,
            id
          } = data;
          if (!cardPayComplete) {
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/pay-h5?payTal=${data.gomePayH5.payModeList[0].payTal}&totalPrice=${this.totalAmount}&payRecordId=${data.payRecordId}`,
            });
          } else {
            uni.redirectTo({
              url: `/sub-classify/pages/pay-order/pay-success?orderId=${id}`,
            });
          }
        });
        //#endif
      },
    },
  };
</script>

<style lang="scss">
  .application-wrap {
    padding-top: 16rpx;
    background: #f5f6f6;
  }

  .list {
    padding-bottom: 32rpx;
    background-color: #fff;
  }

  .summary {
    padding: 24rpx 32rpx;
    background-color: #fff;
    margin-bottom: 16rpx;
  }

  .add-money,
  .recd-money,
  .total-money {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .label {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 40rpx;
    }

    .money {
      height: 40rpx;
      font-size: 24rpx;
      font-weight: 400;
      text-align: right;
      color: #333333;
      line-height: 40rpx;

      .ft-28 {
        font-size: 32rpx;
      }
    }
  }

  .store-money-card {
    padding: 34rpx 32rpx;
    background-color: #fff;
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .yu-e {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
    }

    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 12rpx;
    }

    .c-1 {
      width: 84rpx;
      height: 28rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 28rpx;
    }

    .c-2 {
      height: 28rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999;
      line-height: 28rpx;
    }
  }

  .zhu {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999;
    line-height: 34rpx;
    background-color: #fff;
    padding: 0 32rpx;
  }

  .tips {
    height: 68rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999;
    line-height: 34rpx;
    margin-bottom: 16rpx;
    background-color: #fff;
    padding: 0 32rpx 32rpx;
  }

  .pay-way {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 32rpx;
    background-color: #fff;
    margin-bottom: 48rpx;

    .label {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 40rpx;
    }

    .wx {
      height: 32rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      padding-left: 44rpx;
      color: #111111;
      line-height: 32rpx;
      background-image: url("http://dbj.dragonn.top/static/mp/dabanjia/images/ic_order_wechat2x.png");
      background-size: 32rpx 32rpx;
      background-repeat: no-repeat;
    }

    .store-pay {
      height: 32rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      padding-left: 44rpx;
      color: #111111;
      line-height: 32rpx;
      background-image: url("http://dbj.dragonn.top/static/mp/dabanjia/images/ic_store_store_card2x.png");
      background-size: 32rpx 32rpx;
      background-repeat: no-repeat;
    }
  }

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

  .remarks {
    overflow: hidden;
  }

  .remarks text {
    min-width: 180rpx;
  }

  .remarks .remarks-right {
    flex: 1;
    position: relative;
    height: 100%;
    overflow: scroll;
  }

  .pay-way .more_pay_icon {
    vertical-align: middle;
    display: inline-block;
    width: 48rpx;
    height: 52rpx;
    background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/more_pay_icon.png");
    background-size: contain;
  }

  .pay-wrap {
    padding: 24rpx 32rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .b-t-1 {
      width: 188rpx;
      height: 88rpx;
      line-height: 88rpx;
      border: 1rpx solid #cccccc;
      border-radius: 16rpx;
      text-align: center;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #666666;
    }

    .b-t-p {
      flex: 1;
      background: linear-gradient(116.19deg, #f83112 16.48%, #fd6421 83.52%);
      margin-left: 32rpx;
      color: #fff;

      .unit {
        font-size: 24rpx;
      }
    }
  }
</style>
