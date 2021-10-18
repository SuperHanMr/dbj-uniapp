<template>
	<view class="new-memo">
		<form @submit="formSubmit" @reset="formReset">
			<textarea class="input" v-model="value" placeholder="请输入备忘录内容" maxlength="3000" required/>
			<view class="remind" @click="toChooseRemind">
				<view class="text" :class="{'selected': hasChoose}">提醒谁看</view>
				<view class="reminder" v-if="reminderList.length" v-for="item in reminderList" :key="item.userId">@{{item.userName}}</view>
				<image class="icon" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_filtrate%402x.png"></image>
			</view>
			<view class="finish" @click="finishC">完成</view>
		</form>
	</view>
</template>

<script>
	import {createMemo} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				value: "",
				projectId: 0,
				reminderList: [],
				hasChoose: false
			}
		},
		onLoad(option) {
			this.projectId = option.projectId
		},
		onShow() {
			uni.$once("sendReminders",(reminderList) => {
				console.log(reminderList)
				this.reminderList = reminderList
				this.hasChoose = reminderList.length?true:false
			})
		},
		methods:{
			finishC(){
				console.log(this.value,'....')
				if(!this.value.trim()){
					uni.showToast({
						title:"请输入备忘录内容",
						icon:"none"
					})
					return
				}
				this.setMemo()
			},
			toChooseRemind(){
				uni.navigateTo({
					url: `/sub-home/pages/decorate-scene/choose-remind?projectId=${this.projectId}`
				})
			},
			setMemo(){
				let params = {
					projectId: +this.projectId,
					content: this.value,
					reminderList: this.reminderList,
				}
				createMemo(params).then(data => {
					uni.navigateTo({
						url: `/sub-home/pages/decorate-scene/memo?projectId=${this.projectId}`
					})
				})
			}
		}
	}
</script>

<style scoped>
	.new-memo{
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #fff;
	}
	.input{
		width: 662rpx;
		height: 456rpx;
		padding-left: 24rpx;
		padding-top: 24rpx;
		margin: 24rpx 32rpx;
		background: #f5f6f6;
		border-radius: 16rpx;
	}
	.remind{
		width: 686rpx;
		height: 120rpx;
		margin-left: 32rpx;
		margin-top: 18rpx;
		border-bottom: 2rpx solid #f5f6f6;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.remind .text{
		width: 112rpx;
		height: 40rpx;
		color: #333333;
		font-size: 28rpx;
	}
	.remind .text.selected{
		color: #00C2B8;
	}
	.remind .reminder{
		font-size: 28rpx;
		color: #333333;
	}
	.remind .icon{
		width: 18rpx;
		height: 10rpx;
		display: block;
	}
	.finish{
		width: 686rpx;
		height: 88rpx;
		margin-left: 32rpx;
		margin-bottom: 64rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: linear-gradient(135deg,#00c2b2, #00c2bf);
		border-radius: 12rpx;
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		line-height: 88rpx;
		color: #ffffff;
	}
</style>
