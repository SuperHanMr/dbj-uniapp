<template>
	<view class="container">
		<web-view 
		:src="baseUrl + 'app-pages/brand-shop/index.html?' + 'storeId='+ storeId + '&houseId='+ houseId"
		></web-view>
		
	</view>
</template>

<script>
	import { queryEstates } from "../../../api/decorate.js"
	export default{
		data() {
			return {
				baseUrl: '',
				storeId:'',//品牌馆ID
				houseId:'',//地址ID
			}
		},
		onLoad(e) {
			console.log("dddddd~~~")
			// this.storeId = e.storeId
			this.storeId = 1
			// uni.showShareMenu(); // 显示分享按钮
		},
		onShow() {
			// this.baseUrl = this.ENV.VUE_APP_BASE_H5
			this.baseUrl = "https://10.20.15.199:443/"
			// 获取房屋信息
			if (uni.getStorageSync('houseListChooseId')) {
			  this.houseId = uni.getStorageSync('houseListChooseId')
			  uni.removeStorageSync("houseListChooseId")
			}
			if (this.hashToken && !this.houseId) {
			  this.getHouseList()
			}
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
