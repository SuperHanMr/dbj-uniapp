<template>
  <view>
     <web-view :src="baseUrl + '/app-pages/goods-detail/index.html#wx-goodsId='+ goodId + '&wx-houseId='
        + houseId + '&wx-defaultHouseId=' + defaultHouseInfo.id  + '&wx-defaultProvinceId=' + defaultHouseInfo.provinceId
        + '&wx-defaultCityId=' + defaultHouseInfo.cityId + '&wx-defaultAreaId=' + defaultHouseInfo.areaId 
        + '&wx-defaultLocationName=' + defaultHouseInfo.locationName + '&wx-defaultHousingEstate=' + defaultHouseInfo.housingEstate
        + '&wx-defaultHousingEstateId=' + defaultHouseInfo.housingEstateId + '&wx-isDisabled=' + isDisabled
        + '&wx-token=' + token + '&wx-userId=' + userId + '&wx-deviceId=' + deviceId">
       </web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        deviceId: 0,
        userId: 0,
        goodId: '',
        defaultHouseId: '',
        houseId: '',
        isDisabled: false,
        token: '',
        defaultHouseInfo: ''
      }
    },
    onLoad(e) {
      if(e.isDisabled === '0') {
        this.isDisabled = false
      }
      if(e.goodId){
        this.goodId = e.goodId
      }else if(uni.getStorageSync('goodId')) { // 商城列表和装修模块的商品id
        this.goodId = uni.getStorageSync('goodId')
      }
    },
    onShow() {
      this.token = getApp().globalData.token
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      this.userId = uni.getStorageSync('userId')
      this.defaultHouseInfo = getApp().globalData.currentHouse
        uni.getSystemInfo({	
          success:res => {
            this.deviceId = res.deviceId
          }
        })
        // 获取房屋信息
        console.log(uni.getStorageSync('houseListChooseId'), "uni.getStorageSync('houseListChooseId')")
        if(uni.getStorageSync('houseListChooseId')) {
          this.houseId = uni.getStorageSync('houseListChooseId')
        }else {
          this.houseId = this.defaultHouseInfo.id
        }
    }
  }
</script>

<style>

</style>
