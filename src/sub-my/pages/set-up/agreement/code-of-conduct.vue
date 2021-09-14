<template>
	<web-view :src="url" @message="message"></web-view>
	<!-- 打扮家用户行为规范 -->
</template>

<script>
	export default {
		data() {
			return {
				url: `https://local.meiwu365.com/app-pages/self-study-decorated/index.html`
			}
		},
		methods: {
			message: (res) =>{
				console.log(res, ':LLLLLLLLLLLLLLLLLLL')
			}
		}
	}
</script>

<style>
</style>
