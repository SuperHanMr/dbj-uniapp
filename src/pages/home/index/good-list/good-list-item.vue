<template>
	<view class="item" @click="toGoodsDetail(item.product.skuId)">
		<image class="img" :src="item.product.skuImage |imgFormat" mode="aspectFill"></image>
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
				<text class="price-font pre">
					¥
				</text>
				<text class=" price-font amount">
					{{foramtPrice(item.product.skuPrice)}}
				</text>
				<text class="price-font ex">.{{formatCent(item.product.skuPrice)}}</text>
				<text style="vertical-align: 13%;">
					/{{item.product.salesUnit.unitName||''}}
				</text>
			</view>
			<view v-if="item.product.hasAllowance" class=" price " style="color: #bcbcbc;margin-top: 0;">
				<text style="margin-right: 10rpx;text-decoration:line-through">市场价 :
					<text class="price-font pre">
						¥
					</text>
					<text class=" price-font amount" style="color: #bcbcbc;">
						{{foramtPrice(item.product.sku.marketPrice)}}
					</text>
					<text class="price-font ex"
						style="color: #bcbcbc;">.{{formatCent(item.product.sku.marketPrice)}}</text>
					<text style="vertical-align: 13%; color: #bcbcbc;">
						/{{item.product.salesUnit.unitName||''}}
					</text>
				</text>
			</view>
		</view>
		<view style="height: 19rpx;">
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
			return {
			}
		},
		methods: {
			toGoodsDetail(id) {
				uni.navigateTo({
					url: "/sub-classify/pages/goods-detail/goods-detail?goodId=" + id,
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
		width: 343rpx;
		border-radius: 18rpx;
		border: 0.3px solid #e6eaed;
		position: relative;
		overflow: hidden;

		.img {
			width: 100%;
			height: 343rpx;
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
				padding: 0 7rpx;
			}
		}

		.price {
			margin-top: 13rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #939699;
			line-height: 26rpx;
			font-family: Unnamed-Regular, Unnamed;

			.amount {
				font-size: 40rpx;
				font-weight: 400;
				color: #2b2f33;
				line-height: 42rpx;
			}

			.ex {
				font-size: 34rpx;
				font-weight: 400;
				color: #2b2f33;
				line-height: 26rpx;
			}

			.pre {
				font-size: 28rpx;
				font-weight: 400;
				line-height: 26rpx;
				padding-right: 5rpx;
				vertical-align: 3%;
			}
		}

		.info {
			padding: 0 24rpx;
			display: flex;
			flex-direction: column;

			.title {
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #2b2f33;
				line-height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //这个代表你要在几行显示省略号
				-webkit-box-orient: vertical;
				vertical-align: middle;
			}

			.tip {
				width: 60rpx;
				height: 30rpx;
				margin-right: 8rpx;
				line-height: 30rpx;
				border-radius: 4rpx;
				color: #35c4c4;
				font-size: 20rpx;
				text-align: center;
				display: inline-block;
				border: 1rpx solid #35c4c4;
				vertical-align: 13%;
			}
		}
	}
</style>
