<template>
	<view>

		<view class="res">
			<view class="res-title">要货状态</view>
			<view class="res-content">
				供应商驳回
			</view>
		</view>
		<view class="res">
			<view class="res-title">驳回原因</view>
			<view class="res-content">
				退款原因退款原因退原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因
			</view>
		</view>
		<view class="res">
			<view class="res-title">要货单状态</view>
			<view class="res-content">
				待收货
			</view>
		</view>
		<view class="res">
			<view class="res-title">要货单号</view>
			<view class="res-content">
				DJ020202020202
			</view>
		</view>
		<view class="res">
			<view class="res-title">要货时间</view>
			<view class="res-content">
				2021-08-01 12:33
			</view>
		</view>
	

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
		</view>
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

		}
	}
</script>

<style lang="scss" scoped>
	.res {
		background-color: #FFF;
		display: flex;
		padding: 16rpx 32rpx;

		.res-title {
			width: 220rpx;
			color: #666666;
			font-size: 28rpx;
		}

		.res-content {
			flex:1;
			color: #333333;
			font-size: 28rpx;
		}
	}


	.store {
		padding: 0 32rpx;
		background-color: #FFF;
		margin-top: 16rpx;

		.items {
			display: flex;
			padding: 32rpx 0;
			border-bottom: 1rpx solid #f2f2f2;

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

		}
	}
</style>
