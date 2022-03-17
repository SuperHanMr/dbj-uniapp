<template>
	<view>
		<web-view
			:src="`${baseUrl}/app-pages/product-detail/product-detail.html?id=${productId}&source=small#params=${paramsJson}`">
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
				productId: '',
				params: {
					token: '',
					userId: '',
					// 房屋Id
					houseId: '',
					defaultHouseId:'',
					estate: {
						// 省Id
						provinceId: 1,
						// 城市Id
						cityId: 36,
						// 区域Id
						areaId: 41,
						// 用户位置
						name: '北京朝阳',
					},
					// 分享Id
					shareAreaId: '',
					// 分享人姓名
					shareAreaName: '',
					// 分享类型
					shareOriginType: '',
					// 国美参数
					skuTemplateId: '',
					gomeDivisionCode: '',
					upDateTime:'',
					
				},
				paramsJson: '',
			}
		},
		onLoad(e) {
			uni.showShareMenu(); // 显示分享按钮
			// this.baseUrl = this.ENV.VUE_APP_BASE_H5
			this.baseUrl = 'https://localhost'
			this.productId = e.goodId

			this.params.token = getApp().globalData.token
			this.params.bundleId = e.bundleId

			this.params.shareAreaId = e.shareAreaId
			this.params.shareAreaName = e.shareAreaName
			this.params.shareOriginType = e.originType

			this.params.skuTemplateId = e.skuTemplateId 
			this.params.gomeDivisionCode = e.gomeDivisionCode
		
		},

		onShow() {
			if (getApp().globalData.token) {
				this.params.token = getApp().globalData.token
				this.params.userId = getApp().globalData.userInfo.id
			}
			if (getApp().globalData.currentHouse) {
				this.params.defaultHouseId  = getApp().globalData.currentHouse.id
				this.params.estate.provinceId = getApp().globalData.currentHouse.provinceId
				this.params.estate.cityId = getApp().globalData.currentHouse.cityId
				this.params.estate.areaId = getApp().globalData.currentHouse.areaId
				this.params.estate.name = getApp().globalData.currentHouse.name
			}
			
			if (uni.getStorageSync('houseListChooseId')) {
			  this.params.houseId = uni.getStorageSync('houseListChooseId')
			  uni.removeStorageSync("houseListChooseId")
			}
		
			this.paramsJson = JSON.stringify(this.params)
			console.log('params:',this.params)
			console.log('userInfo:',getApp().globalData);
		},

		methods: {},
	}
</script>

<style>
</style>
