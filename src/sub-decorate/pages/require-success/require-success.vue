<template>
	<view class="container">
		<custom-navbar opacity="0" :showBack="true">
		</custom-navbar>

		<view class="basic-info"
			:style="{backgroundImage:`url(http://dbj.dragonn.top/static/mp/dabanjia/images/my/bg_img.png)`,backgroundSize: '100% 100%'}">
			<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/complete.png" mode=""></image>
			<view class="info">
				<view class="header1">要货申请已发出,等待业主确认</view>
			</view>
		</view>

		<view class="button-container">
			<view class="complete-button" @click="toDecorate">
				返回装修页面
			</view>
			<view class="detail-button" @click="toDetail">
				查看要货记录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			toDecorate() {
				uni.switchTab({
					url: '/pages/decorate/index/index'
				});
			},
			toDetail() {
				uni.redirectTo({
					url: '../require-history/require-history'
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		background: #f6f7f7;

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

		.button-container {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;

			.complete-button,
			.detail-button {
				width: 396rpx;
				height: 88rpx;
				border-radius: 12rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
			}

			.complete-button {
				margin-top: 140rpx;
				line-height: 88rpx;
				color: #ffffff;
				background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
				background-size: 100% 100%;
			}

			.detail-button {
				margin-top: 40rpx;
				color: #333333;
				border: 2rpx solid #dedede;
				box-sizing: border-box;
				line-height: 84rpx;
			}
		}
	}
</style>
