<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="store">
			<view class="header">
				{{item.title}}
			</view>
			<view class="items" v-for="(sub,subIndex) in item.children">
				<image class="img" src="" mode=""></image>
				<view class="content">
					<view class="title">
						{{sub.title}}
					</view>
					<view class="sub-title">
						{{sub.sub}}
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
		<bottom-btn btnContent="确认要货" @submit="submit"></bottom-btn>
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
					-webkit-line-clamp: 2;
				}

				.sub-title {
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999999;
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
