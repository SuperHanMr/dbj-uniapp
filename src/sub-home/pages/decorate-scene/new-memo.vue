<template>
	<view class="new-memo">
		<view class="textStyle">
			<textarea class="input" v-model="value"
				placeholder-style="textStyle" placeholder="请输入备忘录内容"
				:maxlength="3000" required
			/>
		</view>
		<view class="remind" @click="toChooseRemind">
			<view class="text" :class="{'selected': hasChoose}">提醒谁看</view>
			<view class="main">
				<view class="list" v-if="reminderList.length">
					<view class="reminder" v-for="item in reminderList" :key="item.userId">@{{item.userName}}</view>
				</view>
				<image class="icon" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_memo_more%402x.png"></image>
			</view>
		</view>
		<view class="finish" @click="finishC">完成</view>	
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
			uni.$once("sendReminders",(reminderList) => {
				console.log(reminderList)
				this.reminderList = reminderList.reverse()
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
					uni.$emit('new-memo')
					uni.navigateBack({})
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
	.textStyle{
		color: #333333;
		font-size: 26rpx;
		line-height: 40rpx;
		letter-spacing: 1rpx;
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
		/* height: 120rpx; */
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
		margin: 60rpx 0;
		color: #333333;
		font-size: 28rpx;
	}
	.remind .text.selected{
		color: #00C2B8;
	}
	.remind .main{
		display: flex;
		align-items: center;
	}
	.main .list{
		display: flex;
		flex-wrap: wrap;
		max-width: 454rpx;
	}
	.main .list .reminder{
		margin-right: 40rpx;
		font-size: 28rpx;
		color: #333333;
	}
	
	.main .list .reminder:last-child{
		margin-right: 0;
	}
	.main .icon{
		width: 24rpx;
		height: 24rpx;
		margin-left: 4rpx;
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
