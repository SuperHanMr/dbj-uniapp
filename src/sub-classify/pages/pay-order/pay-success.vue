<template>
	<view class="pay-success">
		<view class="head">
			<view>
				<!-- <img src='../../static/image/pay-bg.png' alt="" style='height: 600rpx; width:100%'> -->
			</view>
			<view class="icon-text">
				<view class="icon"></view>
				<view class="text1">支付成功</view>
				<view class="text2">感谢您的支持</view>
			</view>
		</view>
		<view class="bottom">
			<button class="button1" @click="toOrderDetail">查看订单</button>
			<button class="button2" @click="backHome">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: 0,
				from: ''
			}
		},
		onLoad(val) {
			this.orderId = val.orderId;
			this.from = val.from
		},
		methods: {

			backHome() {
				getApp().globalData.goHomeUrl = true;
				uni.switchTab({
					url: '/pages/home/index/index'
				})
			},
			toOrderDetail() {
				if (this.from === "valueCard") {
					uni.redirectTo({
						url: "../../../sub-my/pages/my-order/my-order?firstEntry=true&index=3"
					});
				} else {
					uni.redirectTo({
						url: "../../../sub-my/pages/my-order/my-order?firstEntry=true&index=2"
					});
				}
			}
		}

	}
</script>

<style scoped>
	.pay-success {
		position: relative;
	}

	.icon-text {
		position: absolute;
		top: 200rpx;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		width: 200rpx;
		height: 308rpx;
		justify-content: center;
		align-content: space-between;
		flex-wrap: wrap;
		color: #FFFFFF;
		font-size: 26rpx;
	}

	.icon-text .icon {
		width: 224rpx;
		height: 224rpx;
		background-image: url('../../static/image/pay-icon.png');
		background-size: cover;
	}

	.icon-text .text1 {
		font-size: 48rpx;
		font-weight: 500;
    color: #222222;
	}
	.icon-text .text2 {
		font-size: 28rpx;
    color: #999999;
	}
	.bottom {
		position: absolute;
		right: 0;
		left: 0;
		top: 740rpx;
		margin: auto;
		display: flex;
		width: calc(100% - 100rpx);
		height: 220rpx;
		justify-content: space-between;
	}

	.bottom button {
		width: 300rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-weight: 500;
		font-size: 32rpx;
		border-radius: 12rpx;
	}

	.bottom .button2 {
		background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
		color: #FFFFFF;
	}

	.bottom .button1 {
		border: 1px solid #dedede;
	}
</style>
