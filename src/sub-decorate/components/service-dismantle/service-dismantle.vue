<template>
  <view class="service-dismantle">
    <view class="item">
      <view class="item-top">
        <text class="name">工艺项名称</text>
        <text class="time">2021-08-19 20:20:00</text>
      </view>
      <view class="image-list">
        <image  src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddeffc8ad41345e89b385cd987196c3c~tplv-k3u1fbpfcp-watermark.image?"></image>
        <image src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/723a27a33ffd4e01995ea363fd3325c1~tplv-k3u1fbpfcp-watermark.image?"></image>
        <image src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f268d4c0e7440a38bde69cec6c26504~tplv-k3u1fbpfcp-watermark.image?"></image>
        <image src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edb160b1778d4652a4215eafb66b8a12~tplv-k3u1fbpfcp-watermark.image?"></image>
        <image src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d78e4941f9a49e39f5ccb577e59467a~tplv-k3u1fbpfcp-watermark.image?"></image>
        <image src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c2af848acd74b65b66ce9068a5ba99c~tplv-k3u1fbpfcp-watermark.image?"></image>
        <image src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afee81284be14cccae399a0da632f51f~tplv-k3u1fbpfcp-watermark.image?"></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
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
