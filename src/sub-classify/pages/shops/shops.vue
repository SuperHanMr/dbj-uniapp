<template>
  <view>
     <web-view :src="baseUrl + '/app-pages/shops/index.html#wx-storeId='
     + storeId + '&wx-areaId=' + areaId + '&wx-token=' + token">  
     </web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        token: getApp().globalData.token,
        storeId: 0,
        areaId: 0
      }
    },
    onLoad(e){
      console.log(e, "teste")
      this.storeId = e.storeId,
      this.areaId = e.areaId
    },
    onShow() {
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      // this.baseUrl = "https://local.meiwu365.com" 
    },
    methods: {
    }
  }
</script>

<style>

</style>
