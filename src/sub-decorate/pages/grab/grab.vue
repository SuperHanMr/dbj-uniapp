<template>
	<view class="grab">
    <view class="content">
      <grabHomePage class="home-page" :personData='personData'></grabHomePage>
      <view class="msg-btn">
        <view class="content" @click="sendMsg">
          <i class="icon-gerenzhuye_ic_faxiaoxi icon"></i>
          <text>发消息</text>
        </view>
      </view>
    </view>
    
		<bottom-btn style="width: 100%;" :showDefaultBtn="false">
		  <view class="btn">
		    <view class="btn-left" @click="toReplace">
		      <i class="icon-ic_wodejia_shenqinggenghuan_csn"></i>
		      <text>申请修改</text>
		    </view>
		    <button class="add-btn" @click="submit">确定</button>
		  </view>
		</bottom-btn>
	</view>
</template>

<script>
  import{getGrabDetail, sureGrab} from "../../../api/decorate.js";
  import grabHomePage from "./components/grab-home-page.vue"
  import {unitChange } from '@/utils/util.js'
	export default {
    components:{
      grabHomePage
    },
		data() {
			return {
        systemBottom:'',
        systemHeight:'',
				id:0,
        personData:{
          likeCount:'0',
          fansCount:'0',
          recommendCount:'0',
          collectCount:'0',
          totalNum:'0'
        }
			};
		},
    onReady(){
      uni.setNavigationBarTitle({
        title:'确认'+(getApp().globalData.decorateMsg.jobName||'设计师')
      })
    },
    onLoad(e){
      this.id = getApp().globalData.decorateMsg.serveId
      this.personId = getApp().globalData.decorateMsg.serverId||7233
      this.getGrabDetail()
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.systemBottom = menuButtonInfo.bottom + 'rpx'; 
      this.systemHeight = menuButtonInfo.bottom + 136 +'rpx'
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
			toReplace(){
				uni.navigateTo({
					url:"/sub-decorate/pages/replace-worker/replace-worker?id="+this.id
				})
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

<style lang="scss">
  .grab{
    padding-bottom: 156rpx;
    .content{
      display: flex;
      justify-content: center;
      padding: 102rpx 32rpx;
      flex-wrap: wrap;
      .home-page{
        width: 100%;
      }
      .msg-btn{
        height: 104rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24rpx;
        margin-top: 26rpx;
        width: 100%;
        .content{
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
    }
  }
  .btn {
    display: flex;
    padding: 0 32rpx;
  }
  
  .btn-left {
    margin-right: 32rpx;
    display: flex;
    // align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 200rpx;
    height: 88rpx;
    background: #ffffff;
    border: 0.5px solid #cbcccc;
    border-radius: 12rpx;
    i{
      width: 28rpx;
      height: 28rpx;
      color: #333;
      font-size: 16rpx;
      line-height: 28rpx;
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
