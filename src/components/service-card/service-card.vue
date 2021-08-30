<template>
	<view class="wrap" :style="{marginBottom: setting.isLast ? 0 : '24rpx'}">
		<view class="title">
			<view class="title-check">
				<slot name="check"></slot>
				<text class="text">{{setting.title}}</text>
			</view>
			<button v-if="setting.id !== 'actuary'" class="change-service" @click="selectAnother">
				<text>更换</text>
				<image class="ic-triangle-999" src="../../static/images/ic_triangle_999.svg"/>
			</button>
		</view>
		<view class="content">
			<image :src="setting.cover"></image>
			<view>
				<view class="subtitle">{{setting.subtitle}}</view>
				<view class="desc-area">
					<text>按平方米计价</text>
					<text>x {{setting.area}}</text>
				</view>
				<view class="price">
					<text>￥{{setting.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ServiceCard",
		props: {
			setting: {
				required: true,
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			selectAnother() {
				this.$emit("selectAnother")
			}
		}
	}
</script>

<style scoped lang="scss">
	button {
		padding: 0;
		margin: 0;
	}

	.wrap {
		width: 100%;
		box-sizing: border-box;
		height: 300rpx;
		opacity: 1;
		background: #fff;
		border-radius: 40rpx;
		padding: 32rpx;
	}

	.title-check {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24rpx;

		.text {
			margin-left: 16rpx;
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333;
			line-height: 44rpx;
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 96rpx;
			height: 44rpx;
			background: #f5f6f6;
			border-radius: 12rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #333333;

			text {
				font-size: 22rpx;
				margin-right: 8rpx;
			}

			.ic-triangle-999 {
				width: 8rpx;
				height: 13rpx;
			}
		}
	}

	.content {
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
			width: 446rpx;
			height: 36rpx;
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

			text {}
		}
	}
</style>
