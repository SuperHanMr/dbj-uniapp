<template>
	<view class="no-house">
		<button class="add-house" @click="goAddHouse">
			<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_add_house.svg"></image>
			<text>添加房屋信息</text>
		</button>
		<view class="decorate-yf">
			<view class="wrap decorate" @click="goNoHouseDecorate">
				<view class="bg">
					<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_decorate@2x.png"></image>
				</view>
				<text>进行装修服务</text>
			</view>
			<view class="wrap yf" @click="goCheckService">
				<view class="bg">
					<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_checkhouse@2x.png"></image>
				</view>
				<text>进行验房服务</text>
			</view>
		</view>
		<view class="cancel-wrap">
			<image class="cancel" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_cancel.svg" @click="gobackHome"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			goNoHouseDecorate() {
				uni.navigateTo({
					url: "/sub-decorate/pages/no-house-decorate/no-house-decorate",
				});
			},

			goAddHouse() {
				uni.navigateTo({
					url: "/sub-decorate/pages/add-house/add-house",
				});
			},

			goCheckService() {
				uni.navigateTo({
					url: "/sub-decorate/pages/no-house-checkhouse/no-house-checkhouse",
				});
			},
			gobackHome() {
				uni.switchTab({
					url: "/pages/home/index/index",
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-house {
		width: 750rpx;
		height: 100%;
		opacity: 1;
		background: rgba(255, 255, 255, 0.60);
		backdrop-filter: blur(16rpx);
		// padding-top: 61%;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		// align-items: center;
	}

	.add-house {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		background-color: #fff;
		margin: 0 64rpx;
		height: 112rpx;
		opacity: 1;
		border: 2rpx solid #333333;
		border-radius: 32rpx;

		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 24rpx;
		}

		text {
			height: 44rpx;
			opacity: 1;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #333333;
			line-height: 44rpx;
		}
	}

	.decorate-yf {
		margin: 72rpx 92rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;

		.wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;

			.bg {
				width: 128rpx;
				height: 128rpx;
				opacity: 1;
				margin: 0 14rpx;
				border-radius: 52rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			text {
				margin-top: 24rpx;
				width: 156rpx;
				height: 36rpx;
				opacity: 1;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
				line-height: 36rpx;
			}
		}

		.decorate {
			.bg {
				background: #a591d4;
			}
		}

		.yf {
			.bg {
				background: #15d3ab;
			}
		}
	}

	.cancel-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 96rpx;
		margin-bottom: 116rpx;

		.cancel {
			width: 50rpx;
			height: 50rpx;
			opacity: 1;
		}
	}
</style>
