<template>
	<view class="grab">
		<view class="grab-header">
			<image class="grab-header-image" :src="personData.avatar"></image>
			<view class="grab-header-name">
				<view class="grab-header-name-top">
					<text class="name">{{personData.name}}</text>
					<text class="icon">量房</text>
				</view>
				<view class="grab-header-name-bottom">
					<button class="btn">发消息</button>
				</view>
			</view>
			<button type="default" @click="toReplace">申请更换</button>
		</view>
		<view class="grab-content">
			<text>徽章</text>
			<view class="badge">
        <view class="badge-item" v-for="item of presonData.badges" :key='item.badgeName'>
          <image :src="item.badgeIcon"></image>
          <text class="name">{{item.badgeName}}</text>
        </view>
      </view>
		</view>
		<view class="grab-bottom" :style="{paddingBottom:systemBottom,height:systemHeight}">
			<button class="add-btn" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
  import{getGrabDetail, sureGrab} from "../../../api/decorate.js";
	export default {
		data() {
			return {
        systemBottom:'',
        systemHeight:'',
				id:0,
        personData:{}
			};
		},
    onLoad(e){
      this.id = e.id
      this.getGrabDetail()
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.systemBottom = menuButtonInfo.bottom + 'rpx'; 
      this.systemHeight = menuButtonInfo.bottom + 136 +'rpx'
    },
		methods:{
      getGrabDetail(){
        getGrabDetail(this.id).then(res=>{
          personData = res
        })
      },
			toReplace(){
				uni.navigateTo({
					url:"/pages/decorate/replace-worker/replace-worker?id="+this.id
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
  .grab-bottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 136rpx;
    background-color: #fff;
    display: flex;
    flex-direction: row; 
    justify-content: center;  
    align-items: center;
    .add-btn {
      // margin-top: 20rpx;
      height: 88rpx;
      background: linear-gradient(135deg, #53d5cc, #4fc9c9);
      border-radius: 12rpx;
      width: 686rpx;
      line-height: 88rpx;
      text-align: center;
      color: #FFFFFF;
      font-size: 32rpx;
    }
  }
</style>
