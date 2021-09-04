<template>
	<view>
		<warehouse-item :showBtns="false"></warehouse-item>
		<view class="detail-price">
			<view class="detail-price-row">
				<view class="detail-price-row-font">
					商品总价
				</view>
				<view style="flex:1">

				</view>
				<view class="detail-price-row-font">
					¥
				</view>
				<view class="detail-price-row-num">
					230.00
				</view>

			</view>

			<view class="detail-price-row">
				<view class="detail-price-row-font">
					运费
				</view>
				<view style="flex:1">

				</view>
				<view class="detail-price-row-font">
					¥
				</view>
				<view class="detail-price-row-num">
					230.00
				</view>

			</view>
			<view class="detail-price-row">
				<view class="detail-price-row-font">
					搬运费
				</view>
				<view style="flex:1">

				</view>
				<view class="detail-price-row-font">
					¥
				</view>
				<view class="detail-price-row-num">
					60.00
				</view>

			</view>
			<view class="detail-price-row">
				<view class="detail-price-row-font">
					商家优惠
				</view>
				<view style="flex:1">

				</view>
				<view class="detail-price-row-font">
					¥
				</view>
				<view class="detail-price-row-num">
					20.00
				</view>

			</view>
			<view class="total-pay">
				<view class="total-pay-title">
					实付款
				</view>
				<view class="total-pay-amount">

					<text class="totoal-pay-num">￥</text>
					<text class="totoal-pay-num-z">600</text>
					<text class="totoal-pay-num">.00</text>
				</view>

			</view>

		</view>


		<view class="order-info">
			<view class="order-info-title">
				订单信息
			</view>
			<view class="order-info-row">
				<view class="order-info-row-pre">
					订单编号:
				</view>
				<view class="order-info-row-con">
					DDPG2020121400001
				</view>
				<view class="copy" @click="copy">
					复制
				</view>
			</view>
			<view class="order-info-row">
				<view class="order-info-row-pre">
					创建时间:
				</view>
				<view class="order-info-row-con">
					2021-01-12 16:58:26

				</view>
			</view>
			<view class="order-info-row">
				<view class="order-info-row-pre">
					付款时间:
				</view>
				<view class="order-info-row-con">
					2021-01-12 16:58:26
				</view>
			</view>
		</view>
		
		
		<view  class="bottom-btn" :style="{bottom:systemBottom}">
			<view class="btn-item">
				确认收货
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				systemBottom: ''
			}
		},
		onLoad() {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: 'hello',
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.copy {
		width: 72rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border: 1rpx solid #eaeaea;
		border-radius: 8rpx;
		color: #111111;
		font-size: 20rpx;
	}

	.detail-price {
		background-color: #FFFFFF;
		padding: 32rpx;
		margin-bottom: 16rpx;

		&-row {
			display: flex;
			flex-direction: row;
			align-items: center;
			color: #808080;

			&-num {
				font-size: 28rpx;
			}

			&-font {
				font-size: 24rpx;
			}
		}

		.total-pay {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			margin-top: 32rpx;

			&-title {
				color: #333333;
				font-size: 26rpx;
				margin-right: 16rpx;
			}
		}

		.total-pay-amount {
			display: table-cell;
			vertical-align: bottom;
		}

		.totoal-pay-num {
			color: #ff3347;
			font-size: 26rpx;
		}

		.totoal-pay-num-z {
			color: #ff3347;
			font-size: 40rpx;
		}
	}

	.order-info {
		background-color: #FFFFFF;
		padding: 32rpx;
		margin-bottom: 16rpx;

		&-title {
			color: #333333;
			font-size: 30rpx;
		}

		&-row {
			margin-top: 16rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-pre {
				color: #999999;
				font-size: 28rpx;
			}

			&-con {
				color: #333333;
				font-size: 28rpx;
				margin-left: 16rpx;
			}
		}
	}
	.bottom-btn {
		position: fixed;
		left: 0;
		right: 0;
		height: 136rpx;
		width: 100%;
		background-color: #FFF;
		display: flex;
		justify-content: center;
		align-items: center;
	
		.btn-item {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			color: #ffffff;
			font-size: 32rpx;
			background: linear-gradient(135deg, #00c2b2, #00c2bf);
			border-radius: 12rpx;
		}
	}
</style>
