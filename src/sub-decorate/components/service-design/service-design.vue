<template>
  <view class="service-design">
    <view class="design-report">
      <view class="title">设计报告详情</view>
      <view class="check">
        <text>立即查看</text>
        <image></image>
      </view>
    </view>
    <view class="design-list" v-for="item of list" :key='item.categoryName'>
      <text>{{item.categoryName}}</text>
      <view class="design-img-list">
        <view class="item" v-for="el of item.imageFileList" :key='el.fileUrl'>
          <image :src="el.fileUrl"></image>
          <text>{{el.fileName}}</text>
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
        list:[]
      }
    },
    mounted(){
      this.getMyDesignServe()
    },
    methods:{
      getMyDesignServe(){
        getMyDesignServe(34).then(res=>{
          console.log(res)
          this.list = res.fileListVO
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
      margin-bottom: 48rpx;
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
        image{
          width: 24rpx;
          height: 24rpx;
          background-color: #eee;
          margin-left: 16rpx;
        }
      }
    }
    .design-list{
      margin-top: 8rpx;
      text{
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
      }
      .design-img-list{
        margin-top: 26rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item{
          width: 328rpx;
          margin-bottom: 48rpx;
        }
        image{
          width: 328rpx;
          height: 216rpx;
          opacity: 1;
          border: 1px solid #f5f6f6;
          border-radius: 12rpx;
          margin-bottom: 16rpx;
          background-color: #eee;
        }
        text{
          font-weight: 400;
          text-align: left;
          color: #333333;
          font-size: 24rpx;
        }
        
      }
    }
  }
</style>
