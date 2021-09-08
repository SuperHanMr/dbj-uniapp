<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="store">
			<view class="header">
				{{item.title}}
			</view>
			<view class="items" v-for="(sub,subIndex) in item.children" :key="subIndex">
				<image class="img" src="" mode=""></image>
				<view class="content">
					<view class="title">
						<text class="tip"></text>
						{{sub.title}}
					</view>
					<view>
						<view class="spec">
							管径DN25 3.5 绿
						</view>
					</view>

					<view class="sub-title">
						{{sub.sub}}
					</view>
					<view class="price">
						99.88/根
					</view>
				</view>
			</view>

			<view class="other-pay border-top">
				<view class="title">
					运费
				</view>
				<view class="amount">
					0.00
				</view>
			</view>

			<view class="other-pay ">
				<view class="title">
					搬运费
				</view>
				<view class="amount">
					0.00
				</view>
			</view>
		</view>
		<view style="height: 200rpx;">

		</view>
		<bottom-btn :showDefaultBtn="false" bgcolor="#FFF">
			<template v-slot:default>
				<view class="reject-btn">
					拒绝申请
				</view>
				<view style="flex: 1;">

				</view>
				<view class="agree-btn">
					同意并支付 ¥ 460.00
				</view>
			</template>

		</bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					title: '京东',
					children: [{
							img: '',
							title: '开工保护（开工后对各区域进行的全方位保护全方位保护位保护位保护位保护位）…',
							sub: '本次要货：1卷'
						},
						{
							img: '',
							title: '开工保护（开工后对各区域进行的全方位保护位保护位保护位保护位）…',
							sub: '本次要货：1卷'
						}

					]
				}, {
					title: '天猫',
					children: [{
							img: '',
							title: '开工保护（开工后对各区域进行的全方位保护位保护位保护位保护位）…',
							sub: '本次要货：1卷'
						},
						{
							img: '',
							title: '开工保护（开工后对各区域进行的全方位保护位保护位保护位保护位）…',
							sub: '本次要货：1卷'
						}
					]
				}, ]

			};
		},
		methods: {
			submit() {
				uni.redirectTo({
					url: '../require-success/require-success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tip {
		display: inline-block;
	}

	.spec {
		display: inline-block;
		background: #fafafa;
		border: 1rpx solid #f0f0f0;
		border-radius: 6rpx;
		padding: 6rpx 12rpx;
		font-size: 22rpx;
		color: #999999;

	}

	.price {
		color: #333333;
		font-size: 24rpx;

	}

	.reject-btn {
		width: 188rpx;
		height: 88rpx;
		line-height: 88rpx;
		opacity: 1;
		border: 1rpx solid #cccccc;
		border-radius: 16rpx;
		text-align: center;
		color: #666666;
		font-size: 30rpx;
		margin-left: 32rpx;
	}

	.agree-btn {
		width: 466rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		color: #ffffff;
		font-size: 30rpx;
		background: linear-gradient(135deg, #00bfaf, #00bfbc);
		border-radius: 16rpx;
		margin-right: 32rpx;
	}

	.store {
		padding: 0 32rpx;
		background-color: #FFF;
		margin-bottom: 16rpx;

		.items {
			display: flex;
			padding: 0 0 32rpx 0;

			.img {
				width: 192rpx;
				height: 192rpx;
				border: 1rpx solid #f4f4f4;
				border-radius: 8rpx;
				background-color: yellow;
			}

			.content {
				flex: 1;
				margin-left: 24rpx;

				.title {
					color: #333333;
					font-size: 28rpx;
					white-space: normal;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
				}

				.sub-title {
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999999;
					text-align: end;
				}
			}
		}

		.header {
			width: 100%;
			height: 74rpx;
			display: flex;
			align-items: flex-end;
			color: #333333;
			font-size: 28rpx;
			font-weight: 500;
			margin-bottom: 32rpx;
		}
	}

	.other-pay {
		height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.title {
			font-size: 26rpx;
			color: #999999;
		}

		.amount {
			font-size: 26rpx;
			color: #333333;
		}

	}

	.border-top {
		border-top: 1rpx solid #f4f4f4;
	}
</style>
