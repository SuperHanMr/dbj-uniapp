<script>
	import {oauthGomeInfo} from "api/login.js"
	export default {
		globalData: {
			userInfo: {},
			token: "",
			city: "",
			houses: [],
			noHouseActuaryId: null,
			noHouseDesignId: null,
			noHouseCheckId: null
		},
		onLaunch: function() {
			if (!uni.getStorageSync("userId")) {
				setTimeout(() => {
					uni.redirectTo({
						url: "pages/login/login",
					});
				}, 0);
			} else {

				let token = uni.getStorageSync("scn");
				this.globalData.token = token;
				oauthGomeInfo({
					clientType: "3",
				}).then(data => {
					getApp().globalData.userInfo = data;
				})
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

	/*每个页面公共css */
  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'iconfont' !important;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @font-face {
    font-family: "iconfont"; /* Project id 2785499 */
    src: url('https://ali-res.dabanjia.com/static/mp/dabanjia/font/iconfont.woff2?t=1630568889344') format('woff2'),
         url('https://ali-res.dabanjia.com/static/mp/dabanjia/font/iconfont.woff?t=1630568889344') format('woff'),
         url('https://ali-res.dabanjia.com/static/mp/dabanjia/font/iconfont.ttf?t=1630568889344') format('truetype');
  }
  
  .icon-face:before {
    content: "\e616";
  }
  
  .icon-audio:before {
    content: "\e622";
  }
  
  .icon-plus-circle:before {
    content: "\e641";
  }
</style>
