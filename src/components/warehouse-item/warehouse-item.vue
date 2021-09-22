<template>
	<view class="store">
		<view v-if="item.storeName&&showTitle" class="store-info">
			<view class="store-name">
				{{item.storeName}}
			</view>
			<view style="flex: 1;">
			</view>
			<view v-if="item.stockStatus==1" class="store-sub">
				剩余{{item.remainingShipments}}次免运费额度
			</view>
		<!-- 	<view v-if="showBackStatus" class="store-sub">
				剩余{{item.remainingShipments}}次免运费额度
			</view> -->
			<view v-if="item.stockStatus==4" class="store-sub">
				{{item.type==0?'仅退款（未发货）':item.type==1?'仅退款（退库存）':'仅退款（已收货) '}}
			</view>
		</view>
		<view v-for="(goodItem,index) in dataList" :key="index"
			:class="{'bor-bottom':index<dataList.length-1}" class="goods-list">
			<view class="good-detail" @click="toDetail">
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
						<view v-if="showSubPrice&&item.stockStatus!=4" class="price">
							<text class="num-x">¥</text>
							<text class="num-z">{{String(goodItem.price).split('.')[0]}}</text>
							<text class="num-x">.{{String(goodItem.price).split('.')[1]||'00'}}</text>
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
						<view v-if="showSubCount&&item.stockStatus!=4" class="spec-item">
							共{{goodItem.number||goodItem.stockNumber}}件
						</view>
					</view>
				</view>
			</view>
			<view v-if="isEdit" class="edit">
				<custom-number-box @change="onChange($event,goodItem)" :value="goodItem.number" :min="minInput"
					:max="goodItem.number">
				</custom-number-box>
				<view class="edit-tip">
					库存剩余{{goodItem.number}}，最多可退{{goodItem.number}}
				</view>
			</view>
			<view v-if="showBack" class="btn-row">
				<view class="apply-back" @click="backGoodItem(goodItem)">
					退库存
				</view>
			</view>
			<view v-if="itemBtn" class="btn-row">
				<view v-if="goodItem.status==6" class="apply-back" @click="applyBackItem(goodItem)">
					申请退款
				</view>
				<view v-if="[0,1].includes(goodItem.status)" style="color:#FC8B19" class="apply-back">
					退款中
				</view>
				<view v-if="[2].includes(goodItem.status)" class="apply-back">
					退款成功
				</view>
				<view v-if="[3,4].includes(goodItem.status)" class="apply-back">
					退款关闭
				</view>
				<view v-if="goodItem.status==5" style="color:#FF3347" class="apply-back">
					申请失败
				</view>
			</view>
		</view>
		<view v-if="showBottomView" class="bottom-view">
			<view class="btn-row">
				<!-- <view v-if="showBack" class="btn-back" @click="toRefund">
					退库存
				</view> -->
				<view v-if="showRecived" class="btn-con" @click="confirmGoods">
					确认收货
				</view>
			</view>
			<view class="back-view">
				<view v-if="showBacking" class="back-header">
					<text class="sub">退款金额:</text>
					<text class="price-s">¥</text>
					<text class="price-l">{{String(item.refundAmount).split('.')[0]}}</text>
					<text class="price-s">.{{String(item.refundAmount).split('.')[1]||'00'}}</text>

				</view>
				<view v-if="showBacking" class="back-item"
					:class="{'color1-bg':[0,1].includes(item.status),'color2-bg':item.status==2,'color3-bg':[3,4,5].includes(item.status) }">
					<view class="back-title"
						:class="{'color1-text':[0,1].includes(item.status),'color2-text':item.status==2,'color3-text':[3,4,5].includes(item.status) }">
						{{tipTitle(item.status)}}
					</view>
					<view v-if="[0,1,2].includes(item.status)" class="back-price">
						<text class="num-x">¥</text>
						<text class="num-z">{{String(item.refundAmount).split('.')[0]}}</text>
						<text class="num-x">.{{String(item.refundAmount).split('.')[1]||'00'}}</text>
					</view>
					<view v-else class="close-text">
						退款已关闭
					</view>
				</view>
				<view class="back-row">
					<view v-if="showCancelApply" class="back-row-item">
						取消申请
					</view>
					<view v-if="showDetail" class="back-row-item" @click="toDetail">
						查看详情
					</view>
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
				default: () => {},
			},
			showSubtitle: {
				type: Boolean,
				default: true,
			},
			isEdit: {
				type: Boolean,
				default: false,
			},
			showBack: {
				type: Boolean,
				default: false,
			},
			showRecived: {
				type: Boolean,
				default: false,
			},
			showBacking: {
				type: Boolean,
				default: false,
			},
			showTitle: {
				type: Boolean,
				default: true,
			},
			showCancelApply: {
				type: Boolean,
				default: false,
			},
			showDetail: {
				type: Boolean,
				default: false,
			},
			minInput: {
				type: Number,
				default: 0,
			},
			maxInput: {
				type: Number,
				default: 999999,
			},
			showSubPrice: {
				type: Boolean,
				default: true,
			},
			showSubCount: {
				type: Boolean,
				default: true,
			},
			showBackStatus: {
				type: Boolean,
				default: false,
			},
			itemBtn: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			showBottomView() {
				return this.showDetail || this.showCancelApply || this.showBacking || this.showRecived
			},
			dataList(){
				if(this.item.refundAmount==4){
					return this.item.detailAppVOS;
				}else{
					return this.item.stockAppVOS;
				}
				
			}
		},
		data() {
			return {
				list: [],
			};
		},
		methods: {
			applyBackItem(item) {

				this.$emit('applyBackItem', item)
			},
			backGoodItem(item) {
				this.$emit('backGoodItem', item)
			},
			tipTitle(e) {
				if ([0, 1].includes(e)) {
					return '退款中'
				} else if (e == 2) {
					return '退款成功'
				} else if (e == 4) {
					return '退款关闭'
				} else {
					return '退款失败'
				}
			},
			confirmGoods(e) {
				this.$emit("confirmGoods", this.item);
			},
			onChange(e, item) {
				this.$emit("numChange", {
					num: e,
					item,
				});
			},
			toDetail() {
				this.$emit("detail", this.item);
			},

			toRefund() {
				this.$emit("refund", this.item);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.close-text {
		color: #333333;
		font-weight: 500;
		font-size: 28rpx;
		margin-left: 16rpx;
	}

	.apply-back {
		width: 160rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		opacity: 1;
		background: #ffffff;
		border: 1rpx solid #eaeaea;
		border-radius: 16rpx;
		color: #111111;
		font-size: 24rpx;
	}

	.price-s {
		color: #333333;
		font-size: 22rpx;
	}

	.price-l {
		color: #333333;
		font-size: 26rpx;
	}

	.store {
		background-color: #fff;
		margin-bottom: 32rpx;

		.store-info {
			display: flex;
			flex-direction: row;
			align-items: center;
			background: #fafafa;
			height: 96rpx;
			padding: 0 32rpx;

			.store-name {
				font-size: 28rpx;
				font-weight: 500;
				color: #111111;
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
		}

		.bor-bottom {
			border-bottom: 1rpx solid #f4f4f4;
		}

		.bottom-view {
			margin: 0 32rpx;
			padding-bottom: 32rpx;
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
					align-items: flex-start;
					width: 100%;
					line-height: 28rpx;

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
		.back-header {
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 32rpx;
			text-align: end;

			.sub {
				color: #999999;
				font-size: 22rpx;
			}
		}

		.color1-text {
			color: #fc8b19;
		}

		.color1-bg {
			background: #fcf9f5;
			border: 1rpx solid #f5d9bc;
		}

		.color2-text {
			color: #0ec270;
		}

		.color2-bg {
			background: #bcf5d9;
			border: 1rpx solid #bcf5d9;
		}

		.color3-text {
			color: #808080;
		}

		.color3-bg {
			background: #f7f7f7;
			border: none;
		}

		.back-item {
			width: 686rpx;
			height: 80rpx;
			line-height: 80rpx;
			border: 1rpx solid #f5d9bc;
			border-radius: 16rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.back-title {
				font-size: 28rpx;
				margin-left: 24rpx;
			}

			.num-z {
				font-size: 32rpx;
			}

			.num-x {
				font-size: 22rpx;
			}

			.back-price {
				margin-left: 16rpx;
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
		margin-top: 16rpx;
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