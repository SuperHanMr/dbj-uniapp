<template>
	<view class="wrap">
		<view class="main" v-if="details.length">
			<view class="item" v-for="item in details" :key="item.id">
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_income.png"
					class="icon" v-if="item.transferType === 17"></image>
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_consumes.png"
					class="icon" v-if="item.transferType === 18"></image>
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_refunds.png" class="icon"
					v-if="item.transferType === 19 || item.transferType === 20"></image>
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_cardRefund.png"
					class="icon" v-if="item.transferType === 21"></image>
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_cancelRefund.png"
					class="icon" v-if="item.transferType === 22"></image>
				<view class="content">
					<view class="left">
						<view class="category">{{item.transferTypeName}}</view>
						<view class="time">
							{{item.createTime|formatDate('YYYY/MM/DD HH:mm')}}
						</view>
					</view>
					<view class="right">
						<view class="num price-font">{{(item.transferInoutType === 1? '+': '-')+(item.amount/100)}}</view>
					</view>
				</view>
			</view>
			<view class="tip" v-if="noMore">没有更多了～</view>
		</view>
		<view class="noDetails" v-else>
			<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/list_empty.png"></image>
			<view class="text">暂无账单明细</view>
		</view>
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
				noMore: false,
				hasData: false
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
				getBillingDetails(params).then(data => {
					if(data){
						if(data.length){
							this.lastOneId = data[data.length-1].id
						}else{
							this.noMore = true
						}
						this.details = this.details.concat(data)
						this.hasData = this.details.length ? true : false
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
		background: #FFFFFF;
	}
	.main{
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
	.item{
		width: 718rpx;
		height: 76rpx;
		padding: 38rpx 32rpx;
		padding-right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.icon{
		width: 48rpx;
		height: 48rpx;
		display: block;
		margin-top: 14rpx;
		margin-right: 24rpx;
	}
	.content{
		width: 644rpx;
		height: 152rpx;
		padding-right: 32rpx;
		border-bottom: 1rpx solid #f3f3f3;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.category{
		/* width: 56rpx; */
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.time{
		margin-top: 8rpx;
		/* width: 326rpx; */
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
	.noDetails{
		width: 750rpx;
		min-height: 1500rpx;
		padding-top: 408rpx;
		background: #FFFFFF;
	}
	.noDetails image{
		width: 402rpx;
		height: 416rpx;
		display: block;
		margin-left: 174rpx;
	}
	.noDetails .text{
		width: 198rpx;
		height: 40rpx;
		margin-left: 291rpx;
		font-size: 28rpx;
		color: #999999;
	}
</style>
