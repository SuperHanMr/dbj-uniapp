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
			<view v-for="goodsItem in goodsList" :key="goodsItem.skuId">
				<text>{{goodsItem.storeName}}</text>
				<text>{{goodsItem.productType===1?"服务":"物品"}}</text>
				<text>{{goodsItem.spuName}}</text>
			</view>
		</view>
		<view class="bottom"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				goodsList:[],
				shopList:[]
			}
		},
		created(){
			
		},
		onLoad(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage',( data )=> {
				console.log(data)
			})
		}
	}
</script>

<style scoped>
	.orderContainer{
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #f5f6f7;
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
	.content{
		
	}
</style>
