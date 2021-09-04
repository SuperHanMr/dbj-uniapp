<template>
  <view class="result-detail">
    <view class="detail-title">满敲墙面，每处空鼓面积≤0.04m²，且每个自然间不多于2处</view>
    <view class="item">
      <text class="title">检查详情</text>
      <view class="content">这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第一个版本可支持语音和视频这里的文字是识别出来的。这里展示验房人员在总结中的文字稿，不可隐藏，所有的内容都展示。第一 所有的内容都展示</view>
    </view>
    <view class="item">
      <text class="suggest">重要建议</text>
      <view class="content suggest-content">这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第一个版本可支持语音和视频这里的文字是识别出来的。这里展示验房人员在总结中的文字稿，不可隐藏，所有的内容都展示。第一 所有的内容都展示</view>
    </view>
  </view>
</template>

<script>
  export default{
    data(){}
  }
</script>

<style lang="scss" scoped>
  .detail-title{
    color: #333;
    font-size: 36rpx;
    font-size: 500;
    padding: 40rpx 32rpx;
    background-color: #fff;
    margin-bottom: 8rpx;
  }
  .item{
    margin: 24rpx;
    background-color: #fff;
    padding: 0 16rpx;
    .title{
      display: block;
      border-bottom: 1px solid #efefef;
      height: 84rpx;
      line-height: 84rpx;
      color: #333;
      font-size: 32rpx;
    }
    .suggest{
      display: block;
      padding-top: 32rpx;
    }
    .content{
      margin-top: 22rpx;
      font-size: 26rpx;
      color: #666;
      font-weight: 400;
      padding-bottom: 14rpx;
    }
    .suggest-content{
      margin-top: 16rpx;
    }
  }
</style>
