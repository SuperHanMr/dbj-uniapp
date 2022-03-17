<template>
	<view class="head">
		<view class="classify-banner-content">
			<swiper class="banner" :autoplay="swiperAuto" interval="2000" duration="500" :circular="true"
				@change="swiperChange">
				<swiper-item v-for="(item) in bannerList" :key="item.id">
					<image class="banner-img" :src="item.resUrl" mode="scaleToFill" @click="toJumpHandler(item)">
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
				// bannerList: [{
				// 		"createTime": 1645527292000,
				// 		"id": 15,
				// 		"jumpUrl": "https://design-h5-stage.meiwu365.com/app-pages/product-promotion-list/index.html?token=",
				// 		"release": true,
				// 		"resType": 1,
				// 		"resUrl": "https://ali-image-test.dabanjia.com/image/20220222/18/1645527289651_2418%24%E9%A3%9E%E4%B9%A620220222-185414.png",
				// 		"sort": 1,
				// 		"title": "促销套包",
				// 		"type": 1,
				// 		"videoThumbnail": ""
				// 	},
				// 	{
				// 		"createTime": 1635497710000,
				// 		"id": 10,
				// 		"jumpUrl": "https://form-stage.meiwu365.com/app/questionnaire/guest?token=a717c18f7d7ccadf22a9806f06fb4bfa",
				// 		"release": true,
				// 		"resType": 1,
				// 		"resUrl": "https://ali-image-test.dabanjia.com/image/20211029/16/1635497599384_1717%24banner1.png",
				// 		"sort": 0,
				// 		"title": "调查问卷",
				// 		"type": 1,
				// 		"videoThumbnail": ""
				// 	},
				// 	{
				// 		"createTime": 1634264830000,
				// 		"id": 4,
				// 		"jumpUrl": "www.baidu.com",
				// 		"release": true,
				// 		"resType": 1,
				// 		"resUrl": "https://ali-image-test.dabanjia.com/image/20211015/10/1634264823038_8700%24%E9%A3%9E%E4%B9%A620211015-102522.png",
				// 		"sort": 0,
				// 		"title": "测试1",
				// 		"type": 1,
				// 		"videoThumbnail": ""
				// 	},
				// 	{
				// 		"createTime": 1634264672000,
				// 		"id": 3,
				// 		"jumpUrl": "www.baidu.com",
				// 		"release": true,
				// 		"resType": 1,
				// 		"resUrl": "https://ali-image-test.dabanjia.com/image/20211015/10/1634264662477_8840%24%E9%A3%9E%E4%B9%A620211015-102357.png",
				// 		"sort": 0,
				// 		"title": "测试测试",
				// 		"type": 1,
				// 		"videoThumbnail": ""
				// 	}
				// ]
			}
		},
		methods: {
			toJumpHandler(item) {
				debugger
				if (item && item.id) {
					// 跳转类型 1: 链接 2: 商品详情 3：店铺详情:4：无跳转",
					this.[`jumpDeal${item.jumpType}Handler`](item)
				}
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
					url: `/pages/common/shop-detail/shop-detail?id=${item.jumpUrl}`,
				});
			},
			jumpDeal4Handler(item){
				// uni.navigateTo({
				// 	url: "pages/common/webview/webview?url=" + encodeURIComponent(item.jumpUrl),
				// });
				console.log('无跳转');
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
