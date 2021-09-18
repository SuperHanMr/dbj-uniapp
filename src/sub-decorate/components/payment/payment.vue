<template>
	<view class="wrap">
		<view class="pieces-price-unit">
			<text class="pieces">共{{pieces}}件，</text>
			<text class="unit">总计：￥</text>
      <!-- <text class="price">{{countPrice}}</text> -->
			<text class="price">{{__countPrice[0]}}</text>
			<text class="flot">.{{__countPrice[1]}}</text>
		</view>
		<button class="btn" :disabled="!isAllChecked" :class="{ disabled: !isAllChecked }" @click="gotopay">去结算</button>
	</view>
</template>

<script>
	export default {
		name: "Payment",
		props: {
			pieces: {
				type: Number,
				default: 2
			},
			countPrice: {
				type: String,
				default: "0.00"
			},
			isAllChecked: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			__countPrice() {
        if(this.countPrice == 0) {
          return ["0","00"]
        }
				return this.countPrice.split(".")
			}
		},
		data() {
			return {}
		},
		methods:{
			gotopay() {
				this.$emit("gotopay")
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		height: 88rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.pieces-price-unit {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: flex-end;
		margin-bottom: 16rpx;

		.pieces {
			letter-spacing: 0;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
		}

		.unit {
			letter-spacing: 0;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
		}

		.price {
			letter-spacing: 0;
			font-size: 48rpx;
			font-family: Unnamed, Unnamed-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
			vertical-align: bottom;
			line-height: 48rpx;
      flex: 1;
		}

		.flot {
			letter-spacing: 0;
			font-size: 30rpx;
			font-family: Unnamed, Unnamed-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
		}
	}

	.btn {
		margin: 0;
		box-sizing: border-box;
		width: 248rpx;
		height: 88rpx;
		background: linear-gradient(135deg, #53d5cc, #4fc9c9);
		border-radius: 12rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		line-height: 88rpx;
	}
	.btn.disabled {
		opacity: 0.5;
		background: linear-gradient(135deg,#53d5cc, #4fc9c9);
		color: #ffffff;
	}
</style>
