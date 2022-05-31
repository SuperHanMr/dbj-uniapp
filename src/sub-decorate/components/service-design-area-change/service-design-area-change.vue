<template>
  <view class="service-design-area-change">
    <view class="change-item">
      <view class="title">服务面积变更详情</view>
      <view class="check" @click="toServiceAreaChange">
        <text>立即查看</text>
        <i class="icon-alert_notice_jump"></i>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      serverId:0,
    },
    methods:{
      // 跳转至服务面积变更详情
      toServiceAreaChange(){
        uni.navigateTo({
          url:`/sub-decorate/pages/service-area-change/service-area-change?serveCardId=${this.serverId}`
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

  .service-design-area-change{
    padding: 0 20rpx 0 32rpx;
    background-color: #fff;
    border-radius: 24rpx;
    margin: 24rpx;
    .change-item{
      height: 100rpx;
      border-bottom: 0.5px solid #F4F4F4;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .title{
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
    }
    .check{
      display: flex;
      align-items: center;
      text{
        font-size: 26rpx;
        color: #666;
      }
      i{
        width: 24rpx;
        height: 36rpx;
        font-size: 20rpx;
        line-height: 36rpx;
        color: #999;
        margin-left: 16rpx;
      }
    }
  }
</style>
