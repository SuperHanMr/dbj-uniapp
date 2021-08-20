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
		onLoad() {

		},
		methods: {
			onTap(){
				uni.sendNativeEvent('unimp-event', {
					method: 'navigateToPage',
					params: {
						page: 'userInfo'
					}
				}, ret => {
					this.nativeMsg = '宿主App回传的数据：' + ret;
				})
			}
		
		}
	}
</script>

<style>
</style>
