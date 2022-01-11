<template>
	<view class="container" >
		<view class="evaluate-container" v-if="evaluateList.length">
			<view class="evaluate-item" v-for="item in evaluateList" :key="item.id">
				<view class="header">
					<view class="store-name">
						<text>{{item.typeName}}</text>
					</view>
					<view class="order-status" v-if="item.commentStatus == 0" style="color: #fc8b19;">
						待评价
					</view>
					<view class="order-status" v-if="item.commentStatus == 1">
						已评价
					</view>
				</view>
				<view class="body" v-for="item2 in item.details" :key="item2.id">
					<order-item :dataList="item2" :isEvaluate="isEvaluate"></order-item>
				</view>
				
				<view class="line" />
				
				<view class="footer" v-if="item.commentStatus == 0 ">
					<view class="button-container">
						<view class="immediate-evaluate" @click="immediateEvalute(item)">
							立即评价
						</view>
					</view>
				</view>
				<view class="footer" v-if="item.commentStatus == 1 ">
					<view class="button-container">
						<view class="review-detail" @click="gotoDetail(item)">
							查看评价
						</view>
					</view>
				</view>
			
			</view>
		</view>
		
		<view class="empty-container" v-else>
			<view class="empty-page">
				<image src="../../static/img_noOrder.svg" mode=""></image>
				<text>您暂时没有相关订单哦～</text>
			</view>
		</view>
	</view>
	

</template>

<script>
	import {getEvationList} from "@/api/order.js"
	export default {
		data() {
			return {
				query:{
					page:1,
					rows:15,
				},
				loading:false,
				totalPage: '',
				totalRows: '',
				evaluateList:[],
				isEvaluate:true
			}
		},
		onShow() {
			this.evaluateList=[];
			this.getList()
		},
		
		//下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
					uni.stopPullDownRefresh();
			}, 1000);
		}, 
		
		//页面上拉触底事件的处理函数
		onReachBottom(e) {
			if (this.loading || this.query.page > this.totalPage) return
			this.getList();
		},
		
		methods: {
			getList(){
				this.loading= true
				getEvationList({page:1,rows:15}).then(data=>{
					console.log("data=",data)
					let list = data.list
					this.evaluateList = this.evaluateList.concat(list)
					console.log("evaluateList=",this.evaluateList)
					this.query.page = data.page + 1;
					this.totalPage = data.totalPage;
					this.totalRows = data.totalRows;
					this.loading=false
				})
			},
	
			immediateEvalute(item){
				console.log("立即评价");
				uni.navigateTo({
					url:`immediate-evaluate/immediate-evaluate?typeName=${item.typeName}&id=${item.id}&type=${item.type}&serverName=${item.serverName}&serverRoleName=${item.serverRoleName}&serverAvatar=${item.serverAvatar}`,
				})
			},
			
			gotoDetail(item){
				console.log("item.id=",item.id)
				uni.navigateTo({
					url:`evaluate-detail/evaluate-detail?id=${item.id}&typeName=${item.typeName}`
				})
				console.log("hhhhhhhh")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100%;
		background-color: #FFFFFF;
	}
	.evaluate-container{
		background-color: #E3E3E3;
		.evaluate-item{
			background-color: #FFFFFF;
		}
	}
	.header {
		height: 96rpx;
		margin-top: 16rpx;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
		background-color: #fafafa;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.store-name {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			text {
				font-weight: 500;
				color: #333333;
				max-width: 476rpx;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.order-status {
			color: #808080;
			font-size: 24rpx;
			line-height: 32rpx;
			// font-weight: 800;
		}
	}
	
	.body{
		padding: 32rpx 32rpx 0;
	}
	
	.line {
		width: 100%;
		height: 0.5px;
		background-color: #f2f2f2;
	}

	.footer {
		display: flex;
		flex-flow: row nowrap;
		justify-content:  flex-end;
		padding: 32rpx;
		// text-align: right;
		background-color: #ffffff;
		
		.button-container{
			display: flex;
			flex-flow: row nowrap;
			justify-content:  flex-end;
			.immediate-evaluate,.review-detail{
				width: 140rpx;
				height: 56rpx;
				line-height: 54rpx;
				box-sizing: border-box;
				text-align: center;
				font-size: 24rpx;
				display: block;
				border-radius: 32rpx;
				color: #FFFFFF;
				padding: 0;
			}
			.immediate-evaluate{
				background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%) 	
			}
			.review-detail{
				color: #333333;
				border: 0.5px solid #CCCCCC;
			}
		}
	}
	
	button{
		display: none;
	}
	button::after {
	  border: none;
	}
	
	page{
		background-color: #ffffff !important;
	}
	.empty-container{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.empty-page{
			padding: 362rpx 176rpx 0 174rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			image{
				width: 400rpx;
				height: 400rpx;
				object-fit: cover;
			}
			text{
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>
