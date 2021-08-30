<template>
	<view class="container">
		<view class="main-body">
			<!-- <uni-list class="uni-list" :border="false">
			    <uni-list-item title="打扮家装修服务协议" link to="./agreement/service-agreement" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="打扮家装修隐私协议" link to="./agreement/privacy-agreement" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="打扮家用户行为规范" link to="./agreement/code-of-conduct" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="打扮家知识产权条款" link to="./agreement/property-rights-clause" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="关于打扮家" link to="./about-dabanjia/about-dabanjia" /> 
			</uni-list> -->
			<view class="uni-list">
				<view class="uni-list-item" v-for="(item, index) in listArr" @click="onClick(index)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="icon">
						<image class="title-right" src="/static/images/ic_more_black.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="logOut" @click="onOpen">
			退出登录
		</view>
		<uni-popup ref="popup" type="dialog" class="uni-popup">
				<uni-popup-dialog class="uni-popup-dialog" mode="base" type="info" title="确定退出当前账号登录吗?" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr: [
					{
						title: "打扮家装修服务协议",
						path: "./agreement/service-agreement"
					},
					{
						title: "打扮家装修隐私协议",
						path: "./agreement/privacy-agreement"
					},
					{
						title: "打扮家用户行为规范",
						path: "./agreement/code-of-conduct"
					},
					{
						title: "打扮家知识产权条款",
						path: "./agreement/property-rights-clause"
					},
					{
						title: "意见与反馈",
						path: "./comments-feedback/comments-feedback"
					},
					{
						title: "关于打扮家",
						path: "./about-dabanjia/about-dabanjia"
					}
				]
			};
		},
		methods:{
				
			onClick(val){
				uni.navigateTo({
					url: this.listArr[val].path
				})
				console.log("dadad")
			},
			onOpen(){
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			},
			confirm(val){
				console.log(val, 'asdsada');
				this.$refs.popup.close();
			}
		}
	}
</script>

<style scoped>

.container{
height: 100%;
	background: #f5f6f6;
}
.container .main-body {
	width: 100%;
	padding-top: 16rpx;
}
.container .main-body .uni-list{
	background: #ffffff;
}
.container .main-body .uni-list .uni-list-item{
	display: flex;
	justify-content: space-between;
	padding: 0 24rpx 0 32rpx;
	border-bottom: 1px solid #f2f2f2;
}
.container .main-body .uni-list .uni-list-item:last-child{
	border: none;
}
.container .main-body .uni-list .uni-list-item .title{
	padding: 38rpx 0;
	font-size: 28rpx;
	font-family: PingFangSC, PingFangSC-Regular;
	font-weight: 400;
	text-align: left;
	color: #333333;
}
.container .main-body .uni-list .uni-list-item .icon{
	padding: 42rpx 0;
}
.container .main-body .uni-list .uni-list-item .icon .title-right{
	height: 32rpx;
	width: 34rpx;
}
.container .logOut{
	text-align: center;
	margin-top: 16rpx;
	padding: 36rpx 0;
	font-size: 28rpx;
	font-family: PingFangSC, PingFangSC-Regular;
	font-weight: 400;
	color: #111111;
	background: #ffffff;
}
button::after{
	border:none;
}
.container .uni-popup .uni-popup-dialog /deep/ .uni-dialog-button-group .uni-border-left .uni-dialog-button-text{
	color: rgba(255,51,71,1);
	font-size: 30rpx;
	font-family: PingFangSC, PingFangSC-Medium;
	font-weight: 500;
	text-align: left;
}
.container .uni-popup .uni-popup-dialog /deep/ .uni-dialog-title .uni-dialog-title-text{
	font-size: 32rpx;
	font-family: PingFangSC, PingFangSC-Medium;
	font-weight: 500;
	text-align: center;
	color: #111111;
}
</style>
