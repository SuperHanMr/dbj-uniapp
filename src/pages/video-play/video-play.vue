<template>
	<view class="video-play">
		 <video id="myVideo" :src="url"
		                    @error="videoErrorCallback" controls :show-fullscreen-btn='false'></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(props) {
			this.url = props.url;
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.video-play{
	width: 100%;
	height: 100%;
	#myVideo{
		width: 100%;
		height: 100%;
	}
}
</style>
