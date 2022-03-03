<template>
	<view>
		<web-view
			:src="baseUrl + '/app-pages/goods-detail/index.html?token=' + '#wx-goodsId='+ goodId + '&wx-houseId='
        + houseId + '&wx-defaultHouseId=' + defaultHouseInfo.id  + '&wx-defaultProvinceId=' + defaultHouseInfo.provinceId
        + '&wx-defaultCityId=' + defaultHouseInfo.cityId + '&wx-defaultAreaId=' + defaultHouseInfo.areaId 
        + '&wx-defaultLocationName=' + defaultHouseInfo.name  + '&wx-token=' + hashToken + '&wx-deviceId=' + deviceId + '&from=' + from
         + '&shareAreaId=' + shareAreaId + '&shareAreaName=' + shareAreaName+ '&shareOriginType=' + shareOriginType + '&wx-userId=' + userId
        + '&skuTemplateId=' + skuTemplateId + '&gomeDivisionCode=' + gomeDivisionCode + '&fromPackage='  + fromPackage + '&wx-bundleId='  + bundleId + '&wx-spuId=' + spuId + '&changTime=' + changTime">
		</web-view>
	</view>
</template>

<script>
	import {
		queryEstates
	} from "../../../api/decorate.js";
	export default {
		data() {
			return {
				baseUrl: '',
				deviceId: 0,
				goodId: '',
				defaultHouseId: '',
				houseId: '',
				searchToken: '',
				hashToken: '',
				defaultHouseInfo: '',
				from: '',
				shareAreaId: '',
				shareAreaName: '',
				pageOpts: {},
				shareOriginType: '',
				userId: 0,
				gomeDivisionCode: 0,
				skuTemplateId: 0,
				fromPackage: 2,
				bundleId: 0,
				spuId: 0,
				changTime: 0,
			}
		},
		onLoad(e) {
			this.pageOpts = {
				...e
			};
			uni.showShareMenu(); // 显示分享按钮
			this.shareAreaId = e.shareAreaId
			this.shareAreaName = e.shareAreaName
			this.shareOriginType = e.originType
			this.from = e.from
			this.userId = e.userId
			this.bundleId = e.bundleId
			this.spuId = e.spuId
			if (e.goodId) {
				this.goodId = e.goodId
			} else if (uni.getStorageSync('goodId')) { // 商城列表和装修模块的商品id
				this.goodId = uni.getStorageSync('goodId')
			}
			this.houseId = e.houseId
			this.skuTemplateId = e.skuTemplateId
			this.gomeDivisionCode = e.gomeDivisionCode
			this.fromPackage = e.fromPackage
		},
		onShareAppMessage(res) {
			let params = [];
			Object.keys(this.pageOpts).forEach(key => {
				params.push(`${key}=${this.pageOpts[key]}`)
			});
			if (getApp().globalData.isSaler) {
				params.push(`shareId=${getApp().globalData.shareId}`)
			}
			let path = `/sub-classify/pages/goods-detail/goods-detail`;
			if (params.length) {
				path += '?' + params.join('&')
			}
			return {
				path: path
			}
		},
		onShow() {
			// if (!this.searchToken) {
			// 	this.searchToken = getApp().globalData.token
			// } else {
			// 	this.hashToken = getApp().globalData.token
			// }
			this.hashToken = getApp().globalData.token
			console.log(getApp().globalData.token, "getApp().globalData.token")
			this.baseUrl = this.ENV.VUE_APP_BASE_H5
			this.defaultHouseInfo = getApp().globalData.currentHouse
			uni.getSystemInfo({
				success: res => {
					this.deviceId = res.deviceId
				}
			})
			// 获取房屋信息
			if (uni.getStorageSync('houseListChooseId')) {
				this.houseId = uni.getStorageSync('houseListChooseId')
				uni.removeStorageSync("houseListChooseId")
			}
			if (this.hashToken && !this.houseId) {
				this.getHouseList()
			}
			this.changTime = new Date().getTime()
		},
		methods: {
			async getHouseList() {
				let houseList = await queryEstates({
					isNeedRelative: false
				}, false, true);
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
					this.houseId = house.id
				}
			},
		},
	}
</script>

<style>

</style>
