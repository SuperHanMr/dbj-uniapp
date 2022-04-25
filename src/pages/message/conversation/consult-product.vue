<template>
	 <view v-show="ready" class="consult-product">
      <view class="product-content">
				<view class="product-header">
					<view class="product-name">
						<text>{{detail.name}}</text>
        	</view>
					<view class="close" @click="close">
						<uni-icons color="#000" size="16" type="closeempty" />
					</view>
				</view>

				<view class="product-houseType">
					<text>{{detail.houseType}}</text>
				</view>
				<view class="product-tags">
					<view class="product-tag" v-for="tag in (detail.serviceTag || [])" :key="tag.code">
						{{tag.name}}
					</view>
				</view>
				<view class="product-price">
					<view class="bottom-left">
						<view class="price">￥<text class="price-prefix">{{getPricePre(detail.serviceMinPrice)}}</text>.{{getPriceAppend(detail.serviceMinPrice)}}<template v-if="detail.serviceMinPrice !== detail.serviceMaxPrice"> ~ <text class="price-prefix">{{getPricePre(detail.serviceMaxPrice)}}</text>.{{getPriceAppend(detail.serviceMaxPrice)}}</template></view>/{{detail.salesUnits ? detail.salesUnits.unitName : '-'}}
					</view>
					<view class="send_product" @click="sendProduct">
						发送商品
					</view>
				</view>

      </view>
    </view>
</template>

<script>
import ConsultProductElement from './message-element/consult-product-element.vue';
import {
	getServeProduct,
	sendServeProduct
} from "../../../api/classify";
export default {
	components: {
		ConsultProductElement,
	},
	props: {
		spuId: {
			type: Number,
			default: 0,
		}
	},
	data() {
		return {
			detail: {},
			ready: false,
		}
	},
	created() {
		console.log(this.id);
		this.getDetail();
	},
	methods: {
		getPricePre(number) {
			if (number < 100) {
				return 0;
			} else {
				return parseInt(number / 100, 10);
			}
		},
		getPriceAppend(number) {
			if (number % 100 < 100) {
				return "0" + number % 100
			} else {
				return number % 100
			}
		},
		close() {
			this.$emit('close');
		},
		getDetail() {
			console.log(this.spuId);
			getServeProduct(this.spuId).then(res => {
				console.log(res);
				this.ready = true;
				this.detail = res;
			})
		},
		sendProduct() {
			sendServeProduct({
				staffId: this.detail.updateUser,
				spuId: this.spuId,
			}).then(res => {
				this.$emit('close');
			})
		}
	}
}
</script>

<style scoped lang="scss">
.consult-product {
  background: #fff;
  border-radius: 16rpx;
	background: linear-gradient(180deg, #FFFBF8 0%, #FFFFFF 40%);
	margin: 0 32rpx 32rpx;
	position: relative;
	.product-content{
		overflow: hidden;
		padding: 16rpx 24rpx;
		background-image: url("https://ali-image.dabanjia.com/image/20220424/10/165077072191202.png");
		background-repeat: no-repeat;
		background-size: 88rpx 88rpx;
		background-position: 510rpx 0;
	}
	.product-header{
		display: flex;
		.close{
			margin-left: 50rpx;
		}
	}


  .product-name {
		flex: 1;
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
		line-height: 0rpx;

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
			margin-right: 12rpx;
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
		.send_product{
			position: absolute;
			bottom: 16rpx;
			right: 24rpx;
			width: 158rpx;
			height: 56rpx;
			border-radius: 32rpx;
			background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%);
			color: #fff;
			font-size: 24rpx;
			font-weight: 500;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}


}
</style>
