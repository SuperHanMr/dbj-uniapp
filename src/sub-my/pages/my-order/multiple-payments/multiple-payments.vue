<template>
	<view class="container">
		<view class="payItem" v-for="(item,index) in list" :key="index">
			<view class="left">
				<text>第{{index==1?"一":index==2?"二":index==3?"三":index==4?"四":index==5?"五":""}}笔支付金额：</text>
				<view class="price">
					<text>￥</text>
					<text style="font-size: 40rpx;font-weight: 500;">{{handlePrice(item.amount)[0]}}.</text>
					<text>{{handlePrice(item.amount)[1]}}</text>
				</view>
			</view>
			<view class="right">
				<text v-if="item.status==1">已付款</text>
				<view v-if="item.status==0" class="button" @click="gotoPay(item.id)">
					去付款
				</view>
			</view>
		</view>
		
		<view class="remarks">
			由于支付金额超过单次上限，已为您进行了订单支付拆分，全部支付完成后即购买完
		</view>
		
		
		<view :class="{noCancelBtn:true}" class="bottom-btn"  :style="{paddingBottom:systemBottom,height:systemHeight}">
			<view class="cancel-btn" v-if="showCancelOrderBtn">
				取消订单
			</view>
		  <view class="total-price">
		  	<view class="total">
		  		<text>总计</text>
		  		<text style="margin-left: 12rpx;">￥</text>
		  		<text style="font-size: 40rpx; font-weight: 500;">{{handlePrice(list.orderReceivableAmount)[0]}}.</text>
		  		<text>{{handlePrice(list.orderReceivableAmount)[1]}}</text>
		  	</view>
				
				<view class="has-pay">
					<text>已支付</text>
					<text style="margin-left: 12rpx;">￥</text>
					<text style="font-size: 40rpx; font-weight: 500;">{{handlePrice(list.totalActualIncomeAmount)[0]}}.</text>
					<text>{{handlePrice(list.totalActualIncomeAmount)[1]}}</text>
				</view>
				
		  </view>
		 
		</view>
	</view>
</template>

<script>
	import {querySplitPayList,splitPay} from "@/api/order.js"
	export default {
		props: {
			num: 0,
			btnContent: "",
		},
		data() {
			return {
				orderId:"",
				list:[],
				showCancelOrderBtn:false,
				
				systemBottom: "",
				systemHeight: "",
			};
		},
		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
			console.log(this.systemBottom);
		},
		
		onLoad(e) {
			this.orderId =Number(e.orderId) 
			this.requestSplitPayList()
		},
		methods: {
			requestSplitPayList(){
				querySplitPayList({orderId:this.orderId}).then(data=>{
					this.list = data
					this.showCancelOrderBtn =this.list.every(item=>{
						item.status==0
					})
				})
			},
			gotoPay(id){
				console.log("去付款");
				let params={
					orderId:this.orderId,
					payType:1,//支付类型  1微信支付"
					orderSplitPayId:id,
					openid:"",//微信openid 小程序支付用 app支付不传或传空"
				}
				splitPay(params).then(e=>{
					console.log("去支付")
					const payInfo = e.wechatPayJsapi;
					uni.requestPayment({
						provider: "wxpay",
						...payInfo,
						success(res) {
							console.log("@@@@@@@");
							console.log(res);
							// 支付成功后跳转到哪个页面
						},
						fail(e) {
							console.log(e);
							// 支付失败时候跳转到哪个页面
						},
					});
				})
			},
			
			
			
			
			handlePrice(price){
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container{
		height: 100%;
		overflow-y: auto;
		background-color: #F2F2F2;
		.payItem{
			margin-top: 16rpx;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			padding: 36rpx 32rpx 32rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			.left{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				.price{
					font-size: 26rpx;
				}
			}
			.right{
				text{
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					line-height: 32rpx;
				}
				.button{
					width: 140rpx;
					height:56rpx;
					line-height: 56rpx;
					text-align: center;
					background: linear-gradient(135deg, #36D9CD 0%, #28C6C6 100%);
					border-radius: 12rpx;
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}
		}
		
		.remarks{
			padding: 24rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			line-height: 36rpx;
		}
		
		.bottom-btn {
		  position: fixed;
		  bottom: 0;
			background-color: #FFFFFF;
		  height: 112rpx;
			width: 686rpx;
		  display: flex;
		  flex-direction: row;
		  justify-content: space-between;
		  align-items: center;
			padding: 32rpx;
			font-size: 26rpx;
			.cancel-btn{
				color: #333333;
			}
			.total-price{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				.total{
					color:#999999 ;
				}
				.has-pay{
					margin-left: 48rpx;
					color: #333333;
				}
			}
		}
		
		.noCancelBtn{
			justify-content: flex-end !important;
		}
	}

</style>
