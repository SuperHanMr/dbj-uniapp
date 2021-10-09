<template>
  <view>
     <web-view :src="baseUrl + '/app-pages/goods-detail/index.html?token=' + searchToken + '#wx-goodsId='+ goodId + '&wx-houseId='
        + houseId + '&wx-defaultHouseId=' + defaultHouseInfo.id  + '&wx-defaultProvinceId=' + defaultHouseInfo.provinceId
        + '&wx-defaultCityId=' + defaultHouseInfo.cityId + '&wx-defaultAreaId=' + defaultHouseInfo.areaId 
        + '&wx-defaultLocationName=' + defaultHouseInfo.name  + '&wx-isDisabled=' + isDisabled
        + '&wx-token=' + hashToken + '&wx-deviceId=' + deviceId">
       </web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        deviceId: 0,
        goodId: '',
        defaultHouseId: '',
        houseId: '',
        isDisabled: false,
        searchToken: '',
        hashToken: '',
        defaultHouseInfo: ''
      }
    },
    onLoad(e) {
      if(e.isDisabled === '0') {// 购物车跳转
        this.isDisabled = false
      }
      if(e.goodId){
        this.goodId = e.goodId
      }else if(uni.getStorageSync('goodId')) { // 商城列表和装修模块的商品id
        this.goodId = uni.getStorageSync('goodId')
      }
    },
    onShow() {
      if(!this.searchToken) {
        this.searchToken = getApp().globalData.token
      }else {
        this.hashToken = getApp().globalData.token
      }
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      this.defaultHouseInfo = getApp().globalData.currentHouse
        uni.getSystemInfo({	
          success:res => {
            this.deviceId = res.deviceId
          }
        })
        // 获取房屋信息
        if(uni.getStorageSync('houseListChooseId')) {
          this.houseId = uni.getStorageSync('houseListChooseId')
          uni.removeStorageSync("houseListChooseId")
        }
    }
  }
</script>

<style>

</style>
