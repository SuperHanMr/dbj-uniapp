<template>
	<view class="container">
		<view class="line"></view>
	
		<view class="body">
			<view class="price-item">
				<view>总价</view>
				<view>
					<text>￥</text>
					<text style="font-size:28rpx;">8888.00</text>
				</view>
			</view>
			
			<view class="price-item">
				<view class="title">
					<text style="margin-right: 8rpx;">运费</text>
					<text class="icon">?</text>
				</view>
				<view>
					<text>￥</text>
					<text style="font-size:28rpx;">8888.00</text>
				</view>
			</view>
				
			<view class="price-item">
				<view class="title">
					<text style="margin-right: 8rpx;">搬运费</text>
					<text class="icon">?</text>
				</view>
				<view>
					<text>￥</text>
					<text style="font-size:28rpx;">8888.00</text>
				</view>
			</view>
				
			<view class="price-item">
				<view>商家优惠</view>
				<view>
					<text>￥</text>
					<text style="font-size:28rpx;">8888.00</text>
				</view>
			</view>
				
			<view class="price-item">
				<view>平台优惠</view>
				<view>
					<text>￥</text>
					<text style="font-size:28rpx;">8888.00</text>
				</view>
			</view>
				
		</view>
		
		<view class="footer">
			<text style="margin-right: 12rpx;">实付</text>
			<text style="color: #FF3347;">
				<text>￥</text>
				<text style="font-size: 40rpx;" >300.</text>
				<text>00</text>
			</text>	
		</view>
	
	</view>
	
</template>

<script>
	export default {
		name:"order-price",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		border-radius: 0 0 24rpx 24rpx ;
		background-color: #FFFFFF;
		margin-bottom: 16rpx;
		.line{
			width: 100%;
			height: 1rpx;
			background: #F2F2F2;
			border-radius: 2rpx;
		}
		.body{
			padding: 22rpx 32rpx 0;
			.price-item{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				color: #808080;
				font-size: 24rpx;
				font-weight: 400;
				margin-bottom: 16rpx;
				.title{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					.icon{
						width: 24rpx;
						height: 24rpx;
						border: 2rpx solid #999999;
						border-radius: 50%;
						line-height: 24rpx;
						text-align: center;
					}
					
				}
				
			}
			.price-item:nth-last-child(1){
				margin-bottom: 0;
			}
		}
		
		.footer{
			padding: 24rpx 32rpx;
			color: #333333;
			font-size: 26rpx;
			text-align: right;
		}
	}
</style>
