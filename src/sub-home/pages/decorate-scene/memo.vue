<template>
	<view class="memoWrap">
		<view class="memoItem" @click="toMemoDetail">
			<view class="header">
				<view class="userInfo">
					<image class="avatar" src="../../static/avatar@2x(1).png"></image>
					<view class="userName">姜文</view>
					<view class="role">管家</view>
				</view>
				<view class="time">2021-08-16 09:12</view>
			</view>
			<view class="content">
				<view class="text">
					尊敬的业主，打扮家管家-姜文为您家管家，为您家装修保驾护航，您家现在的阶段是水电拆改，今…
				</view>
				<view class="remark">提到了我</view>
			</view>
		</view>
		<view class="memoItem">
			<view class="header">
				<view class="userInfo">
					<image class="avatar" src="../../static/avatar@2x(1).png"></image>
					<view class="userName">我</view>
					<view class="role">业主</view>
				</view>
				<view class="time">2021-08-16 09:12</view>
			</view>
			<view class="content">
				<view class="text">
					管家姜文您好，我发现工地有些脏乱，请您到现场监测一下，是否施工符合工地的规范，请不要在…
				</view>
				<view class="remark">@田管家</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			toMemoDetail(){
				uni.navigateTo({
					url:"/sub-home/pages/decorate-scene/memo-detail"
				})
			}
		}
	}
</script>

<style>
	.memoWrap{
		width: 100%;
		height: 100%;
		overflow: auto;
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
		width: 210rpx;
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
		width: 112rpx;
		height: 40rpx;
		margin-top: 16rpx;
		margin-left: 32rpx;
		font-size: 28rpx;
		color: #999999;
	}
</style>
