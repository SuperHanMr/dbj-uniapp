<template>
	<view class="videoContainer">
		<view class="liveSite">VideoSite</view>
		<view class="liveRecord">
			<view class="title">直播速看</view>
			<view class="liveList">
				<view class="liveItem">
					<view class="top">
						<view class="dot"></view>
						<view class="date">2021-06-22 周二</view>
						<view class="stepName">水电阶段</view>
					</view>
					<view class="bottom">
						<view class="line"></view>
						<view class="video"></view>
					</view>
				</view>
				<view class="liveItem">
					<view class="top">
						<view class="dot"></view>
						<view class="date">2021-06-22 周二</view>
						<view class="stepName">水电阶段</view>
					</view>
					<view class="bottom">
						<view class="line"></view>
						<view class="video"></view>
					</view>
				</view>
				<view class="liveItem">
					<view class="top">
						<view class="dot"></view>
						<view class="date">2021-06-22 周二</view>
						<view class="stepName">水电阶段</view>
					</view>
					<view class="bottom">
						<view class="line"></view>
						<view class="video"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.videoContainer{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.liveSite{
		width: 750rpx;
		height: 422rpx;
		background: pink;
	}
	.liveRecord{
		width: 100%;
		height: 1000rpx;
		overflow: auto;
	}
	.liveRecord .title{
		width: 128rpx;
		height: 44rpx;
		margin: 28rpx 0 24rpx 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}
	.liveList{
		/* margin: 0 32rpx; */
	}
	.liveItem{
		
	}
	.liveItem:first-child{
		margin-top: 24rpx;
	}
	
	.liveItem .top{
		width: 686rpx;
		height: 40rpx;
		display: flex;
		margin: 0 32rpx;
	}
	.top .dot{
		width: 20rpx;
		height: 20rpx;
		background: rgba(53,196,196,0.11);
		border: 1rpx solid #35c4c4;
		border-radius: 50%;
		margin-top: 10rpx;
		margin-right: 16rpx;
	}
	.top .date{
		width: 230rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		/* line-height: 40rpx; */
	}
	.top .stepName{
		width: 112rpx;
		height: 40rpx;
		margin-left: 305rpx;
		font-size: 28rpx;
		color: #35c4c4;
		/* line-height: 40rpx; */
	}
	.liveItem .bottom{
		width: 670rpx;
		height: 452rpx;
		margin-left: 41rpx;
		border-left: 2rpx dashed #2fcfc9;
	}
	.bottom .video{
		width: 650rpx;
		height: 368rpx;
		padding-top: 24rpx;
		margin-left: 25rpx;
		background-color: pink;
	}
</style>
