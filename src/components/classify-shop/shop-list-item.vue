<template>
	<view class="item" @click="toGoodsDetail(item.product.skuId)">
		<image class="img" :src="item.product.spuImage | imgFormat" mode="aspectFill"></image>
		<view class="info">
			<view class="category">
				<text class="category-item"
					v-for="(category, categoryIndex) in categoryListHandler(item.product.categories, item.product.brand)"
					:key="category">
					<text>{{category}}</text>
					<text v-if="categoryIndex !== categoryListHandler(item.product.categories, item.product.brand).length - 1">|</text>
				</text>
			</view>
			<view class="title">
				<text>{{item.product.spuName}}</text>
			</view>
			<!-- v-if="item.product.hasAllowance" -->
			<view class="allowance-view" v-if="item.product.hasAllowance || item.product.designerRecommendNumber">
				<view class="allowance" v-if="item.product.hasAllowance && !item.product.designerRecommendNumber">
					打扮家补贴{{foramtPrePrice(item.product.sku.marketPrice-item.product.skuPrice)}}元
				</view>
				<view class="recommended" v-if="item.product.designerRecommendNumber">
					<text class="recommended-icon icon-goods"></text>
					<text>{{item.product.designerRecommendNumber}}位设计师推荐</text>
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
			<view v-if="(item.product.sku.marketPrice-item.product.skuPrice)>0" class="price original-price">
				<text class="original-price-through">
					<text class="original-price-price-font price-font pre ">
						¥
					</text>
					<text class=" price-font amount original-price-amount">
						{{foramtPrice(item.product.sku.marketPrice)}}
					</text>
					<text class="price-font ex original-price-ex">.{{formatCent(item.product.sku.marketPrice)}}</text>
					<text class="original-price-unitName">
						/{{item.product.salesUnit.unitName||''}}
					</text>
				</text>
			</view>
			<view class="flagship-store" @click.stop="toFlagShipShopHandler(item.product.storeId)">
				<view class="flagship-store-title">{{item.product.storeName}}</view>
				<view class="flagship-store-icon icon-alert_notice_jump"></view>
			</view>
		</view>
		<view class="bottom-padding">
		</view>

	</view>
</template>


<script>
	import {
		imgFormat
	} from '../../utils/common.js'
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
			toFlagShipShopHandler(storeId) {
				let currentHouse = getApp().globalData.currentHouse;
				uni.navigateTo({
					url: `/sub-classify/pages/shops/shops?storeId=${storeId}&houseId=${currentHouse.id}`
				})
			},
			categoryListHandler(categories, brand) {
				let categoriesName1 = '';
				let categoriesName2 = '';
				let arr = []
				if (categories && categories[0] && categories[0].category4Name) {
					categoriesName1 = categories[0].category4Name
					arr.push(categoriesName1);
				}
				if (categories && categories[1] && categories[1].category4Name) {
					categoriesName2 = categories[1].category4Name
					arr.push(categoriesName2);
				}
				if (brand && brand.name) {
					arr.push(brand.name);
				}
				return arr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		flex-shrink: 0;
		// border-radius: 18rpx;
		// border: 0.3px solid #e6eaed;
		position: relative;
		overflow: hidden;
		width: 328rpx;

		.img {
			width: 324rpx;
			height: 324rpx;
			display: block;
			border-radius: 16rpx;
			border: 0.5px solid #E8E8E8;
		}

		.allowance-view {
			display: flex;
			margin: 8rpx 0 6rpx;

			.recommended {
				border: 0.5px solid rgba(197, 165, 141, 0.299899);
				box-sizing: border-box;
				border-radius: 4rpx;
				line-height: 30rpx;
				height: 30rpx;
				font-weight: 400;
				font-size: 20rpx;
				color: #AF8D73;
				padding: 0 8rpx;

				.recommended-icon {
					font-size: 20rpx;
					color: #AF8D73;
					margin: 0 5rpx 2rpx 0;
				}
			}

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
			margin-top: 4rpx;
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

		.original-price {
			color: #bcbcbc;
			margin: -5rpx 0 4rpx;
			height: 30rpx;

			.original-price-through {
				font-size: 20rpx;
				margin-right: 10rpx;
				text-decoration: line-through;

				.original-price-price-font {
					font-size: 20rpx;
				}

				.original-price-amount {
					color: #bcbcbc;
					font-size: 26rpx;
				}

				.original-price-ex {
					color: #bcbcbc;
					font-size: 20rpx;
				}

				.original-price-unitName {
					vertical-align: 13%;
					color: #bcbcbc;
					font-size: 20rpx;
				}
			}
		}

		.info {
			// padding: 0 24rpx;
			display: flex;
			flex-direction: column;

			.category {
				margin-top: 18rpx;
				font-weight: 400;
				font-size: 20rpx;
				letter-spacing: 0.1px;
				color: #666666;
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				.category-item {

					text {
						margin-right: 6rpx;
					}
				}
			}

			.title {
				margin-top: 6rpx;
				font-weight: 400;
				font-size: 26rpx;
				line-height: 44rpx;
				letter-spacing: 0.1px;
				color: #333333;
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

	.flagship-store {
		position: relative;
		z-index: 10;
		margin-top: 6rpx;
		font-weight: 400;
		font-size: 18rpx;
		line-height: 26rpx;
		color: #999999;
		display: flex;
		align-item: center;
		.flagship-store-title{
			max-width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.flagship-store-icon {
			font-size: 16rpx;
			color: #999999;
			margin: 7rpx 0 0 4rpx;
		}
	}

	.bottom-padding {
		height: 48rpx;
	}
</style>
