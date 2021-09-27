<template>
  <view class="sort">
    <view class="sort-content" @click="changeSortState">
      <text class="text">价格</text>
      <view class="sort-button">
        <view class="sort-img"  :class="{'defult-price': sortState === 0,'up-price': sortState === 1,'down-price': sortState === 2}" ></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        sortState: 0
      }
    },
    methods: {
      changeSortState(){      
        this.sortState === 2 ? this.sortState = 0 : this.sortState ++
      }
    }
  }
</script>

<style scoped>
    .sort{
      width: 112rpx;
      height: 64rpx;
      overflow: hidden;
      background-color: #f9f9f9;
      border-radius: 20rpx;
    }
    .sort-content{
      display: flex;
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 15rpx 0 10rpx;
    }
    .text{
      font-size: 30rpx;
      flex:1;
      text-align: center;
    }
    .sort-button{
      width: 20rpx;
      text-align: center;
      position: relative;
    }
    .defult-price{
      width: 18rpx;
      height: 20rpx;
      background-size: cover;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background-image: url("../../../static/images/price_default.png");
    }
    .up-price{
      width: 20rpx;
      height: 10rpx;
      background-size: cover;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background-image: url("../../../static/images/price_up.png");
    }
    .down-price{
      width: 20rpx;
      height: 10rpx;
      background-size: cover;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background-image: url("../../../static/images/price_down.png");
    }
</style>
