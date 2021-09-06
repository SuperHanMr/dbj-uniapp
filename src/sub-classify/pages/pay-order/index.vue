<template>
	<view class="orderContainer">
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
        <view class="cost-detail">
          <view>
            <text>运费</text>
            <text>¥30.00</text>
          </view>
          <view>
            <text>搬运费</text>
            <text>¥30.00</text>
          </view>
        </view>
      </view>
		</view>
		<view class="total-cost">
      <view>
        <text>商品总价</text>
        <text>¥30.00</text>
      </view>
      <view>
        <text>运费</text>
        <text>¥30.00</text>
      </view>
      <view>
        <text>搬运费</text>
        <text>¥30.00</text>
      </view>
    </view>
    <view class="pay-way">
      <text>支付方式</text>
      <text>微信支付</text>
    </view>
    <view class='remarks'>
      <text>备注</text>
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
    <order-toast ref='orderToast'></order-toast>
  </view>
</template>

<script>
  import orderToast from "./order-toast.vue"
	export default{
    components:{orderToast},
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
      noSend() {
        this.$refs.orderToast.showPupop()
      },
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
  .total-cost{
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
  .total-cost view{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .pay-way, .remarks{
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
</style>
