<template>
  <view>
    <!-- <web-view :src="'https://local.meiwu365.com/app-pages/goods-detail/index.html?goodsId='
        + goodId + '&&houseId=' + houseId" @message='h5Message'></web-view> -->
        <web-view :src="'https://local.meiwu365.com/app-pages/goods-detail/index.html#goodsId='
           + goodId + '&&houseId=' + houseId" @message='h5Message'></web-view>
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
      this.goodId = uni.getStorageSync('goodId')
      uni.removeStorageSync('fromH5')
    },
    methods: {
      h5Message(ms) {
        console.log(ms)
        uni.setStorageSync(
            'fromH5',
            ms.detail.data[0].action
        );
      }
    }
  }
</script>

<style>

</style>
