<template>
	<view class="my-current-house">
		<image class="ic-location" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/ic_location.svg"></image>
		<view class="house-info">
			<view class="address">{{houseData.housingEstate}}{{houseData.address}}</view>
			<view class="area">面积：{{houseData.insideArea}}m²</view>
		</view>
		<!-- <image class="switch-house" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_more.svg" @click="changCurrentHouse"></image> -->
	</view>
</template>

<script>
	export default {
		name: "MyCurrentHouse",
		props: {
			houseData: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				currentHouse: {}
			}
		},
		methods: {
			changCurrentHouse() {
				this.$emit("changCurrentHouse")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-current-house {
		padding: 24rpx 32rpx 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		background: #fff;
		border-radius: 0rpx 0rpx 40rpx 40rpx;
		margin-bottom: 24rpx;
	}

	.ic-location {
		width: 32rpx;
		height: 32rpx;
		margin-right: 16rpx;
		margin-top: 10rpx;
	}

	.switch-house {
		width: 24rpx;
		height: 24rpx;
		margin-top: 38rpx;
		margin-leftt: 16rpx;
	}

	.house-info {
		width: calc(100% - 88rpx);
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		.address {
			overflow: hidden;
			box-sizing: border-box;
			width: 100%;
			height: 50rpx;
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
			line-height: 50rpx;
			margin-bottom: 8rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.area {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
			line-height: 40rpx;
		}
	}
</style>
