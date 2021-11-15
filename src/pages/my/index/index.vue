<template>
	<view class="my-container">
		<custom-navbar opacity="0" :showBack="true"></custom-navbar>
		<view v-if="!userId" class="backgroundStyle"
			style="background-image: url(https://ali-image.dabanjia.com/image/20210513/10/162087290165628.png);background-size: cover;">
			<view class="mask">
				<view class="linearStyle" />
			</view>
		</view>
		<view v-else class="backgroundStyle"
			:style="{backgroundImage:userInfo.avatar?`url(${userInfo.avatar}?x-oss-process=image/resize,m_mfit,w_375,h_245)`:url(),backgroundSize: 'cover'}">
			<view class="mask">
				<view class="linearStyle" />
			</view>
		</view>

		<view class="my-header">
			<view class="avatar-img" v-if="!userId" @click="handlerPersonalData()">
				<image src="https://ali-image.dabanjia.com/image/20210513/10/162087290165628.png" class="avatar"  mode="aspectFill"/>
				<view class="user-name">
					<view class="name">
						<text class="name">
							{{userName}}
						</text>
						<image src="../../../static/order/images/icon_to_login.png" mode=""></image>
					</view>

				</view>
			</view>

			<view class="avatar-img" v-else @click="handlerPersonalData()">
				<image :src="`${userInfo.avatar}?x-oss-process=image/resize,m_mfit,w_60,h_60`" class="avatar" mode="aspectFill"/>
				<view class="user-name">
					<text class="name">{{userName}} </text>
					<view class="edit-info">
						<image src="../../../static/order/images/mineEdit@2x.png" mode="" />
						<text>编辑个人资料</text>
					</view>
				</view>
			</view>

			<view class="set-up" @click="handleSetUp">
				<image src="../../../static/order/images/setting.svg" mode="" />
			</view>
		</view>

		<view class="my-order">
			<view class="order-header">
				<view class="order">我的订单</view>
				<view class="total" @click="handlerViewAll()">
					<text>全部订单</text>
					<image src="../../../static/order/images/arraw_right_@2x.png" mode="" />
				</view>
			</view>
			<view class="order-line" />
			<view class="order-body">
				<view class="item" v-for="(item,index) in orderStatusList" :key="item.key" @click="handlerOrder(item)">
					<view class="waitPayIcon" v-if="index == 0 && waitPayOrderNum"
						:class="{twoNumber:waitPayOrderNum > 9 && waitPayOrderNum < 100,threeNumber:waitPayOrderNum>=100}">
						{{ waitPayOrderNum }}
					</view>
					<image :src="item.image" mode="" />
					<text style="color:#333333;font-size: 24rpx;">{{item.value}}</text>

				</view>
			</view>
		</view>

		<view class="my-tools">
			<view class="header"> 更多功能</view>
			<view class="tool-line" />
			<view class="tool-body">
				<view class="tool-item" v-for="item2 in list" :key="item2.key" @click="handlePersonalItem(item2)">
					<view class="left">
						<image :src="item2.image" mode="" />
						<text>{{item2.value}}</text>
					</view>
					<view class="right">
						<text v-if="item2.key==1">3823.32元</text>
						<image src="../../../static/order/images/arraw_right_@2x.png" mode="" />
					</view>
				</view>
				<!-- <view class="tool-item" @click="toCard">
					<view class="left">
						<text>储值卡</text>
					</view>
					<view class="right">
						<image src="../../../static/order/images/arraw_right_@2x.png" mode="" />
					</view>
				</view> -->
			</view>
		</view>

	</view>
</template>

<script>
	import {
		uniBadge
	} from "@dcloudio/uni-ui";
	import {
		queryToBePaidOrderNum
	} from "../../../api/order.js";
	export default {
		components: {
			uniBadge,
		},
		data() {
			return {
				waitPayOrderNum: "",
				isLogin: false,
				userName: "用户名称",
				userInfo: {},
				userId: "",
				list: [
					// {
					// 	key: "1",
					// 	image: "../../../static/order/images/ic_storeValueCard.svg",
					// 	value: "储值卡",
					// 	url: "../../../sub-my/pages/deposit-card/deposit-card",
					// },
					{
						key: "2",
						image: "../../../static/order/images/shopping_Cart.png",
						value: "购物车",
						url: "../../../sub-my/pages/shopping-cart/shopping-cart",
					},
					{
						key: "3",
						image: "../../../static/order/images/collection.png",
						value: "我的收藏",
						url: "../../../sub-my/pages/personal-center/my-collection/my-collection?firstEntry=true",
					},
					{
						key: "4",
						image: "../../../static/order/images/attention.png",
						value: "我的关注",
						url: "../../../sub-my/pages/personal-center/my-attention/my-attention",
					},
					{
						key: "5",
						image: "../../../static/order/images/houseGgr.png",
						value: "房屋管理",
						url: "../../../sub-my/pages/my-house/my-house?isMy=true",
					},
				],
				orderStatusList: [{
						key: "1",
						image: "../../../static/order/images/wait_pay.svg",
						value: "待付款",
						url: "../../../sub-my/pages/my-order/my-order?index=1&firstEntry=true",
					},
					{
						key: "2",
						image: "../../../static/order/images/inprogress.svg",
						value: "进行中",
						url: "../../../sub-my/pages/my-order/my-order?index=2&firstEntry=true",
					},
					{
						key: "3",
						image: "../../../static/order/images/order_done.svg",
						value: "已完成",
						url: "../../../sub-my/pages/my-order/my-order?index=3&firstEntry=true",
					},
					{
						key: "4",
						image: "../../../static/order/images/evaluate.svg",
						value: "评价",
						url: "../../../sub-my/pages/evaluate/evaluate",
					},
					{
						key: "5",
						image: "../../../static/order/images/refund.svg",
						value: "退款", //退款列表
						url: "../../../sub-my/pages/refund-list/refund-list",
					},
				],
			};
		},
		mounted() {
			uni.showTabBar();
		},
		onShow() {
			uni.showTabBar();
			this.userId = getApp().globalData.token;
			if (!this.userId) {
				this.waitPayOrderNum = 0;
				this.userName = "点击登录";
				this.isLogin = false;
				this.userInfo = null;
			} else {
				this.isLogin = true;
				this.userInfo = getApp().globalData.userInfo;
				this.userName = this.userInfo.name;
				queryToBePaidOrderNum().then((e) => {
					// console.log("!!!!!!!!!!!!! data=", e);
					this.waitPayOrderNum = e ? e : 0;
				});
			}
			this.$store.dispatch("updateTabBarBadge");
		},

		onLoad() {
			getApp().globalData.currentRoute = "/pages/my/index/index";
		},

		methods: {
			toLogin() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: "../../login/login",
					});
				}
			},
			handlerToSetUp() {
				console.log("点击了设置");
				uni.navigateTo({
					url: "../../real-case/real-case",
				});
			},

			handleSetUp() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: "../../login/login",
					});
				} else {
					console.log("点击设置");
					uni.navigateTo({
						url: "../../../sub-my/pages/set-up/set-up",
					});
				}
			},
			handlerPersonalData() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: "../../login/login",
					});
				} else {
					uni.navigateTo({
						url: "../../../sub-my/pages/edit-personal-data/edit-personal-data",
					});
				}
			},
			handlePersonalItem(item) {
				console.log(item.url, "key");
				if (!this.isLogin) {
					uni.navigateTo({
						url: "../../login/login",
					});
				}else{
					uni.navigateTo({
						url: item.url,
					});
				}
			},
			toCard(){
				uni.navigateTo({
					url: "/sub-my/pages/deposit-card/deposit-card"
				})
			},
			handlerViewAll() {
				console.log("点击我的订单全部按钮");
				if (!this.isLogin) {
					uni.navigateTo({
						url: "../../login/login",
					});
				}else{
					uni.navigateTo({
						url: "../../../sub-my/pages/my-order/my-order?index=99&firstEntry=true",
					});
				}
			},
			handlerOrder(item) {
				console.log(item.value);
				if (!this.isLogin) {
					uni.navigateTo({
						url: "../../login/login",
					});
				}else{
					uni.navigateTo({
						url: item.url,
					});					
				}
			},
			
		},
	};
</script>

<style lang="scss" scoped>
	.my-container {
		display: flex;
		flex-direction: column;
		position: relative;

		.backgroundStyle {
			position: absolute;
			filter: blur(13rpx);
			width: 750rpx;
			z-index: -1;
			height: 490rpx;

			image {
				width: 100%;
			}

			.mask {
				width: 100%;
				height: 100%;
				opacity: 0.3;
				z-index: -1;
				background-color: #111;
				position: relative;

				.linearStyle {
					width: 100%;
					height: 22px;
					bottom: 0;
					left: 0;
					z-index: 1;
					position: absolute;
					background-image: linear-gradient(rgba(246, 246, 246, 0),
							rgba(246, 246, 246, 1));
				}
			}
		}

		.my-header {
			margin-top: 180rpx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			padding: 0 18rpx 0 36rpx;

			.avatar-img {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					border: 2rpx solid #ffffff;
					object-fit: cover;
					opacity: 1;
					margin-right: 24rpx;
				}
			}

			.user-name {
				.name {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					height: 44rpx;
					line-height: 44rpx;
					font-size: 36rpx;
					font-weight: 500;
					color: #ffffff;

					image {
						width: 24rpx;
						height: 24rpx;
						object-fit: cover;
						margin-left: 8rpx;
					}
				}

				.edit-info {
					margin-top: 8rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					height: 26rpx;
					line-height: 26rpx;
					opacity: 1;
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.8);

					image {
						width: 32rpx;
						height: 32rpx;
						object-fit: cover;
					}
				}
			}

			.set-up {
				image {
					width: 72rpx;
					height: 72rpx;
					object-fit: cover;
				}
			}
		}

		.my-order {
			height: 300rpx;
			margin: 68rpx 22rpx 16rpx 24rpx;
			display: flex;
			background-color: #fff;
			flex-flow: column nowrap;
			border-radius: 16rpx;

			.order-header {
				display: flex;
				flex-wrap: row nowrap;
				justify-content: space-between;
				align-items: center;
				padding: 32rpx;

				.order {
					font-weight: bold;
					font-size: 32rpx;
					color: #333333;
				}

				.total {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: #999999;

					image {
						margin-left: 8rpx;
						width: 24rpx;
						height: 24rpx;
						object-fit: cover;
					}
				}
			}

			.order-line {
				height: 0.5px;
				background: #f4f4f4;
				margin: 0 32rpx;
			}

			.order-body {
				display: flex;
				flex-flow: row nowrap;
				padding: 32rpx 40rpx 48rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					font-size: 22rpx;
					color: #111111;
					font-weight: 400;
					position: relative;

					image {
						width: 64rpx;
						height: 64rpx;
						object-fit: cover;
						margin-bottom: 12rpx;
					}

					.waitPayIcon {
						position: absolute;
						width: 32rpx;
						height: 32rpx;
						line-height: 26rpx;
						box-sizing: border-box;
						text-align: center;
						background: #ff3347;
						border: 1rpx solid #ffffff;
						border-radius: 50%;
						top: 0;
						left: 40rpx;
						color: #ffffff;
						font-size: 18rpx;
					}
				}

				.item:nth-last-child(1) {
					margin-right: 0;
				}
			}
		}

		.my-tools {
			margin: 0 22rpx 0 24rpx;
			border-radius: 16rpx;
			background-color: #ffffff;

			.header {
				color: #333333;
				padding: 32rpx;
				font-size: 32rpx;
				font-weight: 600;
			}

			.tool-line {
				height: 0.5px;
				background: #f4f4f4;
				margin: 0 32rpx;
			}

			.tool-body {
				.tool-item {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					padding: 26rpx 32rpx;

					.left {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;

						image {
							width: 48rpx;
							height: 48rpx;
							margin-right: 20rpx;
						}
					}

					.right {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						text{
							font-size: 24rpx;
							color: #999999;
						}
						image {
							margin-left: 16rpx;
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}
		}
	}

	.twoNumber {
		width: 40rpx !important;
		border-radius: 18rpx !important;
	}

	.threeNumber {
		width: 50rpx !important;
		border-radius: 18rpx !important;
	}
</style>
