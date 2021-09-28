<template>
  <view class="evaluate-item" :class="{'border-none':last}">
    <view class="item-top">
      <view class="name">{{item.userName}}</view>
      <view class="time">{{item.createTime | formatDate}}</view>
    </view>
    <view class="item-content">
      <view class="evaluate-list">
        <image v-for="el of item.rank"  src="../../../static/ic_score_star@2x.png" mode=""></image>
        <image v-for="el of 5-item.rank"  src="../../../static/ic_blank_star@2x.png" mode=""></image>
      </view>
      <view class="evaluate-text">{{item.content}}</view>
      <view class="image-list">
        <image-preview :list='JSON.parse(item.imgList)' :row='3'></image-preview>
      </view>
      <view class="case-item" @click="toBuy(item.skuInfoVO.skuId)">
        <image :src="item.skuInfoVO.skuImage"></image>
        <text>{{item.skuInfoVO.skuName}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    formatDate
  } from '@/utils/common.js'
  export default{
    props:{
      item:{},
      last:false,
    },
    filters: {
      formatDate
    },
    methods:{
      toBuy(item){
        uni.navigateTo({
          url:'/sub-classify/pages/goods-detail/goods-detail?goodId='+item
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .evaluate-item{
    padding: 32rpx 0;
    border-bottom: 1px solid #F4F4F4;
  }
  .border-none{
    border-bottom:none
  }
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
