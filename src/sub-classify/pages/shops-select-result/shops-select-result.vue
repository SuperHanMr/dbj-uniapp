<template>
  <view>
    <web-view :src="baseUrl + '/app-pages/shops/shops-select-result.html?token=' + searchToken + '#wx-storeId='
     + storeId + '&wx-houseId=' + houseId + '&wx-categoryId=' + categoryId + '&wx-goodName=' + goodName + '&wx-token=' + hashToken">
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
        houseId: 0,
        categoryId: 0,
        goodName: ''
      }
    },
    onLoad(e) {
      console.log(e, "eeeeeee")
      this.storeId = e.storeId
      this.houseId = e.houseId
      this.categoryId = e.categoryId
      this.goodName = e.goodName
    },
    onShow() {
      if (!this.searchToken) {
        this.searchToken = getApp().globalData.token
      } else {
        this.hashToken = getApp().globalData.token
      }
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
    },
    methods: {}
  }
</script>

<style>

</style>
