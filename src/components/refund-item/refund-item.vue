<template>
	<view>
		<view class="goods-item">
			<image class="img" src="" mode=""></image>
			<view class="">
				<view class="">
					name

				</view>
				<view class="">
					guige
				</view>
			</view>
			<view style="flex:1">

			</view>
			<view class="">
				<view class="">
					实付款
				</view>
				<view class="">
					100.00
				</view>
				<view class="">
					<uni-number-box @change="input($event)"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "refund-item",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		padding: 16rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;

		.img {
			width: 200rpx;
			height: 100rpx;
			background-color: yellow;
		}
	}
</style>
