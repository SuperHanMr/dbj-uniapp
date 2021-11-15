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
							<view class="num">+440.00</view>
							<view class="date">2021/11/12 21:33</view>
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
	import {getShares} from "../../../api/user.js"
	export default {
		data(){
			return {
				records: [],
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
					pageSize: 10,
					pageMaxId: this.lastOneId
				}
				getShares(params).then(data => {
					if(data){
						if(data.length){
							this.lastOneId = data[data.length-1].id
						}else{
							this.noMore = true
						}
						this.records = this.records.concat(data)
					}
					console.log(data,this.records,this.lastOneId)
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
		width: 750rpx;
		height: 152rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.content{
		width: 644rpx;
		height: 152rpx;
		border-bottom: 2rpx solid #F3F3F3;
	}
	.category{
		width: 56rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.order{
		width: 52rpx;
		margin-left: 32rpx;
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
