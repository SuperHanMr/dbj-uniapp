<template>
	<view class="choose-remind">
		<scroll-view scroll-y="true" >
			<view class="remindItem" @click="checkC(index)"
				v-for="(item,index) in list" :key="item.userId"
			>
				<view class="userInfo">
					<image class="avatar" :src="item.avatar+'?x-oss-process=image/resize,m_mfit,w_44,h_44'"></image>
					<view class="userName">{{item.name}}</view>
					<view class="role">{{item.role}}</view>
				</view>
				<image v-if="!item.isChecked" class="img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/check%402x.png"></image>
				<image v-else class="img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_reminder_checked%402x.png"></image>
			</view>
		</scroll-view>
		<view class="confirm" @click="confirmC">确认</view>
	</view>
</template>

<script>
	import {getAddressBook} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				list: [],
				projectId: 0,
				reminderList: []
			}
		},
		onLoad(option) {
			this.projectId = option.projectId
		},
		mounted() {
			this.requestPage()
		},
		methods:{
			checkC(index){
				this.list[index].isChecked = !this.list[index].isChecked
			},
			confirmC(){
				this.list.forEach(item => {
					if(!item.isChecked)return
					this.reminderList.push({
						userId: item.userId,
						userName: item.name,
						userType: item.roleType,
						phone: item.phone
					})
				})
				uni.$emit("sendReminders",this.reminderList)
				uni.navigateBack({
					delta: 1
				})
			},
			requestPage(){
				getAddressBook(this.projectId).then(data => {
					if(data){
						if(!data.length)return
						let obj = {}
						data.forEach(item => {
							item.isChecked = false
							if(!obj[item.userId]){
								obj[item.userId] = 1
								this.list.push(item)
							}
						})
					}
				})
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
	.confirm{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 686rpx;
		height: 88rpx;
		margin: 24rpx 32rpx 64rpx;
		background: linear-gradient(135deg,#00c2b2, #00c2bf);
		border-radius: 12rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
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
		border-radius: 50%;
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
