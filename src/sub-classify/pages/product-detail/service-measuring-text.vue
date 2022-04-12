<template>
  <view>
    <web-view :src="`${baseUrl}/app-pages/product-detail/service-measuring-text.html?id=${productId}&type=${type}&token=${token}`"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: '',
        type: 'site', // 现场量房， remove远程量房
      }
    },
    onLoad(e) {
      this.baseUrl = this.ENV.VUE_APP_BASE_H5
      this.type = e.type
    },
    methods: {
    }
  }
</script>

<style>

</style>
