<template>
  <view>
     <web-view :src="'https://local.meiwu365.com/app-pages/goods-detail/index.html?goodsId='+ id"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: ''
      }
    },
    onLoad(e){
      this.id = e.goodId
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
