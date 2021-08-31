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
		<view class="grab-bottom">
			<button class="submit" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
  import{getGrabDetail, sureGrab} from "../../../api/decorate.js";
	export default {
		data() {
			return {
				id:0,
        personData:{}
			};
		},
    onLoad(e){
      this.id = e.id
      this.getGrabDetail()
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

</style>
