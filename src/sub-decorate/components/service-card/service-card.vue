<template>
	<view class="wrap" :style="{marginBottom: setting.isLast ? 0 : '24rpx'}">
		<view class="title">
			<view class="title-check">
				<slot name="check"></slot>
				<text class="text">{{setting.title}}{{setting.level | filterLevel(setting.cardtype)}}</text>
			</view>
			<view class="change-service" v-if="setting.cardtype == 'design'" @click="changeLevel">更换等级</view>
			<view class="change-service" @click="selectAnother">
				<text>更换</text>
				<image class="ic-triangle-999" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle_999.svg" />
			</view>
		</view>
		<server-content :content="setting"></server-content>
	</view>
</template>

<script>
	import ServerContent from "./service-content.vue";

	export default {
		name: "ServiceCard",
		components: {
			ServerContent
		},
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
			},
			changeLevel() {
				this.$emit("changeLevel")
			}
		},
		filters: {
			filterLevel(value, cardtype) {
        if (cardtype !== "design") return ""
				let res = ""
				switch (value) {
					case 1:
						res = "(中级)"
						break;
					case 2:
						res = "(高级)"
						break;
					case 3:
						res = "(特级)"
						break;
					case 4:
						res = "(钻石)"
						break;
					default:
						res = "(中级)"
						break;
				}
				return res;
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
		min-height: 300rpx;
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

		.change-service {
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
			border-radius: 12rpx;
			border: 0 solid #f5f6f6;
			outline: none;
			color: #333333;
			font-size: 22rpx;
			box-sizing: border-box;

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
