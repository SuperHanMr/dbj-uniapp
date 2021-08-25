<template>
	<view>
		<temp :title="isLogin" ></temp>
		<gome-login
		  v-if="isLogin"
		  :loginInit="loginInit"
		  @suceess="loginSuccess"
		  @fail="loginFail"
		></gome-login>
	</view>
</template>

<script>
	const url = require("@/pages/login/imgs/Lark20210823-152715.png");
	export default {
		data() {
			return {
		    isLogin: false,
		    loginInit: {},
		  };
		},
		onLoad() {
			console.log("login页面加载进来了", )
			let loginInit = {};
			loginInit.imgUrl = url; // 登录logo
			loginInit.imgWidth = 420; // logo的宽度
			loginInit.imgHeight = 240; // logo的高度
			// 测试环境小程序appletId=B7E436F6DEF6E37296AADD3BC9F35165
			// 生产环境appletId=E370C3ABB4F1EEC5A3946F23BCB15C29
			loginInit.appId = "B7E436F6DEF6E37296AADD3BC9F35165"; //唯一标识 
			loginInit.ctx = "app-guomeijia|ver-v8.2.2|plt-wxApp|cmpid-"; //登录ctx
			loginInit.sharerUserId = uni.getStorageSync("sharerUserId") || ""; //邀请人userId
			loginInit.sharerUnionId = uni.getStorageSync("sharerUnionId") || '';
			loginInit.platForm = "wx"; // 小程序平台 微信：wx
			loginInit.env = "test"
			this.loginInit = loginInit
			this.isLogin = true
			console.log(this.loginInit)
			console.log(this.isLogin)
		},
		methods: {
			// 登录请求成功回调
			loginSuccess(e) {
			  // 登录，注册，绑定成功都在此函数回调内处理返回参数为
			  // data：{ SCN 登录凭证，userId 用户id，gomeNickName 国美用户昵称，gomeHeadImgUrl 国美用户头像，loginName 登录昵称，gradeNO 会员等级，gradeName 会员等级昵称}
			  // type 类型  login为登录， register为注册，bindMobile为绑定手机号
			  let { data, type }  = e.detail; 
			 
			  let userInfo = uni.getStorageSync("userInfo");
			  uni.setStorageSync("scn", data.SCN);
			  uni.setStorageSync("userId", data.userId);
			  uni.setStorageSync("userInfo", userInfo);
			  uni.setStorageSync('date', Date.now());
			  uni.setStorageSync("memberInfo", {
			    gradeNO: data.gradeNO || '',
			    gradeName: data.gradeName || '',
			    loginName: data.loginName || ''
			  });
						
			  console.log('type',type) // 根据 type 类型，跳转页面/路由
				uni.navigateTo({
					url: "/pages/home/index/index"
				})
			},
			// 登录请求失败回调
			loginFail(e) {
				uni.showToast({
					title:`登录请求失败`,
				})
			}
		},
		mounted() {
			console.log("ddddd")
		},
	}
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
</style>
