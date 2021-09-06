<template>
	<div class="no-service">
		<view class="bg"></view>
		<view class="text">{{words}}</view>
	</div>
</template>

<script>
	export default {
		props: ["words"]
	}
</script>

<style scoped>
	.no-service {
		height: 360rpx;
		margin: 0 24rpx 24rpx 24rpx;
		background: #fbfbfb;
		border-radius: 20rpx;
		padding: 0 64rpx 0 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.no-service .bg {
		width: 200rpx;
		height: 200rpx;
		background: #cccdce;
		border-radius: 50%;
		margin-bottom: 24rpx;
	}

	.no-service .text {
		width: 196rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 40rpx;
	}
</style>
