<template>
	<view>
		<custom-navbar title="????AAAA" :opacity="scrollTop/100" :showBack="false">
			<slot-one>
				<view @click="toCity">
					{{citydata}}
				</view>

			</slot-one>
		</custom-navbar>

		<scroll-view class="content" scroll-y="true" @scroll="onScroll">
			asdasd
			<view style="margin-top: 300rpx;" class="" @click="toFriends">
				去亲友团
			</view>
			<view class="flex-row">
				<view class="item" v-for="(item,index) in liveList" @click="toLiveRoom(item)">
					{{item.title}}
				</view>
			</view>
			<view class="test">
				<button type="default" @click="toNextPage">去封装好的列表页</button>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import {
		getBanner,
		queryLive
	} from "../../../api/home.js";
	
	import {
		orderList
	} from "../../../api/order.js"
	import {
		queryEstates
	} from "../../../api/decorate.js"
	export default {
		data() {
			return {
				tophight: 0,
				imgUrl: "../../../static/app-plus/uni@2x.png",
				navBarHeight: 0,
				scrollTop: 0,
				liveList: [],
				citydata: '北京市',
				roomId:''
			};
		},
		onLoad() {
			this.getAuthorizeInfo();
		},
		onShow() {
			
			this.getBannerList();
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let res = currPage.data.city;
			if (res) {
				this.citydata = res.title;
				this.changeCity();
			}
			this.getHomeList();
		},
		methods: {
			toFriends(){
				uni.navigateTo({
					url:"../../decorate/friends/friends?id="+this.roomId
				})
			},
			changeCity() {
				console.log('切换城市');
			},
			toCity() {
				uni.navigateTo({
					url: "../select-city/select-city?title="+this.citydata
				})
			},
			getAuthorizeInfo() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.getLocationInfo();
					},
					fail() { // 拒绝授权
						that.openConfirm();
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			// 获取地理位置
			getLocationInfo() {
				let vm = this;
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						let that = vm;
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
							url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' +
								longitude + ',' + latitude +
								'&key=4d1476e82ce1ca125c7452c625e6d541&radius=1000&extensions=all',
							success(re) {
								console.log(re)
								if (re.statusCode === 200) {
									let addressComponent = re.data.regeocode.addressComponent
									that.citydata = addressComponent.city.length > 0 ? addressComponent
										.city :
										addressComponent.province;
										getApp().globalData.city=that.citydata;

								} else {
									console.log("获取信息失败，请重试！")
								}
							}
						});
					}
				});
			},
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},
			toLiveRoom(item) {
				console.log("../lives-room/lives-room?livePreview=" + item.livePreview);
				if (item && item.livePreview) {
					uni.navigateTo({
						url: "../lives-room/lives-room?livePreview=" + item.livePreview,
					});
				}
			},
			async getBannerList() {
				let list = await orderList();
				console.log(list);
				// this.liveList = list.lives;
				// console.log(this.liveList);
			},
			async getHomeList() {
				let list = await queryEstates();
				console.log(list);
				this.roomId=list[0].id;
				// this.liveList = list.lives;
				// console.log(this.liveList);
			},
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},
			toNextPage() {
				uni.navigateTo({
					url: "../../decorate/warehouse-list/warehouse-list",
				});
			},
		},
	};
</script>

<style lang="scss">
	.flex-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: yellow;
		overflow: auto;

		.item {
			flex-shrink: 0;
			width: 200rpx;
			height: 200rpx;
			text-align: center;
			background-color: red;
		}
	}

	.content {
		height: 100vh;
	}

	.banner {
		height: 2000rpx;
		background-color: yellow;
	}

	.navi-header-state {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: red;
	}

	.navi-header {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: blue;
		align-items: center;

		.select-city {
			width: 30rpx;
			height: 20rpx;
			background-color: green;
		}
	}

	.test {
		height: 2000rpx;
		width: 750px;
		background-color: red;
	}
</style>
