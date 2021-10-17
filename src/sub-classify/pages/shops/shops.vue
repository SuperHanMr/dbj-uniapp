<template>
  <view>
     <web-view :src="baseUrl + '/app-pages/shops/index.html?token=' + searchToken + '#wx-storeId='
     + storeId + '&wx-areaId=' + areaId + '&wx-houseId=' + houseId + '&wx-token=' + hashToken">  
     </web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        hashToken: '',
        searchToken: '',
        storeId: 0,
        areaId: 0,
        houseId: 0
      }
    },
    onLoad(e){
      console.log(e, "teste")
      this.storeId = e.storeId,
      this.areaId = e.areaId
      this.houseId = e.houseId
    },
    onShow() {
      if(!this.searchToken) {
        this.searchToken = getApp().globalData.token
      }else {
        this.hashToken = getApp().globalData.token
      }
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
    },
    methods: {
    }
  }
</script>

<style>

</style>
