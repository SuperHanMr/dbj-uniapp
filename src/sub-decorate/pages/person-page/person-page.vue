<template>
  <view class="person-page">
    <image class="bg-index" mode="aspectFit" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/person_bg.png">
    </image>
    <view class="back" @click="back">
      <i class="icon-ic_cancel_white"></i>
    </view>
    <view class="nav-header" :style="[navStyle]">
      <view class="item special-item" @click="back">
        <i class="icon-ic_cancel_white header-back"></i>
        <!-- <image class="header-back"></image> -->
      </view>
      <view class="item nav-header-msg">
        <image class="avatar" :src="personData.avatar" mode="aspectFill" ></image>
        <text>{{personData.roleId>=1&&personData.roleId<7?personData.realName:personData.nickName}}</text>
      </view>
      <view class="item "></view>
    </view>
    <view class="person-page-content">
      <view class="person-msg" :class="{'is-self':personData.roleId === 10000}">
        <view class="person-msg-top" :class="{'is-self':personData.roleId === 10000}">
          <view class="person-msg-header">
            <view class="person-msg-header-image">
              <image class="avatar" :src="personData.avatar" mode="aspectFill" ></image>
              <i class="icon icon-ic_nan" v-if="personData.gender===1"></i>
              <i class="icon icon-ic_nv" v-else></i>
            </view>
            <text class="name">{{personData.roleId>=1&&personData.roleId<7?personData.realName:personData.nickName}}</text>
            <view class="label">
              <text class="job" v-if="personData.roleId!==10000">{{personData.roleId===3?personData.personAllBadgeVO.skillBadges[0].name:personData.roleName}}</text>
              <text class="rate" v-if="personData.roleId<7&&personData.praiseRate">好评率{{personData.praiseRate}}</text>
            </view>
          </view>
          <view class="btn" v-if="personData.roleId<7">
          <view class="recommend" @click="attentionSure(2001)" :class="{'already-recommend':isRecommend}">
              <i class="icon-gerenzhuye_youxiantuijianic" v-if="!isRecommend"></i>
              {{isRecommend?'已':''}}优先推荐
            </view>
            <view class="attention" @click="queryAttention(1001)" :class="{'already-attention':isAttention}">
              <i class="icon-gerenzhuye_guanzhuic" v-if="!isAttention"></i>
              {{isAttention?'已':''}}关注
            </view>
          </view>
          <view class="person-msg-list" v-if="personData.roleId<7">
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
        <personIntroduce v-if="personData.roleId!==10000" :personData='personData'></personIntroduce>
        <view class="send-msg" @click="sendMsg" v-if="personData.roleId<7&&hasServe!==0">
          <i class="icon-gerenzhuye_ic_faxiaoxi"></i>
          <text>发消息</text>
          
        </view>
      </view>
      <view class="person-interact" v-if="personData.roleId<7&&personData.roleId!=6" :class="{'person-interact-active':interactActive+10 >  interact }">
        <view class="sticky">
          <view class="item" v-if="personData.roleId===1" :class="{'item-active':currentItem==='serviceTop'}" @click="toItem('serviceTop')">
            服务</view>
          <view class="item" v-if="personData.roleId===1||personData.roleId===2" :class="{'item-active':currentItem==='caseTop'}" @click="toItem('caseTop')">
            案例</view>
          <view class="item" v-if="personData.roleId===3||personData.roleId===4||personData.roleId===5" :class="{'item-active':currentItem==='dynamicTop'}" @click="toItem('dynamicTop')">
            动态</view>
          <view class="item" :class="{'item-active':currentItem==='evaluateTop'}" @click="toItem('evaluateTop')">
            评价<text v-if="evaluateNum">{{evaluateNum}}</text></view>
        </view>
      </view>
      <view class="content" v-if="personData.roleId<7">
        <personService ref='service' v-if="personData.roleId===1" :serviceData='serviceData'></personService>
        <view class="interval" v-if="personData.roleId===1"></view>
        <personCase ref='case' :personId='personId' class="person-case" v-if="personData.roleId===1||personData.roleId===2"></personCase>
        <personDynamic ref='dynamic' :personId='personId' class="person-dynamic" v-if="personData.roleId===3||personData.roleId===4||personData.roleId===5"></personDynamic>
        <view class="interval"></view>
        <personEvaluate ref='evaluate' :personId='personId' class="person-evaluate" @getEvaluate='getEvaluate'></personEvaluate>
      </view>
    </view>
    <view class="person-self" v-if="personData.roleId===10000">
      <image></image>
      <text>暂无内容</text>
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
    getServiceStatus
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
          totalNum:'0',
          roleId:0
        },
        currentItem: 'serviceTop',
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
        evaluateNum:0,
        userType:2,
        hasServe:0
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
      // console.log(this.$refs.service,this.$refs.service.isOpen)
      this.getSkuList()
      
      
      this.$refs.case&&this.$refs.case.cleanPage()
      this.$refs.case&&this.$refs.case.getList()
      // console.log(this.$refs)
      this.$refs.dynamic&&this.$refs.dynamic.requestDynamic()
      this.$refs.evaluate.getComments()
      
    },
    onLoad(e){
      this.userType = e.userType
      this.personId = e.personId||7249
      // this.getGrabDetail()
    },
    onShow(){
      // console.log(111)
      this.$refs.dynamic&&this.$refs.dynamic.requestDynamic()
    },
    mounted() {
      // this.getCaseList()
      // this.getSkuList()
      // this.getNodeHeight()
      
      this.init()
    },
    onPageScroll(scrollTop) {
      
      this.pageScroll(scrollTop.scrollTop)
    },
    methods: {
      init(){
        // this.getCaseList()
        this.getSkuList()
        this.getGrabDetail()
        
      },
      pageScroll(scrollTop){
        this.scrollTop = scrollTop
        this.changeOpacity(this.scrollTop)
        this.getTopDistance()
        if(this.personData.roleId===1){
          
          this.currentItem = this.serviceTop<=130&&this.caseTop>130?'serviceTop':this.caseTop<=130&&this.evaluateTop>130?'caseTop':''
          if(this.interact>100||this.interact === 0){
            // console.log(this.interact)
            this.currentItem = 'serviceTop'
          }
        }else if(this.personData.roleId===2){
          this.currentItem = this.caseTop<=130&&this.evaluateTop>130?'caseTop':''
          if(this.interact>100||this.interact === 0){
            this.currentItem = 'caseTop'
          }
        }else{
          this.currentItem = this.dynamicTop<=130&&this.evaluateTop>130?'dynamicTop':''
          if(this.interact>100||this.interact === 0){
            this.currentItem = 'dynamicTop'
          }
        }
        // console.log(this.interact,this.evaluateTop)
        if(this.interact!==0&&this.evaluateTop<130){
          this.currentItem = 'evaluateTop'
        }
      },
      getAttention(routeId,type){
        let data = {
          subBizType:this.personData.roleId,
          routeId:routeId,
          relationId:this.personData.zeusId,
        }
        getAttention(data).then(res=>{
          
          this[type] = res
          console.log(res,type)
        })
      },
      attentionSure(routeId){
        
        if(this.isRecommend){
          uni.showModal({
            title:"您确定要取消该优先推荐吗？",
            content: "取消后您购买服务将不会优先推荐该服务者",
            confirmText:"确定取消",
            cancelText:"暂不",
            success: (res) => {
              if (res.confirm) {
                this.queryAttention(routeId)
                return
              }
            },
          });
        }else{
          this.queryAttention(routeId)
        }
        
      },
      queryAttention(routeId){
        let data = {
          subBizType:this.personData.roleId,
          routeId:routeId,
          relationId:this.personData.zeusId,
          authorId:-1,
          equipmentId:uni.getSystemInfoSync().deviceId,
          userType:this.userType
        }
        queryAttention(data).then(res=>{
          if(routeId === 2001){
            if(this.isRecommend){
              this.personData.fansCount = this.personData.fansCount-- +''
            }else{
              console.log(this.personData.fansCount)
              this.personData.fansCount = this.personData.fansCount++ +''
              console.log(this.personData.fansCount)
            }
            this.isRecommend = !this.isRecommend 
            
          }else{
            if(this.isAttention){
              this.personData.recommendCount = this.personData.recommendCount +''
              
            }else{
              this.personData.recommendCount = this.personData.recommendCount++ +''
            }
            this.isAttention = !this.isAttention
            
          }
          

          
          if(routeId === 2001&&this.isRecommend){
            uni.showToast({
              title:"购买服务后，将为您优先推荐该服务者",
              icon:"none"
            })
          }
        })
      },
      getGrabDetail(){
        getGrabDetail(this.personId).then(res=>{
          if(res){
            // this.personData.roleId = 3
            res.totalNum = unitChange(res.inServiceCount+res.comServiceCount)
            // this.personData.totalNum = '1.0'
            res.likeCount = unitChange(res.likeCount)
            res.fansCount = unitChange(res.fansCount)
            res.recommendCount = unitChange(res.recommendCount)
            res.collectCount = unitChange(res.collectCount)
            this.personData = res
            if(!this.personData.roleId){
              this.personData.roleId = 10000
              return
            }
            this.getAttention(1001,'isAttention')
            this.getAttention(2001,'isRecommend')
            this.getServiceStatus()
            setTimeout(()=>{
              this.getNodeHeight()
              this.getTopDistance()
              this.pageScroll(0)
            },1000)
          }else{
            // this.personData = getApp().globalData.userInfo
            // console.log(this.personData)
            
          }
        })
      },
      getServiceStatus(){
        getServiceStatus(this.personData.zeusId).then(res=>{
          this.hasServe = res.status||res.ststus
        })
      },
      // getCaseList() {
      //   // getCaseList().then(res => {
        
      //   // })
      // },
      changeOpacity(num){
        num<10?this.opacityNum = 0:num<20?this.opacityNum=0.2:num<40?this.opacityNum=0.3:num<60?this.opacityNum=0.4:num<80?this.opacityNum=0.5:num<100?this.opacityNum=0.6:num<120?this.opacityNum=0.7:num<140?this.opacityNum=0.8:num<160?this.opacityNum=0.9:this.opacityNum=1
        // console.log(this.opacityNum)
      },
      toItem(name) {
        this.currentItem = name
        
        uni.pageScrollTo({
          duration: 100, // 过渡时间
          scrollTop: this[name] + this.scrollTop -115, // 滚动的实际距离
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
          if(this.$refs.service){
            this.$refs.service.isOpen = true
            this.$refs.service.open()
          }
        })
      },
      getEvaluate(num){
        
        this.evaluateNum = num
      },
      sendMsg(){
        this.$store.dispatch("openC2CConversation", {
          id:this.personId,
        })
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
    // height: 100%;
    .bg-index {
      top: -70rpx;
      width: 100%;
      height: 480rpx;
      position: absolute;
    }
    .back {
      position: absolute;
      left: 32rpx;
      width: 64rpx;
      height: 64rpx;
      // background: #000000;
      border-radius: 26rpx;
      // opacity: 0.2;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      i {
        width: 32rpx;
        height: 32rpx;
        color: #fff;
      }
    }
  }

  .person-page-content {
    position: relative;
    top: 28rpx;
    background: #fff;
  }
  view .is-self{
    border-bottom: none !important;
    box-shadow: none;
  }
  .person-msg {
    // width: calc(100% - 32px);
    background-color: #fff;
    border-radius: 32rpx 32rpx 0px 0px;
    box-shadow: 0px 26rpx 34rpx 0px rgba(3, 65, 63, 0.03);
    padding: 226rpx 32rpx 24rpx;
    
    .send-msg{
      height: 104rpx;
      background: rgba(0, 191, 182, 0.07);
      border-radius: 16rpx;
      border: 0.5px solid rgba(0, 191, 182, 0.2);
      text-align: center;
      line-height: 104rpx;
      color: #00BFB6;
      font-size: 28rpx;
      font-weight: 500;
      

      i{
        font-size: 48rpx;
        width: 48rpx;
        height: 48rpx;
        margin-right: 8rpx;
        display: inline-block;
        vertical-align: middle;
      }
      text{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .person-msg-top {
      border-bottom: 0.5px solid #F3F3F3;
    }

    .person-msg-header {
      position: absolute;
      top: -40rpx;

      .person-msg-header-image {
        position: relative;
        // height: 140rpx;

        .avatar {
          width: 140rpx;
          height: 140rpx;
          border-radius: 50%;
          // background-color: #eee;
          background-size: contain;
        }

        .icon {
          position: absolute;
          // width: 32rpx;
          // height: 32rpx;
          font-size: 32rpx;
          left: 108rpx;
          bottom: 0;
          // background-color: #00C2B2;
        }
        .icon-ic_nan{
          color: #619EE9;
        }
        .icon-ic_nv{
          color: #E96197;
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
          background: linear-gradient(90deg,#40bff5, #53a9ff);
          padding: 0 16rpx;
          border-radius: 6rpx;
        }

        .rate {
          padding: 0 8rpx;
          background: #EAFCFB;
          border-radius: 6px;
          color: #00BFB6;
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
        // width: 86rpx;
        height: 64rpx;
        border-radius: 12rpx;
        border: 0.5px solid #00BFB6;
        color: #00BFB6;
        line-height: 64rpx;
        padding: 0 18rpx;
        font-size: 28rpx;
        font-size: 400;
        i{
          display: inline-block;
          margin-right: 8rpx;
        }
      }
      .already-attention{
        color: #666;
        background: #F7F7F7;
        border: none;
      }
      .recommend {
        // width: 146rpx;
        height: 64rpx;
        background: linear-gradient(135deg, #00BFAF 0%, #00BFBC 100%);
        border-radius: 12rpx;
        margin-right: 24rpx;
        line-height: 64rpx;
        padding: 0 22rpx;
        font-size: 28rpx;
        color: #fff;
        font-size: 400;
        i{
          display: inline-block;
          margin-right: 14rpx;
        }
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
    .special-item{
      width: 33%;
    }
    .item {
      // flex: 1;
      // display: flex;
      // align-items: center;
      .header-back {
        width: 82rpx;
        height: 82rpx;
        // background-color: #eee;
        color: #000;
        line-height: 82rpx;
        text-align: center;
      }
    }

    .nav-header-msg {
      height: 48rpx;
      line-height: 48rpx;
      max-width: 324rpx;
      flex: 1;
      .avatar {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        // background-color: #00BFAF;
        margin-right: 24rpx;
        background-size: contain;
        display: inline-block;
        vertical-align: top;
      }

      text {
        width: 242rpx;
        font-weight: 500;
        color: #111111;
        font-size: 28rpx;
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      border-bottom: 0.5px solid #EFEFEF;

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
  .person-self{
    width: 100%;
    image{
      width: 100%;
      height: 640rpx;
      background-color: #eee;
      margin-bottom: 20rpx;
    }
    text{
      display: block;
      width: 100%;
      text-align: center;
      font-size: 28rpx;
      color: #999;
    }
  }
  .person-interact-active{
    background-color: #fff;
    z-index: 1;
  }
  .interval{
    width: 100%;
    height: 16rpx;
    background: #F5F6F6;
  }
</style>
