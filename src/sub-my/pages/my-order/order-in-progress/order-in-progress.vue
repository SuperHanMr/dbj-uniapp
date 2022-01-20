<template>

	<view class="container">
		<!-- 进行中 -->
		<custom-navbar :opacity="scrollTop/100" :title="headerTitle">
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" :style="{color: (scrollTop/100>1)?'black':'white'}"
					@click="toBack"></i>
			</template>
		</custom-navbar>

		<view style="position: relative;" >
			<!-- 占位 -->
			<view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}" />
			<view :style="{height:navBarHeight}"></view>
			<view class="order-status">
				<view class="status">
					<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_status_inprogress.svg" mode="scaleToFill"></image>
					<view>进行中</view>
				</view>
			</view>
		</view>
		<view class="order-container" :style="{paddingBottom:112+containerBottom+'rpx'}">

			<order-user-base-info :data="orderInfo"></order-user-base-info>

			<view class="storeContainer">
				<view v-for="item in orderInfo.details" :key="item.storeId" class="item">
					<view class="header">
						<view class="header-content">
							<view class="storeName" @click="gotoShop(item)">{{item.storeName}}</view>
							<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" mode=""/>
						</view>
						<view class="icon"></view>
					</view>

					<view v-for="item2 in item.details" :key="item2.id" class="orederItem">
						<order-item :orderStatus="2" :paddingBottom="24" :dataList="item2"
							:productNum="item.details.length"
							:refundApplyMode="orderInfo.refundApplyMode"
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

			<order-info v-if="orderInfo.orderNo" :orderNo="orderInfo.orderNo" :createTime="orderInfo.createTime" :showPayTime="true"
				:showPayType="true" :payTime="orderInfo.payTime" :payChannel="orderInfo.payChannel" />

			<view class="applyforRefund-confirmReceipt" :style="{paddingBottom:systemBottom,height:systemHeight}"
				v-if="orderInfo.showRefundBtn || (orderInfo.stockType == 0 && orderInfo.shipmentStatus == 1)">
				<view v-if="orderInfo.showRefundBtn" class="applyforRefund" @click="toApplayForRefund(orderInfo,2)">
					申请退款
				</view>
				<view v-if="orderInfo.stockType==0 && orderInfo.shipmentStatus == 1" class="confirmReceipt"
					@click="handleConfirmReceipt">
					确认收货
				</view>
			</view>

			<!-- 申请退款之后的其他状态 -->
			<!--
				showRefundBtn  是否显示退款按钮
				refundApplyMode 申请方式 1单商品 2 整单退款
				stockType 库存方式 0无仓库 1有仓库  服务订单默认显示的是零
				shipmentStatus 发货状态（0待发货 1待收货 2已收货）
				type:1 材料 2 服务
			-->
			<view class="applyforRefund-confirmReceipt2" :style="{paddingBottom:systemBottom}"
				v-if="!orderInfo.showRefundBtn && orderInfo.refundApplyMode == 2 && (orderInfo.stockType == 0 || orderInfo.type == 2)">

				<view class="refundOrderStatus"
					v-if="orderInfo.refundBillStatus == 0 || (orderInfo.refundBillStatus == 1 && orderInfo.type == 2)"
					@click="refundCancel(orderInfo)">
					取消退款
				</view>

				<view class="refundOrderStatus" v-if="orderInfo.refundBillStatus == 2"
					@click="refundSuccess(orderInfo)">
					退款成功
				</view>

				<view class="refundOrderStatus" style="color:#FF3347;" v-if="orderInfo.refundBillStatus == 5"
					@click="refundFailed(orderInfo)">
					退款失败
				</view>

				<view class="refundOrderStatus"
					v-if="(orderInfo.refundBillStatus == 3 || orderInfo.refundBillStatus == 4) && (orderInfo.shipmentStatus == 0 || (orderInfo.type ==2 && orderInfo.shipmentStatus == -1 ))"
					@click="refundClose(orderInfo)">
					退款关闭
				</view>
			</view>

		</view>

		<!-- 确认收货的弹框 -->
		<popup-dialog ref="confirmReceipt" :title="title" @close="confirmReceiptClose" @confirm="receiptConfirm" />

		<!-- 取消退款的弹框 -->
		<popup-dialog ref="cancelRefund" :title="title" @close="cancelRefundClose" @confirm="cancelRefundConfirm" />
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
				from: "",
				title: "",
				navBarHeight: "",
				scrollTop: 0,
				headerTitle: "",
				bgImg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/order_bg.png",
			};
		},

		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.containerBottom = menuButtonInfo.bottom;
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			this.systemHeight = menuButtonInfo.bottom + "rpx";
		},
		onPageScroll(scrollTop) {
			this.scrollTop = scrollTop.scrollTop;
		},
		onLoad(e) {
			if (e && e.orderNo) {
				this.orderNo = e.orderNo;
				console.log("进行中订单id==",this.orderNo)
			}
			this.from = e.from || "";
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
				frontColor: "#ffffff",
				backgroundColor: "#ff0000",
				animation: {
					duration: 400,
					timingFunc: "easeIn",
				},
			});
		},
		onShow() {
			this.headerTitle = "订单详情";
			this.orderDetail();
		},

		methods: {
			orderDetail() {
				getOrderDetail({
					id: this.orderNo,
				}).then((e) => {
					this.orderInfo = e;
				});
			},
			toBack() {
				console.log("this.from ===", this.from);
				if (this.from == "comfirmOrder") {
					uni.redirectTo({
						url: "../my-order?firstEntry=true&index=2",
					});
				} else if (this.from == "all") {
					uni.redirectTo({
						url: "../my-order?firstEntry=true&index=99",
					});
				} else {
					uni.redirectTo({
						url: "../my-order?firstEntry=true&index=2",
					});
				}
			},
			// 申请退款
			toApplayForRefund(data, type) {
				this.title = "您确定要取消订单吗?";
				if (type == 1) {
					//type 1部分退款=
					console.log("orderId=", this.orderInfo.orderId);
					console.log("部分退款", "data=", data);
					console.log("orderDetailsId=", data.orderDetailId);
					// return
					uni.navigateTo({
						url: `/sub-my/pages/apply-for-refund/apply-for-refund?orderId=${this.orderNo}&type=partical&status=1&applyMode=1&orderDetailsId=${data.orderDetailId}`,
					});
					// wx.setStorageSync("particalRefundOrderInfo", JSON.stringify(data));
					// uni.navigateTo({
					// 	url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.orderNo}&type=partical&status=1`,
					// });
				} else {
					//type 2 整体退款
					console.log("全部退款data=", data);
					// wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
					uni.navigateTo({
						url: `/sub-my/pages/apply-for-refund/apply-for-refund?orderId=${this.orderNo}&type=whole&status=1&applyMode=2`,
					});
				}
			},

			refundCancel(item) {
				this.itemId = item.refundId;
				this.approvalCompleted = item.approvalCompleted
				if(this.approvalCompleted){
					this.title="退款审核已通过，不可取消"
				}else{
					this.title = "确定要取消本次申请退款？";
				}
				this.$refs.cancelRefund.open();
			},
			cancelRefundClose() {
				this.$refs.cancelRefund.close();
			},
			cancelRefundConfirm() {
				if(this.approvalCompleted){
					this.$refs.cancelRefund.close()
				}else{
					cancelRefund({
						id: this.itemId,
					}).then(() => {
						this.$refs.cancelRefund.close();
						this.orderDetail();
					});
				}
			},

			// 申请退款成功
			refundSuccess(item) {
				uni.navigateTo({
					url: `../order-success/order-success?type=refund&id=${item.refundId}`,
				});
			},
			refundFailed(item) {
				console.log("item数据=", item, "测试");
				const showReApply = item.shipmentStatus !== 2 ? true : false;
				console.log("showReApply=", showReApply);
				uni.navigateTo({
					url: `../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`,
				});
			},

			refundClose(item) {
				console.log("item数据=", item);
				const showReApply = item.shipmentStatus !== 2 ? true : false;
				console.log("showReApply=", showReApply);
				uni.navigateTo({
					url: `../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`,
				});
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
					id: this.orderNo,
				}).then(() => {
					this.$refs.confirmReceipt.close();
					uni.redirectTo({
						url: `../order-success/order-success?type=complete&id=${this.orderNo}`,
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
		 display: flex;
		 justify-content: space-between;
		.header-content{
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.storeName {
				height: 40rpx;
				color: #333333;
				font-weight: 500;
				max-width: 476rpx;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			image {
				width: 40rpx;
				height: 40rpx;
				object-fit: cover;
			}
		}
		.icon{
			width: 1rpx;
		}
	}

	.back-icon {
		color: white;
		font-size: 40rpx;
		padding: 20rpx;
	}

	.container {
		// width: 100%;
		// height: 100%;
		// overflow: auto;
		// padding-bottom: 100rpx;

		.bgcStyle {
			width: 100%;
			height: 116%;
			// height: 32rpx;
			position: absolute;
			bottom: -32rpx;
			z-index: -1;
		}

		.order-status {
			width: 100%;
			// height: 140rpx;
			color: #ffffff;
			background-size: 100% 172rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			position: relative;

			.status {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-bottom: 32rpx;

				image {
					width: 64rpx;
					height: 64rpx;
					object-fit: cover;
					margin-right: 12rpx;
				}

				view {
					font-size: 40rpx;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}

		.order-container {
			width: 100%;
			height: 100%;
			overflow: auto;

			.storeContainer {
				.item {
					padding: 32rpx 32rpx 2rpx;
					background: #ffffff;
					border-radius: 24rpx 24rpx 0 0;
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
	.applyforRefund-confirmReceipt,
	.applyforRefund-confirmReceipt2 {
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
			background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
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

	.applyforRefund-confirmReceipt {
		padding-top: 30rpx;
	}
	.applyforRefund-confirmReceipt2 {
		padding-top: 30rpx;

		.refundOrderStatus {
			width: 160rpx;
			height: 56rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 16rpx;
			border: 2rpx solid #eaeaea;
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
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
