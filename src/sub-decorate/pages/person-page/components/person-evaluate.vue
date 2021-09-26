<template>
  <view class="person-evaluate person-content-item">
    <view class="title">Ta的评价</view>
    <view class="evaluate-item">
      <view class="item-top">
        <view class="name">渴死的鱼</view>
        <view class="time">2021年5月3日</view>
      </view>
      <view class="item-content">
        <view class="evaluate-list">
          <image src="" mode=""></image>
        </view>
        <view class="evaluate-text">设计师太有才了，超喜欢这种设计设计设两行字显示喜欢这种设计设计设两行字设计设计设两行字设计设计设两行字设计设计设两行字设计设计设两行字设计的设…</view>
        <view class="image-list">
          <image-preview :list='list' :row='3'></image-preview>
        </view>
        <view class="case-item">
          <image></image>
          <text>谁都快疯了的思念疯狂了打给你快乐的你疯狂拉升带你飞</text>
        </view>
      </view>
    </view>
    <view class="click-text">查看全部评价<image src="" mode=""></image></view>
  </view>
</template>

<script>
  import '../style/common.scss'
</script>

<style lang="scss" scoped>
  .item-top{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28rpx;
    .name{
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
    }
    .time{
      font-size: 22rpx;
      color: #999;
    }
  }
  .item-content{
    margin-top: 24rpx;
    margin-bottom: 32rpx;
    .evaluate-list{
      margin-bottom: 8rpx;
      image{
        width: 30rpx;
        height: 30rpx;
        margin-right: 8rpx;
      }
    }
    .evaluate-text{
      font-size: 28rpx;
      color: #666;
      line-height: 44rpx;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
    .case-item{
      margin-top: 16rpx;
      height: 54rpx;
      // display: flex;
      // align-items: center;
      background-color: #F5F6F6;
      border: 1px solid #edf0f0;
      border-radius: 6rpx;
      padding-left: 2rpx;
      display: flex;
      align-items: center;
      max-width: 380rpx;
      image{
        width: 48rpx;
        height: 48rpx;
        background: #C1C1C1;
        border-radius: 4rpx;
        margin-right: 18rpx;
      }
      text{
        display: inline-block;
        max-width: 296rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
        font-size: 24rpx;
      }
    }
  }
  
</style>
