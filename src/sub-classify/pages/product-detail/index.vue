<template>
	<view>
		<web-view :src="`${baseUrl}${h5Url}?id=${productId}&spuId=${spuId}&source=small#params=${paramsJson}`">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: '',
				h5Url: '',
				// 商品Id
				productId: '',
				spuId:'',
				params: {
					// 用户token
					token: '',
					// 用户Id
					userId: '',
					// 房屋Id
					houseId: '',
					// 默认房屋Id
					defaultHouseId: '',
					// 用户地址
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
					// 分享地区Id
					shareAreaId: '',
					// 分享人姓名
					shareAreaName: '',
					// 分享类型
					originType: '',
					// 国美参数
					skuTemplateId: '',
					gomeDivisionCode: '',
				},
				paramsJson: '',
				pageOpts:{},
			}
		},
		onLoad(e) {
			this.pageOpts = {...e}
			uni.showShareMenu(); // 显示分享按钮
			this.baseUrl = this.ENV.VUE_APP_BASE_H5
			// this.baseUrl = 'https://localhost'
			switch (e.productType) {
				case 'product':
					this.h5Url = "/app-pages/product-detail/product-detail.html"
					break;
				case 'promotion':
					this.h5Url = "/app-pages/product-detail/promotion-detail.html"
					break;
				default:
					this.h5Url = "/app-pages/product-detail/product-detail.html"
					break;
			}

			this.productId = e.productId
			this.spuId = e.spuId
			
			this.params.shareAreaId = e.shareAreaId
			this.params.shareAreaName = e.shareAreaName
			this.params.originType = e.originType

			this.params.skuTemplateId = e.skuTemplateId
			this.params.gomeDivisionCode = e.gomeDivisionCode

		},

		onShow() {
			if (getApp().globalData.token) {
				this.params.token = getApp().globalData.token
				this.params.userId = getApp().globalData.userInfo.id
			}
			if (getApp().globalData.currentHouse) {
				this.params.defaultHouseId = getApp().globalData.currentHouse.id
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
			console.log('params:', this.params)
		},
		
		onShareAppMessage(res) {
		  let params = [];
		  Object.keys(this.pageOpts).forEach(key => {
		    params.push(`${key}=${this.pageOpts[key]}`)
		  });
		  if (getApp().globalData.isSaler) {
		    params.push(`shareId=${getApp().globalData.shareId}`)
		  }
		  let path = `/sub-classify/pages/product-detail/index`;
		  if (params.length) {
		    path += '?' + params.join('&')
		  }
		  return {
		    path: path
		  }
		},
		methods: {},
	}
</script>

<style>
</style>
