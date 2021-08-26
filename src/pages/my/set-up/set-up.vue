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
		<view class="logOut">
			退出登录
		</view>
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
</style>
