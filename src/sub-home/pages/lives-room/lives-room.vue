<template>
	<view class="content">
		<live-player class="player" :src="livePreview" autoplay @statechange="statechange" @error="error" />

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
				console.log(e.livePreview)
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
	.content {
		width: 100vw;
		height: 100vh;
	}

	.player {
		width: 100%;
		height: 100%;
	}
</style>
