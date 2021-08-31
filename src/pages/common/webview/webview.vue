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
		onReady() {
			var active = this.$refs.web;
			console.log(active);
		},
		onLoad(e) {
			if (e && e.url) {
				this.url = e.url;
			}
		}
	}
</script>

<style lang="scss">

</style>
