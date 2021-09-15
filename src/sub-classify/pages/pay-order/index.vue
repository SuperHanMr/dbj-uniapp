<template>
	<view class="orderContainer">
    <address-picker :houseId="houseId" :productType="productType" @emitInfo="emitInfo"></address-picker>
		<view class="content">
      <view class="shop-item" v-for="(shopItem, index) in orderInfo.storeInfos" :key="index">
        <view class="shop-name">{{shopItem.storeName}}</view>
        <view class="goodsItem"  v-for="(goodsItem, index) in shopItem.skuInfos" :key="index">
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
               <text class="question-box">本订单已获得了该店铺{{shopItem.freeDeliveryCount}}次免运费权益
                 <text class="question-icon"></text>
               </text>
            </view>
          </view>
          <view class="shop-reduce no-send-tip" v-if="!shopItem.deliveryFee && !shopItem.freeDeliveryCount && prototype === 1">
             <view class="item-reduce-box">
                <text v-if="toastType === 1">该地址未购买精算服务，请先购买精算服务</text>
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
        <text class="question-box">
          运费
          <text class="question-icon"></text>
        </text>
        <text>¥{{orderInfo.totalDeliveryFee}}</text>
      </view>
      <view v-if="orderInfo.totalHandlingFee">
        <text class="question-box">
          搬运费
          <text class="question-icon"></text>
        </text>
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
      <text>备注</text>
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
          <text class="info-text1">共1件，</text>
          <view class="info-text2">总计：</view>
          <view class="total-money">
              ￥
              <text class="mony-text">666</text>
              <text>.66</text>
          </view>
        </view>
        <button class="pay-button" @click="noSend" ref="test">立即支付</button>
      </view>
    </view>
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
</template>
<script>
  import {getAddWorker, getDetailInfo} from '../../../api/classify.js'
  import orderToast from "./order-toast.vue"
  import datePicker from "./date-picker.vue"
	export default{
    components:{orderToast, datePicker},
		data(){
			return {
        time: '',
        originFrom: "",
        addressInfo: {},
        orderInfo: {},
				canStoreInfos:{},
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
        productType: 1,
        toastText: '',
        toastType: 0
			}
		},
		created(){
			
		},
		onLoad(e) {
      // console.log(e, 'eee')
      // this.houseId = e.houseId
      this.houseId = 1084
      // this.originFrom = e.from
      this.originFrom = "h5GoodDetail"
      this.buyCount = e.buyCount
      this.skuId = e.skuId
      this.storeId = e.storeId
      this.unit = e.unitName
      this.goodDetailId = uni.getStorageSync('goodId')
		},
    onShow() {
      if(uni.getStorageSync('houseListChooseId')) {
        this.houseId = uni.getStorageSync('houseListChooseId')
      }
    },
    methods:{
      goAgreement() {
        uni.navigateTo({
           url: "/sub-classify/pages/pay-order/agreement"
        })
      },
      getTime(val) {
        this.time = val[0] + '年' + val[1] + '月' + val[2] + '日' + val[3] + '时' + val[4] + '分'
      },
      emitInfo(val) {
        this.addressInfo = val
        this.estateId = val.housingEstateId
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
        let params = {
          estateId: 1050, 
          skuInfos: [{
            skuId: 38085, 
            storeId: 2, 
            buyCount: 1.00, 
            unit: '个', 
            level: 0,
            }]}
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
              if(skuItem.addingJobName) {// 头部补人工数据
                this.addUser.push({
                  addingJobName: skuItem.addingJobName,
                  addingUserName: skuItem.addingUserName,
                  addingUserId: skuItem.addingUserId
                })
              }
              if(skuItem.canBuy === false || skuItem.canDeliver === false) {// 购物车结算可配送和不可配送数据
                noStoreItem.skuInfos.push(skuItem)
                this.hasNoSendItem = true // 判断所有数据中有没有不可配送数据
              }else {
                canStoreItem.skuInfos.push(skuItem)
              }
              if(this.originFrom === 'h5GoodDetail') { // 商品详情结算弹窗判断
              console.log(skuItem, skuItem.frontendServe)
                if(skuItem.frontendServe === '精算'){
                  this.toastText = '该服务需精算师指导下完成'
                  this.toastType = 1
                  this.$refs.cancelDialog.open()
                } else if(skuItem.canBuy === false && skuItem.frontendServe !== '精算'){
                  this.toastText = '请从结算单购买'
                  this.toastType = 2
                  this.$refs.cancelDialog.open()
                }
              }
            })
          })
          if(this.originFrom === "shopCart") {
              this.orderInfo = this.canStoreInfos  
              if(this.hasNoSendItem){
                this.$refs.orderToast.showPupop()
              }
          }
        })
      },
      chooseTime() {
         this.$refs.datePicker.showDatePicker()
      },
      noSend() {
        this.$refs.orderToast.showPupop()
      },
      cancelGoodPop() {
        this.$refs.cancelDialog.close()
      },
      confirmGoodPop() {
        if(this.toastType === 1) {
          uni.navigateTo({
            url: "/sub-classify/pages/search-result/search-result?searchText=" + "精算"
          })
        }else if(this.toastType === 2) {
          uni.navigateTo({
            url: "/sub-classify/pages/search-result/search-result?searchText=" + "精算"
          })
        }
      }
    }
	}
</script>

<style scoped>
	.orderContainer{
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #f5f6f7;
    color: #333333;
	}
  // 问号图标模型布局
  .question-box{
    position: relative;
  }
  .question-icon{
    position: absolute;
    width: 30rpx;
    height: 28rpx;
    top:6rpx;
    margin-left: 2rpx;
    background-image: url('../../static/image/question.png');
    background-size: cover;
  }
	// 商品item
  .shop-item{
    margin-top: 25rpx;
    padding: 0 32rpx;
    background-color: #FFFFFF;
  }
  .shop-name{
    height: 106rpx;
    line-height: 106rpx;
  }
  .goodsItem{
  	width: 100%;
  	display: flex;
  	align-items: center;
  	padding-bottom: 40rpx;
  }
  .goodsItem .goodsItemImg{
  	width: 192rpx;
  	height: 192rpx;
  	display: block;
  	margin-right: 24rpx;
  	border-radius: 8rpx;
  }
  .goodsItem .goodsInfo{
  	height: 192rpx;
    position: relative;
    flex: 1;
  }
  .goodsInfo .goodsDesc{
  	width: 420rpx;
  	font-size: 28rpx;
  	color: #333333;
  	line-height: 40rpx;
  	text-overflow: ellipsis;
  }
  .goodsInfo .goodsDesc .goodsType{
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
  	text-align:center;
  }
  .goodsInfo .goodsSpec{
  	width: fit-content;
  	text-overflow: ellipsis;
  	padding: 4rpx;
  	margin: 12rpx 0 12rpx 0;
  	font-size: 22rpx;
  	display: flex;
  }
  .goodsInfo .tag{
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
  .goodsInfo .totalNum{
    top:50%;
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
  .goods-money .integer-price{
    font-size: 30rpx;
  }
  .cost-detail{
    border-top: 2rpx solid #f2f2f2;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #999999;
    display: flex;
    flex-wrap: wrap;
    height: 140rpx;
    align-content: space-around;
  }
  .cost-detail view{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .cost-detail view text:nth-child(2) {
    corlor: #333333
  }
  .shop-reduce{
    position: relative;
    height: 56rpx;
  }
  .item-reduce-box{
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
  .item-reduce-box .question-icon{
    top:0;
  }
  .no-send-tip .item-reduce-box{
    background-color: #fff6f7;
    color: #ff3347;
  }
  .choose-time{
    padding: 26rpx 0;
    border-top: 1rpx solid #f4f4f4;
  }
  .time-bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .time-bar text{
    font-size: 28rpx;
    color: #333333;
  }
  .chooseIcon{
    width: 32rpx;
    height: 32rpx;
  }
  .good-store-account{
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
  .good-store-account view{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .good-store-account .is-store{
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
  .pay-way, .pledge, .remarks{
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
  .pay-way .wechat_icon{
    vertical-align: sub;
    display: inline-block;
    width: 32rpx;
    height: 32rpx;
    background-image: url("../../static/image/wechat_icon.png");
    background-size: contain;
    margin-right: 12rpx;
  }
  .remarks text{
    width: 180rpx;
  }
  .remarks view{
    flex:1;
  }
  .bottom{
    padding: 24rpx 32rpx 50rpx 32rpx;
    background-color: #FFFFFF;
    margin-top: 222rpx;
    font-size: 26rpx;
  }
  .bottom .agreement{
    color: #FFA94F;
  }
  .bottom .second-part{
    margin-top: 32rpx;
    height: 88rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bottom .total-price-info{
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex:1;
  }
  .total-price-info .info-text1{
    font-family: PingFangSC, PingF;
    color: #999999;
  }
  .total-price-info .info-text2{
    font-family: PingFangSC, PingF;
    color: #111111;
    font-weight: 500;
  }
  .total-price-info .info-text2{
    font-family: PingFangSC, PingF;
    color: #111111;
    font-weight: 500;
  }
  .total-price-info .total-money{
    color: #ff3347;
    font-weight: 500;
  }
  .total-money .mony-text{
    font-size: 48rpx;
  }
  .bottom .pay-button{
    width: 248rpx;
    height: 88rpx;
    background: linear-gradient(135deg,#00bfaf, #00bfbc);
    border-radius: 6px;
    color: #FFFFFF;
    font-size: 32rpx;
    line-height: 88rpx;
    text-align: center;
  }
  .popup-item{
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
  .popup-item .popup-title{
    height: 128rpx;
    line-height: 128rpx;
    border-bottom: 1rpx solid #f5f5f5; 
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #111111;
  }
  .popup-item .popup-button{
    display: flex;
  }
  .popup-item .popup-button view{
    height: 82rpx;
    line-height: 84rpx;
    text-align: center;
  }
  .popup-button .popup-ok{
    width: 50%; 
    border-right: 1rpx solid #f5f5f5;
  }
  .popup-button .popup-cancel{
    flex: 1;
    color: #00bfb6;
  }
</style>
