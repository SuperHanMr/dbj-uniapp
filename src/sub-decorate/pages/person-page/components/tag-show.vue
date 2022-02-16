<template>
  <view class="tag-show">
    <view class="title">
      <text class="title-text">Ta的徽章</text>
      <i class="icon-xiaochengxu_youshangjiaodankuangguanbi_ic"></i>
    </view>
    <view class="content">
      <view class="label-item"></view>
      <view class="img-list">
        <view class="img-item" v-for="item of imgList.basicBadges">
        <image :src="item.ico" ></image>
        <view class="text">
          {{item.name}}
        </view>
        </view>
        <view class="img-item" v-for="item of imgList.skillBadges">
        <image :src="item.ico" ></image>
        <view class="text">
          {{item.name ==='设计'?item.name+`(${item.levelName})`:item.name}}
        </view>
        </view>
        <view class="img-item" v-for="item of imgList.skillBadges">
        <image :src="item.ico" ></image>
        <view class="text">
          {{item.name ==='设计'?item.name+`(${item.levelName})`:item.name}}
        </view>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      imgList:{
        type:Object,
        default:()=>{}
      }
    },
    data(){
      return{
        
      }
    }
  }
</script>

<style lang='scss' scoped>
  .tag-show{
    min-height: 672rpx;
    background-color: #fff;
    border-radius: 40rpx 40rpx 0 0;
    .title{
      padding: 32rpx 80rpx;
      position: relative;
      margin-bottom: 96rpx;
      .title-text{
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        width: 100%;
        color: #111;
        font-size: 32rpx;
        display: block;
      }
      i{
        position: absolute;
        right: 32rpx;
        top: 32rpx;
        font-size: 32rpx;
      }
    }
    .content{
      padding: 0 32rpx;
      .label-item{
        background: linear-gradient(180deg, #FFFFFF 0%, #FCFCFC 83.87%);
        mix-blend-mode: normal;
        border-radius: 4px;
      }
      .img-list{
        display: flex;
        /* justify-content: space-around; */
        flex-wrap: wrap;
        .img-item{
          width: 33%;
          margin-bottom: 100rpx;
          image{
            width: 120rpx;
            height: 120rpx;
            margin: 0 auto;
            display: block;
          }
          .text{
            margin-top: 50rpx;
            text-align: center;
          }
        }
        
      }
      
    }
  }
</style>
