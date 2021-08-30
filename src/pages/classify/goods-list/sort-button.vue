<template>
  <view class="sort">
    <text class="text">价格</text>
    <view class="sort-button">
      <view>U</view>
      <view>D</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
    .sort{
       display: flex;
       height: 80rpx;
       border: 1rpx solid #ccc;
       border-radius: 20rpx;
    }
    .text{
      font-size: 30rpx;
      line-height: 80rpx;
      flex:1;
      text-align: center;
    }
    .sort-button{
      width: 20rpx;
      text-align: center;
    }
</style>
