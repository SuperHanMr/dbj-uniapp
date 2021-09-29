<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(props) {
			const token = uni.getStorageSync("scn")
			this.url = this.ENV.VUE_APP_BASE_H5 + `/app-pages/case-detail/case-detail.html?id=${props.id}&token=${token}`
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
