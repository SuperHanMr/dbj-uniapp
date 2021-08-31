<template>
	<view class="container">
		<!-- 订单完成/确认收货 -->
		<view class="order-container">
			<view class="order-status" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}">
				<view class="status">
					<image src="@/static/order/ic_order_success@2x.png" mode=""></image>
					<text>退款成功</text>
				</view>
				<text class="time">2021-01-12 16:58:26</text>
			</view>
			<view class="order-header2">
				<image src="../../../../static/order/ic_location@2x.png" mode=""></image>
				<view class="basic-info">
					<view>
						<text>小明</text>
						<text>15226088888</text>
					</view>
					<view>
						北京 北京市 石景山区 点石商务公园8号楼打扮家科技有限公司
					</view>
				</view>
			</view>
		
			<view class="order-header1">
				<view class="refund-price">
					<text>退款总金额</text>
					<view style="color:#FF3347;">
						<text style="font-size:26rpx;">￥</text>
						<text style="font-size:40rpx;">8888.</text>
						<text style="font-size:26rpx;">00</text>
					</view>
				</view>
				<view class="router">
					<text style="color: #999999;font-size: 26rpx;">原路径返回微信</text>
					<view>
						<text style="font-size: 20rpx;">￥</text>
						<text style="font-size:28rpx;">8888</text>
						<text style="font-size:20rpx;" >.00</text>
					</view>
				</view>
			</view>
		
			<view class="body">
				<order-item></order-item>
			</view>
			
			<view class="refund-info">
				<view class="header">
					退款信息
				</view>
				<view class="item">
					<text class="item-header">退款原因：</text>
					<text class="item-body">退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因退款原因</text>
				</view>
				<view class="item">
					<text class="item-header">退款金额：</text>
					<text class="item-body">￥320.00</text>
				</view>
				<view class="item">
					<text class="item-header">申请时间：</text>
					<text class="item-body">2021-01-21   16:58:59</text>
				</view>
				<view class="item">
					<text class="item-header" >退款编号：</text>
					<view class="item-body">
						<text style="display: block;margin-right:16rpx;">DDPG2020121400001</text>
						<view class="copy-style">复制</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import bgImg from "@/static/order/order_bg_gray@2x.png"
	export default {
		data() {
			return {
					bgImg: bgImg,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

	.container{
		width: 100%;
		height: 100%;
		overflow: auto;
		// background-color: skyblue;
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
					font-size: 26rpx;
					font-weight: 400;
				}
			}
		
			.order-header1{
				height: 170rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				padding: 32rpx;
				color: #333333;
				font-size: 30rpx;
				box-sizing: border-box;
				flex: 1;
				margin-bottom: 16rpx;
				.refund-price,.router{
					display: flex;
					flex: 1;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 16rpx;
				}
				
			}
			.order-header2{
				background: #FFFFFF;
				border-radius: 20rpx;
				color: #333333;
				margin-bottom: 16rpx;
				padding: 32rpx;
				box-sizing: border-box;
				display: flex;
				flex-flow: row nowrap;
				flex: 1;
				image{
					width: 48rpx;
					height: 48rpx;
					object-fit: cover;
				}
				.basic-info{
					
				}
			}
		
			.body{
				padding: 32rpx 32rpx 0;
				background: #FFFFFF;
				border-radius: 24rpx;
				margin-bottom: 16rpx;
			}
			
			.refund-info{
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
