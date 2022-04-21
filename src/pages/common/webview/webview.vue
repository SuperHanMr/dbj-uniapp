<template>
	<view>
		<web-view ref="web" :webview-styles="webviewStyles" :src="url" @message="handleMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		},
		onReady() {},
		onLoad(e) {
			// #ifdef H5
			window.addEventListener("message", (e) => {
				let res = JSON.parse(e.data);
				if (res.type === 'MP-setNavigationBarTitle') {
					uni.setNavigationBarTitle({
						title: res.data
					})
				}
			})
			// #endif
			if (e && e.url) {
				this.url = decodeURIComponent(e.url);
				console.log(this.url)
			}
      uni.showShareMenu();
		},
    onShareAppMessage(res) {
      return {
        path: `/pages/common/webview/webview?url=${encodeURIComponent(this.url)}`
      }
    },
		methods: {
			handleMessage(msg) {
				console.log(msg);
			}
		}
	}
</script>

<style lang="scss">

</style>
