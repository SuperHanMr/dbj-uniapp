<template>
	<view class="uni-numbox">
		<view v-if="!onlyShowAdd||showInput" @click="_calcValue('minus')" class="uni-numbox__minus uni-cursor-point">
			<text class="uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue <= min || disabled }">-</text>
		</view>
		<input v-if="!onlyShowAdd||showInput" :disabled="disabled" @focus="_onFocus" @blur="_onBlur"
			class="uni-numbox__value" type="number" v-model="inputValue" />
		<view @click="_calcValue('plus')" class="uni-numbox__plus uni-cursor-point">
			<text class="uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }">+</text>
		</view>
	</view>
</template>
<script>
	/**
	 * NumberBox 数字输入框
	 * @description 带加减按钮的数字输入框
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=31
	 * @property {Number} value 输入框当前值
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 每次点击改变的间隔大小
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
	 */

	export default {
		name: "UniNumberBox",
		emits: ['change', 'input', 'update:modelValue', 'blur', 'focus'],
		props: {
			value: {
				type: [Number, String],
				default: 0
			},
			modelValue: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 10000
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			onlyShowAdd: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: 0,
				focusing: false
			};
		},
		watch: {
			value(val, pre) {

				this.inputValue = +val;
			},
			modelValue(val) {
				this.inputValue = +val;
			},
		},
		computed:{
			showInput(){
				if(this.focusing){
					return true
				}else if(this.inputValue==0){
					return false
				}else{
					return true
				}
				
			}
		},
		created() {
			if (this.value === 1) {
				this.inputValue = +this.modelValue;
			}
			if (this.modelValue === 1) {
				this.inputValue = +this.value;
			}
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						return;
					}
					if (value > (this.max * scale)) {
						value = this.max * scale
					}
				}

				if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}

				this.inputValue = (value / scale).toFixed(String(scale).length - 1);
				this.$emit("change", +this.inputValue);
				// // TODO vue2 兼容
				// this.$emit("input", +this.inputValue);
				// // TODO vue3 兼容
				// this.$emit("update:modelValue", +this.inputValue);
			},
			_getDecimalScale() {

				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, String(this.step).split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value || isNaN(value)) {
					this.inputValue = this.max;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				const scale = this._getDecimalScale();
				this.inputValue = value.toFixed(String(scale).length - 1);
				if (this.inputValue > this.max) {
					this.inputValue = this.max;
				}
				if (this.inputValue < this.min) {
					this.inputValue = this.min
				}

				this.$emit("change", +this.inputValue);
				
					this.focusing =false
			},
			_onFocus(event) {
				this.focusing = true
				this.$emit('focus', event)
			}
		}
	};
</script>
<style lang="scss" scoped>
	$box-height: 48rpx;
	$box-line-height: 48rpx;
	$box-width: 92rpx;

	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: $box-height;
		line-height: $box-height;
		width: 200rpx;
		justify-content: flex-end;
	}

	.uni-cursor-point {
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-numbox__value {
		width: 92rpx;
		height: 48rpx;
		text-align: center;
		font-size: 24rpx;
		border-left-width: 0;
		border-right-width: 0;
		background: #f2f2f2;
	}

	.uni-numbox__minus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 48rpx;
		height: 48rpx;
		// line-height: $box-line-height;
		// text-align: center;
		font-size: 24rpx;
		color: $uni-text-color;
		background: #fafafa;
		border-radius: 4rpx 0rpx 0rpx 4rpx;
		margin-right: 4rpx;
	}

	.uni-numbox__plus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 48rpx;
		height: 48rpx;
		background: #fafafa;
		border-right-width: 0;
		border-radius: 0rpx 4rpx 4rpx 0rpx;
		margin-left: 4rpx;
	}

	.uni-numbox--text {
		font-size: 24rpx;
		color: $uni-text-color;
	}

	.uni-numbox--disabled {
		color: $uni-text-color-disable;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}
</style>
