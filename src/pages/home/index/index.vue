<template>
	<view>
		<custom-navbar title="首页" :opacity="scrollTop/100" :showBack="false">
			<template v-slot:back>
				<view @click="toCity">
					{{citydata}}
				</view>
			</template>
		</custom-navbar>
		<scroll-view class="content" scroll-y="true" @scroll="onScroll" @scrolltolower="onLoadMore">
			<view style="margin-top: 300rpx;" class="">
			</view>

			<button style="width: 50%;margin-top: 20rpx;" type="default" @click="toNextPage">去封装好的列表页</button>
			<button style="width: 50%;margin-top: 20rpx;" type="default" @click="toTest">测试</button>
			<button style="width: 50%;margin-top: 20rpx;" type="default" @click="toLiveDecorate">去装修现场</button>
			<button style="width: 50%;margin-top: 20rpx;" type="default" @click="toShop">去商家入驻</button>
			<button style="width: 50%;margin-top: 20rpx;" type="default" @click="toGoodsApply">去要货申请</button>
			<swiper class="banner-content" :indicator-dots="true" :autoplay="true" interval="2000" duration="500"
				:circular="true">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image class="banner-img" :src="item.resUrl" mode="aspectFit" @click="toWebview(item.jumpUrl)">
					</image>
				</swiper-item>
			</swiper>
			<view class="flex-row">
				<view class="item" v-for="(item,index) in liveList" :key="index" @click="toLiveRoom(item)">
					<image class="img" :src="item.scaleImg" mode="scaleToFill"></image>
					{{item.title}}
				</view>
			</view>
			<waterfall :list="caseList" @selectedItem="onSelectedItem"></waterfall>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getBanner,
		queryLive,
		caseList
	} from "../../../api/home.js";

	import {
		orderList,
		orderPay
	} from "../../../api/order.js";
	import {
		queryEstates
	} from "../../../api/decorate.js";
	import {
		getAdcodeFromAreaId
	} from "../../../utils/cityData.js";
	export default {
		data() {
			return {
				tophight: 0,
				navBarHeight: 0,
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
			};
		},
		onLoad() {
			let defaultHouse = {
				name: "北京市朝阳区",
				provinceId: 1,
				cityId: 36,
				areaId: 41,
			};
			uni.setStorageSync("currentHouse", JSON.stringify(defaultHouse));
			this.citydata = defaultHouse.name;
			this.getHomeList();
		},
		onShow() {
			uni.$once("selectedHouse", (item) => {
				this.citydata = item.cityName + item.areaName;
				uni.setStorageSync("currentHouse", JSON.stringify(item));
			});
			this.reloadData();
		},
		methods: {
			toTest(){
				uni.navigateTo({
					url: "/sub-other/pages/test/test",
				});
			},
			toShop() {
				uni.navigateTo({
					url: "/sub-other/pages/merchant-entry/merchant-entry",
				});
			},
			toLiveDecorate() {
				uni.navigateTo({
					url: "/sub-home/pages/lives-decorate/lives-decorate",
				});
			},
			toGoodsApply() {
				uni.navigateTo({
					url: "../../../sub-decorate/pages/require-pay/require-pay",
				});
			},
			toPay() {
				let openId = uni.getStorageSync("openId");
				orderPay({
					orderId: 109,
					payType: 1,
					openid: openId,
				}).then((e) => {
					const payInfo = e.wechatPayJsapi;
					uni.requestPayment({
						provider: "wxpay",
						...payInfo,
						success(res) {},
						fail(e) {
							console.log(e);
						},
					});
				});
			},
			onLoadMore() {
				if (this.loading || this.page >= this.totalPage) {
					return;
				}
				this.page++;
				this.getCaseList();
			},
			onSelectedItem(item) {
				if (item.shareLinks) {
					this.toWebview(item.shareLinks);
				}
			},
			toWebview(url) {
				if (!url) {
					return;
				}
				uni.navigateTo({
					url: "../../common/webview/webview?url=" + encodeURIComponent(url),
				});
			},
			changeCity() {
				console.log("切换城市");
			},
			toCity() {
				uni.navigateTo({
					url: "/sub-my/pages/my-house/my-house",
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
						// 拒绝授权
						that.openConfirm();
						console.log("你拒绝了授权，无法获得周边信息");
					},
				});
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
								if (re.statusCode === 200) {
									console.log("???????");
									console.log(re);
									let addressComponent = re.data.result.addressComponent;
									vm.getAreaId(addressComponent.adcode);
								} else {
									console.log("获取信息失败，请重试！");
								}
							},
						});
					},
				});
			},
			async getAreaId(adcode) {
				let areaInfo = await getAdcodeFromAreaId(adcode);
				this.citydata = areaInfo.name;
				uni.setStorageSync("currentHouse", JSON.stringify(areaInfo));
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
						} else if (res.cancel) {
							// uni.showToast({
							//   title: "你拒绝了授权，无法获得周边信息",
							//   icon: "none",
							//   duration: 1000,
							// });
						}
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
			reloadData() {
				this.getBannerList();
				this.getCaseList();
			},
			async getCaseList() {
				this.loading = true;
				let caseItem = await caseList({
					page: this.page,
				});
				this.totalPage = caseItem.totalPage;
				this.caseList = this.caseList.concat(caseItem.list);
				this.loading = false;
			},
			async getBannerList() {
				this.bannerList = await getBanner();
			},
			async getHomeList() {
				if (uni.getStorageSync("userId")) {
					let houseList = await queryEstates();
					let house = null;
					let defaultHouse;
					if (houseList && houseList.length) {
						defaultHouse = houseList.find((e) => {
							return e.defaultEstate == true;
						});
					}
					if (defaultHouse) {
						house = defaultHouse;
					} else if (houseList.length) {
						house = houseList[0];
					}
					if (house) {
						uni.setStorageSync("currentHouse", JSON.stringify(house));
						this.citydata = house.cityName + house.areaName;
					}
				} else {
					this.getAuthorizeInfo();
				}
			},
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},
			toNextPage() {
				uni.navigateTo({
					url: "/sub-decorate/pages/warehouse-list/warehouse-list",
				});
			},
		},
	};
</script>

<style lang="scss">
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

	.listtitle {
		padding-left: 22rpx;
		font-size: 24rpx;
		padding-bottom: 22rpx;

		.listtitle1 {
			line-height: 39rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			min-height: 39rpx;
			max-height: 78rpx;
		}

		.listtitle2 {
			color: #ff0000;
			font-size: 32rpx;
			line-height: 32rpx;
			font-weight: bold;
			padding-top: 22rpx;

			.listtitle2son {
				font-size: 32rpx;
			}
		}

		.listtitle3 {
			font-size: 28rpx;
			color: #909399;
			line-height: 32rpx;
			padding-top: 22rpx;
		}
	}

	.Index {
		width: 100%;
		height: 100%;
	}

	.banner-content {
		width: 100%;
		height: 200rpx;

		.banner-img {
			width: 100%;
			height: 200rpx;
		}
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		overflow: auto;
		width: 100%;

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

	.content {
		height: 100vh;
	}

	.banner {
		height: 2000rpx;
	}

	.test {
		height: 2000rpx;
		width: 750rpx;
	}
</style>
