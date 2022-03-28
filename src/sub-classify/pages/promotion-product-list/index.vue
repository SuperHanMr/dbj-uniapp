<template>
	<view>
		<web-view :src="baseUrl + '/app-pages/product-promotion-list/index.html'">
		</web-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
		
			}
		},
		onLoad(e) {
			// this.baseUrl = this.ENV.VUE_APP_BASE_H5
			this.baseUrl = 'https://localhost'
		},

		onShow() {
		},

		methods: {
		
		},
	}
</script>

<style>

</style>
