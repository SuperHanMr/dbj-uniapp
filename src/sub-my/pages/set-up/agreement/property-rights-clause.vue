<template>
	<web-view :src="url"></web-view>
	<!-- 打扮家知识产权条款 -->
</template>

<script>
	export default {
		data() {
			return {
				url: `${process.env.VUE_APP_BASE_API}/app-pages/intellectual-property-rights/index.html`
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
