<template>
	<view class="classify">
		<Top :navActive="navActive" :shopListNum="shopListNum" />
		<scroll-view class="classify-scroll" scroll-y="true" :scroll-top="scrollTop" @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' @scroll="scrollHandler" :refresher-triggered="triggered">
			<Head :swiperAuto="swiperAuto" :bannerList="bannerList" />
			<view class="container-box">
				<Container :pavilionObj="pavilionObj" :classList="classList" :recommendList="recommendList" />
			</view>
			<view class="shop-list-box">
				<view class="recommend-title">
					精选推荐
				</view>
				<ShopList @clickDetail="clickDetailHandler"/>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Head from './components/head.vue';
	import Container from './components/container.vue';
	import ShopList from '@/components/classify-shop/shop-list.vue';
	import Top from './components/top.vue';
	import {
		navList
	} from "@/api/home.js";
	import {
		getClassifyBanner,
		getBrandHallList,
		getShoppingCarNum,
		getClassifyShopList
	} from "@/api/classify.js";
	export default {
		components: {
			Head,
			Container,
			ShopList,
			Top
		},
		data() {
			return {
				swiperAuto: false,
				query: {
					page: 1,
					row: 10,
					totalPage: 0,
				},
				areaId: 43,
				navActive: false,
				triggered: false,
				bannerList: [],
				pavilionObj: {
					list: [],
					totalRows: 0
				},
				classList: [],
				recommendList: [],
				areaId: '',
				shopListNum: 0,
				isFormShopDetail: false,
				scrollTop:0
			}
		},
		onShow() {
			this.swiperAuto = true;
			if (!this.isFormShopDetail) {
				this.query.page = 1;
				this.scrollToTop();
				this.mountedHandler();
			} else {
				this.isFormShopDetail = false;
			}
			let currentHouse = getApp().globalData.currentHouse;
			this.areaId = currentHouse.areaId;
		},
		onHide() {
			this.swiperAuto = false;
		},
		mounted() {
			uni.$on("currentHouseChange", (item) => {
				this.areaId = item.areaId;
			});
		},
		methods: {
			mountedHandler(){
				this.getNavHandler();
				this.getShoppingCarNumHandler();
				this.getClassifyBannerHandler();
				this.getPavilionListHandler();
				this.getClassifyShopListHandler();
			},
			getClassifyShopListHandler(){
				getClassifyShopList({
					pageIndex: this.query.page,
					product: {
						areaId: this.areaId,
					},
					simplified: true,
					excludeFields: "product.spu,product.process, product.store,product.supplier,product.areaIds,product.areaPrices,product.category",
				}).then(res => {
					this.query.totalPage = res.totalPage;
					uni.$emit('passShopList', {
						page: this.query.page,
						shopList: res.page
					})
					this.triggered = false;
				})
			},
			getNavHandler() {
				this.classList = [];
				this.recommendList = [];
				
				let params = {
					// provinceId: this.currentHouse.provinceId,
					// cityId: this.currentHouse.cityId,
					// areaId: this.currentHouse.areaId,
					version: 14
				}
				navList(params).then(res => {
					res.forEach(item => {
						if (item && item.configParams) {
							let configParams = JSON.parse(item.configParams);
							this[`nav${configParams.style}Handler`] && this[`nav${configParams.style}Handler`](item)
						}
					})
				})
			},
			nav1Handler(item){
				this.classList.push(item);
			},
			nav2Handler(item){
				this.recommendList.push(item);
			},
			getShoppingCarNumHandler() {
				uni.getStorage({
					key: 'scn',
					success: () => {
						getShoppingCarNum(this.areaId).then(res => {
							this.shopListNum = res.validNumber;
						})
					},
					fail: () => {
						this.shopListNum = 0;
					}
				})
			},
			getPavilionListHandler() {
				getBrandHallList({
					page: 1,
					rows: 8
				}).then((res) => {
					if (res && res.list) {
						this.pavilionObj.totalRows = res.totalRows;
						this.pavilionObj.list = [...res.list, {
							key: 'all'
						}];
					}
				})
			},
			getClassifyBannerHandler() {
				getClassifyBanner().then((res) => {
					this.bannerList = res;
				})
			},
			scrolltolower() {
				if (this.query.totalPage >= this.query.page) {
					this.query.page++;
					this.getClassifyShopListHandler();
				}
			},
			refresherrefresh() {
				this.query.page = 1;
				this.triggered = true;
				this.getClassifyShopListHandler();
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
			clickDetailHandler(){
				this.isFormShopDetail = true;
			},
			scrollToTop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
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
		padding: 24rpx 32rpx;
	}

	.shop-list-box {
		background: #fff;
		padding-top: 40rpx;

		.recommend-title {
			padding-left: 34rpx;
			font-weight: 600;
			font-size: 32rpx;
			color: #2B2F33;
			margin-bottom: 32rpx;
		}

	}
</style>
