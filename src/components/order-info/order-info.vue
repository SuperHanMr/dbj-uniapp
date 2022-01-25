<template>
	<view class="container" :style="{marginBottom:marginBottom +'rpx','margintTop':margintTop +'rpx'}">
		
			<view class="header">
				订单信息
			</view>
			
			<view class="item">
				<text class="item-header" >订单编号：</text>
				<view class="item-body">
					<text style="display: block;margin-right:16rpx;">{{orderNo}}</text>
				<view class="copy-style" @click="duplicate()">复制</view>
				</view>
			</view>
			
			<view class="item">
				<text class="item-header">创建时间：</text>
				<text class="item-body">{{createTime | formatDate}}</text>
				
			</view>
			
			<view class="item" v-if="showPayTime">
				<text class="item-header">付款时间：</text>
				<text class="item-body">{{payTime | formatDate }}</text>
			</view>
			<view class="item" v-if="showCancelTime">
				<text class="item-header">取消时间：</text>
				<text class="item-body">{{cancelTime | formatDate }}</text>
			</view>
			
			<view class="item" v-if="showPayType">
				<text class="item-header">支付方式：</text>
				<text class="item-body">{{payChannel}}</text>
			</view>
	
	</view>
</template>

<script>
	import {formatDate} from "../../utils/common.js"
	export default {
		filters:{
			formatDate
		},
		name:"order-info",
		props:{
			orderNo:{
				type:String,
				required:true,
			},
			createTime:{
				required:true,
			},
			cancelTime:{
				type:Number,
			},
			payTime:{
				type:Number,
			},
			payChannel:{
				type:String,
			},
			marginBottom:{
				type: Number,
				default:16,
			},
			margintTop:{
				type: Number,
				default:16,
			},
			showPayTime:{
				type:Boolean,
				default:false,
			},
			showCancelTime:{
				type:Boolean,
				default:false,
			},
			showPayType:{
				type:Boolean,
				default:false,
			}
		},
	
		data() {
			return {
				
			};
		},
		methods:{
			duplicate(refundNo){
				uni.setClipboardData({
					data:`${this.orderNo}`,
				    success(res){
							uni.showToast({
								title: "订单编号已复制",
								icon: "none",
								duration: 1000,
							});
						}
				});
			}
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
		.header{
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
			height: 48rpx;
			line-height: 48rpx;
			margin-bottom: 16rpx;
		}
		
		.item{
			font-size: 28rpx;
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			justify-content: flex-start;
			margin-bottom: 16rpx;
			.item-header{
				width: 140rpx;
				height: 40rpx;
				line-height: 40rpx;
				color: #999999;
				display: block;
				flex: 1;
			}
			.item-body{
				width: 546rpx;
				line-height: 40rpx;
				display: flex;
				flex-flow: row nowrap;
				
			}
		}
		.item:nth-last-child(1){
			margin-bottom: 0;
		}
	}
	
	.copy-style{
		display:block;
		width:72rpx;
		height:40rpx;
		line-height: 40rpx;
		border-radius:8rpx;
		text-align:center;
		border:2rpx solid #EAEAEA;
		font-size: 20rpx;
		color: #111111;
	}
	
</style>
