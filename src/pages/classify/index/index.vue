<template>
	<view class="classify">
		<view :class="['nav-box', {'nav-box-active': navActive}]">
			<view class="uni-searchbar" @click="searchClick">
				<view class="uni-searchbar__box-icon-search">
					<uni-icons color="#999999" size="18" type="search" />
					<text class="uni-searchbar__text-placeholder">搜好货</text>
				</view>
			</view>
			<view class="right">
				<view class="box box-left" @click="toStoreHandler">
					<view class="store icon-shop">

					</view>
				</view>
				<view class="box" @click="toShoppingCartHandler">
					<view class="shoppingcart icon-shoppingcart">
						<view class="corner-mark">
							2
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="classify-scroll" scroll-y="true" @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' @scroll="scrollHandler" :refresher-triggered="triggered">
			<Head :swiperAuto="swiperAuto" :bannerList="bannerList" />
			<view class="container-box">
				<Container :pavilionObj="pavilionObj" />
			</view>
			<view class="shop-list-box">
				<view class="recommend-title">
					精选推荐
				</view>
				<ShopList :page="query.page" :shopList="shopList" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Head from './components/head.vue';
	import Container from './components/container.vue';
	import ShopList from '@/components/classify-shop/shop-list.vue';
	import {
		getHomeGoodsList,
		getClassifyBanner,
		getBrandHallList
	} from "@/api/classify.js";
	export default {
		components: {
			Head,
			Container,
			ShopList
		},
		data() {
			return {
				swiperAuto: false,
				query: {
					page: 1,
					row: 10,
					totalPage: 0
				},
				areaId: 43,
				navActive: false,
				shopList: [],
				triggered: false,
				bannerList: [],
				pavilionObj: {
					list: [],
					totalRows: 0
				}
			}
		},
		onShow() {
			this.swiperAuto = true;
		},
		onHide() {
			this.swiperAuto = false;
		},
		mounted() {
			this.getClassifyBannerHandler();
			this.getPavilionListHandler();
			this.getHomeGoodsList();
		},
		methods: {
			getPavilionListHandler(){
				getBrandHallList({
					page: 1,
					rows: 8
				}).then((res) => {
					console.log(res, '>>>>>>>>>>>>')
					if (res && res.list) {
						this.pavilionObj.totalRows = res.totalRows;
						this.pavilionObj.list = [...res.list, {key: 'all'}];
					}
				})
			},
			getClassifyBannerHandler(){
				getClassifyBanner().then((res) => {
					this.bannerList = res;
				})
			},
			getHomeGoodsList() {
				getHomeGoodsList({
					pageIndex: this.query.page,
					areaId: this.areaId,
					simplified: true,
					excludeFields: "product.spu,product.process, product.store,product.supplier,product.areaIds,product.areaPrices,product.category",
				}).then((res) => {
					console.log(res, '>>>>>>>>>')
					this.query.totalPage = res.totalPage;
					this.query.page++;
					this.shopList = res.page;
					this.triggered = false;
				});
			},
			scrolltolower() {
				console.log('scrolltolower')
				if (this.query.totalPage >= this.query.page) {
					this.getHomeGoodsList();
				}
			},
			refresherrefresh() {
				this.shopList = [];
				this.query.page = 1;
				this.triggered = true;
				this.getHomeGoodsList();
			},
			scrollHandler(e) {
				if (e.detail && e.detail.scrollTop) {
					if (e.detail.scrollTop >= 60) {
						if (!this.navActive) {
							this.navActive = true;
						} else {
							return;
						}
					} else {
						if (this.navActive) {
							this.navActive = false;
						} else {
							return;
						}
					}
				}
			},
			searchClick() {
				uni.navigateTo({
					url: "/sub-classify/pages/search/index"
				})
			},
			toStoreHandler() {
				uni.navigateTo({
					url: "/sub-classify/pages/shop-store-list/shop-store-list"
				})
			},
			toShoppingCartHandler() {
				uni.getStorage({
					key: 'scn',
					success: function(res) {
						uni.navigateTo({
							url: "/sub-my/pages/shopping-cart/shopping-cart"
						})
					},
					fail: function(res) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		z-index: 102;
		display: flex;
		padding: 28rpx 32rpx 30rpx;

		.right {
			flex: 1;
			display: flex;

			.box {
				width: 64rpx;
				height: 64rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.box-left {
				margin-left: 24rpx;
			}

			.store,
			.shoppingcart {
				font-size: 34rpx;
				color: #fff;
				position: relative;
			}

			.corner-mark {
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

	.nav-box-active {
		background-color: #fff;

		.right {

			.store,
			.shoppingcart {
				color: #666666;
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

	.classify {
		width: 100%;
		height: 100vh;
	}

	.classify-scroll {
		height: 100%;
	}

	.container-box {
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		padding: 48rpx 32rpx;
	}

	.shop-list-box {
		background: #fff;

		.recommend-title {
			padding-left: 34rpx;
			font-weight: 600;
			font-size: 32rpx;
			color: #2B2F33;
			margin-bottom: 16rpx;
		}

	}
</style>
