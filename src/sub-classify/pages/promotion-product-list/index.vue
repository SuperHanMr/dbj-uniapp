<template>
	<view>
		<web-view :src="baseUrl + '/app-pages/product-promotion-list/index.html'">
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
				houseId: '',
				searchToken: '',
				hashToken: '',
			}
		},
		onLoad(e) {
			// this.baseUrl = this.ENV.VUE_APP_BASE_H5//'https://localhost'
			this.baseUrl = 'https://localhost'
			this.searchToken = getApp().globalData.token
			this.houseId = getApp().globalData.currentHouse.id
		},

		onShow() {
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
				this.hashToken = getApp().globalData.token
			},
		},
	}
</script>

<style>

</style>
