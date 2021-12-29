<template>
  <view>
    <web-view
      :src="baseUrl + '/app-pages/goods-detail/index.html?token=' + searchToken + '#wx-goodsId='+ goodId + '&wx-houseId='
        + houseId + '&wx-defaultHouseId=' + defaultHouseInfo.id  + '&wx-defaultProvinceId=' + defaultHouseInfo.provinceId
        + '&wx-defaultCityId=' + defaultHouseInfo.cityId + '&wx-defaultAreaId=' + defaultHouseInfo.areaId
        + '&wx-defaultLocationName=' + defaultHouseInfo.name  + '&wx-token=' + hashToken + '&wx-deviceId=' + deviceId + '&from=' + from + '&shareAreaId=' + shareAreaId + '&shareAreaName=' + shareAreaName">
    </web-view>
  </view>
</template>

<script>
  import urlParse from "url-parse";
  export default {
    data() {
      return {
        baseUrl: '',
        deviceId: 0,
        goodId: '',
        defaultHouseId: '',
        houseId: '',
        searchToken: '',
        hashToken: '',
        defaultHouseInfo: '',
        from: '',
        shareAreaId: '',
        shareAreaName: '',
        pageOpts: {}
      }
    },
    onLoad(e) {
      this.pageOpts = {...e};
      uni.showShareMenu(); // 显示分享按钮
      this.shareAreaId = e.shareAreaId
      this.shareAreaName = e.shareAreaName
      if (e.q) {
        //如果是通过二维码分享进来的兼容
        const qrCodeUrl = decodeURIComponent(e.q);
        const urlResult = urlParse(qrCodeUrl, true);
        const query = urlResult.query;
        if (query.shareAreaId) {
          this.shareAreaId = query.shareAreaId;
        }
        if (query.shareAreaName) {
          this.shareAreaName = query.shareAreaName;
        }
      }
      this.from = e.from
      if (e.goodId) {
        this.goodId = e.goodId
      } else if (uni.getStorageSync('goodId')) { // 商城列表和装修模块的商品id
        this.goodId = uni.getStorageSync('goodId')
      }
      this.houseId = e.houseId
      console.log(this.houseId, "this.houseId")
    },
    onShareAppMessage(res) {
      let params = [];
      Object.keys(this.pageOpts).forEach(key => {
        params.push(`${key}=${this.pageOpts[key]}`)
      });
      let path = `/sub-classify/pages/goods-detail/goods-detail`;
      if (params.length) {
        path += '?' + params.join('&')
      }
      return {
        path: path
      }
    },
    onShow() {
      if (!this.searchToken) {
        this.searchToken = getApp().globalData.token
      } else {
        this.hashToken = getApp().globalData.token
      }
      console.log(getApp().globalData.token, "getApp().globalData.token")
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      this.defaultHouseInfo = getApp().globalData.currentHouse
      uni.getSystemInfo({
        success: res => {
          this.deviceId = res.deviceId
        }
      })
      // 获取房屋信息
      if (uni.getStorageSync('houseListChooseId')) {
        this.houseId = uni.getStorageSync('houseListChooseId')
        uni.removeStorageSync("houseListChooseId")
      }
    }
  }
</script>

<style>

</style>
