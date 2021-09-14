<template>
	<view>
		<web-view :src="url" @message='messageValue'></web-view>
		<!-- 打扮家装修隐私协议 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: `https://local.meiwu365.com/app-pages/actuarial/actuarial-details/index.html`
			}
		},
		methods: {
			messageValue(e){
				console.log(e, ':LLLLLLLLLLLLLLLLLLLssssssssssssssssssssssssss')
			}
		}
	}
</script>

<style>

</style>
