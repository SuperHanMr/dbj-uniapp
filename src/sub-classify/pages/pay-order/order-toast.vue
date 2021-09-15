<template>
  <view class="good-toast">
   <uni-popup ref="noBuyToast" type="bottom" :mask-click="false">
        <view class="toast-content">
          <view class="good-tip">
            <view>
              <text class="tip-word">部分商品在当前地址下暂时不支持购买，点击确认后会将该商品移回至购物车，其他商品可继续进行结算</text>
            </view>
          </view>
          <address-picker form="orderToast" :houseId="houseId"></address-picker>
          <scroll-view scroll-y="true" class="shop-scroll">
            <view class="content">
              <view class="shop-item" v-for="(shopItem, index) in noStoreInfos.storeInfos" :key='index'>
                <view class="shop-name">{{shopItem.storeName}}</view>
                <view class="goodsItem" @click="toDetails(goodsItem.id)" v-for="(goodsItem, index) in shopItem.skuInfos" :key="index">
                  <image :src="goodsItem.imageUrl" class="goodsItemImg"></image>
                  <!-- <image src="https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png" class="goodsItemImg"></image> -->
                  <view class="goodsInfo">
                    <view class="goodsDesc">
                      <text class="goodsType">{{goodsItem.productType=== 1?"服务":"物品"}}</text>
                      {{goodsItem.spuName}}
                    </view>
                    <view class='tag'>tag type</view>
                    <!-- <view class="totalNum">共1件</view> -->
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
                <view class="no-send-tip">
                   <view class="item-reduce-box">
                      <text>当前地址无法配送该商品，请更换地址</text>
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
    props: {
      houseId: 0,
      noStoreInfos: {}
    },
    data() {
      return {
        goodsList:[1],
        shopList:[1]
      }
    },
    methods: {
      showPupop() {
        this.$refs.noBuyToast.open()
      },
      confirm(){
        this.$refs.noBuyToast.close()
        // uni.navigateTo({
        //   url: '/sub-classify/pages/pay-order/pay-success',
        // });
      },
      backShopCart(){
        this.$refs.noBuyToast.close()
      }
    },
    watch:{
      noStoreInfos :{
        handler(v) {
          console.log(v, 'noSend')
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .toast-content{
    background-color: #f5f6f7;
    border-radius: 16px 16px 0px 0px;
  }
  .good-toast .good-tip{
    height: 121rpx;
    background-color: #FFFFFF;
    border-radius: 16px 16px 0px 0px;
  }
  .good-tip view{
    height: 140rpx;
    border-radius: 16px 16px 0px 0px;
    background-color: rgba(254,144,0,0.05);
    padding: 20rpx 32rpx;
  }
  .good-tip .tip-word{
    color: #FE9000;
    font-size: 24rpx;
    
  }
  .shop-scroll{
    height: 600rpx;
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
  .no-send-tip{
    position: relative;
    height: 56rpx;
  }
  .item-reduce-box{
    height: 56rpx;
    width: 666rpx;
    line-height: 56rpx;
    background-color: #fff6f7;
    border-radius: 8rpx;
    padding-left: 20rpx;
    color: #ff3347;
    font-size: 22rpx;
    position: absolute;
    bottom: 16rpx;
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
