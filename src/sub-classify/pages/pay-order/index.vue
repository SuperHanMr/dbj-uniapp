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
      <address-picker :houseId="houseId" :productType="productType" @emitInfo="emitInfo" @typeServe2="typeServe2" :originFrom="originFrom" :addUser="addUser"
        v-if="isShow">
      </address-picker>
      <view class="content">
        <view class="shop-item" v-for="(shopItem, shopIndex) in orderInfo.storeInfos" :key="shopIndex">
          <view class="shop-name" v-if="shopItem.skuInfos.length">{{shopItem.storeName}}</view>
          <view class="goods-item item-box" v-for="(goodsItem, goodIndex) in shopItem.skuInfos" :key="goodIndex">
            <view class="goods-item">
              <image :src="goodsItem.imageUrl" class="goodsItemImg"></image>
              <!-- <image src="https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png" class="goodsItemImg"></image> -->
              <view class="goods-info">
                <view class="goods-desc">
                  <text class="goods-type">{{goodsItem.productType=== 1?"物品":"服务"}}</text>
                  {{goodsItem.spuName}}
                </view>
                <view class="spu-class">
                  <view class='tag'>{{levelName}}{{levelName?'|':''}}{{goodsItem.skuName}}</view>
                  <view class="total-num">共{{goodsItem.buyCount}}{{goodsItem.unit?goodsItem.unit:""}}</view>
                </view>
                <view class="goods-spec">
                  <view class="goods-money">
                    ￥
                    <text
                      class="integer-price">{{String(goodsItem.price).split(".")[0]?String(goodsItem.price).split(".")[0]:0}}</text>
                    <text>.{{String(goodsItem.price).split(".")[1]?String(goodsItem.price).split(".")[1]:0}}</text>
                    <text>/{{goodsItem.unit?goodsItem.unit:""}}</text>
                  </view>
                  <view v-if="Number(goodsItem.deposit)">押金 ¥{{goodsItem.deposit}}</view>
                </view>
              </view>
            </view>
            <view class="shop-reduce no-send-tip good-tip" v-if="goodsItem.errorType">
              <view class="item-reduce-box" v-if="goodsItem.errorType">
                <text v-if="goodsItem.errorType === 1">不在服务范围</text>
                <text v-if="goodsItem.errorType === 2">不在配送范围</text>
                <text v-if="goodsItem.errorType === 3">该房屋下已购买该服务，不可重复购买</text>
                <text v-if="goodsItem.errorType === 4 && cancelDialog">该服务需精算师指导下完成</text>
                <text v-if="goodsItem.errorType === 5 && cancelDialog">该服务需管家指导下完成</text>
                <text v-if="goodsItem.errorType === 6">您已跳过该工序，不可购买</text>
                <text v-if="goodsItem.errorType === 7">暂不可购买，请在精算服务结束后于精算单中购买</text>
                <text v-if="goodsItem.errorType === 8 && cancelDialog">请从装修页面查询购买</text>
                <text v-if="goodsItem.errorType === 9">暂不可购买，请在管家服务结束后于精算单中购买</text>
              </view>
            </view>
            <view class="choose-time" v-if="productType === 2 && goodsItem.appointmentRequired">
              <view class="time-bar" @click='chooseTime(shopIndex, goodIndex)'>
                <view v-if="!time"><text style="color: #FF3347">* </text> 请选择上门时间</view>
                <text v-else>{{time}}</text>
                <image class="choose-icon" src="../../../static/images/ic_more_black.png"></image>
              </view>
            </view>
          </view>
          <view class="cost-detail" v-if="(shopItem.deliveryFee || shopItem.totalHandlingFee) && productType === 1">
            <view v-if="shopItem.deliveryFee">
              <text>运费</text>
              <text>¥{{shopItem.deliveryFee}}</text>
            </view>
            <view v-if="shopItem.totalHandlingFee">
              <text>搬运费</text>
              <text>¥{{shopItem.totalHandlingFee}}</text>
            </view>
          </view>
          <view class="shop-reduce" v-if="shopItem.freeDeliveryCount && productType === 1">
            <view class="item-reduce-box">
              <view class="question-box">本订单已获得了该店铺{{shopItem.freeDeliveryCount}}次免运费权益
                <text class="question-icon free-icon" @click="readExpenses(0)"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="good-store-account" v-if="!orderInfo.hasStock">
        <view>
          <text>商品总价</text>
          <text v-if="Number(orderInfo.totalPrice)">¥{{orderInfo.totalPrice}}</text>
          <text v-else>¥- -</text>
        </view>
        <view v-if="Number(orderInfo.totalDeliveryFee)">
          <view class="question-box">
            总运费
            <text class="question-icon" @click="readExpenses(1)"></text>
          </view>
          <text>¥{{orderInfo.totalDeliveryFee}}</text>
        </view>
        <view v-if="Number(orderInfo.totalHandlingFee)">
          <view class="question-box">
            总搬运费
            <text class="question-icon" @click="readExpenses(2)"></text>
          </view>
          <text>¥{{orderInfo.totalHandlingFee}}</text>
        </view>
      </view>
      <view class="good-store-account is-store" v-else>
        <view>
          <text>商品总价</text>
          <text>¥{{orderInfo.totalPrice}}</text>
        </view>
        <view class="store-read" v-if="productType === 1">
          <text>
            当前费用不包含运费和搬运费，具体费用会在要货时进行结算
          </text>
        </view>
      </view>
      <view class="pledge" v-if="Number(orderInfo.totalDeposit)">
        <text>总押金</text>
        <text>¥{{orderInfo.totalDeposit}}</text>
      </view>
      <view class="pay-way">
        <text>支付方式</text>
        <view>
          <view class="wechat_icon"></view><text>微信支付</text>
        </view>
      </view>
      <view class='remarks'>
        <text v-model="remarks">备注</text>
        <view>
          <input type="text" placeholder="选填,说点什么～">
        </view>
      </view>
      <view class="bottom">
        <view>
          购买即代表您已阅读并同意
          <text class="agreement" @click="goAgreement">《打扮家服务用户协议》</text>
        </view>
        <view class="second-part">
          <view class="total-price-info">
            <text class="info-text1">共{{totalClassNum}}类，</text>
            <view class="info-text2">总计：</view>
            <view class="total-money" v-if="Number(totalPrice)">
              ￥
              <text class="mony-text">{{totalPrice?String.prototype.split.call(totalPrice, ".")[0]: "-"}}</text>
              <text>.{{totalPrice?String.prototype.split.call(totalPrice, ".")[1]?String.prototype.split.call(totalPrice, ".")[1]:"-":"-"}}</text>
            </view>
            <view v-else>
              ¥ --
            </view>
          </view>
          <button class="pay-button" :class="{'no-pay': !hasCanBuy || hasNoBuyItem}" @click="pay"
            ref="test">立即支付</button>
        </view>
      </view>
      <expenses-toast ref='expensesToast' :expensesType="expensesType"></expenses-toast>
      <date-picker ref='datePicker' @getTime="getTime"></date-picker>
      <order-toast ref='orderToast' :houseId="houseId" :hasCanBuy="hasCanBuy" :noStoreInfos="noStoreInfos"
        @toastConfirm="toastConfirm"></order-toast>
      <uni-popup ref="cancelDialog" :mask-click="false">
        <view class="popup-item">
          <view class="popup-title">{{toastText}}</view>
          <view class="popup-button">
            <view class="popup-ok" @click='cancelGoodPop'>取消</view>
            <view class="popup-cancel" @click='confirmGoodPop'>去购买</view>
          </view>
        </view>
      </uni-popup>
      <uni-popup ref="houseDialog" :mask-click="false">
        <view class="popup-item house-item">
          <view class="popup-title house-popup">由于服务类商品的特殊属性，请前往首页切换地址后重新购买</view>
          <view class="popup-button house-button">
            <view class="popup-cancel" @click='confirmHousePop'>前往</view>
            <view class="popup-ok" @click='cancelHousePop'>取消</view>
          </view>
        </view>
      </uni-popup>
      <uni-popup ref="timeDialog" :mask-click="false">
        <view class="popup-item">
          <view class="popup-title">请选择期望上门时间</view>
          <view class="popup-button">
            <view class="popup-cancel" @click='confirmTimePop'>确定</view>
          </view>
        </view>
      </uni-popup>
    </view>

  </view>
</template>
<script>
  import {
    getAddWorker,
    getDetailInfo,
    payOrder
  } from '../../../api/classify.js'
  import orderToast from "./order-toast.vue"
  import datePicker from "./date-picker.vue"
  // import expensesToast from "./expenses-toast.vue"
  export default {
    components: {
      orderToast,
      datePicker
    },
    data() {
      return {
        isShow: true,
        hasTime: false,
        time: '',
        shopIndex: 0,
        goodIndex: 0,
        originFrom: "",
        orderCartParams: {},
        addressInfo: {},
        orderInfo: {},
        canStoreInfos: {},
        noStoreInfos: {},
        hasNoBuyItem: false,
        houseId: 0,
        addUser: [],
        goodDetailId: 0,
        buyCount: 0,
        skuId: 0,
        storeId: 0,
        unit: '',
        estateId: 0,
        expensesType: 0,
        productType: 1,
        frontendServe: '',
        toastType: 0,
        toastText: '',
        tipTest: '',
        remarks: '',
        orderName: '',
        orderDetails: [],
        totalClassNum: 0,
        totalPrice: '0.00',
        hasCanBuy: false,
        projectId: 0,
        level: 0,
        levelName: "",
        cancelDialog: false
      }
    },
    onLoad(e) {
      // 购物车数据
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        this.orderCartParams = data
        this.originFrom = data.originFrom
      })
      // 小程序数据
      if (e.from) {
        this.originFrom = e.from
      }
      this.houseId = e.houseId ? e.houseId : getApp().globalData.currentHouse.id
      this.buyCount = e.buyCount
      this.skuId = e.skuId
      this.storeId = e.storeId
      this.unit = e.unit
      this.level = e.level
      this.goodDetailId = uni.getStorageSync('goodId')
    },
    onShow() {
      if (uni.getStorageSync('houseListChooseId')) {
        this.houseId = uni.getStorageSync('houseListChooseId')
        console.log(this.houseId, "this.houseId")
        if (this.$refs.houseDialog) {
          this.$refs.houseDialog.close()
        }
      }
      if (!Number(this.houseId)) {
        this.isShow = false
        setTimeout(() => {
          if (this.$refs.houseDialog) {
            this.$refs.houseDialog.open()
          }
        })
      } else {
        this.isShow = true
      }
      this.addUser = []
    },
    onUnload() {
      uni.removeStorageSync('houseListChooseId')
    },
    methods: {
      backFrom() {
        uni.navigateBack()
      },
      chooseHouse() {
        uni.navigateTo({
          url: "/sub-my/pages/my-house/my-house?isEdit=0"
        })
      },
      goAgreement() {
        uni.navigateTo({
          url: "/sub-classify/pages/pay-order/agreement"
        })
      },
      readExpenses(num) {
        this.expensesType = num
        this.$refs.expensesToast.showPupop()
      },
      getTime(val) {
        this.time = val[0] + '年' + val[1] + '月' + val[2] + '日' + val[3] + '时' + val[4] + '分'
        this.$set(this.orderInfo.storeInfos[this.shopIndex].skuInfos[this.goodIndex], "doorTime", this.time)
      },
      typeServe2() {
        this.$refs.houseDialog.open()
      },
      confirmHousePop() {
        uni.switchTab({
            url: '/pages/home/index/index'
        });
      },
      cancelHousePop() {
        this.$refs.houseDialog.close()
      },
      emitInfo(val) {
        this.hasCanBuy = false
        this.hasNoBuyItem = false
        this.projectId = val.projectId
        this.orderDetails = []
        this.addressInfo = val
        this.estateId = val.id ? val.id : 0
        let params = {}
        if (this.originFrom === 'h5GoodDetail') {
          params = {
            skuInfos: [{
              skuId: this.skuId,
              storeId: this.storeId,
              buyCount: this.buyCount,
              unit: this.unit ? this.unit : "",
              level: this.level
            }],
            estateId: this.estateId
          }
        } else if (this.originFrom === 'shopCart') {
          params = {
            skuInfos: this.orderCartParams.skuInfos,
            estateId: this.estateId
          }
        }
        getDetailInfo(params).then((data) => {
          this.totalPrice = (data.totalPrice + data.totalDeliveryFee + data.totalHandlingFee + data.totalDeposit -
            data.totalDiscount).toFixed(2)
          let dataInfo = data
          this.orderInfo = dataInfo
          this.noStoreInfos = JSON.parse(JSON.stringify(dataInfo))
          this.noStoreInfos.storeInfos = []
          this.canStoreInfos = JSON.parse(JSON.stringify(dataInfo))
          this.canStoreInfos.storeInfos = []
          this.orderInfo.storeInfos.map((storeItem, storeK) => {
            let noStoreItem = JSON.parse(JSON.stringify(storeItem))
            noStoreItem.skuInfos = []
            let canStoreItem = JSON.parse(JSON.stringify(storeItem))
            canStoreItem.skuInfos = []
            this.noStoreInfos.storeInfos.push(noStoreItem)
            this.canStoreInfos.storeInfos.push(canStoreItem)
            storeItem.skuInfos.map((skuItem, skuK) => {
              switch (skuItem.level) {
                case 1:
                  this.levelName = '中级'
                  break;
                case 2:
                  this.levelName = '高级'
                  break;
                case 3:
                  this.levelName = '特高级'
                  break;
                case 4:
                  this.levelName = '钻石级'
                  break;
              }
              this.productType = skuItem.productType
              // 头部补人工数据
              if (skuItem.addingJobName) {
                this.addUser.push({
                  addingJobName: skuItem.addingJobName,
                  addingUserName: skuItem.addingUserName,
                  addingUserId: skuItem.addingUserId
                })
              }
              if(skuItem.appointmentRequired){
                this.hasTime = true
              }
              // 结算可配送和不可配送数据
              if (skuItem.errorType) {
                noStoreItem.skuInfos.push(skuItem)
                if (skuItem.errorType === 4) {
                  this.toastType = 4
                  this.toastText = "该服务需精算师指导下完成"
                  if (this.$refs.cancelDialog.open) {
                    this.$refs.cancelDialog.open()
                  }
                } else if (skuItem.errorType === 5) {
                  this.toastType = 5
                  this.toastText = "该服务需管家指导下完成"
                  if (this.$refs.cancelDialog.open) {
                    this.$refs.cancelDialog.open()
                  }
                } else if (skuItem.errorType === 8) {
                  this.toastType = 8
                  this.toastText = "请从装修页面查询购买"
                  if (this.$refs.cancelDialog.open) {
                    this.$refs.cancelDialog.open()
                  }
                }
                this.hasNoBuyItem = true // 判断所有数据中有没有不可配送数据
              } else {
                this.hasCanBuy = true
                canStoreItem.skuInfos.push(skuItem)
                this.totalClassNum += 1
                // 整理出结算参数
                let orderDetailItem = {
                  "relationId": skuItem.skuId, //实体id,
                  "type": skuItem.productType, //1材料  2服务   3专项付款,
                  "businessType": skuItem.categoryTypeId, //业务类型,
                  "roleType": skuItem.roleType ? Number(skuItem.roleType) :
                  0, //角色类型  7工人  10管家  购买工人和管家时参数必传,
                  "workType": skuItem.workType ? Number(skuItem.workType) : -2, //工种类型 购买工人时参数必传,
                  "level": skuItem.level, //等级  0中级  1高级 2特级  3钻石",
                  "storeId": storeItem.storeId, //店铺id,
                  "storeType": 0, //店铺类型 0普通 1设计师",
                  "number": skuItem.buyCount, //购买数量",
                  "params": {}, //与订单无关的参数 如上门时间 doorTime
                }
                this.orderDetails.push({
                  orderDetailItem: orderDetailItem,
                  paramsInfo: skuItem
                })
              }
            })
          })
          if (this.orderInfo.storeInfos.length > 1 || this.orderInfo.storeInfos[0].skuInfos.length > 1) {
            this.orderInfo = this.canStoreInfos
            if (this.hasNoBuyItem) {
              this.$refs.orderToast.showPupop()
            }
          }
          if (this.orderInfo.storeInfos.length === 1) {
            this.totalClassNum = 1
          }
        })
      },
      chooseTime(shopIndex, goodIndex) {
        this.shopIndex = shopIndex
        this.goodIndex = goodIndex
        this.$refs.datePicker.showDatePicker()
      },
      toastConfirm() {
        this.hasNoBuyItem = false
      },
      pay() {
        if(this.hasTime && !this.time) {
          this.$refs.timeDialog.open()
          return
        }
        if (!this.hasCanBuy || this.hasNoBuyItem || !this.totalPrice) {
          return
        }
        let details = []
        this.orderDetails.map((v, k) => {
          details.push(v.orderDetailItem)
          Object.keys(v.paramsInfo).map((item, index) => {
            if (item === 'doorTime') {
              v.orderDetailItem.params[item] = v.paramsInfo.doorTime
            }
          })
        })
        let params = {
          payType: 1, //"int //支付方式  1微信支付",
          openid: uni.getStorageSync("openId"), //"string //微信openid 小程序支付用 app支付不传或传空",
          projectId: this.projectId, //"long //项目id  非必须 默认0",
          customerId: 0, //"long //业主id  非必须 默认0",
          estateId: this.estateId, //"long //房产id   非必须 默认0",
          total: this.totalPrice * 100, //"int //总计",
          remarks: this.remarks, //"string //备注",
          orderName: "", //"string //订单名称 可为空",
          details: details
        }
        payOrder(params).then(data => {
          const {
            wechatPayJsapi
          } = data
          uni.requestPayment({
            provider: "wxpay",
            ...wechatPayJsapi,
            success(res) {
              console.log("付款成功", res)
              uni.navigateTo({
                url: "/sub-classify/pages/pay-order/pay-success?orderId=" + data.id
              })
            },
            fail(e) {
              console.log(e, "取消付款");
              uni.navigateTo({
                url: `/sub-my/pages/my-order/order-wait-pay/order-wait-pay?orderNo=${data.id}&from=waitPayOrder`
              })
            },
          });
        })
      },
      cancelGoodPop() {
        this.cancelDialog = true
        this.$refs.cancelDialog.close()
      },
      confirmGoodPop() {
        if (this.toastType === 4) {
          uni.navigateTo({
            url: "/sub-classify/pages/search-result/search-result?searchText=" + "精算"
          })
        } else if (this.toastType === 5) {
          uni.switchTab({
            url: "/pages/decorate/index/index"
          })
        } else if (this.toastType === 8) {
          uni.switchTab({
            url: "/pages/decorate/index/index"
          })
        }
      },
      confirmTimePop() {
        this.$refs.timeDialog.close()
      }
    }
  }
</script>

<style scoped>
  .order-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f5f6f7;
    color: #333333;
    padding-bottom: 300rpx;
  }

  // 问号图标模型布局
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
    background-image: url('../../static/image/question.png');
    background-size: cover;
  }

  .item-reduce-box .question-box .free-icon {
    top: 14rpx;
  }

  // 商品item
  .shop-item {
    margin-top: 25rpx;
    padding: 0 32rpx;
    background-color: #FFFFFF;
  }

  .shop-name {
    height: 106rpx;
    line-height: 106rpx;
  }

  .item-box {
    flex-wrap: wrap;
  }

  .goods-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 20rpx;
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
    width: 420rpx;
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
  }

  .goods-info .goods-desc .goods-type {
    width: 60rpx;
    height: 30rpx;
    padding: 2rpx 10rpx 2rpx 10rpx;
    margin-right: 4rpx;
    border: 2rpx solid #35c4c4;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #35c4c4;
    line-height: 28rpx;
    text-align: center;
  }

  .goods-info .goods-spec {
    width: fit-content;
    text-overflow: ellipsis;
    padding: 0 4rpx;
    margin-top: 2rpx;
    font-size: 22rpx;
    display: flex;
    position: absolute;
    bottom: 0;
    align-items: baseline;
  }

  .goods-info .spu-class {
    position: relative;
  }

  .goods-info .tag {
    font-size: 22rpx;
    color: #999999;
    position: absolute;
    padding: 0 10rpx;
    line-height: 38rpx;
    text-align: center;
    background-color: #fafafa;
    border: 2rpx solid #f0f0f0;
    border-radius: 6rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 360rpx;
    text-align: left;
  }

  .goods-info .total-num {
    top: 0;
    right: 0;
    font-size: 28rpx;
    color: #999999;
    position: absolute;
  }

  .goods-money {
    font-size: 24rpx;
    color: #333333;
    vertical-align: bottom;
    font-weight: bold;
    margin-right: 30rpx;
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
    corlor: #333333
  }

  .shop-reduce {
    position: relative;
    height: 56rpx;
  }

  .item-reduce-box {
    height: 56rpx;
    width: 666rpx;
    line-height: 56rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
    padding-left: 20rpx;
    color: #00bfb6;
    font-size: 22rpx;
    position: absolute;
    bottom: 16rpx;
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
    width: 32rpx;
    height: 32rpx;
  }

  .good-store-account {
    padding: 35rpx 32rpx;
    background-color: #FFFFFF;
    margin-top: 25rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
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
    height: 58rpx;
    line-height: 58rpx;
    text-align: center;
    background-color: #fafafa;
    border-radius: 8rpx;
  }

  .pay-way,
  .pledge,
  .remarks {
    padding: 5rpx 32rpx;
    background-color: #FFFFFF;
    margin-top: 25rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 104rpx;
    line-height: 104rpx;
  }

  .pay-way .wechat_icon {
    vertical-align: sub;
    display: inline-block;
    width: 32rpx;
    height: 32rpx;
    background-image: url("../../static/image/wechat_icon.png");
    background-size: contain;
    margin-right: 12rpx;
  }

  .remarks text {
    width: 180rpx;
  }

  .remarks view {
    flex: 1;
  }

  .bottom {
    padding: 24rpx 32rpx 50rpx 32rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 26rpx;
    z-index: 10;
  }

  .bottom .agreement {
    color: #FFA94F;
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
  }

  .total-price-info .info-text1 {
    font-family: PingFangSC, PingF;
    color: #999999;
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
    background: linear-gradient(135deg, #00bfaf, #00bfbc);
    border-radius: 6px;
    color: #FFFFFF;
    font-size: 32rpx;
    line-height: 88rpx;
    text-align: center;
  }

  .bottom .no-pay {
    opacity: 0.4;
    background: linear-gradient(135deg, #00bfaf, #00bfbc);
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
  .house-item{
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
  .house-item .house-popup{
    box-sizing: border-box;
    padding: 40rpx 10rpx;
    height: 160rpx;
    line-height: 1.6em;
  }
  .popup-item .popup-button {
    display: flex;
  }
  .popup-item .house-button{
    height: 100rpx;
  }
  .popup-item .house-button view{
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
</style>
