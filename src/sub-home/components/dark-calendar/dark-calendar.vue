<template>
  <view class="sign-calendar">
    <view class="top-bar">
			<view class="switch-month">
				<view class="pre-month" @click="turning('prev')">
					<image
						class="header-btn"
						src="../../static/ic_month_pre@2x.png"
						></image>
				</view>
				<view class="current-month">{{ y }}-{{ m+1 < 10? '0'+(m+1) : m+1 }}</view>
				<view class="next-month" @click="turning('next')">
					<image
						class="header-btn"
						src="../../static/ic_month_next@2x.png"
						></image>
				</view>
			</view>
			<view class="memo" @click="toMemo" v-if="showMemo">
				<image class="ic_memo" src="../../static/ic_memo@2x.png"></image>
				<view class="text">备忘录</view>
			</view>
    </view>

    <view class="week">
      <view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
    </view>

    <view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
      <view :style="{ top: positionTop + 'rpx' }" class="days">
        <view class="item" v-for="(item, index) in dates" :key="index">
					<view class="today-text" @click="todayC(`${item.year}-${item.month}-${item.date}`)" :class="{'checked': isChecked}" v-if="isToday(item.year, item.month, item.date)">今</view>
          <view class="day" v-else @click="selectOne(item, $event)" :class="{ choose: choose == `${item.year}-${item.month}-${item.date}`, nolm: !item.lm }">{{ item.date }}</view>
          <view class="sign" v-if="isSigned(item.year, item.month , item.date)"></view>
        </view>
      </view>
    </view>
		<view class="weektoggel" v-if="collapsible" @click="trgWeek()"></view>
    
  </view>
</template>

<script>
	import {getSigneddates,getDynamics} from "../../../api/real-case.js"
	export default {
	  name: 'dark-calendar',
	  props: {
	    // 第一列星期几
	    weekstart: {
	      type: Number,
	      default: 7
	    },
	    // 已经签到的日期
	    signeddates: {
	      type: Array,
	      default: null
	    },
	    // 是否展开
	    open: {
	      type: Boolean,
	      default: true
	    },
			collapsible: {
				type: Boolean,
				default: true
			},
			projectId: {
				type: Number,
			},
			showMemo: {
				type: Boolean,
			}
	  },
	  data() {
	    return {
	      text: {
	        year: '年',
	        month: '月',
	        week: ['一', '二', '三', '四', '五', '六', '日'],
	        today: '今'
	      },
	      y: new Date().getFullYear(), // 年
	      m: new Date().getMonth(), // 月
	      dates: [], // 当前月日期集合
	      positionTop: 0,
	      monthOpen: true,
	      choose: '',
				isChecked: true
	    }
	  },
	  created() {
	    this.dates = this.monthDay(this.y, this.m)
	    !this.open && this.trgWeek()
	  },
	  mounted() {
	    let date = new Date()
	    let y = date.getFullYear()
	    let mon = date.getMonth()+1
			let m = mon < 10? '0'+mon : mon
	    let d = date.getDate()
	    this.choose = `${y}-${m}-${d}`
			console.log(this.choose)
			console.log(this.signeddates,'dadian')
	  },
	  computed: {
	    // 顶部星期栏目
	    weekDay() {
	      return this.text.week.slice(this.weekstart - 1).concat(this.text.week.slice(0, this.weekstart - 1))
	    },
	    height() {
	      return (this.dates.length / 7) * 90 + 'rpx'
	    }
	  },
	  methods: {
			todayC(today){
				this.isChecked = !this.isChecked
				this.choose = today
			},
			toMemo(){
				uni.navigateTo({
					url: `/sub-home/pages/decorate-scene/memo?projectId=${this.projectId}`
				})
			},
	    // 获取当前月份天数
	    monthDay(y, m) {
	      let firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天星期几
	      let lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
	      let lastDayOfLastMonth = new Date(y, m, 0).getDate() // 上一月的最后一天
	      let dates = [] // 所有渲染日历
	      let weekstart = this.weekstart == 7 ? 0 : this.weekstart // 方便进行日期计算，默认星期从0开始
	      let startDay = (() => {
	        // 周初有几天是上个月的
	        if (firstDayOfMonth == weekstart) {
	          return 0
	        } else if (firstDayOfMonth > weekstart) {
	          return firstDayOfMonth - weekstart
	        } else {
	          return 7 - weekstart + firstDayOfMonth
	        }
	      })()
	      let endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
	      for (let i = 1; i <= startDay; i++) {
	        dates.push({
	          date: lastDayOfLastMonth - startDay + i,
	          day: weekstart + i - 1 || 7,
	          month: m - 1 >= 0 ? m - 1 : 12,
	          year: m - 1 >= 0 ? y : y - 1
	        })
	      }
	      for (let j = 1; j <= lastDateOfMonth; j++) {
	        dates.push({
	          date: j,
	          day: (j % 7) + firstDayOfMonth - 1 || 7,
	          month: m,
	          year: y,
	          lm: true
	        })
	      }
	      for (let k = 1; k <= endDay; k++) {
	        dates.push({
	          date: k,
	          day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
	          month: m + 1 <= 11 ? m + 1 : 0,
	          year: m + 1 <= 11 ? y : y + 1
	        })
	      }
				dates.map(item => {
					if(item.month+1 < 10){
						item.month = '0'+(item.month+1)
					}else{
						item.month +=1
					}
					return item
				})
				console.log(dates)
	      return dates
	    },
	    // 已经签到处理
	    isSigned(y, m, d) {
	      let flag = false
				let day = `${y}-${m}-${d}`
	      for (let i = 0; i < this.signeddates.length; i++) {
	        if (this.signeddates[i].day == day) {
	          flag = true
	          break
	        }
	      }
	      return flag
	    },
	    isToday(y, m, d) {
	      let year = new Date().getFullYear()
				let mon = new Date().getMonth()+1
				let month = mon < 10 ? '0'+mon : mon
				let day = new Date().getDate()
	      return y == year && m == month && d == day
	    },
	    // 切换成周模式
	    trgWeek() {
	      this.monthOpen = !this.monthOpen
	      if (this.monthOpen) {
	        this.positionTop = 0
	      } else {
	        let index = -1
	        this.dates.forEach((i, x) => {
	          this.isToday(i.year, i.month, i.date) && (index = x)
	        })
	        this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80
	      }
	    },
	    // 点击回调
	    selectOne(i, event) {
				this.isChecked = false
	      let date = `${i.year}-${i.month}-${i.date}`
	      let selectD = new Date(date)
				console.log(date,selectD.getMonth(),this.m)
	      if (selectD.getMonth() != this.m) {
	        console.log('不在可选范围内')
	        return false
	      }
	      this.choose = date
	      this.$emit('filterByDate', date)
	    },
	    // 上个月，下个月
	    turning(_action) {
	      if (_action === 'next') {
	        if (this.m + 1 == 12) {
	          this.m = 0
	          this.y = this.y + 1
	        } else {
	          this.m = this.m + 1
	        }
	      } else {
	        if (this.m + 1 == 1) {
	          this.m = 11
	          this.y = this.y - 1
	        } else {
	          this.m = this.m - 1
	        }
	      }
	
	      this.dates = this.monthDay(this.y, this.m)
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	.sign-calendar {
		width: 750rpx;
		height: fit-content;
	  background-color: #f2f5f8;
		position: relative;
	}
	.top-bar{
		width: 750rpx;
		height: 96rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.switch-month {
		width: 240rpx;
		height: 48rpx;
		margin: 24rpx 32rpx;
		background: #ffffff;
		border-radius: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.switch-month .current-month{
		width: 114rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}
	.switch-month .pre-month,.switch-month .next-month{
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
	.header-btn {
		width: 8rpx;
		height: 14rpx;
		display: block;
	}
	.memo{
		width: 158rpx;
		height: 48rpx;
		margin: 24rpx 32rpx;
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
	
  .week {
    display: flex;
    align-items: center;
		width: 686rpx;
    height: 88rpx;
		margin: 0 32rpx;
  }
	.week-day{
		width: 98rpx;
		height: 88rpx;
		font-size: 24rpx;
		color: #9fa5b4;
		text-align: center;
		line-height: 88rpx;
	}
  .content {
		width: 750rpx;
		height: 452rpx;
    transition: height 0.4s ease;
		position: relative;
  }
	.days {
		width: 686rpx;
		height: 452rpx;
		margin: 0 32rpx;
		padding-bottom: 10rpx;
	  transition: top 0.3s;
	  display: flex;
	  align-items: center;
	  flex-wrap: wrap;
	}
	.item {
		width: 98rpx;
		height: 88rpx;
	  line-height: 88rpx;
	  text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.day {
	  width: 52rpx;
	  height: 52rpx;
	  line-height: 52rpx;
		text-align: center;
	  border-radius: 20rpx;
		
	  &.choose {
			width: 50rpx;
			height: 50rpx;
			line-height: 50rpx;
			border: 2rpx solid #00bfb6;
	  }
		
	  &.nolm {
	    color: #333;
	    opacity: 0.3;
	  }
	}
		
	.sign {
	  width: 8rpx;
	  height: 8rpx;
	  background: #00C2B8;
	  border-radius: 50%;
	  position: absolute;
	  left: 50%;
	  margin-left: -4rpx;
	  bottom: 6rpx;
	}
		
	.today-text {
		width: 52rpx;
		height: 52rpx;
		line-height: 52rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		background: #9fa5b4;
		border-radius: 20rpx;
		&.checked{
			background: #00c2b8;
		}
	}
  .hide {
    height: 80rpx !important;
  }
  .weektoggel {
    width: 64rpx;
    height: 8rpx;
    margin: 0 343rpx;
    background: #e7e8e8;
    border-radius: 4rpx;
		position: absolute;
		left: 0;
		bottom: -36rpx;
  }
</style>
