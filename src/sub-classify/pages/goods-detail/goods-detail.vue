<template>
  <view>
       <web-view :src="baseUrl + '/app-pages/goods-detail/index.html#wx-goodsId='+ 38050 + '&&wx-houseId='
        + houseId + '&&wx-defaultHouseInfo=' + goodDefaultAddress + '&&wx-token=' + token + '&&wx-userId' + userId + '&&wx-deviceId' + deviceId">
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
      this.goodId = uni.getStorageSync('goodId')
      this.userId = uni.getStorageSync('userId')
      this.defaultHouseInfo = uni.getStorageSync('currentHouse')
      this.goodDefaultAddress = JSON.stringify({
        id:  uni.getStorageSync('currentHouse').id,
        provinceId: uni.getStorageSync('currentHouse').provinceId,
        cityId: uni.getStorageSync('currentHouse').cityId,
        areaId: uni.getStorageSync('currentHouse').areaId,
        locationName: uni.getStorageSync('currentHouse').locationName,
        housingEstate: uni.getStorageSync('currentHouse').housingEstate,
        housingEstateId: uni.getStorageSync('currentHouse').housingEstateId
      })
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
