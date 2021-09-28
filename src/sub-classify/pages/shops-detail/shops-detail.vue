<template>
  <view>
     <web-view :src="baseUrl + '/app-pages/shops-detail/index.html#wx-storeId=' + storeId + '&wx-token=' + token"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        token: getApp().globalData.token,
        storeId: 0
      }
    },
    onLoad(e) {
      this.storeId = e.storeId
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
