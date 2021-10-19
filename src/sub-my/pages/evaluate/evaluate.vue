<template>
	<view >
		<view class="evaluate-container" v-if="evaluateList.length">
			<view class="evaluate-item" v-for="item in evaluateList" :key="item.id">
				<view class="header">
					<view class="store-name">
						<text>{{item.typeName}}</text>
					</view>
					<view class="order-status" v-if="item.commentStatus == 0">
						待评价
					</view>
					<view class="order-status" v-if="item.commentStatus == 1">
						已评价
					</view>
				</view>
				<view class="body" v-for="item2 in item.details" :key="item2.id">
					<order-item :dataList="item2"></order-item>
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
							查看详情
						</view>
					</view>
				</view>
			
			</view>
		</view>
		
		<view class="empty-container" v-else>
			<view class="empty-page">
				<image src="../../static/empty_page@2x.png" mode=""></image>
				<text>暂无相关订单</text>
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
					url:`immediate-evaluate/immediate-evaluate?id=${item.id}&type=${item.type}&serverName=${item.serverName}&serverRoleName=${item.serverRoleName}&serverAvatar=${item.serverAvatar}`,
				})
			},
			
			gotoDetail(item){
				console.log("item.id=",item.id)
				uni.navigateTo({
					url:`evaluate-detail/evaluate-detail?id=${item.id}`
				})
				console.log("hhhhhhhh")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-container{
		
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
				font-weight: 1000;
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
		padding: 24rpx 32rpx;
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
				background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);   	
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
		background-color: #ffff !important;
	}
	.empty-container{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.empty-page{
			padding: 484rpx 254rpx 800rpx 256rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			image{
				width: 240rpx;
				height: 240rpx;
				object-fit: cover;
				margin-bottom: 24rpx;
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
