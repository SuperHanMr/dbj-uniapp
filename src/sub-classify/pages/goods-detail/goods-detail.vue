<template>
  <view>
     <web-view :src='webViewSrc'></web-view>
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
      setTimeout(()=> {
        this.webViewSrc = 'https://local.meiwu365.com/app-pages/goods-detail/index.html?goodsId='
        + this.goodId + '&&houseId=' + this.houseId
      })
      uni.removeStorageSync('houseListChooseId')
    },
    onLoad(e) {
      this.goodId = e.goodId
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
