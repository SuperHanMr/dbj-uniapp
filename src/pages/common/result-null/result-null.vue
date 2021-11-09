<template>
	<view class="fill">
		<image class="img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/img_no_report.png" mode=""></image>
		<view class="font">
			当前区域暂未开放该类商品售卖
		</view>
		<view class="font">
			敬请期待~
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.fill {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
	}

	.img {
		width: 300rpx;
		height: 300rpx;
		margin-bottom: 24rpx;
		margin-top: 320rpx;
	}

	.font {
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
		line-height: 32rpx;
	}
</style>
