<template>
  <web-view :src="url"></web-view>
</template>

<script>
// https://local.meiwu365.com/app-pages/actuarial/index.html 精算单
// https://local.meiwu365.com/app-pages/actuarial/actuarial-details/index.html 精算单详情
// https://local.meiwu365.com/app-pages/actuarial/actuarial-shopList/index.html 更换商品列表
  export default {
    data() {
      return {
        url: "",
        title: ""
      }
    },
    onLoad(option) {
      this.url = option.url
      this.title = option.title
      
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.title
      })
    }
  }
</script>

<style scoped>

</style>