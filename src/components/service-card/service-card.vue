<template>
	<view class="wrap" :style="{marginBottom: setting.isLast ? 0 : '24rpx'}">
		<view class="title">
			<view class="title-check">
				<slot name="check"></slot>
				<text class="text">{{setting.title}}</text>
			</view>
			<button v-if="setting.id !== 'actuary'" class="change-service" @click="selectAnother">
				<text>更换</text>
				<image class="ic-triangle-999" src="../../static/images/ic_triangle_999.svg"/>
			</button>
		</view>
		<server-content :setting="setting"></server-content>
	</view>
</template>

<script>
	import ServerContent from "./service-content.vue";
	
	export default {
		name: "ServiceCard",
		components: { ServerContent },
		props: {
			setting: {
				required: true,
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			selectAnother() {
				this.$emit("selectAnother")
			}
		}
	}
</script>

<style scoped lang="scss">
	button {
		padding: 0;
		margin: 0;
	}

	.wrap {
		width: 100%;
		box-sizing: border-box;
		height: 300rpx;
		opacity: 1;
		background: #fff;
		border-radius: 40rpx;
		padding: 32rpx;
	}

	.title-check {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24rpx;

		.text {
			margin-left: 16rpx;
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333;
			line-height: 44rpx;
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 96rpx;
			height: 44rpx;
			background: #f5f6f6;
			border-radius: 12rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #333333;

			text {
				font-size: 22rpx;
				margin-right: 8rpx;
			}

			.ic-triangle-999 {
				width: 8rpx;
				height: 13rpx;
			}
		}
	}


</style>
