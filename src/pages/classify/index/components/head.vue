<template>
	<view class="head">
		<view class="classify-banner-content">
			<swiper class="banner" :autoplay="swiperAuto" interval="2000" duration="500" :circular="true"
				@change="swiperChange">
				<swiper-item v-for="(item) in bannerList" :key="item.id">
					<image class="banner-img" :src="item.thumbnailUrl" mode="scaleToFill" @click="toJumpHandler(item)">
					</image>
				</swiper-item>
			</swiper>
			<view v-if="bannerList.length>1" class="swiper-tab">
				<image :class="['swiper-tab-flex1', {'flex1-active': index==currentSwiper}]"
					v-for="(item,index) in bannerList" :key="index"
					:src="index==currentSwiper?'https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/swiper_tab_ic_active.png':'https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/swiper_tab_ic.png'">
				</image>
			</view>
		</view>
		<view class="bottom-radius">
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperAuto: {
				type: Boolean,
				default: false
			},
			bannerList: {
				type:Array,
				default: () => []
			}
		},
		data() {
			return {
				currentSwiper: 0,
			}
		},
		methods: {
			toJumpHandler(item) {
				debugger
				if (item && item.id) {
					// 跳转类型 0：无跳转 1： 链接 2： 商品详情 3：店铺详情",
					this.[`jumpDeal${item.jumpType}Handler`](item)
				}
			},
			jumpDeal0Handler(item){
				// uni.navigateTo({
				// 	url: "pages/common/webview/webview?url=" + encodeURIComponent(item.jumpUrl),
				// });
				// uni.showToast({
				//   title: "无跳转",
				//   icon: "none",
				// });
				console.log('无跳转');
			},
			jumpDeal1Handler(item){
				uni.navigateTo({
					url: "/pages/common/webview/webview?url=" + encodeURIComponent(item.jumpUrl),
				});
			},
			jumpDeal2Handler(item){
				uni.navigateTo({
					url: `/sub-classify/pages/goods-detail/goods-detail?goodId=${item.jumpUrl}`,
				});
			},
			jumpDeal3Handler(item){
				uni.navigateTo({
					url: `/sub-classify/pages/shops-detail/shops-detail?storeId=${item.jumpUrl}`,
				});
			},
			
			swiperChange(e) {
				this.currentSwiper = e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.head{
		position: relative;
	}
	.nav-box {
		position: fixed;
		top: 28rpx;
		left: 0rpx;
		padding: 0 32rpx;
		width: 100%;
		height: 62rpx;
		z-index: 102;
		display: flex;
		.right{
			flex: 1;
			display: flex;
			align-items: center;
			.box{
				width: 64rpx;
				height: 64rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.box-left{
				margin-left: 24rpx;
			}
			.store, .shoppingcart{
				font-size: 34rpx;
				color: #fff;
				position: relative;
			}
			.corner-mark{
				position: absolute;
				top: -16rpx;
				left: 20rpx;
				background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
				border: 0.5px solid #FFFFFF;
				color: #FFFFFF;
				text-align: center;
				font-size: 20rpx;
				border-radius: 50%;
				width: 32rpx;
				height: 32rpx;
				line-height: 32rpx;
			}
		}
	}

	.uni-searchbar {
		display: flex;
		width: 534rpx;
		height: 62rpx;
		opacity: .85;
		backdrop-filter: blur(16px);
		background: #f7f7f7;
		border-radius: 116rpx;
	}

	.uni-searchbar__box-icon-search {
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 0 16rpx;
		align-items: center;
	}

	.uni-searchbar__text-placeholder {
		font-size: 26rpx;
		color: #A9A9A9;
		margin-left: 10rpx;
	}

	.classify-banner-content {
		position: relative;
		z-index: 101;

		.banner {
			overflow: hidden;
			height: 592rpx;
			width: 100%;
			z-index: 200;
			position: relative;
		}

		.banner-img {
			width: 100%;
			height: 592rpx;
		}
	}

	.swiper-tab {
		position: absolute;
		bottom: 58rpx;
		// width: 200rpx;
		// height: 4rpx;
		left: 50%;
		// background: rgba(255, 255, 255, 0.4);
		transform: translateX(-50%);
		border-radius: 2rpx;
		display: flex;
		flex-direction: row;
		z-index: 500;

		.swiper-tab-flex1 {
			width: 8rpx;
			height: 6rpx;
			margin-right: 4rpx;
		}

		.flex1-active {
			width: 22rpx;
			height: 6rpx;
		}
	}
	
	.bottom-radius{
		position: absolute;
		width: 100%;
		height: 36rpx;
		border-radius: 32rpx 32rpx 0 0;
		background: #fff;
		bottom: 0;
		left: 0;
		z-index: 101;
	}
</style>
