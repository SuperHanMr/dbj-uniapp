<template>
	<view class="container">
		<view class="empty-container">
			<view class="empty-content">
				<image src="../../../static/order/blank_house@2x.png" mode=""></image>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				systemBottom:'',
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
	 overflow: hidden;
	 background-color: #FFFFFF;
	.empty-content{
		margin-top: 408rpx;
		margin-bottom: 458rpx;
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
</style>
