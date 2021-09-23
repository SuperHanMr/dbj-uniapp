<template>
  <view class="base-info-container">
		<view class="avatar-container">
			<view class="container" @click="changeAvatar">
				<image class="avatar" :src="userInfo.avatar" mode=""/>
				<image class="change_avatar" src="../../static/ic_mine_change_avatar@2x.png" mode="" />
			</view>
		</view>
		
		<view class="main-body">
     <view class="nickName-container" @click="changeNickName">
				<text>昵称</text>
				<view class="right">
					<text>{{userName}}</text>
					<image src="../../static/ic_mine_editPersonal_arraw@2x.png" mode=""></image>
				</view>
     </view>
		 <view class="line"/>
		 <view class="nickName-container" @click="changeNickName">
				<text>性别</text>
				<view class="right">
					<!-- 性别（1男，2女） -->
					<text>{{this.userInfo.sex ==1?"男":"女"}}</text>
					<image src="../../static/ic_mine_editPersonal_arraw@2x.png" mode=""></image>
				</view>
		 </view>
		 <view class="line"/>
		 
		 <view class="gender-container" @click="showToast">
				<text>手机号</text>
				<view class="right" style="margin-right: 8rpx;">
					<text>{{userInfo.phone}}</text>
				</view>
		 </view>
		 
		</view>
  </view>
</template>

<script>
import {editUserInfo} from "../../../api/order.js"
import upload from "../../../utils/upload.js"
export default {
  data() {
    return {
			userInfo:{},
			userName:"",
			files:{},
		};
  },
	onShow() {
		this.userInfo = getApp().globalData.userInfo
		console.log("userInfo=",this.userInfo)
		this.userName=this.userInfo.name;
		this.files.url = 	this.userInfo.avatar 
		console.log("this.files=",this.files)
	},
	watch:{
		files(newVal,oldVal){
			this.editAvatar(oldVal);
			console.log("newVal=",newVal,"oldVal=",oldVal)
		},
	},
  methods: {
		editAvatar(data){
			let params={
				// id:this.userInfo.id,
				// name:this.userInfo.name,
				// phone:this.userInfo.phone,
				// backgroundImg:"",
				// loginStatus:"",
				// identityState:"",
				gender:this.userInfo.sex,
				avatar:this.files.url,
				nickName:this.userName,
			}
			editUserInfo(params).then((e)=>{
				console.log(e)
				uni.showToast({
					title:"修改图片成功",
					icon:"none",
					duration: 2000
				})
			}).catch(()=>{
				this.files.url=data.url
				uni.showToast({
					title:"修改图片失败",
					icon:"none",
					duration: 2000
				})
			})
			
		},
		
		
    onClick() {
      console.log("打印数据，哈哈哈");
    },
		
		
		// 更改头像
		changeAvatar(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success:(res)=>{
					console.log("res.tempFilePaths=", res);
					this.chooseFileCallback(res)
				}
			})
		},
		chooseFileCallback(res) {
			for (let i = 0; i < res.tempFiles.length; i++) {
				let item = res.tempFiles[i]
				upload({
					filePath: item.path,
					fileType: "image",
					success: (res) => {
						this.files=res;
						this.userInfo.avatar = this.files.url
						console.log("this.files=",this.files)
					},
					fail: (res) => {
						console.log("upload fail", res);
					},
					progess: (res) => {
						console.log("upload progess:", res);
					}
				})
			}
		},
		
		//修改昵称
		changeNickName(){
			uni.navigateTo({
				url:`edit-nick-name/edit-nick-name?nickName=${this.userInfo.name}`
			})
		},
		
		// 手机号
		showToast(){
			uni.showToast({
				title: '暂不支持更换手机号',
				icon:"none",
				duration: 1000
			})
		},
		
	},
};
</script>

<style lang="scss" scoped>
.base-info-container {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
	.avatar-container{
		background: #FFFFFF;
		margin-bottom: 16rpx;
		padding: 48rpx 286rpx 48rpx 288rpx;
		.container{
			width: 176rpx;
			height: 176rpx;
			position: relative;
			.avatar{
				width: 176rpx;
				height: 176rpx;
				object-fit: cover;
				border-radius: 50%;
			}
			.change_avatar{
				width: 48rpx;
				height: 48rpx;
				object-fit: cover;
				border-radius: 50%;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}
	
	.main-body {
		background-color: #FFFFFF;
		.line{
			margin:0 32rpx;
			height: 2rpx;
			background: #f2f2f2;
			border-radius: 2rpx;
		}
		.nickName-container,.gender-container{
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			padding: 42rpx 24rpx 42rpx 32rpx;
			text{
				height: 32rpx;
				line-height: 32rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #808080;
			}
			.right{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				text{
					height: 32rpx;
					line-height: 32rpx;				
					font-size: 26rpx;
					font-weight: 550;
					color: #111111;
				}
				image{
					margin-left: 4rpx;
					width: 32rpx;
					height: 34rpx;
					object-fit: cover;
				}
			}
		}
	}
}


</style>
