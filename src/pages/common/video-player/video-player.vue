<template>
	<view class="content">
		<video class="video" id="myVideo" :src="url" @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu
			danmu-btn controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		onLoad(e) {
			if (e && e.url) {
				this.url = decodeURIComponent(e.url);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}

	.video {
		width: 100%;
		height: 100%;
	}
</style>
