<template>
  <view class="grab-content-msg">
    <view class="msg-item">
      <view class="item-title">
        <view class="line"></view>
        <view class="title">Ta的简介</view>
      </view>
      <view class="msg-content">
        <text class="report-text" :class="{'report-text-hidden':isHidden}">看见阿三开afksjlakjfklsa可怜少女风圣诞快乐能否抽空拉升能否都是快乐烦恼撒到了咖啡奈拉蒂考是你疯狂了你都IE撒发呢可是你发教案的饭卡的女克拉女阿克琉斯的那份v发卡量苏丹诺夫蓝坤大厦内费拉达斯你发了肯定是你疯狂思念疯狂拉升能否顺利可能疯了</text>
        <view class="openHidden" v-if="showBtn" @click="clickHidden">
          {{hddenText}}
        </view>
      </view>
    </view>
    <view class="msg-item">
      <view class="item-title">
        <view class="line"></view>
        <view class="title">Ta的擅长</view>
      </view>
      <view class="msg-content list">
        <view class="tags">轻奢</view>
        <view class="tags">平层</view>
        <view class="tags">老房改造</view>
        <view class="tags">儿童空间</view>
        <view class="tags">儿童空间</view>
        <view class="tags">儿童空间</view>
        <view class="tags">儿童空间</view>
        <view class="tags">儿童空间</view>
      </view>
    </view>
    <view class="msg-item" >
      <view class="item-title">
        <view class="line"></view>
        <view class="title">Ta的徽章</view>
      </view>
      <view class="msg-content list badge-list">
        <view class="badge">
          <image></image>
          <text>技能认证</text>
        </view>
        <view class="badge">
          <image></image>
          <text>技能认证·中级</text>
        </view>
        <view class="badge">
          <image></image>
          <text>技能认证</text>
        </view>
        <view class="badge">
          <image></image>
          <text>技能认证·中级</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        isHidden:false,
        showBtn:false,
        hddenText:'查看全部',
      }
    },
    mounted(){
      let query = uni.createSelectorQuery().in(this)
      query.select(".report-text").boundingClientRect((res) => {
        this.isHidden = res.height/20 > 2;
        this.showBtn = res.height/20 > 2;
        // console.log(res.height,this.isHidden)
        
      }).exec()
      // query.exec(function(res) {
      //   res[0].top // #the-id节点的上边界坐标
      //   res[1].scrollTop // 显示区域的竖直滚动位置
      // })
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
  .msg-item{
    margin-top: 32rpx;
    .item-title{
      margin-bottom: 12rpx;
      display: flex;
      .line{
        width: 4rpx;
        height: 34rpx;
        background: #00BFB6;
        border-radius: 0px 200rpx 200rpx 0px;
        margin-right: 28rpx;
      }
      .title{
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: 500;
        color: #333;
      }
      
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
    }
    .badge-list{
      padding-left: 51rpx !important;
    }
    .msg-content{
      padding: 0 32rpx;
      .tags{
        height: 38rpx;
        border: 1px solid #e7e7e7;
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
        height: 38rpx;
        background: #f7f7f7;
        border-radius: 6rpx;
        line-height: 38rpx;
        text-align: right;
        color: #999;
        font-size: 24rpx;
        font-weight: 400;
        padding: 0 12rpx 0 26rpx;
        margin: 0 35rpx 16rpx 0;
        position: relative;
        image{
          background-color: #eee;
          position: absolute;
          width: 38rpx;
          height: 38rpx;
          left: -19rpx;
          top: 0;
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
      border: 1px solid #cccccc;
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
