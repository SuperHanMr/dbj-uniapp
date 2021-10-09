<template>
  <view class="amount-house">
    <view class="image-title">
      <text class="title">原始结构尺寸图</text>
      <text class="time">{{imageData.measureStructImagesDate}}</text>
    </view>
    <view class="image-list">
      <imagePreview :list='imageData.measureStructImages' :imgWidth='328' :imgHeight="108*2" :lineSpace='32' :colSpace="30" :hasHeight="false"></imagePreview>
      <!-- <image v-for="item of imageData.measureStructImages" :key='item.id':src="item.fileUrl"></image> -->
    </view>
    <view class="image-title" v-if="imageData.measureImagesDate.length>0">
      <text class="title">量房图片</text>
      <text class="time">{{imageData.measureImagesDate}}</text>
    </view>
    <view class="image-list">
      <imagePreview :list='imageData.measureImages' :imgWidth='328' :imgHeight="108*2" :lineSpace='32' :colSpace="30" :hasHeight="false"></imagePreview>
      <!-- <image v-for="item of imageData.measureImages" :key='item.id':src="item.fileUrl"></image> -->
    </view>
  </view>
</template>

<script>
  import {getAmountDetail} from '../../api/decorate.js';
  import imagePreview from '../image-preview/image-preview.vue'
  export default {
    name:"amount-house",
    components:{
      imagePreview
    },
    props:{
      checkData:{},
      index:0
    }, 
    data() {
      return {
        imageData:{}
      };
    },
    // mounted(){
    //   console.log(this.checkData)
    //   this.getData()
    // },
    watch:{
      checkData:{
        handler:function(){
          console.log(123332)
          this.getData() 
        },
        deep:true
      }
      
    },
    methods:{
      getData(){
        getAmountDetail(this.checkData).then(res=>{
          this.imageData = res
          
        }).catch(err=>{
          this.$emit('isEmpty',this.index)
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
    margin-top: 32rpx;
    image{
      // width: 328rpx;
      // height: 216rpx;
      // opacity: 1;
      // background: #ffffff;
      // border: 1px solid #f5f6f6;
      // border-radius: 12rpx;
      // margin-top: 32rpx;
    }
  }
}
</style>
