<template>
	<view class="bottom-btn" :style="{paddingBottom:systemBottom,backgroundColor:bgcolor}">
		<view v-if="showDefaultBtn"  :class="{'opacity5':disable,'opacity10':!disable}" class="add-btn" @click="submit">{{btnContent}}</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "bottom-btn",
		props: {
			btnContent: {
				type: String,
				default: '提交'
			},
			bgcolor: {
				type: String,
				default: "#fff"
			},
			showDefaultBtn: {
				type: Boolean,
				default: true
			},

			disable: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				systemBottom: "",
				systemHeight: "",
			};
		},
		mounted(e) {
			this.systemBottom = 20 + "rpx";
		},
		methods: {
			submit() {
				this.$emit("submit");
			},
		},
	};
</script>

<style lang="scss">
	.opacity5 {

		opacity: 0.5;
	}

	.opacity10 {

		opacity: 1;
	}

	.bottom-btn {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 136rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		z-index: 200;

		.add-btn {
			// margin-top: 20rpx;
			height: 88rpx;
			background: linear-gradient(135deg, #00ccbe, #00c2bf);
			border-radius: 12rpx;
			width: 686rpx;
			line-height: 88rpx;
			text-align: center;
			color: #ffffff;
			font-size: 32rpx;
		}
	}
</style>
