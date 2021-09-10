<template>
	<view>
		<custom-navbar opacity="0">
			<template v-slot:back>
				<i class="icon-ic_cancel_white" style="color: white;" ></i>
			</template>
		</custom-navbar>
		<view class="basic-info"
			:style="{backgroundImage:`url(http://dbj.dragonn.top/static/mp/dabanjia/images/my/bg_img.png)`,backgroundSize: '100% 100%'}">
			<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/complete.png" mode=""></image>
			<view class="info">
				<view class="header1">要货申请已发出,等待业主确认</view>
			</view>
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

<style lang="scss" scoped>
	.basic-info {
		height: 600rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;

		image {
			margin-top: 200rpx;
			width: 184rpx;
			height: 184rpx;
			object-fit: cover;
			margin-bottom: 16rpx;
		}

		.info {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;

			.header1 {
				height: 48rpx;
				line-height: 48rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: #ffffff;
				margin-bottom: 12rpx;
			}

			.header2 {
				font-size: 26rpx;
				height: 48rpx;
				line-height: 48rpx;
				color: #ffffff;
			}
		}
	}
</style>
