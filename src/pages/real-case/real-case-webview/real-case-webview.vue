<template>
	<view class="">
		<web-view ref='webview' :src="url" @message='message' ></web-view>
		<view class="" ref='sad'>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				url: '',
				id: '',
				searchToken: '',
				hashToken: '',
			}
		},
		onBackPress() {
			console.log(123123)
		},
		onShow(props) {
			console.log('onShow', props, this.url, '>>>>>>>>>>>>>>>')
			const token = getApp().globalData.token;
			this.hashToken = token ? token : 0;
			this.goH5()
			// loadSuccessHandler();
		},
		onLoad(props) {
			this.id = props.id;
			// uni.showLoading({
			// 	title: '加载中'
			// });
		},

		methods: {
			goH5() {
				let height = 0

				uni.getSystemInfo({
					success: (res) => {
						height = res.windowHeight
					}
				})
				this.url = this.ENV.VUE_APP_BASE_H5 +
					`/app-pages/case-detail/case-detail.html?id=${this.id}&height=${height}#${this.hashToken}`
				console.log(this.url)
			},
			loadSuccessHandler(e) {
				uni.hideLoading();
			},
			message(event) {
				// console.log(event.detail.data,event.detail.data.length)
				uni.$emit('isCollect', event.detail.data[event.detail.data.length - 1].isCollect)
			}
		}
	}
</script>

<style>

</style>
