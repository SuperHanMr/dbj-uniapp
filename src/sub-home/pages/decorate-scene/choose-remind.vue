<template>
	<view class="choose-remind">
		<view class="remindItem" v-for="item in list" :key="item.userId">
			<view class="userInfo">
				<image class="avatar" :src="item.avatar"></image>
				<view class="userName">{{item.name}}</view>
				<view class="role">{{item.role}}</view>
			</view>
			<image v-if="!item.isChecked" @click="checkC(index)" class="img" src="../../static/check@2x.png"></image>
			<image v-else @click="checkC(index)" class="img" src="../../static/checked@2x.png"></image>
		</view>
		
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
				this.list[index].isChecked=!this.list[index].isChecked
			},
			requestPage(){
				getAddressBook(this.projectId).then(data => {
					console.log(data)
					if(data){
						if(!data.length)return
						this.list = data.map(item => {
							this.reminderList.push({
								userId: item.userId,
								userName: item.name,
								userType: item.roleType,
								phone: item.phone
							})
							
							item.isChecked = false
							return item
						})
						uni.$emit("sendReminders",this.reminderList)
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
