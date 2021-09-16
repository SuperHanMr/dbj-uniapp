<template>
  <view class="service-dismantle">
    <view class="item">
      <view class="item-top">
        <text class="name">工艺项名称</text>
        <text class="time">2021-08-19 20:20:00</text>
      </view>
      <view class="image-list">
      </view>
    </view>
  </view>
</template>

<script>
  import imagePreview from '../../../components/image-preview/image-preview.vue'
  export default{
    components:{
      imagePreview
    },
    data(){
      return{
        
      }
    },
    methods:{
      previewImage(url,index){
        let urls = []
        this.list.forEach(item=>{
          urls.push(item.url)
        })
        uni.previewImage({
        	urls: urls,
        	current: index
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .service-dismantle{
    margin: 40rpx 32rpx;
    .item{
      
    }
    .item-top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 26rpx;
      .name{
        color: #333333;
        font-size: 28rpx;
      }
      .time{
        font-size: 24rpx;
        color: #999;
      }
    }
    .image-list{
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      overflow: hidden;
      // height: 500rpx;
      height: 220rpx;
      image{
        width: 220rpx;
        height: 220rpx;
        border-radius: 8rpx;
        background-color: #fff;
      }
    }
  }
</style>
