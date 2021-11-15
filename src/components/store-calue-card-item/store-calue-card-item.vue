<template>
	<view  class="container">

		<view	class="body-main" :style="{paddingBottom:containerPaddingBottom +'rpx'}" @click="handleDetail()" >
			<view class="pic">
				<image
					src="../../static/merchant-entry/merchant-entry-ic／bg.png"
					mode="aspectFit"
				 ></image>
			</view>

			<view class="basic-info">
				<view class="name-attr">
					<view class="text">
						储值卡
					</view>
				</view>
				<view class="common-price">
					<!-- 商品价格 -->
					<view class="product-price" >
						<text style="font-size:22rpx;">￥</text>
						<text class="price-font">500.</text>
						<text style="font-size:22rpx;" class="price-font">00</text>
					</view>
					<view style="color: #999999;">共{{dataList.number || 1}}件</view>
				</view>
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
			},
			dataList:{
				type:Object,
				default:{},
			},
			isEvaluate:{
				type:String,
				default:''
			},
			orderStatus:{//1 待付款 2 进行中 3 已完成
				type:Number,
			},
			// showPrice:{
			// 	type:Boolean,
			// 	default:false
			// },
			// showOriginPrice:{
			// 	type:Boolean,
			// 	default:false
			// },
			refundType:{
				type:Boolean,
				default:false,
			},
			showIcon:{
				type:Boolean,
				default:false
			},
			refundApplyMode:{
				type:Number,
			}
		},
		data() {
			return {
				containerPaddingBottom:'32'
			};
		},
		mounted() {
			if( (this.dataList.stockType && this.dataList.stockType == 1 && this.dataList.type == 1&& this.orderStatus==2) || (this. dataList.showRefundBtn && this. orderStatus==2)){
				this.containerPaddingBottom= 0
			}
		},

		methods:{
			handleDetail(){
				this.$emit('handleDetail')
			},

			handlePrice(price){
					if(!price) return ['0','00']
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},

			particalRefund(){
				this.$emit('toApplayForRefund')
			},

			refundCancel(){
				this.$emit('refundCancel')
			},
			refundSuccess(){
				this.$emit('refundSuccess')
			},
			refundFailed(){
				this.$emit('refundFailed')
			},
			refundClose(){
				this.$emit('refundClose')
			},
		}
	}
</script>

<style lang="scss" scoped>

	.body-main {
		box-sizing: border-box;
		display: flex;
		flex: 1;
		// padding-bottom:32rpx;
		flex-flow: row nowrap;
		.pic{
			margin-right: 16rpx;
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
			// justify-content: space-between;
			align-items: center;
			.name-attr{
				// max-width: 349rpx;
				display: flex;
				flex: 1;
				flex-flow: column nowrap;
				margin-right: 24rpx ;
				.text{
					font-size: 26rpx;
					color: #333333;
					line-height: 32rpx;
				}
				.attr{
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999999;
				}
			}
			.common-price{
				display: flex;
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
