<template>
	<view class="content">
		商品详情
		<button type="default" @click="onTap">点我进行原生跳转</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(e) {
			console.log(e);

		},
		methods: {
			onTap(){
				uni.switchTab({
				    url: '/pages/message/index/index'
				});
			}
		
		}
	}
</script>

<style>
</style>
