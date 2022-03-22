<template>
	<view class="classify">
		<Top :navActive="navActive" :shopListNum="shopListNum" />
		<scroll-view class="classify-scroll" scroll-y="true" @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' @scroll="scrollHandler" :refresher-triggered="triggered">
			<Head :swiperAuto="swiperAuto" :bannerList="bannerList" />
			<view class="container-box">
				<Container :pavilionObj="pavilionObj" :classList="classList" :recommendList="recommendList" />
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
	import Top from './components/top.vue';
	import {
		navList
	} from "@/api/home.js";
	import {
		getHomeGoodsList,
		getClassifyBanner,
		getBrandHallList,
		getShoppingCarNum
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
				},
				classList: [],
				recommendList: [],
				areaId: '',
				shopListNum: 0
			}
		},
		onShow() {
			this.swiperAuto = true;
		},
		onHide() {
			this.swiperAuto = false;
		},
		mounted() {
			let currentHouse = getApp().globalData.currentHouse;
			this.areaId = currentHouse.areaId;
			uni.$on("currentHouseChange", (item) => {
				console.log(item, '>>>>>>>>>>>>')
				this.areaId = item.areaId;
			});
			// this.getNavHandler();
			this.getClassifyBannerHandler();
			this.getPavilionListHandler();
			this.getHomeGoodsList();
		},
		watch: {
			areaId: {
				handler: function () {
					console.log('11111111111111111')
					this.getShoppingCarNumHandler();
				}
			}
		},
		methods: {
			getNavHandler() {
				this.classList = [];
				this.recommendList = [];
				
				let params = {
					// provinceId: this.currentHouse.provinceId,
					// cityId: this.currentHouse.cityId,
					// areaId: this.currentHouse.areaId,
					version: 14
				}
				console.log(getApp().globalData)
				navList(params).then(res => {
					res.forEach(item => {
						if (item && item.configParams) {
							let configParams = JSON.parse(item.configParams);
							console.log(configParams, '>>>>>>>>>>>')
							this.[`nav${configParams.style}Handler`](item)
						}
					})
					console.log(res, this.classList, '>>>>>>>>>>>><<<<<<<<<')
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
							console.log(res, '>>>>>>>><<<<<<<<sjhop[ingn]')
						})
					}
				})
			},
			getPavilionListHandler() {
				getBrandHallList({
					page: 1,
					rows: 8
				}).then((res) => {
					console.log(res, '>>>>>>>>>>>>')
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
			}
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
			margin-bottom: 16rpx;
		}

	}
</style>
