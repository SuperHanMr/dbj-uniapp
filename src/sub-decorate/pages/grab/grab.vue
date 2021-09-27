<template>
	<view class="grab">
    <view class="content">
      <grabHomePage class="home-page" :personData='personData'></grabHomePage>
      <view class="msg-btn">
        <view class="content">
          <view class="icon"></view>
          <text>发消息</text>
        </view>
      </view>
    </view>
    
		<bottom-btn style="width: 100%;" :showDefaultBtn="false">
		  <view class="btn">
		    <view class="btn-left" @click="change">
		      <image src="" mode=""></image>
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
	export default {
    components:{
      grabHomePage
    },
		data() {
			return {
        systemBottom:'',
        systemHeight:'',
				id:0,
        personData:{}
			};
		},
    onReady(){
      uni.setNavigationBarTitle({
        title:'确认'+(getApp().globalData.decorateMsg.jobName||'设计师')
      })
    },
    onLoad(e){
      this.id = getApp().globalData.decorateMsg.serveId
      this.personId = getApp().globalData.decorateMsg.serverId||6820
      this.getGrabDetail()
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.systemBottom = menuButtonInfo.bottom + 'rpx'; 
      this.systemHeight = menuButtonInfo.bottom + 136 +'rpx'
    },
		methods:{
      getGrabDetail(){
        getGrabDetail(this.personId).then(res=>{
          this.personData = res
        })
      },
			toReplace(){
				uni.navigateTo({
					url:"/sub-decorate/pages/replace-worker/replace-worker?id="+this.id
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
          .icon{
            width: 32rpx;
            height: 28rpx;
            border: 4rpx solid #00bfb6;
            border-radius: 6rpx;
            margin-right: 16rpx;
          }
          text{
            font-size: 28rpx;
            color: #00bfb6;
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
    margin-right: 17rpx;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
  
    image {
      width: 28rpx;
      height: 28rpx;
    }
  
    text {
      display: block;
      font-size: 22rpx;
      color: #666;
  
    }
  }
  .add-btn {
    // margin-top: 20rpx;
    height: 88rpx;
    background: linear-gradient(135deg, #53d5cc, #4fc9c9);
    border-radius: 12rpx;
    width: 560rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
  }
</style>
