<template>
  <view class="service-hunman">
    <view class="design-top" v-if="isDesign">
      <view class="design-name">全案设计</view>
      <view class="design-change">
        <text>更换设计类型</text>
        <image></image>
      </view>
    </view>
    <view class="service-content">
      <view class="msg">
        <image class="avatar"></image>
        <view class="name-msg">
          <view>
            <view class="name">李易峰</view>
            <view class="text">精算</view>
          </view>
        </view>
      </view>
      <view class="service-progress" @click="toTimeLine">
        <text>服务进度</text>
        <image></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      isDesign:false
    },
    methods:{
      toTimeLine(item){
        uni.navigateTo({
          url:'/sub-decorate/pages/time-line/time-line?id='+item.id
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .service-hunman{
    padding: 0 16rpx 0 32rpx;
    background-color: #fff;
    margin: 24rpx;
    border-radius: 12px;
  }
  .design-top{
    height: 92rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F0F0F0;
    .design-name{
      color: #333333;
      font-size: 32rpx;
    }
    .design-change{
      display: flex;
      align-items: center;
      text{
        font-size: 26rpx;
        color: #666;
      }
      image{
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx;
      }
    }
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
      .name-msg{
        display: flex;
        align-items: center;
      }
      .name{
        width: 100%;
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
