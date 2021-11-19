<template>
	<view>
		<view class="cart-header">
			立即支付
			<image class="remove-all" @click="closePayDialog"
				src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_closed_black.png">
			</image>
		</view>
		<view class="pay-diaolog">
			<view class="pay-diaolog-title">
				需支付
			</view>
			<view class="pay-diaolog-price">
				<text style="font-size: 28rpx;">¥</text>{{payChannelPrice}}
			</view>
			<view class="pay-diaolog-tip">
				您正在使用储值卡支付,请确认
			</view>
			<view class="pay-diaolog-alert">
				金额以实际金额为准，若储值卡余额不足将用微信支付剩余部分
			</view>
			<view class="pay-diaolog-btn" @click="payOrder()">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"pay-dialog",
		props:{
			payChannelPrice:{
				type:String,
				default:''
			},
			payChannel:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			payOrder(){
				this.$emit('payOrder')
			},
			closePayDialog(){
				this.$emit('closePayDialog')
			}
		}
	}
</script>

<style lang="scss" scoped>
.pay-diaolog {
		border-top: 1rpx solid #f2f2f2;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding-bottom: 80rpx;
		align-items: center;

		&-title {
			color: #999999;
			font-size: 30rpx;
			margin-top: 40rpx;
		}

		&-price {
			color: #333333;
			font-size: 56rpx;
			margin-top: 16rpx;

			font-family: PriceFont;
		}

		&-tip {
			width: 684rpx;
			height: 68rpx;
			line-height: 68rpx;
			background: #fafafa;
			border-radius: 8rpx;
			text-align: center;
			color: #ff3347;
			font-size: 26rpx;
			margin-top: 40rpx;
		}

		&-alert {
			color: #999999;
			font-size: 22rpx;
			margin-top: 60rpx;
		}

		&-btn {
			width: 686rpx;
			height: 88rpx;
			background: linear-gradient(135deg, #00ccbe, #00c2bf);
			border-radius: 12rpx;
			line-height: 88rpx;
			text-align: center;
			color: #ffffff;
			font-size: 32rpx;
			margin-top: 24rpx;
		}
	}

	.cart-header {
		width: 100%;
		height: 104rpx;
		line-height: 104rpx;
		background: #ffffff;
		border-radius: 32rpx 32rpx 0 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #111111;

		.remove-all {
			position: absolute;
			top: 12rpx;
			right: 16rpx;
			width: 80rpx;
			height: 80rpx;
			font-size: 24rpx;
			color: #999999;
		}
	}

</style>
