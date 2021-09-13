<template>
	<view>
		<warehouse-item :showBtns="false" :showSubtitle="false" :item="res">

		</warehouse-item>
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
					{{res.totalAmount}}
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
					{{res.freight}}
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
					{{res.handlingFees}}
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
					{{res.storeDiscount}}
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
					{{res.orderId}}
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
					{{res.createTime |formatDate}}
				</view>
			</view>
			<view class="order-info-row">
				<view class="order-info-row-pre">
					付款时间:
				</view>
				<view class="order-info-row-con">
					{{res.pay_time |formatDate}}
				</view>
			</view>
			<view class="order-info-row">
				<view class="order-info-row-pre">
					支付方式:
				</view>
				<view class="order-info-row-con">
					{{payType(res.stockStatus)}}
				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<view v-if="type==0" class="refund-btn">
				退库存
			</view>
			<view v-if="type==0" class="big-btn">
				退库存
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../../utils/common.js'
	import {
		deliveredDetail,
		receivedDetail,
		refundDetail
	} from "../../../api/order.js"
	export default {

		filters: {
			formatDate
		},
		data() {
			return {
				pay_time: '1631515894',
				res: {

				},
				type: -1,
				id: ''
			}
		},
		onLoad(e) {
			let type = e.type;
			this.type = type
			let id = e.id;
			this.id = id
			console.log(type, id, '!!!!!!!!!!');
			this.loadData(type, id);
		},
		methods: {
			payType(type) {
				if (type == 2) {
					return '支付宝支付'
				} else if (type == 1) {
					return '微信支付'
				} else {
					return '其他'
				}
			},
			loadData(type, id) {
				if (type == 0) {
					deliveredDetail({
						orderId: id
					}).then(e => {
						this.res = e;
					})
				} else if (type == 1 || type == 2) {
					receivedDetail({
						id
					}).then(e => {
						this.res = e;
					})
				} else if (type == 3) {
					refundDetail({
						id
					}).then(e => {
						this.res = e;
					})
				}

			},
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
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 136rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-bottom: 20rpx;

		.refund-btn {
			width: 188rpx;
			height: 88rpx;
			opacity: 1;
			border: 1rpx solid #cccccc;
			border-radius: 16rpx;
			margin-right: 32rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 30rpx;
			color: #666666;
		}

		.big-btn {
			width: 466rpx;
			height: 88rpx;
			line-height: 88rpx;
			opacity: 1;
			background: linear-gradient(135deg, #00bfaf, #00bfbc);
			border-radius: 16rpx;
			margin-right: 32rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #ffffff;
			text-align: center;
		}

		.apply-refund {
			width: 160rpx;
			height: 56rpx;
			line-height: 56rpx;
			opacity: 1;
			background: #ffffff;
			border: 1rpx solid #eaeaea;
			border-radius: 16rpx;
		}

	}

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
</style>
