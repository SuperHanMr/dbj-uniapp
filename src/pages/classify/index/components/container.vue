<template>
	<view class="container">
		<view class="classify-shop">
			<view class="list" v-for="item in classList" :key="item.id" @click="classHandler(item)">
				<image :src="item.icon" class="list-img"></image>
				<view class="list-title">
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="recommended">
			<view class="img-box" v-for="item in recommendList" :key="item.id" @click="recommendedHandler(item)">
				<image :src="item.icon" mode="" class="img"></image>
			</view>
		</view>
		<view class="brand">
			<view class="top">
				<view class="left">
					<view class=".brand-left-icon .icon-a-Brandpavilion">
					</view>
				</view>
				<!--  v-if="pavilionObj.totalRows > 8"  {{ `(${pavilionObj.totalRows})` }}-->
				<view v-if="pavilionObj.totalRows > 8" class="right" @click="brandHandler">
					<view class="brand-title">
						全部
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
							<view class="item-box" v-if="item.key !== 'all'"
								:style="{'background': `linear-gradient(180deg, rgba(244, 244, 244, 0.3) 0%, rgba(244, 244, 244, 0.96) 79.55%, #F1F1F1 100.39%), url(${item.brandBagImage})`}">
								<image :src="item.brandLogoImage" mode="" class="brand-item-icon"></image>
								<view class="brand-item-title">
									{{item.brandShortName}}
								</view>
							</view>
							<view class="item-all" v-if="item.key === 'all' && pavilionObj.totalRows > 8">
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
			},
			classList: {
				type: Array,
				default: () => []
			},
			recommendList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
			}
		},
		methods: {
			scrolltolowerHandler: throttle(function() {
				console.log(111111111)
				if (pavilionObj.totalRows <= 8) return;
				this.brandHandler();
			}, 500),
			isLoginHandler(params) {
				let hasToken = false;
				uni.getStorage({
					key: 'scn',
					success() {
						hasToken = true;
					},
					fail() {
						hasToken = false;
					}
				})
				if (params.needLogin && !hasToken) {
					uni.navigateTo({
						url: "../../login/login",
					});
					return;
				}
			},
			classHandler(item) {
				let param = JSON.parse(item.configParams)
				this.isLoginHandler(param);
				this.[`classJump${item.type}Handler`] && this.[`classJump${item.type}Handler`](item);
			},
			dealWithUrlParamHandler(item) {
				if (!item.urlParams) return;
				let param = JSON.parse(item.urlParams)
				let keyArr = Object.keys(param);
				let valueArr = Object.values(param);
				let urlParams = '';
				keyArr.forEach((key, index) => {
					urlParams += `${key}=${param[key]}`;
					if (index < keyArr.length - 1) {
						urlParams += '&';
					}
				})
				return urlParams;
			},
			classJump1Handler(item) {
				let param = this.dealWithUrlParamHandler(item);
				uni.navigateTo({
					url: `${item.url}?${param}`
				})
			},
			classJump2Handler(item) {
				this.recommendJump2Handler(item);
			},
			recommendedHandler(item) {
				this.[`recommendJump${item.type}Handler`] && this.[`recommendJump${item.type}Handler`](item)
			},
			recommendJump2Handler(item) {
				uni.navigateTo({
					url: "/pages/common/webview/webview?url=" + encodeURIComponent(item.url),
				});
			},
			recommendJump1Handler(item) {
				let param = this.dealWithUrlParamHandler(item)
				uni.navigateTo({
					url: `${item.url}?${param}`
				})
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
				display: block;
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
				padding-bottom: 14rpx;

				.brand-left-icon {
					font-size: 34rpx;
					margin-left: 8rpx;
				}
			}

			.right {
				height: 36rpx;
				padding: 0 12rpx 0 20rpx;
				display: flex;
				align-items: center;
				margin-right: 3rpx;
				border: 0.5px solid #ADADAD;
				border-radius: 6px;

				.brand-title {
					font-weight: 400;
					font-size: 22rpx;
					text-align: right;
					letter-spacing: 0.1px;

					color: #333333;
				}

				.brand-icon {
					font-size: 16rpx;
				}
			}
		}

		.bottom {
			.scroll-view_H {
				width: 100%;

				.box {
					display: flex;
				}
			}

			.brand-item-box {
				margin-right: 32rpx;

				.item-box {
					position: relative;
					width: 216rpx;
					height: 176rpx;
					border-radius: 16rpx;
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}

			.item-all {
				background: #F4F3F4;
				padding: 4rpx 22rpx;
				font-weight: 400;
				font-size: 20rpx;
				text-align: center;
				color: #666666;
				border-radius: 16rpx 0 0 16rpx;
				max-width: 23rpx;
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
