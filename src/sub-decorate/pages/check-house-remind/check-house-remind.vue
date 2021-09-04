<template>
	<view class="check-house-remind">
		<view class="avtor-wrap flex-row-bet">
			<view class="flex-row-start">
				<image class="avtor"></image>
				<view class="tigs">
					<view class="username">李易峰</view>
					<view class="role">管家</view>
				</view>
			</view>
			<view class="date">2020-09-09 09:00:00</view>
		</view>
		<view class="tips">
			<view class="tips-1">业主您好</view>
			<view class="tips-2">和你预约的上门时间为</view>
			<view class="tips-3">2021-09-10 12:00:00</view>
		</view>
		
		<view class="tips">
			<view class="tips-t">验房前准备</view>
			<view class="tips-c">
				这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第一个版本可支持语音和视频这里的文字是识别出来的。这里展示验房人员在总结中的文字稿，不可隐藏，所有的内容都展示。第一有的内容都展示所有的内容都展示
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.check-house-remind {
	background: #f5f6f6;
	height: 100%;
}
.avtor-wrap {
	margin: 60rpx 32rpx 48rpx 48rpx;
	.avtor {
		width: 104rpx;
		height: 104rpx;
		border: 2rpx solid #000;
		border-radius: 50%;
		margin-right: 16rpx;
		margin-bottom: 8rpx;
	}
	.tigs {
		.username {
			width: 90rpx;
			height: 42rpx;
			font-size: 30rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 700;
			text-align: left;
			color: #333333;
			line-height: 42rpx;
		}
		.role {
			height: 32rpx;
			background: linear-gradient(45deg,#6d95ef, #84b9fc);
			border-radius: 6rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 32rpx;
		}
	}
	.date {
		height: 36rpx;
		font-size: 26rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: right;
		color: #666666;
		line-height: 36rpx;
	}
}
.flex-row-bet {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
}
.flex-row-start {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
}
.tips {
	padding: 32rpx;
	margin: 0 24rpx 32rpx;
	background-color: #fff;
	border-radius: 24rpx;
}
.tips-1 {
	height: 40rpx;
	font-size: 28rpx;
	font-family: PingFangSC, PingFangSC-Medium;
	font-weight: 700;
	text-align: left;
	color: #666666;
	line-height: 40rpx;
	margin-bottom: 16rpx;
}
.tips-2 {
	margin-bottom: 32rpx;
	height: 40rpx;
	font-size: 28rpx;
	font-family: PingFangSC, PingFangSC-Regular;
	font-weight: 400;
	text-align: left;
	color: #666666;
	line-height: 40rpx;
}
.tips-3 {
	height: 96rpx;
	padding: 20rpx;
	background: #f5f6f6;
	border-radius: 12rpx;
	height: 56rpx;
	font-size: 40rpx;
	font-family: PingFangSC, PingFangSC-Medium;
	font-weight: 700;
	text-align: left;
	color: #00c2b8;
	line-height: 56rpx;
	margin-bottom: 8rpx;
}
.tips-t {
	height: 44rpx;
	font-size: 32rpx;
	font-family: PingFangSC, PingFangSC-Medium;
	font-weight: 700;
	text-align: left;
	color: #333333;
	line-height: 44rpx;
	margin-bottom: 16rpx;
}
.tips-c {
	height: 200rpx;
	font-size: 26rpx;
	font-family: PingFangSC, PingFangSC-Regular;
	font-weight: 400;
	text-align: left;
	color: #666666;
	line-height: 40rpx;
	letter-spacing: 1rpx;
}
</style>
