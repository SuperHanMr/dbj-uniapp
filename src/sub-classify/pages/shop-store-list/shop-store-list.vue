<template>
	<view class="container"> 
		<view class="store-container">
			<view class="storeItem" v-for="item in 4" :key="item">
				<image class="storeImg" src="../../static/image/pay-bg.png" mode=""></image>
				<view class="baseInfo-container">
					<view class="header">
						<image class="icon" src="../../../static/home_owner.png" mode=""></image>
						<view class="title">芝华仕家具(北京石景山区店)</view>
					</view>
					<view class="label-container">
						<view class="labelItem">家具</view>
						<view class="labelItem">全屋定制</view>
						<view class="labelItem">软装</view>
					</view>
					<view class="product-container">
						<view class="productItem" v-for="item2 in 3" :key="item2">
							<image class="productImg" src="../../../static/images/real-case/pic_empty.png" mode=""></image>
							<view class="productName">简约柜子绿色...</view>
							<view class="price">
								<text style="font-size: 22rpx;">￥</text>
								<text style="font-size: 28rpx;font-weight: 500;">88.88</text>
								<text style="font-size: 20rpx;">/个</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trigger:false,
				onLoading:false,
				storeList:[],
			}
		},
		onLoad() {
			this.reqStoreList()
		},
		methods: {
			reqStoreList(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>

	.container{
		background: #F5F5F5;
		.store-container{
			height: 100%;
			overflow: scroll;
			
		}
	}	
	.storeItem{
		margin-top: 16rpx;
		height: 448rpx;
		background: #ffffff;
		border-radius: 24rpx;
		display: flex;
		justify-content: flex-start;
		padding: 24rpx 0 0 24rpx;
		.storeImg{
			width: 108rpx;
			height: 108rpx;
			border: 1rpx solid #F2F2F2;
			box-sizing: border-box;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.baseInfo-container{
			.header,.label-container,.product-container{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
			}
			
			.header{
				margin-bottom: 12rpx;
				.icon{
					width: 50rpx;
					height: 28rpx;
					border-radius: 4rpx;
					margin-right: 10rpx;
				}
				.title{
					max-width: 506rpx;
					height: 44rpx;
					line-height: 44rpx;
					color: #333333;
					font-size: 32rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			} 
			
			.label-container{
				margin-bottom: 28rpx;
				.labelItem{
					padding: 0 12rpx;
					height: 36rpx;
					line-height: 36rpx;
					color: #586E85;
					font-size: 22rpx;
					background: #F2F4F7;
					border-radius: 6rpx;
					margin-right: 16rpx;
				}
			}
			
			.product-container{
				.productItem{
					display: flex;
					flex-flow: column nowrap;
					margin-right: 16rpx;
					.productImg{
						width: 178rpx;
						height: 178rpx;
						margin-bottom: 16rpx;
					}
					.productName{
						height: 40rpx;
						line-height: 40rpx;
						font-size: 24rpx;
						letter-spacing: 1rpx;
						color: #333333;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis; 
						margin-bottom: 4rpx;
					}
					
					.price{
						text{
							color: #333333;
						}
					}
				}
			}
		}
	}
	
</style>
