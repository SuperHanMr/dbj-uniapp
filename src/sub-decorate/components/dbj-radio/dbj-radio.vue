<template>
	<view class="daj-radio" :class="{'checked': checked}" @click="change"
		:style="{width: width, height: width , borderRadius: borderRadius}">
		<view class="after" v-if="checked" :style="{ width: width2, height: width2 }"></view>
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
		computed: {
			width2() {
				return parseInt(this.width) / 2 + 'rpx'
			}
		},
		methods: {
			change() {
				if (!this.checked) {
					this.$emit("change", {
						value: this.value,
						checked: true
					})
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
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		border: 2rpx solid #01c2c3;

		.after {
			box-sizing: border-box;
			// width: 56%;
			// height: 56%;
			border-radius: 50%;
			background: #01c2c3;
			// position: absolute;
			// top: 50%;
			// left: 50%;
			// transform: translate(-50%, -50%);
		}
	}
</style>
