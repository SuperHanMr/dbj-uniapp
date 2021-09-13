<script>
	import {oauthGomeInfo} from "api/login.js"
  import { createTim } from "utils/tim.js"
	export default {
		globalData: {
			userInfo: {},
			token: "",
			city: "",
			houses: [],
      tim: null,
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
          getApp().tim = createTim(data.appId);
          this.$store.dispatch("loginIM", {
            userId: data.tid,
            userSig: data.userSign
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
  @import './static/css/iconfont.css';
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

</style>
