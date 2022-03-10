<template>
  <view class="person-desgin">
    <view class="header">
      <view class="header-image">
        <image :src="personData.avatar" mode="aspectFill"></image>
        <i
          class="icon icon-ic_nan"
          v-if="personId!=0&&personData.gender===1"
        ></i>
        <i
          class="icon icon-ic_nv"
          v-if="personId!=0&&personData.gender===2"
        ></i>
      </view>

      <view class="header-right">
        <view class="header-right-top">
          <view class="list-item">
            <text class="num">{{personData.caseCount||0}} <text
                class="unit"
                v-if="personData.caseCount.split('.')[1]"
              >w</text></text>
          
            <text class="title">作品</text>
          </view>
          <view class="list-item">
            <text class="num">{{personData.collectLikeNum||0}} <text
                class="unit"
                v-if="personData.collectLikeNum.split('.')[1]"
              >w</text></text>
          
            <text class="title">获赞与收藏</text>
          </view>
          <view class="list-item">
            <text class="num">{{personData.fansCount||0}} <text
                class="unit"
                v-if="personData.fansCount.split('.')[1]"
              >w</text></text>
          
            <text class="title">粉丝数</text>
          </view>
          <view class="list-item">
            <text class="num">{{personData.totalNum||0}} <text
                class="unit"
                v-if="personData.totalNum.split('.')[1]"
              >w</text></text>
          
            <text class="title">服务次数</text>
          </view>
        </view>
        <view class="header-right-bottom">
          <view @click="sendMsg" class="to-msg">
            私信
          </view>
          <view
            class="attention"
            @click.stop="queryAttention(1001,'isAttention')"
            :class="{'already-attention':isAttention}"
          >
            <i
              class="icon-gerenzhuye_guanzhuic"
              v-if="!isAttention"
            ></i>
            {{isAttention?'已':''}}关注
          </view>
        </view>
      </view>
    </view>
    <view class="desgin-info">
      <view class="name-tag">
        <view class="name">
          {{personData.realName}}
        </view>

      </view>
      <view class="info-list">
        <!-- {{personData.gender===1?'男':'女'}} -->
        {{'居住地'+personData.liveAddress}}
        <text>|</text>
        {{personData.roleLevel?personData.roleLevel:''}}设计师 
        <text v-if="personData.praiseRate">|</text>
        {{personData.praiseRate?'好评率'+personData.praiseRate:''}}
        <text v-if="personData.industryYearsStr">|</text>
        {{personData.industryYearsStr?personData.industryYearsStr:''}}
      </view>
      <view class="introduce">
        <view class="item" @click="openPopup" v-if="personData.personAllBadgeVO.skillBadges.length||personData.personAllBadgeVO.basicBadges.length">
          <i class='icon-a-homepage_Thebadge icon'></i>
          <text class="tag-tip">Ta的徽章</text>
          <view class="tag">
            <image v-for="(item,index) in personData.personAllBadgeVO.basicBadges" :key='item.badgeId' :src="item.ico" mode=""></image>
            <image v-for="(item,index) in personData.personAllBadgeVO.skillBadges" :key='item.badgeId' :src="item.ico" mode=""></image>
          </view>
          <i class="icon-alert_notice_jump"></i>
        </view>
        <view class="item" v-if="personData.designTags.length">
          <i class='icon-a-homepage_Goodat icon'></i>
          <view class="skill">
            <view class="skill-item" v-for="(item,index) of personData.designTags" :key='index'>
              {{item}}
            </view>
            
          </view>
        </view>
        <view class="item">
          <i class='icon-a-homepage_data icon'></i>
          <view class="msg-content introudc-msg" >
            <view class="report-text" :class="{'report-text-hidden':isHidden}">{{personData.intro||'这个设计师很忙，还没有填写个人简介'}}</view>
            <view class="openHidden" v-if="showBtn" @click="clickHidden">
              {{hddenText}}
            </view>
          </view>
        </view>

      </view>
      <view class="value-rank" :style="{'color':`#${item.fontColor}`}" v-for="(item,index) in rankData" :key='index' v-if="item.realNumber>0" @click="toRankList(item.name)">
        <text class="top-font">TOP.</text>
        <text class="num top-font">{{item.realNumber}}</text>
        <text class="rank-text">打扮家{{item.name}}榜单</text>
        <i class="icon-alert_notice_jump"></i>
        <image :src="item.styleImage" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  
  export default{
    props:{
      personData:{},
      rankData:{},
      isAttention:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        isHidden:false,
        hddenText:'查看全部',
        showBtn:false,
      }
    },
    mounted(){
      
      let query = uni.createSelectorQuery().in(this)
      this.$nextTick(function(){
        query.select(".report-text").boundingClientRect((res) => {
          console.log(1111)
          if(res){
            this.isHidden = res.height/20 >= 3;
            this.showBtn = res.height/20 >= 3;
          }
          // console.log(res)
          
          // console.log(res.height,this.isHidden)
          
        }).exec()
      })
    },
    methods:{
      // clickHidden(){
      //   
      // },
      queryAttention(data,from='attention'){
        this.$emit('queryAttention',data,from)
      },
      openPopup(){
        this.$emit('openPopup')
      },
      clickHidden(){
        this.isHidden = !this.isHidden
        this.hddenText = this.isHidden?'查看全部':'收起隐藏'
        let num = 0
        let query = uni.createSelectorQuery().in(this)
        this.$nextTick(function(){
          query.select(".person-desgin").boundingClientRect((res) => {
            console.log(res)
            num = res.height+129*2+40
            this.$emit('clickHidden',num)
            // console.log(res.height,this.isHidden)
            
          }).exec()
        })
      },
      sendMsg(){
        if(!this.isAttention){
          this.queryAttention(1001,'auto')
        }else{
          this.$emit('sendMsg')
        }
      },
      toRankList(data){
        
        uni.navigateTo({
          url:'/sub-home/pages/find-design/designer-rank-list?initTabName='+data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .person-desgin{
    padding: 0 32rpx;
    .header{
      display: flex;
      justify-content: space-between;
      image{
        width: 172rpx;
        height: 172rpx;
        border: 4rpx solid #fff;
        border-radius: 50%;
      }
      .header-image{
        position: relative;
        .icon {
          position: absolute;
          // width: 32rpx;
          // height: 32rpx;
          font-size: 32rpx;
          left: 128rpx;
          bottom: 10rpx;
          background-color: #fff;
          padding: 1px;
          border-radius: 50%;
        }
        .icon-ic_nan {
          color: #5196FF;
        }
        .icon-ic_nv {
          color: #FF56B1;
        }
      }
      .header-right{
        padding: 10rpx 10rpx;
        .header-right-top{
          display: flex;
          justify-content: center;
        }
        .list-item:last-child{
          margin-right: 0;
        }
        .list-item {
          margin-right: 48rpx;
          text {
            display: block;
          }
        
          .num {
            color: #fff;
            font-size: 28rpx;
            font-weight: normal;
            line-height: 42rpx;
            // text-align: ;
          }
          .unit {
            display: inline-block;
            font-size: 24rpx;
            font-weight: 500;
            color: #fff;
          }
          .title {
            font-size: 20rpx;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.49);;
            
          }
        }
        .header-right-bottom{
          margin-top: 32rpx;
          display: flex;
          .to-msg{
            color: #fff;
            font-size: 28rpx;
            width: 122rpx;
            height: 64rpx;
            text-align: center;
            line-height: 64rpx;
            border: 2rpx solid rgba(255, 255, 255, 0.35);
            border-radius: 12rpx;
            margin-right: 24rpx;
          }
          .attention{
            width: 328rpx;
            height: 64rpx;
            background-color: #fff;
            color: #222;
            border-radius: 12rpx;
            line-height: 64rpx;
            text-align: center;
            i{
              display: inline-block;
            }
          }
          .already-attention{
            background: rgba(255, 255, 255, 0.4);
            color: #fff;
          }
        }
      }
    }
    .desgin-info{
      margin-top: 16rpx;
      .name-tag{
        display: flex;
        .name{
          font-size: 44rpx;
          font-weight: 500;
          color: #fff;
          margin-right: 24rpx;
          max-width: 440rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

      }
      .introduce{
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);;
        .item{
          display: flex;
          margin-bottom: 24rpx;
          .icon{
            color: #fff;
            margin-right: 12rpx;
            // margin-top: 6rpx;
            line-height: 42rpx;
            font-size: 20rpx;
          }
          .icon-a-homepage_data{
            margin-top: 4rpx;
          }
          .tag-tip{
            color: #fff;
            opacity: 0.8;
            font-size: 22rpx;
            margin-right: 12rpx;
            line-height: 40rpx;
          }
          .icon-alert_notice_jump{
            color: #fff;
            opacity: 0.8;
            font-size: 24rpx;
            line-height: 40rpx;
          }
        }
        .tag{
          display: flex;
          align-items: center;
          image{
            width: 32rpx;
            height: 32rpx;
            margin-right: 12rpx;
          }
        }
      }
      .info-list{
        font-size: 20rpx;
        color: rgba(255, 255, 255, 0.6);;
        margin-bottom: 24rpx;
        text{
          display: inline-block;
          margin: 0 8rpx;
        }
      }
      .skill{
        display: flex;
        // margin-bottom: 22rpx;
        flex-wrap: wrap;
        .skill-item{
          background: rgba(255, 255, 255, 0.05);
          border: 0.5px solid rgba(255, 255, 255, 0.13);
          border-radius: 3px;
          // width: 64rpx;
          padding: 0 12rpx;
          height: 34rpx;
          text-align: center;
          line-height: 34rpx;
          margin-right: 12rpx;
          color: #fff;
          opacity: 0.6;
          font-size: 20rpx;
          margin-bottom: 10rpx;
        }
      }
      .msg-content{
        // margin-bottom: 30rpx;
        .report-text {
          color: #fff;
          font-size: 26rpx;
          font-weight: 400;
          letter-spacing: 0.2px;
          width: 100%;
          line-height: 42rpx;
          word-break: break-word;
          display: inline-block;
          opacity: 0.6;
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
    }
    .value-rank{
      margin: 32rpx 0;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 26rpx;
      color: #865E41;
      position: relative;
      padding: 0 24rpx;
      text{
        z-index: 10;
        position: relative;
      }
      .rank-text{
        letter-spacing: 0.2px;
      }
      .num{
        margin: 0 54rpx 0 8rpx;
        font-size: 28rpx;
        font-weight: bold;
      }
      i{
        position: relative;
        z-index: 10;
        margin-left: 8rpx;
        font-size: 20rpx;
        display: inline-block;
      }
      image{
        position: absolute;
        left: 0;
        top: 0;
        height: 60rpx;
        width: 100%;
      }
    }
  }
</style>
