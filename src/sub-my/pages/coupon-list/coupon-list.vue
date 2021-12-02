<template>
	<view class="container">
		<view class="empty-container" v-if="!couponList.length">
			<view class="empty-content">
				<image src="../../static/img_noCoupon@2x.png" mode=""></image>
				<text>您还没有优惠券</text>
			</view>
			<view
				class="gotoHistoryConpon"
				@click="goToHistoryCouponPage"
				:style="{marginBottom:systemBottom?systemBottom:'0'}"
			>
				<text>查看历史优惠券</text>
				<image src="../../static/goShop_ic@2x.png" mode=""></image>
			</view>
		</view>

		<!-- <view class="coupon-container">
			 <view class="coupon-item" :style="{backgroundImage:bgImg}">
			 	<view class="left">
			 		<text style="font-size: 24rpx;">￥</text>
					<text>10000</text>
			 	</view>
				<view class="right">
					<view class="top-content">
						<view class="top-left">
							<view class="title">
								优惠券名称最长还就是这里
							</view>
							<view class="time">
								有效期至  2020.02.02 13:00
							</view>
						</view>
					</view>
					<view class="instructions">
						<view>使用说明</view>
						<image src="../../static/checked@2x.png" mode=""></image>
					</view>
				</view>
			 </view>
			 <view
			 	class="gotoHistoryConpon"
			 	@click="goToHistoryCouponPage"
			 >
			 	<text>查看历史优惠券</text>
			 	<image src="../../static/goShop_ic@2x.png" mode=""></image>
			 </view>
		</view> -->

	</view>
</template>

<script>

	export default {
		data() {
			return {
				couponList:[],
				systemBottom:'',
				bgImg:'../../static/coupon_used.svg'
			}
		},
		mounted(e) {
		  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		  console.log("menuButtonInfo=", menuButtonInfo);
		  this.systemBottom = menuButtonInfo.bottom + "rpx";
		  console.log("this.systemBottom=", this.systemBottom);
		},
		methods: {
			goToHistoryCouponPage(){
				uni.navigateTo({
					url:"../history-coupon/history-coupon"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.container{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #FFFFFF;
	.empty-container{
		.empty-content{
			margin-top: 400rpx;
			margin-bottom: 400rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			image{
				width: 402rpx;
				height: 416rpx;
			}
			text{
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
			}
		}
		.gotoHistoryConpon{
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			padding-bottom: 24rpx;
			text{
				color: #999999;
				font-size: 24rpx;
				line-height: 34rpx;
			}
			image{
				width: 24rpx;
				height: 24rpx;
			}
		}
	}

	// .coupon-container{
	// 	.coupon-item{
	// 		margin: 0 24rpx 24rpx;
	// 		background-color: yellowgreen;

	// 		width: 702rpx;
	// 		height: 194rpx;
	// 		display: flex;
	// 		flex-flow: row nowrap;
	// 		align-items: center;
	// 		.left{
	// 			width: 172rpx;
	// 			height: 194rpx;
	// 			line-height: 194rpx;
	// 			text-align: center;
	// 			box-sizing: border-box;
	// 			text{
	// 				color: #FF5D35;
	// 				font-size: 56rpx;
	// 			}
	// 		}
	// 		.right{
	// 			display: flex;
	// 			flex-flow: column nowrap;
	// 			align-items: center;
	// 			width: 530rpx;
	// 			padding: 32rpx 24rpx 0 24rpx;
	// 			.top-content,.instructions{
	// 				width: 482rpx;
	// 				display: flex;
	// 				flex-flow: row nowrap;
	// 				align-items:center;
	// 				justify-content: space-between;
	// 			}
	// 			.top-content{
	// 				margin-bottom: 38rpx;
	// 				.top-left{
	// 					.title{
	// 						margin-bottom: 4rpx;
	// 						height: 40rpx;
	// 						line-height: 40rxp;
	// 						color: #333333;
	// 						font-size: 28rpx;
	// 						white-space:nowrap;
	// 						overflow:hidden;
	// 						text-overflow:ellipsis;
	// 					}
	// 					.time{
	// 						height: 32rpx;
	// 						line-height: 32rpx;
	// 						font-size: 22rpx;
	// 						color: #999999;
	// 					}
	// 				}

	// 			}
	// 			.instructions{
	// 				view{
	// 					color: #999999;
	// 					font-size: 24rpx;
	// 				}
	// 				image{
	// 					width: 16rpx;
	// 					height: 8rpx;
	// 				}
	// 			}
	// 		}
	// 	}

	// 	.gotoHistoryConpon{
	// 		display: flex;
	// 		flex-flow: row nowrap;
	// 		align-items: center;
	// 		justify-content: center;
	// 		padding-bottom: 24rpx;
	// 		text{
	// 			color: #999999;
	// 			font-size: 24rpx;
	// 			line-height: 34rpx;
	// 		}
	// 		image{
	// 			width: 24rpx;
	// 			height: 24rpx;
	// 		}
	// 	}
	// }
}

</style>
