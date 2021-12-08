<template>
	<view class="">
		<web-view ref='webview' :src="url" @message='message' @load='loadSuccessHandler'></web-view>
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
				height: 0
			}
		},
		onBackPress() {
			console.log(123123)
		},
		onShow(props) {
			console.log('onShow', props, this.url, '>>>>>>>>>>>>>>>')
			this.goH5()
			// this.loadSuccessHandler();
		},
		onLoad(props) {
			this.id = props.id;
			uni.showLoading({
				title: '加载中'
			});
			uni.showShareMenu()
		},

		methods: {
			goH5() {
				const token = getApp().globalData.token;
				if (!this.height) {
					uni.getSystemInfo({
						success: (res) => {
							this.height = res.windowHeight
						}
					})
				}
				
				// this.url = this.ENV.VUE_APP_BASE_H5 +
				// 	`/app-pages/case-detail/case-detail.html?id=${this.id}&height=${this.height}#${token ? token : 0}`
				this.url = 'https://local.meiwu365.com/app-pages/actuarial/actuarial-details/index.html?reportId=32&id=2459&projectId=20171&isActuarial=1&index=1&secondClass=1&categoryId=&areaId=43&estateId=22&isClient=1'
				console.log(this.url)
			},
			loadSuccessHandler(e) {
				uni.hideLoading();
			},
			message(event) {
				uni.$emit('isCollect', event.detail.data[event.detail.data.length - 1])
			}
		}
	}
</script>

<style>

</style>
