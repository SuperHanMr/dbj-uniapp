<template>
  <view class="result-detail">
    <view class="detail-title">{{item.inspectName}}</view>
    <view class="item">
      <view class="line"></view>
      <text class="title">检查详情</text>
      <i :class="{'icon-ic_wodejia_fuhebiaozhun_csn':!isProblem,'icon-ic_wodejia_yinhuan_csn':item.severity===1,'icon-ic_wodejia_zhongdayinhuan_csn':item.severity===2}" :style="{color:!isProblem?'#3875EE':item.severity===1?'#F6A93B':'#E4362D'}"></i>
      <view class="content">{{item.problemDetails}}</view>
    </view>
    <view class="item">
      <text class="title suggest">重要建议</text>
      <view class="line"></view>
      <view class="content suggest-content">{{item.rectificationSuggestions}}</view>
    </view>
  </view>
</template>

<script>
  import {getResultProblem,getResultNorm} from '@/api/decorate.js'
  export default{
    data(){
      return{
        isProblem:false,
        item:{}
      }
    },
    onLoad(e){
     
      e.ruleId?this.getResultNorm(e.ruleId):this.getResultProblem(e.problemId)
    },
    methods:{
      getResultProblem(id){
        console.log(id)
        getResultProblem(id).then(res=>{
          this.isProblem = true;
          this.item = res
        })
      },
      getResultNorm(id){
        getResultNorm(id).then(res=>{
          this.item = res
          this.item.problemDetails = '检查已通过！'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .detail-title{
    color: #333;
    font-size: 36rpx;
    font-weight: 500;
    padding: 40rpx 32rpx;
    background-color: #fff;
    margin-bottom: 8rpx;
    
  }
  .item{
    margin: 24rpx;
    background-color: #fff;
    padding: 0 32rpx;
    border-radius: 16rpx;
    position: relative;
    i{
      font-size: 130rpx;
      position: absolute;
      top: 24rpx;
      right: 24rpx;
    }
    .line{
      width: 6rpx;
      height: 28rpx;
      background: #00c2b8;
      position: absolute;
      left: 0;
      top: 28rpx;
    }
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
      // padding-top: 32rpx;
    }
    .content{
      margin-top: 22rpx;
      font-size: 26rpx;
      color: #666;
      font-weight: 400;
      padding-bottom: 14rpx;
    }
    .suggest-content{
      // padding: 16rpx 0 32rpx;
    }
  }
</style>
