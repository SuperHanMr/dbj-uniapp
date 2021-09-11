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
				<text class="item-body">{{createTime}}</text>
			</view>
			
			<view class="item" v-if="showPayTime">
				<text class="item-header">付款时间：</text>
				<text class="item-body">{{payTime}}</text>
			</view>
			
			<view class="item" v-if="showPayType">
				<text class="item-header">支付方式：</text>
				<text class="item-body">微信支付</text>
			</view>
	
	</view>
</template>

<script>
	export default {
		name:"order-info",
		props:{
			orderNo:{
				type:String,
				required:true,
			},
			createTime:{
				type:String,
				required:true,
			},
			payTime:{
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
				default:true,
			},
			showPayType:{
				type:Boolean,
				default:true,
			}
		},
		
		data() {
			return {
				
			};
		},
		methods:{
			duplicate(refundNo){
				uni.setClipboardData({
					data:"HELLO",
				    success: function (res) {
								console.log("复制成功");
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
			font-weight: 1000;
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
