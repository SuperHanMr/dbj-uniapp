<script>
	import {oauthGomeInfo} from "api/login.js"
	export default {
		globalData: {
			userInfo: {},
			token: "",
			city: "",
			houses: []
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
</style>
