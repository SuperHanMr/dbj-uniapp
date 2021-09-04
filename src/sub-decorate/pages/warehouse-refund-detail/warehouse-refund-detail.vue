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
				<view class="totoal-pay-num">￥</view>
				<view class="totoal-pay-num-z">600</view>
				<view class="totoal-pay-num">.00</view>


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
			align-items: flex-end;
			margin-top: 32rpx;

			&-title {
				color: #333333;
				font-size: 26rpx;
			}

			&-num {
				color: #ff3347;
				font-size: 26rpx;
			}

			&-num-z {
				color: #ff3347;
				font-size: 140rpx;
			}
		}

	}
</style>
