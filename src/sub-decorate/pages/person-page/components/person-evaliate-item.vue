<template>
  <view class="evaluate-item" :class="{'border-none':last}">
    <view class="item-top">
      <view class="name">{{item.anonymous?'匿名':item.userName}}</view>
      <view class="time">{{item.createTime}}</view>
    </view>
    <view class="item-content">
      <view class="evaluate-list">
        <image v-for="(el, idx) of item.rank" :key="idx" src="../../../static/ic_score_star@2x.png" mode=""></image>
        <image v-for="(el, idx) of 5-item.rank" :key="idx" src="../../../static/ic_blank_star@2x.png" mode=""></image>
      </view>
      <view class="evaluate-text" :class="{'report-text-hidden':isHidden}">{{item.content}}</view>
      <view class="openHidden" v-if="showBtn" @click="clickHidden">
        {{hddenText}}<i :class="{'icon-list_arrow_dropdown':isHidden,'icon-list_arrow_pullup':!isHidden}"></i>
      </view>
      <view class="image-list">
        <image-preview :list='JSON.parse(item.imgList)' :row='3'></image-preview>
      </view>
      <view class="case-item" v-if="item.skuId!=0" @click="toBuy(item.skuInfoVO.skuId)">
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
      userId:{
        type:Number,
        default:0
      }
    },
    data(){
      return{
        isHidden:false,
        showBtn:false,
        hddenText:'展开',
      }
    },
    mounted(){
      this.check()
    },
    watch:{
      item(){
        this.check()
      }
    },
    methods:{
      toBuy(item){
        if(!item){
          uni.showToast({
            title:'商品不存在',
            icon:'error'
          })
          return
        }
        console.log('/sub-classify/pages/goods-detail/goods-detail?goodId='+item+'&userId='+this.userId+'&originType='+`2|${this.userId}|${this.userId}|`)
        uni.navigateTo({
          url:'/sub-classify/pages/goods-detail/goods-detail?goodId='+item+'&userId='+this.userId+'&originType='+`2|${this.userId}|${this.userId}|`
        })
      },
      check(){
        let query = uni.createSelectorQuery().in(this)
        this.$nextTick(function(){
          query.select(".evaluate-text").boundingClientRect((res) => {
            
            this.isHidden = res.height/20 >= 6;
            this.showBtn = res.height/20 >= 6;
            console.log(res.height,this.isHidden)
            
          }).exec()
        })
      },
      clickHidden(){
        this.isHidden = !this.isHidden
        this.hddenText = this.isHidden?'展开':'收起'
      },
    }
  }
</script>

<style lang="scss" scoped>
  .evaluate-item{
    padding: 32rpx 0;
    border-bottom: 0.5px solid #F4F4F4;
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
      // -webkit-line-clamp: 6;
      // -webkit-box-orient: vertical;
    }
    .report-text-hidden{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
    .openHidden{
      // width: 148rpx;
      // height: 44rpx;
      // opacity: 1;
      // border: 0.5px solid #cccccc;
      // border-radius: 12px;
      // margin: 24rpx auto;
      // line-height: 44rpx;
      font-weight: 400;
      text-align: center;
      color: #FA4D32;
      font-size: 24rpx;
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      i{
        margin-left: 10rpx;
        font-size: 18rpx;
      }
    }
    .case-item{
      margin-top: 16rpx;
      height: 54rpx;
      // display: flex;
      // align-items: center;
      background-color: #F5F6F6;
      border: 0.5px solid #edf0f0;
      border-radius: 6rpx;
      padding-left: 2rpx;
      display: flex;
      align-items: center;
      width: fit-content;
      padding: 0 16rpx;
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
