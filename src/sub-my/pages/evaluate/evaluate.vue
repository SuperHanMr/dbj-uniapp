<template>
	<view class="evaluate-container">
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
			<view class="body" v-for="item2 in item.details">
				<order-item :dataList="item2"></order-item>
			</view>
			<view class="line" />
			
			<view class="footer">
				<view class="button-container">
					<button
						type="default"
						size="mini"
						@click="immediateEvalute()"
					>立即评价</button>
				</view>
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
					position:""
				},
				loading:false,
				totalPage: '',
				totalRows: '',
				evaluateList:[],
			}
		},
		onLoad() {
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
		onReachBottom() {
			if (this.loading || this.page >= this.totalPage) return
			this.getList();

					
				
		},
		methods: {
			getList(){
				this.loading=true
				getEvationList(this.query).then(data=>{
					console.log("data=",data)
					let list = data.list
					this.evaluateList = this.evaluateList.concat(list)
					this.loading=false
					this.query.page = data.page + 1;
					this.totalPage = data.totalPage;
					this.totalRows = data.totalRows;
				})
			},
	
			immediateEvalute(){
				console.log("立即评价");
				uni.navigateTo({
					url:"immediate-evaluate/immediate-evaluate",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-container{
		// width: 100%;
		// height: 100%;
		// background-color: skyblue;
		// overflow-y: auto;
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
		height: 1rpx;
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
				button{
					width: 140rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					font-size: 24rpx;
					display: block;
					border-radius: 32rpx;
					// border: 2rpx solid #CCCCCC;
					color: #FFFFFF;
					padding: 0;
					background: linear-gradient(135deg, #36D9CD 0%, #28C6C6 100%);   
				}
		}
	}
	button{
		display: none;
	}
	button::after {
	  border: none;
	}
</style>
