<template>
	<view class="detailWrap">
		<view class="topArea">
			<view class="userInfo">
				<image class="avatar" src="../../static/avatar@2x(1).png"></image>
				<view class="userName">{{flag===1?'姜文':'我'}}</view>
				<view class="role">{{flag===1?'管家':'业主'}}</view>
			</view>
			<view class="time">2021-08-16 09:12</view>
		</view>
		<view class="content">
			<view class="remark">{{flag===1?'提到了我':'@田管家'}}</view>
			<view class="text">
				尊敬的业主，打扮家管家-姜文为您家管家，为您家装修保驾护航，您家现在的阶段是水电拆改，
				如果在涂料不够的情况下，可以先把一面墙给涂好面料，以免导致一面墙差生两种颜色。另外可以在不同的居室中使用，
				减少色差的影响。 墙角的缺口往往最为让人不留意，如果墙角在装修完毕入住时才发现墙角出现缺口该怎么办呢？
				小编建议，如果是白墙，可以用白水泥或大白粉或石膏粉，兑水后再加点乳白胶，补一下，最好能用白水泥，因为水泥的硬度好，
				能避免缺口的再次出现。

			</view>
		</view>
	</view>
</template>

<script>
	import {getMemoDetail} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				flag: 0,
				memoInfo: {}
			}
		},
		onLoad(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage',( data )=> {
				console.log(data)
				this.flag = data
			})  
		},
		mounted() {
			this.requestPage()
		},
		methods: {
			requestPage(){
				// getMemoDetail(projectId,memoId).then(data => {
				// 	if(data){
				// 		this.memoInfo = data
				// 	}
				// })
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
		width: 246rpx;
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
		width: 56rpx;
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
		width: 112rpx;
		height: 40rpx;
		margin-bottom: 16rpx;
		margin-left: 32rpx;
		font-size: 28rpx;
		color: #999999;
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
