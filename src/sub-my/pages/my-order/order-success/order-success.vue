<template>
	<view class="container">
		<custom-navbar :opacity="scrollTop/100" :title="headerTitle">
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" :style="{color: (scrollTop/100>1)?'black':'white'}"
					@click="toBack"></i>
			</template>
		</custom-navbar>
		
		<!-- 退款成功 -->
		<view class="order-container" v-if="type=='refund'" :style="{paddingBottom:systemBottom}">
			<view style="position: relative;" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}">
				<view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"/>
				<view :style="{height:navBarHeight}"></view>
				<view class="order-status">
					<view class="status">
						<image src="../../../static/ic_order_success.svg" mode=""></image>
						<text>退款成功</text>
					</view>
					<text class="time">{{refundInfo.createTime | formatDate}}</text>
				</view>			
			</view>
			

			<view class="order-header1">
				<view class="refund-price">
					<text>退款总金额</text>
					<view style="color:#FF3347;">
						<text style="font-size:26rpx;">￥</text>
						<text style="font-size:40rpx;" class="price-font">{{handlePrice(refundInfo.refundAmount)[0]}}.</text>
						<text style="font-size:26rpx;" class="price-font">{{handlePrice(refundInfo.refundAmount)[1]}}</text>
					</view>
				</view>
				<view class="router">
					<text style="color: #999999;font-size: 26rpx;">原路径返回微信</text>
					<view>
						<text style="font-size: 20rpx;">￥</text>
						<text style="font-size:28rpx;" class="price-font">{{handlePrice(refundInfo.refundAmount)[0]}}.</text>
						<text style="font-size:20rpx;" class="price-font">{{handlePrice(refundInfo.refundAmount)[1]}}</text>
					</view>
				</view>
			</view>

			<view class="body1" v-for="item1 in refundInfo.detailAppVOS" :key="item1.id">
				<order-item
					:dataList="item1"
					:orderType="2"
					:refundType="true"
					@handleDetail="productDetail(item1,'refund')"
				></order-item>
			</view>

			<order-refund-info :refundInfo="refundInfo"></order-refund-info>
		</view>

		<!-- 订单完成页面 -->
		<view class="order-container" v-if="type == 'complete'" :style="{paddingBottom:systemBottom}">
			<view style="position: relative;" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}">
				<!-- 占位 -->
				<view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"/>
				<view :style="{height:navBarHeight}"></view>
				<view class="order-status">
					<view class="status">
						<image src="../../../static/ic_order_success.svg" mode=""></image>
						<text>已完成</text>
					</view>
				</view>				
			</view>

			<order-user-base-info :data="orderInfo"></order-user-base-info>

			<view class="body2">
				<view class="part1" v-for="(item2,index2) in orderInfo.details" :key="index2">
					<view class="header" @click="gotoShop(item2)">
						<text>{{item2.storeName}}</text>
						<image src="../../../static/ic_more.svg" mode=""></image>
					</view>

					<view v-for="item3 in item2.details" :key="item3.id" class="orederItem">
						<order-item
							:dataList="item3"
							:orderStatus="3"
							@handleDetail="productDetail(item3)"
						></order-item>
						<!-- <view class="ww">
							dddd
						</view>
						<store-calue-card-item></store-calue-card-item> -->
					</view>
				</view>
			</view>

			<order-price :data="orderInfo" />

			<order-info :orderNo="orderInfo.orderNo" :createTime="orderInfo.createTime" :showPayTime="true"
				:payTime="orderInfo.payTime" :showPayType="true" />

			<view v-if="orderInfo.showRefundBtn" class="applyforRefund-container" :style="{paddingBottom:systemBottom,height:systemHeight}">
				<view class="applyforRefund" @click="toApplayForRefund(orderInfo,2)">
					申请退款
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		formatDate
	} from "../../../../utils/common.js";
	import {
		getRefundDetail,
		getOrderDetail
	} from "@/api/order.js";
	export default {
		filters: {
			formatDate,
		},
		data() {
			return {
				type: "complete", //type:refund退款详情   complete是订单完成
				id: -1,
				status: "",

				refundInfo: {},
				orderInfo: {},

				systemBottom: "",
				areaId: "",
				navBarHeight:"",
				scrollTop: 0,
				headerTitle:"",
				bgImg:'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png',
			};
		},

		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			console.log(this.systemBottom);
		},

		onPageScroll(scrollTop) {
			this.scrollTop = scrollTop.scrollTop
		},
		
		onLoad(e) {
			this.type = e.type;
			console.log("页面显示类型 this.type=", this.type);
			this.id = Number(e.id);
			console.log("退款单id=", this.id);
			// this.status = e.status?Number(e.status):"";

			if (this.type == "complete") {
				//订单完成页面
				this.headerTitle="订单详情"
				this.orderDetail();
			}

			if (this.type == "refund") {
				//退款成功页面
				this.headerTitle = "退款详情"
				console.log("退款成功页面");
				this.refundDetail();
			}
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
				backgroundColor:'#23d5c6',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},

		methods: {
			orderDetail() {
				console.log("订单完成页面", this.id);
				getOrderDetail({
					id: this.id
				}).then((e) => {
					this.orderInfo = e;
					console.log("获取详情数据data=", this.orderInfo);
				});
			},
			toBack(){
				uni.navigateBack({
					delta:1
				})
			},

			refundDetail() {
				getRefundDetail({
					id: this.id
				}).then((e) => {
					this.refundInfo = e;
					console.log("获取详情数据data=", this.refundInfo);
				});
			},
			// 申请退款
			toApplayForRefund(data, type) {
				wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
				uni.navigateTo({
					url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.id}&type=whole&status=2`,
				});
			},

			handlePrice(price) {
				if(!price) return ['0','00']
				let list = String(price).split(".");
				if (list.length == 1) {
					return [list[0], "00"];
				} else {
					return [list[0], list[1]];
				}
			},

			// 跳转到商品详情页面
			productDetail(item, type) {
				console.log("item=", item, "type=", type);
				if (type == "refund") {
					uni.navigateTo({
						url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.relationId}`,
					});
				} else {
					uni.navigateTo({
						url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`,
						// url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=1382`,
					});
				}
			},
			
			// 跳转到店铺页面
			gotoShop(item2) {
				console.log("去店铺首页！！！！",item2);
				console.log("item.storeId=", item2.storeId, "this.areaId=", this.areaId);
				uni.navigateTo({
					url: `../../../../sub-classify/pages/shops/shops?storeId=${item2.storeId}&areaId=${this.areaId}`,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		
		.back-icon {
			color: white;
			font-size: 40rpx;
			padding: 20rpx;
		}
		.bgcStyle{
			width: 100%; 
			height: 32rpx;
			position: absolute;
			bottom: -32rpx;
			z-index: -1;
		}
		.order-container {
			width: 100%;
			height: 100%;
			overflow: auto;
			.order-status {
				width: 100%;
				height: 140rpx;
				color: #ffffff;
				background-size: 100% 172rpx;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;

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

					text {
						font-size: 48rpx;
						font-weight: 500;
						color: #ffffff;
					}
				}

				.time {
					color: #ffffff;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 26rpx;
					font-weight: 400;
				}
			}

			.order-header1 {
				height: 170rpx;
				background: #ffffff;
				border-radius: 20rpx;
				padding: 32rpx;
				color: #333333;
				font-size: 30rpx;
				box-sizing: border-box;
				flex: 1;
				margin-bottom: 16rpx;

				.refund-price,
				.router {
					display: flex;
					flex: 1;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 16rpx;
				}
			}

			.body1 {
				padding: 32rpx 32rpx 0;
				background: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 16rpx;
			}

			.body2 {
				background: #ffffff;
				border-radius: 24rpx;

				.part1 {
					padding: 32rpx 32rpx 0;
					border-radius: 24rpx 24rpx 0 0;
					background: #ffffff;

					.header {
						box-sizing: border-box;
						display: flex;
						align-items: center;
						flex-flow: row nowrap;
						padding-bottom: 32rpx;

						text {
							font-weight: 500;
							max-width: 476rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #333333;
						}

						image {
							width: 34rpx;
							height: 34rpx;
							object-fit: cover;
						}
					}

					.price-special {
						padding: 16rpx 0 34rpx;
						display: flex;
						flex-flow: row nowrap;
						justify-content: flex-end;

						.button {
							width: 160rpx;
							height: 56rpx;
							line-height: 56rpx;
							text-align: center;
							background: #ffffff;
							color: #111111;
							font-size: 24rpx;
							border-radius: 16rpx;
							border: 2rpx solid #eaeaea;
						}
					}
				}
			}

			.refund-info {
				display: flex;
				flex-flow: column nowrap;
				padding: 32rpx;
				border-radius: 24rpx;
				background: #ffffff;
				color: #333333;

				.header {
					font-size: 30rpx;
					font-weight: 1000;
					height: 48rpx;
					line-height: 48rpx;
					margin-bottom: 16rpx;
				}

				.item {
					font-size: 28rpx;
					display: flex;
					flex: 1;
					flex-flow: row nowrap;
					justify-content: flex-start;
					margin-bottom: 16rpx;

					.item-header {
						width: 140rpx;
						height: 40rpx;
						line-height: 40rpx;
						color: #999999;
						display: block;
						flex: 1;
					}

					.item-body {
						width: 546rpx;
						line-height: 40rpx;
						display: flex;
						flex-flow: row nowrap;
					}
				}

				.item:nth-last-child(1) {
					margin-bottom: 0;
				}
			}
		}
	}

	.copy-style {
		display: block;
		width: 72rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 8rpx;
		text-align: center;
		border: 2rpx solid #eaeaea;
		font-size: 20rpx;
		color: #111111;
	}

	// 底部 确认收货 及申请退款按钮
	.applyforRefund-container {
		position: fixed;
		bottom: 0;
		width: 686rpx;
		background-color: #ffffff;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-end;
		padding: 12rpx 32rpx;

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
