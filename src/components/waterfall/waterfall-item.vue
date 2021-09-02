<template>
	<view class="waterfall-item" @click="toDetail(item)">
		<image :src="item.imageUrl" mode="widthFix" lazy-load @load="onImageLoad"></image>
		<view class="flex-row">
			<view class="tab">
				物品
			</view>
			<view class="title">
				{{ item.name }}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'water-fall-item',
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			onImageLoad(e) {
				this.$emit('load', e)
			},
			toDetail(e) {
				this.$emit('detail', e);
			}
		}
	}
</script>

<style lang="scss">
	.waterfall-item {
		width: 345rpx;
		margin-top: 32rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;

		.tab {
			border: 1rpx solid #00bfb6;
			border-radius: 8rpx;
			height: 30rpx;
			color: #00bfb6;
			font-size: 20rpx;
			text-align: center;
			padding: 2rpx 10rpx;
		}

		image {
			width: 345rpx;
			display: block;
		}

		.title {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			padding: 16rpx;
			line-height: 40rpx;
			font-size: 28rpx;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.flex-row {
			display: flex;
			flex-direction: row;
			padding: 16rpx;
			flex-wrap: wrap;
			justify-content: flex-start;
			width: 100%;

			.title {
				font-size: 28rpx;
				color: #333333;
			}

		}
	}
</style>
