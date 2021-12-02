<template>
	<view>
		<view class="cart-header">
			可用优惠券
			<view @click="removeAll" class="icon-xiaochengxu_youshangjiaodankuangguanbi_ic remove-all">
			</view>
		</view>
		<scroll-view :scroll-y="true" class="cart-content">
			<view v-for="(coupon, cartIndex) in couponList" :key="cartIndex" @clickItem="onSelect(coupon)">
				<coupon-item></coupon-item>
			</view>
			<view style="height: 100rpx;">

			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "coupon-dialog",
		props: {
			couponList: [],
			currentId: ''
		},
		data() {
			return {
				selectedId: ''
			};
		},
		watch: {
			currentId: {
				handler(now, pre) {
					this.selectedId = now
				},
				immediate: true
			}
		},
		methods: {
			removeAll() {
				this.$emit('close')
			},
			onSelect(item) {
				this.$emit('onSelect', item)
				this.removeAll()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.close-icon {
		color: #333333;
		font-size: 32rpx;

	}

	.cart-content {
		position: relative;
		width: 686rpx;
		max-height: 792rpx;
		padding: 0 32rpx;
		overflow: auto;
		background-color: #ffffff;
	}

	.cart-header {
		width: 100%;
		height: 104rpx;
		line-height: 104rpx;
		background: #ffffff;
		border-radius: 32rpx 32rpx 0 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #111111;

		.remove-all {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #333;
		}
	}
</style>
