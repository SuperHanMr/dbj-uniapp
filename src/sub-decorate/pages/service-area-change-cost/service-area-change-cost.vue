<template>
  <view class="application-wrap">
    <no-data v-if="loading || noData" words="暂无数据"></no-data>
    <order-detail v-else :detailData="detailData"></order-detail>
    <view class="summary">
      <view class="change-money">
        <view class="label">{{detailData.type == 1 ? "增量":"减量"}}费用</view>
        <view class="money price-font"><text v-if="detailData.type == 3">-</text>￥<text
            class="ft-28">{{detailData.amount ? (Math.abs(detailData.amount)/100).toFixed(2) : 0}}</text>
        </view>
      </view>
    </view>
    <view class="store-money-card" v-if="detailData.amount > 0 && (detailData.status == 2 || detailData.status == 5)">
      <view class="yu-e">
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"></image>
        <view class="c-1">储值卡</view>
        <view class="c-2">(可用余额：￥{{(cardBalance/100).toFixed(2)}})</view>
      </view>
      <check-box :borderRadius="'50%'" height="36rpx" width="36rpx" :checked="isCardPay" @change="changStoreValueCard"
        @click='changeValue'>
      </check-box>
    </view>
    <view class="pay-way" v-if="detailData.amount > 0 && (detailData.status == 2 || detailData.status == 5)">
      <view class="label">支付方式</view>
      <view class="wx" v-if="totalAmount > 0" @touchstart.stop.prevent="morePayWay">{{payWayTag?'公司转账':'在线支付'}}
        <view class="more_pay_icon"></view>
      </view>
      <view class="store-pay" v-else>储值卡支付</view>
    </view>

    <view v-if="detailData.status == 3" class="refuse-reason">
      <view class="title">拒绝原因</view>
      <view class="content">
        {{ detailData.refuseReason }}
      </view>
    </view>

    <view :style="{paddingBottom:containerBottom * 2 + 48 + 88 + 'rpx'}">
    </view>

    <view v-if="detailData.status == 2 || detailData.status == 5" class="pay-wrap" :style="{paddingBottom:systemBottom}">
      <view class="b-t-1" @click="refuse">拒绝申请</view>
      <view class="b-t-1 b-t-p" v-if="detailData.amount > 0" @click="submit(1)">同意并支付<text
          class="unit price-font">￥</text><text class="price-font">{{(Math.abs(detailData.amount)/100).toFixed(2)}}</text></view>
      <view class="b-t-1 b-t-p" v-if="detailData.amount === 0" @click="submit(0)">同意申请</view>
      <view class="b-t-1 b-t-p" v-if="detailData.amount < 0" @click="submit(-1)">同意并退还您<text
          class="unit price-font">￥</text><text
          class="price-font">{{(Math.abs(detailData.amount)/100).toFixed(2)}}</text></view>
    </view>
    <view v-if="detailData.status == 7" class="view-order" :style="{paddingBottom:systemBottom}">
      <view class="btn-view-order" @click="toOrderDetail">查看订单</view>
    </view>
    <uni-popup ref="payDialog" type="bottom">
      <pay-dialog :payChannelPrice="payChannelPrice" @payOrder="submit(2)" @closePayDialog="closePayDialog">
      </pay-dialog>
    </uni-popup>
    <pay-way-toast ref='payWayToast' @payWay="payWay"></pay-way-toast>
  </view>
</template>

<script>
  import CheckBox from "../../components/check-box/check-box.vue";
  import OrderDetail from "./order-detail.vue";

  import {
    log
  } from "../../../utils/log.js";
  import {
    getBalance
  } from "../../../api/user.js";
  import {
    createChangeOrderApi,
    agreeChangeOrderApi,
  } from "../../../api/changeOrder.js";

  import {
    getAreaChangeOrderDetail
  } from "../../../api/decorate.js";

  export default {
    components: {
      OrderDetail,
      CheckBox,
    },
    data() {
      return {
        isCardPay: false,
        msg: {},
        cardBalance: 0,
        changeOrderData: {},
        payWayTag: 0,
        payType: 0,
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
        changeOrderId: null,
        detailData: {},
        cardClick: false,
        noData: false,
        loading: false
      };
    },

    computed: {
      totalAmount() {
        if (this.isCardPay) {
          let temp = this.cardBalance - this.detailData.amount;
          if (temp >= 0) {
            return 0;
          } else {
            return (
              (this.detailData.amount - this.cardBalance) /
              100
            ).toFixed(2);
          }
        } else {
          return (this.detailData.amount / 100).toFixed(2);
        }
      },
      payChannelPrice() {
        //提示框价格
        let temp = this.cardBalance - this.detailData.amount;
        if (temp <= 0) {
          return (this.cardBalance / 100).toFixed(2);
        } else {
          return (this.detailData.amount / 100).toFixed(2);
        }
      },
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
      this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
      let _this = this;
      uni.getSystemInfo({
        success(data) {
          let screenHeight = data.screenHeight;
          let safeArea = data.safeArea || {};
          _this.bottomHeight = screenHeight - (safeArea.bottom || screenHeight);
        },
      });
    },
    onLoad(option) {
      const {
        changeOrderId
      } = option;
      this.changeOrderId = changeOrderId;

      console.log(
        "getApp().globalData.decorateMsg：",
        getApp().globalData.decorateMsg
      );
      if (
        getApp().globalData.decorateMsg.msgType ===
        "sys_area_change_order_apply"
      ) {
        this.msg = getApp().globalData.decorateMsg;
      } else {}
    },
    onShow() {
      this.getChangeOrderDetail();
      this.getBalance();
    },
    methods: {
      foramtPrePrice(price) {
        return Number(price / 100).toFixed(2);
      },
      morePayWay() {
        this.$refs.payWayToast.showPupop();
      },
      payWay(payWayTag) {
        this.payWayTag = payWayTag
        this.payType = this.payWayTag?6:0
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
          title = "是否同意设计面积变更申请";
          content = `并支付￥${(this.detailData.amount / 100).toFixed(2)}`;
        } else if (flag === -1) {
          title = "是否同意设计面积变更申请";
          content = `退还您￥${(
          Math.abs(this.detailData.amount) / 100).toFixed(2)}`;
        } else if (flag === 0) {
          title = "是否同意设计面积变更申请";
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
            confirmColor: "#FA3B34",
            success(res) {
              if (res.confirm) {
                if(flag === 1){
                  if(that.isCardPay){
                    that.$refs.payDialog.open();
                  } else {
                    that.createPayOrder();
                  }
                } else if (flag === -1) {
                  that.createPayOrder();
                } else if (flag === 0) {
                  that.createPayOrder();
                  that.agreeChangeOrder()
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
        uni.navigateTo({
          url: `/sub-decorate/pages/service-area-change-refuse/service-area-change-refuse?changeOrderId=${this.changeOrderId || this.msg?.changeOrderId}`,
        });
      },
      toOrderList() {
        uni.redirectTo({
          url: "../../../sub-my/pages/my-order/my-order?firstEntry=true&index=2"
        });
      },
      toOrderDetail() {
        console.log(this.detailData)
        const orderId =  this.detailData.orderId;
        if(!orderId) return
        uni.redirectTo({
          url: `../../../sub-my/pages/my-order/order-detail/order-detail?orderId=${orderId}`
        });
      },

      agreeChangeOrder() {
        agreeChangeOrderApi({
          changeOrderId: this.changeOrderId || this.msg?.changeOrderId,
        }).then((data) => {
          console.log(data);
          uni.switchTab({
            url: "/pages/decorate/index/index",
          });
        });
      },
      createPayOrder() {
        //#ifdef MP-WEIXIN
        let bodyObj = {
          remarks: this.remarks,
          payType: this.payType ? this.payType : 1, //"int //支付方式  1微信支付",
          openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
          sourceId: 100, //"long //订单来源渠道  1app  100小程序",
          changeId: this.msg.changeOrderId || this.changeOrderId, //"long //变更单id",
          isCardPay: this.isCardPay, //"boolean //是否使用储值卡支付  默认false"
        };
        createChangeOrderApi(bodyObj).then((data) => {
          if (!data) {
            uni.showToast({
              title: "提交成功",
              icon: "none",
            });
            setTimeout(() => {
              // 退款跳转装修首页
              uni.switchTab({
                url: "/pages/decorate/index/index",
              });
            }, 2000)
          } else {
            if(data.accounts){
              let obj = {
                type:'changeApplication',
                params:bodyObj
              }
              uni.navigateTo({
                url:`/sub-my/pages/choice-refund-account/choice-refund-account?query=${encodeURIComponent(
                  JSON.stringify(obj)
                )}`
              })
              return
            }
            const {
              wechatPayJsapi,
              cardPayComplete,
              id
            } = data;
            if (!cardPayComplete) {
              if (this.payWayTag) {
                uni.navigateTo({
                  url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${data.companyTransferPayVO.remittanceCode}&amount=${data.companyTransferPayVO.amount}`
                })
                return;
              }
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
          changeId: this.changeOrderId || this.msg.changeOrderId, //"long //变更单id",
          isCardPay: this.isCardPay, //"boolean //是否使用储值卡支付  默认false"
        };
        createChangeOrderApi(bodyObj).then((data) => {
          if (!data) {
            uni.showToast({
              title: "提交成功",
              icon: "none",
            });
            setTimeout(() => {
              // 退款跳转装修首页
              uni.switchTab({
                url: "/pages/decorate/index/index",
              });
            }, 2000)
          } else {
            const {
              wechatPayJsapi,
              cardPayComplete,
              id
            } = data;
            if (!cardPayComplete) {
              if (this.payWayTag) {
                uni.navigateTo({
                  url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${data.companyTransferPayVO.remittanceCode}&amount=${data.companyTransferPayVO.amount}`
                })
                return;
              }
              uni.navigateTo({
                url: `/sub-classify/pages/pay-order/pay-h5?payTal=${data.gomePayH5.payModeList[0].payTal}&totalPrice=${this.totalAmount}&payRecordId=${data.payRecordId}`,
              });
            } else {
              uni.redirectTo({
                url: `/sub-classify/pages/pay-order/pay-success?orderId=${id}`,
              });
            }
          }
        });
        //#endif
      },

      getChangeOrderDetail() {
        this.noData = false;
        this.loading = true;
        const params = {
          changeOrderId: this.changeOrderId || this.msg?.changeOrderId,
        }
        getAreaChangeOrderDetail(params).then((res) => {
          this.loading = false;
          this.detailData = res;
          this.isCardPay = this.cardBalance >= this.detailData.amount
        }).catch((err) => {
          const {data} = err;
          if (data && data.code !== 1) {
            this.noData = true;
            this.message = data.message;
          }
        })

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
    margin: 16rpx 0;
    border-radius: 32rpx;
  }

  .change-money {
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
    border-radius: 32rpx;
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

  .pay-way {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 32rpx;
    background-color: #fff;
    border-radius: 32rpx;

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

  .pay-way .more_pay_icon {
    vertical-align: middle;
    display: inline-block;
    width: 48rpx;
    height: 52rpx;
    background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/more_pay_icon.png");
    background-size: contain;
  }

  .refuse-reason {
    padding: 32rpx 32rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    font-size: 28rpx;
    border-radius: 32rpx;

    .title {
      font-size: 30rpx;
      line-height: 48rpx;
      color: #222222;
    }

    .content {
      margin-top: 16rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #999999;
    }
  }

  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
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

  .view-order {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx 32rpx;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    .btn-view-order {
      width: 160rpx;
      height: 56rpx;
      line-height: 56rpx;
      border: 1rpx solid #eaeaea;
      border-radius: 16rpx;
      text-align: center;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #333333;
    }
  }
</style>
