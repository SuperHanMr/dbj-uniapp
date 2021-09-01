<template>
	<view class="container">
		
		<view class="order-container">
			<view class="order-status" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 172rpx'}">
				<view class="status">
					<image src="@/static/order/ic_order_wait@2x.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="time">
					<text style="margin-right: 16rpx;">剩余支付时间</text>
					
					 16:58:26
				</view>
			</view>
			
			<order-user-base-info></order-user-base-info>
			
			<view class="body2">
				<view class="header">
					<text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
					<image
						src="@/static/order/ic_more@2x.png"
						mode=""
					></image>
				</view>
				<order-item></order-item>
				<view class="footer">
					
				</view>
			</view>
			
			<order-price></order-price>
			
			<view class="payment-method">
				<text>支付方式</text>
				<view class="method">
					<image src="@/static/order/ic_order_wechat@2x.png" mode=""></image>
					<text>微信支付</text>
				</view>
			</view>
			
			<order-info></order-info>
			
			<view class="go-to-pay">
				<text>取消付款</text>
				<view class="button" @click="toPay()" >
					去付款
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import bgImg from "@/static/order/order_bg_yellow@2x.png"
	import{orderDetail,orderPay} from '../../../../api/order.js'
	export default {
		data() {
			return {
				orderNo:'',
				bgImg: bgImg,
			}
		},
		onLoad(e) {
			if(e&&e.orderNo){
				this.orderNo=e.orderNo;
				// this.getOrderDetail();
			}
			
		},
		methods: {
			toPay(){
				orderPay({orderId:this.orderNo,payType:1}).then(e=>{
					console.log(e);
				})
			},
			getOrderDetail(){
				orderDetail({id:this.orderNo}).then(e=>{
					console.log(e);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.container{
		width: 100%;
		height: 100%;
		overflow: auto;
		padding-bottom: 100rpx;
		background-color: skyblue;
		.order-container{
			.order-status{
				width: 100%;
				height: 140rpx;
				color: #FFFFFF;
				background-color: pink;
				background-size: 100% 172rpx;
				display: flex;
				flex-flow: column nowrap; 
				align-items: center;
				.status{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					margin-bottom: 8rpx;
					image{
						width: 64rpx;
						height: 64rpx;
						object-fit: cover;
						margin-right: 12rpx;
					}
					text{
						font-size: 48rpx;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				
				.time{
					color:#FFFFFF;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					font-weight: 400;
					display: flex;
					align-items: center;
				}
			}
		
			.order-header{
				margin-bottom: 16rpx;
				padding: 32rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				color: #333333;
				box-sizing: border-box;
				display: flex;
				flex: 1;
				flex-flow: row nowrap;
				image{
					width: 32rpx;
					height: 32rpx;
					object-fit: cover;
					margin: 8rpx 16rpx 0 0;
				}
				.cancel-text{
					color: #333333;
					font-size: 30rpx;
					line-height: 46rpx;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
		
			.body1{
				padding: 32rpx 32rpx 0;
				background: #FFFFFF;
				border-radius: 24rpx;
				margin-bottom: 16rpx;
			}
			.body2{
				padding: 32rpx 32rpx 0;
				background: #FFFFFF;
				border-radius: 24rpx 24rpx 0 0;
				
				.header {
				  margin-top: 16rpx;
					margin-bottom: 16rpx;
				  box-sizing: border-box;
				  display: flex;
				  align-items: center;
					text {
						font-weight: 1000;
						max-width: 476rpx;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
			
					image {
						width: 34rpx;
						height: 34rpx;
						object-fit: cover;
					}
				}
				.footer{
					
				}
			}
			
			.payment-method{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				background-color: #FFFFFF;
				height: 112rpx;
				color: #333333;
				font-size: 30rpx;
				font-weight: 500;
				padding:32rpx;
				margin-bottom: 16rpx;
				border-radius: 24rpx;
				box-sizing: border-box;
				.method{
					display: flex;
					align-items: center;
					image{
						width: 32rpx;
						height: 32rpx;
						object-fit: cover;
						margin-right: 16rpx;
					}
					text{
						font-size: 28rpx;
					}
				}
			}
			
			.contact-service{
				margin-top: 16rpx;
				background-color: #FFFFFF;
				padding: 38rpx 32rpx;
				border-radius: 24rpx;
				font-size: 26rpx;
				height: 112rpx;
				text-align: center;
				box-sizing: border-box;
			}
			
			.go-to-pay{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				padding: 12rpx 32rpx;
				background-color: #FFFFFF;
				color: #333333;
				font-size: 26rpx;
				.button{
					width: 248rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 32rpx;
					text-align: center;
					color: #FFFFFF;
					background: linear-gradient(135deg, #36D9CD 0%, #28C6C6 100%);
					border-radius: 12rpx;
				}
			}
		}
	}


</style>

