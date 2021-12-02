<template>
	<view>
		<view class="item">
			<view class="price">
				¥1000

			</view>
			<view class="flex1">
				<view class="tips">
					<view class="name">
						<view class="title">
							优惠券名称最长就到这…
						</view>
						<view class="subtitle">
							有效期至 2020.02.02 13:00
						</view>
					</view>
					<view class="btn">
						去使用
					</view>
				</view>
				<view class="more" @click="showTips">
					<view class="tip-title">
						使用说明
					</view>
					<view class="">
						up
					</view>

				</view>

			</view>

		</view>
		<view v-if="showTip" class="more-tip">
			<view class="">
				1.指定品类使用指定品类使用指定品类使用指定品类使发 指定品类使用指定品类使用指定品类使用指定品类使用
			</view>
			<view class="">
				2.指定品类使用指定品类使用指定品类使用指定品类使发 指定品类使用指定品类使用指定品类使用指定品类使用
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "coupon-item",
		data() {
			return {
				showTip: false
			};
		},
		methods: {
			showTips() {
				this.showTip = !this.showTip
			}
		}
	}
</script>

<style lang="scss" scoped>
	.more-tip {
		background: #f7f4ed;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
		padding: 38rpx 24rpx 24rpx 24rpx;
		margin-top: -14rpx;
	}

	.item {
		margin-top: 24rpx;
		width: 100%;
		height: 194rpx;
		background: rgba(255, 228, 176, 0.10);
		// border: 1rpx solid #fcd3bf;
		display: flex;
		flex-direction: row;
		align-items: center;

		.price {
			width: 172rpx;
			text-align: center;
			font-size: 56rpx;
			color: #ff5d35;

		}

		.flex1 {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			margin: 0 24rpx;

			.tips {
				display: flex;
				flex-direction: row;

				.name {
					width: 350rpx;

					.title {
						font-size: 28rpx;
						font-weight: 500;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.subtitle {
						font-size: 22rpx;
						font-weight: 400;
						color: #999999;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.btn {
					width: 120rpx;
					height: 58rpx;
					line-height: 58rpx;
					text-align: center;
					background: linear-gradient(90deg, #fa462a, #ff6519);
					border-radius: 12rpx;
					color: #FFF;
					font-size: 24rpx;
					font-weight: 500;

				}
			}

			.more {
				margin-top: 38rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.tip-title {
					color: #999999;
					font-size: 24rpx;
					font-weight: 400;

				}
			}
		}
	}
</style>
