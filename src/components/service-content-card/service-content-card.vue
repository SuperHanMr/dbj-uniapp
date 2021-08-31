<template>
	<view class="service-content">
		<slot name="radio"></slot>
		<image :src="content.imageUrl"></image>
		<view>
			<view class="subtitle">{{content.fullName}}</view>
			<view class="desc-area">
				<text>按平方米计价</text>
				<text>x {{content.area || 88}}m²</text>
			</view>
			<view class="price">
				<text class="t1">￥</text><text class="t2">{{content.price}}</text><text class="t3">/m²</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			content: {
				type: Object,
				required: true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.service-content {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 40rpx 32rpx 40rpx 24rpx;
		background: #f5f6f6;
		border-radius: 16rpx;

		image {
			width: 176rpx;
			height: 176rpx;
			opacity: 1;
			border-radius: 12rpx;
			margin-right: 16rpx;
			margin-left: 16rpx;
		}

		.subtitle {
			width: 454rpx;
			opacity: 1;
			font-size: 26rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #333;
			line-height: 36rpx;
			margin-bottom: 8rpx;
		}

		.desc-area {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 32rpx;
			font-size: 22rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
			line-height: 32rpx;
			margin-bottom: 30rpx;
		}

		.price {
			text-align: right;

			.t1 {
				height: 24rpx;
				font-size: 20rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #29c7c7;
				line-height: 24rpx;
			}

			.t2 {
				height: 28rpx;
				font-size: 28rpx;
				font-family: Unnamed, Unnamed-Regular;
				font-weight: 400;
				text-align: left;
				color: #29c7c7;
				line-height: 28rpx;
			}

			.t3 {
				height: 22rpx;
				font-size: 24rpx;
				font-family: Unnamed, Unnamed-Regular;
				font-weight: 400;
				text-align: left;
				color: #35c4c4;
				line-height: 24rpx;
			}
		}
	}
</style>
