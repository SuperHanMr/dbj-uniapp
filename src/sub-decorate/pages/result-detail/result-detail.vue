<template>
  <view class="result-detail">
    <view class="detail-title">{{item.inspectName}}</view>
    <view class="item">
      <text class="title">检查详情</text>
      <view class="content">{{item.problemDetails}}</view>
    </view>
    <view class="item">
      <text class="suggest">重要建议</text>
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
     console.log(e.ruleId,e.problemId)
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
