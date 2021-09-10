<template>
  <view class="amount-house">
    <view class="image-title">
      <text class="title">原始结构尺寸图</text>
      <text class="time">{{imageData.measureStructImagesDate}}</text>
    </view>
    <view class="image-list">
      <image v-for="item of imageData.measureStructImages" :key='item.id':src="item.fileUrl"></image>
    </view>
    <view class="image-title">
      <text class="title">量房图片</text>
      <text class="time">{{imageData.measureImagesDate}}</text>
    </view>
    <view class="image-list">
      <image v-for="item of imageData.measureImages" :key='item.id':src="item.fileUrl"></image>
    </view>
  </view>
</template>

<script>
  import {getAmountDetail} from '../../api/decorate.js';
  export default {
    name:"amount-house",
    props:{
      serveId:33
    }, 
    data() {
      return {
        imageData:{}
      };
    },
    mounted(){
      this.getData() 
    },
    methods:{
      getData(){
        console.log(this.serveId)
        getAmountDetail(31).then(res=>{
          this.imageData = res
        })
      }
    }
  }
</script>

<style lang="scss">
.amount-house{
  padding: 40rpx 32rpx;
  .image-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40rpx;
    .title{
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
    }
    .time{
      color: #999;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .image-list{
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    image{
      width: 328rpx;
      height: 216rpx;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #f5f6f6;
      border-radius: 12rpx;
      margin-top: 32rpx;
    }
  }
}
</style>
