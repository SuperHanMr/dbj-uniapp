<template>
	<view class="detailWrap">
		<view class="topArea">
			<view class="userInfo">
				<image class="avatar" :src="userInfo.avatar"></image>
				<view class="userName">{{userInfo.userName}}</view>
				<view class="role">{{userInfo.roleName}}</view>
			</view>
			<view class="time">{{memoInfo.createTime}}</view>
		</view>
		<view class="content">
			<view class="remark">
				<view class="cueMe" v-if="!memoInfo.publisherFlag">提到了我</view>
				<view class="cueOthers" v-else v-for="(name,index) in reminderList" :key="index">@{{name}}</view>
			</view>
			<view class="text">{{memoInfo.content}}</view>
		</view>
	</view>
</template>

<script>
	import {getMemoDetail} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				memoId: 0,
				memoInfo: {},
				userInfo: {},
				reminderList: []
			}
		},
		onLoad(option) {
			this.memoId = option.memoId
		},
		mounted() {
			this.requestPage()
		},
		methods: {
			requestPage(){
				getMemoDetail(this.memoId).then(data => {
					if(data){
						let {promulgator,reminderList} = data
						this.memoInfo = data
						this.userInfo = promulgator
						this.reminderList = reminderList
					}
				})
			}
		}
	}
</script>

<style scoped>
	.detailWrap{
		width: 100%;
		height: fit-content;
		background: #fff;
		overflow: auto;
	}
	.topArea{
		margin: 48rpx 32rpx 40rpx;
		width: 686rpx;
		height: 136rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f5f6f6;
		border-radius: 16rpx;
	}
	.topArea .time{
		width: 284rpx;
		height: 40rpx;
		padding-right: 24rpx;
		color: #999999;
		font-size: 28rpx;
	}
	.topArea .userInfo{
		width: fit-content;
		height: 72rpx;
		padding-left: 24rpx;
		display: flex;
		align-items: center;
	}
	.userInfo .avatar{
		width: 72rpx;
		height: 72rpx;
		display: block;
	}
	.userInfo .userName{
		width: 86rpx;
		height: 40rpx;
		margin: 0 16rpx;
		font-size: 28rpx;
		font-weight: 500;
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
	.content{
		width: 100%;
		height: fit-content;
	}
	.content .remark{
		display: flex;
		width: fit-content;
		height: 40rpx;
		margin-bottom: 16rpx;
		margin-left: 32rpx;
		font-size: 28rpx;
		color: #999999;
	}
	.remark .cueMe{
		width: 112rpx;
	}
	.remark .cueOthers{
		width: 112rpx;
		margin-right: 40rpx;
	}
	.content .text{
		margin: 0 32rpx 40rpx;
		width: 686rpx;
		height: 780rpx;
		color: #333333;
		font-size: 28rpx;
		text-overflow: ellipsis;
	}
</style>
