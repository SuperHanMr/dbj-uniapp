<template>
	<view class="perfect-house-info" @click="openHomeList">
		<view class="image-box">
			<image
				src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/perfect-information.png?x-oss-process=image/resize,m_lfit,w_148,h_150"
				mode=""></image>
		</view>
		<view class="box">
			<view class="title">
				完善房屋信息
			</view>
			<view class="info">
				即可查看您家附近的真实案例
			</view>
		</view>
		<view class="add-home-address">
			去完善
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			openHomeList() {
				this.$emit('openHomeList');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.perfect-house-info {
		position: fixed;
		bottom: 150rpx;
		left: 40rpx;
		width: 670rpx;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		box-shadow: 0px 0px 40rpx rgba(0, 0, 0, 0.06);
		border-radius: 24rpx;

		.image-box {
			position: relative;

			image {
				width: 148rpx;
				height: 150rpx;
				position: absolute;
				top: -42rpx;
				left: -12rpx;
			}
		}

		.box {
			margin: 16rpx 0 14rpx 64rpx;

			.title {
				font-size: 28rpx;
				color: #333333;
				font-weight: 500;
			}

			.info {
				color: #999999;
				font-size: 20rpx;
			}
		}

		.add-home-address {
			margin: 24rpx 20rpx 22rpx 0;
			background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
			border-radius: 8rpx;
			font-weight: 500;
			font-size: 24rpx;
			line-height: 34rpx;
			color: #FFFFFF;
			padding: 12rpx 24rpx 14rpx;
		}
	}
</style>
