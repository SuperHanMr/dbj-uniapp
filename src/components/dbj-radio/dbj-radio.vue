<template>
	<view class="daj-radio" :class="{'checked': checked}" @click="change"
		:style="{width: width, height: width , borderRadius: borderRadius}">
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: String,
				default: "32rpx",
			},
			borderRadius: {
				type: String,
				default: "50%",
			},
			checked: {
				type: Boolean,
				default: false,
			},
			value: {
				type: String,
				default: ""
			}
		},
		methods: {
			change() {
				if (!this.checked) {
					this.$emit("change", {value: this.value, checked: true})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.daj-radio {
		transition: all 0.2s;
		border: 1rpx solid #c8c8c8;
		box-sizing: border-box;
	}

	.checked {
		transition: all 0.2s;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border: 2rpx solid #01c2c3;

		&:after {
			content: " ";
			width: 56%;
			height: 18rpx;
			border-radius: 56%;
			background: #01c2c3;
		}
	}
</style>
