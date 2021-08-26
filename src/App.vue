<script>
	export default {
		globalData: {
			userInfo: {

			},
			token:''
		},
		onLaunch: function() {
			if (!uni.getStorageSync("userId") || !uni.getStorageSync("scn")) {
				setTimeout(() => {
					uni.redirectTo({
						url: 'pages/login/login'
					})
				}, 0)
			}else{
				let token=	uni.getStorageSync("scn");
				this.globalData.token =token;
				
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page {
		height: 100%;
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
