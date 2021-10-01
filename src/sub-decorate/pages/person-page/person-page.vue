<template>
  <view class="person-page">
    <image class="bg-index" mode="aspectFit" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/bg@2x.png">
    </image>
    <view class="back" @click="back">
      <image></image>
    </view>
    <view class="nav-header" :style="[navStyle]">
      <view class="item" @click="back">
        <image class="header-back"></image>
      </view>
      <view class="item nav-header-msg">
        <image :src="personData.avatar" mode=""></image>
        <text>{{personData.nickName}}</text>
      </view>
      <view class="item"></view>
    </view>
    <view class="person-page-content">
      <view class="person-msg">
        <view class="person-msg-top">
          <view class="person-msg-header">
            <view class="person-msg-header-image">
              <image class="avatar" :src="personData.avatar" ></image>
              <image class="icon" v-if="personData.gender===1"></image>
              <image class="icon" v-else></image>
            </view>
            <text class="name">{{personData.nickName}}</text>
            <view class="label">
              <text class="job">{{personData.roleId===3?personData.personAllBadgeVO.skillBadges[0].name:personData.roleName}}</text>
              <text class="rate">好评率{{personData.praiseRate||0}}</text>
            </view>
          </view>
          <view class="btn">
          <view class="recommend" @click="queryAttention(2001)" :class="{'already-recommend':isRecommend}">
              <image v-if="!isRecommend"></image>
              {{isRecommend?'已':''}}优先推荐
            </view>
            <view class="attention" @click="queryAttention(1001)" :class="{'already-attention':isAttention}">
              <image v-if="!isAttention"></image>
              {{isAttention?'已':''}}关注
            </view>
          </view>
          <view class="person-msg-list">
            <view class="list-item">
              <text class="num">{{personData.likeCount||0}} <text class="unit" v-if="personData.likeCount.split('.')[1]">w</text></text>
              <text class="title">获赞</text>
            </view>
            <view class="list-item">
              <text class="num">{{personData.fansCount||0}} <text class="unit" v-if="personData.fansCount.split('.')[1]">w</text></text>
              <text class="title">粉丝</text>
            </view>
            <view class="list-item" v-if="personData.roleId===1||personData.roleId===2||personData.roleId===6">
              <text class="num">{{personData.collectCount||0}} <text class="unit" v-if="personData.collectCount.split('.')[1]">w</text></text>
              <text class="title">被收藏</text>
            </view>
            <view class="list-item">
              <text class="num">{{personData.recommendCount||0}} <text class="unit" v-if="personData.recommendCount.split('.')[1]">w</text></text>
              <text class="title">被推荐</text>
            </view>
            <view class="list-item">
              <text class="num">{{personData.totalNum||0}} <text class="unit" v-if="personData.totalNum.split('.')[1]">w</text></text>
             
              <text class="title">总接单</text>
            </view>
          </view>
        </view>
        <personIntroduce :personData='personData'></personIntroduce>
        <view class="send-msg" @click="sendMsg">
          <image src="" mode=""></image>
          发消息
        </view>
      </view>
      <view class="person-interact" :class="{'person-interact-active':interactActive === interact}">
        <view class="sticky">
          <view class="item" v-if="personData.roleId===1||personData.roleId===6" :class="{'item-active':currentItem==='serviceTop'}" @click="toItem('serviceTop')">
            服务</view>
          <view class="item" v-if="personData.roleId===1||personData.roleId===2||personData.roleId===6" :class="{'item-active':currentItem==='caseTop'}" @click="toItem('caseTop')">
            案例</view>
          <view class="item" v-if="personData.roleId===3||personData.roleId===4||personData.roleId===5" :class="{'item-active':currentItem==='dynamicTop'}" @click="toItem('dynamicTop')">
            动态</view>
          <view class="item" :class="{'item-active':currentItem==='evaluateTop'}" @click="toItem('evaluateTop')">
            评价<text>{{evaluateNum}}</text></view>
        </view>
      </view>
      <view class="content">
        <personService ref='service' v-if="personData.roleId===1||personData.roleId===6" :serviceData='serviceData'></personService>
        <personCase ref='case' :personId='personId' class="person-case" v-if="personData.roleId===1||personData.roleId===2||personData.roleId===6"></personCase>
        <personDynamic ref='dynamic' :personId='personId' class="person-dynamic" v-if="personData.roleId===3||personData.roleId===4||personData.roleId===5"></personDynamic>
        <personEvaluate ref='evaluate' :personId='personId' class="person-evaluate" @getEvaluate='getEvaluate'></personEvaluate>
      </view>
    </view>
  </view>
</template>

<script>
  import personIntroduce from './components/person-introduce.vue'
  import personService from './components/person-service.vue'
  import personEvaluate from './components/person-evaluate.vue'
  import personCase from './components/person-case.vue'
  import personDynamic from './components/person-dynamic.vue'
  import {unitChange } from '@/utils/util.js'
  import {
    getSkuList,
    getGrabDetail,
    queryAttention,
    getAttention,
  } from '@/api/decorate.js'
  export default {
    components: {
      personIntroduce,
      personService,
      personEvaluate,
      personCase,
      personDynamic
    },
    data() {
      return {
        opacityNum:0,
        personData:{
          likeCount:'0',
          fansCount:'0',
          recommendCount:'0',
          collectCount:'0',
          totalNum:'0'
        },
        currentItem: 'service',
        scrollTop:0,
        interact:0,
        interactActive:false,
        serviceTop:0,
        caseTop:0,
        dynamicTop:0,
        evaluateTop:0,
        personId:0,
        serviceData:[],
        isRecommend:false,
        isAttention:false,
        evaluateNum:0
      }
    },
    computed:{
      navStyle(){
        return {
          opacity: this.opacityNum,
          
        }
      }
    },
    onPullDownRefresh() {
      this.init();
      this.$refs.case&&this.$refs.case.getList()
      this.$refs.case&&this.$refs.case.cleanPage()
      // console.log(this.$refs)
      this.$refs.dynamic&&this.$refs.dynamic.requestDynamic()
      this.$refs.evaluate.getComments()
      
    },
    onLoad(e){
      this.personId = e.personId||6477
      // this.getGrabDetail()
    },
    onShow(){
      console.log(111)
    },
    mounted() {
      // this.getCaseList()
      // this.getSkuList()
      // this.getNodeHeight()
      this.init()
    },
    onPageScroll(scrollTop) {
      // console.log(scrollTop.scrollTop)
      this.scrollTop = scrollTop.scrollTop
      this.changeOpacity(scrollTop.scrollTop)
      this.getTopDistance()
      
      // this.currentItem = this.serviceTop<=130&&(this.caseTop>130||this.caseTop===null)?'serviceTop':this.caseTop<=130&&(this.dynamicTop>130||this.dynamicTop===null)?'caseTop':this.dynamicTop<=130&&this.evaluateTop>130?'dynamicTop':'evaluateTop'
      if(this.personData.roleId===1||this.personData.roleId===6){
        this.currentItem = this.serviceTop<=130&&this.caseTop>130?'serviceTop':this.caseTop<=130&&this.evaluateTop>130?'caseTop':''
      }else if(this.personData.roleId===2){
        this.currentItem = this.caseTop<=130&&this.evaluateTop>130?'caseTop':''
      }else{
        this.currentItem = this.dynamicTop<=130&&this.evaluateTop>130?'dynamicTop':''
      }
      if(this.evaluateTop<130){
        this.currentItem = 'evaluateTop'
      }
    },
    methods: {
      init(){
        // this.getCaseList()
        this.getSkuList()
        this.getNodeHeight()
        this.getTopDistance()
        this.getGrabDetail()
        
      },
      getAttention(routeId,type){
        let data = {
          subBizType:this.personData.roleId,
          routeId:routeId,
          relationId:this.personData.zeusId,
        }
        getAttention(data).then(res=>{
          this[type] = res
        })
      },
      queryAttention(routeId){
        let data = {
          subBizType:this.personData.roleId,
          routeId:routeId,
          relationId:this.personData.zeusId,
          authorId:-1,
          equipmentId:uni.getSystemInfoSync().deviceId
        }
        queryAttention(data).then(res=>{
          this.init()
        })
      },
      getGrabDetail(){
        getGrabDetail(this.personId).then(res=>{
          
          // this.personData.roleId = 3
          res.totalNum = unitChange(res.inServiceCount+res.comServiceCount)
          // this.personData.totalNum = '1.0'
          res.likeCount = unitChange(res.likeCount)
          res.fansCount = unitChange(res.fansCount)
          res.recommendCount = unitChange(res.recommendCount)
          res.collectCount = unitChange(res.collectCount)
          this.personData = res
          console.log(this.personData)
          // this.personData.totalNum = unitChange(19999)
          // if(this.personData.totalNum>10000){
          //   this.personData.totalNum = 
          // }
          this.getAttention(1001,'isAttention')
          this.getAttention(2001,'isRecommend')
          
        })
      },
      // getCaseList() {
      //   // getCaseList().then(res => {
        
      //   // })
      // },
      changeOpacity(num){
        num<10?this.opacityNum = 0:num<40?this.opacityNum=0.2:num<80?this.opacityNum=0.4:num<120?this.opacityNum=0.6:num<160?this.opacityNum=0.8:this.opacityNum=1
        // console.log(this.opacityNum)
      },
      toItem(name) {
        this.currentItem = name
        uni.pageScrollTo({
          duration: 100, // 过渡时间
          scrollTop: this[name] + this.scrollTop -124, // 滚动的实际距离
        })
      },
      getNodeHeight(){
        let query = uni.createSelectorQuery()
        query.select(".nav-header").boundingClientRect((data) => {
          this.interactActive = data.height
        }).exec()
      },
      getTopDistance(){
        let query = uni.createSelectorQuery()
        query.select(".person-interact").boundingClientRect((res) => {
          this.interact = res&&res.top
        }).exec()
        query.select(".content").boundingClientRect((res) => {
          this.serviceTop = res&&res.top
        }).exec()
        query.select(".person-case").boundingClientRect((res) => {
          this.caseTop = res&&res.top
        }).exec()
        query.select(".person-dynamic").boundingClientRect((res) => {
          this.dynamicTop = res&&res.top
        }).exec()
        query.select(".person-evaluate").boundingClientRect((res) => {
          this.evaluateTop = res&&res.top
        }).exec()
        
      },
      back(){
        uni.navigateBack({
          
        })
      },
      getSkuList(){
        let data = {
          relationId:this.personId,
          relationType:7,
          page:1,
          row:10000,
          spuIsEnabled:1,
          skuIsEnabled:1
        }
        getSkuList(data).then(res=>{
          this.serviceData = res
        })
      },
      getEvaluate(num){
        console.log(num)
        this.evaluateNum = num
      },
      sendMsg(){
        this.$store.dispatch("openC2CConversation", this.personId);

      }
    }
  }
</script>

<style lang="scss" scoped>
  .person-page {
    position: relative;
    padding-top: 98rpx;
    box-sizing: border-box;
    background-color: #fff;
    padding-bottom: 40rpx;
    .bg-index {
      top: 0;
      width: 100%;
      height: 480rpx;
      position: absolute;
    }
    .back {
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
      z-index: 2;
      image {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }

  .person-page-content {
    position: relative;
    top: 28rpx;
  }

  .person-msg {
    // width: calc(100% - 32px);
    background-color: #fff;
    border-radius: 32rpx 32rpx 0px 0px;
    box-shadow: 0px 26rpx 34rpx 0px rgba(3, 65, 63, 0.03);
    padding: 226rpx 32rpx 0;
    .send-msg{
      height: 104rpx;
      background: rgba(0, 191, 182, 0.07);
      border-radius: 16px;
      border: 1px solid rgba(0, 191, 182, 0.2);
      text-align: center;
      line-height: 104rpx;
      color: #00BFB6;
      font-size: 28rpx;
      font-weight: 500;
      image{
        width: 28rpx;
        height: 28rpx;
        margin-right: 16rpx;
      }
    }
    .person-msg-top {
      border-bottom: 1px solid #F3F3F3;
    }

    .person-msg-header {
      position: absolute;
      top: -40rpx;

      .person-msg-header-image {
        position: relative;
        height: 140rpx;

        .avatar {
          width: 140rpx;
          height: 140rpx;
          border-radius: 50%;
          background-color: #eee;

        }

        .icon {
          position: absolute;
          width: 32rpx;
          height: 32rpx;
          left: 108rpx;
          bottom: 0;
          background-color: #00C2B2;
        }
      }

      .name {
        font-size: 44rpx;
        font-weight: 500;
        color: #111;
        line-height: 60rpx;
        margin: 12rpx 0;
      }

      .label {
        text {
          display: inline-block;
          margin-right: 16rpx;
          height: 36rpx;
          line-height: 36rpx;
          text-align: center;
          font-size: 22rpx;
        }

        .job {
          color: #FFFFFF;
          background: linear-gradient(135deg, #40AFF5 0%, #4C95F1 100%);
          padding: 0 16rpx;
          border-radius: 6rpx;
        }

        .rate {
          padding: 0 8rpx;
          background: #E8F7EF;
          border-radius: 6px;
          color: #21C091;
          border-radius: 6rpx;
        }
      }
    }

    .btn {
      position: absolute;
      top: 36rpx;
      right: 32rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      image {
        width: 20rpx;
        height: 20rpx;
        display: inline-block;
        background-color: #eee;
        margin-right: 8rpx;
      }

      .attention {
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
      .already-attention{
        color: #666;
        background: #F7F7F7;
        border: none;
      }
      .recommend {
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
      .already-recommend{
        color: #666;
        background: #F7F7F7;
      }
    }

    .person-msg-list {
      // margin-top: 216rpx;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
      height: 104rpx;
      align-items: center;
      margin-bottom: 28rpx;

      .list-item {
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: center;
        margin-right: 48rpx;

        text {
          display: block;
        }

        .num {
          color: #333;
          font-size: 40rpx;
          font-weight: 400;
          line-height: 42rpx;
          // text-align: ;
        }
        .unit{
          display: inline-block;
          font-size: 24rpx;
          font-weight: 500;
          color: #333333;
        }
        .title {
          font-size: 24rpx;
          font-weight: 400;
          color: #999;
          background-color: #fff;
        }
      }
    }
  }
 
  .nav-header {
    position: sticky;
    padding-top: 98rpx;
    top: 0;
    width: 100%;
    height: 88rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0;
    z-index: 1;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      .header-back {
        width: 82rpx;
        height: 82rpx;
        background-color: #eee;
      }
    }

    .nav-header-msg {
      height: 48rpx;
      line-height: 48rpx;
      
      image {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        background-color: #00BFAF;
        margin-right: 24rpx;
      }

      text {
        font-weight: 500;
        color: #111111;
        font-size: 28rpx;
        display: inline-block;
        vertical-align: top;
      }
    }

  }

  .person-interact {
    margin-top: 24rpx;
    position: sticky;
    top: 186rpx;
    // height: 200rpx;
    // background-color: ;
    .sticky {
      
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
  .person-interact-active{
    background-color: #fff;
    z-index: 1;
  }
  .content{
    
  }
</style>
