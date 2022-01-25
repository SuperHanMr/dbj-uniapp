<template>
	<view  class="container">

		<view	class="body-main" v-if="refundType" :style="{paddingBottom:containerPaddingBottom +'rpx'}" @click="handleDetail()" >
			<view class="pic">
				<image
					:src="dataInfo.imgUrl"
					mode="aspectFit"
				 ></image>
			</view>

			<view class="basic-info">
				<view class="name-attr">
					<view class="text">
						{{dataInfo.fullName}}
					</view>
				</view>
				<view class="common-price">
					<view class="product-price">
						<text style="font-size:22rpx;">￥</text>
						<text class="price-font">{{handlePrice(dataInfo.price)[0]}}.</text>
						<text style="font-size:22rpx;" class="price-font">{{handlePrice(dataInfo.price)[1]}}</text>
					</view>
					<view style="color: #999999;">共{{dataInfo.number || 1}}件</view>
				</view>
			</view>
		</view>
		<view	class="body-main" v-else :style="{paddingBottom:containerPaddingBottom +'rpx'}" @click="handleDetail()" >
			<view class="pic">
				<image
					:src="dataInfo.imgUrl"
					mode="aspectFit"
				 ></image>
			</view>
		
			<view class="basic-info">
				<view class="name-attr">
					<view class="text">
						{{dataInfo.fullName}}
					</view>
				</view>
				<view class="common-price">
					<view class="product-price">
						<text style="font-size:22rpx;">￥</text>
						<text class="price-font">{{handlePrice(dataInfo.price)[0]}}.</text>
						<text style="font-size:22rpx;" class="price-font">{{handlePrice(dataInfo.price)[1]}}</text>
					</view>
					<view style="color: #999999;">共{{dataInfo.number || 1}}件</view>
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
			dataInfo:{
				type:Object,
				default:{},
			},
			orderStatus:{//1 待付款 2 进行中 3 已完成
				type:Number,
			},
			refundType:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				containerPaddingBottom:'32'
			};
		},
		mounted() {
			if(this.refundType){
				this.containerPaddingBottom = '0'
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
				display: flex;
				flex: 1;
				flex-flow: column nowrap;
				margin-right: 24rpx ;
				.text{
					font-size: 26rpx;
					color: #333333;
					line-height: 32rpx;
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
					text{
						color: #333333 ;
					}
				}

			}
		}
	}

	
	
</style>
