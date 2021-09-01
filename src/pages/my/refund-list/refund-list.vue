<template>
	<view class="container">
		<view class="order-container">
		  <view class="header">
		    <view class="store-name">
		      <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
		      <image
		        src="../../../static/order/ic_more@2x.png"
		        mode=""
		      ></image>
		    </view>
		    <view class="order-status">
					仅退款(已收货)
		    </view>
		  </view>
			<!-- 待付款  套餐     -->
			
		 
			<view class="body">
				<view class="body-main">
					<view class="pic">
						<image src="../../../wxcomponents/gome-login/img/logo.0ccb88de.png" mode=""></image>
					</view>
					<view class="basic-info">
						<view class="name-attr">
							<view class="text">
								<text class="icon">物品</text>
								<text class="name">恶气饿亲热亲热其他任何国家里皮空间屁哦了 让台湾i图人为添加认为i他我</text>					
							</view>
							<view class="attr">
								<text style="margin-right: 24rpx;">白色</text>
								<text>2.0m/根</text>
							</view>
							<view class="refund-price">
								<text style="margin-right:8rpx ;">退款金额</text>
								<text class="product-price">
									<text style="font-size:22rpx;">￥</text>
									<text>28.</text>
									<text style="font-size:22rpx;">00</text>
								</text>
							</view>
						</view>
						<!-- <view class="common-price">
							<view style="color: #999999;">共1件</view>
						</view>	 -->
					</view>
				</view>		
			</view>
			
			<view class="refund-status">
				<text style="margin-right: 16rpx;">退款中</text>
			<!-- 	<text>
					<text style="font-size:26rpx;">￥</text>
					<text style="font-size:40rpx;">28.</text>
					<text style="font-size:26rpx;">00</text>
				</text> -->
				<text style="color: #333333; font-weight: 1000">退款已关闭</text>
			</view>
		  
			<view class="footer">
					<view class="button-container">
					 <button
							type="default"
							size="mini"
							
						>取消申请</button>
						<button
							type="default"
							size="mini"
							style="margin-left: 24rpx;"
							@click="goToDetail()"
						>查看详情</button>
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
			orderStatus(){
				console.log("打印数据")
			},
			goToDetail(){
				console.log("去详情页面")
				uni.navigateTo({
					// url:"../my-order/order-failed/order-failed"
					// url:"../my-order/order-success/order-success"
					url:"../my-order/order-in-progress/order-in-progress"
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
		background-color: skyblue;
		.order-container{
			background-color: #FFFFFF;
		}
	}

	.header {
		height: 96rpx;
		margin-top: 16rpx;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
		background-color: #fafafa;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.store-name {
			display: flex;
			flex-flow: row nowrap;
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
		.order-status {
			color: #808080;
			font-size: 24rpx;
			line-height: 32rpx;
			// font-weight: 800;
		}
	}

	.body{
		padding: 32rpx 32rpx 0;
		background-color: #FFFFFF;
		.body-main {
			box-sizing: border-box;
			display: flex;
			flex: 1;
			padding-bottom:32rpx;
			flex-flow: row nowrap;
			.pic{
				margin-right: 16rpx;
				image{
					width: 136rpx;
					height: 136rpx;
					background-color: skyblue;
				}
			}
			.basic-info{
				display: flex;
				flex: 1;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				.name-attr{
					// margin-right: 24rpx ;
					.text{
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						word-break: break-all;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						font-size: 26rpx;
						line-height: 36 rpx;
						.icon{
							width: 60rpx;
							height: 30rpx;
							margin-right: 8rpx;
							line-height: 30rpx;
							border-radius: 4rpx;
							border: 2rpx solid #35c4c4;
							color: #35c4c4;
							font-size: 20rpx;
							text-align: center;
							display: inline-block;
						}
						.name{
							font-size: 26rpx;
							color: #333333;
							line-height: 32rpx;
						}
					}
					.attr{
						margin-top: 16rpx;
						font-size: 22rpx;
						color: #999999;
					}
					.refund-price{
						color: #999999;
						line-height: 26rpx;
						font-size: 22rpx;
						margin-top: 16rpx ;
						.product-price {
							color: #333333;
							height: 32rpx;
							font-size: 32rpx;
							margin-bottom: 8rpx;
						}
					}
				}
			}
		}
	}
	
	.refund-status{
		margin: 0 32rpx;
		padding: 20rpx 24rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 16rpx;
		// background: #FCF9F5;
		// border: 2rpx solid #F5D9BC;
		// color: #FC8B19;
		// background: #F5FCF9;
		// border: 2rpx solid #BCF5D9;
		// color: #0EC270;
		background: #F7F7F7;
		color: #808080;
		
		
		.price{
			font-size: 32rpx;
		}
	}

	.footer {
		display: flex;
		flex-flow: row nowrap;
		justify-content:  flex-end;
		padding: 24rpx 32rpx;
		// text-align: right;
		background-color: #ffffff;
		
		.button-container{
			display: flex;
			flex-flow: row nowrap;
			justify-content:  flex-end;
			button{
				width: 140rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				font-size: 24rpx;
				display: block;
				border-radius: 32rpx;
				border: 2rpx solid #CCCCCC;
				color: #111;
				padding: 0;
			}
		}
	}
	button{
		display: none;
	}
	button::after {
	  border: none;
	}

</style>
