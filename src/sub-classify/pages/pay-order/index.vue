<template>
  <view class="orderContainer">
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
      <address-picker :houseId="houseId" :productType="productType" @emitInfo="emitInfo"></address-picker>
      <view class="content">
        <view class="shop-item" v-for="(shopItem, index) in orderInfo.storeInfos" :key="index">
          <view class="shop-name" v-if="shopItem.skuInfos.length">{{shopItem.storeName}}</view>
          <view class="goodsItem" v-for="(goodsItem, index) in shopItem.skuInfos" :key="index">
            <image :src="goodsItem.imageUrl" class="goodsItemImg"></image>
            <!-- <image src="https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png" class="goodsItemImg"></image> -->
            <view class="goodsInfo">
              <view class="goodsDesc">
                <text class="goodsType">{{goodsItem.productType=== 1?"服务":"物品"}}</text>
                {{goodsItem.spuName}}
              </view>
              <view class='tag'>{{goodsItem.skuName}}</view>
              <view class="totalNum">共{{goodsItem.buyCount}}件</view>
              <view class="goodsSpec">
                <view class="goods-money" v-if='goodsItem.price'>
                  ￥
                  <text class="integer-price">{{String.prototype.split.call(goodsItem["price"], ".")[0]}}</text>
                  <text>.{{String.prototype.split.call(goodsItem["price"], ".")[1]}}</text>
                  <text>/{{goodsItem.unit}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="cost-detail" v-if="shopItem.deliveryFee && prototype === 1">
            <view>
              <text>运费</text>
              <text>¥{{shopItem.deliveryFee}}</text>
            </view>
            <view v-if="shopItem.totalHandlingFee">
              <text>搬运费</text>
              <text>¥{{shopItem.totalHandlingFee}}</text>
            </view>
          </view>
          <view class="shop-reduce" v-if="shopItem.freeDeliveryCount && prototype === 1">
            <view class="item-reduce-box">
              <view class="question-box">本订单已获得了该店铺{{shopItem.freeDeliveryCount}}次免运费权益
                <text class="question-icon" @click="readExpenses(1)"></text>
              </view>
            </view>
          </view>
          <view class="shop-reduce no-send-tip"
            v-if="!shopItem.deliveryFee && !shopItem.freeDeliveryCount && prototype === 1">
            <view class="item-reduce-box">
              <text v-if="toastType === 1">请先购买{{frontendServe}}</text>
              <text v-else>当前地址无法配送该商品，请更换地址</text>
            </view>
          </view>
          <view class="choose-time" v-if="productType === 2 && shopItem.skuInfos.appointmentRequired">
            <view class="time-bar" @click='chooseTime'>
              <text v-if="!time">请选择上门时间</text>
              <text v-else>{{time}}</text>
              <image class="chooseIcon" src="../../../static/images/ic_more_black@2x.png"></image>
            </view>
          </view>
        </view>
      </view>
      <view class="good-store-account" v-if="orderInfo.totalDeliveryFee">
        <view>
          <text>商品总价</text>
          <text>¥{{orderInfo.totalPrice}}</text>
        </view>
        <view>
          <view class="question-box">
            运费
            <text class="question-icon" @click="readExpenses(1)"></text>
          </view>
          <text>¥{{orderInfo.totalDeliveryFee}}</text>
        </view>
        <view v-if="orderInfo.totalHandlingFee">
          <view class="question-box">
            搬运费
            <text class="question-icon" @click="readExpenses(2)"></text>
          </view>
          <text>¥{{orderInfo.totalHandlingFee}}</text>
        </view>
      </view>
      <view class="good-store-account is-store" v-if="!orderInfo.totalDeliveryFee">
        <view>
          <text>商品总价</text>
          <text>¥{{orderInfo.totalPrice}}</text>
        </view>
        <view class="store-read">
          <text>
            当前费用不包含运费和搬运费，具体费用会在要货时进行结算
          </text>
        </view>
      </view>
      <view class="pledge" v-if="orderInfo.totalDeposit">
        <text>押金</text>
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
            <text class="info-text1">共{{totalGoodsNum}}件，</text>
            <view class="info-text2">总计：</view>
            <view class="total-money">
              ￥
              <text class="mony-text">{{orderInfo.totalPrice?String.prototype.split.call(orderInfo.totalPrice, ".")[0]:0}}</text>
              <text>.{{orderInfo.totalPrice?String.prototype.split.call(orderInfo.totalPrice, ".")[1]:0}}</text>
            </view>
          </view>
          <button class="pay-button" :class="{'no-pay': !canPay}" @click="pay" ref="test">立即支付</button>
        </view>
      </view>
      <expenses-toast ref='expensesToast' :expensesType="expensesType"></expenses-toast>
      <date-picker ref='datePicker' @getTime="getTime"></date-picker>
      <order-toast ref='orderToast' :houseId="houseId" :noStoreInfos="noStoreInfos"></order-toast>
      <uni-popup ref="cancelDialog" :mask-click="false">
        <view class="popup-item">
          <view class="popup-title">{{toastText}}</view>
          <view class="popup-button">
            <view class="popup-ok" @click='cancelGoodPop'>取消</view>
            <view class="popup-cancel" @click='confirmGoodPop'>去购买</view>
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
  import expensesToast from "./expenses-toast.vue"
  export default {
    components: {
      orderToast,
      datePicker,
      expensesToast
    },
    data() {
      return {
        isShow: true,
        time: '',
        orderCartParams: {},
        originFrom: '',
        addressInfo: {},
        orderInfo: {},
        canStoreInfos: {},
        noStoreInfos: {},
        hasNoSendItem: false,
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
        toastText:'',
        tipTest: '',
        remarks: '666',
        orderName: '',
        orderDetails: [],
        totalGoodsNum: 0,
        canPay: true
      }
    },
    created() {
      // 结算所需参数
      // let params = {
      //   "skuInfos":[{
      //     "skuId":"long //商品id",
      //     "storeId":"long //店铺id",
      //     "buyCount":"double //购买数量",
      //     "unit":"string //单位",
      //     "level":"int //等级",
          
      //     "roleType":"int //角色类型  7工人  10管家  购买工人和管家时参数必传",
      //     "workType":"int //工种类型 购买工人时参数必传",
      //   }],
      //   "estateId":"long //小区id"
      // }
    },
    onLoad(e) {
      // 购物车数据
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('acceptDataFromOpenerPage',( data )=> {
        console.log(data, 'cartData')
      	this.orderCartParams = data
        this.originFrom = data.originFrom
      }) 
      // 小程序数据
      // console.log(e, 'eee')
      // this.houseId = 1084
      if(e.from) {
        this.originFrom = e.from
      }
      if(this.originFrom === "h5GoodDetail") {
        this.houseId = e.houseId
      }else if(this.originFrom === "shopCart"){
        this.houseId = JSON.parse(uni.getStorageSync('currentHouse')).id
      }
      // this.originFrom = "h5GoodDetail"
      // this.originFrom = "shopCart"
      this.buyCount = e.buyCount
      this.skuId = e.skuId
      this.storeId = e.storeId
      this.unit = e.unitName
      this.goodDetailId = uni.getStorageSync('goodId')
      if(!this.houseId){
        this.isShow = false
        setTimeout(() => {
          if(this.$refs.houseDialog.open){
            this.$refs.houseDialog.open()
          }
        })
      }
    },
    onShow() {
      if (uni.getStorageSync('houseListChooseId')) {
        this.houseId = uni.getStorageSync('houseListChooseId')
        this.isShow = true
        if(this.$refs.houseDialog.close) {
          this.$refs.houseDialog.close()
        }
      }
    },
    methods: {
      backFrom() {
        uni.navigateBack()
      },
      chooseHouse() {
        uni.navigateTo({
           url: "/sub-my/pages/my-house/my-house"
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
      },
      emitInfo(val) {
        this.addressInfo = val
        this.estateId = val.id ? val.id: 0
         let params = {}
        if(this.originFrom === 'h5GoodDetail') {
          params = {
            skuInfos:[{
            		skuId:this.skuId,
            		storeId:this.storeId,
            		buyCount:this.buyCount,
            		unit: this.unit? this.unit:"",
                level: 0
            	}],
            	estateId:this.estateId
          }
        }else if(this.originFrom === 'shopCart'){
          params = {
            skuInfos: this.orderCartParams.skuInfos,
            estateId: this.estateId
          }
        }
        console.log(params, 'orderPar')
        // let params = {
        //   skuInfos:[{
        //   		skuId:this.skuId,
        //   		storeId:this.storeId,
        //   		buyCount:this.buyCount,
        //   		unit: this.unit,
        //       level: 0
        //   	}],
        //   	estateId:this.estateId
        // }
        // let params = {
        //   estateId: 1050,
        //   skuInfos: [{
        //     skuId: 38085,
        //     storeId: 2,
        //     buyCount: 1.00,
        //     unit: '个',
        //     level: 0,
        //   }]
        // }
        getDetailInfo(params).then((data) => {
          // let dataInfo = data
          let dataInfo = data.data.data
          this.orderInfo = dataInfo
          console.log(dataInfo, 'dataInfo')
          this.noStoreInfos = JSON.parse(JSON.stringify(dataInfo))
          this.noStoreInfos.storeInfos = []
          this.canStoreInfos = JSON.parse(JSON.stringify(dataInfo))
          this.canStoreInfos.storeInfos = []


          dataInfo.storeInfos.map((storeItem, storeK) => {
            let noStoreItem = JSON.parse(JSON.stringify(storeItem))
            noStoreItem.skuInfos = []
            let canStoreItem = JSON.parse(JSON.stringify(storeItem))
            canStoreItem.skuInfos = []
            this.noStoreInfos.storeInfos.push(noStoreItem)
            this.canStoreInfos.storeInfos.push(canStoreItem)


            storeItem.skuInfos.map((skuItem, skuK) => {
              this.productType = skuItem.productType
               // 头部补人工数据
              if (skuItem.addingJobName) {
                this.addUser.push({
                  addingJobName: skuItem.addingJobName,
                  addingUserName: skuItem.addingUserName,
                  addingUserId: skuItem.addingUserId
                })
              }
              // 购物车结算可配送和不可配送数据
              if (skuItem.canBuy === false || skuItem.canDeliver === false) { 
                noStoreItem.skuInfos.push(skuItem)
                this.hasNoSendItem = true // 判断所有数据中有没有不可配送数据
              } else {
                canStoreItem.skuInfos.push(skuItem)
                this.totalGoodsNum += skuItem.buyCount
                // 整理出结算参数
                let orderDetailItem = {
                      "relationId":skuItem.skuId, //实体id,
                  		"type":skuItem.productType,   //1材料  2服务   3专项付款,
                  		"businessType":skuItem.categoryTypeId, //业务类型,
                  		"roleType":0, //角色类型  7工人  10管家  购买工人和管家时参数必传,
                  		"workType":-2,//工种类型 购买工人时参数必传,
                  		"level":0, //等级  0中级  1高级 2特级  3钻石",
                  		"storeId":skuItem.storeId, //店铺id,
                  		"storeType": 0, //店铺类型 0普通 1设计师",
                  		"number": skuItem.buyCount, //购买数量",
                  		"params":this.time, //与订单无关的参数 如上门时间 doorTime
                }
                this.orderDetails.push(orderDetailItem)
              }
              // 商品详情结算弹窗判断
              if (this.originFrom === "h5GoodDetail") { 
                this.canPay = false
                // if (skuItem.canBuy === false && skuItem.frontendServe === '精算') {
                //   this.toastText = '该服务需精算师指导下完成'
                //   this.toastType = 1
                //   this.$refs.cancelDialog.open()
                // } else if(skuItem.canBuy === false && skuItem.frontendServe !== '精算') {
                //   if(skuItem.categoryTypeId > 5){
                //     this.tipTest = '当前地址下该工序已完工，无法购买'
                //   } else{
                //     this.tipTest = '该房屋下已购买该服务，不可重复购买'
                //   }
                // }else if (skuItem.canBuy === true && skuItem.isAdding === false) {
                //   this.toastText = '请从精算单购买'
                //   this.toastType = 2
                //   this.$refs.cancelDialog.open()
                // }
                if(skuItem.frontendServe){
                    this.toastType = 1
                    this.frontendServe = skuItem.frontendServe
                    this.toastText = `请先购买${skuItem.frontendServe}服务`
                    if(this.$refs.cancelDialog.open){
                      this.$refs.cancelDialog.open()
                    }
                }else {
                  this.canPay = true
                }
              }
            })
          })
          if (this.originFrom === "shopCart") {
            this.orderInfo = this.canStoreInfos
            if(!this.canStoreInfos.storeInfos.length){
              this.canPay = false
            }
            if (this.hasNoSendItem) {
              this.$refs.orderToast.showPupop()
            }
          }
        })
      },
      chooseTime() {
        this.$refs.datePicker.showDatePicker()
      },
      pay() {
        if(!this.canPay) {
          return
        }
        let params = {
            payType: 1, //"int //支付方式  1微信支付",
            openid: uni.getStorageSync("openId"), //"string //微信openid 小程序支付用 app支付不传或传空",
            projectId: 0, //"long //项目id  非必须 默认0",
            customerId: 0, //"long //业主id  非必须 默认0",
            estateId: this.estateId, //"long //房产id   非必须 默认0",
            total: this.orderInfo.totalPrice, //"int //总计",
            remarks: this.remarks, //"string //备注",
            orderName: "", //"string //订单名称 可为空",
            details: this.orderDetails
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
               url: "/sub-classify/pages/pay-order/pay-success"
             })
            },
            fail(e) {
              console.log(e);
            },
          });
        })
      },
      cancelGoodPop() {
        this.$refs.cancelDialog.close()
      },
      confirmGoodPop() {
        uni.navigateTo({
          url: "/sub-classify/pages/search-result/search-result?searchId="
        })
        // if (this.toastType === 1) {
        //   uni.navigateTo({
        //     url: "/sub-classify/pages/search-result/search-result?searchText=" + "精算"
        //   })
        // } else if (this.toastType === 2) {
        //   uni.navigateTo({
        //     url: "/sub-decorate/pages/no-house-decorate/no-house-decorate?type=actuary"
        //   })
        // }
      }
    }
  }
</script>

<style scoped>
  .orderContainer {
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

  .goodsItem {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 40rpx;
  }

  .goodsItem .goodsItemImg {
    width: 192rpx;
    height: 192rpx;
    display: block;
    margin-right: 24rpx;
    border-radius: 8rpx;
  }

  .goodsItem .goodsInfo {
    height: 192rpx;
    position: relative;
    flex: 1;
  }

  .goodsInfo .goodsDesc {
    width: 420rpx;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    text-overflow: ellipsis;
  }

  .goodsInfo .goodsDesc .goodsType {
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

  .goodsInfo .goodsSpec {
    width: fit-content;
    text-overflow: ellipsis;
    padding: 4rpx;
    margin: 12rpx 0 12rpx 0;
    font-size: 22rpx;
    display: flex;
  }

  .goodsInfo .tag {
    margin-top: 8rpx;
    font-size: 22rpx;
    color: #999999;
    position: absolute;
    padding: 4rpx 10rpx;
    line-height: 38rpx;
    text-align: center;
    background-color: #fafafa;
    border: 2rpx solid #f0f0f0;
    border-radius: 6rpx;
  }

  .goodsInfo .totalNum {
    top: 50%;
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
    position: absolute;
    bottom: 0;
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
    padding: 26rpx 0;
    border-top: 1rpx solid #f4f4f4;
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

  .chooseIcon {
    width: 32rpx;
    height: 32rpx;
  }

  .good-store-account {
    padding: 5rpx 32rpx;
    height: 210rpx;
    background-color: #FFFFFF;
    margin-top: 25rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    height: 220rpx;
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
  .bottom .no-pay{
    opacity: 0.4;
    background: linear-gradient(135deg,#00bfaf, #00bfbc);
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

  .popup-item .popup-button {
    display: flex;
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
