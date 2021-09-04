<template>
  <view>
     <web-view src='https://local.meiwu365.com/app-pages/beauty-report/index.html'></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodId: '',
        houseId: '',
        webViewSrc: ''
      }
    },
    onShow() {
      this.houseId = uni.getStorageSync('houseListChooseId')
      uni.removeStorageSync('houseListChooseId')
    },
    onLoad(e) {
      console.log(e.goodId)
      this.goodId = e.goodId
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
