<template>
	<view style="background-color: #FFF;">
		<custom-navbar opacity="1" :showBack="false" bgcolor="#FFF">
			<template v-slot:back>
				<image class="icon_logo" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/dbj_logo.png"
					mode=""></image>
			</template>
		</custom-navbar>
		<!-- 		<view :style="{height: navBarHeight}" style="width: 100%;background-color: red;">

		</view> -->

		<!-- //头部 -->
		<view class="state-bar" :style="{top:navBarHeight}">
			<view class=" header-flex-row flex1" @click="toCity">
				<view class="address">
					{{citydata}}
				</view>
				<image v-if="citydata" class="icon_down"
					src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_home_down.png" mode=""></image>
			</view>

			<image @click="toSearch" class="icon-search"
				src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/search.png" mode=""></image>
			<image @click="toMessage" class="img"
				src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/online-server.png" mode="">
			</image>
		</view>
		<!-- 占位 -->
		<view :style="{height:navBarHeight}">
		</view>
		<!-- 占位 -->
		<view style="height: 80rpx;">
		</view>
		<!-- banner -->
		<view class="banner-content">
			<swiper :autoplay="swiperAuto" interval="2000" duration="500" :circular="true" @change="swiperChange">
				<swiper-item v-for="(item,index) in bannerList" :key="item.id">
					<image class="banner-img" :src="item.resUrl" mode="aspectFit" @click="toWebview(item.jumpUrl)">
					</image>
				</swiper-item>
			</swiper>
			<view class="swiper-tab">
				<view class="flex1" v-for="(item,index) in bannerList" :key="index"
					:style="{backgroundColor:index==currentSwiper?'#FFF':''}">
				</view>
			</view>
		</view>
		<!-- 金刚区 -->
		<view class="zone-view">
			<view class="function-zone function-zone-top">
				<view class="item" v-for="(item,index) in zoneList1" :key="item.id" @click="onZoneClick(item)">
					<image class="icon" :src="item.icon"></image>
					<view class="name">
						{{item.name}}
					</view>
					<image v-if="(index+1)%4" class="border-img"
						src="http://dbj.dragonn.top/%20%20static/mp/dabanjia/images/home/home-zone-border1.png" mode="">
					</image>
				</view>
			</view>
			<!-- 金刚区 -->
			<view v-if="zoneList2.length" class="function-zone function-zone-center">
				<view class="item" v-for="(item,index) in zoneList2" :key="item.id" @click="onZoneClick(item)">
					<image class="icon" :src="item.icon"></image>
					<view class="name">
						{{item.name}}
					</view>
					<image v-if="(index+1)%4" class="border-img"
						src="http://dbj.dragonn.top/%20%20static/mp/dabanjia/images/home/home-zone-border1.png" mode="">
					</image>
				</view>
			</view>
			<!-- 金刚区 -->
			<view class="function-zone function-zone-bottom">
				<view class="item" v-for="(item,index) in zoneList3" :key="item.id" @click="onZoneClick(item)">
					<image class="icon" :src="item.icon"></image>
					<view class="name">
						{{item.name}}
					</view>
					<image v-if="(index+1)%4" class="border-img"
						src="http://dbj.dragonn.top/%20%20static/mp/dabanjia/images/home/home-zone-border1.png" mode="">
					</image>
				</view>
			</view>
		</view>
		<!-- 快捷栏目 -->
		<view style="padding: 0 24rpx;">
			<image v-for="(item,index) in status1List" :key="item.id" @click="onZoneClick(item)" :src="item.icon"
				class="experience">
		</view>


		</image>
		<view class="example-content">

			<image v-for="(item,index) in status2List" :key="item.id" @click="onZoneClick(item)" class="item"
				:src="item.icon"></image>

		</view>

		<!-- 直播 -->
		<view class="flex-row-common" style="margin-top: 42rpx;">
			<view class="title">
				免费服务
			</view>
			<view class="flex1">
			</view>
			<view class="sub-title-more" @click="toLiveList">
				更多
				<image class="more_icon"
					src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/ic_more_right.png" mode=""></image>
			</view>
		</view>
		<view class="flex-row-common videos">
			<view v-for="(item,index) in videoTypeList" :key="item"
				:style="{color:index==videoType?'#2B2F33':'#999999'}" class="video-title"
				@click="videoTypeChange(index)">
				{{item}}
			</view>
		</view>

		<view class="player-scroll">
			<view v-for="(item,index) in liveList" :key="index" class="item" @click="onLiveClick(item)">
				<image class="img" :src="item.mediaType==1?item.roomLiveMediaVO.scaleImg:item.roomVideoMediaVO.scaleImg"
					mode=""></image>
				<image v-if="item.mediaType==2" class="top-content-img"
					src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_liveing.png">
				</image>
				<view v-if="item.mediaType==1" class="top-content">
					{{item.roomLiveMediaVO.onLineCount}}人正在观看
				</view>
				<image v-if="item.mediaType==2" class="top-content-img"
					src="http://dbj.dragonn.top/%20%20static/mp/dabanjia/images/home/video_review.png">
				</image>
				<view class="name-content">
					{{item.mediaType==1?item.roomLiveMediaVO.title:item.roomVideoMediaVO.title}}
				</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="flex-row-common" style="margin-top: 50rpx;">
			<view class="title">
				精选推荐
			</view>

		</view>
		<view class="goods-list">
			<view class="item" v-for="(item,index) in goodsList" :key="item.id"
				@click="toGoodsDetail(item.product.skuId)">
				<image class="img" :src="item.product.skuImage" mode="aspectFill"></image>
				<view class="info">
					<view class="title">

						<text class="tip">
							{{item.product.productType==1?'物品':'服务'}}

						</text>
						<text>{{item.product.spuName}}</text>
					</view>
					<view class="flex1">
					</view>
					<view class="price">
						¥
						<text class=" price-font amount">
							{{foramtPrice(item)}}
						</text>
						<text class="price-font ex">.{{formatCent(item)}}</text>
						/{{item.product.salesUnit.unitName||''}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanner,
		queryLive,
		caseList,
		navList
	} from "../../../api/home.js";
	import {
		getGoodsList,
		getClassifyList
	} from "../../../api/classify.js";
	import {
		queryEstates
	} from "../../../api/decorate.js";
	import {
		getAdcodeFromAreaId
	} from "../../../utils/cityData.js";
	export default {
		data() {
			return {
				videoType: 0,
				videoTypeList: ["免费咨询", "设计咨询", "施工咨询", "家居&建材"],
				zoneList: [],
				tophight: 0,
				scrollTop: 0,
				liveList: [],
				citydata: "",
				roomId: "",
				bannerList: [],
				list: [],
				comList: [],
				caseList: [],
				loading: false,
				page: 1,
				totalPage: 1,
				navBarHeight: "",
				currentSwiper: 0,
				goodsList: [],
				areaId: "",
				token: "",
				swiperAuto: false,
				status1List: [],
				status2List: [],
				currentAddress: {},

			};
		},
		watch: {
			areaId() {
				this.reloadData();
			},
			token() {
				this.getHomeList();
			},
		},
		onLoad() {
			uni.$on("refrishHouse", (item) => {
				this.reloadData();
			});
			uni.$on("defaultHouseChange", (item) => {
				this.getHomeList();
			});
			uni.$on("selectedHouse", (item) => {
				this.citydata = item.cityName + item.areaName + item.housingEstate;
				this.areaId = item.areaId;
				this.currentHouseChange(item);
			});
			this.getHomeList();
			this.reloadData();
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.log("**********", this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		onShow() {
			this.token = getApp().globalData.token;
			uni.showTabBar()
			this.swiperAuto = true;
			getApp().globalData.currentRoute = "/pages/home/index/index"
			this.$store.dispatch("updateTabBarBadge");
		},
		mounted() {
			uni.showTabBar()
		},
		onHide() {
			this.swiperAuto = false
		},

		onReachBottom() {
			this.page++;
			this.getHomeGoodsList();
		},
		onPullDownRefresh() {
			this.reloadData()
		},
		computed: {
			zoneList1() {
				let list = []
				for (let i = 0; i < this.zoneList.length; i++) {
					if (i < 4) {
						list.push(this.zoneList[i])
					}
				}
				return list
			},
			zoneList2() {
				if (this.zoneList.length != 12) {
					return []
				}
				let list = []
				for (let i = 0; i < this.zoneList.length; i++) {
					if (i >= 4 && i < 8) {
						list.push(this.zoneList[i])
					}
				}
				return list
			},
			zoneList3() {
				let list = []
				for (let i = 0; i < this.zoneList.length; i++) {
					if (this.zoneList.length == 12 && i > 7) {
						list.push(this.zoneList[i]);
					} else if (this.zoneList.length == 8 && i > 3) {
						list.push(this.zoneList[i]);
					}
				}
				return list
			}
		},
		methods: {
			toLiveList() {
				uni.navigateTo({
					url: '../../../sub-home/pages/lives-list/lives-list'
				})
			},
			currentHouseChange(item) {
				this.currentAddress = item;
				uni.$emit('currentHouseChange', item);
				getApp().globalData.currentHouse = item;
				this.reloadData()
			},
			toSearch() {
				uni.navigateTo({
					url: '../../../sub-classify/pages/search/index'
				})
			},
			toRealCase() {
				uni.navigateTo({
					url: '../../real-case/real-case'
				})
			},
			toMessage() {
				this.$store.dispatch("openCustomerConversation");
			},

			toGoodsDetail(id) {
				uni.navigateTo({
					url: "/sub-classify/pages/goods-detail/goods-detail?goodId=" + id
				})
			},
			foramtPrice(item) {
				let price = String(item.product.skuPrice || '0');
				return price.slice(0, price.length - 2) || "0";
			},
			formatCent(item) {
				let price = String(item.product.skuPrice || '0');
				let fixedNum = Number(price / 100).toFixed(2)
				if (String(fixedNum).split('.').length > 1) {
					return String(fixedNum).split('.')[1]
				} else {
					return ''
				}
			},
			onLiveClick(item) {
				if (item.mediaType == 1) {
					//直播
					uni.navigateTo({
						url: `../../../sub-home/pages/lives-room/lives-room?roomId=${item.roomLiveMediaVO.roomId}`
					})
				} else if (item.mediaType == 2) {
					console.log(item);
					//回放
					uni.navigateTo({
						url: "../../common/video-player/video-player?url=" +
							encodeURIComponent(item.roomVideoMediaVO.videoUrl) + "&title=" + item.roomVideoMediaVO
							.title,
					});
				}
			},
			getQueryLiveList() {
				let type = -2;
				if (this.videoType == 0) {
					type = -2;
				}
				if (this.videoType == 1) {
					type = 0;
				}
				if (this.videoType == 2) {
					type = 2;
				}
				if (this.videoType == 3) {
					type = 3;
				}

				queryLive({
					type: type,
					rows: 15,
				}).then((e) => {
					this.liveList = e.list;
					console.log(e);
				});
			},
			videoTypeChange(e) {
				this.videoType = e;
				this.getQueryLiveList();
			},
			onZoneClick(item) {
				if (item.type == 0) {
					uni.showModal({
						title: '敬请期待'
					})
				} else if (item.type == 1) {
					if (item.url.endsWith('index/index')) {
						getClassifyList(this.areaId).then((data) => {
							if (data.find(e => {
									return e.id == JSON.parse(item.urlParams).id;
								})) {
								getApp().globalData.naviData = null;
								if (item.urlParams) {

									getApp().globalData.naviData = JSON.parse(item.urlParams);
								}
								uni.switchTab({
									url: item.url
								})
							} else {
								uni.navigateTo({
									url: '../../common/result-null/result-null'
								})
							}
						})



					} else {
						uni.navigateTo({
							url: item.url
						})
					}
				} else if (item.type == 2) {
					let baseurl = this.ENV.VUE_APP_BASE_H5 + '/app-pages/'
					this.toWebview(baseurl + item.url);
				}
				if (item.type == 3) {
					this.toWebview(item.url);
				}
			},
			swiperChange(e) {
				this.currentSwiper = e.detail.current;
			},
			toWebview(url) {
				if (!url) {
					return;
				}
				uni.navigateTo({
					url: "../../common/webview/webview?url=" + encodeURIComponent(url),
				});
			},
			toCity() {
				uni.navigateTo({
					url: "/sub-my/pages/my-house/my-house?fromHome=1&&isEdit=0",
				});
			},
			getAuthorizeInfo() {
				const that = this;
				uni.authorize({
					scope: "scope.userLocation",
					success() {
						// 允许授权
						that.getLocationInfo();
					},
					fail() {
						let defaultHouse = {
							name: "北京市朝阳区",
							provinceId: 1,
							cityId: 36,
							areaId: 41,
						};
						that.areaId = 41;
						that.currentHouseChange(defaultHouse);
						// uni.setStorageSync("currentHouse", JSON.stringify(defaultHouse));
						that.citydata = defaultHouse.name;
						// 拒绝授权
						that.openConfirm();
						console.log("你拒绝了授权，无法获得周边信息");
					},
				});
			},
			getAddressFail() {
				uni.showToast({
					title: '获取信息失败，请重试！',
					icon: 'none'
				})
				let defaultHouse = {
					name: "北京市朝阳区",
					provinceId: 1,
					cityId: 36,
					areaId: 41,
				};
				this.areaId = 41;
				this.currentHouseChange(defaultHouse);
				this.citydata = defaultHouse.name;
			},
			// 获取地理位置
			getLocationInfo() {
				let vm = this;
				uni.getLocation({
					type: "gcj02",
					success(res) {
						let that = vm;
						// const latitude = res.latitude;
						// const longitude = res.longitude;
						uni.request({
							header: {
								"Content-Type": "application/text",
							},
							//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
							url: "https://api.map.baidu.com/reverse_geocoding/v3/?ak=s0deCKPpT7GZBxtBLGs9gMkGTs80uuyD&output=json&coordtype=gcj02ll&location=" +
								res.latitude +
								"," +
								res.longitude,
							success(re) {
								console.log('~~~~~~~~~~`')
								if (re.statusCode === 200 && re.data && re.data.result) {
									let addressComponent = re.data.result.addressComponent;
									vm.getAreaId(addressComponent.adcode);
								} else {
									vm.getAddressFail()
								}
							},
							fail() {
								console.log('~~~~~~~~~~~~~!!!!!!`')

								vm.getAddressFail()
							}
						});
					},
					fail() {

						vm.getAddressFail()
					},
				});
			},
			async getAreaId(adcode) {
				let areaInfo = await getAdcodeFromAreaId(adcode);
				this.citydata = areaInfo.name;
				this.currentHouseChange(areaInfo)
				// uni.setStorageSync("currentHouse", JSON.stringify(areaInfo));
			},
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: "请求授权当前位置",
					content: "需要获取您的地理位置，请确认授权",
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {}
					},
				});
			},
			toLiveRoom(item) {
				if (item && item.livePreview) {
					uni.navigateTo({
						url: "/sub-home/pages/lives-room/lives-room?livePreview=" +
							item.livePreview,
					});
				} else if (item && item.videoFileUrl) {
					uni.navigateTo({
						url: "../../common/video-player/video-player?url=" + item.videoFileUrl,
					});
				}
			},
			async reloadData() {
				// banner
				this.getBannerList();
				//直播列表
				this.getQueryLiveList();
				//金刚区列表
				navList({
					provinceId: this.currentAddress.provinceId,
					cityId: this.currentAddress.cityId,
					areaId: this.currentAddress.areaId
				}).then((e) => {
					this.zoneList = [];
					this.status1List = [];
					this.status2List = [];
					e.forEach(e => {
						if (e && e.configParams) {
							let params = JSON.parse(e.configParams)
							if (params.status && params.status == 1) {
								this.status1List.push(e)
							} else if (params.status && params.status == 2) {
								this.status2List.push(e)
							} else {
								this.zoneList.push(e)
							}
						} else {
							this.zoneList.push(e)
						}
					})
					uni.stopPullDownRefresh()
				});
				//首页推荐商品
				this.goodsList = [];
				this.getHomeGoodsList();
			},
			getHomeGoodsList() {
				getGoodsList({
					pageIndex: this.page,
					areaId: this.areaId,
				}).then((e) => {
					this.goodsList = this.goodsList.concat(e.page);
				});
			},
			async getBannerList() {
				this.bannerList = await getBanner();
			},
			async getHomeList() {
				const token = getApp().globalData.token;
				const userId = uni.getStorageSync("userId");
				if (userId && token) {
					let houseList = await queryEstates({
						isNeedRelative: false
					});
					let house = null;
					let defaultHouse;
					if (houseList && houseList.length) {
						defaultHouse = houseList.find((e) => {
							return e.defaultEstate == true;
						});
					} else {
						this.getAuthorizeInfo();
					}
					if (defaultHouse) {
						house = defaultHouse;
					} else if (houseList.length) {
						house = houseList[0];
					}
					if (house) {
						this.currentHouseChange(house)
						// uni.setStorageSync("currentHouse", JSON.stringify(house));
						this.areaId = house.areaId;
						this.citydata = house.cityName + house.areaName + house.housingEstate;
					}
				} else {
					this.getAuthorizeInfo();
				}
			},
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},
		},
	};
</script>

<style lang="scss">
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		color: transparent;
	}

	.icon_down {
		width: 28rpx;
		height: 28rpx;
		flex-shrink: 0;
	}

	.icon_logo {
		width: 164rpx;
		height: 60rpx;
	}

	.icon-search {
		width: 48rpx;
		height: 48rpx;
		margin-right: 32rpx;
		margin-left: 40rpx;
	}

	.bottom-border {
		border-bottom: 1rpx solid #E7E8E8;
	}

	.videos {
		height: 80rpx;
		align-items: center;
	}

	.video-title {
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		line-height: 40rpx;
		margin-right: 48rpx;
	}

	.goods-list {
		display: flex;
		margin-top: 8rpx;
		width: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;

		.item {
			margin-top: 16rpx;
			flex-shrink: 0;
			width: 343rpx;
			height: 520rpx;
			border-radius: 18rpx;
			border: 1rpx solid #e6eaed;
			margin-left: 21.3rpx;
			position: relative;
			overflow: hidden;

			.img {
				width: 100%;
				height: 343rpx;
			}

			.price {
				margin-bottom: 28rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #939699;
				line-height: 26rpx;
				font-family: Unnamed-Regular, Unnamed;

				.amount {
					font-size: 40rpx;
					font-weight: 400;
					color: #2b2f33;
					line-height: 42rpx;
				}

				.ex {
					font-size: 24rpx;
					font-weight: 400;
					color: #2b2f33;
					line-height: 26rpx;
				}
			}

			.info {
				padding: 0 24rpx;
				display: flex;
				flex-direction: column;
				height: 177rpx;

				.title {
					margin-top: 10rpx;
					font-size: 28rpx;
					color: #2b2f33;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; //这个代表你要在几行显示省略号
					-webkit-box-orient: vertical;
					vertical-align: middle;
					display: inline;
				}

				.tip {
					width: 60rpx;
					height: 30rpx;
					margin-right: 8rpx;
					line-height: 30rpx;
					border-radius: 4rpx;
					color: #35c4c4;
					font-size: 20rpx;
					text-align: center;
					display: inline-block;
					border: 1rpx solid #35c4c4;
					vertical-align: 15%;
				}

				// .tip:after {
				// 	display: inline-block;
				// 	vertical-align: middle;
				// 	content: "";
				// 	height: 120%;
				// }
			}
		}
	}

	.player-scroll {
		width: 100%;
		display: flex;
		overflow: auto;
		margin-top: 14rpx;

		.item {
			flex-shrink: 0;
			width: 248rpx;
			height: 330rpx;
			background: linear-gradient(213deg, #dfe4ed 0%, #f3f5f8 56%, #f8fafa 100%);
			box-shadow: 0rpx 2rpx 32rpx -4rpx #e8eced;
			border-radius: 16rpx;
			margin-left: 24rpx;
			position: relative;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}

			.name-content {
				position: absolute;
				bottom: 12rpx;
				left: 16rpx;
				right: 16rpx;
				font-size: 26rpx;
				font-weight: 500;
				color: #ffffff;
				line-height: 36rpx;
				text-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.2);
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1; //这个代表你要在几行显示省略号
				-webkit-box-orient: vertical;
			}

			.top-content {
				position: absolute;
				top: 12rpx;
				left: 20rpx;
				padding: 12rpx;
				height: 28rpx;
				background: rgba(0, 0, 0, 0.35);
				border-radius: 8rpx;
				font-weight: 400;
				color: #ffffff;
				line-height: 24rpx;
				font-size: 20rpx;
			}

			.top-content-img {
				position: absolute;
				top: 12rpx;
				left: 12rpx;
				height: 28rpx;
				width: 74rpx;
			}
		}
	}

	.flex-row-common {
		margin: 0 32rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;

		.title {
			font-size: 36rpx;
			font-weight: 500;
			color: #2b2f33;
			line-height: 50rpx;
		}

		.sub-title {
			font-size: 28rpx;
			font-weight: 400;
			color: #2b2f33;
			line-height: 40rpx;
		}
	}

	.more_icon {
		display: block;
		width: 16rpx;
		height: 16rpx;
	}

	.sub-title-more {
		width: 92rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		border: 1rpx solid #DADFE3;
		font-weight: 300;
		color: #2D3033;
		font-size: 22rpx;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.address {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-weight: 500;
		color: #2B2F33;
		font-size: 32rpx;

	}

	.example-content {
		padding: 0 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 16rpx;

		.item {
			width: 344rpx;
			height: 150rpx;
			background: #f5fcfc;
			border-radius: 16rpx;
		}
	}

	.experience {
		height: 198rpx;
		border-radius: 16rpx;
		width: 100%;
		display: block;
	}

	.zone-view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 24rpx 0;

	}

	.function-zone-top {
		border: 1rpx solid #e7e8e8;
		width: 704rpx;
		display: flex;
		flex-direction: row;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}

	.function-zone-bottom {
		border: 1rpx solid #e7e8e8;
		border-top: none;
		width: 702rpx;
		display: flex;
		flex-direction: row;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	.function-zone-center {
		border: 1rpx solid #e7e8e8;
		border-top: none;
		width: 704rpx;
		display: flex;
		flex-direction: row;
	}

	.function-zone {


		.border-top {
			// border-top: 1px soli: ;d #e7e8e8;
		}

		.border-top-left {
			// border-top-left-radius: 16rpx;
			// border-left: 1px solid #e7e8e8;
		}

		.border-top-right {
			// border-top-right-radius: 16rpx;
		}

		.item {
			height: 134rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			.border-img {
				position: absolute;
				right: -16rpx;
				top: 0;
				width: 12rpx;
				height: 100%;
			}

			.name {
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				line-height: 34rpx;
				margin-top: 2rpx;
			}

			.icon {
				display: block;
				width: 60rpx;
				height: 60rpx;
			}
		}
	}

	.swiper-tab {
		position: absolute;
		bottom: 22rpx;
		width: 200rpx;
		height: 4rpx;
		left: 50%;
		background: rgba(255, 255, 255, 0.4);
		transform: translateX(-50%);
		border-radius: 3rpx;
		display: flex;
		flex-direction: row;
	}

	.state-bar {
		position: fixed;
		left: 0;
		right: 0;
		height: 80rpx;
		background-color: #fff;
		z-index: 999;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 6rpx 24rpx 6rpx 24rpx;

		.img {
			width: 76rpx;
			height: 74rpx;
		}
	}

	.flex1 {
		flex: 1;
	}

	.pubuBox {
		padding: 22rpx;
	}

	.pubuItem {
		column-count: 2;
		column-gap: 20rpx;
	}

	.item-masonry {
		box-sizing: border-box;
		border-radius: 15rpx;
		overflow: hidden;
		background-color: #fff;
		break-inside: avoid;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
	}

	.item-masonry image {
		width: 100%;
	}

	.banner-content {
		position: relative;
		height: 234rpx;
		margin: 0 24rpx;
		margin-top: 8rpx;
		border-radius: 16rpx;
		overflow: hidden;

		.banner-img {
			width: 100%;
			height: 234rpx;
		}
	}

	.header-flex-row {
		display: flex;
		align-items: center;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		overflow: auto;

		.item {
			flex-shrink: 0;
			width: 200rpx;
			// height: 200rpx;
			text-align: center;
			margin-left: 20rpx;
			// background-color: yellow;

			.img {
				width: 200rpx;
				height: 200rpx;
			}
		}
	}
</style>
