<template>
	<view class="btn-radio" :class="{'checked': checked}" @click="change">
		{{checkedStatus}}
	</view>
</template>

<script>
	export default {
		props: {
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
      checkedStatus() {
        return this.checked ? "已选" : "选择"
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

<style scoped>
	.btn-radio {
		transition: all 0.2s;
		box-sizing: border-box;
    width: 100rpx;
    height: 50rpx;
    line-height: 48rpx;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #FA4D32;
    border: 2rpx solid #FA4D32;
    border-radius: 8rpx;
	}

	.btn-radio.checked {
		color: #999999;
    border-color: #cbcccc;
	}
</style>
