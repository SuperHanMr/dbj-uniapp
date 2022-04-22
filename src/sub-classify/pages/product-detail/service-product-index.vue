<template>
	<view>
		<web-view :src="`${baseUrl}/app-pages/product-detail/service-product.html?spuId=${spuId}&houseId=${houseId}&from=${from}&productId=${productId}&time=${time}&source=small&sourceIMId=${sourceIMId}&token=${token}`">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        time: 0,
        from: '',
				baseUrl: '',
        sourceIMId: getApp().globalData.userInfo.id,
				spuId: 227,
        productId: 0,
        houseId: 42,
        token: "Pc0jlCMLaageAbuvl97z3OjRNz%2BFxXrdHjTV3svtxH8ZYtzDTO87dW6k2vvjBtUQ9qjQdxNRl6qAnrUHeu7LPl2L%2FDzcYnx9Lsw5vPGkvBKJD8jX9l4aCRoRrGRY4lGfbfe83a56341abd221f8ee44d38ef3692"
			}
		},
		onLoad(e) {
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      this.token = getApp().globalData.token
      this.spuId = e.spuId
      this.houseId = e.houseId ? e.houseId : getApp().globalData.currentHouse.id;
      this.from = e.from
      this.productId = e.productId
      this.time = e.time
		}
	}
</script>

<style>
</style>
