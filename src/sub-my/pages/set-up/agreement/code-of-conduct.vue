<template>
	<web-view :src="url" @message="message"></web-view>
	<!-- 打扮家用户行为规范 -->
</template>

<script>
	export default {
		data() {
			return {
				url: `https://local.meiwu365.com/app-pages/actuarial/index.html?serveId=5659&isMessage=2&isActuarial=undefined&token=dabanjiaeyJhbGciOiJIUzI1NiJ9.eyJhcHBDbGllbnRUeXBlIjoyLCJleHAiOjE2MzE5MzgzOTgsInVzZXJJZCI6NjY2MiwiaWF0IjoxNjMxOTM0Nzk4fQ.v7mICve7D-x6nTivoyJpmRQh_8mNm-kJRICiOpynAQQ`
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
