<template>
	<view class="content">
		首页
		<view class="bg">
			<button @click="toNextPage" type="default">点我页面跳转</button>
			

		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			toNextPage() {
				uni.navigateTo({
					url: '../../common/goods-detail/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	// $link-color: blue;
	// $link-color: red;
	// .bg {
	// color: $link-color;
	// }
</style>
