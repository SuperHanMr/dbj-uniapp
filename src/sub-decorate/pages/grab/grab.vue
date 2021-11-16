<template>
	<view class="grab">
    <view class="grab-content">
      <grabHomePage class="home-page" :personData='personData'></grabHomePage>
      <!-- <view class="msg-btn">
        <view class="btn-content" @click="sendMsg">
          <i class="icon-gerenzhuye_ic_faxiaoxi icon"></i>
          <text>发消息</text>
        </view>
      </view> -->
      <view
        class="person-interact"
        :class="{'person-interact-active':interact<2 }"
        v-if="caseEmpty||dynamicEmpty||evaluateEmpty"
      >
        <view class="sticky">
          <!-- <view
            class="item"
            v-if="personData.roleId===1"
            :class="{'item-active':currentItem==='serviceTop'}"
            @click="toItem('serviceTop')"
          >
            服务</view> -->
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
            评价<text v-if="evaluateNum">({{evaluateNum}})</text></view>
        </view>
      </view>
      <view class="person-content">
        <personCase
          ref='case'
          :personId='personId'
          :isGrab='true'
          class="person-case"
          @contentEmpty='contentEmpty'
          v-if="personData.roleId===1||personData.roleId===2"
        ></personCase>
        <personDynamic
          ref='dynamic'
          :personId='personId'
          :isGrab='true'
          class="person-dynamic"
          @contentEmpty='contentEmpty'
          v-if="personData.roleId===3||personData.roleId===4||personData.roleId===5"
        ></personDynamic>
        
        <view class="interval"></view>
        <personEvaluate
          ref='evaluate'
          :personId='personId'
          :isGrab='true'
          class="person-evaluate"
          @contentEmpty='contentEmpty'
          @getEvaluate='getEvaluate'
        ></personEvaluate>
      </view>
    </view>
		<bottom-btn style="width: 100%;" :showDefaultBtn="false">
		  <view class="btn">
		    <view class="btn-left" @click="toReplace">
          
            <i class="icon-ic_wodejia_shenqinggenghuan_csn"></i>
            <text>申请更换</text>
		    </view>
        <view class="btn-right" @click="sendMsg">
          <i class="icon-sixinic"></i>
          <text>发消息</text>
        </view>
		    <button class="add-btn" @click="submit">确定</button>
		  </view>
		</bottom-btn>
	</view>
</template>

<script>
  import{getGrabDetail, sureGrab} from "../../../api/decorate.js";
  import grabHomePage from "./components/grab-home-page.vue"
  import personEvaluate from "../person-page/components/person-evaluate.vue";
  import personCase from "../person-page/components/person-case.vue";
  import personDynamic from "../person-page/components/person-dynamic.vue";
  import {unitChange } from '@/utils/util.js'
  let query = {};
	export default {
    components:{
      grabHomePage,
      personEvaluate,
      personCase,
      personDynamic,
    },
		data() {
			return {
        systemBottom:'',
        systemHeight:'',
				id:0,
        personId:0,
        personData:{
          likeCount:'0',
          fansCount:'0',
          recommendCount:'0',
          collectCount:'0',
          totalNum:'0'
        },
        scrollTop:0,
        currentItem:'',
        interact: 100,
        evaluateNum:0,
        // serviceTop: 0,
        caseTop: 0,
        dynamicTop: 0,
        evaluateTop: 0,
        caseEmpty:false,
        dynamicEmpty:false,
        evaluateEmpty:false,
			};
		},
    onReady(){
      uni.setNavigationBarTitle({
        title:'确认服务者'
      })
    },
    mounted(){
      query = uni.createSelectorQuery();
      query.select(".person-interact").boundingClientRect((res) => {
        // console.log(res)
        this.interact = res?res.top:100;
      });
      query.select(".person-content").boundingClientRect((res) => {
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
    onLoad(e){
      this.id = getApp().globalData.decorateMsg.serveId
      this.personId = getApp().globalData.decorateMsg.serverId||7270
      this.getGrabDetail()
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.systemBottom = menuButtonInfo.bottom + 'rpx'; 
      this.systemHeight = menuButtonInfo.bottom + 136 +'rpx'
    },
    onPageScroll(scrollTop) {
      this.scrollTop = scrollTop.scrollTop;
      query.exec(function (res) {
        // console.log(res)
      });
    },
		methods:{
      getGrabDetail(){
        getGrabDetail(this.personId).then(res=>{
          this.personData = res
          
          this.personData.totalNum = unitChange(this.personData.inServiceCount+this.personData.comServiceCount)
          // this.personData.totalNum = '1.0'
          this.personData.likeCount = unitChange(this.personData.likeCount)
          this.personData.fansCount = unitChange(this.personData.fansCount)
          this.personData.recommendCount = unitChange(this.personData.recommendCount)
          this.personData.collectCount = unitChange(this.personData.collectCount)
        })
      },
      toItem(name) {
        this.currentItem = name;
        query.exec(function (res) {});
        this.$nextTick(function(){
          uni.pageScrollTo({
            duration: 100, // 过渡时间
            scrollTop: this[name] + this.scrollTop - 20, // 滚动的实际距离
          });
        })
        
      },
      contentEmpty(name,value){
        console.log(name,value)
        this[name] = value
      },
			toReplace(){
				uni.navigateTo({
					url:"/sub-decorate/pages/replace-worker/replace-worker?id="+this.id
				})
			},
      getEvaluate(num) {
        this.evaluateNum = num;
      },
      sendMsg(){
        this.$store.dispatch("openC2CConversation", {
          id:this.personId,
        })
      },
			submit(){
        sureGrab({serveId:this.id}).then(res=>{
          uni.showToast({
              title: '确认成功',
              duration: 2000
          });
        })
				uni.switchTab({
					url:'/pages/decorate/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .grab{
    padding-bottom: 156rpx;
    background-color: #FAFAFA;
    .person-interact-active {
      background-color: #fff;
      z-index: 1;
    }
    .grab-content{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .home-page{
        width: 100%;
        padding: 102rpx 32rpx 0;
        box-sizing: border-box;
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.02);
      }
      .msg-btn{
        height: 104rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 16rpx;
        margin-top: 26rpx;
        width: 100%;
        margin: 0 32rpx 0;
        box-sizing: border-box;
        .btn-content{
          color: #00bfb6;
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
        
      }
      .person-interact {
        margin-top: 24rpx;
        position: sticky;
        top: 0px;
        z-index: 1;
        width: 100%;
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
          .item-active{
            font-weight: 500;
            color: #333;
          }
          .item-active::after {
            content: "";
            display: inline-block;
            width: 32rpx;
            height: 4rpx;
            background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
            border-radius: 200rpx 200rpx 0px 0px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
        }
      }
      .person-content{
        width: 100%;
      }
      .interval {
        width: 100%;
        height: 16rpx;
        background: #f5f6f6;
      }
    }
  }
  .btn {
    display: flex;
    padding: 0 32rpx;
    z-index: 2;
  }
  .btn-left{
    margin-right: 34rpx;
    display: flex;
    // align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    // width: 172rpx;
    // height: 88rpx;
    i{
      width: 28rpx;
      height: 28rpx;
      color: #333;
      font-size: 16rpx;
      line-height: 28rpx;
      text-align: center;
      color: #333;
      margin-top: 14rpx;
    }
      
    text {
      display: block;
      font-size: 26rpx;
      color: #333;
      
    }
  }
  .btn-right {
    margin-right: 16rpx;
    display: flex;
    // align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 172rpx;
    height: 88rpx;
    background: #ffffff;
    border: 0.5px solid #cbcccc;
    border-radius: 12rpx;
    i{
      width: 28rpx;
      height: 28rpx;
      color: #333;
      // font-size: 16rpx;
      // line-height: 28rpx;
      margin-right: 12rpx;
      text-align: center;
      color: #333;
    }
  
    text {
      display: block;
      font-size: 26rpx;
      color: #333;
  
    }
  }
  .add-btn {
    // margin-top: 20rpx;
    height: 88rpx;
    background: linear-gradient(135deg, #53d5cc, #4fc9c9);
    border-radius: 12rpx;
    width: 454rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
  }
</style>
