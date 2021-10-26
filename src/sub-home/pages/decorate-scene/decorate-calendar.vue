<template>
	<view class="calendarWrap">
		<view class="fixed">
			<view class="calendar">
				<dark-calendar :signeddates="signeddates" @filterDynamics="filterDynamics"
					:projectId="projectId" :showMemo="showMemo" @changeMargin="changeMargin"
					></dark-calendar>
			</view>
			<view class="top">
				<view class="title">装修动态</view>
			</view>
		</view>
		<view class="dynamic" :class="{'noDynamics': !dynamics.length,'weekModel': isWeek,'maxMargin': bigMonth}">
			
			<view class="noDynamics" v-if="!dynamics.length">
				<image class="noDynamicsImg" src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/pic_empty%402x.png"></image>
				<view class="text">暂无装修动态</view>
				<view class="bottom"></view>
			</view>
			<view class="list" v-else>
				<view class="item" v-for="(item,index) in dynamics" :key="item.id">
					<image class="avatar" :src="item.avatar+'?x-oss-process=image/resize,m_mfit,w_37,h_37'"></image>
					<view class="acitonInfo">
						<view class="header">
							<view>
								<view class="workerName">{{item.userName}}</view>
								<view class="role">{{item.roleName}}</view>
							</view>
							<view class="date">{{item.normDateStr}}</view>
						</view>
						<view class="report">{{item.content}}</view>
						<view class="evidence">
							<imagePreview
							  :list='item.imagesList'
							  :imgWidth='192'
							  :imgHeight="192"
							  :lineSpace='10'
							  :colSpace="11"
							  :row="2"
							></imagePreview>
						</view>
						<view class="footer">
							<view class="actionType">{{item.recordName}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom" v-if="dynamics.length">
				<view class="text">暂时没有更多数据~</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from "../../../utils/common.js"
	import {getSigneddates,getDynamics} from "../../../api/real-case.js"
	import darkCalendar from "../../components/dark-calendar/dark-calendar"
	import imagePreview from "../../../components/image-preview/image-preview.vue"
	
	export default {
		filters:{
			formatDate
		},
		components:{
			darkCalendar,
			imagePreview
		},
		data() {
			return {
				signeddates: [],
				projectId: 0,
				showMemo: false,
				dynamics: [],
				dynamicPage: 1,
				date: "",//选中日期,
				isWeek: false,
				bigMonth: false
			};
		},
		onLoad(option) {
			this.projectId = option.projectId
			this.showMemo = option.isDecorate === "1" ? true: false
		},
		onReachBottom() {
			if(!this.date)return
			this.dynamicPage+=1;
			this.filterDynamics(this.date);
		},
		watch: {
			
		},
		mounted(){
			//当天日期
			let y = new Date().getFullYear()
			let mon = new Date().getMonth()+1
			let m = mon < 10? `0${mon}` : mon
			let d = new Date().getDate()
			this.date = `${y}-${m}-${d}`
			this.filterDynamics(this.date);
			this.requestSigns()
		},
		methods:{
			changeMargin(isShrink,length){
				this.isWeek = !isShrink
				this.bigMonth = length && length === 42? true: false
				
			},
			requestSigns(){
				let y = new Date().getFullYear()
				let m = new Date().getMonth() + 1
				let mon = m < 10 ? `0${m}`: m
				getSigneddates(this.projectId,`${y}${mon}`).then(data => {
					if(!data.length)return
					this.signeddates = data.map(item => {
						item.day = formatDate(item.day,'YYYY-MM-DD')
						return item
					})
				})
			},
			filterDynamics(date,isClick){
				this.date = date
				let params = {
					page: isClick ? 1 : this.dynamicPage,
					rows: 10,
					projectId: this.projectId,
					recordDateStr: this.date
				}
				getDynamics(params).then(data => {
					if(data){
						let {list,page} = data
						this.dynamicPage = page
						if(this.dynamicPage === 1){
							this.dynamics = list || []
						}else{
							if(list ){
								this.dynamics.push(...list)
							}else{
								this.dynamics = this.dynamics.concat([])
							}
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.calendarWrap{
		width: 100%;
		background: #f2f5f8;
		display: flex;
		flex-direction: column;
	}
	.fixed{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.calendar{
		width: 100%;
		height: fit-content;
	}
	.dynamic{
		width: 100%;
		height: fit-content;
		margin-top: 742rpx;
		background: #ffffff;
		flex: 1;
	}
	.dynamic.maxMargin{
		margin-top: 832rpx;
	}
	.dynamic.weekModel{
		margin-top: 384rpx;
	}
	.dynamic.noDynamics{
		margin-bottom: 0;
	}
	
	.fixed .top{
		width: 100%;
		height: 140rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
	}
	.top .title{
		width: 128rpx;
		height: 44rpx;
		margin-top: 56rpx;
		margin-left: 32rpx;
		margin-bottom: 40rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.noDynamics {
		width: 750rpx;
		height: fit-content;
	}
	.noDynamics .noDynamicsImg{
		width: 750rpx;
		height: 580rpx;
		display: block;
		margin-top: 40rpx;
	}
	.noDynamics .text{
		width: 156rpx;
		height: 36rpx;
		font-size: 26rpx;
		color: #999999;
		margin: 24rpx 298rpx;
	}
	.noDynamics .bottom {
		width: 750rpx;
		height: 372rpx;
	}
	.dynamic .bottom{
		width: 100%;
		height: 126rpx;
		background: #f5f6f6;
	}
	.dynamic .bottom .text{
		width: 222rpx;
		height: 26rpx;
		background: #f5f6f6;
		margin: 0 264rpx 80rpx 264rpx;
		padding-top: 60rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.list{
		width: 100%;
		height: fit-content;
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
		margin-top: 32rpx;
		margin-left: 32rpx;
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
		width: 598rpx;
		height: 42rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.acitonInfo .report{
		width: 598rpx;
		word-wrap: break-word;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		/* max-height: 120rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3; */
	}
	.acitonInfo .evidence{
		width: 100%;
		height: fit-content;
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
		max-width: 330rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		width: 140rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .actionType{
		width: fit-content;
		/* width: 104rpx; */
		height: 32rpx;
		padding: 0 8rpx;
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
