<template>
  <message-bubble :message="message" class="consult-product-message" no-padding>
    <view class="consult-product-element" @click="handlePreview">
      <view class="product-content">
        <view class="product-name">
					<text>{{params.productName}}</text>
        </view>
				<view class="product-houseType">
					<text>{{params.houseType}}</text>
				</view>
				<view class="product-tags">
					<view class="product-tag" v-for="tag in (params.tags || [])" :key="tag">
						{{tag}}
					</view>
				</view>
				<view class="product-price">
					<view class="bottom-left">
						<view class="price">￥<text class="price-prefix">{{getPricePre(params.minPrice)}}</text>.{{getPriceAppend(params.minPrice)}} ~ <text class="price-prefix">{{getPricePre(params.maxPrice)}}</text>.{{getPriceAppend(params.maxPrice)}}</view>/{{params.unitName}}
					</view>
				</view>

      </view>
    </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";

export default {
  name: "GoodsElement",
  components: {
    MessageBubble,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    params() {
      return this.message.payloadData.params || {};
    },
  },
  methods: {
		getPricePre(number) {
			return parseInt(number / 100, 10);
		},
		getPriceAppend(number) {
			return (number % 100 < 10) ? `0${number % 100}`  : number % 100
		},
    handlePreview() {
			let url = `/sub-classify/pages/product-detail/service-product-index?spuId=${this.params.spuId}&from=IM&time=`
      uni.navigateTo({
        url
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.consult-product-element {
  background: #fff;
  border-radius: 16rpx;
  width: 510rpx;
  overflow: hidden;
	padding: 16rpx 24rpx;
  .product-name {
		font-size: 30rpx;
		font-weight: 500 ;
    align-items: flex-end;
    color: #333;
    line-height: 50rpx;
		height: 50rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
  }

	.product-houseType{
		font-size: 20rpx;
		line-height: 28rpx;
		height: 28rpx;
		margin-top: 2rpx;
		color: #333;
	}

	.product-tags{
		overflow: hidden;
		margin-top: 12rpx;
		height: 30rpx;

		.product-tag{
			height: 30rpx;
			display: inline-block;
			line-height: 28rpx;
			padding: 0 8rpx;
			font-size: 18rpx;
			box-sizing: border-box;
			color: #999;
			border-radius: 4rpx;
			border: 1rpx solid #ccc;
		}
	}

	.product-price{
		margin-top: 32rpx;
		font-size: 22rpx;
		color: #333;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.bottom-left{
			.price{
				font-family: PriceFont;
				display: inline-block;
				.price-prefix{
					font-size: 32rpx;
				}
			}
		}
	}


}
</style>
