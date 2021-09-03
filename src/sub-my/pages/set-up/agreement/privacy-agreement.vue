<template>
	<view>
		<web-view :src="url"></web-view>
		<!-- 打扮家装修隐私协议 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: `${process.env.VUE_APP_BASE_API}/app-pages/privacy-agreement/index.html`
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
