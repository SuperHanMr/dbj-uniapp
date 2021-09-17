<template>
	<view class="weeks-box" :class="{
		'disable':weeks.disable,
		'isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
		'checked':(calendar.fullDate === weeks.fullDate && !weeks.isDay) ,
		'before-checked':weeks.beforeMultiple,
		'multiple': weeks.multiple,
		'after-checked':weeks.afterMultiple,
		}"
	 @click="choiceDate(weeks)">
		<view class="weeks-box-item">
			<text v-if="selected&&weeks.extraInfo" class="weeks-box-circle"></text>
			<text class="weeks-box-text" :class="{
				'isDay-text': weeks.isDay,
				'isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'before-checked':weeks.beforeMultiple,
				'multiple': weeks.multiple,
				'after-checked':weeks.afterMultiple,
				'disable':weeks.disable,
				}">{{weeks.date}}</text>
			<text v-if="!lunar&&!weeks.extraInfo && weeks.isDay" class="weeks-lunar-text" :class="{
				'isDay-text':weeks.isDay,
				'isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'before-checked':weeks.beforeMultiple,
				'multiple': weeks.multiple,
				'after-checked':weeks.afterMultiple,
				}">{{todayText}}</text>
			<text v-if="lunar&&!weeks.extraInfo" class="weeks-lunar-text" :class="{
				'isDay-text':weeks.isDay,
				'isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'before-checked':weeks.beforeMultiple,
				'multiple': weeks.multiple,
				'after-checked':weeks.afterMultiple,
				'disable':weeks.disable,
				}">{{weeks.isDay ? todayText : (weeks.lunar.IDayCn === '初一'?weeks.lunar.IMonthCn:weeks.lunar.IDayCn)}}</text>
			<text v-if="weeks.extraInfo&&weeks.extraInfo.info" class="weeks-lunar-text" :class="{
				'extra':weeks.extraInfo.info,
				'isDay-text':weeks.isDay,
				'isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'before-checked':weeks.beforeMultiple,
				'multiple': weeks.multiple,
				'after-checked':weeks.afterMultiple,
				'disable':weeks.disable,
				}">{{weeks.extraInfo.info}}</text>
		</view>
	</view>
</template>

<script>
	import {
	initVueI18n
	} from '@dcloudio/uni-i18n'
	import messages from './i18n/index.js'
	const {	t	} = initVueI18n(messages)
	export default {
		emits:['change'],
		props: {
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			todayText() {
				return t("uni-calender.today")
			},
		},
		methods: {
			choiceDate(weeks) {
				this.$emit('change', weeks)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.weeks-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.weeks-box-text {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.weeks-lunar-text {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}

	.weeks-box-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 98rpx;
		height: 88rpx;
	}

	.weeks-box-circle {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background-color: $uni-color-error;

	}

	.disable {
		background-color: rgba(249, 249, 249, $uni-opacity-disabled);
		color: $uni-text-color-disable;
	}

	.isDay-text {
		color: $uni-color-primary;
	}

	.isDay {
		width: 98rpx;
		text-align: center;
		line-height: 44rpx;
		background-color: #00c2b8;
		opacity: 0.8;
		color: #fff;
	}

	.extra {
		color: $uni-color-error;
		opacity: 0.8;
	}

	.checked {
		background-color: $uni-color-primary;
		color: #fff;
		opacity: 0.8;
	}

	.multiple {
		background-color: $uni-color-primary;
		color: #fff;
		opacity: 0.8;
	}
	.before-checked {
		background-color: #ff5a5f;
		color: #fff;
	}
	.after-checked {
		background-color: #ff5a5f;
		color: #fff;
	}
</style>
