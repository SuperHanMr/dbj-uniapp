<!--
 * @Description: 文件内容描述
 * @Author: HanYongHui
 * @Date: 2022-05-18 10:41:34
 * @LastEditTime: 2022-06-01 11:50:06
 * @LastEditors: HanYongHui
-->
<template>
  <view>
    <web-view
      :src="`${baseUrl}/app-pages/product-detail/service-product.html?spuId=${spuId}&houseId=${
        houseId || currentHouseId
      }&from=${from}&productId=${productId}&time=${time}&source=small&sourceIMId=${sourceIMId}&token=${token}`"
    >
    </web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      from: "",
      baseUrl: "",
      sourceIMId: getApp().globalData.userInfo.id,
      spuId: 0,
      productId: 0,
      houseId: 0,
      token: "",
    };
  },

  computed: {
    currentHouseId() {
      return this.$store.getters.getHouseId;
    },
  },
  onLoad(e) {
    this.baseUrl = this.ENV.VUE_APP_BASE_H5;
    // this.baseUrl = "https://localhost/";
    this.token = getApp().globalData.token;
    this.spuId = e.spuId;
    this.houseId = e.houseId;
    this.from = e.from;
    this.productId = e.productId;
    this.time = e.time;
  },

  onShow() {
    if (!this.token) {
      this.token = getApp().globalData.token;
    }
  },
};
</script>

<style>
</style>


