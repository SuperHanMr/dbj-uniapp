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
		      代付款
		    </view>
		  </view>
		 
			
			
			<view class="body1">
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
					</view>
					<view class="common-price">
						<view class="product-price">
						  <text style="font-size:22rpx;">￥</text>
						  <text>28.</text>
						  <text style="font-size:22rpx;">00</text>
						</view>
						<view style="color: #999999;">共1件</view>
					</view>	
				</view>
			</view>
			<view class="body1">
				<view class="pic">
					<image src="../../../wxcomponents/gome-login/img/logo.0ccb88de.png" mode=""></image>
				</view>
				<view class="basic-info">
					<view class="name-attr">
						<view class="text">
							<text class="icon">物品</text>
							<text class="name">打扮家的爆款产品</text>					
						</view>
						<view class="attr">
							<text style="margin-right: 24rpx;">白色</text>
							<text>2.0m/根</text>
						</view>						
					</view>
					<view class="common-price">
						<view class="product-price">
						  <text style="font-size:22rpx;">￥</text>
						  <text>28.</text>
						  <text style="font-size:22rpx;">00</text>
						</view>
						<view style="color: #999999;">共1件</view>
					</view>	
				</view>
			</view>
		
	
		  <view class="price">
		    <view class="total-pay">
		      <text>总价</text>
		      <text style="font-size:18rpx;">￥</text>
		      <text>320.</text>
		      <text style="font-size:18rpx;">00</text>
		      <text style="margin-left: 18rpx;">优惠</text>
		      <text style="font-size:18rpx;">￥</text>
		      <text>99.</text>
		      <text style="font-size:18rpx;">00</text>
		    </view>
		    <view class="need-pay">
		      <text>需付款(含搬运费)</text>
		      <text style="color:#FF3347;margin-left: 8rpx;">
		        <text style="font-size:18rpx;">￥</text>
		        <text>99.</text>
		        <text style="font-size:18rpx;">00</text>
		      </text>
		    </view>
		  </view>
		  
			<view class="line" />
		  
			<view class="footer">
		    <view class="set-interval">
		      <text>这个是代替倒计时的占位</text>
		    </view>
		    <view class="button">
		      <button
		        type="default"
		        size="mini"
		        class="cancel-order"
		      >取消订单</button>
		      <button
		        type="default"
		        size="mini"
		        class="go-to-pay"
		      >去付款</button>
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
	.body1 {
	  background-color: #FFFFFF;
	  box-sizing: border-box;
	  display: flex;
	  flex: 1;
		padding: 0 32rpx 32rpx;
	  flex-flow: row nowrap;
		.pic{
			margin-right: 32rpx;
			image{
				width: 136rpx;
				height: 136rpx;
				background-color: skyblue;
			}
		}
		.basic-info{
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.name-attr{
				margin-right: 24rpx ;
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
			}
			.common-price{
				display: flex;
				flex: 1;
				flex-flow: column nowrap;
				align-items: flex-end;
				font-size: 22rpx;
					line-height: 40rpx;
				.product-price {
				  height: 32rpx;
				  font-size: 32rpx;
				  margin-bottom: 8rpx;
				}
			}
		}
		
		
		
		
		
		
		
		
		
	  .product-info {
	    margin-top: 32rpx;
	    display: flex;
	    flex: 1;
	    flex-flow: row nowrap;
	    align-items: center;
	    image {
	      width: 136rpx;
	      height: 136rpx;
	      background-color: pink;
	      margin-right: 16rpx;
	    }
	    .basic-info {
	      flex: 1;
	      .top {
	        display: flex;
	        flex: 1;
	        flex-flow: row nowrap;
	        align-items: center;
	        max-height: 64rpx;
	        margin-bottom: 16rpx;
	        .icon {
	          width: 60rpx;
	          height: 30rpx;
	          margin-right: 8rpx;
	          line-height: 30rpx;
	          border-radius: 4rpx;
	          border: 2rpx solid #35c4c4;
	          color: #35c4c4;
	          font-size: 20rpx;
	          text-align: center;
	        }
	        .name-and-price {
	          display: flex;
	          flex: 1;
	          flex-flow: row nowrap;
	          .product-name {
	            max-height: 64rpx;
	            line-height: 32rpx;
	            font-size: 26rpx;
	            margin-right: 24rpx;
	            color: #333;
	            display: -webkit-box;
	            overflow: hidden;
	            text-overflow: ellipsis;
	            word-wrap: break-word;
	            word-break: break-all;
	            white-space: normal !important;
	            -webkit-line-clamp: 2;
	            -webkit-box-orient: vertical;
	          }
	          .product-price {
	            height: 32rpx;
	            font-size: 32rpx;
	          }
	        }
	      }
	      .bottom {
	        display: flex;
	        height: 26rpx;
	        color: #999;
	        font-size: 22rpx;
	        flex-flow: row nowrap;
	        justify-content: space-between;
	      }
	    }
	    .product-img {
	      display: flex;
	      max-width: 532rpx;
	      scroll-view {
	        image {
	          width: 136rpx;
	          height: 136rpx;
	          border-radius: 8rpx;
	          border: 2rpx solid #f4f4f4;
	          box-sizing: border-box;
	          background-color: pink;
	          margin-right: 24rpx;
	        }
	        image:nth-last-child(1) {
	          margin-right: 0;
	        }
	      }
	    }
	    .total-price {
	      display: flex;
	      flex: 1;
	      flex-flow: column nowrap;
	      align-items: flex-end;
	      color: #999;
	      font-size: 22rpx;
	      margin-left: 24rpx;
	      .product-price {
	        height: 32rpx;
	        font-size: 32rpx;
	        margin-bottom: 8rpx;
	      }
	    }
	  }
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.container{
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: skyblue;
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
			color: #fc8b19;
			font-size: 24rpx;
			// font-weight: 800;
			line-height: 100%;
		}
	}







	.price {
		height: 64rpx;
		padding: 0 32rpx;
		font-size: 22rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		background-color: #ffffff;
		.total-pay {
			color: #999;
		}
		.need-pay {
			color: #333;
		}
	}

	.line {
		width: 100%;
		height: 1rpx;
		background-color: #f2f2f2;
	}

	.footer {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx;
		background-color: #ffffff;
		.set-interval {
		}
		.button {
			.cancel-order {
				width: 140rpx;
				height: 56rpx;
				font-size: 24rpx;
				line-height: 56rpx;
				text-align: center;
				margin-left: 24rpx;
				border-radius: 32rpx;
				padding: 0;
			}
			.go-to-pay {
				width: 140rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				font-size: 24rpx;
				padding: 0;
				margin-left: 24rpx;
				background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
				border-radius: 32rpx;
				color: #ffffff;
			}
		}
	}

</style>
