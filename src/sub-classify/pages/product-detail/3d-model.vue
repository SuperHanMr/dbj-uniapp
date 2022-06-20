<!--
 * @Description: 3d模型展示页面
 * @Author: HanYongHui
 * @Date: 2022-06-09 15:08:30
 * @LastEditTime: 2022-06-14 10:59:47
 * @LastEditors: HanYongHui
-->
<!--  -->
<template>
  <web-view :src="`${baseUrl}/app-pages/3d-model/index.html?id=${skuId}`" />
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "",
      skuId: "",
    };
  },

  onLoad(options) {
    this.baseUrl = this.ENV.VUE_APP_BASE_H5;
    // this.baseUrl = "https://localhost";
    this.skuId = options.skuId;
  },
};
</script>
<style lang='scss' scoped>
</style>