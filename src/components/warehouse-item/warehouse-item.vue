<template>
	<view class="store">
		<view class="store-info">
			<view class="store-name">
				{{item.storeName}}
			</view>
			<view v-if="showSubtitle" class="store-sub">
				剩余{{item.remainingShipments}}次免运费额度
			</view>
		</view>
		<view v-for="(goodItem,index) in item.stockAppVOS" :key="index" class="goods-list" @click="toDetail">
			<view class="good-detail">

				<image class="img" :src="goodItem.imgUrl">
				</image>
				<view class="goods-info">
					<view class="name">
						<view class="tip">
							物品
						</view>
						<view class="text">
							{{goodItem.fullName}}

						</view>
						<view style="flex:1">
						</view>
						<view class="price">
							<text class="num-x">¥</text>
							<text class="num-z">320</text>
							<text class="num-x">.00</text>
						</view>
					</view>
					<view class="spec">
						<view class="spec-item">
							{{goodItem.scaleProperties}}
						</view>
						<view class="spec-item">
							{{goodItem.price}}/{{goodItem.unit}}
						</view>
						<view style="flex:1">

						</view>
						<view class="spec-item">
							共{{number}}件
						</view>
					</view>
				</view>
			</view>
			<view v-if="showBtns">
				<view class="btn-row">
					<view class="btn-back" @click="toRefund">
						退库存
					</view>
					<view class="btn-con">
						确认收货
					</view>
				</view>
				<view class="back-view">
					<view class="back-item">
						<view class="back-title">
							退款中
						</view>
						<view class="back-price">
							<text class="num-x">¥</text>
							<text class="num-z">320</text>
							<text class="num-x">.00</text>
						</view>
					</view>
					<view class="back-row">
						<view class="back-row-item">
							取消申请
						</view>

						<view class="back-row-item" @click="toDetail">
							查看详情
						</view>
					</view>
				</view>
			</view>
			<view v-if="isEdit" class="edit">
				<custom-number-box></custom-number-box>
				<view class="edit-tip">
					库存剩余80，最多可退80
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "warehouse-item",
		props: {
			item: {
				type: Object,
				default: () => {

				}
			},
			showBtns: {
				type: Boolean,
				default: true
			},
			showSubtitle: {
				type: Boolean,
				default: true
			},
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			toDetail() {
				this.$emit('detail', this.item);
			},

			toRefund() {
				this.$emit('refund', this.item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.store {
		background-color: #FFF;
		margin-bottom: 32rpx;

		.store-info {
			display: flex;
			flex-direction: row;
			align-items: center;
			background: #fafafa;
			height: 96rpx;

			.store-name {
				font-size: 28rpx;
				font-weight: 500;
				color: #111111;
				margin-left: 32rpx;
			}

			.store-sub {
				font-size: 22rpx;
				color: #999999;
				margin-left: 8rpx;
			}
		}

		.goods-list {

			margin: 0 32rpx;

			padding: 32rpx 0;
			border-bottom: 1rpx solid #f4f4f4;
		}

		.good-detail {
			display: flex;
			flex-direction: row;
			align-items: center;

			.img {
				width: 136rpx;
				height: 136rpx;
				border: 1rpx solid #f4f4f4;
				border-radius: 8rpx;
				flex-shrink: 0;
			}

			.goods-info {
				margin-left: 16rpx;
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.name {

					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					height: 34rpx;

					.tip {
						width: 60rpx;
						height: 30rpx;
						line-height: 30rpx;
						text-align: center;
						border: 1rpx solid #35c4c4;
						border-radius: 4rpx;
						font-size: 20rpx;
						color: #35c4c4;
					}

					.text {
						font-size: 26rpx;
						color: #333333;
						margin-left: 8rpx;
					}

					.price {
						color: #333333;

						.num-z {
							font-size: 32rpx;
						}

						.num-x {
							font-size: 22rpx;
						}
					}
				}

				.spec {
					margin-top: 16rpx;
					height: 32rpx;
					width: 100%;
					display: flex;
					flex-direction: row;

					.spec-item {
						color: #999999;
						font-size: 22rpx;
						margin-right: 24rpx;
					}
				}
			}



		}

		.btn-row {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			.btn-back {
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				background: #ffffff;
				border: 1rpx solid #eaeaea;
				border-radius: 16rpx;
				font-size: 24rpx;
				color: #111111;

			}

			.btn-con {
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				font-size: 24rpx;
				color: #ffffff;
				text-align: center;
				background: linear-gradient(135deg, #36d9cd, #28c6c6);
				border-radius: 16rpx;
			}
		}
	}

	.back-view {
		.back-item {
			width: 686rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #fcf9f5;
			border: 1rpx solid #f5d9bc;
			border-radius: 16rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.back-title {
				color: #fc8b19;
				font-size: 28rpx;
				margin-left: 24rpx;
			}

			.back-price {
				color: #fc8b19;
				margin-left: 16rpx;

				.num-z {
					font-size: 32rpx;
				}

				.num-x {
					font-size: 22rpx;
				}
			}
		}

		.back-row {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin-top: 24rpx;

			&-item {
				width: 140rpx;
				height: 56rpx;
				text-align: center;
				line-height: 56rpx;
				border: 1rpx solid #cccccc;
				border-radius: 32rpx;
				color: #111111;
				font-size: 24rpx;
				margin-left: 24rpx;
			}
		}
	}

	.edit {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.edit-tip {
			color: #999999;
			font-size: 22rpx;
			margin-top: 16rpx;
		}
	}
</style>
