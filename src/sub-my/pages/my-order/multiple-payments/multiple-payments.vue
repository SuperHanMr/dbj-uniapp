<template>
	<view class="container">
		<view class="remainTime-container" v-if="showCancelOrderBtn">
			<image src="../../../static/ic_time@2x.png" mode=""></image>
			<text>剩余支付时间</text>
			<count-down :start="remainTime" :timeBackground="'#FFEFF1'" :timeColor="'#FF3347'"
				:separatorColor="'#FF3347'"></count-down>
			<!-- <uni-countdown 
				color="#FF3347" 
				background-color="#FFEFF1" 
				:showDay="false"   
				:hour="formatTime(remainTime)[0]" 
				:minute="formatTime(remainTime)[1]" 
				:second="formatTime(remainTime)[2]"
			/> -->
		</view>


		<view class="payItem" v-for="(item,index) in list.details" :key="index">
			<view class="left">
				<text>第{{priceList[index]}}笔支付金额：</text>
				<view class="price" :style="{color:item.status==0?'#FF3347':'#333333'}">
					<text>￥</text>
					<text class="price-font">
						<text style="font-size: 40rpx;font-weight: 500;">{{handlePrice(item.amount)[0]}}.</text>
						<text>{{handlePrice(item.amount)[1]}}</text>
					</text>
				</view>
			</view>
			<view class="right">
				<text v-if="item.status==1">已付款</text>
				<view v-if="item.status==0" class="button" @click="gotoPay(item.id,index)">
					去付款
				</view>
			</view>
		</view>

		<view class="remarks">
			由于支付金额超过单次上限，已为您进行了订单支付拆分，全部支付完成后即购买完
		</view>


		<view :class="{noCancelBtn:!showCancelOrderBtn}" class="bottom-btn"
			:style="{paddingBottom:systemBottom,height:systemHeight}">
			<view class="cancel-btn" v-if="showCancelOrderBtn" @click="handleCancelOrder()">
				取消订单
			</view>
			<view class="total-price">
				<view class="total">
					<text>总计</text>
					<text style="margin-left: 12rpx;">￥</text>
					<text class="price-style price-font">{{handlePrice(list.orderReceivableAmount)[0]}}.</text>
					<text class="price-font">{{handlePrice(list.orderReceivableAmount)[1]}}</text>
				</view>

				<view class="has-pay">
					<text>已支付</text>
					<text style="margin-left: 12rpx;">￥</text>
					<text class="price-style price-font">{{handlePrice(list.totalActualIncomeAmount)[0]}}.</text>
					<text class="price-font">{{handlePrice(list.totalActualIncomeAmount)[1]}}</text>
				</view>
			</view>
		</view>

		<!-- 取消订单的弹框 -->
		<uni-popup ref="cancleOrder" type="dialog">
			<uni-popup-dialog mode="base" title="您确定要取消该订单吗？" :before-close="true" @close="cancelOrderClose"
				@confirm="cancleConfirm" />
		</uni-popup>
	</view>
</template>

<script>
	import {
		querySplitPayList,
		splitPay,
		cancelOrder
	} from "@/api/order.js"
	import {
		log
	} from "@/utils/log.js"
	export default {
		props: {
			num: 0,
			btnContent: "",
		},
		data() {
			return {
				orderId: "",
				remainTime: "",
				type: "", //list 是从订单列表页面  detail 详情页面

				list: [],
				priceList: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
				showCancelOrderBtn: false,

				systemBottom: "",
				systemHeight: "",
			};
		},
		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
			console.log(this.systemBottom);
		},

		onLoad(e) {
			this.orderId = Number(e.orderId)
			this.remainTime = e.remainTime
			console.log("this.remainTime=", this.remainTime)
			this.type = e.type
		},
		onShow() {
			this.requestSplitPayList()

			if (!getApp().globalData.openId) { //确保拿到openId，否则无法支付
				getApp().globalData.openId = uni.getStorageSync("openId");
			}
		},
		methods: {
			requestSplitPayList() {
				querySplitPayList({
					orderId: this.orderId
				}).then(data => {
					this.list = data
					this.showCancelOrderBtn = this.list.details.every(item => {
						return item.status == 0
					})
					console.log("this.showCancelOrderBtn=", this.showCancelOrderBtn)
				})
			},
			// 去付款
			gotoPay(id, index) {
				let openId = getApp().globalData.openId;
				let params = {
					orderId: this.orderId,
					payType: 1, //支付类型  1微信支付"
					orderSplitPayId: id,
					openid: openId, //微信openid 小程序支付用 app支付不传或传空"
				}
				console.log(params);
				splitPay(params).then(e => {
					const payInfo = e.wechatPayJsapi;
					uni.requestPayment({
						provider: "wxpay",
						...payInfo,
						success(res) {
							uni.showToast({
								title: '支付成功',
								icon: "none",
								duration: 1000
							});
							setTimeout(() => {
								// 支付成功后跳转到哪个页面
								if (index < list.details - 1) {
									this.requestSplitPayList()
								} else {
									this.toCancelPage()
								}
								this.requestSplitPayList()
							}, 1000)
						},
						fail(e) {
							// 支付失败时候跳转到哪个页面
							uni.showToast({
								title: '支付失败',
								icon: "none",
								duration: 1000
							});
							log({
								type: "wx-pay-fail",
								page: "multiple-payments",
								data: e,
								openId: getApp().globalData.openId,
								openIdLocal: uni.getStorageSync("openId")
							});
						},
					});
				})
			},
			toCancelPage() {
				if (this.type == 'detail') {
					uni.redirectTo({
						url: `../order-wait-pay/order-wait-pay?orderNo=${data.id}`
					})
				} else {
					uni.redirectTo({
						url: `../my-order?index=2`
					})
				}
			},

			// 取消订单
			handleCancelOrder() {
				this.$refs.cancleOrder.open();
			},
			cancelOrderClose() {
				this.$refs.cancleOrder.close();
			},
			cancleConfirm() {
				console.log("取消订单按钮成功！")
				//点击确定后订单会被取消且该订单会被移入已关闭订单中
				cancelOrder({
					id: this.orderId
				}).then(e => {
					if (e.code == 1) {

						this.$refs.cancleOrder.close();
						this.toCancelPage()
					}
				})
			},




			handlePrice(price) {
				let list = String(price).split(".")
				if (list.length == 1) {
					return [list[0], "00"]
				} else {
					return [list[0], list[1]]
				}
			},
			formatTime(msTime) {
				let time = msTime / 1000;
				let hour = Math.floor(time / 60 / 60) % 24;
				if (!hour) {
					hour = 0
				}
				let minute = Math.floor(time / 60) % 60;
				if (!minute) {
					minute = 0
				}
				let second = Math.floor(time) % 60;
				return [hour, minute, second]
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		overflow-y: auto;
		background-color: #F2F2F2;

		.remainTime-container {
			height: 60rpx;
			padding: 0 204rpx 0 206rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			font-size: 24rpx;
			color: #333333;

			text {
				margin-left: 8rpx;
				margin-right: 12rpx;
			}

			image {
				width: 36rpx;
				height: 36rpx;
				object-fit: cover;
			}
		}

		.payItem {
			margin-top: 16rpx;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			padding: 36rpx 32rpx 32rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.left {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;

				.price {
					font-size: 26rpx;
				}
			}

			.right {
				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 32rpx;
				}

				.button {
					width: 140rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					background: linear-gradient(135deg, #36D9CD 0%, #28C6C6 100%);
					border-radius: 12rpx;
					color: #FFFFFF;
					font-weight: 500;
					font-size: 24rpx;
				}
			}
		}

		.remarks {
			padding: 24rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			line-height: 36rpx;
		}

		.bottom-btn {
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;
			height: 112rpx;
			width: 686rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx;
			font-size: 26rpx;

			.cancel-btn {
				color: #333333;
			}

			.total-price {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				.total {
					color: #999999;
				}

				.has-pay {
					margin-left: 48rpx;
					color: #333333;
				}
			}
		}

		.noCancelBtn {
			justify-content: flex-end !important;
		}

		.price-style {
			font-size: 40rpx;
			font-weight: 500;
		}
	}

	//头部倒计时样式
	::v-deep .uni-countdown__number {
		width: 36rpx !important;
		height: 36rpx !important;
		margin: 0 !important;
	}

	::v-deep .uni-countdown__splitor {
		line-height: 36rpx !important;
		color: #FF3347 !important;
		padding: 0 6rpx 0 4rpx !important;
	}


	// 弹框样式
	::v-deep .uni-popup-dialog {
		width: 560rpx !important;
		border-radius: 24rpx !important;
		background-color: #fff !important;
	}

	::v-deep .uni-dialog-title-text {
		color: #111111 !important;
		font-size: 32rpx !important;
		font-weight: 550 !important;
	}

	::v-deep .uni-dialog-title {
		padding: 48rpx 0 !important;
	}

	::v-deep .uni-dialog-content {
		display: none !important;
	}

	::v-deep .uni-dialog-button-group {
		border-top: 2rpx solid #f5f5f5;
	}

	::v-deep .uni-dialog-button {
		height: 82rpx !important;
	}

	::v-deep .uni-button-color {
		color: #ff3347 !important;
		font-size: 30rpx !important;
		font-weight: 500;
	}

	::v-deep .uni-dialog-button-text {
		font-size: 30rpx !important;
	}
</style>
