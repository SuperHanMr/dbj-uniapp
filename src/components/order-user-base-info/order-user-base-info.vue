<template>
	<view class="container">
		<image src="../../static/order/ic_location@2x.png" mode=""></image>
		<view class="basic-info">
			<view>
				<text>小明</text>
				<text>15226088888</text>
			</view>
			<view class="address">
				北京 北京市 石景山区 点石商务公园8号楼打扮家科技有限公司
				1222222222222222222aaaaaaaaaaaaaaaaa
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"order-user-base-info",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		margin-bottom: 16rpx;
		padding: 32rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		color: #333333;
		box-sizing: border-box;
		display: flex;
		flex: 1;
		flex-flow: row nowrap;
		image{
			width: 48rpx;
			height: 48rpx;
			object-fit: cover;
		}
		.basic-info{
			width: 638rpx;
			font-size: 28rpx;
			line-height: 42rpx;
			.address{
				margin-top: 12rpx;
				color: #999999;
				font-size: 26rpx;
				line-height: 36rpx;
				word-wrap: break-word;
				word-break: break-all;
			}
		}
	}
		
</style>
