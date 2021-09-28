<template>
	<view style="background-color: #FFF;">
		<custom-navbar opacity="1" :showBack="false" bgcolor="#FFF">
			<template v-slot:back>
				<view>
					Logo
				</view>
			</template>
		</custom-navbar>
		<!-- 		<view :style="{height: navBarHeight}" style="width: 100%;background-color: red;">

		</view> -->

		<!-- //头部 -->
		<view class="state-bar" :style="{top:navBarHeight}">
			<view class="address flex1" @click="toCity">
				{{citydata}}
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
		<view class="function-zone">
			<view class="item " v-for="(item,index) in zoneList" :key="item.id"
				:class="{'bottom-border':index<zoneList.length-4}" @click="onZoneClick(item)">
				<image class="icon" :src="item.icon"></image>
				<view class="name">
					{{item.name}}
				</view>
				<image v-if="(index+1)%4" class="border-img"
					src="http://dbj.dragonn.top/%20%20static/mp/dabanjia/images/home/home-zone-border1.png" mode="">
				</image>
			</view>
		</view>
		<!-- 快捷栏目 -->
		<view class="experience">
			<view class="title">
				9.9元买设计报价
			</view>
			<view class="sub-title">
				准确计算装修价格，让您合理分配预算
			</view>
			<view class="btn">
				立即体验
			</view>
		</view>
		<view class="example-content">
			<view class="item" @click="toSelfFitment">
				<view class="title">
					#自学装修
				</view>
				<view class="sub-title">
					秒懂!装修知识
				</view>
				<view class="tips">
					自己手动 打扮温馨的家
				</view>
			</view>

			<view class="item" @click="toRealCase">
				<view class="title">
					#真实案例
				</view>
				<view class="sub-title">
					速查!相似案例
				</view>
				<view class="tips">
					借鉴实践 新手变高手 </view>
			</view>
		</view>

		<!-- 直播 -->
		<view class="flex-row-common" style="margin-top: 42rpx;">
			<view class="title">
				免费服务
			</view>
			<view class="flex1">
			</view>
			<view class="sub-title">
				更多
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
		<view class="flex-row-common" style="margin-top: 42rpx;">
			<view class="title">
				精选推荐
			</view>

		</view>
		<view class="goods-list">
			<view class="item" v-for="(item,index) in goodsList" :key="item.id"
				@click="toGoodsDetail(item.product.skuId)">
				<image class="img" :src="item.product.skuImage" mode=""></image>
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
						<text class="amount">
							{{foramtPrice(item)}}
						</text>
						<text class="ex">.{{formatCent(item)}}</text>
						/件
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
		getGoodsList
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
				swiperAuto: false
			};
		},
		watch: {
			areaId() {
				this.goodsList = [];
				this.getHomeGoodsList();
			},
			token() {
				this.getHomeList();
			},

		},
		onLoad() {
			uni.getSystemInfo({
				success: e => {
					console.log('???????/')
					console.log(e)
				}
			})
			// uni.hideShareMenu();
			this.getHomeList();
			this.reloadData();
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// this.backTop = menuButtonInfo.top + 'px';
			// this.backHeight = menuButtonInfo.height + 'px';
			console.log("**********", this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		onShow() {
			uni.$once("selectedHouse", (item) => {
				this.citydata = item.cityName + item.areaName + item.housingEstate;
				this.areaId = item.areaId;
				uni.setStorageSync("currentHouse", JSON.stringify(item));
			});
			this.token = getApp().globalData.token;
			this.swiperAuto = true;
		},
		onHide() {
			this.swiperAuto = false
		},

		onReachBottom() {
			this.page++;
			this.getHomeGoodsList();
		},
		methods: {
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
			toSelfFitment() {
				let url = this.ENV.VUE_APP_BASE_H5 + '/app-pages/self-study-decorated/index.html';
				this.toWebview(url)
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: "/sub-classify/pages/goods-detail/goods-detail?goodId=" + id
				})
			},
			foramtPrice(item) {
				let price = String(item.product.skuPrice);
				return price.slice(0, price.length - 2) || "0";
			},
			formatCent(item) {
				let price = String(item.product.skuPrice);
				return price.slice(price.length - 2, price.length);
			},
			onLiveClick(item) {
				if (item.mediaType == 1) {
					//直播
					uni.navigateTo({
						url:`../../../sub-home/pages/lives-room/lives-room?livePreview=${item.roomLiveMediaVO.livePreview}&roomId=${item.roomLiveMediaVO.roomId}`
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
						getApp().globalData.naviData = null;
						if (item.urlParams) {
							getApp().globalData.naviData = JSON.parse(item.urlParams);
						}
						uni.switchTab({
							url: item.url
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
						let defaultHouse = {
							name: "北京市朝阳区",
							provinceId: 1,
							cityId: 36,
							areaId: 41,
						};
						that.areaId = 41;
						uni.setStorageSync("currentHouse", JSON.stringify(defaultHouse));
						that.citydata = defaultHouse.name;
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
									let addressComponent = re.data.result.addressComponent;
									vm.getAreaId(addressComponent.adcode);
								} else {
									console.log("获取信息失败，请重试！");
								}
							},
						});
					},
					fail() {
						let defaultHouse = {
							name: "北京市朝阳区",
							provinceId: 1,
							cityId: 36,
							areaId: 41,
						};
						vm.areaId = 41;
						uni.setStorageSync("currentHouse", JSON.stringify(defaultHouse));
						vm.citydata = defaultHouse.name;
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
			reloadData() {
				this.getBannerList();
				//直播列表
				this.getQueryLiveList();
				//金刚区列表
				navList().then((e) => {
					this.zoneList = e;
				});
				//首页推荐商品
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
				if (uni.getStorageSync("userId")) {
					let houseList = await queryEstates();
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
						uni.setStorageSync("currentHouse", JSON.stringify(house));
						this.areaId = house.areaId;
						this.citydata = house.cityName + house.areaName;
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

<style lang="scss" scoped>
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
		margin-top: 24rpx;
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
					font-weight: 600;
					color: #2b2f33;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; //这个代表你要在几行显示省略号
					-webkit-box-orient: vertical;
				}

				.tip {
					display: inline-block;
					height: 30rpx;
					line-height: 30rpx;
					margin-right: 10rpx;
					width: 60rpx;
					border-radius: 4rpx;
					border: 1rpx solid #00bfb6;
					text-align: center;
					font-weight: 500;
					color: #00bfb6;
					font-size: 20rpx;
				}

				.tip:before,
				.tip:after {
					display: inline-block;
					vertical-align: middle;
					content: "";
					height: 100%;
				}
			}
		}
	}

	.player-scroll {
		width: 100%;
		display: flex;
		overflow: auto;

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
				bottom: 24rpx;
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
				left: 12rpx;
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

	.address {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.example-content {
		padding: 0 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 16rpx;

		.item {
			width: 296rpx;
			height: 150rpx;
			background: #f5fcfc;
			border-radius: 16rpx;
			background: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/experience.png");
			-moz-background-size: 100% 100%;
			background-size: 100% 100%;
			padding: 0 24rpx;

			.title {
				font-weight: 400;
				color: #333333;
				line-height: 28rpx;
				font-size: 20rpx;

				padding-top: 16rpx;
			}

			.sub-title {
				font-weight: 600;
				color: #333333;
				line-height: 40rpx;
				padding-top: 8rpx;
				font-size: 28rpx;
			}

			.tips {
				font-size: 24rpx;
				font-weight: 400;
				color: #666666;
				line-height: 34rpx;
			}
		}
	}

	.experience {
		margin: 0 24rpx;
		height: 198rpx;
		border-radius: 16rpx;
		background: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/experience.png");
		-moz-background-size: 100% 100%;
		background-size: 100% 100%;
		padding: 0 24rpx;

		.title {
			padding-top: 24rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			line-height: 44rpx;
		}

		.sub-title {
			padding-top: 4rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #666666;
			line-height: 44rpx;
		}

		.btn {
			margin-top: 20rpx;
			width: 128rpx;
			height: 48rpx;
			background: #35c4c4;
			border-radius: 8rpx;
			font-size: 24rpx;
			font-weight: 600;
			color: #ffffff;
			line-height: 48rpx;
			text-align: center;
		}
	}

	.function-zone {
		margin: 24rpx;
		border: 1px solid #e7e8e8;
		width: 704rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;

		border-radius: 16rpx;

		.border-top {
			// border-top: 1px solid #e7e8e8;
		}

		.border-top-left {
			// border-top-left-radius: 16rpx;
			// border-left: 1px solid #e7e8e8;
		}

		.border-top-right {
			// border-top-right-radius: 16rpx;
		}

		.item {
			height: 126rpx;
			width: 176rpx;
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
		padding: 0 24rpx;

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
