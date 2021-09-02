<template>
		<web-view :src="url"></web-view>
		<!-- 打扮家装修服务协议 -->
</template>

<script>
	export default {
		data() {
			return {
				url: `${process.env.VUE_APP_BASE_API}/app-pages/service-agreement/index.html`
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
