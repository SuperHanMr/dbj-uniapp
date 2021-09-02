<template>
	<view class="container">
		
		<view class="product-container">
			<order-item :paddingBottom="0"></order-item>
			<view class="deposit">
				<view class="item">
					<text>押金</text>
					<text style="color:#333333 ;">￥10.00</text>
				</view>
			</view>
			
			<order-item :paddingBottom="32"></order-item>

			<view class="price-container">
				<view class="price-item">
					<view class="header" style="margin-bottom: 16rpx;">
						<text style="margin-right: 8rpx;">运费</text>
						<view class="icon">?</view>
					</view>
					<text>￥10.00</text>
				</view>
				
				<view class="price-item">
					<view class="header">
						<text style="margin-right: 8rpx;">搬运费</text>
						<view class="icon">?</view>
					</view>
					<text>￥10.00</text>
				</view>
			</view>
			
		</view>
		
		<view class="refund-container">
			
			<view class="refund-reason">
				<view class="left">
					<view class="icon">
						*
					</view>
					<text>退款原因</text>
				</view>
				<view class="right">
					<text style="color:#C7C7C7;">请选择</text>
					<image src="../static/ic_arraw_down@2x.png" mode=""></image>
				</view>
			</view>
			<view class="line"/>
			
			<view class="refund-price">		
				<view class="show-price">
					<view class="left">
						<view class="icon">
							*
						</view>
						<text>退款金额</text>
					</view>
					<view class="right">
						<!-- <text>￥1000.00</text> -->
						<view class="eidt-style">
							<text>￥</text>
							<input type="text" value=""  class="input-style"/>
						</view>
					</view>
				</view>
				
				<view class="edit-price">
					<view class="left">
						<view class="icon">
							*
						</view>
						<text>退款金额</text>
					</view>
					<view class="right">
						<text style="color:#FF3347;font-size: 40rpx;">￥1000.00</text>
						<image src="../static/ic_mine_edit_gray@2x.png" mode=""></image>
					</view>
				</view>
				 
				<view class="tip-text">
					商品未发货，商家同意后将会全额退还。
				</view>
				
				
				<!-- <view class="tip-text">
					最多可以填写x，也可申请部分金额，以您与商家沟通协商的结果为准
				</view> -->
			</view>
			
		</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
		overflow-y: auto;
		background-color: skyblue;
		.product-container{
			margin-top: 16rpx;
			padding: 32rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			.deposit{
				display: flex;
				justify-content: flex-end;
				margin: 24rpx 0 32rpx;
				height: 32rpx;
				line-height: 32rpx;
				font-size: 22rpx;
				.item{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					width: 302rpx;
					color: #999999;
				}
			}
			
			.price-container{
				.price-item{
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					color: #808080;
					font-size: 24rpx;
					.header{
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						.icon{
							width:24rpx ;
							height: 24rpx;
							border-radius: 50%;
							line-height: 24rpx;
							text-align: center;
							color: #999999;
							border: 2rpx solid #999999;
						}
					}
				}
			}
		
		}
		
		.refund-container{
			margin-top: 16rpx;
			width: 100%;
			background-color: #FFFFFF;
			.refund-reason{
				display: flex;
				flex-flow: row nowrap;
				align-items:center;
				justify-content: space-between;
				background-color: #FFFFFF;
				border-radius: 32rpx 32rpx 0 0;
				padding:  24rpx 16rpx 40rpx 32rpx;
				height: 120rpx;
				font-size: 28rpx;
				box-sizing: border-box;
				.left{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					.icon{
						color: #FF3B30;
						width: 24rpx;
						height: 28rpx;
					}
				}
				.right{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					color: #666666;
					image{
						width: 64rpx;
						height: 64rpx;
						object-fit: cover;
						margin-left: 16rpx;
					}
				}
			}
			
			.line{
				height: 2rpx;
				margin-left: 56rpx;
				background: #F4F4F4;
			}
			
			.refund-price{
				background-color: #FFFFFF;
				border-radius:0 0 24rpx 24rpx ;
				
				.edit-price{
					padding: 28rpx 16rpx 6rpx 32rpx ;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					.left{
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						font-size: 28rpx;
						.icon{
							color: #FF3B30;
							width: 24rpx;
							height: 28rpx;
						}
					}
					.right{
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						color: #666666;
						image{
							width: 64rpx;
							height: 64rpx;
							object-fit: cover;
							margin-left: 16rpx;
						}
					}
				}
				
				.show-price{
					padding: 40rpx 32rpx 16rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					.left{
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						font-size: 28rpx;
						.icon{
							color: #FF3B30;
							width: 24rpx;
							height: 28rpx;
						}
					}
					.right{
						color:#FF3347 ;
						font-size: 40rpx;
						line-height: 40rpx;
						.eidt-style{
							display: flex;
							flex-flow: row nowrap;
							align-items: center;
							color:#FF3347 ;
							.input-style{
								width: 260rpx;
								background-color: #f3f3f3;
								font-size: 28rpx;
								color: #333;
							}
						}
					}
				}
				
				
				
				.tip-text{
					padding:0 32rpx 40rpx 56rpx ;
					color: #AAAAAA;
					font-size: 24rpx;
					line-height: 38rpx;
					border-radius:0 0 24rpx 24rpx ;
				}
			}
		}
	
		
		
		
	}
</style>
