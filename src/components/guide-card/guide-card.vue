<template>
	<view class="guide">
		<image :src="imageUrl" @click="buyNow"></image>
		<!-- <view class="btn" :class="{service: cardType == 'service', actuary: cardType == 'actuary'}" @click="buyNow">立即购买</view> -->
	</view>
</template>

<script>
	export default {
		name: "GuideCard",
		props: {
			cardType: {
				type: String,
				required: true
			},
			imageUrl: {
				type: String,
				required: true
			}
		},
		methods: {
			buyNow() {
				this.$emit("buyNow", this.cardType)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guide {
		position: relative;
		width: 100%;
		height: 160rpx;
		margin-bottom: 24rpx;
		border-radius: 24rpx;

		.btn {
			position: absolute;
			top: 56rpx;
			right: 24rpx;
			width: 132rpx;
			height: 48rpx;
			line-height: 48rpx;
			border-radius: 25rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
		}

		.service.btn {
			background: #ffece9;
			border: 1rpx solid #eb7662;
			color: #eb7662;
		}

		.actuary.btn {
			background: #d0e0fa;
			border: 1rpx solid #4173c8;
			color: #4173c8;
		}

		image {
			width: 702rpx;
			height: 160rpx;
			border-radius: 24rpx;
		}
	}
</style>
