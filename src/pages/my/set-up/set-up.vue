<template>
	<view class="container">
		<view class="main-body">
			<uni-list class="uni-list" :border="false">
			    <uni-list-item title="打扮家装修服务协议" link to="./agreement/service-agreement" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="打扮家装修隐私协议" link="reLaunch" to="./privacy-agreement/privacy-agreement" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="打扮家用户行为规范" link="reLaunch" to="./code-of-conduct/code-of-conduct" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="打扮家知识产权条款" link="reLaunch" to="./property-rights-clause/property-rights-clause" @click="onClick($event,1)" ></uni-list-item>
			    <uni-list-item title="关于打扮家" link to="./about-dabanjia/about-dabanjia" /> 
			</uni-list>
		</view>
		<view class="logOut">
			<button type="default">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
				
			onClick(){
				console.log("dadad")
			}
		}
	}
</script>

<style scoped>

.container{

}
.container .main-body {
	height: 100%;
	width: 100%;
	margin-top: 20rpx;
	padding: 20repx;
}
.container .main-body .uni-list{
	
}
.container .logOut{
	text-align: center;
	margin-top: 32rpx;
	padding: 0 40rpx;
}
button::after{
	border:none;
}
</style>
