<template>

	<view class="container">
		<!-- 进行中 -->
		<custom-navbar opacity="1" :title="title" titleColor="#ffb245" bgcolor="#ffb245">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white" style="color: white;">
					</i>
				</view>
			</template>
		</custom-navbar>
		<!-- 占位 -->
		<view :style="{height:navBarHeight}"></view>
		<!-- 占位 -->
		<!-- <view style="height: 10rpx;"></view> -->
		
		<view class="order-container" :style="{paddingBottom:112+containerBottom+'rpx'}">
			<view class="order-status">
				<view class="backgroundStyle" />

				<view class="status">
					<image src="../../../static/ic_status_inprogress.svg" mode="scaleToFill"></image>
					<view>进行中</view>
				</view>

			</view>

			<order-user-base-info :data="orderInfo"></order-user-base-info>

			<view class="storeContainer">
				<view v-for="item in orderInfo.details" :key="item.storeId" class="item">
					<view class="header" @click="gotoShop(item)">
						<view>{{item.storeName}}</view>
						<image src="../../../static/ic_more.svg" mode=""></image>
					</view>

					<view v-for="item2 in item.details" :key="item2.id" class="orederItem">
						<order-item
							:orderStatus="2"
							:paddingBottom="24"
							:dataList="item2"
							:showOriginPrice="orderInfo.discount && item.details.length"
							@handleDetail="goToDetail(item2)"
							@toApplayForRefund="toApplayForRefund(item2,1)"
							@refundCancel="refundCancel(item2)"
							@refundSuccess="refundSuccess(item2)"
							@refundFailed="refundFailed(item2,1)"
							@refundClose="refundClose(item2)"
						/>
					</view>
				</view>

				<order-price :data="orderInfo" />

			</view>

			<order-info
				:orderNo="orderInfo.orderNo"
				:createTime="orderInfo.createTime"
				:showPayTime="true"
				:showPayType="true"
				:payTime="orderInfo.payTime"
			/>

			<view 
				class="applyforRefund-confirmReceipt" 
				:style="{paddingBottom:systemBottom,height:systemHeight}"
				v-if="orderInfo.showRefundBtn || (orderInfo.stockType==0 &&orderInfo.shipmentStatus == 1)"
			>
				<view 
					v-if="orderInfo.showRefundBtn" 
					class="applyforRefund" 
					@click="toApplayForRefund(orderInfo,2)"
				>
					申请退款
				</view>
				<view 
					v-if="orderInfo.stockType==0 && orderInfo.shipmentStatus == 1" 
					class="confirmReceipt" 
					@click="handleConfirmReceipt"
				>
					确认收货
				</view>
			</view>

		</view>

		<!-- 确认收货的弹框 -->
		<popup-dialog
			ref="confirmReceipt"
			:title="title"
			@close="confirmReceiptClose"
			@confirm="receiptConfirm"
		/>

		<!-- 取消退款的弹框 -->
		<popup-dialog
			ref="cancelRefund"
			:title="title"
			@close="cancelRefundClose"
			@confirm="cancelRefundConfirm"
		/>
	</view>

</template>

<script>
	import {
		getOrderDetail,
		confirmReceiptOrder,
		cancelRefund,
	} from "../../../../api/order.js";
	export default {
		data() {
			return {
				orderNo: "",
				orderInfo: {},
				type: "",

				systemBottom: "",
				systemHeight: "",
				containerBottom: "",
				areaId: "",
				from:"" ,
				title:"",
				navBarHeight: "",
			};
		},

		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.containerBottom = menuButtonInfo.bottom;
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
		},

		onLoad(e) {
			if (e && e.orderNo) {
				this.orderNo = e.orderNo;
			}
			this.from= e.from || ''
			const currentHouse = getApp().globalData.currentHouse;
			this.areaId = currentHouse.areaId;
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#ff0000',
				animation: {
						duration: 400,
						timingFunc: 'easeIn'
				}
			})
		},
		onShow() {
			this.orderDetail();
		},

		// 改变返回下一个页面的路径
		onUnload() {
		  if(this.from=="comfirmOrder"){
				uni.redirectTo({
					url:"../my-order?firstEntry=true&index=2"
				})
			}else{
				uni.navigateBack({
				    delta: 1
				});
			}
		},

		methods: {
			orderDetail() {
				getOrderDetail({
					id: this.orderNo
				}).then((e) => {
					this.orderInfo = e;;
				});
			},
			toBack(){
				if(this.from=="comfirmOrder"){
					uni.redirectTo({
						url:"../my-order?firstEntry=true&index=2"
					})
				}else{
					uni.redirectTo({
						url:"../my-order?firstEntry=true&index=2"
					})
				}
			},
			// 申请退款
			toApplayForRefund(data, type) {
				this.title="您确定要取消订单吗?"
				if (type == 1) {
					//type 1部分退款
					console.log("部分退款","data=",data);
					wx.setStorageSync("particalRefundOrderInfo", JSON.stringify(data));
					uni.navigateTo({
						url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.orderNo}&type=partical&status=1`,
					});
					
				} else {
					//type 2 整体退款
					console.log("全部退款data=",data);
					wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
					uni.navigateTo({
						url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.orderNo}&type=whole&status=1`,
					});
				}
			},
			refundCancel() {
				this.$refs.cancelRefund.open();
			},
			cancelRefundClose() {
				this.$refs.cancelRefund.close();
			},
			cancelRefundConfirm() {
				cancelRefund({
					id: this.itemId
				}).then((e) => {
					this.$refs.cancelRefund.close();
					this.orderDetail();
				});
			},

			// 申请退款成功
			refundSuccess(item) {
				uni.navigateTo({
					url: `../order-success/order-success?type=refund&id=${item.refundId}`,
				});
			},
			refundFailed(item) {},

			refundClose(item) {
				console.log("item数据=",item)
				const showReApply= item.shipmentStatus !== 2 ? true : false
				console.log("showReApply=",showReApply)
				uni.navigateTo({
					url:`../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`
				})
			},

			// 点击商品区域，跳转到商品详情页面
			goToDetail(item2) {
				uni.navigateTo({
					url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item2.id}`,
				});
			},
			// 跳转到店铺页面
			gotoShop(item) {
				console.log("去店铺首页！！！！");
				console.log("this.storeId=", item.storeId, "this.areaId=", this.areaId);
				uni.navigateTo({
					url: `../../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`,
				});
			},

			// 确认收货
			handleConfirmReceipt() {
				this.title = "确定要确认收货吗?";
				this.$refs.confirmReceipt.open();
			},
			confirmReceiptClose() {
				this.$refs.confirmReceipt.close();
			},
			receiptConfirm(value) {
				// 确认收货的订单接口
				confirmReceiptOrder({
					id: this.orderNo
				}).then(()=> {
					this.$refs.confirmReceipt.close();
					uni.redirectTo({
						url:`../order-success/order-success?type=complete&id=${this.orderNo}`
					});
				});
			},

			formatTime(msTime) {
				let time = msTime / 1000;
				let hour = Math.floor(time / 60 / 60) % 24;
				if (!hour) {
					hour = 0;
				}
				let minute = Math.floor(time / 60) % 60;
				if (!minute) {
					minute = 0;
				}
				let second = Math.floor(time) % 60;
				return [hour, minute, second];
			},
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		margin-bottom: 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		view {
			font-weight: 500;
			height: 40rpx;
			line-height: 40rpx;
			max-width: 476rpx;
			font-size: 28rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		image {
			width: 34rpx;
			height: 34rpx;
			object-fit: cover;
		}
	}

	.container {
		width: 100%;
		height: 100%;
		overflow: auto;
		padding-bottom: 100rpx;

		.order-container {
			.order-status {
				width: 100%;
				height: 140rpx;
				color: #ffffff;
				background-size: 100% 172rpx;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				position: relative;

				.backgroundStyle {
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 172rpx;
					background-color: #ffb245;
				}

				.status {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					margin-bottom: 8rpx;

					image {
						width: 64rpx;
						height: 64rpx;
						object-fit: cover;
						margin-right: 12rpx;
					}

					view {
						font-size: 48rpx;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}

			.storeContainer {
				.item {
					padding: 32rpx 32rpx 2rpx;
					background: #ffffff;
					border-radius: 24rpx 24rpx 0 0;

					.orederItem {}
				}
			}

			.body2 {
				padding: 32rpx 32rpx 0;
				background: #ffffff;
				border-radius: 24rpx 24rpx 0 0;

				.shop-item {
					margin-bottom: 32rpx;

					.split-line {
						height: 1rpx;
						background-color: #ebebeb;
					}
				}

				.shop-item:nth-last-child(1) {
					margin-bottom: 0;
				}
			}

			.payment-method {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				background-color: #ffffff;
				height: 112rpx;
				color: #333333;
				font-size: 30rpx;
				font-weight: 500;
				padding: 32rpx;
				margin-bottom: 16rpx;
				border-radius: 24rpx;
				box-sizing: border-box;

				.method {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
						object-fit: cover;
						margin-right: 16rpx;
					}

					text {
						font-size: 28rpx;
					}
				}
			}

			.contact-service {
				margin-top: 16rpx;
				background-color: #ffffff;
				padding: 38rpx 32rpx;
				border-radius: 24rpx;
				font-size: 26rpx;
				height: 112rpx;
				text-align: center;
				box-sizing: border-box;
			}
		}
	}

	// 底部 确认收货 及申请退款按钮
	.applyforRefund-confirmReceipt {
		position: fixed;
		bottom: 0;
		width: 686rpx;
		background-color: #ffffff;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-end;
		padding: 12rpx 32rpx;

		.confirmReceipt {
			width: 248rpx;
			height: 88rpx;
			line-height: 88rpx;
			box-sizing: border-box;
			background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
			border-radius: 12rpx;
			font-size: 32rpx;
			text-align: center;
			font-weight: 400;
			color: #ffffff;
		}

		.applyforRefund {
			margin: 18rpx 0;
			box-sizing: border-box;
			width: 160rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			background: #ffffff;
			border-radius: 16rpx;
			color: #111111;
			font-size: 24rpx;
			border: 2rpx solid #eaeaea;
		}
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
