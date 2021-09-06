<template>
  <view class="good-toast">
   <uni-popup ref="noSendToast" type="bottom" :mask-click='false'>
        <view class="toast-content">
          <view class="good-tip">
            <view>
              <text class="tip-word">部分商品在当前地址下暂时不支持购买，点击确认后会将该商品移回至购物车，其他商品可继续进行结算</text>
            </view>
          </view>
          <view class="header">
          	<image src="../../../static/shopping-cart/ic_location@2x.png" class="locationIcon"></image>
          	<view class="address">
          		<view class="way">
          			<text class="default">默认</text>
          			<text class="txt">北京市北京市石景山区双元路</text>
          		</view>
          		<view class="community">点石商务公园8号楼8层101</view>
          		<view class="userInfo">
          			<text class="userName">刘先生</text>
          			<text class="userPhone">123456789</text>
          		</view>
          	</view>
          	<image class="switchSite" src="../../../static/shopping-cart/ic_more_black@2x.png"></image>
          </view>
          <image class="addressLine" src="../../../static/shopping-cart/address_line@2x.png"></image>
          <scroll-view scroll-y="true" class="shop-scroll">
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
                    <!-- <view class="totalNum">共1件</view> -->
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
              </view>
            </view>
          </scroll-view>
          <view class="bottom">
            <button @click="backShopCart">返回购物车</button>
            <button @click="confirm">确定</button>
          </view>
        </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsList:[1,2],
        shopList:[1,2]
      }
    },
    methods: {
      showPupop() {
        this.$refs.noSendToast.open()
      },
      confirm(){
        this.$refs.noSendToast.close()
      },
      backShopCart(){
        this.$refs.noSendToast.close()
      }
    }
  }
</script>

<style scoped>
  .toast-content{
    background-color: #f5f6f7;
  }
  .good-toast .good-tip{
    height: 121rpx;
    background-color: #FFFFFF;
    border-radius: 16px 16px 0px 0px;
  }
  .good-tip view{
    height: 121rpx;
    border-radius: 16px 16px 0px 0px;
    background-color: rgba(254,144,0,0.05);
    padding: 20rpx 32rpx;
  }
  .good-tip .tip-word{
    color: #FE9000;
    font-size: 24rpx;
    
  }
  .header{
  	display: flex;
  	width: 100%;
  	height: 202rpx;
  	background: #ffffff;
  }
  .locationIcon{
  	width: 48rpx;
  	height: 48rpx;
  	display: block;
  	margin: 32rpx 8rpx 0 32rpx;
  }
  .switchSite{
  	width: 32rpx;
  	height: 32rpx;
  	display: block;
  	margin: 32rpx 32rpx 0 0;
  }
  .address{
  	margin: 32rpx 0;
  }
  .address .way{
  	width: 604rpx;
  	height: 42rpx;
  	color: #999999;
  	line-height: 42rpx;
  }
  .address .way .default{
  	width: 60rpx;
  	height: 32rpx;
  	line-height: 32rpx;
  	text-align: center;
  	padding: 2rpx 10rpx;
  	margin-right: 8rpx;
  	background: linear-gradient(135deg,#36d9cd, #28c6c6);
  	border-radius: 4rpx;
  	font-size: 20rpx;
  	font-weight: 500;
  	color: #ffffff;
  }
  .address .way .txt{
  	width: fit-content;
  	height: 42rpx;
  	font-size: 26rpx;
  	color: #999999;
  	line-height: 42rpx;
  }
  .address .community{
  	height: 42rpx;
  	font-size: 28rpx;
  	font-weight: 500;
  	color: #111111;
  	line-height: 42rpx;
  	margin: 8rpx 0;
  }
  .address .userInfo {
  	height: 40rpx;
  	font-size: 24rpx;
  	color: #999999;
  	line-height: 40rpx;
  }
  .address .userInfo .userName{
  	margin-right: 10rpx;
  }
  .addressLine{
  	width: 100%;
  	height: 6rpx;
  	background: #fff;
  	margin-bottom: 16rpx;
  	display: block;
  }
  .shop-scroll{
    height: 750rpx;
  }
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
  .bottom{
    height: 136rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #FFFFFF;
    padding: 0 15rpx;
  }
  .bottom button{
    width: 300rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 8px;
    font-size: 30rpx;
    font-weight: 500;
  }
  .bottom button:nth-child(1){
    background-color: #FFFFFF;
    border: 1px solid #00bfb6;
    color: #00bfb6;
  }
  .bottom button:nth-child(2){
    background: linear-gradient(135deg,#00bfaf, #00bfbc);;
    color: #FFFFFF;
  }
</style>
