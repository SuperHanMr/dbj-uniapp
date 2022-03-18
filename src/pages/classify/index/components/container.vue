<template>
	<view class="container">
		<view class="classify-shop">
			<view class="list" v-for="item in classList" :key="item.title" @click="classHandler">
				<image :src="item.url" class="list-img"></image>
				<view class="list-title">
					{{ item.title }}
				</view>
			</view>
		</view>
		<view class="recommended">
			<view class="img-box" v-for="item in recommendedList" :key="item" @click="recommendedHandler">
				<image :src="item" mode="" class="img"></image>
			</view>
		</view>
		<view class="brand">
			<view class="top">
				<view class="left">
					<image src="/static/images/classify-brand-text.png" mode="" class="img"></image>
				</view>
				<!-- v-if="pavilionObj.totalRows > 8" -->
				<view  class="right" @click="brandHandler">
					<view class="brand-title">
						全部 {{ `(${pavilionObj.totalRows})` }}
					</view>
					<view class="brand-icon icon-alert_notice_jump">
					</view>
				</view>
			</view>
			<view class="bottom">
				<scroll-view class="scroll-view_H" scroll-x="true" lower-threshold="20"
					@scrolltolower="scrolltolowerHandler">
					<view class="box">
						<view class="brand-item-box" v-for="item in pavilionObj.list" :key="item.id"
							@click="brandItemHandler(item)">
							<view class="item-box" v-if="item.key !== 'all'">
								<image :src="item.brandBagImage" mode="" class="brand-item-img"></image>
								<image :src="item.brandLogoImage" mode="" class="brand-item-icon"></image>
								<view class="brand-item-title">
									{{item.brandShortName}}
								</view>
							</view>
							<view class="item-all" v-if="item.key === 'all' && pavilionObj.list.length > 3">
								左滑查看更多
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		throttle
	} from '~@/../utils/common.js';
	export default {
		props: {
			pavilionObj: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				classList: [{
						url: '',
						title: '全屋定制'
					},
					{
						url: '',
						title: '家装建材'
					},
					{
						url: '',
						title: '成品家具'
					},
					{
						url: '',
						title: '软装配饰'
					},
					{
						url: '',
						title: '全部分类'
					}
				],
				recommendedList: [
					"", ""
				],
				brandList: []
			}
		},
		methods: {
			scrolltolowerHandler: throttle(function() {
				console.log(111111111)
				this.brandHandler();
			}, 500),
			classHandler() {
				console.log('分类点击事件')
				uni.navigateTo({
					url: '/sub-classify/pages/all-classify/index'
				})
			},
			recommendedHandler() {
				console.log('推荐点击事件')
			},
			brandHandler() {
				console.log('跳转品牌页')
				uni.navigateTo({
					url: '/sub-classify/pages/brand-list/brand-list'
				})
			},
			brandItemHandler(item) {
				console.log('跳转对应品牌页面')
				if (item.key === 'all') return;
				uni.navigateTo({
					url: `/sub-classify/pages/brand-list/brand-detail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classify-shop {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;

		.list-img {
			width: 96rpx;
			height: 96rpx;
			display: block;
			margin-bottom: 4rpx;
		}

		.list-title {
			font-weight: 400;
			font-size: 24rpx;
			text-align: center;
			letter-spacing: 0.1px;
			line-height: 34rpx;
			color: #333333;
		}
	}

	.recommended {
		margin-top: 64rpx;
		display: flex;
		justify-content: space-between;

		.img-box {
			width: 328rpx;
			height: 132rpx;

			.img {
				width: 100%;
				height: 100%;
				border-radius: 16rpx;
				background: red;
			}
		}
	}

	.brand {
		// height: 342rpx;
		margin-top: 76rpx;
		// border: 0.5px solid #FCF2FF;
		box-sizing: border-box;
		// border-radius: 16rpx;
		// background: linear-gradient(177.52deg, #FCFAFF 2.21%, #FFFEFF 98.1%);

		.top {
			display: flex;
			justify-content: space-between;
			position: relative;

			.top-bg {
				position: absolute;
				top: 0;
				right: 176rpx;
				background-image: url(../../../../static/images/classify-brand-bg.png);
				background-repeat: no-repeat;
				background-size: 100%;
				width: 312rpx;
				height: 88rpx;
			}

			.left {
				width: 138rpx;
				height: 50rpx;
				margin: 12rpx 0 0 14rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				height: 40rpx;
				padding: 0 12rpx 0 20rpx;
				display: flex;
				align-items: center;
				margin-right: 3rpx;
				border: 0.5px solid #ADADAD;
				border-radius: 6px;

				.brand-title {
					font-weight: 400;
					font-size: 24rpx;
					text-align: right;
					letter-spacing: 0.1px;

					color: #333333;
				}

				.brand-icon {
					margin-left: 4rpx;
					font-size: 20rpx;
				}
			}
		}

		.bottom {
			.scroll-view_H {
				width: 100%;

				.box {
					display: flex;
					padding-left: 28rpx;
				}
			}

			.brand-item-box {
				margin-right: 20rpx;

				.item-box {
					position: relative;
				}
			}

			.item-all {
				background: #F4F3F4;
				padding: 24rpx 20rpx;
				font-weight: 400;
				font-size: 22rpx;
				text-align: center;
				color: #666666;
				border-radius: 16rpx 0 0 16rpx;
				max-width: 23rpx;
			}

			.brand-item-img {
				width: 216rpx;
				height: 176rpx;
				border-radius: 16rpx;
				display: block;
			}

			.brand-item-icon {
				width: 84rpx;
				height: 84rpx;
				border-radius: 50%;
				position: absolute;
				left: 66rpx;
				top: 28rpx;
			}

			.brand-item-title {
				width: 100%;
				font-weight: 400;
				font-size: 22rpx;
				text-align: center;
				line-height: 15px;
				letter-spacing: 0.1px;
				color: #5C4939;
				position: absolute;
				bottom: 24rpx;
				left: 0;
			}
		}
	}
</style>
