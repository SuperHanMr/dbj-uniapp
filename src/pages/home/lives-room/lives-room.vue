<template>
	<view>
		<live-player :src="livePreview" autoplay @statechange="statechange" @error="error" class="room" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				livePreview: ''

			};
		},
		onLoad(e) {
			if (e && e.livePreview) {
				this.livePreview = e.livePreview;
			}

		},
		methods: {
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.log('~~~~~~~~~');
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	.room {
		width: 300rpx;
		height: 225rpx;
	}
</style>
