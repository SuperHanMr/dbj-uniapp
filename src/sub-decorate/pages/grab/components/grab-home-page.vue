<template>
  <view class="grab-content">
    <view class="grab-content-top">
      <view class="grab-content-header">
        <view class="avatar" :style="{backgroundImage: `url(${personData.avatar})`}"  mode=""></view>
        <text class="title">{{personData.realName}}</text>
        <view class="introduce">
          <text>{{personData.genderName}}</text>
<!--         <text>|</text>
          <text>{{personData.roleName}}</text> -->
          <text>|</text>
          <text>好评率{{personData.praiseRate||0}}</text>
        </view>
      </view>
      <view class="person-msg-list">
        <view class="list-item">
          <text class="num">{{personData.likeCount}} <text class="unit" v-if="personData.likeCount.split('.')[1]">w</text></text>
          <text class="title">获赞</text>
        </view>
        <view class="list-item">
          <text class="num">{{personData.fansCount}} <text class="unit" v-if="personData.fansCount.split('.')[1]">w</text></text>
          <text class="title">粉丝</text>
        </view>
        <view class="list-item" v-if="personData.roleId===1||personData.roleId===2||personData.roleId===6">
          <text class="num">{{personData.collectCount}} <text class="unit" v-if="personData.collectCount.split('.')[1]">w</text></text>
          <text class="title">被收藏</text>
        </view>
        <view class="list-item">
          <text class="num">{{personData.recommendCount}} <text class="unit" v-if="personData.recommendCount.split('.')[1]">w</text></text>
          <text class="title">被推荐</text>
        </view>
        <view class="list-item">
          <text class="num">{{personData.totalNum}} <text class="unit" v-if="personData.totalNum.split('.')[1]">w</text></text>
         
          <text class="title">总接单</text>
        </view>
      </view>
    </view>
    <grabHomePageMsg :personData='personData'></grabHomePageMsg>
  </view>
</template>

<script>
  import grabHomePageMsg from './grab-home-page-msg.vue'
  export default{
    props:{
      personData:{}
    },
    components:{
      grabHomePageMsg
    },
    data(){
      return{
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .grab-content{
    
    width: 100%;
    background-color: #fff;
    border-radius: 48rpx;
    .grab-content-top{
      position: relative;
      border-bottom: 0.5px solid #F3F3F3;
      // height: 336rpx;
      padding-top: 216rpx;
      .grab-content-header{
        position: absolute;
        top: -76rpx;
        width: 270rpx;
        left: 50%;
        margin-left: -135rpx;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .avatar{
          width: 152rpx;
          height: 152rpx;
          border-radius: 50%;
          margin-bottom: 12rpx;
          background-color: #eee;
          background-size: contain;
        }
        .title{
          font-size: 44rpx;
          font-weight: 500;
          color: #333;
          line-height: 60rpx;
          width: 100%;
          text-align: center;
        }
        .introduce{
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          text{
            color: #999;
            font-size: 22rpx;
          }
        }
      }
      .person-msg-list{
        // margin-top: 216rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        height: 104rpx;
        align-items: center;
        margin-bottom: 16rpx;
        .list-item{
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: center;
          text{
            display: block;
          }
          .num{
            color: #333;
            font-size: 40rpx;
            font-weight: 400;
            line-height: 42rpx;
            text-align: center;
          }
          .unit{
            display: inline-block;
            font-size: 24rpx;
            font-weight: 500;
            color: #333333;
          }
          .title{
            font-size: 24rpx;
            font-weight: 400;
            color: #999;
            background-color: #fff;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    
  }
</style>
