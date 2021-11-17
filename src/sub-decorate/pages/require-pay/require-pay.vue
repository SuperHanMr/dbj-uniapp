<template>
	<view>
		<view class="store">
			<view class="header">
				{{detail.storeName}}
			</view>
			<view class="items" v-for="(sub,subIndex) in detail.details" :key="subIndex">
				<image class="img" :src="sub.imgUrl" mode=""></image>
				<view class="content">
					<view class="title">
						<text class="tip"></text>
						{{sub.fullName}}
					</view>
					<view>
						<view class="spec">
							{{sub.scaleProperties}}
						</view>
					</view>

					<view class="sub-title">
						本次要货{{sub.requireNumber}}{{sub.unit}}
					</view>
					<view class="price">
						<text class="unit">¥</text> <text class="price-font">{{sub.price}}</text> /{{sub.unit}}
					</view>
				</view>
			</view>

			<view class="other-pay border-top">
				<view class="title">
					运费
				</view>
				<view class="amount">
					<text class="unit">¥ </text> {{detail.freight}}
				</view>
			</view>

			<view class="other-pay ">
				<view class="title">
					搬运费
				</view>
				<view class="amount">
					<text class="unit">¥ </text> {{detail.handlingFees}}
				</view>
			</view>
		</view>
		<view style="height: 200rpx;">

		</view>
		<bottom-btn :showDefaultBtn="false" bgcolor="#FFF">
			<template v-slot:default>
				<view class="reject-btn" @click="onReject">
					拒绝申请
				</view>
				<view style="flex: 1;">

				</view>
				<view class="agree-btn" @click="onConform">

					同意 <text v-if="totalPrice">并支付¥ {{totalPrice}}</text>
				</view>
			</template>

		</bottom-btn>
	</view>
</template>

<script>
	import {
		requireListDetail,
		requireConfirm,
		payFreight,
	} from "../../../api/decorate.js";
	export default {
		data() {
			return {
				id: "18",
				list: [],
				detail: {},
			};
		},
		computed: {
			totalPrice() {
				if (this.detail.handlingFees || this.detail.freight) {
					return (this.detail.handlingFees + this.detail.freight).toFixed(2);
				} else {
					return 0
				}

			},
		},
		methods: {
			onReject() {
				uni.showModal({
					content: '是否拒绝要货申请',
					success: (res)=> {
						if (res.confirm) {
							this.toReject()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			toReject() {
				requireConfirm({
					requireId: this.id,
					status: 4,
				}).then((e) => {
					uni.navigateBack({

					})
				});
			},
			onConform() {
				if (!this.totalPrice) {
					requireConfirm({
						requireId: this.id,
						status: 2,
					}).then((e) => {
						uni.navigateBack({

						})
					});
				} else {
					let openid = getApp().globalData.openId;
					payFreight({
						orderId: this.detail.orderId,
						goodsRequireId: this.id,
						payType: 1,
						openid,
					}).then((e) => {
						const payInfo = e.wechatPayJsapi;
						uni.requestPayment({
							provider: "wxpay",
							...payInfo,
							success(res) {
								uni.showToast({
									title: '支付成功'
								})
								uni.navigateBack({

								})
							},
							fail(e) {
								console.log(e);
							},
						});
					});
				}
			},
			getDetail() {
				requireListDetail({
					id: this.id,
				}).then((e) => {
					this.detail = e;
				});
			},
			submit() {
				uni.redirectTo({
					url: "../require-success/require-success",
				});
			},
		},
		onLoad(e) {
			const data = getApp().globalData.decorateMsg.msgBody
			let res = JSON.parse(data);
			this.id = res.requireId;
			console.log(getApp().globalData.decorateMsg)
			console.log(this.id)
			this.getDetail();
		},
		onShow() {
			if (!getApp().globalData.openId) { //确保拿到openId，否则无法支付
				getApp().globalData.openId = uni.getStorageSync("openId");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.price-font {
		font-size: 28rpx;
		font-weight: 500;
	}

	.price-uit {
		font-size: 22rpx;
	}

	.tip {
		display: inline-block;
	}

	.spec {
		display: inline-block;
		background: #fafafa;
		border: 1rpx solid #f0f0f0;
		border-radius: 6rpx;
		padding: 6rpx 12rpx;
		font-size: 22rpx;
		color: #999999;
	}

	.price {
		color: #333333;
		font-size: 24rpx;
	}

	.spec {
		display: inline-block;
		background: #fafafa;
		border: 1rpx solid #f0f0f0;
		border-radius: 6rpx;
		padding: 6rpx 12rpx;
		font-size: 22rpx;
		color: #999999;
	}

	.price {
		color: #333333;
		font-size: 24rpx;
	}

	.reject-btn {
		width: 188rpx;
		height: 88rpx;
		line-height: 88rpx;
		opacity: 1;
		border: 1rpx solid #cccccc;
		border-radius: 16rpx;
		text-align: center;
		color: #666666;
		font-size: 30rpx;
		margin-left: 32rpx;
	}

	.agree-btn {
		width: 466rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		color: #ffffff;
		font-size: 30rpx;
		background: linear-gradient(135deg, #00bfaf, #00bfbc);
		border-radius: 16rpx;
		margin-right: 32rpx;
	}

	.store {
		padding: 0 32rpx;
		background-color: #fff;
		margin-bottom: 16rpx;

		.items {
			display: flex;
			padding: 0 0 32rpx 0;

			.img {
				width: 192rpx;
				height: 192rpx;
				border: 1rpx solid #f4f4f4;
				border-radius: 8rpx;
				background-color: yellow;
			}

			.content {
				flex: 1;
				margin-left: 24rpx;

				.title {
					color: #333333;
					font-size: 28rpx;
					white-space: normal;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
				}

				.sub-title {
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999999;
					text-align: end;
				}
			}
		}

		.header {
			width: 100%;
			height: 74rpx;
			display: flex;
			align-items: flex-end;
			color: #333333;
			font-size: 28rpx;
			font-weight: 500;
			margin-bottom: 32rpx;
		}
	}

	.other-pay {
		height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.amount {
			font-size: 26rpx;
			color: #333333;

			.unit {
				font-size: 22rpx;
			}
		}

		.amount {
			font-size: 26rpx;
			color: #333333;
		}
	}

	.border-top {
		border-top: 1rpx solid #f4f4f4;
	}
</style>
