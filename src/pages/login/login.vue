<template>
	<view class="wrap">
		<temp :title="isLogin"></temp>
		<gome-login v-if="isLogin" :loginInit="loginInit" @suceess="loginSuccess" @fail="loginFail"></gome-login>
		<button @click="goHome" class="go-home">去首页</button>
	</view>
</template>

<script>
	// const url = require("@/pages/login/imgs/Lark20210823-152715.png");
	import {
		oauthGomeInfo
	} from "../../api/login.js";
	import {
		createTim
	} from "@/utils/tim.js"
	export default {
		data() {
			return {
				isLogin: false,
				loginInit: {},
			};
		},
		onLoad() {
			// 测试环境小程序appletId=B7E436F6DEF6E37296AADD3BC9F35165
			// 生产环境appletId=E370C3ABB4F1EEC5A3946F23BCB15C29
			let loginInit = {};
			loginInit.imgUrl = "http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/logo.0ccb88de.png"; // 登录logo
			loginInit.imgWidth = 660; // logo的宽度
			loginInit.imgHeight = 360; // logo的高度
			loginInit.ctx = "app-guomeijia|ver-v8.2.2|plt-wxApp|cmpid-"; //登录ctx
			loginInit.sharerUserId = uni.getStorageSync("sharerUserId") || ""; //邀请人userId
			loginInit.sharerUnionId = uni.getStorageSync("sharerUnionId") || "";
			loginInit.platForm = "wx"; // 小程序平台 微信：wx
			if (process.env.NODE_ENV === "development") {
				console.log("开发环境");
				loginInit.appId = "B7E436F6DEF6E37296AADD3BC9F35165"; //唯一标识
				loginInit.env = "test";
			} else {
				console.log("生产环境");
				// loginInit.appId = "E370C3ABB4F1EEC5A3946F23BCB15C29"; //唯一标识
				// loginInit.env = "production";
				loginInit.appId = "B7E436F6DEF6E37296AADD3BC9F35165"; //唯一标识
				loginInit.env = "test";
			}
			loginInit.themeConfig = {
				backgroundColor: "#62C1C0",
				fontColor: "#62C1C0",
			};
			console.log("---------gome登录参数---------");
			console.log(loginInit);
			console.log("---------gome登录参数---------");
			this.loginInit = loginInit;
			this.isLogin = true;
			console.log(this.loginInit);
			console.log(this.isLogin);
		},
		methods: {
			// 登录请求成功回调
			loginSuccess(e) {
				// 登录，注册，绑定成功都在此函数回调内处理返回参数为
				// data：{ SCN 登录凭证，userId 用户id，gomeNickName 国美用户昵称，gomeHeadImgUrl 国美用户头像，loginName 登录昵称，gradeNO 会员等级，gradeName 会员等级昵称}
				// type 类型  login为登录， register为注册，bindMobile为绑定手机
				let {
					data,
					type
				} = e.detail;

				// let userInfo = uni.getStorageSync("userInfo");
				uni.setStorageSync("scn", data.SCN);
				uni.setStorageSync("openId", data.openId);
				// uni.setStorageSync("userInfo", userInfo);
				uni.setStorageSync("date", Date.now());
				uni.setStorageSync("memberInfo", {
					gradeNO: data.gradeNO || "",
					gradeName: data.gradeName || "",
					loginName: data.loginName || "",
				});
				getApp().globalData.token = data.SCN;

				console.log("type", type); // 根据 type 类型，跳转页面/路由
				if (uni.getStorageSync("scn")) {
					oauthGomeInfo({
						clientType: "3",
					}).then((data) => {
						getApp().globalData.userInfo = data;
						uni.setStorageSync("userId", data.id);
						getApp().tim = createTim(data.appId);
						this.$store.dispatch("loginIM", {
							userId: data.tid,
							userSig: data.userSign
						});
						//可以改成back
						uni.navigateBack({})
						// uni.switchTab({
						//   url: "/pages/home/index/index",
						// });
					});
				}
			},
			// 登录请求失败回调
			loginFail(e) {
				uni.showToast({
					title: `登录请求失败`,
				});
			},
			goHome() {
				uni.switchTab({
					url: "/pages/home/index/index",
				});
			}
		},
		mounted() {
			console.log("ddddd");
		},
	};
</script>
<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.wrap {
		position: relative;
		height: 100%;
		overflow: hidden;
	}

	.go-home {
		position: absolute;
		top: 714rpx;
		left: 80rpx;

		width: 590rpx;
		line-height: 88rpx;
		border-radius: 55rpx;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		background-image: linear-gradient(90deg, #62c1c0, #62c1c0);
		background-color: #62c1c0;

		border-top-style: none;
		border-right-style: none;
		border-bottom-style: none;
		border-left-style: none;
	}
</style>
