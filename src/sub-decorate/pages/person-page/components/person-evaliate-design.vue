<template>
  <view class="person-evaluate-design">
    <view class="peer-evaluate" v-if="peerComment.showCommentCount>0">
      <image class="peer-bg" src="../../../static/person_peer.png" mode=""></image>
      <view class="peer-title">
        <image :src="peerComment.avatar" @click="toPerson" mode=""></image>
        <text class="design-name">{{peerComment.userName}}</text>
        <text class="design-job">{{peerComment.roleName}}</text>
        <view class="design-rank" v-if="peerComment.valueRank>0">
          <text class="num top-font">TOP.{{peerComment.valueRank}}</text>
          <text class="text">最具价值</text>
        </view>
      </view>
      <view class="tag-list">
        <view class="tag-item" v-for="item of peerComment.commentTags.split(',')">
          {{item}}
        </view>
<!--        <view class="tag-item">
          设计水平高
        </view> -->
      </view>
      <view class="peer-content">
        {{peerComment.content}}
      </view>
      <view class="view-all" @click="toPeerList">
        查看全部{{peerComment.showCommentCount}}次同行的评价
        <i class='icon-alert_notice_jump'></i>
      </view>
    </view>
    <view class="user-evaliate">
    <image class="bg" src="../../../static/design_comment.png" mode=""></image>
    <view class="" v-if="commentData.list[0].rank>3">
      <view class="title">
        来自 {{commentData.list[0].anonymous?'匿名用户':commentData.list[0].userName}} 
        <text> 的评价</text>
      </view>
      <view class="evaluate-text" :class="{'report-text-hidden':isHidden}">
        {{commentData.list[0].content?commentData.list[0].content:(JSON.parse(commentData.list[0].imgList).length>0?'此用户上传了图片评价。':`用户对设计师进行了${commentData.list[0].rank}星好评`)}}
      </view>
      <view class="openHidden" v-if="showBtn" @click="clickHidden">
        {{hddenText}}<i :class="{'icon-list_arrow_dropdown':isHidden,'icon-list_arrow_pullup':!isHidden}"></i>
      </view>
      <view class="case-item" v-if="commentData.list[0].skuId!=0" @click="toBuy(commentData.list[0].skuInfoVO.skuId)">
        <image :src="commentData.list[0].skuInfoVO.skuImage"></image>
        <text>{{commentData.list[0].skuInfoVO.skuName}}</text>
      </view>
      <view class="link" @click="toEvaluateList">
        Ta获得了{{commentData.totalRows}}次评价
        <i class='icon-alert_notice_jump'></i>
      </view>
    </view>
    <view class="no-good" v-else>
      <view class="link" @click="toEvaluateList">
        Ta获得了{{commentData.totalRows}}次评价
        <i class='icon-alert_notice_jump'></i>
      </view>
    </view>
    </view>
  </view>
</template>

<script>
  import '../style/common.scss'
  import {formatDate} from "@/utils/common.js"
  import personEvaliateItem from './person-evaliate-item.vue'
  import {getComments} from '@/api/decorate.js'
  export default{
    props:{
      personId:0,
      isGrab:{
        type:Boolean,
        default:false,
      },
      commentData:{
        type:Object,
        default:()=>{
          return{}
        }
      },
      peerComment:{
        type:Object,
        default:()=>{
          return{}
        }
      },
      userId:{
        type:Number,
        default:0
      }
    },
    components:{
      personEvaliateItem
    },
    data(){
      return{
        num:3,
        evaluate:{
          list:[]
        },
        isHidden:false,
        showBtn:false,
        hddenText:'展开',
      }
    },
    // mounted() {
    //   this.getComments()
    // },
    watch:{
      commentData:{
        handler:function(){
          this.check()
        },
        immediate: true
      }
    },
    methods:{
      toBuy(item){
        if(!item){
          uni.showToast({
            title:'商品不存在',
            icon:'error'
          })
          return
        }
        uni.navigateTo({
          url:'/sub-classify/pages/goods-detail/goods-detail?goodId='+item+'&userId='+this.userId+'&originType='+`2|${this.userId}|${this.userId}|`
        })
      },
      toEvaluateList(){
        this.$emit('toEvaluateList')
      },
      check(){
        let query = uni.createSelectorQuery().in(this)
        this.$nextTick(function(){
          query.select(".evaluate-text").boundingClientRect((res) => {
            
            this.isHidden = res.height/20 >= 3;
            this.showBtn = res.height/20 >= 3;
            console.log(res.height,this.isHidden)
            
          }).exec()
        })
      },
      clickHidden(){
        this.isHidden = !this.isHidden
        this.hddenText = this.isHidden?'展开':'收起'
      },
      toPerson(){
        console.log(this.peerComment.userId)
        uni.navigateTo({
          url:'/sub-decorate/pages/person-page/person-page?personId=' + this.peerComment.userId
        })
      },
      toPeerList(){
        uni.navigateTo({
          url:'/sub-decorate/pages/person-page/person-peer-evaluate-list?id='+this.peerComment.refUserId
        })
      },
      // toRankList(){
      //   uni.navigateTo({
      //     url:'/sub-home/pages/find-design/designer-rank-list'
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .person-evaluate-design{
    position: relative;
    padding: 32rpx 32rpx 0;
    background-color: #fff;
    border-radius: 32rpx 32rpx 0 0;
    
    .peer-evaluate{
      position: relative;
      background: linear-gradient(358.69deg, #FFFFFF -0.94%, #FFF7F7 98.88%);
      padding: 32rpx;
      border: 0.5px solid #FBDFDF;
      border-radius: 24rpx;
      .peer-bg{
        width: 100%;
        position: absolute;
        height: 108rpx;
        width: 340rpx;
        top: 0;
        right: 0;
      }
      .peer-title{
        display: flex;
        align-items: center;
        image{
          width: 52rpx;
          height: 52rpx;
          border-radius: 50%;
          margin-right: 16rpx;
        }
        .design-name{
          font-size: 24rpx;
          color: #666;
          margin-right: 12rpx;
        }
        .design-job{
          padding: 0 8rpx;
          background: rgba(79, 190, 237, 0.06);
          border-radius: 4rpx;
          height: 30rpx;
          line-height: 30rpx;
          color: #4FBEED;
          font-size: 20rpx;
          margin-right: 12rpx;
        }
        .design-rank{
          height: 30rpx;
          line-height: 30rpx;
          text{
            display: inline-block;
            padding: 0 8rpx;
            font-size: 20rpx;
            color: #865E41;
          }
          .num{
            background: linear-gradient(180deg, #FFEBCC 0%, #FFE5B7 100%);
            border-radius: 4rpx 0 0 4rpx;
          }
          .text{
            background: linear-gradient(180deg, #FFDFA8 0%, #EFC988 100%);
            border-radius: 0 4rpx 4rpx 0 ;
          }
        }
      }
      .tag-list{
        display: flex;
        margin: 14rpx 0 12rpx;
        flex-wrap: wrap;
        .tag-item{
          height: 40rpx;
          line-height: 40rpx;
          border: 0.5px solid #CCCCCC;
          box-sizing: border-box;
          border-radius: 8rpx;
          padding: 0 12rpx;
          color: #333;
          font-size: 24rpx;
          margin-right: 12rpx;
          margin-top: 10rpx;
        }
      }
      .peer-content{
        color: #333;
        font-size: 26rpx;
        margin-bottom: 24rpx;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .view-all{
        display: flex;
        border: 0.5px solid #E8E8E8;
        box-sizing: border-box;
        border-radius: 88rpx;
        width: 100%;
        height: 82rpx;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: 26rpx;
        i{
          font-size: 20rpx;
          margin-left: 18rpx;
        }
      }
    }
    .user-evaliate{
      position: relative;
    }
    .bg{
      width: 116rpx;
      height: 90rpx;
      position: absolute;
      top: 32rpx;
      left: -10rpx;
    }
    .title{
      padding: 68rpx 0 32rpx;
      border-bottom: 2rpx solid #F6F6F6;
      font-size: 32rpx;
      color: #333;
      position: relative;
      z-index: 1;
      text{
        font-weight: 500;
        display: inline-block;
        margin-left: 10rpx;
      }
    }
    .evaluate-text{
      font-size: 28rpx;
      color: #666;
      line-height: 44rpx;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      margin: 24rpx 0;
      // -webkit-line-clamp: 6;
      // -webkit-box-orient: vertical;
    }
    .report-text-hidden{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .openHidden{
      // width: 148rpx;
      // height: 44rpx;
      // opacity: 1;
      // border: 0.5px solid #cccccc;
      // border-radius: 12px;
      // margin: 24rpx auto;
      // line-height: 44rpx;
      font-weight: 600;
      text-align: center;
      color: #333;
      font-size: 24rpx;
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      i{
        margin-left: 10rpx;
        font-size: 18rpx;
      }
    }
    .case-item{
      // margin-top: 16rpx;
      height: 54rpx;
      // display: flex;
      // align-items: center;
      background-color: #F5F6F6;
      border: 0.5px solid #edf0f0;
      border-radius: 6rpx;
      padding-left: 2rpx;
      display: flex;
      align-items: center;
      width: fit-content;
      padding: 0 16rpx;
      image{
        width: 48rpx;
        height: 48rpx;
        background: #C1C1C1;
        border-radius: 4rpx;
        margin-right: 18rpx;
      }
      text{
        display: inline-block;
        max-width: 296rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
        font-size: 24rpx;
      }
    }
    .link{
      width: 100%;
      color: #333;
      font-size: 26rpx;
      text-align: center;
      height: 74rpx;
      line-height: 74rpx;
      i{
        display: inline-block;
        margin-left: 8rpx;
      }
    }
    .no-good{
      .link{
            position: relative;
            width: 100%;
            color: #333;
            font-size: 32rpx;
            /* height: 74rpx; */
            /* line-height: 74rpx; */
            text-align: left;
            padding-top: 80rpx;
            z-index: 1;
            padding-bottom: 32rpx;
        i{
          display: inline-block;
          margin-left: 8rpx;
          font-size: 20rpx;
          vertical-align: middle;
        }
      }
    }
  }
</style>
