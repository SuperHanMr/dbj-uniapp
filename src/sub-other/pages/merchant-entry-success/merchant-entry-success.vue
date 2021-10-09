<template>
	<view class="merchant-entry-success">
		<view class="head">
			<image src="../../../static/merchant-entry/merchant-entry-success.png" mode=""></image>
			<view class="text">
				支付成功
			</view>
			<view class="info">
				恭喜您成为打扮家合作伙伴，我们为您提供电商交易全链路工作台，回归商家经营链路～
			</view>
		</view>
		<view class="line">

		</view>
		<view class="container">
			<view class="text">
				打扮家商家后台
			</view>
			<view class="url-box">
				<view class="url">
					{{obj.url}}
				</view>
				<view class="copy" @click="copyHandler">
					复制
				</view>
			</view>
			<view class="login-text">
				登录方式
			</view>
			<view class="account-info">
				<view class="account">
					<view class="account-text">
						登录账号
					</view>
					<view class="account-info">
						{{obj.phone}}
					</view>
				</view>
				<view class="password">
					<view class="account-text">
						初始密码
					</view>
					<view class="account-info">
						{{obj.password}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				obj: {}
			}
		},
		computed: {
			...mapState({
			  accountInfoObj: (state) => state.merchantEntry.accountInfo,
			}),
		},
		onLoad(props) {
			this.obj.phone = props.phone;
			this.obj.password = props.password;
			this.obj.url = props.url;
			this.obj.supplierId = props.supplierId;
		},
		methods: {
			copyHandler(){
				uni.setClipboardData({
				    data: this.obj.url,
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.merchant-entry-success {
		width: 100%;
		height: 100%;
		background: #FFFFFF;

		.head {
			padding-top: 112rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			image {
				width: 148rpx;
				height: 194rpx;
				margin: 0 auto;
			}

			.text {
				margin-top: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}

			.info {
				padding: 0 32rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				margin: 12rpx 0 32rpx;
				text-align: center;
			}
		}

		.line {
			height: 16rpx;
			background: #F5F6F6;
		}

		.container {
			padding: 0 32rpx;

			.text {
				padding: 32rpx 0 20rpx 0;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.url-box {
				display: flex;
				align-items: center;
				margin-bottom: 46rpx;

				.url {
					margin-right: 24rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #111111;
				}

				.copy {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #35C4C4;
					padding: 4rpx 8rpx;
					border-radius: 2px;
					border: 1px solid #35C4C4;
				}
			}

			.login-text {
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-bottom: 24rpx;
			}

			.account-info {

				.account,
				.password {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					margin-bottom: 24rpx;

					.account-text {
						color: #999999;
						margin-right: 80rpx;
					}

					.account-info {
						color: #111111;
					}
				}
			}
		}
	}
</style>
