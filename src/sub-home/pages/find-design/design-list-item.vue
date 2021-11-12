<template>
	<view class="item" @click="toGoodsDetail(item.id)">
		<image class="img" :src="item.imageUrl |imgFormat" mode="aspectFill"></image>
		<view class="info">
			<view class="title">
				<text>{{item.name}}</text>
			</view>
			<view v-if="item.tagging&&item.price" class="allowance-view">
				<view class="allowance">
					打扮家补贴{{item.subsidizedPrice}}元
				</view>
			</view>
			<view class="price-view">

				<view class="price">
					<text class="price-font pre" style="color: #2b2f33;">
						¥
					</text>
					<text class=" price-font amount">
						{{foramtPrice(item.price)}}
					</text>
					<text class="price-font ex">.{{formatCent(item.price)}}</text>
					<text style="vertical-align: 13%;color: #2b2f33;">
						/{{item.unitName}}
					</text>
				</view>
				<view class="sale-count">
					{{item.sales}} 人付款
				</view>
			</view>
			<view v-if="item.tagging" class=" price " style="color: #bcbcbc;margin-top: -5rpx;">
				<text style="font-size: 20rpx; margin-right: 10rpx;text-decoration:line-through">市场价 :
					<text class="price-font pre"  style="font-size: 20rpx;" >
						¥
					</text>
					<text class=" price-font amount" style="color: #bcbcbc;font-size: 26rpx;">
						{{foramtPrice(item.convertedPrice*100)}}
					</text>
					<text class="price-font ex" style="color: #bcbcbc;">.{{formatCent(item.convertedPrice*100)}}</text>
					<text style="vertical-align: 13%; color: #bcbcbc;font-size: 20rpx;">
						/{{item.unitName||''}}
					</text>
				</text>
			</view>
		</view>
		<view style="height: 12rpx;">
		</view>
	</view>
</template>


<script>
	import {
		imgFormat
	} from '../../../utils/common.js'
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
			display: block;
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

		.price-view {
			display: flex;
			justify-content: space-between;
			align-items: center;
				margin-top: 13rpx;

			.sale-count {
				font-size: 22rpx;
				font-weight: 400;
				text-align: left;
				color: #999999;
				line-height: 22rpx;
				vertical-align: 13%;
			}

			.price {
				font-size: 24rpx;
				font-weight: 400;
				color: #939699;
				line-height: 0;
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
		}

		.info {
			padding: 0 24rpx;
			display: flex;
			flex-direction: column;

			.title {
				margin-top: 8rpx;
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
				border-radius: 6rpx;
				color: #35c4c4;
				font-size: 20rpx;
				text-align: center;
				display: inline-block;
				border: 1rpx solid #35c4c4;
				vertical-align: 13%;
			}

		}
	}
	.price {
		font-size: 24rpx;
		font-weight: 400;
		color: #939699;
		line-height: 0;
	
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
</style>
