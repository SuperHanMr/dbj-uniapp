<template>
  <view class="my-decorate">
    
    <view @click="toCost">
      当前花销
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods:{
      toCost(){
        uni.navigateTo({
          url:'/sub-decorate/pages/current-cost/current-cost'
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
