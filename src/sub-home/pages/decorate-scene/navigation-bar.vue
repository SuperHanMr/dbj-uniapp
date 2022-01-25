<template>
	<view class="navigation-bar"
		:style="{paddingTop: Number(paddingTop) + 'px'}">
		<view class="box">
			<view class="navigation-bar-back icon-ic_cancel_white" @click="goBack">
			</view>
			<view class="title">
				<view class="text">
					{{projectName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			projectName: {
				type: String,
				default: ''
			},
			paddingTop: {
				type: String,
				default: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
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
				color: #ffffff;
			}

			.title {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: -68rpx;
				.text{
					color: #FFFFFF;
					font-weight: 500;
					font-size: 32rpx;
					max-width: 400rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
