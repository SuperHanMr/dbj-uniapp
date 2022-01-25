<template>
	<view class="container">
		<custom-navbar opacity="0" :showBack="true">
		</custom-navbar>

		<view class="basic-info"
			>
			<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/complete.png" mode=""></image>
			<view class="info">
				<view class="header1">要货申请已发出</view>
        <view class="header2">等待业主确认</view>
			</view>
		</view>

		<view class="button-container">
      <view class="detail-button" @click="toDetail">
      	查看要货记录
      </view>
			<view class="complete-button" @click="toDecorate">
				返回装修页面
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				projectId: ''
			};
		},
		onLoad(e) {
			if (e && e.projectId) {
				this.projectId = e.projectId;
			}
		},
		methods: {
			toDecorate() {
				uni.switchTab({
					url: '/pages/decorate/index/index'
				});
			},
			toDetail() {
				uni.redirectTo({
					url: `../require-history/require-history?projectId=${this.projectId}`
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		background: #fff;
    height: 100%;
		.basic-info {
			height: 600rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
      background-color: #fff;
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
					color: #222;
					margin-bottom: 12rpx;
				}

				.header2 {
					font-size: 26rpx;
					height: 48rpx;
					line-height: 48rpx;
					color: #999;
				}
			}
		}

		.button-container {
			display: flex;
			flex-flow: wrap;
			align-items: center;
      padding: 0 60rpx;
      justify-content: space-between;

			.complete-button,
			.detail-button {
				width: 296rpx;
				height: 88rpx;
				border-radius: 12rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
        // display: inline-block;
        // vertical-align: top;
			}

			.complete-button {
				// margin-top: 140rpx;
				line-height: 88rpx;
				color: #ffffff;
				background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
				background-size: 100% 100%;
			}

			.detail-button {
				// margin-top: 40rpx;
				color: #333333;
				border: 2rpx solid #dedede;
				box-sizing: border-box;
				line-height: 84rpx;
			}
		}
	}
</style>
