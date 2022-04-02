<template>
	<view class="container">
		<view class="header">
			退款信息
		</view>
		<view class="item">
			<text class="item-header">退款原因：</text>
			<text class="item-body">{{refundInfo.reason}}</text>
		</view>
		<!-- 退款类型 变更单的时候不显示 -->
		<view class="item">
			<text class="item-header">退款类型：</text>
			<text class="item-body"> {{refundInfo.type==0?"仅退款(未发货)":refundInfo.type==1 ? "仅退款(退库存)":refundInfo.type==2 ? "仅退款(已收货)":refundInfo.type==3?"服务退款":refundInfo.type==5?"储值卡退款":""}}</text>
			<!-- <text  class="item-body"> {{handleStatus(refundInfo.type)}}</text> -->
		</view>
		<view class="item">
			<text class="item-header">退款金额：</text>
			<text class="item-body">￥{{handlePrice(refundInfo.refundAmount)[0]}}.{{handlePrice(refundInfo.refundAmount)[1]}}</text>
		</view>
		<view class="item">
			<text class="item-header">申请时间：</text>
			<text class="item-body">{{refundInfo.createTime | formatDate}}</text>
		</view>
		<view class="item">
			<text class="item-header" >退款编号：</text>
			<view class="item-body">
				<text style="display: block;margin-right:16rpx;">{{refundInfo.refundNo}}</text>
				<view class="copy-style" @click="duplicate()">复制</view>
			</view>
		</view>
		<view class="item" v-if="!refundInfo.isOrderCompanyTransfer">
			<text class="item-header">备注信息：</text>
			<text class="item-body">{{refundInfo.remark}}</text>
		</view>
	</view>
	
</template>

<script>
	import {formatDate} from "../../utils/common.js"
	export default {
		filters:{
			formatDate
		},
		name:"order-refund-info",
		props:{
			refundInfo:{
				type:Object,
				required:true,
			}
		},
		data() {
			return {
				
			};
		},
		onLoad(){
			console.log("this.refundInfo",this.refundInfo)
		},
		methods:{
			handleStatus(data){
				if(data == 0){
					return "仅退款(未发货)"
				}else if(data == 1){
					return "仅退款(退库存)"
				}else if(data == 2){
					return "仅退款(已收货)"
				}else if(data == 3){
					return "服务退款"
				}else{
					return ""
				}
			},
			handlePrice(price){
				if(!price) return ["0","00"]
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
			duplicate(refundNo){
				uni.setClipboardData({
					// data:"HELLO",
				    data: this.refundInfo.refundNo,
				    success(res){
				    	uni.showToast({
				    		title: "退款编号已复制",
				    		icon: "none",
				    		duration: 1000,
				    	});
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
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
			margin-bottom: 20rpx;
		}
		.item{
			font-size: 28rpx;
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			justify-content: flex-start;
			margin-bottom: 20rpx;
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
