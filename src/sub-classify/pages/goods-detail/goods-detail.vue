<template>
  <view>
       <web-view :src="'https://local.meiwu365.com/app-pages/goods-detail/index.html#wx-goodsId='+ goodId+ '&&wx-houseId='
        + houseId + '&&wx-houseName=' + houseName + '&&wx-token=' + token">
       </web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodId: '',
        defaultHouseId: '',
        defaultHouseNAme: '',
        houseId: '',
        houseName: '666',
        token: getApp().globalData.token
      }
    },
    onShow() { 
      if(uni.getStorageSync('houseListChooseId')) {
        this.houseId = uni.getStorageSync('houseListChooseId')
      }
      this.goodId = uni.getStorageSync('goodId')
    },
    methods: {
    }
  }
</script>

<style>

</style>
