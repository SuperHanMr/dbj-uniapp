<template>
	<view class="home">
		<view class="home-top">
			<view class="home-header-icon" :style="{top: tophight}">
				<image class="icon_logo"
					src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/dbj_logo_new.png"
					mode="">
				</image>
			</view>
			<!-- //头部 -->
			<view class="state-bar" :style="{top:navBarHeight}">
				<view class=" header-flex-row flex1" @click="toCity">
					<view class="address">
						{{citydata}}
					</view>
					<image v-if="citydata" class="icon_down"
						src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/home_ic_down.png"
						mode="">
					</image>
				</view>
				<image @click="toSearch" class="icon-search-home" src="/static/home_ic_search.png" mode=""></image>
				<image @click="toMessage" class="img"
					src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/online-server.png"
					mode="">
				</image>
				<view class="head-bg-home" mode=""></view>
			</view>
			<!-- 占位 -->
			<view :style="{height:navBarHeight}">
			</view>
			<!-- 占位 -->
			<view style="height: 87rpx;">
			</view>
		</view>
		<scroll-view class="home-container" scroll-y="true" @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' :refresher-triggered="triggered">
			<!-- banner -->
			<view class="banner-content">
				<swiper class="banner" :autoplay="swiperAuto" interval="2000" duration="500" :circular="true"
					@change="swiperChange">
					<swiper-item v-for="(item) in bannerList" :key="item.id">
						<image class="banner-img" :src="item.resUrl" mode="scaleToFill"
							@click="toWebview(item.jumpUrl)">
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
			<!-- 金刚区 -->
			<view class="zone-view">
				<view class="item-box">
					<view :class="['item', {'item-more': zoneList.length > 8}]" v-for="(item) in zoneList"
						:key="item.id" @click="onZoneClick(item)">
						<image class="icon" :src="item.icon"></image>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<!--<view class="zone-view">
    	  <view class="function-zone function-zone-top">
    	    <view class="item" v-for="(item,index) in zoneList1" :key="item.id" @click="onZoneClick(item)">
    	      <image class="icon" :src="item.icon"></image>
    	      <view class="name">
    	        {{item.name}}
    	      </view>
    	      <image v-if="(index+1)%4" class="border-img"
    	        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/home-zone-border_new.png" mode="">
    	      </image>
    	    </view>
    	  </view>
    	  <view v-if="zoneList2.length" class="function-zone function-zone-center">
    	    <view class="item" v-for="(item,index) in zoneList2" :key="item.id" @click="onZoneClick(item)">
    	      <image class="icon" :src="item.icon"></image>
    	      <view class="name">
    	        {{item.name}}
    	      </view>
    	      <image v-if="(index+1)%4" class="border-img"
    	        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/home-zone-border1.png" mode="">
    	      </image>
    	    </view>
    	  </view>
    	  <view class="function-zone function-zone-bottom">
    	    <view class="item" v-for="(item,index) in zoneList3" :key="item.id" @click="onZoneClick(item)">
    	      <image class="icon" :src="item.icon"></image>
    	      <view class="name">
    	        {{item.name}}
    	      </view>
    	      <image v-if="(index+1)%4" class="border-img"
    	        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/home-zone-border1.png" mode="">
    	      </image>
    	    </view>
    	  </view>
    	</view>-->
			<!-- 快捷栏目 -->
			<view style="padding: 0 24rpx;">
				<image v-for="(item) in status1List" :key="item.id" @click="onZoneClick(item)" :src="item.icon"
					class="experience"></image>
			</view>

			<view v-if="status2List.length" class="example-content">

				<image @click="onZoneClick(status2List[0])" class="item" :src="status2List[0].icon"></image>
				<view class="holder-item">
				</view>
				<image @click="onZoneClick(status2List[1])" class="item" :src="status2List[1].icon"></image>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- 直播 -->
			<view class="flex-row-common" style="margin-top: 44rpx;">
				<view class="title">
					免费服务
				</view>
				<view class="flex1">
				</view>

				<image @click="toLiveList"
					src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_gongdizhibo_more.png"
					class="sub-title-more">
				</image>
			</view>
			<view class="flex-row-common videos">
				<view v-for="(item,index) in videoTypeList" :key="item"
					:style="{color:index==videoType?'#2B2F33':'#999999'}" class="video-title"
					@click="videoTypeChange(index)">
					{{item}}
				</view>
			</view>

			<view class="player-scroll">
				<view style="width: 16rpx;height: 1rpx;flex-shrink: 0;">
				</view>
				<view v-for="(item,index) in liveList" :key="index" class="item margin-left24"
					@click="onLiveClick(item)">
					<image class="img"
						:src="item.mediaType==1?item.roomLiveMediaVO.scaleImg:item.roomVideoMediaVO.scaleImg |imgFormat(494,660)"
						mode="aspectFill"></image>
					<view class="top-content">
						<image class="top-content-img"
							:src="item.mediaType==1?'https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/living.gif':'https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/live-repaly.png'">
							<view v-if="item.mediaType==1" class="text">

								{{item.roomLiveMediaVO.onLineCount||0}}
								<!-- 人正在观看 -->
							</view>
							<view v-else class="text">
								回放
							</view>
					</view>
					<view class="name-content">
						{{item.mediaType==1?item.roomLiveMediaVO.title:item.roomVideoMediaVO.title}}
					</view>
				</view>
				<view style="width: 24rpx;height: 1rpx;flex-shrink: 0;">

				</view>
			</view>
			<!-- #endif -->

			<!-- 推荐 -->
			<view class="flex-row-common" style="margin-top: 50rpx;">
				<view class="title">
					精选推荐
				</view>

			</view>
			<good-list ref="goodList" :page="page" :areaId="areaId"></good-list>
		</scroll-view>
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
	import {
		imgFormat
	} from "../../../utils/common.js";
	import GoodList from "./good-list/good-list.vue";
	export default {
		filters: {
			imgFormat,
		},
		components: {
			GoodList,
		},
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
				page: 1,
				totalPage: 1,
				navBarHeight: "88rpx",
				currentSwiper: 0,
				goodsList: [],
				areaId: "",
				token: "",
				swiperAuto: false,
				status1List: [],
				status2List: [],
				currentAddress: {},
				triggered: false,
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

		onShareAppMessage() {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"],
			});
		},
		onShareTimeline(res) {
			return {
				title: "打扮家装修",
			};
		},
		onLoad(e) {
			// console.log("home page params:", e.scene, e);
			// let shareId = "";
			// if (e && e.scene) {
			//   let scene = decodeURIComponent(e.scene) || "";
			//   let obj = {};
			//   let arr = scene.split("&");
			//   arr.forEach((str) => {
			//     let a = str.split("=");
			//     obj[a[0]] = a[1];
			//   });
			//   if (obj.shareId) {
			//     shareId = obj.shareId;
			//   }
			// }
			// if (e && e.shareId && !shareId) {
			//   shareId = e.shareId;
			// }
			// if (shareId) {
			//   getApp().globalData.shareId = shareId;
			//   uni.setStorage({
			//     key: "shareId",
			//     data: shareId,
			//     success: function() {
			//       console.log("shareId存储成功");
			//     },
			//     fail: function() {
			//       console.error("shareId存储失败");
			//     },
			//   });
			// }
			let defaultHouse = {
				name: "北京市朝阳区",
				provinceId: 1,
				cityId: 36,
				areaId: 41,
			};
			this.areaId = 41;
			this.currentAddress = defaultHouse;
			this.citydata = defaultHouse.name;
			uni.showShareMenu();
			uni.$on("logout", (item) => {
				let defaultHouse = {
					name: "北京市朝阳区",
					provinceId: 1,
					cityId: 36,
					areaId: 41,
				};
				this.areaId = 41;
				this.currentAddress = defaultHouse;
				this.getHomeList();
			});
			uni.$on("refrishHouse", (item) => {
				this.reloadData();
			});
			uni.$on("houseChange", (item) => {
				if (item.id == this.currentAddress.id) {
					queryEstates({
							isNeedRelative: false,
						},
						false,
						true
					).then((e) => {
						let houseList = e;
						let changeHouse = houseList.find((e) => {
							return e.id == this.currentAddress.id;
						});
						this.citydata =
							changeHouse.cityName +
							changeHouse.areaName +
							changeHouse.housingEstate;
						this.areaId = changeHouse.areaId;
						this.currentHouseChange(changeHouse);
					});
				}
			});
			uni.$on("defaultHouseChange", (item) => {
				this.getHomeList();
			});
			uni.$on("selectedHouse", (item) => {
				this.citydata = item.cityName + item.areaName + item.housingEstate;
				this.areaId = item.areaId;
				this.currentHouseChange(item);
			});
			setTimeout(() => {
				this.getHomeList();
			}, 500);

			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// console.log("**********", this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			// #ifdef H5
			this.navBarHeight = '88rpx'
			// #endif
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		onShow() {
			setTimeout(() => {
				this.token = getApp().globalData.token;
			}, 500);
			uni.showTabBar();
			this.swiperAuto = true;
			getApp().globalData.currentRoute = "/pages/home/index/index";
			this.$store.dispatch("updateTabBarBadge");
		},
		mounted() {
			uni.showTabBar();
		},
		onHide() {
			this.swiperAuto = false;
		},
		// computed: {
		//   zoneList1() {
		//     let list = [];
		// console.log(this.zoneList, '>>>>>>>>>>>>>>>>')
		//     for (let i = 0; i < this.zoneList.length; i++) {
		//       if (i < 4) {
		//         list.push(this.zoneList[i]);
		//       }
		//     }
		//     return list;
		//   },
		//   zoneList2() {
		//     if (this.zoneList.length != 12) {
		//       return [];
		//     }
		//     let list = [];
		//     for (let i = 0; i < this.zoneList.length; i++) {
		//       if (i >= 4 && i < 8) {
		//         list.push(this.zoneList[i]);
		//       }
		//     }
		//     return list;
		//   },
		//   zoneList3() {
		//     let list = [];
		//     for (let i = 0; i < this.zoneList.length; i++) {
		//       if (this.zoneList.length == 12 && i > 7) {
		//         list.push(this.zoneList[i]);
		//       } else if (this.zoneList.length == 8 && i > 3) {
		//         list.push(this.zoneList[i]);
		//       }
		//     }
		//     return list;
		//   },
		// },
		methods: {
			scrolltolower() {
				this.page++;
				console.log(this.page);

				setTimeout((e) => {
					this.getHomeGoodsList();
				});
			},
			refresherrefresh() {
				this.triggered = true;
				this.reloadData();
			},
			toLiveList() {
				uni.navigateTo({
					url: "../../../sub-home/pages/lives-list/lives-list",
				});
			},
			currentHouseChange(item) {
				console.log("!!!!@@@###");
				console.log(item);
				this.currentAddress = item;
				this.areaId = item.areaId;
				getApp().globalData.currentHouse = item;
				uni.$emit("currentHouseChange", item);
				getApp().globalData.currentHouse = item;
			},
			toSearch() {

				uni.navigateTo({
					url: "../../../sub-classify/pages/search/index",
				});
			},
			toRealCase() {
				uni.navigateTo({
					url: "../../real-case/real-case",
				});
			},
			toMessage() {
				this.$store.dispatch("openCustomerConversation");
			},
			foramtPrice(item) {
				let price = String(item || "0");
				return price.slice(0, price.length - 2) || "0";
			},
			foramtPrePrice(price) {
				return Number(price / 100).toFixed(2);
			},
			formatCent(item) {
				let price = String(item || "0");
				let fixedNum = Number(price / 100).toFixed(2);
				if (String(fixedNum).split(".").length > 1) {
					return String(fixedNum).split(".")[1];
				} else {
					return "";
				}
			},
			onLiveClick(item) {
				if (item.mediaType == 1) {
					//直播
					uni.navigateTo({
						url: `/pages/home/lives-room/lives-room?roomId=${item.roomLiveMediaVO.roomId}`,
					});
				} else if (item.mediaType == 2) {
					console.log(item);
					//回放
					uni.navigateTo({
						url: "../../common/video-player/video-player?url=" +
							encodeURIComponent(item.roomVideoMediaVO.videoUrl) +
							"&title=" +
							item.roomVideoMediaVO.title +
							"&id=" +
							item.roomVideoMediaVO.id,
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
				let params = {};
				if (item.configParams) {
					params = JSON.parse(item.configParams);
				}
				console.log(params);
				console.log("????????????");
				if (params.needLogin && !this.token) {
					uni.navigateTo({
						url: "../../login/login",
					});
					return;
				}

				if (item.type == 0 || item.type == 5) {
					uni.showModal({
						content: "敬请期待",
						showCancel: false,
					});
				} else if (item.type == 1) {
					if (item.url.endsWith("all-classify/index")) {
						// getClassifyList(this.currentAddress.areaId).then((data) => {
						// 	if (
						// 		data.find((e) => {
						// 			return e.id == JSON.parse(item.urlParams).id;
						// 		})
						// 	) {
						// 		getApp().globalData.naviData = null;
						// 		if (item.urlParams) {
						// 			getApp().globalData.naviData = JSON.parse(item.urlParams);
						// 		}
						let param = this.dealWithUrlParamHandler(item);
						uni.navigateTo({
							url: `${item.url}?${param}`
						})
						// } else {
						// 	uni.navigateTo({
						// 		url: "../../common/result-null/result-null",
						// 	});
						// }
						// });
					} else {
						console.log("");
						uni.navigateTo({
							url: item.url,
						});
					}
				} else if (item.type == 2) {
					let baseurl = this.ENV.VUE_APP_BASE_H5 + "/app-pages/";
					this.toWebview(baseurl + item.url);
				}
				if (item.type == 3) {
					if (item.url.endsWith("search-construction/index.html")) {
						item.url += `?areaId=${this.areaId}`;
					}
					console.log(item.url);
					this.toWebview(item.url);
				}
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
			swiperChange(e) {
				this.currentSwiper = e.detail.current;
			},
			toWebview(url) {
				if (!url) {
					return;
				}
				if (url.indexOf("product-promotion-list") != -1) {
					uni.navigateTo({
						url: "../../../sub-classify/pages/promotion-product-list/index",
					});
				} else {
					uni.navigateTo({
						url: "../../common/webview/webview?url=" + encodeURIComponent(url),
					});
				}
			},
			toCity() {
				let house = getApp().globalData.currentHouse;
				let id = house.id || "";
				uni.navigateTo({
					url: `/sub-my/pages/my-house/my-house?fromHome=1&&isEdit=0&&id=${id}`,
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
					title: "获取信息失败，请重试！",
					icon: "none",
				});
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
							url: "https://api.map.baidu.com/reverse_geocoding/v3/?ak=lrRwp5WQK6fyjnyHGbyHBgFIXXczCIWN&output=json&coordtype=gcj02ll&location=" +
								res.latitude +
								"," +
								res.longitude,
							success(re) {
								console.log("~~~~~~~~~~`");
								if (re.statusCode === 200 && re.data && re.data.result) {
									let addressComponent = re.data.result.addressComponent;
									vm.getAreaId(addressComponent.adcode);
								} else {
									vm.getAddressFail();
								}
							},
							fail() {
								console.log("~~~~~~~~~~~~~!!!!!!`");

								vm.getAddressFail();
							},
						});
					},
					fail() {
						vm.getAddressFail();
					},
				});
			},

			async getAreaId(adcode) {
				let areaInfo = await getAdcodeFromAreaId(adcode);
				this.citydata = areaInfo.name;
				this.currentHouseChange(areaInfo);
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
					areaId: this.currentAddress.areaId,
					version: 16
				}).then((e) => {
					this.zoneList = [];
					let arr = []
					this.status1List = [];
					this.status2List = [];
					e.forEach((e) => {
						if (e && e.configParams) {
							let params = JSON.parse(e.configParams);
							if (params.status && params.status == 1) {
								this.status1List.push(e);
							} else if (params.status && params.status == 2) {
								this.status2List.push(e);
							} else {
								arr.push(e);
							}
						} else {
							arr.push(e);
						}
					});
					this.$nextTick(function() {
						this.zoneList = arr;
					})
					this.triggered = false;
				});
				//首页推荐商品
				this.goodsList = [];
				this.page = 1;
				this.getHomeGoodsList();
			},
			getHomeGoodsList() {
				this.$refs.goodList.getHomeGoodsList();
			},
			async getBannerList() {
				this.bannerList = await getBanner();
			},
			async getHomeList() {
				try {
					const token = getApp().globalData.token;
					const userId = uni.getStorageSync("userId");
					if (userId && token) {
						let houseList = await queryEstates({
								isNeedRelative: false,
							},
							false,
							true
						);
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
							console.log("房屋信息@@@@@@")
							this.currentHouseChange(house);
							uni.setStorageSync("currentHouse", JSON.stringify(house));
							this.areaId = house.areaId;
							this.citydata =
								house.cityName + house.areaName + house.housingEstate;
						}
					} else {
						this.getAuthorizeInfo();
					}
				} catch {
					let defaultHouse = {
						name: "北京市朝阳区",
						provinceId: 1,
						cityId: 36,
						areaId: 41,
					};
					this.areaId = 41;
					this.currentHouseChange(defaultHouse);
				}
			},
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.home {
		background-color: #FFF;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.home-container {
			flex: 1;
			overflow: scroll;
			position: relative;
			z-index: 1000;
		}
	}

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

	page {
		background: #fff;
	}

	.icon_down {
		width: 24rpx;
		height: 24rpx;
		flex-shrink: 0;
	}

	.home-header-icon {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 88rpx;
		display: flex;
		align-items: center;

		.icon_logo {
			width: 164rpx;
			height: 60rpx;
			margin-left: 34rpx;
		}
	}

	.icon-search-home {
		width: 48rpx;
		height: 48rpx;
		margin-right: 32rpx;
		margin-left: 40rpx;
		position: relative;
		z-index: 100000;
	}

	.bottom-border {
		border-bottom: 1rpx solid #e7e8e8;
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

	.player-scroll {
		display: flex;
		overflow: auto;
		margin: 14rpx 0 4rpx 0;

		.margin-left24 {
			margin-left: 16rpx;
		}

		.item {
			flex-shrink: 0;
			width: 200rpx;
			height: 272rpx;
			background: linear-gradient(180deg, rgba(81, 185, 224, 0.19) 0%, rgba(152, 199, 255, 0.113882) 100%);
			box-shadow: 0rpx 2rpx 32rpx -4rpx #e8eced;
			border-radius: 12rpx;
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
				font-weight: bold;
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
				left: 12rpx;
				height: 28rpx;
				background: rgba(0, 0, 0, 0.7);
				backdrop-filter: blur(8.15485px);
				// filter: blur(3rpx);
				border-radius: 8rpx;
				color: #ffffff;
				display: flex;
				align-items: center;
				font-size: 20rpx;

				.text {
					margin: 0 8rpx;
				}
			}

			.top-content-img {
				height: 28rpx;
				width: 28rpx;
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
			font-weight: bold;
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
	}

	.address {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-weight: bold;
		color: #2b2f33;
		font-size: 32rpx;
	}

	.example-content {
		padding: 0 24rpx;
		display: flex;
		flex-direction: row;
		margin-top: 16rpx;

		.item {
			flex: 1;
			height: 190rpx;
			background: #f5fcfc;
			border-radius: 16rpx;
		}

		.holder-item {
			width: 16rpx;
		}
	}

	.experience {
		height: 160rpx;
		border-radius: 16rpx;
		width: 100%;
		display: block;
		margin-top: 30rpx;
	}

	.zone-view {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding-top: 30rpx;

		.item-box {
			display: flex;
			width: calc(100% - 24rpx);
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;

			.item {
				width: calc(100% / 4);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 18rpx;

				.name {
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 34rpx;
					// margin-top: 12rpx;
				}

				.icon {
					display: block;
					width: 112rpx;
					height: 112rpx;
				}
			}

			.item-more {
				width: calc(100% / 6);
			}
		}
	}

	.function-zone-top {
		border-left: 0.3px solid #dadfdf;
		border-top: 0.3px solid #dadfdf;
		border-right: 0.3px solid #dadfdf;
		border-bottom: 0.3px solid #e7e8e8;
		width: 704rpx;
		display: flex;
		flex-direction: row;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}

	.function-zone-bottom {
		border-left: 0.3px solid #dadfdf;
		border-right: 0.3px solid #dadfdf;
		border-bottom: 0.3px solid #dadfdf;
		border-top: none;
		width: 704rpx;
		display: flex;
		flex-direction: row;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	.function-zone-center {
		border-left: 0.3px solid #dadfdf;
		border-right: 0.3px solid #dadfdf;
		border-bottom: 0.3px solid #e7e8e8;
		border-top: none;
		width: 704rpx;
		display: flex;
		flex-direction: row;
	}

	.function-zone {
		.item {
			height: 128rpx;
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
		bottom: 16rpx;
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
		padding: 6rpx 32rpx 6rpx 32rpx;
		border-bottom-left-radius: 32rpx;
		border-bottom-right-radius: 32rpx;

		.img {
			width: 80rpx;
			height: 80rpx;
			position: relative;
			z-index: 10;
		}

		.head-bg-home {
			width: 284rpx;
			height: 284rpx;
			position: fixed;
			right: 0;
			z-index: 1;
			background: url('https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/ic_bg_home.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
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
		margin: 16rpx 24rpx 0;
		z-index: 101;

		.banner {
			border-radius: 16rpx;
			overflow: hidden;
			height: 200rpx;
			width: 704rpx;
			z-index: 200;
			position: relative;
		}

		.banner-img {
			width: 100%;
			height: 200rpx;
		}
	}

	.header-flex-row {
		min-width: 200rpx;
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
