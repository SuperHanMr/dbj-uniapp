<template>
	<view>
		<web-view ref="web" :webview-styles="webviewStyles" :src="url"></web-view>
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
	}
</script>

<style lang="scss">

</style>
