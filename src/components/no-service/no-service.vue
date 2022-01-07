<template>
  <div class="no-service">
    <image class="bg" v-if="listImage" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/blank_ic%402x.png">
      <image class="box-bg" v-else src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/box_empty.png">
      </view>
      <view class="text">{{words}}</view>
  </div>
</template>

<script>
  export default {
    props: {
      words:{
        type:String,
        default:""
      },
      listImage:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>
  .no-service {
    height: 360rpx;
    margin: 0 24rpx 24rpx 24rpx;
    /* background: #fbfbfb; */
    border-radius: 20rpx;
    padding: 0 64rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .no-service .bg {
    width: 300rpx;
    height: 300rpx;
    margin-bottom: 24rpx;
  }
  .no-service .box-bg{
    width: 344rpx;
    height: 344rpx;
    margin-bottom: 24rpx;
  }
  .no-service .text {
    /* width: 196rpx; */
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #999999;
    line-height: 40rpx;
  }
</style>
