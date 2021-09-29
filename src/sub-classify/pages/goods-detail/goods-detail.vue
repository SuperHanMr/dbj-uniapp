<template>
	<view>
		<web-view :src="baseUrl + '/app-pages/goods-detail/index.html#wx-goodsId='+ goodId + '&wx-houseId='
        + houseId + '&wx-defaultHouseId=' + goodDefaultAddress.id  + '&wx-defaultProvinceId=' + goodDefaultAddress.provinceId
        + '&wx-defaultCityId=' + goodDefaultAddress.cityId + '&wx-defaultAreaId=' + goodDefaultAddress.areaId
        + '&wx-defaultLocationName=' + goodDefaultAddress.locationName + '&wx-defaultHousingEstate=' + goodDefaultAddress.housingEstate
        + '&wx-defaultHousingEstateId=' + goodDefaultAddress.housingEstateId + '&wx-isDisabled=' + isDisabled
        + '&wx-token=' + token + '&wx-userId=' + userId + '&wx-deviceId=' + deviceId">
		</web-view>
		<!-- <web-view src="https://design-h5-stage.meiwu365.com/app-pages/goods-detail/index.html#wx-goodsId=1461&wx-houseId=&wx-defaultHouseId=undefined&wx-defaultProvinceId=1&wx-defaultCityId=36&wx-defaultAreaId=43&wx-defaultLocationName=北京市石景山区&wx-defaultHousingEstate=undefined&wx-defaultHousingEstateId=undefined&wx-isDisabled=false&wx-token=Pc0jlCMLaageAbuvl97z3OjRNz%2BFxXrdHjTV3svtxH8ZYtzDTO87dW6k2vvjBtUQq8tv3tkWQUJD2xK2vwKQ2vVzmEYm3aGnHQlS8ZPls3rDOWePuceCihoRrGRY4lGff028ce8c92a823374fcb94e2d48fb60f&wx-userId=6539&wx-deviceId=16322973880322480972&wx-refreshHash=0.7853979126532613"></web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: "",
				deviceId: 0,
				userId: 0,
				goodId: "",
				defaultHouseId: "",
				houseId: "",
				goodDefaultAddress: "",
				isDisabled: false,
				token: "",
			};
		},
		onLoad(e) {
			if (e.isDisabled === "0") {
				this.isDisabled = false;
			}
			if (e.goodId) {
				this.goodId = e.goodId;
			} else if (uni.getStorageSync("goodId")) {
				// 商城列表和装修模块的商品id
				this.goodId = uni.getStorageSync("goodId");
			}
		},
		onShow() {
			this.token = getApp().globalData.token;
			this.baseUrl = this.ENV.VUE_APP_BASE_H5;
			// this.baseUrl = "https://local.meiwu365.com"
			// this.baseUrl = "https://10.10.11.67"
			this.userId = uni.getStorageSync("userId");
			this.defaultHouseInfo = getApp().globalData.currentHouse;

			this.goodDefaultAddress = {
				id: this.defaultHouseInfo.id,
				provinceId: this.defaultHouseInfo.provinceId,
				cityId: this.defaultHouseInfo.cityId,
				areaId: this.defaultHouseInfo.areaId,
				locationName: this.defaultHouseInfo.name,
				housingEstate: this.defaultHouseInfo.housingEstate,
				housingEstateId: this.defaultHouseInfo.housingEstateId,
			};
			uni.getSystemInfo({
				success: (res) => {
					this.deviceId = res.deviceId;
				},
			});
			// 获取房屋信息
			if (uni.getStorageSync("houseListChooseId")) {
				this.houseId = uni.getStorageSync("houseListChooseId");
			} else {
				if (this.defaultHouseInfo.id) {
					this.houseId = this.defaultHouseInfo.id;
				} else {
					this.defaultHouseInfo = getApp().globalData.currentHouse;
				}
			}
		},
		methods: {},
	};
</script>

<style>
</style>
