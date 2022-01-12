<template>
	<view class="container">
		<view class="body-container">
			<view class="item-list" v-for="(item, index) in listArr" :key="item.url" @click="onClick(item,index)">
				<view class="item">
					<text>{{item.title}}</text>
					<image v-if="index <(listArr.length-1)" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/back.svg" />
					<text v-else>v {{ version }}</text>
				</view>
				<view class="line" v-if="index <(listArr.length-1)" />
			</view>
		</view>

		<view class="logOut" @click="onOpen">
			退出登录
		</view>

		<uni-popup ref="popup" type="dialog" class="uni-popup">
			<uni-popup-dialog class="uni-popup-dialog" mode="base" type="info" title="确定退出当前账号登录吗?" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import {
		logout
	} from "../../../api/order.js";
	export default {
		data() {
			return {
				version: "",
				listArr: [{
						title: "打扮家平台服务协议",
						url: "/static/dbj-protocol/protocol.html",
					},
					{
						title: "打扮家隐私政策",
						url: "/static/dbj-protocol/privacy-policy.html",
					},
					// {
					// 	title: "打扮家知识产权条款",
					// 	url: "/protocol-c/intellectual-property.html"
					// },
					{
						title: "意见与反馈",
						url: "../../../sub-my/pages/set-up/comments-feedback/comments-feedback",
					},

					{
						title: "版本号",
						url: "",
					},
				],
				version: "",
			};
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let info = uni.getAccountInfoSync().miniProgram;
			if (info) {
				this.version = info.version || "2.0.0";
			}
			// #endif
		},
		methods: {
			onClick(item, index) {
				if (index < 2) {
					console.log("this.ENV.VUE_APP_BASE_API=", this.ENV.VUE_APP_BASE_API);
					uni.setNavigationBarTitle({
						title: item.title
					});
					let url = this.ENV.VUE_APP_BASE_API + item.url;
					uni.navigateTo({
						url: `../../../pages/common/webview/webview?url=` +
							encodeURIComponent(url),
					});
				}
				// if(index == 2){
				// 	console.log("this.VUE_APP_BASE_H5=",this.ENV.VUE_APP_BASE_H5)

				// 	let url = this.ENV.VUE_APP_BASE_H5 + item.url
				// 	uni.navigateTo({
				// 		url:`../../../pages/common/webview/webview?url=`+ encodeURIComponent(url),
				// 	})
				// }
				else {
					uni.navigateTo({
						url: item.url,
					});
				}
			},
			onOpen() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			confirm(val) {
				console.log("退出登录");
				logout({
						clientCode: "APPLET",
					})
					.then(() => {
						// 清除本地缓存 然后跳转到首页
						this.$refs.popup.close();
						uni.clearStorageSync();
						getApp().globalData = {
							userInfo: {},
							token: "",
							openId: "",
							shareId: "",
							city: "",
							houses: [],
							tim: null,
							noHouseActuaryId: null,
							noHouseDesignId: null,
							noHouseCheckId: null,
							naviData: null,
							decorateMsg: {},
						};
						uni.$emit("logout");

						uni.switchTab({
							url: "../../../pages/home/index/index",
						});
						this.$store.dispatch("logoutIM");
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #f5f6f6;

		.body-container {
			background-color: #ffffff;
			margin-top: 16rpx;

			.item-list {
				.item {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					padding: 38rpx 24rpx 38rpx 32rpx;

					image {
						width: 48rpx;
						height: 48rpx;
						display: block;
					}

					text {
						height: 40rpx;
						line-height: 40rpx;
						font-size: 28rpx;
						// font-weight: 500;
						color: #333333;
					}
				}

				.line {
					margin: 0 32rpx;
					height: 1rpx;
					background: #f2f2f2;
					border-radius: 2rpx;
				}
			}
		}

		.logOut {
			text-align: center;
			margin-top: 16rpx;
			padding: 36rpx 0;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #111111;
			background: #ffffff;
		}
	}

	button::after {
		border: none;
	}

	::v-deep .uni-dialog-button-group .uni-border-left .uni-dialog-button-text {
		color: rgba(255, 51, 71, 1);
		font-size: 30rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
	}

	::v-deep .uni-dialog-title .uni-dialog-title-text {
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #111111;
	}
</style>
