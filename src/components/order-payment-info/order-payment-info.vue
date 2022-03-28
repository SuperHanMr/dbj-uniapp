<template>
	<view class="container" :style="{marginBottom:marginBottom +'rpx','margintTop':margintTop +'rpx'}">
		<view class="header">
			<view class="payText">
				支付方式
			</view>
			<view class="payment">
				公司转账
			</view>
		</view>
		<view class="line"></view>
		
		<view class="item">
			<text class="item-header" >戶名：</text>
			<view class="item-body">打扮家(北京)科技有限公司</view>
		</view>
		<view class="item">
			<text class="item-header">银行账号：</text>
			<text class="item-body">110928376810201</text>
		</view>
		<view class="item">
			<text class="item-header">开户行：</text>
			<text class="item-body">招商银行股份有限公司北京分行世纪城支行</text>
		</view>
		<view class="item">
			<text class="item-header">银行联行号：</text>
			<text class="item-body">308100005301</text>
		</view>
		
		<view class="item">
			<text class="item-header">汇款识别码：</text>
			<text class="item-body">{{orderInfo.remittanceCode}}</text>
		</view>
		<view class="introduce">
			汇款后超出1个工作日仍为“待付款”状态，请提供订单号及汇款单（汇款单包含收付款户名、收付款账号、付款金额、付款日期等），联系在线客服。
		</view>
		

	</view>
</template>

<script>
	import {formatDate} from "../../utils/common.js"
	export default {
		filters:{
			formatDate
		},
		name:"order-payment-info",
		props:{
			orderInfo:{
				type:Object,
				required:true,
			},
			
		},
	
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.container{
		background: #FFFFFF;
		border-radius: 24rpx;
		display: flex;
		flex-flow: column nowrap;
		padding: 32rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
		color: #333333;
		margin-bottom: 16rpx;
		.header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 32rpx;
			.payText{
				font-size: 28rpx;
				color: #333;
				
			}
			.payment{
				font-size: 28rpx;
				color: #111111;
				font-weight: 500;
				
			}
		}
		.line{
			height: 0.5px;
			background: #F2F3F3;
			border-radius: 0.5px;
			margin-bottom: 32rpx;
		}
		
		.item{
			font-size: 28rpx;
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			justify-content: flex-start;
			margin-bottom: 16rpx;
			.item-header{
				width: 168rpx;
				height: 40rpx;
				line-height: 40rpx;
				color: #999999;
				display: block;
				flex: 1;
			}
			.item-body{
				width: 502rpx;
				line-height: 40rpx;
				display: flex;
				flex-flow: row nowrap;
				
			}
		}
		// .item:nth-last-child(1){
		// 	margin-bottom: 0;
		// }
		.introduce{
			margin-top: 4rpx;
			padding: 18rpx 24rpx;
			background: #FCFCFC;
			border: 0.5px solid #F3F3F3;
			color: #999999;
			font-size: 22rpx;
			line-height: 32rpx;
		}
	}
	
</style>
