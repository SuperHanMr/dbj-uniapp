<template>
	<view class="calendarWrap">
		<view class="calendar">
			<!-- <custom-calendar
			  :insert="true"
			  :lunar="false" 
			  :start-date="'2019-3-2'"
			  :end-date="'2019-5-20'"
				:selected="selectedList"
				:showMonth="false"
			  @change="change"
			/> -->
			<dark-calendar :signeddates="signeddates"></dark-calendar>
		</view>
		<view class="dynamic">
			<view class="top">
				<view class="title">装修动态</view>
			</view>
			<view class="list">
				<view class="item">
				<!-- <view class="item" v-for="(item,index) in dynamics" :key="item.id">
					<image class="avatar" :src="item.avatar"></image> -->
					<image class="avatar" src="../../static/avatar@2x(1).png"></image>
					<view class="acitonInfo">
						<view class="header">
							<view>
								<view class="workerName">姜文</view>
								<!-- <view class="workerName">{{item.userName}}</view>
								<view class="role">{{item.nodeName}}</view> -->
								<view class="role">大管家</view>
							</view>
							<!-- <view class="date">{{item.normDateStr}}</view> -->
							<view class="date">2021-06-12</view>
						</view>
						<!-- <view class="report">{{item.content}}</view> -->
						<view class="report">尊敬的业主，您好！打扮家管家-姜文为您新家质量保驾护航，今日巡查房屋情况如下：今天停工</view>
						<view class="evidence">
							<!-- <image class="img" :src="url" v-for="(url,index) in item.imagesList.slice(0,6)" :key="index"></image> -->
							<!-- <imagePreview :list='item.imagesList' :imgWidth='192' :imgHeight="192" :lineSpace='10' :colSpace="11" :row="2"></imagePreview> -->
						</view>
						<view class="footer">
							<!-- <view class="actionType">{{item.recordName}}</view> -->
							<view class="actionType">开工签到</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from "../../../utils/common.js"
	import darkCalendar from "../../components/dark-calendar/dark-calendar"
	import {getSigneddates} from "../../../api/real-case.js"
	export default {
		filters:{
			formatDate
		},
		components:{
			darkCalendar
		},
		data() {
			return {
				selectedList:[{date: '2021-08-20', info: '签到'}],
				signeddates: [{day: '2021-9-20', status: 1}],
				projectId: 0
			};
		},
		onLoad(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage',( data )=> {
				// this.projectId = data
				this.projectId = 46
			})  
		},
		mounted(){
			this.requestSigns()
		},
		methods:{
			change(e){
				console.log(e)
			},
			requestSigns(){
				let y = new Date().getFullYear()
				let m = new Date().getMonth() + 1
				let mon = m < 10 ? '0'+m : m
				getSigneddates(this.projectId,y+mon).then(data => {
					console.log(data)
					if(!data.length)return
					this.signeddates = data.map(item => {
						item.day = formatDate(item.day,'YYYY-MM-DD')
						return item
					})
				})
			}
			
		}
	}
</script>

<style scoped>
	.calendarWrap{
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #f2f5f8;
	}
	.calendar{
		width: 100%;
		height: 620rpx;
	}
	.dynamic{
		width: 100%;
		height: 1200rpx;
		overflow: auto;
		margin-top: 24rpx;
		margin-bottom: 80rpx;
		background: #ffffff;
		border-radius: 40rpx;
	}
	.dynamic .top{
		width: 100%;
		height: 78rpx;
		display: flex;
		justify-content: space-between;
	}
	.top .title{
		width: 128rpx;
		height: 44rpx;
		margin-top: 32rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.top .filter{
		width: 104rpx;
		height: 46rpx;
		margin-top: 32rpx;
		margin-right: 32rpx;
		background: #f5f6f6;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
	}
	.top .filter .text{
		width: 48rpx;
		height: 34rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #333333;
	}
	.top .filter .icon{
		display: block;
		width: 14rpx;
		height: 8rpx;
		margin-left: 5rpx;
	}
	.list{
		width: 100%;
		height: 1200rpx;
		overflow: auto;
	}
	.item{
		width: 100%;
		display: flex;
	}
	.item .avatar{
		width: 74rpx;
		height: 74rpx;
		border-radius: 50%;
		display: block;
		margin-top: 39rpx;
		margin-left: 31rpx;
	}
	.item .acitonInfo{
		width: 598rpx;
		margin: 48rpx 32rpx 0 16rpx;
		padding-bottom: 36rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.item:last-child .acitonInfo{
		border-bottom: 0rpx;
	}
	.acitonInfo .header{
		width: 100%;
		height: 42rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.acitonInfo .report{
		width: 100%;
		height: 120rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.acitonInfo .evidence{
		width: 100%;
		height: 394rpx;
		margin: 16rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap
	}
	.evidence .img{
		width: 192rpx;
		height: 192rpx;
		display: block;
		margin-bottom: 10rpx;
		border-radius: 12rpx;
	}
	.acitonInfo .footer{
		width: 100%;
		height: 34rpx;
		display: flex;
		justify-content: space-between;
	}
	.acitonInfo .header>view{
		display: flex;
		align-items: center;
	}
	.acitonInfo .header .workerName{
		width: fit-content;
		/* width: 60rpx; */
		height: 42rpx;
		margin-right: 8rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 42rpx;
	}
	.acitonInfo .header .role{
		width: 82rpx;
		height: 32rpx;
		background: linear-gradient(45deg,#6d95ef, #84b9fc);
		border-radius: 6rpx;
		font-size: 22rpx;
		text-align: center;
		color: #ffffff;
		line-height: 32rpx;
	}
	.acitonInfo .header .date{
		width: 136rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .actionType{
		width: fit-content;
		/* width: 104rpx; */
		height: 32rpx;
		background: #f5f6f6;
		border-radius: 6rpx;
		font-size: 22rpx;
		color: #333333;
		text-align: center;
		line-height: 32rpx;
	}
	.acitonInfo .footer .right{
		width: 166rpx;
		height: 34rpx;
		display: flex;
	}
	.acitonInfo .footer .right>view{
		display: flex;
		align-items: center;
	}
	.acitonInfo .footer .right .text{
		width: 30rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .right .like{
		margin-right: 32rpx;
	}
	.acitonInfo .footer .like image{
		width: 26rpx;
		height: 26rpx;
		display: block;
		margin-right: 8rpx;
	}
	.acitonInfo .footer .comment image{
		width: 24rpx;
		height: 24rpx;
		display: block;
		margin-right: 8rpx;
	}
</style>
