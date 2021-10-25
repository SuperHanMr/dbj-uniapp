<template>
	<view class="memoWrap" :class="{'bg':!memos.length}">
		<custom-navbar opacity="1" :title="title" titleColor="#000" bgcolor="white">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white" style="color: black;"></i>
				</view>
			</template>
		</custom-navbar>
		<!-- 占位 -->
		<view :style="{height:navBarHeight}"></view>
		<view class="noMemo" v-if="!memos.length">
			<image class="noMemoImg"
				src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/memo_empty%402x.png"></image>
			<view class="noMemoText">暂无内容~</view>
		</view>
		<view class="memoItem" v-else v-for="item in memos" :key="item.memoId">
			<view class="header">
				<view class="userInfo">
					<image class="avatar" :src="item.promulgator.avatar"></image>
					<view class="userName">{{item.publisherFlag?'我':item.promulgator.userName}}</view>
					<view class="role">{{item.promulgator.roleName}}</view>
				</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<view class="content" @click="toMemoDetail(item.memoId)">
				<view class="text">{{item.content}}</view>
				<view class="remark">
					<view class="cueMe" v-if="!item.publisherFlag">提到了我</view>
					<view class="list" v-else>
						<view class="cueOthers" v-for="(name,index) in item.reminderList" :key="index">@{{name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="memos.length">
			<view class="text">暂时没有更多数据~</view>
		</view>
		<view class="new" @click="toNewMemo">
			<image class="create" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_create_memo%402x.png"></image>
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
				title: "备忘录",
				fromNewMemo: false,
				navBarHeight: "",
				page: 1
			}
		},
		onLoad(option) {
			this.projectId = option.projectId
			this.fromNewMemo = option.fromNewMemo && option.fromNewMemo === '1'? true: false
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		onShow() {
			uni.$on('new-memo',() => {
				this.page = 1
				this.requestPage()
			})
		},
		onReachBottom() {
			this.page+=1
			this.requestPage()
		},
		mounted() {
			this.requestPage()
		},
		methods:{
			toBack(){
				if(this.fromNewMemo){
					uni.navigateTo({
						url: `/sub-home/pages/decorate-scene/decorate-calendar?projectId=${this.projectId}&isDecorate=1`,
					})
				}else{
					uni.navigateBack({})
				}
			},
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
				let params = {
					page: this.page,
					rows: 10
				}
				getMemos(this.projectId,params).then(data => {
					if(data){
						let {list,page} = data
						this.page = page
						if(this.page === 1){
							if(list !== undefined){
								this.memos = list
							}else{
								this.memos = []
							}
						}else{
							if(list !== undefined){
								this.memos.push(...list)
							}else{
								this.memos = this.memos.concat([])
							}
						}
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
		opacity: 0.8;
		background: #00c2b8;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 40rpx;
		bottom: 80rpx;
	}
	.new .create{
		width: 32rpx;
		height: 32rpx;
		display: block;
	}
	.memoWrap{
		width: 100%;
		margin-bottom: 80rpx;
	}
	.memoWrap.hasMemo{
		padding-bottom: 80rpx;
		margin-bottom: 0;
	}
	.memoWrap.bg{
		background: #fff;
	}
	.memoWrap .bottom{
		width: 100%;
		height: 126rpx;
		background: #f5f6f6;
	}
	.memoWrap .bottom .text{
		width: 222rpx;
		height: 26rpx;
		background: #f5f6f6;
		margin: 0 264rpx 80rpx 264rpx;
		padding-top: 60rpx;
		font-size: 26rpx;
		color: #999999;
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
		max-width: 282rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		height: fit-content;
		margin-left: 32rpx;
		padding: 24rpx 0;
		background: #f5f6f6;
		border-radius: 16rpx;
	}
	.content .text{
		margin-left: 24rpx;
		width: 638rpx;
		max-height: 80rpx;
		color: #333333;
		font-size: 28rpx;
		font-weight: 500;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.content .remark{
		display: flex;
		margin-top: 16rpx;
		margin-left: 32rpx;
		font-size: 28rpx;
		color: #999999;
	}
	.remark .cueMe{
		width: 112rpx;
	}
	.remark .list{
		max-width: 638rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.remark .cueOthers{
		max-width: 370rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 40rpx;
	}
</style>
