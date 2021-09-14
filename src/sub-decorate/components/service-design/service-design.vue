<template>
  <view class="service-design">
    <view class="design-report">
      <view class="title">设计报告详情</view>
      <view class="check">
        <text>立即查看</text>
        <image></image>
      </view>
    </view>
    <view class="design-list">
      <text>平面图</text>
      <view class="design-img-list">
        <view class="item">
          <image></image>
          <text>业主的小房间平面图</text>
        </view>
        <view class="item">
          <image></image>
          <text>业主的小房间平面图</text>
        </view>
        <view class="item">
          <image></image>
          <text>业主的小房间平面图</text>
        </view>
        <view class="item">
          <image></image>
          <text>业主的小房间平面图</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {getMyDesignServe} from '../../../api/decorate.js'
  export default{
    data(){
      return{
        
      }
    },
    mounted(){
      this.getMyDesignServe()
    },
    methods:{
      getMyDesignServe(){
        getMyDesignServe(34).then(res=>{
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-design{
    margin: 24rpx;
    .design-report{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100rpx;
      padding: 0 20rpx 0 32rpx;
      background-color: #fff;
      border-radius: 24rpx;
      .title{
        font-size: 28rpx;
        font-weight: 500;
        color: #333;
      }
      .check{
        text{
          font-size: 26rpx;
          color: #666;
        }
        image{
          width: 24rpx;
          height: 24rpx;
          background-color: #eee;
        }
      }
    }
  }
</style>
