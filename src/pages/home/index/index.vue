<template>
	<view class="content" >
		<button type="default"  @click="toNextPage">
			首页？？!!!
		</button>
		

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
				console.log('??????/')
				uni.navigateTo({
					url: '../../common/goods-detail/goods-detail?id=1111&name=张三'
				});
			}
		}
	}
</script>

<style lang="scss">
	.test{
		width: 100%;
		height: 50rpx;
		background-color: red;
		.sub{
			width: 50%;
			background-color: $uni-color-primary;
			height: 25rpx;
		}
	}

</style>
