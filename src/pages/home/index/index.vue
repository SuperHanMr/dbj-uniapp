<template>
	<view class="content">
		首页
		<view class="bg">
			<button @click="toNextPage" type="default">点我页面跳转</button>
			

		</view>
		<view class="test">
			<view class="sub">
				
			</view>
			
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
