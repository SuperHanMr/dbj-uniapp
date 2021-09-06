<template>
	<view class="service-content">
		<slot name="radio"></slot>
		<image :src="content.imageUrl"></image>
		<view style="flex: 1">
			<view class="subtitle">{{content.spuName}}</view>
			<view class="desc-area">
				<text>按平方米计价</text>
				<text>x {{content.insideArea}}m²</text>
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
		margin-left: 48rpx;
		padding: 16rpx 24rpx 16rpx;
		background: #f5f6f6;
		border-radius: 16rpx;

		image {
			width: 136rpx;
			height: 136rpx;
			opacity: 1;
			border-radius: 12rpx;
			margin-right: 16rpx;
		}

		.subtitle {
			// width: 446rpx;
			// height: 36rpx;
			font-size: 26rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
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
