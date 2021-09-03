<template>
  <view>
    <button type="default" @click="pay">支付</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    onLoad(e){},
    methods: {
      pay() {
        uni.navigateTo({
          url: ''
        })
      }
    }
  }
</script>

<style>

</style>
