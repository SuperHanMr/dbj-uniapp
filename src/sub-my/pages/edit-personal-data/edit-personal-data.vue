<template>
  <view class="base-info-container">
		<view class="avatar-container">
			<view class="container" @click="changeAvatar">
				<image class="avatar" :src="`${userInfo.avatar}?x-oss-process=image/resize,m_mfit,w_352,h_352`" mode="aspectFill"/>
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
		 <view class="nickName-container" @click="changeGender">
				<text>性别</text>
				<view class="right">
					<text>{{userInfo.sex == 1?"男":"女"}}</text>
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
		
		
		<!-- 修改性别 -->
		<uni-popup ref="editGender" type="bottom" class="edit-gender-container" >
			<view class="popup-top">
				<text>选择您的性别</text>
				<image src="../../static/icon_popup_closed@2x.png" mode=""  @click="closePopup"></image>
			</view>
			<view class="popup-body">
				<view class="left">
					<image v-if="gender == 1"  src="../../static/ic_boy_checked@2x.png" mode=""></image>
					<image v-else src="../../static/ic_boy_unCheck@2x.png" mode="" @click="checkGender(1)"></image>
					<text>男</text>
				</view>
				<view class="right">
					<image v-if="gender == 2" src="../../static/ic_girl_checked@2x.png" mode="" ></image>
					<image v-else src="../../static/ic_girl_unCheck@2x.png" mode="" @click="checkGender(2)"></image>
					<text>女</text>
				</view>
			</view>
			<view class="popup-footer" :style="{paddingBottom:systemBottom}">
				<view class="button" @click="confirmGender">
					确定
				</view>
			</view>
		</uni-popup>
		
		
		
		
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
			gender:"",
			files:{},
			
			systemBottom:"",
		};
  },
	onShow() {
		this.userInfo = getApp().globalData.userInfo
		// console.log("userInfo=",this.userInfo)
		this.userName=this.userInfo.name;
		this.gender  =this.userInfo.sex
		this.files.url = 	this.userInfo.avatar 
		console.log("this.files=",this.files)
	},
	mounted(e) {
	  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	  this.systemBottom = menuButtonInfo.bottom +32 + "rpx";
	  // console.log(this.systemBottom);
	},
	watch:{
		files(newVal,oldVal){
			this.editAvatar(oldVal);
			// console.log("newVal=",newVal,"oldVal=",oldVal)
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
				// console.log(e)
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
		
		
		// 更改头像
		changeAvatar(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success:(res)=>{
					// console.log("res.tempFilePaths=", res);
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
						// console.log("this.files=",this.files)
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
			console.log("this.files.url=",this.files.url)
			uni.navigateTo({
				url:`edit-nick-name/edit-nick-name?nickName=${this.userInfo.name}`
			})
		},
		
		//修改性别  性别（1男，2女）
		changeGender(){
			 this.$refs.editGender.open()
		},
		closePopup(){
			this.$refs.editGender.close()
		},
		confirmGender(){
			if(this.userInfo.sex == this.gender){
				this.$refs.editGender.close()
			}else{
				let params = {
					gender:this.gender,
					avatar:this.files.url,
					nickName:this.userName,
				}
				console.log("params=",params)
				editUserInfo(params).then(()=>{
					this.$refs.editGender.close()
					this.userInfo.sex = this.gender
				})
			}
		},
		checkGender(type){
			if(type ==1){
				this.gender = 1
			}else{
				this.gender = 2
			}
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
			height: 1rpx;
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
	
	.edit-gender-container{
		background-color: #FFFFFF !important;
		.popup-top{
			height: 98rpx;
			line-height: 98rpx;
			text-align: center;
			background-color: #FFFFFF;
			font-weight: 500;
			font-size: 32rpx;
			position: relative;
			border-radius: 32rpx 32rpx 0 0;
			image{
				position: absolute;
				width: 64rpx;
				height: 64rpx;
				object-fit: cover;
				top: 16rpx;
				right: 12rpx;
			}
		}
		.popup-body{
			background-color: #FFFFFF;
			padding: 64rpx 140rpx 56rpx;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.left,.right{
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				image{
					width: 96rpx;
					height: 96rpx;
					margin-bottom: 16rpx;
				}
				text{
					width: 26rpx;
					height: 32rpx;
					color: #110100;
					// color: #00BFB6;
					font-size: 13px;
				}
			} 
			.left{
				padding-right: 278rpx;
			}
		}
		.popup-footer{
			background-color: #FFFFFF;
			padding:24rpx 32rpx;
			.button{
				height: 88rpx;
				line-height:88rpx;
				text-align: center;
				background: linear-gradient(135deg,#00bfaf, #00bfbc);
				border-radius: 12rpx;
				color: #FFFFFF;
				font-weight: 500;
				font-size: 32rpx;
			}
		}
	
	}
	
}



</style>
