<template>
  <view>
       <web-view :src="baseUrl + '/app-pages/goods-detail/index.html#wx-goodsId='+ goodId + '&&wx-houseId='
        + houseId + '&&wx-defaultHouseId=' + goodDefaultAddress.id  + '&&wx-defaultProvinceId=' + goodDefaultAddress.provinceId
        + '&&wx-defaultCityId=' + goodDefaultAddress.cityId + '&&wx-defaultAreaId=' + goodDefaultAddress.areaId 
        + '&&wx-defaultLocationName=' + goodDefaultAddress.locationName + '&&wx-defaultHousingEstate=' + goodDefaultAddress.housingEstate
        + '&&wx-defaultHousingEstateId=' + goodDefaultAddress.housingEstateId
        + '&&wx-token=' + token + '&&wx-userId' + userId + '&&wx-deviceId' + deviceId">
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
        goodDefaultAddress: '',
        token: getApp().globalData.token
      }
    },
    onShow() {
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      // this.baseUrl = "https://local.meiwu365.com"
      this.goodId = uni.getStorageSync('goodId')
      console.log(this.goodId, 888)
      this.userId = uni.getStorageSync('userId')
      this.defaultHouseInfo = uni.getStorageSync('currentHouse')
      
      this.goodDefaultAddress = {
        id:  JSON.parse(this.defaultHouseInfo).id,
        provinceId: JSON.parse(this.defaultHouseInfo).provinceId,
        cityId: JSON.parse(this.defaultHouseInfo).cityId,
        areaId: JSON.parse(this.defaultHouseInfo).areaId,
        locationName: JSON.parse(this.defaultHouseInfo).locationName,
        housingEstate: JSON.parse(this.defaultHouseInfo).housingEstate,
        housingEstateId: JSON.parse(this.defaultHouseInfo).housingEstateId
      }
      console.log(this.goodDefaultAddress, 999)
        uni.getSystemInfo({
          success:res => {
            this.deviceId = res.deviceId
          }
        })
        // 获取房屋信息
        if(uni.getStorageSync('houseListChooseId')) {
          this.houseId = uni.getStorageSync('houseListChooseId')
        }else {
          if(JSON.parse(this.defaultHouseInfo).id) {
            this.houseId = JSON.parse(this.defaultHouseInfo).id
          }else {
            this.defaultHouseInfo =  uni.getStorageSync('currentHouse')
          }
        }
    },
    methods: {
    }
  }
</script>

<style>

</style>
