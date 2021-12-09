<template>
	<view class="contianer">
		<view class="item-style">
			<view class="left">
				储值卡余额
			</view>
			<view class="right">
				<text>￥</text><text class="price-font">500</text>
			</view>
		</view>
		<view class="item-style">
			<view class="left">
				已使用优惠券额度
			</view>
			<view class="right">
				<text>￥</text><text class="price-font">500</text>
			</view>
		</view>
		<view class="line" />
		<view class="footer">
			实际可退金额：￥100.00
		</view>					
	</view>
</template>

<script>
	export default {
		name:"refund-price",
		data() {
			return {
				
			};
		},
		methods:{
			handlePrice(price) {
			  if (!price) return ["0", "00"];
			  let list = String(price).split(".");
			  // return [list[0], list[1]]
			  if (list.length == 1) {
			    return [list[0], "00"];
			  } else {
			    return [list[0], list[1]];
			  }
			},
		},
	}
</script>

<style lang="scss">
 .contianer{
		padding-top: 32rpx;
		// padding: 32rpx;
		// background-color: pink;
		.item-style{
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			color: #808080;
			font-size: 24rpx;
			font-weight: 400;
			margin-bottom: 20rpx;
			.left,.right {
				color: #333333;
				font-size: 24rpx;
			}
		}
		.line{
			height: 0.5px;
			background: #F4F4F4;
			margin-top: 24rpx;
			margin-bottom: 32rpx;
		}
		.footer{
			color: #FF3347;
			font-size: 24rpx;
			text-align: right;
		}
 }
 
</style>
