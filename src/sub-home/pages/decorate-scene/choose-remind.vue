<template>
	<view class="choose-remind">
		<view class="remindItem">
			<view class="userInfo">
				<image class="avatar" src="../../static/avatar@2x(1).png"></image>
				<view class="userName">姜文</view>
				<view class="role">管家</view>
			</view>
			<image v-if="!isChecked" @click="isChecked=!isChecked" class="img" src="../../static/check@2x.png"></image>
			<image v-else @click="isChecked=!isChecked" class="img" src="../../static/checked@2x.png"></image>
		</view>
		<view class="remindItem">
			<view class="userInfo">
				<image class="avatar" src="../../static/avatar@2x(1).png"></image>
				<view class="userName">姜文</view>
				<view class="role">管家</view>
			</view>
			<image v-if="!isChecked" @click="isChecked=!isChecked" class="img" src="../../static/check@2x.png"></image>
			<image v-else @click="isChecked=!isChecked" class="img" src="../../static/checked@2x.png"></image>
		</view>
		<view class="remindItem">
			<view class="userInfo">
				<image class="avatar" src="../../static/avatar@2x(1).png"></image>
				<view class="userName">姜文</view>
				<view class="role">管家</view>
			</view>
			<image v-if="!isChecked" @click="isChecked=!isChecked" class="img" src="../../static/check@2x.png"></image>
			<image v-else @click="isChecked=!isChecked" class="img" src="../../static/checked@2x.png"></image>
		</view>
	</view>
</template>

<script>
	import {getAddressBook} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				isChecked: false,
				list: [],
				projectId: 1
			}
		},
		mounted() {
			this.requestPage()
		},
		methods:{
			requestPage(){
				// getAddressBook(this.projectId).then(data => {
				// 	if(data.length){
				// 		this.list = data
				// 	}
				// })
			}
		}
	}
</script>

<style scoped>
	.choose-remind{
		width: 750rpx;
		height: fit-content;
		overflow: auto;
		background: #ffffff;
	}
	.remindItem{
		width: 686rpx;
		height: 152rpx;
		padding: 0 32rpx;
		border-bottom: 2rpx solid #f5f6f6;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.img{
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.userInfo{
		width: fit-content;
		height: 56rpx;
		display: flex;
		align-items: center;
	}
	.userInfo .avatar{
		width: 88rpx;
		height: 88rpx;
		display: block;
	}
	.userInfo .userName{
		width: fit-content;
		height: 42rpx;
		margin-left: 24rpx;
		margin-right: 8rpx;
		font-size: 30rpx;
		color: #333333;
	}
	.userInfo .role{
		width: 56rpx;
		height: 28rpx;
		font-size: 20rpx;
		color: #ffffff;
		text-align: center;
		background: linear-gradient(45deg,#6d95ef, #84b9fc);
		border-radius: 6rpx;
	}
</style>
