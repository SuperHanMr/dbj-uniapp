<template>
	<view class="navigation-bar"
		:style="{paddingTop: Number(paddingTop) + 'px', backgroundColor: !showScreen ? '#FFFFFF' : 'none'}">
		<view class="box">
			<view class="navigation-bar-back icon-ic_cancel_white" @click="goBack">
			</view>
			<view class="title" @click="openHomeList">
				<view class="text">
					{{(!showScreen && currentHouse.id) ? `${currentHouse.housingEstate}${currentHouse.address}` : '推荐案例'}}
				</view>
				<view class="address-icon icon-zhuangxiushouye_fuwuzhankaijiantou"
					v-if="(!showScreen && currentHouse.id)">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentHouse: {
				type: Object,
				default: {}
			},
			showScreen: {
				type: Boolean,
				default: true
			},
			paddingTop: {
				type: String,
				default: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			openHomeList() {
				if (this.$props.showScreen) return;
				this.$emit('openHomeList')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navigation-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		// background-color: #ffffff;
		z-index: 10;

		.box {
			position: relative;
			display: flex;
			align-items: center;
			width: 100%;

			.navigation-bar-back {
				margin-left: 34rpx;
				font-size: 34rpx;
				position: relative;
				z-index: 20;
			}

			.title {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: -68rpx;

				.text {
					max-width: 325rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: 500;
					font-size: 32rpx;
					color: #111111;
					margin-right: 14rpx;
				}

				.address-icon {
					font-size: 20rpx;
				}
			}
		}
	}
</style>
