<template>
	<view class="orderContainer">
    <address-picker></address-picker>
		<view class="content">
      <view class="shop-item" v-for="(shopItem, index) in shopList" :key='index'>
        <view class="shop-name">李哥工作室</view>
        <view class="goodsItem" @click="toDetails(goodsItem.id)" v-for="(goodsItem, index) in goodsList" :key="index">
          <!-- <image :src="goodsItem.imageUrl" class="goodsItemImg"></image> -->
          <image src="https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png" class="goodsItemImg"></image>
          <view class="goodsInfo">
            <view class="goodsDesc">
              <text class="goodsType">{{goodsItem.productType=== 1?"服务":"物品"}}</text>
              {{goodsItem.spuName}}
            </view>
            <view class='tag'>tag type</view>
            <view class="totalNum">共1件</view>
            <view class="goodsSpec">
                  <view class="goods-money">
                    ￥
                    <text class="integer-price">{{goodsItem.convertedPrice?goodsItem.convertedPrice.split(".")[0]: 0}}</text>
                    <text>.{{goodsItem.convertedPrice?goodsItem.convertedPrice.split(".")[1]: 0}}</text>
                    <!-- <text>/{{goodsItem.unitName}}</text> -->
                    <text>/把</text>
                  </view>
            </view>
          </view>
        </view>	
<!--      <view class="cost-detail">
          <view>
            <text>运费</text>
            <text>¥30.00</text>
          </view>
          <view>
            <text>搬运费</text>
            <text>¥30.00</text>
          </view>
        </view> -->
<!--      <view class="shop-reduce">
          <view class="item-reduce-box">
             <text class="question-box">本订单已获得了该店铺5次免运费权益
               <text class="question-icon"></text>
             </text>
          </view>
        </view> -->
        <view class="shop-reduce no-send-tip">
           <view class="item-reduce-box">
              <text>当前地址无法配送该商品，请更换地址</text>
           </view>
        </view>
        <view class="choose-time">
           <view class="time-bar" @click='chooseTime'>
             <text>请选择上门时间</text>
             <image class="chooseIcon" src="../../../static/images/ic_more_black@2x.png"></image>
           </view>
        </view>
      </view>
		</view>
		<view class="good-store-account">
      <view>
        <text>商品总价</text>
        <text>¥30.00</text>
      </view>
     <view>
        <text class="question-box">
          运费
          <text class="question-icon"></text>
        </text>
        <text>¥30.00</text>
      </view>
      <view>
        <text class="question-box">
          搬运费
          <text class="question-icon"></text>
        </text>
        <text>¥30.00</text>
      </view>
    </view>
    <view class="good-store-account is-store">
      <view>
        <text>商品总价</text>
        <text>¥30.00</text>
      </view>
      <view class="store-read">
        <text>
          当前费用不包含运费和搬运费，具体费用会在要货时进行结算
        </text>
      </view>
    </view>
    <view class="pledge">
      <text>押金</text>
      <text>¥200.00</text>
    </view>
    <view class="pay-way">
      <text>支付方式</text>
      <text>微信支付</text>
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
        <text class="agreement">《打扮家服务用户协议》</text>
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
    <date-picker ref='datePicker'></date-picker>
    <order-toast ref='orderToast'></order-toast>
    <uni-popup ref="cancelDialog" :mask-click="false">
      <view class="popup-item">
        <view class="popup-title">该服务需精算师指导下完成</view>
        <view class="popup-button">
          <view class="popup-ok" @click='cancel'>取消</view>
          <view class="popup-cancel" @click='goBuy'>去购买</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import orderToast from "./order-toast.vue"
  import datePicker from "./date-picker.vue"
	export default{
    components:{orderToast, datePicker},
		data(){
			return {
				goodsList:[1,2],
				shopList:[1,2]
			}
		},
		created(){
			
		},
		onLoad(option) {
		},
    methods:{
      chooseTime() {
         this.$refs.datePicker.showDatePicker()
      },
      noSend() {
        this.$refs.orderToast.showPupop()
        // this.$refs.cancelDialog.open()
      },
      cancel() {
        this.$refs.cancelDialog.close()
      },
      goBuy() {}
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
  // 问好图标模型布局
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
    line-height: 104rep;
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
