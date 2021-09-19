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
				url: `https://local.meiwu365.com/app-pages/actuarial/actuarial-details/index.html?reportId=1&stage=6&isActuarial=1&index=1&secondClass=0`
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
