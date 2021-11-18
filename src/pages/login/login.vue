<template>
	<view class="wrap">
		<temp :title="isLogin"></temp>
		<gome-login v-if="isLogin" :loginInit="loginInit" @suceess="loginSuccess" @fail="loginFail"></gome-login>
		<view class="go-home" @click="goHome" :style="{top: topH + 'rpx'}">
			<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_go-home%402x.png" class="">
			</image>
			<view class="t">返回首页</view>
		</view>
	</view>
</template>

<script>
	// const url = require("@/pages/login/imgs/Lark20210823-152715.png");
	import {
		oauthGomeInfo,
		bindCapsule
	} from "../../api/login.js";
	import {
		createTim
	} from "@/utils/tim.js";
  import {
    log
  } from "@/utils/log.js"
	export default {
		data() {
			return {
				isLogin: false,
				loginInit: {},
				topH: 88,
			};
		},
		onLoad() {
			let menu = uni.getMenuButtonBoundingClientRect();
			this.topH = menu.top * 2;
			// 测试环境小程序appletId=B7E436F6DEF6E37296AADD3BC9F35165
			// 生产环境appletId=E370C3ABB4F1EEC5A3946F23BCB15C29
			let loginInit = {};
			loginInit.imgUrl =
				"https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/logo.0ccb88de.png"; // 登录logo
			loginInit.imgWidth = 272; // logo的宽度
			loginInit.imgHeight = 154; // logo的高度
			// loginInit.ctx = "app-guomeijia|ver-v8.2.2|plt-wxApp|cmpid-"; //登录ctx
			loginInit.ctx = "app-dabanjia|ver-v8.2.2|plt-wxApp|cmpid-"; //登录ctx
			loginInit.sharerUserId = uni.getStorageSync("sharerUserId") || ""; //邀请人userId
			loginInit.sharerUnionId = uni.getStorageSync("sharerUnionId") || "";
			loginInit.platForm = "wx"; // 小程序平台 微信：wx
			loginInit.protocol = "http";
			loginInit.nativePage = "/pages/common/webview/webview";
			// if (process.env.NODE_ENV === "development") {
			//   console.log("开发环境");
			//   loginInit.appId = "B7E436F6DEF6E37296AADD3BC9F35165"; //唯一标识
			//   loginInit.env = "test";
			// } else {
			//   console.log("生产环境");
			//   loginInit.appId = "E370C3ABB4F1EEC5A3946F23BCB15C29"; //唯一标识
			//   loginInit.env = "production";
			//   // loginInit.appId = "B7E436F6DEF6E37296AADD3BC9F35165"; //唯一标识
			//   // loginInit.env = "test";
			// }
			loginInit.appId = this.ENV.VUE_APP_LOGIN_INIT_APPID; //唯一标识
			loginInit.env = this.ENV.VUE_APP_LOGIN_INIT_ENV;
			console.log("ENV:", this.ENV);
			console.log("appId,env: ", loginInit.appId, loginInit.env);
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
		onUnload() {
			console.log("!!!!!~~~~~~?????????");
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
        log({
          type: "wx-gome-login-success",
          data: data,
          loginType: type
        })
				// let userInfo = uni.getStorageSync("userInfo");
				uni.setStorageSync("scn", data.SCN);
				// uni.setStorageSync("userInfo", userInfo);
				uni.setStorageSync("date", Date.now());
				uni.setStorageSync("memberInfo", {
					gradeNO: data.gradeNO || "",
					gradeName: data.gradeName || "",
					loginName: data.loginName || "",
				});
				getApp().globalData.token = data.SCN;
				if (data.openId) {
					getApp().globalData.openId = data.openId;
					uni.setStorageSync("openId", data.openId);
				}

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
							userSig: data.userSign,
						});
						let shaerId = uni.getStorageSync("shareId");
						if (shaerId && type == "register") {
							bindCapsule({
								zeusId: data.id,
								salesmanPhone: shaerId
							});
						}
						//可以改成back
						uni.$emit("defaultHouseChange");
						uni.navigateBack({});
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
			},
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
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		width: 160rpx;
		height: 56rpx;
		top: 88rpx;
		left: 24rpx;
	}

	.go-home image {
		width: 56rpx;
		height: 56rpx;
		margin-right: 4rpx;
	}

	.go-home .t {
		width: 96rpx;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #333333;
		line-height: 34rpx;
	}
</style>
