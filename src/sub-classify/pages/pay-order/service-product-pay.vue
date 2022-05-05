<template>
  <view class="order-container">
    <view v-if="!isShow">
      <uni-popup ref="houseDialog" :mask-click="false">
        <view class="popup-item">
          <view class="popup-title">请选择房产</view>
          <view class="popup-button">
            <view class="popup-ok" @click='backFrom'>取消</view>
            <view class="popup-cancel" @click='chooseHouse'>去选择</view>
          </view>
        </view>
      </uni-popup>
    </view>
    <view v-else>
      <address-picker :houseId="houseId" @emitInfo="emitInfo" :isIMCard="isIMCard" v-if="isShow">
      </address-picker>
      <view class="content">
        <view class="shop-item">
          <view class="shop-name">{{detailData.designerInfo.name}}</view>
          <view class="item-box">
            <view class="goods-item">
              <image :src="detailData.designerInfo.avatar" class="goodsItemImg"></image>
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
                    <text>.{{detailData.serviceMinPrice?(detailData.serviceMinPrice/100).toFixed(2).split(".")[1]:0}}</text>
                    <text>/平米</text>
                  </view>
                  <view class="total-num" v-if="!buySquareMeter">1套</view>
                </view>
                <view class="buy-num" v-if="buySquareMeter">
                  <text v-if="isIMCard">{{buyNum}}㎡</text>
                  <view v-else>
                    <input type="number" v-model="buyNum" /><text>㎡</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="shop-reduce no-send-tip good-tip" v-if="!isInNum">
              <view class="item-reduce-box house-tip">
                <text>你的房屋面积和购买面积不一致，请检查</text>
              </view>
            </view>
          </view>
          <view class="serve-box" v-if="hasMeasure">
            <view class="measuring-title">量房服务</view>
            <view class="shop-reduce no-send-tip good-tip" v-if="!isInArea && !isRemove">
              <view class="item-reduce-box">
                <text>当前地址不在商品服务范围内，请更换地址</text>
              </view>
            </view>
            <view @click="changeServe">
              <view class="measuring-serve" v-if="!isRemove">
                <view class="measuring-price-box">
                  <view class="measuring-price price-font">
                    <view v-if="detailData.measureServiceProduct">
                      现场量房 ¥{{detailData.skuList?(detailData.skuList[0].relatedSkuList[0].price/100).toFixed(2):'0.00'}}
                    </view>
                    <view class="card-icon" @click.stop="readMeasuring('site')"></view>
                  </view>
                  <view class="check-box">
                    <view>修改服务</view>
                    <view class="check-icon" v-if="!isIMCard"></view>
                  </view>
                </view>
                <view class="serve-area" v-if="measuringArea[0] !== 'noArea'">
                  服务区域：
                  <text v-if="!isCountryArea">
                    <text v-for="(v, k) in measuringArea" :key="k">
                      {{(v.province?v.province:"") + (v.city?v.city:"") + (v.area?v.area:"")}}
                      <text v-if="k !== measuringArea.length - 1">,
                      </text>
                    </text>
                  </text>
                  <text v-else>全国</text>
                </view>
              </view>
              <view class="measuring-serve" v-else>
                <view class="measuring-price-box">
                  <view class="measuring-price price-font" @click.stop="readMeasuring('remove')">
                    <view>
                      远程量房
                    </view>
                    <view class="card-icon"></view>
                  </view>
                  <view class="check-box">
                    <view>修改服务</view>
                    <view class="check-icon" v-if="!isIMCard && hasLocalMeasure"></view>
                  </view>
                </view>
                <view class="serve-area">
                  该服务为免费提供项
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="good-store-account is-store">
        <view class="price-font">
          <text>商品总价</text>
          <text>¥{{totalPrice !== 'NaN'?totalPrice: '0.00'}}</text>
        </view>
      </view>
      <view v-if="haveCard" class="pay-way" style="justify-content:center" @click="clickCard">
        <image class="card-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
          mode="">
        </image>
        <view>
          <text>储值卡</text>
          <text class="card-sub">(可用余额:{{(cardBalance/100).toFixed(2)}}元)</text>
        </view>
        <view style="flex:1">
        </view>
        <view v-if="cardClick" class="card-price">
          <text style="margin-right:4rpx ;">-</text> <text style="margin-right:2rpx ;">¥</text>
          {{(this.cardPrice/100).toFixed(2)}}
        </view>
        <image v-if="cardClick" class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/ic_checked.svg" mode="">
        </image>
        <image v-if="!cardClick&&cardBalance" class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_unselected.png" mode="">
        </image>
        <view v-if="!cardClick&&!cardBalance" class="select-disable">
        </view>
      </view>
      <view class="pay-way" :class="{'more_pay':!payChannel}">
        <text>支付方式</text>

        <view v-if="payChannel" class="flex-center">
          <!-- <image
            class="card-img"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
            mode=""
          >
          </image> -->
          <text>储值卡支付</text>

        </view>
        <view v-else @click="morePayWay">
          <text>{{payWayTag?'公司转账':'在线支付'}}</text>
          <view class="more_pay_icon"></view>
        </view>
      </view>
      <view class='remarks'>
        <text>备注</text>
        <view class="remarks-right">
          <textarea type="text" maxlength="200" v-model="remarks" cursor-spacing="15px"
            placeholder-class="text-placeholder"
            style="width:100%;line-height: 46rpx;min-height: 90rpx;height: 85%;overflow: scroll;padding-top: 36rpx;"
            placeholder="选填,说点什么～" />
        </view>
      </view>
      <view class="bottom">
        <view class="agree-box">
          购买即代表您已阅读并同意
          <text class="agreement" @click="goAgreement">《打扮家平台服务协议》</text>
        </view>
        <view class="second-part">
          <view class="total-price-info">
            <text class="info-text1">共{{totalClassNum}}类</text>
            <view class="info-text2">总计：</view>
            <view class="total-money price-font" v-if="Number(totalPrice)">
              ￥
              <text class="mony-text">{{payPrice?String.prototype.split.call(payPrice, ".")[0]: "-"}}</text>
              <text>.{{payPrice?String.prototype.split.call(payPrice, ".")[1]?String.prototype.split.call(payPrice, ".")[1]:"-":"-"}}</text>
            </view>

          </view>
          <button class="pay-button" :class="{'no-pay': (!isInArea && !isRemove) || !isInNum}" @click="pay" ref="test">立即支付</button>
        </view>
      </view>
      <expenses-toast ref='expensesToast' :expensesType="expensesType"></expenses-toast>
      <change-serve-toast v-if="detailData.measureServiceProduct" ref='changeServeToast' @isRemove="isRemoveFn"
        :isPropsRemove="isRemove" :measuringArea="measuringArea" :isCountryArea="isCountryArea"
        :price="detailData.skuList?(detailData.skuList[0].relatedSkuList[0].price/100).toFixed(2):'0.00'">
      </change-serve-toast>
      <pay-way-toast ref='payWayToast' @payWay="payWay"></pay-way-toast>
      <uni-popup ref="payDialog" type="bottom">
        <pay-dialog :payChannel="payChannel" :payChannelPrice="payChannelPrice" @payOrder="payOrder"
          @closePayDialog="closePayDialog"></pay-dialog>
      </uni-popup>
    </view>
  </view>
</template>
<script>
  import {
    payServeOrder,
    getServiceDetail // 获取设计师服务商品信息
  } from "../../../api/classify.js";
  import {
    getBalance
  } from "../../../api/user.js";
  import changeServeToast from "./change-serve-toast.vue";
  import {
    log
  } from "../../../utils/log.js";

  export default {
    components: {
      changeServeToast
    },
    data() {
      return {
        isShow: true,
        hasTime: false,
        time: "",
        hasNoBuyItem: false,
        skuId: 0,
        expensesType: 0,
        remarks: "",
        buyNum: 0,
        orderName: "",
        orderDetails: [],
        totalClassNum: 0,
        totalPrice: "0.00",
        hasCanBuy: false,
        projectId: 0,
        level: 0,
        cardClick: false,
        haveCard: false, //是否有会员卡
        cardBalance: 0, //会员卡余额
        originType: "",
        payWayTag: 0,
        payType: 0,
        isRemove: true, // 是否选择量远程量房
        houseId: 0,
        areaInfo: {},
        measuringArea: [],
        detailData: {},
        isCountryArea: false, // 是否全国范围可量房
        isIMCard: 0, // 是否从聊天推送卡片进入
        isInArea: true, // 地址是否在配送区域
        isInNum: true, // 购买数量是否在范围内
        buySquareMeter: true, // 是否以平米购买
        waitOrderId: 0, // 代付款订单id
        hasMeasure: true, //是否有量房服务
        hasLocalMeasure: true // 是否提供现场量房服务
      };
    },
    computed: {
      payChannel() {
        var res = Number(this.totalPrice) * 100 - this.cardBalance;
        //支付渠道 true 储值卡  false 微信
        if (this.cardClick && res <= 0) {
          return true;
        } else {
          return false;
        }
      },
      payChannelPrice() {
        //提示框价格
        if (!this.payChannel) {
          return (this.cardPrice / 100).toFixed(2);
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
          return this.totalPrice;
        }
      },
    },
    watch: {
      buyNum(v) {
        this.regBuyNum(v)
      }
    },
    onLoad(e) {
      this.houseId = Number(e.houseId ? e.houseId : getApp().globalData.currentHouse.id);
      this.buyNum = Number(e.buyNum);
      this.skuId = Number(e.skuId);
      this.isIMCard = Number(e.isIMCard)
      this.isRemove = JSON.parse(e.remove)
      this.buySquareMeter = JSON.parse(e.buySquareMeter)
      this.getDetail()
    },
    onShow() {
      if (uni.getStorageSync("houseListChooseId")) {
        this.houseId = uni.getStorageSync("houseListChooseId");
        if (this.$refs.houseDialog) {
          this.$refs.houseDialog.close();
        }
      }
      if (!Number(this.houseId) || Number(this.houseId) < 0) {
        this.isShow = false;
        setTimeout(() => {
          if (this.$refs.houseDialog) {
            this.$refs.houseDialog.open();
          }
        });
      } else {
        this.isShow = true;
      }
      if (!getApp().globalData.openId) {
        //确保拿到openId，否则无法支付
        getApp().globalData.openId = uni.getStorageSync("openId");
      }

      this.haveCard = false;
      getBalance().then((e) => {
        if (e != null) {
          this.haveCard = true;
          this.cardBalance = e;
        }
      });
      if (!getApp().globalData.openId) {
        //确保拿到openId，否则无法支付
        getApp().globalData.openId = uni.getStorageSync("openId");
      }
    },
    onUnload() {
      uni.removeStorageSync("houseListChooseId");
    },
    methods: {
      regBuyNum(v) {
        if (!this.isRemove && this.detailData.skuList) {
          this.totalPrice = ((this.detailData.serviceMinPrice * this.buyNum + this.detailData.skuList[0].relatedSkuList[
            0].price) / 100).toFixed((2))
        } else {
          this.totalPrice = (this.detailData.serviceMinPrice * this.buyNum / 100).toFixed(2)
        }
        if (this.detailData.skuList) {
          let maxNum = this.detailData.skuList[0].areaProp ? this.detailData.skuList[0].areaProp.values[0].propValue
            .split('-')[1] : '0'
          let minNum = this.detailData.skuList[0].areaProp ? this.detailData.skuList[0].areaProp.values[0].propValue
            .split('-')[0] : '0'
          if (v != this.areaInfo.insideArea && this.buySquareMeter) {
            this.isInNum = false
          } else {
            this.isInNum = true
          }
        }
      },
      getDetail() {
        getServiceDetail(this.skuId).then((data) => {
          this.detailData = data
          if (!this.isRemove) {
            this.totalPrice = ((data.serviceMinPrice * this.buyNum + data.skuList[0].relatedSkuList[0].price) / 100)
              .toFixed((2))
          } else {
            this.totalPrice = (data.serviceMinPrice * this.buyNum / 100).toFixed(2)
          }
          var res = Number(this.totalPrice) * 100 - this.cardBalance;
          this.cardClick = Number(this.totalPrice) * 100 - this.cardBalance <= 0
          this.regBuyNum(this.buyNum)
          this.hasLocalMeasure = data.localMeasure
          this.hasMeasure = data.localMeasure || productCommonData.data.remoteMeasure
          if (this.hasLocalMeasure) {
            this.measuringArea = data.measureServiceProduct.serviceAreas ? data.measureServiceProduct.serviceAreas :
              ['noArea']
          }
          if (this.measuringArea[0] === 'noArea') {
            return
          }
          this.measuringArea.some(
            (item1, k1) => {
              if (item1.countryId === 0) {
                this.isCountryArea = true
                return this.isInArea = true
              }
              if (item1.cityId) {
                if (item1.areaId) {
                  return (this.isInArea =
                    this.areaInfo.areaId === item1.areaId);
                } else {
                  return (this.isInArea =
                    this.areaInfo.cityId === item1.cityId);
                }
              } else {
                return (this.isInArea =
                  this.areaInfo.provinceId === item1.provinceId);
              }
            }
          );
          if (!this.isInArea) {
            uni.showToast({
              icon: "error",
              title: "很抱歉，当前房屋不在量房范围内",
            });
          }
        })
      },
      isRemoveFn(v) {
        this.isRemove = v
        if (!v) {
          this.totalPrice = ((this.detailData.serviceMinPrice * this.buyNum + this.detailData.skuList[0].relatedSkuList[
            0].price) / 100).toFixed((2))
        } else {
          this.totalPrice = (this.detailData.serviceMinPrice * this.buyNum / 100).toFixed(2)
        }
      },
      readMeasuring(type) {
        if (!this.hasLocalMeasure && type !== 'remove') {
          return
        }
        uni.navigateTo({
          url: `/sub-classify/pages/product-detail/service-measuring-text?productId=&type=${type}`,
        });
      },
      changeServe() {
        if (this.isIMCard && !this.hasLocalMeasure) {
          return
        }
        this.$refs.changeServeToast.showPupop();
      },
      confirmOrderPop() {
        uni.navigateTo({
          url: `../../../sub-my/pages/my-order/order-detail/order-detail?orderId=${this.waitOrderId}&from=waitPayOrder`
        });
      },
      payWay(payWayTag) {
        this.payWayTag = payWayTag
        if (this.payWayTag) {
          this.payType = 6
        }
      },
      morePayWay() {
        this.$refs.payWayToast.showPupop();
      },
      closePayDialog() {
        this.$refs.payDialog.close();
      },
      clickCard() {
        if (this.cardBalance) {
          this.cardClick = !this.cardClick;
          if (this.cardClick) {
            this.payType = 0
          }
        }
      },
      backFrom() {
        uni.navigateBack();
      },
      chooseHouse() {
        uni.navigateTo({
          url: "/sub-my/pages/my-house/my-house?isEdit=0",
        });
      },
      goAgreement() {
        uni.navigateTo({
          url: "/sub-classify/pages/pay-order/agreement",
        });
      },
      readExpenses(num) {
        this.expensesType = num;
        this.$refs.expensesToast.showPupop();
      },
      emitInfo(val) {
        this.areaInfo.provinceId = val.provinceId
        this.areaInfo.cityId = val.cityId
        this.areaInfo.areaId = val.areaId
        this.areaInfo.insideArea = val.insideArea
        this.measuringArea.some(
          (item1, k1) => {
            if (item1.countryId === 0) {
              this.isCountryArea = true
              return this.isInArea = true
            }
            if (item1.cityId) {
              if (item1.areaId) {
                return (this.isInArea =
                  this.areaInfo.areaId === item1.areaId);
              } else {
                return (this.isInArea =
                  this.areaInfo.cityId === item1.cityId);
              }
            } else {
              return (this.isInArea =
                this.areaInfo.provinceId === item1.provinceId);
            }
          }
        );
        if (!this.isInArea) {
          uni.showToast({
            icon: "error",
            title: "很抱歉，当前房屋不在量房范围内",
          });
        }
        this.regBuyNum(this.buyNum)
      },

      pay() {
        if((!isInArea && !isRemove) || !isInNum) {
          return
        }
        if (this.cardClick) {
          this.$refs.payDialog.open();
          return;
        }
        this.payOrder();
      },
      payOrder() {
        let details
        if (this.isRemove && this.hasMeasure) {
          details = [{
            relationId: this.skuId,
            type: 6,
            businessType: 61,
            number: this.buyNum,
            origin: this.originType
          }];
        } else {
          details = [{
            relationId: this.skuId,
            type: 6,
            businessType: 61,
            number: this.buyNum,
            origin: this.originType
          }, {
            relationId: this.detailData.skuList[0].relatedSkuList[0].id,
            type: 6,
            businessType: 61,
            number: 1,
            origin: this.originType
          }];
        }
        uni.$emit("submitOrder"); // 购物车需要的逻辑
        let orderPrice = Number(
          Number(this.totalPrice).toFixed(2).replace(".", "")
        );
        //#ifdef MP-WEIXIN
        let params = {
          payType: this.payType ? this.payType : 1, //"int //支付方式  1微信支付",
          openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
          projectId: this.projectId, //"long //项目id  非必须 默认0",
          customerId: 0, //"long //业主id  非必须 默认0",
          estateId: this.houseId, //"long //房产id   非必须 默认0",
          sourceId: 100,
          total: orderPrice, //"int //总计",
          remarks: this.remarks, //"string //备注",
          isCardPay: this.cardClick,
          details: details
        };
        payServeOrder(params).then((data) => {
          if (this.payWayTag) {
            uni.redirectTo({
              url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${data.companyTransferPayVO.remittanceCode}&amount=${data.companyTransferPayVO.amount}`
            })
            return;
          }
          const {
            wechatPayJsapi,
            cardPayComplete
          } = data;
          if (!cardPayComplete) {
            uni.requestPayment({
              provider: "wxpay",
              ...wechatPayJsapi,
              success(res) {
                console.log("付款成功", res);
                if (data.subOrderIds && data.subOrderIds.length === 1) {
                  uni.navigateTo({
                    url: "/sub-classify/pages/pay-order/pay-success?orderId=" +
                      data.subOrderIds[0],
                  });
                } else {
                  uni.navigateTo({
                    url: "/sub-classify/pages/pay-order/pay-success?orderId=" +
                      data.id,
                  });
                }
              },
              fail(e) {
                console.log(e, "取消付款");
                if (data.subOrderIds && data.subOrderIds.length === 1) {
                  uni.navigateTo({
                    url: `../../../sub-my/pages/my-order/order-detail/order-detail?orderId=${data.subOrderIds[0]}&from=waitPayOrder`
                  });
                } else {
                  uni.navigateTo({
                    url: `../../../sub-my/pages/my-order/order-detail/order-detail?orderId=${data.id}&from=waitPayOrder`
                  });
                }
                log({
                  type: "wx-pay-fail",
                  page: "pay-order/index",
                  data: e,
                  openId: getApp().globalData.openId,
                  openIdLocal: uni.getStorageSync("openId"),
                });
              },
            });
          } else {
            uni.navigateTo({
              url: "/sub-classify/pages/pay-order/pay-success?orderId=" + data.id,
            });
          }
        }).catch(e => {
          this.$refs.payDialog.close();
        });
        //#endif
        //#ifdef H5
        let params = {
          payType: 3, //"int //支付方式  1微信支付",
          deviceType: 2,
          openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
          projectId: this.projectId, //"long //项目id  非必须 默认0",
          customerId: 0, //"long //业主id  非必须 默认0",
          houseId: this.houseId, //"long //房产id   非必须 默认0",
          total: orderPrice, //"int //总计",
          remarks: this.remarks, //"string //备注",
          orderName: "", //"string //订单名称 可为空",
          details: details,
          isCardPay: this.cardClick,
          origin: this.originType
        };
        payOrderApi(params).then((data) => {
          if (this.payWayTag && this.payType) {
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${data.companyTransferPayVO.remittanceCode}&amount=${data.companyTransferPayVO.amount}`
            })
            return;
          }
          if (!data.cardPayComplete) {
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/pay-h5?payTal=${data.gomePayH5.payModeList[0].payTal}&totalPrice=${orderPrice}&payRecordId=${data.payRecordId}`,
            });
          } else {
            uni.navigateTo({
              url: "/sub-classify/pages/pay-order/pay-success?orderId=" + data.id,
            });
          }
        });
        //#endif
      }
    },
  };
</script>
<style lang="scss" scoped>
  .mt26 {
    margin-top: 26rpx;
    font-size: 24rpx;
  }

  .mt26 .fee {
    font-size: 28rpx;
  }

  .mt26 .total-fee {
    font-size: 32rpx;
  }

  .select-disable {
    width: 36rpx;
    height: 36rpx;
    background: #f5f5f5;
    border: 1rpx solid #e8e8e8;
    border-radius: 50%;
    margin-left: 16rpx;
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

  .order-container {
    width: 100%;
    overflow: scroll;
    background: #f5f6f7;
    color: #333333;
    padding-bottom: 300rpx;
  }

  .question-box {
    width: fit-content !important;
    position: relative;
    display: inline-block !important;
  }

  .question-icon {
    position: absolute;
    width: 30rpx;
    height: 28rpx;
    top: 6rpx;
    margin-left: 2rpx;
    background-image: url("../../static/image/question.png");
    background-size: cover;
  }

  .item-reduce-box .question-box .free-icon {
    top: 14rpx;
  }

  // 商品item
  .content {
    background-color: #ffffff;
    border-radius: 32rpx;
    overflow: hidden;
  }

  .shop-item {
    margin-top: 25rpx;
    padding: 0 32rpx;
  }

  .shop-name {
    height: 106rpx;
    line-height: 106rpx;
  }

  .item-box {
    flex-wrap: wrap;
    padding-bottom: 24rpx;
    border-bottom: 1rpx solid #F4F4F4;
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

  .serve-box {
    padding: 22rpx 0;
  }

  .serve-box .measuring-title {
    font-size: 28rpx;
    color: #333333;
  }

  .serve-box .measuring-serve {
    padding: 28rpx 32rpx;
    border: 1rpx solid #F0F0F0;
    border-radius: 16rpx;
    background-color: #FAFAFA;
    margin-top: 24rpx;
  }

  .measuring-serve .measuring-price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333333;
    font-size: 28rpx;
  }

  .measuring-serve .check-box {
    font-size: 24rpx;
    display: flex;
  }

  .check-box .check-icon {
    width: 36rpx;
    height: 36rpx;
    background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/more_pay_icon.png");
    background-size: contain;
  }

  .measuring-serve .serve-area {
    margin-top: 14rpx;
    font-size: 22rpx;
    color: #999999;
  }

  .measuring-price {
    display: flex;
    align-items: center;
  }

  .measuring-price .card-icon {
    width: 24rpx;
    height: 24rpx;
    background-image: url("../../static/image/read-icon.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: 12rpx;
    padding-right: 20rpx;
  }

  .safeguard {
    padding: 2rpx 6rpx;
    border: 1rpx solid rgba(255, 51, 71, 0.18);
    color: #ff3347;
    font-size: 20rpx;
    width: fit-content;
    border-radius: 6rpx;
  }

  .safe-icon {
    position: static;
    display: inline-block;
    width: 18rpx;
    height: 18rpx;
    background-image: url("../../static/image/safe-question.png");
  }

  .goods-money {
    font-size: 24rpx;
    color: #333333;
    vertical-align: bottom;
    font-weight: bold;
  }

  .goods-money .integer-price {
    font-size: 30rpx;
  }

  .cost-detail {
    border-top: 2rpx solid #f2f2f2;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #999999;
    display: flex;
    flex-wrap: wrap;
    height: 140rpx;
    align-content: space-around;
  }

  .cost-detail view {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cost-detail view text:nth-child(2) {
    corlor: #333333;
  }

  .shop-reduce {
    position: relative;
    height: 56rpx;
    margin-top: 36rpx;
  }

  .item-reduce-box {
    height: 56rpx;
    width: 666rpx;
    line-height: 56rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
    padding-left: 20rpx;
    color: #ff3347;
    font-size: 22rpx;
    position: absolute;
    bottom: 16rpx;
  }

  .serve-box .shop-reduce {
    margin-top: 24rpx;
  }

  .house-tip {
    background-color: #FFF7F0 !important;
    color: #FC8B19 !important;
  }

  .item-reduce-box .question-icon {
    top: 0;
  }

  .no-send-tip .item-reduce-box {
    background-color: #fff6f7;
    color: #ff3347;
  }

  .choose-time {
    width: 100%;
  }

  .time-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .time-bar text {
    font-size: 28rpx;
    color: #333333;
  }

  .choose-icon {
    width: 40rpx;
    height: 40rpx;
  }

  .good-store-account {
    padding: 35rpx 32rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    border-radius: 32rpx;
    overflow: hidden;
  }

  .good-store-account view {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .good-store-account .is-store {
    height: 170rpx;
  }

  .good-store-account .store-read {
    color: #666666;
    font-size: 24rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
  }

  .total-deposit {
    padding: 0 !important;
  }

  .pay-way,
  .pledge,
  .remarks {
    padding: 5rpx 32rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 104rpx;
    line-height: 104rpx;
    overflow: hidden;
    border-radius: 32rpx;
  }

  .more_pay {
    padding-right: 10rpx;
  }

  .pay-way .more_pay_icon {
    vertical-align: middle;
    display: inline-block;
    width: 48rpx;
    height: 52rpx;
    background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/more_pay_icon.png");
    background-size: contain;
    margin-right: 12rpx;
  }

  .remarks {
    overflow: hidden;
  }

  .remarks view {
    flex: 1;
    overflow: scroll;
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

  .bottom {
    padding: 24rpx 32rpx 50rpx 32rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 26rpx;
    z-index: 10;
  }

  .bottom .agree-box {
    color: #999999;
  }

  .bottom .agreement {
    color: #333333;
  }

  .bottom .second-part {
    margin-top: 32rpx;
    height: 88rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bottom .total-price-info {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex: 1;
    flex-wrap: wrap;
  }

  .total-price-info .info-text1 {
    font-family: PingFangSC, PingF;
    color: #999999;
    width: 100%;
  }

  .total-price-info .info-text2 {
    font-family: PingFangSC, PingF;
    color: #111111;
    font-weight: 500;
  }

  .total-price-info .info-text2 {
    font-family: PingFangSC, PingF;
    color: #111111;
    font-weight: 500;
  }

  .total-price-info .total-money {
    color: #ff3347;
    font-weight: 500;
  }

  .total-money .mony-text {
    font-size: 48rpx;
  }

  .bottom .pay-button {
    width: 248rpx;
    height: 88rpx;
    background: linear-gradient(114.87deg, #FA3B34 23.76%, #FF6A33 93.55%);
    border-radius: 6px;
    color: #ffffff;
    font-size: 32rpx;
    line-height: 88rpx;
    text-align: center;
  }

  .bottom .no-pay {
    opacity: 0.4;
    background: linear-gradient(114.87deg, #FA3B34 23.76%, #FF6A33 93.55%);
  }

  .popup-item {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 560rpx;
    height: 212rpx;
    background: #ffffff;
    border-radius: 24rpx;
  }

  .house-item {
    height: 250rpx;
    overflow: hidden;
  }

  .popup-item .popup-title {
    height: 128rpx;
    line-height: 128rpx;
    border-bottom: 1rpx solid #f5f5f5;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #111111;
  }

  .house-item .house-popup {
    box-sizing: border-box;
    padding: 40rpx 10rpx;
    height: 160rpx;
    line-height: 1.6em;
  }

  .popup-item .popup-button {
    display: flex;
  }

  .popup-item .house-button {
    height: 100rpx;
  }

  .popup-item .house-button view {
    height: 100% !important;
    border-right: 1px solid #f5f5f5;
  }

  .popup-item .popup-button view {
    height: 82rpx;
    line-height: 84rpx;
    text-align: center;
  }

  .popup-button .popup-ok {
    width: 50%;
    border-right: 1rpx solid #f5f5f5;
  }

  .popup-button .popup-cancel {
    flex: 1;
    color: #00bfb6;
  }

  .popup-order {
    justify-content: center;
    text-align: center;
    line-height: 84rpx;
    color: #FA3B34;
  }
</style>
