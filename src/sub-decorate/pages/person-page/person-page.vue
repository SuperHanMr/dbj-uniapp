<template>
  <view class="person-page">
    <image
      class="bg-index"
      :class="{'bg-design':personData.roleId===1}"
      :src="personData.roleId===1?personData.artImage:'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/person_bg.png'"
    >
    </image>
    <view class="mask" v-if="personData.roleId===1">
      
    </view>
    <view
      class="back"
      @click="back"
    >
      <i class="icon-ic_cancel_white"></i>
    </view>
    <view
      class="nav-header"
      :style="[navStyle]"
    >
      <view
        class="item special-item"
        @click="back"
      >
        <i class="icon-ic_cancel_white header-back"></i>
        <!-- <image class="header-back"></image> -->
      </view>
      <view class="item nav-header-msg">
        <view class="main">
          <image
            class="avatar"
            :src="personId!=0?personData.avatar:'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/bg_dbj.png'"
            mode="aspectFill"
          ></image>
          <text>{{personId!=0? (personData.roleId>=1&&personData.roleId<7?personData.realName:personData.nickName):'打扮家'}}</text>
        </view>
      </view>
      <view class="item "></view>
    </view>
    <view class="person-page-content" :class="{'person-page-content-dsgin':personData.roleId===1}">
      <personDesign
       :personData='personData'
       v-if="personData.roleId===1"
       @queryAttention='queryAttention'
       :isAttention='isAttention'
       @sendMsg='sendMsg'
       ></personDesign>
      <view
        class="person-msg"
        v-if="personData.roleId!==1"
        :class="{'is-self':personData.roleId === 10000}"
      >
        <view :class="{'is-self':personData.roleId === 10000,'person-msg-top':personId!=0}">
          <view class="person-msg-header">
            <view class="person-msg-header-image">
              <image
                class="avatar"
                :src="personId!=0?personData.avatar:'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/bg_dbj.png'"
                mode="aspectFill"
              ></image>
              <i
                class="icon icon-ic_nan"
                v-if="personId!=0&&personData.gender===1"
              ></i>
              <i
                class="icon icon-ic_nv"
                v-if="personId!=0&&personData.gender===2"
              ></i>
            </view>
            <text class="name">{{personId!=0?(personData.roleId>=1&&personData.roleId<7?personData.realName:personData.nickName):'打扮家'}}</text>
            <view class="label">
              <text
                class="job"
                v-if="personData.roleId!==10000"
              >{{personId!=0?(personData.roleId===3?personData.personAllBadgeVO.skillBadges[0].name:personData.roleName):'官方'}}</text>
              <text
                class="rate"
                v-if="personId!=0&&personData.roleId<7&&personData.praiseRate"
              >好评率{{personData.praiseRate}}</text>
            </view>
          </view>
          <view
            class="btn"
            v-if="personId!=0&&personData.roleId<7"
          >
            <view
              class="recommend"
              @click="attentionSure(2001)"
              :class="{'already-recommend':isRecommend}"
            >
              <i
                class="icon-gerenzhuye_youxiantuijianic"
                v-if="!isRecommend"
              ></i>
              {{isRecommend?'已':''}}优先推荐
            </view>
            <view
              class="attention"
              @click="queryAttention(1001)"
              :class="{'already-attention':isAttention}"
            >
              <i
                class="icon-gerenzhuye_guanzhuic"
                v-if="!isAttention"
              ></i>
              {{isAttention?'已':''}}关注
            </view>
          </view>
          <view
            class="person-msg-list"
            v-if="personId!=0"
          >
            <view
              class="list-item"
              v-if="personData.roleId<6"
            >
              <text class="num">{{personData.likeCount||0}} <text
                  class="unit"
                  v-if="personData.likeCount.split('.')[1]"
                >w</text></text>
              <text class="title">获赞</text>
            </view>
            <view class="list-item">
              <text class="num">{{personData.fansCount||0}} <text
                  class="unit"
                  v-if="personData.fansCount.split('.')[1]"
                >w</text></text>
              <text class="title">粉丝</text>
            </view>
            <view
              class="list-item"
              v-if="personData.roleId===1||personData.roleId===2"
            >
              <text class="num">{{personData.collectCount||0}} <text
                  class="unit"
                  v-if="personData.collectCount.split('.')[1]"
                >w</text></text>
              <text class="title">被收藏</text>
            </view>
            <view class="list-item">
              <text class="num">{{personData.recommendCount||0}} <text
                  class="unit"
                  v-if="personData.recommendCount.split('.')[1]"
                >w</text></text>
              <text class="title">被推荐</text>
            </view>
            <view class="list-item">
              <text class="num">{{personData.totalNum||0}} <text
                  class="unit"
                  v-if="personData.totalNum.split('.')[1]"
                >w</text></text>

              <text class="title">总接单</text>
            </view>
          </view>
        </view>
        <personIntroduce
          v-if="personId!=0&&personData.roleId!==10000"
          :personData='personData'
        ></personIntroduce>
        <view
          class="send-msg"
          @click="sendMsg"
          v-if="personData.roleId<7&&hasServe!==0"
        >
          <i class="icon-gerenzhuye_ic_faxiaoxi"></i>
          <text>发消息</text>

        </view>
      </view>
      <view
        class="person-interact"
        v-if="personId!=0&&personData.roleId<7&&personData.roleId!=6&&personData.roleId!=1"
        :class="{'person-interact-active':interactActive+10 >  interact }"
      >
        <view class="sticky" v-if="hasTwo">
          <view
            class="item"
            v-if="serviceEmpty&&personData.roleId===1"
            :class="{'item-active':currentItem==='serviceTop'}"
            @click="toItem('serviceTop')"
          >
            服务</view>
          <view
            class="item"
            v-if="caseEmpty&&(personData.roleId===1||personData.roleId===2)"
            :class="{'item-active':currentItem==='caseTop'}"
            @click="toItem('caseTop')"
          >
            案例</view>
          <view
            class="item"
            v-if="dynamicEmpty&&(personData.roleId===3||personData.roleId===4||personData.roleId===5)"
            :class="{'item-active':currentItem==='dynamicTop'}"
            @click="toItem('dynamicTop')"
          >
            动态</view>
          <view
            class="item"
            :class="{'item-active':currentItem==='evaluateTop'}"
            @click="toItem('evaluateTop')"
            v-if="evaluateEmpty"
          >
            评价<text v-if="evaluateNum">{{evaluateNum}}</text></view>
        </view>
      </view>
      <view
        class="content"
        v-if="personId!=0&&personData.roleId<7"
      >
        <personEvaluateDesign 
        :commentData='commentData'
        v-if="personData.roleId===1&&commentData.totalRows>0"
        @toEvaluateList='toEvaluateList'
         ></personEvaluateDesign>
        <view
          class="interval"
          v-if="commentData.totalRows>0&&commentEmpty&&personData.roleId===1"
        ></view>
        <personService
          ref='service'
          v-if="personData.roleId===1"
          :serviceData='serviceData'
          :isFirst='commentData.totalRows==0'
          :userId='personId'
          @contentEmpty='contentEmpty'
        ></personService>
        <view
          class="interval"
          v-if="serviceEmpty&&personData.roleId===1"
        ></view>
        <personCase
          ref='case'
          :personId='personId'
          class="person-case"
          @contentEmpty='contentEmpty'
          v-if="personData.roleId===1||personData.roleId===2"
        ></personCase>
        <view class="interval" v-if="caseEmpty&&dynamicEmpty"></view>
        <personDynamic
          ref='dynamic'
          :personId='personId'
          class="person-dynamic"
          @contentEmpty='contentEmpty'
          v-if="personData.roleId===3||personData.roleId===4||personData.roleId===5"
        ></personDynamic>
        <view class="interval" v-if="dynamicEmpty&&personData.roleId!==1"></view>
        <personEvaluate
          ref='evaluate'
          :personId='personId'
          v-if="personData.roleId!==1"
          class="person-evaluate"
          @contentEmpty='contentEmpty'
          @getEvaluate='getEvaluate'
        ></personEvaluate>
      </view>
    </view>
    <view
      class="person-self"
      v-if="personData.roleId===10000"
    >
      <image></image>
      <text>暂无内容</text>
    </view>
    <view
      class="person-dbj"
      v-if="personId==0"
    >
      <view class="header">
        <text>打扮家-家装BIM系统，国内互联网主流家装基础设施与服务的提供者。</text>
        <text>坚持以科技提升效益，用智慧创造美好的使命。</text>
        <text>为了实现用户“所想即所见，所见即所得，设计师更优、装企算得清”的终极目标，以打扮家BIM、AI等技术为基础为上下游产业链赋能，全面激活伙伴能力，打造全新的家装生态。</text>
      </view>

      <text class="title">在打扮家平台：</text>

      <view class="li">
        <text class="label">· 设计师</text>
        <text>打扮家超级平台的诞生，让设计只专注于设计成为可能。</text>
      </view>
      <view class="li">
        <text class="label">· 消费者</text>
        <text>强大的技术与坚守的服务宗旨将消费者省钱、省心、装的快的诉求一一实现。</text>
      </view>
      <view class="li">
        <text class="label">· 行业'</text>
        <text>促使行业走向标准化、平台化、模块化、智能化、生态化。</text>
      </view>
      <view class="li">
        <text class="label">· 工人、工长</text>
        <text>有尊严、有归属感，实现自我价值为目标，改变在大众心中的印象。</text>
      </view>
      <text class="title">三大服务体系：</text>
      <view class="li">
        <text class="label">· 设计服务体系</text>
        <text>基于BIM系统，为设计师提供不受地域限制、标准化的在线设计平台。为消费者提供设计、算量、方案、施工落地均透明的设计服务。</text>
      </view>
      <view class="li">
        <text class="label">· 选材服务体系</text>
        <text>利用技术建立集束型视频实时展示导购展厅，标准/非标材料线上展示线上选。</text>
      </view>
      <view class="li">
        <text class="label">· 施工服务体系</text>
        <text>利用AI算法，将为全国的施工现场进行标准化、无死角、低成本的直播服务。全国手艺人招募计划，科技教学，数字化变革为人才蓄力。</text>
      </view>
      <text class="title">打扮家 - 让用户家装更称心、更省心、更放心、更省钱最终达到真快乐的终极目标。</text>
    </view>
  </view>
</template>

<script>
import personIntroduce from "./components/person-introduce.vue";
import personService from "./components/person-service.vue";
import personEvaluate from "./components/person-evaluate.vue";
import personCase from "./components/person-case.vue";
import personDynamic from "./components/person-dynamic.vue";
import personDesign from "./components/person-design.vue"
import personEvaluateDesign from "./components/person-evaliate-design.vue";
import { unitChange } from "@/utils/util.js";
import {
  getSkuList,
  getGrabDetail,
  queryAttention,
  getAttention,
  getServiceStatus,
  getComments
} from "@/api/decorate.js";
var query = {};
export default {
  components: {
    personIntroduce,
    personService,
    personEvaluate,
    personCase,
    personDynamic,
    personDesign,
    personEvaluateDesign
  },
  data() {
    return {
      opacityNum: 0,
      personData: {
        likeCount: "0",
        fansCount: "0",
        recommendCount: "0",
        collectCount: "0",
        totalNum: "0",
        roleId: 0,
        designTags:[],
        personAllBadgeVO:{}
      },
      commentData:{},
      currentItem: "serviceTop",
      scrollTop: 0,
      interact: 0,
      interactActive: false,
      serviceTop: 0,
      caseTop: 0,
      dynamicTop: 0,
      evaluateTop: 0,
      personId: 0,
      serviceData: [],
      isRecommend: false,
      isAttention: false,
      evaluateNum: 0,
      userType: 2,
      hasServe: 0,
      caseEmpty:false,
      dynamicEmpty:false,
      evaluateEmpty:false,
      serviceEmpty:false,
      commentEmpty:true,
    };
  },
  computed: {
    navStyle() {
      return {
        opacity: this.opacityNum,
      };
    },
    hasTwo(){
      let i = 0
      switch(true){
        case this.serviceEmpty: i++; 
        case this.caseEmpty: i++;
        case this.dynamicEmpty: i++;
        case this.evaluateEmpty: i++;
      }
      return i>1?true:false
    }
  },
  onPullDownRefresh() {
    if (this.personId != 0) {
      this.init();
      // console.log(this.$refs.service,this.$refs.service.isOpen)
      this.getSkuList();

      this.$refs.case && this.$refs.case.cleanPage();
      this.$refs.case && this.$refs.case.getList();
      // console.log(this.$refs)
      this.$refs.dynamic && this.$refs.dynamic.requestDynamic();
      this.$refs.evaluate.getComments();
      uni.stopPullDownRefresh();
    } else {
      uni.stopPullDownRefresh();
    }
  },
  onLoad(e) {
    this.userType = e.userType;
    this.personId = e.personId || 7270;
    uni.showShareMenu();
    console.log(this.personId);
    // this.getGrabDetail()
  },
  onShow() {
    // console.log(111)
    if (this.personId != 0) {
      this.$refs.dynamic && this.$refs.dynamic.requestDynamic();
      this.init();
    }
  },
  mounted() {
    // this.getCaseList()
    // this.getSkuList()
    // this.getNodeHeight()
    query = uni.createSelectorQuery();
    query.select(".person-interact").boundingClientRect((res) => {
      this.interact = res && res.top;
    });
    query.select(".content").boundingClientRect((res) => {
      this.serviceTop = res && res.top;
    });
    query.select(".person-case").boundingClientRect((res) => {
      this.caseTop = res && res.top;
    });
    query.select(".person-dynamic").boundingClientRect((res) => {
      this.dynamicTop = res && res.top;
    });
    query.select(".person-evaluate").boundingClientRect((res) => {
      this.evaluateTop = res && res.top;
    });
    query.exec(function (res) {});
  },
  onPageScroll(scrollTop) {
    this.pageScroll(scrollTop.scrollTop);
  },
  methods: {
    init() {
      // this.getCaseList()
      this.getSkuList();
      this.getGrabDetail();
    },
    contentEmpty(name,value){
      console.log(name,value)
      this[name] = value
    },
    pageScroll(scrollTop) {
      this.scrollTop = scrollTop;
      scrollTop !== 0 && this.changeOpacity(this.scrollTop);
      this.getTopDistance();
      if (this.personData.roleId === 1) {
        this.currentItem =
          this.serviceTop <= 130 && this.caseTop > 130
            ? "serviceTop"
            : this.caseTop <= 130 && this.evaluateTop > 130
            ? "caseTop"
            : "";
        if (this.interact > 100 || this.interact === 0) {
          // console.log(this.interact)
          this.currentItem = "serviceTop";
        }
      } else if (this.personData.roleId === 2) {
        this.currentItem =
          this.caseTop <= 130 && this.evaluateTop > 130 ? "caseTop" : "";
        if (this.interact > 100 || this.interact === 0) {
          this.currentItem = "caseTop";
        }
      } else {
        this.currentItem =
          this.dynamicTop <= 130 && this.evaluateTop > 130 ? "dynamicTop" : "";
        if (this.interact > 100 || this.interact === 0) {
          this.currentItem = "dynamicTop";
        }
      }
      // console.log(this.interact,this.evaluateTop)
      if (this.interact !== 0 && this.evaluateTop < 130) {
        this.currentItem = "evaluateTop";
      }
    },
    //查询是否关注推荐
    getAttention(routeId, type) {
      let data = {
        subBizType: this.personData.roleId,
        routeId: routeId,
        relationId: this.personData.zeusId,
      };
      getAttention(data).then((res) => {
        this[type] = res;
      });
    },
    attentionSure(routeId) {
      if (this.isRecommend) {
        uni.showModal({
          title: "您确定要取消该优先推荐吗？",
          content: "取消后您购买服务将不会优先推荐该服务者",
          confirmText: "确定取消",
          cancelText: "暂不",
          success: (res) => {
            if (res.confirm) {
              this.queryAttention(routeId);
              return;
            }
          },
        });
      } else {
        this.queryAttention(routeId);
      }
    },
    queryAttention(routeId) {
      let data = {
        subBizType: this.personData.roleId,
        routeId: routeId,
        relationId: this.personData.zeusId,
        authorId: -1,
        equipmentId: uni.getSystemInfoSync().deviceId,
        userType: this.userType,
      };
      console.log(data)
      queryAttention(data).then((res) => {
        if (routeId === 2001) {
          if (this.isRecommend) {
            this.personData.recommendCount =
              +this.personData.recommendCount - 1 + "";
          } else {
            this.personData.recommendCount =
              +this.personData.recommendCount + 1 + "";
          }
          this.isRecommend = !this.isRecommend;
        } else {
          if (this.isAttention) {
            this.personData.fansCount = +this.personData.fansCount - 1 + "";
          } else {
            this.personData.fansCount = +this.personData.fansCount + 1 + "";
          }
          this.isAttention = !this.isAttention;
        }

        if (routeId === 2001 && this.isRecommend) {
          uni.showToast({
            title: "购买服务后，将为您优先推荐该服务者",
            icon: "none",
          });
        }
      });
    },
    getGrabDetail() {
      getGrabDetail(this.personId).then((res) => {
        if (res) {
          // this.personData.roleId = 3
          res.totalNum = unitChange(res.inServiceCount + res.comServiceCount);
          // this.personData.totalNum = '1.0'
          res.likeCount = unitChange(res.likeCount);
          res.fansCount = unitChange(res.fansCount);
          res.recommendCount = unitChange(res.recommendCount);
          res.collectCount = unitChange(res.collectCount);
          res.collectLikeNum = unitChange(res.sumLikeCollection);
          res.caseCount = unitChange(res.caseCount);
          this.personData = res;
          if (!this.personData.roleId) {
            this.personData.roleId = 10000;
            return;
          }

          if (getApp().globalData.token) {
            this.getAttention(1001, "isAttention");
            this.getAttention(2001, "isRecommend");
            this.getServiceStatus();
          }
          if(this.personData.roleId==1){
            this.getDesignComments()
          }
          setTimeout(() => {
            this.getNodeHeight();
            this.getTopDistance();
            this.pageScroll(0);
          }, 1000);
        } else {
          // this.personData = getApp().globalData.userInfo
          // console.log(this.personData)
        }
      });
    },
    getServiceStatus() {
      getServiceStatus(this.personData.zeusId).then((res) => {
        this.hasServe = res.status || res.ststus;
        uni.stopPullDownRefresh();
      });
    },
    // getCaseList() {
    //   // getCaseList().then(res => {

    //   // })
    // },
    changeOpacity(num) {
      num < 200
        ? (this.opacityNum = 0)
        : num < 220
        ? (this.opacityNum = 0.8)
        : (this.opacityNum = 1);
      // console.log(this.opacityNum)
    },
    toItem(name) {
      this.currentItem = name;

      uni.pageScrollTo({
        duration: 100, // 过渡时间
        scrollTop: this[name] + this.scrollTop - 115, // 滚动的实际距离
      });
    },
    getNodeHeight() {
      let query = uni.createSelectorQuery();
      query
        .select(".nav-header")
        .boundingClientRect((data) => {
          this.interactActive = data.height;
        })
        .exec();
    },
    getTopDistance() {
      query.exec(function (res) {});
    },
    back() {
      uni.navigateBack();
    },
    getSkuList() {
      let data = {
        relationId: this.personId,
        relationType: 7,
        page: 1,
        row: 10000,
        spuIsEnabled: 1,
        
        hidden:0
      };
      getSkuList(data).then((res) => {
        this.serviceData = res;
        // if (this.$refs.service) {
        //   this.$refs.service.isOpen = true;
        //   this.$refs.service.open();
        // }
        console.log(res)
        if(res.length==0){
          this.serviceEmpty = false
        }else{
          this.serviceEmpty = true
        }
      });
    },
    getEvaluate(num) {
      this.evaluateNum = num;
    },
    getDesignComments(){
      let params = {
        page:1,
        rows:1,
        userId:this.personId,
        sortType:0
      }
      getComments(params).then(res=>{
        this.commentData = res
        // this.commentData.list[0].rank = 3
      })
    },
    sendMsg() {
      this.$store.dispatch("openC2CConversation", {
        id: this.personId,
        name:this.personData.realName
      });
    },
    toEvaluateList(){
      uni.navigateTo({
        url:'/sub-decorate/pages/person-page/person-evaluate-list?id='+this.personId
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.person-page {
  position: relative;
  padding-top: 98rpx;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 40rpx;
  // height: 100%;
  min-height: 100%;
  .bg-index {
    top: -70rpx;
    width: 100%;
    height: 480rpx;
    position: absolute;
  }
  .bg-design{
    height: 1010rpx;
    top: 0rpx;
  }
  .mask{
    height: 1010rpx;
    position: absolute;
    top: 0rpx;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, #000000 100%);
    z-index: 1;
    backdrop-filter: blur(8rpx);
    width: 100%;
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
    z-index: 40;
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
  z-index: 10;
}
.person-page-content-dsgin{
  background: transparent;
  top: -26rpx;
}
view .is-self {
  border-bottom: none !important;
  box-shadow: none;
}
.person-msg {
  // width: calc(100% - 32px);
  background-color: #fff;
  border-radius: 32rpx 32rpx 0px 0px;
  box-shadow: 0px 26rpx 34rpx 0px rgba(3, 65, 63, 0.03);
  padding: 242rpx 32rpx 24rpx;

  .send-msg {
    height: 104rpx;
    background: #fff;
    border-radius: 16rpx;
    border: 2rpx solid #333;
    text-align: center;
    line-height: 104rpx;
    color: #00bfb6;
    font-size: 28rpx;
    font-weight: 500;

    i {
      font-size: 48rpx;
      width: 48rpx;
      height: 48rpx;
      margin-right: 8rpx;
      display: inline-block;
      vertical-align: middle;
      color: #333;
    }
    text {
      display: inline-block;
      vertical-align: middle;
      color: #333;
    }
  }
  .person-msg-top {
    border-bottom: 0.5px solid #f3f3f3;
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
      .icon-ic_nan {
        color: #5196FF;
      }
      .icon-ic_nv {
        color: #FF56B1;
      }
    }

    .name {
      display: block;
      font-size: 44rpx;
      font-weight: 500;
      color: #111;
      line-height: 60rpx;
      margin: 12rpx 0;
      max-width: 704rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
        color: #ffffff;
        background: linear-gradient(90deg, #40bff5, #53a9ff);
        padding: 0 16rpx;
        border-radius: 6rpx;
      }

      .rate {
        padding: 0 8rpx;
        background: rgba(255, 127, 70, 0.05);
        border-radius: 6px;
        color: #FF7F46;
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
      border: 2rpx solid #333;
      color: #333;
      line-height: 64rpx;
      padding: 0 18rpx;
      font-size: 28rpx;
      font-size: 400;
      i {
        display: inline-block;
        margin-right: 8rpx;
        color: #333;
      }
    }
    .already-attention {
      color: #666;
      background: #f7f7f7;
      border: none;
    }
    .recommend {
      // width: 146rpx;
      height: 64rpx;
      background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%);
      border-radius: 12rpx;
      margin-right: 24rpx;
      line-height: 64rpx;
      padding: 0 22rpx;
      font-size: 28rpx;
      color: #fff;
      font-size: 400;
      i {
        display: inline-block;
        margin-right: 14rpx;
      }
    }
    .already-recommend {
      color: #666;
      background: #f7f7f7;
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
      .unit {
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
  z-index: 20;
  // padding-left: 10px;
  .special-item {
    // width: 33%;
    position: absolute;
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
    margin: 0 auto;
    .main {
      margin: 0 auto;
      width: fit-content;
    }
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
      max-width: 242rpx;
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
    border-bottom: 0.5px solid #efefef;

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
      background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%);
      border-radius: 200rpx 200rpx 0px 0px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
.person-self {
  width: 100%;
  image {
    width: 100%;
    height: 640rpx;
    background-color: #eee;
    margin-bottom: 20rpx;
  }
  text {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #999;
  }
}
.person-interact-active {
  background-color: #fff;
  z-index: 1;
}
.interval {
  width: 100%;
  height: 16rpx;
  background: #f5f6f6;
}
.person-dbj {
  padding: 20rpx 32rpx;
  text {
    color: #666;
    display: block;
    font-size: 26rpx;
    margin-bottom: 24rpx;
  }
  .header {
    padding: 24rpx 0;
  }
  .title {
    font-size: 28rpx;
    color: #333;
    font-weight: 600;
  }
  .label {
    color: #666;
    font-weight: 600;
    margin-bottom: 16rpx;
  }
}
</style>
