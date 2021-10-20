<template>
  <view class="grab-content-msg">
    <view class="msg-item introudc-msg">
      <view class="item-introudce item-title">
        <!-- <view class="line"></view> -->
        <view class="title">简介：</view>
      </view>
      <view class="msg-content introudc-msg" >
        <text class="report-text" :class="{'report-text-hidden':isHidden}">{{personData.intro||'这个人很懒，什么都没写'}}</text>
        <view class="openHidden" v-if="showBtn" @click="clickHidden">
          {{hddenText}}
        </view>
      </view>
    </view>
    <view class="msg-item" v-if="personData.designTags.length>0">
      <view class="item-introudce item-title">
        <!-- <view class="line"></view> -->
        <view class="title">擅长：</view>
      </view>
      <view class="msg-content list">
        <view class="tags" v-for="item of personData.designTags" :key='item'>{{item}}</view>
      </view>
    </view>
    <view class="msg-item" v-if="personData.roleId<6">
      <view class="item-title">
        <!-- <view class="line"></view> -->
        <view class="title">徽章：</view>
      </view>
      <view class="msg-content list badge-list">
        <view class="badge" v-for="item of personData.personAllBadgeVO.basicBadges" :key='item.name'>
          <image :src="item.ico"></image>
          <text>{{item.name}}</text>
        </view>
        <view class="badge"  v-for="item of personData.personAllBadgeVO.skillBadges" :key='item.name'>
          <image :src="item.ico"></image>
          <text>{{item.name}}{{item.level?'·'+item.levelName:''}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      personData:{}
    },
    data(){
      return{
        isHidden:false,
        showBtn:false,
        hddenText:'查看全部',
      }
    },
    watch:{
      personData(){
        let query = uni.createSelectorQuery().in(this)
        this.$nextTick(function(){
          query.select(".report-text").boundingClientRect((res) => {
            console.log(res)
            this.isHidden = res.height/20 >= 3;
            this.showBtn = res.height/20 >= 3;
            // console.log(res.height,this.isHidden)
            
          }).exec()
        })
      }
    },
    methods:{
      clickHidden(){
        this.isHidden = !this.isHidden
        this.hddenText = this.isHidden?'查看全部':'收起隐藏'
      },
    }
  }
</script>

<style lang="scss" scoped>
  .grab-content-msg{
    padding-bottom: 40rpx;
  }
  .introudc-msg{
    align-items: center;
  }
  .msg-item{
    margin-top: 32rpx;
    display: flex;
    line-height: 36rpx;
    margin-bottom: 12rpx;
    .item-introudce{
      display: flex;
      align-items: center;
    }
    .item-title{
      
      // display: flex;
      // align-items: center;
      display: inline-block;
      .title{
        font-size: 26rpx;
        // line-height: 40rpx;
        // font-weight: 500;
        color: #999;
        width: 78rpx;
      }
      
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
    }
    .badge-list{
      padding-left: 19rpx !important;
    }
    .msg-content{
      // padding: 0 32rpx;
      .tags{
        height: 38rpx;
        border: 0.5px solid #e7e7e7;
        border-radius: 6rpx;
        line-height: 38rpx;
        text-align: center;
        color: #999;
        font-size: 24rpx;
        font-weight: 400;
        padding: 0 12rpx;
        margin: 0 16rpx 16rpx 0;
      }
      .badge{
        position: relative;
        display: flex;
        align-items: center;
        image{
          // background-color: #eee;
          position: absolute;
          width: 42rpx;
          height: 42rpx;
          left: -19rpx;
          top: 0px;
        }
        text{
          height: 38rpx;
          background: #F7F7F7;
          border-radius: 6rpx;
          line-height: 38rpx;
          text-align: right;
          color: #999;
          font-size: 24rpx;
          font-weight: 400;
          padding: 0 12rpx 0 26rpx;
          margin: 0 35rpx 16rpx 0;
          border: 0.5px solid #e6e6e6;
        }
      }
    }
    .report-text {
      color: #999;
      font-size: 26rpx;
      font-weight: 400;
      letter-spacing: 1px;
      width: 100%;
      line-height: 42rpx;
      word-break: break-word;
      display: inline-block;
    }
    .report-text-hidden{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .openHidden{
      width: 148rpx;
      height: 44rpx;
      opacity: 1;
      border: 0.5px solid #cccccc;
      border-radius: 12px;
      margin: 24rpx auto;
      line-height: 44rpx;
      font-weight: 400;
      text-align: center;
      color: #999999;
      font-size: 24rpx;
      
    }
  }
</style>
