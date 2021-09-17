<template>
	<view class="uni-calendar">
		<view v-if="!insert&&show" class="mask" :class="{'mask-show':aniMaskShow}" @click="clean"></view>
		<view v-if="insert || show" class="content" :class="{'fixed':!insert,'ani-show':aniMaskShow}">
			<view v-if="!insert" class="header fixed-top">
				<view class="header-btn-box" @click="close">
					<text class="header-text fixed-width">{{cancelText}}</text>
				</view>
				<view class="header-btn-box" @click="confirm">
					<text class="header-text fixed-width">{{okText}}</text>
				</view>
			</view>
			
			
			<view class="box">
				<view v-if="showMonth" class="box-bg">
					<text class="box-bg-text">{{nowDate.month}}</text>
				</view>
				<view class="header_wrap">
					<view class="switch-month">
						<view class="pre-month">
							<image
								@click.stop="pre"
								class="header-btn"
								src="../../sub-home/static/ic_month_pre@2x.png"
								></image>
						</view>
						<picker mode="date" :value="date" fields="month" @change="bindDateChange">
							<text class="header-text">{{ (nowDate.year||'') +'-'+( nowDate.month||'')}}</text>
						</picker>
						<view class="next-month">
							<image
								@click.stop="next"
								class="header-btn"
								src="../../sub-home/static/ic_month_next@2x.png"
								></image>
						</view>
					</view>
					<view class="memo" @click="toMemo">
						<image class="ic_memo" src="../../sub-home/static/ic_memo@2x.png"></image>
						<view class="text">备忘录</view>
					</view>
				</view>
				<view class="weeks">
					<view class="weeks-day">
						<text class="weeks-day-text">{{SUNText}}</text>
					</view>
					<view class="weeks-day">
						<text class="weeks-day-text">{{monText}}</text>
					</view>
					<view class="weeks-day">
						<text class="weeks-day-text">{{TUEText}}</text>
					</view>
					<view class="weeks-day">
						<text class="weeks-day-text">{{WEDText}}</text>
					</view>
					<view class="weeks-day">
						<text class="weeks-day-text">{{THUText}}</text>
					</view>
					<view class="weeks-day">
						<text class="weeks-day-text">{{FRIText}}</text>
					</view>
					<view class="weeks-day">
						<text class="weeks-day-text">{{SATText}}</text>
					</view>
				</view>
				<view class="weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
					<view class="weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
						<calendar-item class="item-hook" :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from './util.js';
	import calendarItem from './calendar-item.vue'
	import {
	initVueI18n
	} from '@dcloudio/uni-i18n'
	import messages from './i18n/index.js'
	const {	t	} = initVueI18n(messages)
	/**
	 * Calendar 日历
	 * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=56
	 * @property {String} date 自定义当前时间，默认为今天
	 * @property {Boolean} lunar 显示农历
	 * @property {String} startDate 日期选择范围-开始日期
	 * @property {String} endDate 日期选择范围-结束日期
	 * @property {Boolean} range 范围选择
	 * @property {Boolean} insert = [true|false] 插入模式,默认为false
	 * 	@value true 弹窗模式
	 * 	@value false 插入模式
	 * @property {Boolean} clearDate = [true|false] 弹窗模式是否清空上次选择内容
	 * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
	 * @property {Boolean} showMonth 是否选择月份为背景
	 * @event {Function} change 日期改变，`insert :ture` 时生效
	 * @event {Function} confirm 确认选择`insert :false` 时生效
	 * @event {Function} monthSwitch 切换月份时触发
	 * @example <uni-calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
	 */
	export default {
		components: {
			calendarItem
		},
		emits:['close','confirm','change','monthSwitch'],
		props: {
			date: {
				type: String,
				default: ''
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			range: {
				type: Boolean,
				default: false
			},
			insert: {
				type: Boolean,
				default: true
			},
			showMonth: {
				type: Boolean,
				default: true
			},
			clearDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				weeks: [],
				calendar: {},
				nowDate: '',
				aniMaskShow: false
			}
		},
		computed:{
			/**
			 * for i18n
			 */

			okText() {
				return t("uni-calender.ok")
			},
			cancelText() {
				return t("uni-calender.cancel")
			},
			todayText() {
				return t("uni-calender.today")
			},
			monText() {
				return t("uni-calender.MON")
			},
			TUEText() {
				return t("uni-calender.TUE")
			},
			WEDText() {
				return t("uni-calender.WED")
			},
			THUText() {
				return t("uni-calender.THU")
			},
			FRIText() {
				return t("uni-calender.FRI")
			},
			SATText() {
				return t("uni-calender.SAT")
			},
			SUNText() {
				return t("uni-calender.SUN")
			},
		},
		watch: {
			date(newVal) {
				// this.cale.setDate(newVal)
				this.init(newVal)
			},
			startDate(val){
				this.cale.resetSatrtDate(val)
			},
			endDate(val){
				this.cale.resetEndDate(val)
			},
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.weeks = this.cale.weeks
			}
		},
		created() {
			// 获取日历方法实例
			this.cale = new Calendar({
				// date: new Date(),
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			// 选中某一天
			// this.cale.setDate(this.date)
			this.init(this.date)
			// this.setDay
		},
		methods: {
			toMemo(){
				uni.navigateTo({
					url: "/sub-home/pages/decorate-scene/memo"
				})
			},
			// 取消穿透
			clean() {},
			bindDateChange(e) {
				const value = e.detail.value + '-1'
				console.log(this.cale.getDate(value));
				this.init(value)
			},
			/**
			 * 初始化日期显示
			 * @param {Object} date
			 */
			init(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.calendar = this.cale.getInfo(date)
			},
			/**
			 * 打开日历弹窗
			 */
			open() {
				// 弹窗模式并且清理数据
				if (this.clearDate && !this.insert) {
					this.cale.cleanMultipleStatus()
					// this.cale.setDate(this.date)
					this.init(this.date)
				}
				this.show = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.aniMaskShow = true
					}, 50)
				})
			},
			/**
			 * 关闭日历弹窗
			 */
			close() {
				this.aniMaskShow = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.show = false
						this.$emit('close')
					}, 300)
				})
			},
			/**
			 * 确认按钮
			 */
			confirm() {
				this.setEmit('confirm')
				this.close()
			},
			/**
			 * 变化触发
			 */
			change() {
				if (!this.insert) return
				this.setEmit('change')
			},
			/**
			 * 选择月份触发
			 */
			monthSwitch() {
				let {
					year,
					month
				} = this.nowDate
				this.$emit('monthSwitch', {
					year,
					month: Number(month)
				})
			},
			/**
			 * 派发事件
			 * @param {Object} name
			 */
			setEmit(name) {
				let {
					year,
					month,
					date,
					fullDate,
					lunar,
					extraInfo
				} = this.calendar
				this.$emit(name, {
					range: this.cale.multipleStatus,
					year,
					month,
					date,
					fulldate: fullDate,
					lunar,
					extraInfo: extraInfo || {}
				})
			},
			/**
			 * 选择天触发
			 * @param {Object} weeks
			 */
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
				this.weeks = this.cale.weeks
				this.change()
			},
			/**
			 * 回到今天
			 */
			backtoday() {
				console.log(this.cale.getDate(new Date()).fullDate);
				let date = this.cale.getDate(new Date()).fullDate
				// this.cale.setDate(date)
				this.init(date)
				this.change()
			},
			/**
			 * 上个月
			 */
			pre() {
				const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
				this.setDate(preDate)
				this.monthSwitch()

			},
			/**
			 * 下个月
			 */
			next() {
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
				this.setDate(nextDate)
				this.monthSwitch()
			},
			/**
			 * 设置日期
			 * @param {Object} date
			 */
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.mask-show {
		opacity: 1
	}

	.fixed {
		position: fixed;
		bottom: calc(var(--window-bottom));
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.ani-show {
		transform: translateY(0);
	}

	.content {
		width: 750rpx;
		height: 1624rpx;
		background-color: #f2f5f8;
	}
	.header_wrap{
		width: 750rpx;
		height: 96rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.switch-month {
		width: 262rpx;
		height: 48rpx;
		margin: 24rpx 32rpx;
		background: #ffffff;
		opacity: 0.62;
		border-radius: 26rpx;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.switch-month view{
		width: 32rpx;
		height: 32rpx;
		margin: 8rpx;
		background: #f5f6f6;
		border-radius: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.switch-month view.pre-month{
		margin-right: 24rpx;
	}
	.switch-month view.next-month{
		margin-left: 24rpx;
	}
	.memo{
		width: 158rpx;
		height: 48rpx;
		margin: 24rpx 32rpx;
		opacity: 0.62;
		background: #ffffff;
		border-radius: 26rpx;
		display: flex;
	}
	.memo .ic_memo{
		width: 24rpx;
		height: 26rpx;
		margin: 12rpx 8rpx 10rpx 24rpx;
		display: block;
	}
	.memo .text{
		width: 78rpx;
		height: 36rpx;
		margin: 6rpx 0;
		font-size: 26rpx;
		color: #333333;
	}
	.fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.fixed-width {
		width: 50px;
		// padding: 0 15px;
	}

	.header-text {
		text-align: center;
		width: 100px;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
	}

	.header-btn {
		width: 8rpx;
		height: 14rpx;
		display: block;
	}

	.weeks {
		margin: 0 32rpx;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.weeks-item {
		width: 98rpx;
		height: 88rpx;
		flex: 1;
	}
	
	.weeks-item .item-hook{
		width: 98rpx;
		height: 88rpx;
	}
	
	.weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.weeks-day-text {
		font-size: 14px;
	}

	.box {
		position: relative;
	}

	.box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
</style>
