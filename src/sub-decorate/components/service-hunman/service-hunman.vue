<template>
  <view class="service-hunman">
    <view class="service-content">
      <view class="msg">
        <image class="avatar"></image>
        <view class="name-msg">
          <text class="name">李易峰</text>
          <text class="text">精算</text>
        </view>
      </view>
      <view class="service-progress">
        <text>服务进度</text>
        <image></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      scrollTop:0,
      list:{
        type:Array,
        default:()=>{
          return {
            
          }
        }
      },
      num:0
    },
    methods:{
      toItem(distance){
        uni.pageScrollTo({
          duration: 100, // 过渡时间
          scrollTop: distance + this.num, // 滚动的实际距离
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-hunman{
    padding: 0 16rpx 0 32rpx;
    background-color: #fff;
    margin: 24rpx;
  }
  .service-content{
    height: 176rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .msg{
      display: flex;
      flex-wrap: wrap;
      .avatar{
        width: 104rpx;
        height: 104rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }
      .name{
        font-size: 30rpx;
        color: #333;
        font-weight: 500;
        display: block;
        margin-bottom: 8rpx;
      }
      .text{
        display: block;
        width: 76rpx;
        height: 28rpx;
        opacity: 1;
        background: linear-gradient(45deg,#6d95ef, #84b9fc);
        border-radius: 6px;
        line-height: 28rpx;
        text-align: center;
        font-size: 20rpx;
        color: #fff;
      }
    }
    .service-progress{
      display: flex;
      flex-wrap: wrap;
      text{
        font-size: 26rpx;
        color: #666;
        display: inline-block;
        margin-right: 8rpx;
      }
      image{
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
</style>
