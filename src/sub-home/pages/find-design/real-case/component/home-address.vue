<template>
	<view class="home-address-box">
		<view class="top" @click="openHomeList">
			<view class="tag">
				我家
			</view>
			<view class="detail-address">
				{{`${currentHouse.housingEstate}${currentHouse.address}`}}
			</view>
			<view class="address-icon icon-zhuangxiushouye_fuwuzhankaijiantou">
			</view>
		</view>
		<view class="bottom">
			{{currentHouse.area}}
		</view>
		<image class="img-bg"
			src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/home-address-bg.png?x-oss-process=image/resize,m_lfit,w_686,h_132">

		</image>
	</view>
</template>

<script>
	export default {
		props: {
			currentHouse: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			openHomeList() {
				this.$emit('openHomeList')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-address-box {
		margin-top: 20rpx;
		padding: 24rpx;
		border: 0.5px solid #E8E8E8;
		box-sizing: border-box;
		border-radius: 24rpx;
		// background: url('/static/real-case-design/home-address-bg.png') 100% 100%;
		background-color: #FCFCFC;
		position: relative;

		.top {
			display: flex;
			align-items: center;
			position: relative;
			z-index: 20;

			.tag {
				border: 0.5px solid #CCCCCC;
				box-sizing: border-box;
				border-radius: 4rpx;
				padding: 0 8rpx;
				font-size: 22rpx;
				line-height: 30rpx;
				text-align: center;
				color: #666666;
			}

			.detail-address {
				max-width: 480rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-left: 8rpx;
				font-weight: 500;
				font-size: 32rpx;
				line-height: 44rpx;
				color: #333333;
			}

			.address-icon {
				margin-left: 22rpx;
				font-size: 20rpx;
			}
		}

		.bottom {
			margin-top: 6rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			color: #999999;
		}

		.img-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 686rpx;
			height: 132rpx;
			z-index: 10;
		}
	}
</style>
