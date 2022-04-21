<template>
	<view class="item" @click="toGoodsDetail(item.product.skuId)">
		<image class="img" :src="item.product.spuImage |imgFormat" mode="aspectFill"></image>
		<view class="info">
			<view class="title">
				<text class="tip">
					{{item.product.productTypeId==1?'物品':'服务'}}
				</text>
				<text>{{item.product.spuName}}</text>
			</view>
			<view v-if="item.product.hasAllowance" class="allowance-view">
				<view class="allowance">
					打扮家补贴{{foramtPrePrice(item.product.sku.marketPrice-item.product.skuPrice)}}元
				</view>
			</view>
			<view class="price">
				<text class="price-font pre" style="color: #2b2f33;">
					¥
				</text>
				<text class=" price-font amount">
					{{foramtPrice(item.product.skuPrice)}}
				</text>
				<text class="price-font ex">.{{formatCent(item.product.skuPrice)}}</text>
				<text style="vertical-align: 13%;color: #2b2f33;">
					/{{item.product.salesUnit.unitName||''}}
				</text>
			</view>
			<view v-if="(item.product.sku.marketPrice-item.product.skuPrice)>0" class=" price " style="color: #bcbcbc;margin-top: -5rpx;">
				<text style="font-size: 20rpx;margin-right: 10rpx;text-decoration:line-through">市场价 :
					<text class="price-font pre " style="font-size: 20rpx;">
						¥
					</text>
					<text class=" price-font amount" style="color: #bcbcbc;font-size: 26rpx;">
						{{foramtPrice(item.product.sku.marketPrice)}}
					</text>
					<text class="price-font ex"
						style="color: #bcbcbc;font-size: 20rpx;">.{{formatCent(item.product.sku.marketPrice)}}</text>
					<text style="vertical-align: 13%; color: #bcbcbc;font-size: 20rpx;">
						/{{item.product.salesUnit.unitName||''}}
					</text>
				</text>
			</view>
		</view>
		<view style="height: 18rpx;">
		</view>

	</view>
</template>


<script>
	import {
		imgFormat
	} from '../../../../utils/common.js'
	export default {
		filters: {
			imgFormat
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {
			toGoodsDetail(id) {
				// uni.navigateTo({
				// 	url: "/sub-classify/pages/product-detail/index?goodId=" + id,
				// });
				uni.navigateTo({
					url: `/sub-classify/pages/product-detail/index?productId=${id}`
				});
			},
			foramtPrice(item) {
				let price = String(item || "0");
				return price.slice(0, price.length - 2) || "0";
			},
			foramtPrePrice(price) {
				return Number(price / 100).toFixed(2);
			},
			formatCent(item) {
				let price = String(item || "0");
				let fixedNum = Number(price / 100).toFixed(2);
				if (String(fixedNum).split(".").length > 1) {
					return String(fixedNum).split(".")[1];
				} else {
					return "";
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin-top: 16rpx;
		flex-shrink: 0;
		width: 328rpx;
		// border-radius: 18rpx;
		// border: 0.3px solid #e6eaed;
		position: relative;
		overflow: hidden;

		.img {
			width: 100%;
			height: 343rpx;
			display: block;
			border-radius: 16rpx;
		}

		.allowance-view {
			display: flex;
			margin-top: 8rpx;

			.allowance {
				line-height: 30rpx;

				height: 30rpx;
				border: 1rpx solid rgba(255, 51, 71, 0.30);
				border-radius: 6rpx;
				color: #ff3347;
				font-size: 20rpx;
				font-weight: 400;
				text-align: center;
				padding: 0 8rpx;
			}
		}

		.price {
			margin-top: 13rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #939699;
			line-height: 0;

			.amount {
				font-size: 36rpx;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
			}

			.ex {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 26rpx;
			}

			.pre {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 26rpx;
				padding-right: 5rpx;
				vertical-align: 3%;
			}
		}

		.info {
			// padding: 0 24rpx;
			display: flex;
			flex-direction: column;

			.title {
				margin-top: 20rpx;
				font-size: 28rpx;
				color: #2b2f33;
				line-height: 44rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //这个代表你要在几行显示省略号
				-webkit-box-orient: vertical;
				vertical-align: middle;
			}

			.tip {
				padding: 3rpx 8rpx 1rpx;
				margin-right: 8rpx;
				line-height: 30rpx;
				border-radius: 4rpx;
				letter-spacing: 0.2px;
				color: #222222;
				font-weight: 600;
				font-size: 21rpx;
				text-align: center;
				display: inline-block;
				background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
				vertical-align: 13%;
			}
		}
	}
</style>
