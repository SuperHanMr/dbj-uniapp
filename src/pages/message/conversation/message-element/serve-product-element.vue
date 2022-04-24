<template>
  <message-bubble :message="message" class="serve-product-message" no-padding>
    <view class="serve-product-element" @click="handlePreview">
			<view class="serve-header"  :class="{isTimeout: isTimeout}">
				<view class="serve-header-bg">
					<view class="serve-name">
						<image class="serve-icon" :src="serveIcon"></image>设计服务
					</view>
					<view class="timeout" >
						<template v-if="!isTimeout">
							距失效
							<view class="timmer">
								<text>{{timeStr}}</text>
							</view>
						</template>
						<template v-else>已失效</template>
					</view>
				</view>

			</view>
      <view class="product-content">
        <view class="product-name">
					<text>{{params.productName}}</text>
        </view>
				<view class="product-houseType">
					<text>{{params.houseType}}</text>
				</view>
				<view class="product-price">
					<view class="bottom-left">
						<view class="price">￥<text class="price-prefix">{{getPricePre(params.price)}}</text>.{{getPriceAppend(params.price)}}</view>/{{params.unitName}}
					</view>
				</view>

      </view>
    </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";
import serveIcon from "../../../../static/Subtract.png";

export default {
  name: "GoodsElement",
  components: {
    MessageBubble,
  },
	data() {
		return {
			timeStr: '',
			isTimeout: false,
			serveIcon,
			timer: null,
			timeLine: 1649934341440,
		}
	},
	created() {
		if (!this.timer) {
			if (!this.isTimeout) {
				this.reduceTime()
				this.timer = setInterval(() => {
					this.reduceTime();
				}, 1000);
			}

		}
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
		}
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
			let url = `/sub-classify/pages/product-detail/service-product-index?spuId=${this.params.spuId}&productId=${this.params.intentId}&from=IM&time=${this.params.expireDate}`;
			console.log(url)
      uni.navigateTo({
        url
      })
    },
		reduceTime() {
			let now = Date.now();
			let surplus = this.params.expireDate - now;
			if (surplus <= 0) {
				this.timeStr = "";
				this.isTimeout = true;
				clearInterval(this.timer);
				this.timer = null;
			} else {
				let hour = parseInt(surplus / 1000 / 60 / 60);
				let minits = parseInt(surplus / 1000 / 60 - hour * 60);
				let seconds = parseInt(surplus / 1000 - hour * 60 * 60 - minits * 60);
				if (hour) {
					this.timeStr = `${hour} 时 ${minits < 10 ? '0' + minits: minits} 分`
				} else {
					this.timeStr = `${minits} 分 ${seconds < 10 ? '0' + seconds : seconds} 秒`
				}
			}
		}
  },
};
</script>

<style lang="scss" scoped>
.serve-product-element {
  background: #fff;
  border-radius: 16rpx;
	border-top-left-radius: 0;
  width: 510rpx;
  overflow: hidden;
	padding: 0rpx 0rpx 16rpx 0;
	.serve-header{
		background: linear-gradient(90deg, #F7EADD 0%, #D8C9C0 100%);
		height: 109rpx;
		&.isTimeout{
			background: linear-gradient(90.02deg, #DEDFE0 0.02%, #C9CACD 99.98%);
			.serve-header-bg{
					background-image: url('../../../../static/serve-product-header.png');
			}
		}

		.serve-header-bg{
			height: 80rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 24rpx;
			background: url('../../../../static/serve-product-header-2.png') no-repeat;
			background-size: 180rpx 60rpx;
			background-position: 160rpx 0;

			.serve-name{
				font-weight: 500;
				font-size: 26rpx;
				line-height: 36rpx;
				color: #746A63;

				.serve-icon{
					height: 18rpx;
					width: 18rpx;
					margin-right: 11rpx;
				}
			}

			.timeout{
				font-weight: 500;
				font-size: 22rpx;
				line-height: 36rpx;
				height: 36rpx;
				display: flex;
				align-items: center;
				flex-direction: row;
				color: #746A63;

				.timmer{
					display: inline-block;
					background: #fff;
					width: 130rpx;
					height: 36rpx;
					background: #FFFFFF;
					border: 1rpx solid #BFAFA5;
					box-sizing: border-box;
					border-radius: 6rpx;
					vertical-align: middle;
					text-align: center;
					color: #746A63;
					font-size: 22rpx;
					font-weight: 500;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					margin-left: 12rpx ;
				}
			}
		}
	}


  .product-name {
		margin-top: -29rpx;
		background: #fff;
		border-radius: 16rpx;
		z-index: 1;
		position: relative;
		padding: 16rpx 24rpx 0;
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
		padding: 0 24rpx;
		font-size: 20rpx;
		line-height: 28rpx;
		height: 28rpx;
		margin-top: 2rpx;
		color: #333;
	}

	.product-price{
		padding: 0 24rpx;
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
