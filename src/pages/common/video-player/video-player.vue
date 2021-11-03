<template>
	<view class="content">
		<video class="video" id="myVideo" :title="title" :autoplay="true" :src="url" :vslide-gesture="true"
			@error="videoErrorCallback" controls></video>
	</view>
</template>

<script>
	import {
		updateViewCount
	} from '../../../api/home.js'
	export default {
		data() {
			return {
				url: "",
				title: ''
			};
		},
		onShareAppMessage(res) {
			return {
				title: this.title,
				path: `/pages/common/video-player/video-player?url=${encodeURIComponent(this.url)}`
			}
		},
		onLoad(e) {
			uni.showShareMenu();
			if (e && e.url) {
				this.url = decodeURIComponent(e.url);
			}
			if (e && e.id) {
				updateViewCount(e.id)
			}
			if (e && e.title) {
				this.title = e.title
				uni.setNavigationBarTitle({
					title: e.title,
				});
			}
		},
	};
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		background-color: black;
	}

	.video {
		width: 100%;
		height: 95%;
	}
</style>
