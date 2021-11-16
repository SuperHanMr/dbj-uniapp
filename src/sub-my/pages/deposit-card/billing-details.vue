<template>
	<view class="wrap">
		<view class="container">
			<view class="main">
				<view class="item">
					<view class="icon"></view>
					<view class="content">
						<view class="left">
							<view class="category">充值</view>
							<view class="order">
								订单号：12345678909876
							</view>
						</view>
						<view class="right">
							<view class="num price-font">+440.00</view>
							<view class="date">2021/11/12 21:33</view>
						</view>
					</view>
				</view>
				<view class="item" v-for="item in details" :key="item.id">
					<view class="icon"></view>
					<view class="content">
						<view class="left">
							<view class="category">{{item.transferTypeName}}</view>
							<view class="order">
								订单号：{{item.orderNum}}
							</view>
						</view>
						<view class="right">
							<view class="num price-font">{{(item.transferInoutType === 1? '+': '-')+item.amount}}</view>
							<view class="date">{{item.createTime|formatDate('YYYY/MM/DD HH:mm')}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tip" v-if="noMore">没有更多了～</view>
		</view>
		<!-- <view class="noRecords">
			<image src="https://ali-image.dabanjia.com/static/mp/capsule-store/share/empty_records.png"></image>
			<view class="text">暂无账单明细</view>
		</view> -->
	</view>
</template>

<script>
	import {getBillingDetails} from "../../../api/user.js"
	import {formatDate} from "../../../utils/common.js"
	export default {
		filters: {
			formatDate
		},
		data(){
			return {
				details: [],
				lastOneId: -1,
				noMore: false
			}
		},
		onReachBottom() {
			this.requestPage()
		},
		mounted() {
			this.requestPage()
		},
		methods: {
			requestPage(){
				let params = {
					limit: 10,
					lastId: this.lastOneId
				}
				getBillingDetails().then(data => {
					if(data){
						if(data.length){
							this.lastOneId = data[data.length-1].id
						}else{
							this.noMore = true
						}
						this.details = this.details.concat(data)
						console.log(this.details,this.lastOneId)
					}
					console.log(data)
				})
			}
		}
	}
</script>

<style scoped>
	.wrap{
		width: 750rpx;
		min-height: 1500rpx;
		background-color: #F5F6F7;
	}
	.container{
		padding-bottom: 80rpx;
	}
	.tip{
		width: 144rpx;
		height: 34rpx;
		margin-top: 32rpx;
		margin-left: 303rpx;
		font-size: 24rpx;
		color: #999999;
	}
	.main{
		
	}
	.item{
		width: 718rpx;
		height: 76rpx;
		padding: 38rpx 32rpx;
		padding-right: 0;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.icon{
		width: 48rpx;
		height: 48rpx;
		margin-top: 14rpx;
		margin-right: 24rpx;
		background: pink;
	}
	.content{
		width: 644rpx;
		height: 152rpx;
		padding-right: 32rpx;
		border-bottom: 2rpx solid #f3f3f3;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.category{
		width: 56rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.order{
		width: 326rpx;
		height: 28rpx;
		font-size: 22rpx;
		color: #999999;
		display: flex;
	}
	.num{
		text-align: right;
		font-size: 36rpx;
		color: #333333;
	}
	.date{
		width: 178rpx;
		height: 28rpx;
		font-size: 22rpx;
		color: #cccccc;
	}
	.noRecords{
		width: 750rpx;
		min-height: 1500rpx;
		padding-top: 308rpx;
		background: #FFFFFF;
	}
	.noRecords image{
		width: 360rpx;
		height: 360rpx;
		display: block;
		
		margin-left: 195rpx;
	}
	.noRecords .text{
		width: 198rpx;
		height: 34rpx;
		margin-top: 12rpx;
		margin-left: 291rpx;
		font-size: 28rpx;
		color: #999999;
	}
</style>
