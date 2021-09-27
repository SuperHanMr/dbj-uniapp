<template>
  <view>
     <web-view :src="baseUrl + '/app-pages/shops-detail/index.html'"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        token: getApp().globalData.token
      }
    },
    onShow() {
      // this.baseUrl = this.ENV.VUE_APP_BASE_H5
      this.baseUrl = "https://local.meiwu365.com" 
    },
    methods: {
    }
  }
</script>

<style>

</style>
