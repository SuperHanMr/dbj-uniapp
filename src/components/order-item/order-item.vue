<template>
	<view class="body-main" :style="{paddingBottom:paddingBottom +'rpx'}" @click="handleDetail()" >
		<view class="pic">
			<view class="icon-status1">
				退款中
			</view> 
			<image src="../../wxcomponents/loginSDK/img/logo.0ccb88de.png" mode=""></image>
		</view>
		<view class="basic-info">
			<view class="name-attr">
				<view class="text">
					<text class="icon">物品</text>
					<text class="name">打扮家的爆款产品绝对值得购买哈哈哈哈哈哈哈哈哈哈哈nice nice nice nice nice</text>					
				</view>
				<view class="attr">
					<text style="margin-right: 24rpx;">白色</text>
					<text>2.0m/根</text>
				</view>						
			</view>
			
			<view class="common-price">
				<view class="product-price">
					<text style="margin-right: 8rpx;font-size: 22rpx;">实付</text>
					<text style="font-size:22rpx;">￥</text>
					<text>28.</text>
					<text style="font-size:22rpx;">00</text>
				</view>
				<view  class="product-price" style="color: #999999;">
					<text style="font-size:22rpx;">￥</text>
					<text>28.</text>
					<text style="font-size:22rpx;">00</text>
				</view>
				<view style="color: #999999;">共1件</view>
			</view>	
		</view>
	</view>
</template>

<script>
	
	export default {
		name:"order-item",
		props:{
			paddingBottom:{
				type: Number,
				default:32,
			},
			iconStatus:{
				type:Number,
				default:0,
			}
		},
		data() {
			return {

			};
		},
		methods:{
			handleDetail(){
				console.log("dada")
				this.$emit('handleDetail')
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.body-main {
		box-sizing: border-box;
		display: flex;
		flex: 1;
		padding-bottom:32rpx;
		flex-flow: row nowrap;
		.pic{
			margin-right: 32rpx;
			position: relative;
			.icon-status1{
				position: absolute;
				width: 84rpx;
				height: 32rpx;
				line-height: 32rpx;
				// background: #F4F5F6 linear-gradient(314deg, #FFBF38 0%, #FFA94F 100%);
				background: #F4F5F6 linear-gradient(135deg, #20D4B9 0%, #29D6E0 100%);
				border-radius: 8rpx 0 16rpx 0;
				font-size: 20rpx;
				text-align: center;
				color: #FFFFFF;
				letter-spacing: 1rpx;
			}
			image{
				width: 136rpx;
				height: 136rpx;
				border-radius: 8rpx;
			}
		}
		.basic-info{
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			justify-content: space-between;
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
					max-width: 349rpx;
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
					margin-bottom: 12rpx;
				}
				
			}
		}
	}
		

</style>
