<template>
	<web-view :src="url"></web-view>
	<!-- 打扮家用户行为规范 -->
</template>

<script>
	export default {
		data() {
			return {
				url: `${process.env.VUE_APP_BASE_API}/app-pages/user-code-of-conduct/index.html`
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
