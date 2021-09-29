<template>
	<view class="memoWrap" :class="{'bg':!memos.length}">
		<view class="noMemo" v-if="isNoMemo">
			<image class="noMemoImg" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/pic_empty%402x.png"></image>
			<view class="noMemoText">暂无内容~</view>
		</view>
		<view class="memoItem" v-else v-for="item in memos" :key="item.memoId">
			<view class="header">
				<view class="userInfo">
					<image class="avatar" :src="item.promulgator.avatar"></image>
					<view class="userName">{{item.promulgator.userName}}</view>
					<view class="role">{{item.promulgator.roleName}}</view>
				</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<view class="content" @click="toMemoDetail(item.memoId)">
				<view class="text">{{item.content}}</view>
				<view class="remark">
					<view class="cueMe" v-if="!item.publisherFlag">提到了我</view>
					<view class="cueOthers" v-else v-for="(name,index) in item.reminderList" :key="index">@{{name}}</view>
				</view>
			</view>
		</view>
		<view class="new" @click="toNewMemo">
			<image class="create" src="../../static/ic_create_memo@2x.png"></image>
		</view>
	</view>
</template>

<script>
	import {getMemos} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				memos: [],
				projectId: 0,
				isNoMemo: false
			}
		},
		onLoad(option) {
			this.projectId = option.projectId
		},
		mounted() {
			this.requestPage()
		},
		methods:{
			toNewMemo(){
				uni.navigateTo({
					url: `/sub-home/pages/decorate-scene/new-memo?projectId=${this.projectId}`
				})
			},
			toMemoDetail(id){
				uni.navigateTo({
					url: `/sub-home/pages/decorate-scene/memo-detail?memoId=${id}`
				})
			},
			requestPage(){
				getMemos(this.projectId).then(data => {
					if(data){
						let {list} = data
						this.memos = list || []
						this.isNoMemo = !list.length
					}
				})
			}
		}
	}
</script>

<style scoped>
	.new{
		width: 104rpx;
		height: 104rpx;
		opacity: 0.9;
		background: #00c2b8;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 40rpx;
		bottom: 20rpx;
	}
	.new .create{
		width: 32rpx;
		height: 32rpx;
		display: block;
	}
	.memoWrap{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.memoWrap.bg{
		background: #fff;
	}
	.noMemo{
		width: 100%;
		height: fit-content;
		margin-top: 184rpx;
	}
	.noMemo .noMemoImg{
		width: 750rpx;
		height: 580rpx;
		display: block;
	}
	.noMemo .noMemoText{
		width: fit-content;
		height: 36rpx;
		margin-top: 24rpx;
		margin-left: 324rpx;
		font-size: 26rpx;
		color: #999999;
	}
	
	.memoItem{
		width: 750rpx;
		height: 328rpx;
		margin-top: 16rpx;
		background: #ffffff;
	}
	.header{
		margin: 0 32rpx 24rpx;
		padding-top: 32rpx;
		width: 686rpx;
		height: fit-content;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header .time{
		width: 242rpx;
		height: 34rpx;
		color: #999999;
		font-size: 24rpx;
	}
	.header .userInfo{
		width: fit-content;
		height: 56rpx;
		display: flex;
		align-items: center;
	}
	.userInfo .avatar{
		width: 56rpx;
		height: 56rpx;
		display: block;
		border-radius: 50%;
	}
	.userInfo .userName{
		width: 52rpx;
		height: 36rpx;
		margin: 0 16rpx;
		font-size: 26rpx;
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
		width: 686rpx;
		height: 184rpx;
		margin-left: 32rpx;
		background: #f5f6f6;
		border-radius: 16rpx;
	}
	.content .text{
		margin-left: 24rpx;
		padding-top: 24rpx;
		width: 638rpx;
		height: 80rpx;
		color: #333333;
		font-size: 28rpx;
		text-overflow: ellipsis;
	}
	.content .remark{
		display: flex;
		width: fit-content;
		height: 40rpx;
		margin-top: 16rpx;
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
</style>
