<script>
	import {
		oauthGomeInfo
	} from "api/login.js";
	import {
		createTim
	} from "utils/tim.js";
	export default {
		globalData: {
			userInfo: {},
			token: "",
			city: "",
			houses: [],
			tim: null,
			currentEstate: {},
			currentProject: {},
			naviData: null,
			decorateMsg: {},
			currentHouse: {},
			switchFlag: "home",
			currentRoute: "/pages/home/index/index",
      previewimageStatus: false,
      screenHeight:0,
		},

		onLaunch: function() {
			const userId = uni.getStorageSync("userId");
			if (!userId) {} else {
				let token = uni.getStorageSync("scn");
				this.globalData.token = token;
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
				});
			}
		},
		onShow: function() {
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
	};
</script>

<style>
	/* 字体图标 */
	@import "./static/css/iconfont.css";

	[class^="icon-"],
	[class*=" icon-"] {
		/* use !important to prevent issues with browser extensions that change fonts */
		font-family: "iconfont" !important;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;

		/* Better Font Rendering =========== */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	page {
		height: 100%;
		background-color: #f5f6f6;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	@font-face {
		font-family: PriceFont;
		src:
			url('https://ali-res.dabanjia.com/static/font/price-font/price-font.woff2'),
			url('https://ali-res.dabanjia.com/static/font/price-font/price-font.woff');
	}

	.price-font {
		font-family: PriceFont;
	}

	/*每个页面公共css */
</style>
