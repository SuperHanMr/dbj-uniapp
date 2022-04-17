<template>
	<view>
		<web-view :src="`${baseUrl}/app-pages/product-detail/service-product.html?spuId=${spuId}&houseId=${houseId}&source=small&token=${token}`">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: '',
				spuId:'',
        houseId: 0,
        token: ''
			}
		},
		onLoad(e) {
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      thos.token = getApp().globalData.token
      this.spuId = e.spuId
      this.houseId = e.houseId
		}
	}
</script>

<style>
</style>
