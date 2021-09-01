<template>
	<view class="container">
		
			<view class="header">
				订单信息
			</view>
			<view class="item">
				<text class="item-header" >订单编号：</text>
				<view class="item-body">
					<text style="display: block;margin-right:16rpx;">DDPG2020121400001</text>
					<view class="copy-style">复制</view>
				</view>
			</view>
			<view class="item">
				<text class="item-header">创建时间：</text>
				<text class="item-body">2021-01-21   16:58:59</text>
			</view>
			<view class="item">
				<text class="item-header">付款时间：</text>
				<text class="item-body">2021-01-21   16:58:59</text>
			</view>
			<view class="item">
				<text class="item-header">支付方式：</text>
				<text class="item-body">微信支付</text>
			</view>
	
	</view>
</template>

<script>
	export default {
		name:"order-info",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-bottom: 16rpx;
		display: flex;
		flex-flow: column nowrap;
		padding: 32rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
		color: #333333;
		.header{
			font-size: 30rpx;
			font-weight: 1000;
			height: 48rpx;
			line-height: 48rpx;
			margin-bottom: 16rpx;
		}
		.item{
			font-size: 28rpx;
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			justify-content: flex-start;
			margin-bottom: 16rpx;
			.item-header{
				width: 140rpx;
				height: 40rpx;
				line-height: 40rpx;
				color: #999999;
				display: block;
				flex: 1;
			}
			.item-body{
				width: 546rpx;
				line-height: 40rpx;
				display: flex;
				flex-flow: row nowrap;
				
			}
		}
		.item:nth-last-child(1){
			margin-bottom: 0;
		}
	}
	.copy-style{
		display:block;
		width:72rpx;
		height:40rpx;
		line-height: 40rpx;
		border-radius:8rpx;
		text-align:center;
		border:2rpx solid #EAEAEA;
		font-size: 20rpx;
		color: #111111;
	}
	
</style>
