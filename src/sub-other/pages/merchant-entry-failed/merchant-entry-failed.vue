<template>
	<view class="merchant-entry-failed">
		<view class="line">
		</view>
		<view class="head">
			<image src="../../../static/merchant-entry/merchant-entry-no-success.png" mode=""></image>
			<view class="text">
				支付成功
			</view>
			<view class="info">
				恭喜您成为打扮家合作伙伴，我们为您提供电商交易全链路工作台，回归商家经营链路～
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.merchant-entry-failed{
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	.head{
		padding-top: 112rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		image{
			width: 148rpx;
			height: 194rpx;
			margin: 0 auto;
		}
		.text{
			margin-top: 16rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
		}
		.info{
			padding: 0 32rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin: 12rpx 0 32rpx;
			text-align: center;
		}
	}
	.line{
		height: 16rpx;
		background: #F5F6F6;
	}
}

</style>
