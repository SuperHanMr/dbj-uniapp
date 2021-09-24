<template>
  <view class="person-page">
    <image class="bg-index" mode="aspectFit" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/bg@2x.png">
    </image>
    <view class="back">
      <image ></image>
    </view>
    <view class="person-page-content">
    <view class="person-msg">
        <view class="person-msg-top">
          <view class="person-msg-header">
            <view class="person-msg-header-image">
              <image class="avatar"></image>
              <image class="icon"></image>
            </view>
            <text class="name">上官海棠</text>
            <view class="label">
              <text class="job">设计师</text>
              <text class="rate">好评率99%</text>
            </view>
          </view>
          <view class="btn">
            <view class="recommend">
              <image></image>
              优先推荐
            </view>
            <view class="attention">
              <image></image>
              关注
            </view>
          </view>
          <view class="person-msg-list">
            <view class="list-item">
              <text class="num">7</text>
              <text class="title">获赞</text>
            </view>
            <view class="list-item">
              <text class="num">7</text>
              <text class="title">粉丝</text>
            </view>
            <view class="list-item">
              <text class="num">7</text>
              <text class="title">被收藏</text>
            </view>
            <view class="list-item">
              <text class="num">7</text>
              <text class="title">被推荐</text>
            </view>
            <view class="list-item">
              <text class="num">7</text>
              <text class="title">总接单</text>
            </view>
          </view>
        </view>
      <personIntroduce></personIntroduce>
    </view>
    <view class="person-interact">
      <view class="sticky" >
        <view class="item" :class="{'item-active':currentItem==='service'}" @click="toItem('top')">
          服务</view>
        <view class="item" :class="{'item-active':currentItem==='case'}" @click="toItem('hazardTop')">
          案例</view>
          <view class="item" :class="{'item-active':currentItem==='state'}" @click="toItem('conformTop')">
            动态</view>
        <view class="item" :class="{'item-active':currentItem==='evaluate'}" @click="toItem('conformTop')">
          评价<text>16</text></view>
      </view>
    </view>
    </view>
  </view>
</template>

<script>
  import personIntroduce from './components/person-introduce.vue'
  import {getCaseList} from '@/api/real-case.js'
  export default{
    components:{
      personIntroduce
    },
    data(){
      return{
        currentItem:'service'
      }
    },
    onPullDownRefresh(){
      this.getCaseList()
    },
    mounted(){
      this.getCaseList()
    },
    methods:{
      getCaseList(){
        getCaseList().then(res=>{
          
        })
      },
      toItem(){}
      
    }
  }
</script>

<style lang="scss" scoped>
  .person-page{
    position: relative;
    padding-top: 98rpx;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    .bg-index {
      top: 0;
      width: 100%;
      height: 480rpx;
      position: absolute;
    }
    .back{
      position: absolute;
      left: 32rpx;
      width: 64rpx;
      height: 64rpx;
      background: #000000;
      border-radius: 26rpx;
      opacity: 0.2;
      display: flex;
      align-items: center;
      justify-content: center;
      image{
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .person-page-content{
    position: relative;
    top: 214rpx;
  }
  .person-msg{
    width: calc(100% - 32px);
    background-color: #fff;
    border-radius: 32rpx 32rpx 0px 0px;
    box-shadow: 0px 26rpx 34rpx 0px rgba(3, 65, 63, 0.03);
    padding: 226rpx 32rpx 0;
    .person-msg-top{
      border-bottom: 1px solid #F3F3F3;
    }
    .person-msg-header{
      position: absolute;
      top: -40rpx;
      .person-msg-header-image{
        position: relative;
        height: 140rpx;
        .avatar{
          width: 140rpx;
          height: 140rpx;
          border-radius: 50%;
          background-color: #eee;
          
        }
        .icon{
          position: absolute;
          width: 32rpx;
          height: 32rpx;
          left: 108rpx;
          bottom: 0;
          background-color: #00C2B2;
        }
      }
      .name{
        font-size: 44rpx;
        font-weight: 500;
        color: #111;
        line-height: 60rpx;
        margin: 12rpx 0;
      }
      .label{
        text{
          display: inline-block;
          margin-right: 16rpx;
          height: 36rpx;
          line-height: 36rpx;
          text-align: center;
          font-size: 22rpx;
        }
        .job{
          color: #FFFFFF;
          background: linear-gradient(135deg, #40AFF5 0%, #4C95F1 100%);
          padding: 0 16rpx;
          border-radius: 6rpx;
        }
        .rate{
          padding: 0 8rpx;
          background: #E8F7EF;
          border-radius: 6px;
          color: #21C091;
          border-radius: 6rpx;
        }
      }
    }
    .btn{
      position: absolute;
      top: 36rpx;
      right: 32rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      image{
        width: 20rpx;
        height: 20rpx;
        display: inline-block;
        background-color: #eee;
        margin-right: 8rpx;
      }
      .attention{
        width: 86rpx;
        height: 64rpx;
        border-radius: 12rpx;
        border: 1px solid #00BFB6;
        color: #00BFB6;
        line-height: 64rpx;
        padding: 0 18rpx;
        font-size: 28rpx;
        font-size: 400;
      }
      .recommend{
        width: 146rpx;
        height: 64rpx;
        background: linear-gradient(135deg, #00BFAF 0%, #00BFBC 100%);
        border-radius: 12rpx;
        margin-right: 24rpx;
        line-height: 64rpx;
        padding: 0 22rpx;
        font-size: 28rpx;
        color: #fff;
        font-size: 400;
      }
    }
    .person-msg-list{
        // margin-top: 216rpx;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-evenly;
        height: 104rpx;
        align-items: center;
        margin-bottom: 28rpx;
        .list-item{
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: center;
          margin-right: 48rpx;
          text{
            display: block;
          }
          .num{
            color: #333;
            font-size: 40rpx;
            font-weight: 400;
            line-height: 42rpx;
            // text-align: ;
          }
          .title{
            font-size: 24rpx;
            font-weight: 400;
            color: #999;
            background-color: #fff;
          }
        }
      }
  }
  .person-interact{
    margin-top: 24rpx;
    // height: 200rpx;
    // background-color: ;
    .sticky {
      position: sticky;
      top: 0;
      width: 100%;
      height: 80rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      border-bottom: 1px solid #EFEFEF;
      view {
        line-height: 80rpx;
        text-align: center;
        color: #999;
        font-size: 28rpx;
      }
      .item {
        position: relative;
      }
      .item-active::after {
        content: "";
        display: inline-block;
        width: 32rpx;
        height: 4rpx;
        background: linear-gradient(129deg, #00CDEC 0%, #00ED7D 100%);
        border-radius: 200rpx 200rpx 0px 0px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
</style>
