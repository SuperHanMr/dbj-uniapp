<template>
    <view>
      <uni-popup ref="datePicker" type="bottom">
        <view class="uni-padding-wrap">
            <view @click="cancel">取消</view>
            <view @click="confirm">确定</view>
            <!-- <view class="uni-title">日期：{{year}}年{{month}}月{{day}}日</view> -->
        </view>
        <picker-view v-if="visible" :indicator-class='indicatorClass' :value="pickTime" @change="bindChange" class="picker-view">
            <picker-view-column>
                <view class="item" v-for="(item,index) in yearArr" :key="index">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in monthArr" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in dayArr" :key="index">{{item}}日</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in hoursArr" :key="index">{{item}}时</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in minutesArr" :key="index">{{item}}分</view>
            </picker-view-column>
        </picker-view>
      </uni-popup>
    </view>
</template>
<script>
    
    export default {
        data() {
          let yearArr = []
          for (let i = new Date().getFullYear(); i <= new Date().getFullYear() + 10; i++) {
              yearArr.push(i)
          }
            return {
                title: 'picker-view',
                yearArr: [],
                monthArr: [],
                dayArr: [],
                hoursArr: [],
                minutesArr: [],
                pickTime: [0, 0, 0, 0, 0],
                visible: true,
                timer: null,
                indicatorClass: 'date-item'
            }
        },
        created() {
          let currentDate = new Date() 
          let currentYear = currentDate.getFullYear()
          let currentMonth = currentDate.getMonth() + 1
          let currentDay = currentDate.getDate()
          let currentHours = currentDate.getHours()
          let currentMinutes = currentDate.getMinutes()
          for (let i = currentYear; i <= currentYear + 10; i++) {
              this.yearArr.push(i)
          }
          for (let i = currentMonth; i <= 12; i++) {
              this.monthArr.push(i)
          }
          let currentMonthDay = this.getCurrentMonthDay(currentYear, currentMonth + 1, 0)
          for (let i = currentDay; i <= currentMonthDay; i++) {
              this.dayArr.push(i)
          }
          for (let i = currentHours; i <= 23; i++) {
              this.hoursArr.push(i)
          }
          for (let i = currentMinutes; i <= 59; i++) {
              this.minutesArr.push(i)
          }
        },
        methods: {
          showDatePicker(){
            this.$refs.datePicker.open()
          },
          cancel(){
            this.$refs.datePicker.close()
          },
          confirm() {
            let time = [this.yearArr[this.pickTime[0]], this.monthArr[this.pickTime[1]],
                        this.dayArr[this.pickTime[2]], this.hoursArr[this.pickTime[3]], 
                        this.minutesArr[this.pickTime[4]]]
             this.$emit('getTime', time)
             this.$refs.datePicker.close()
          },
            renewDate(pickVal) {
              // 每次点击picker，收集年月日时分变化的新数据以及选中日期对应的新索引
              let currentDate = new Date()
              let currentYear = currentDate.getFullYear()
              let currentMonth = currentDate.getMonth() + 1
              let currentDay = currentDate.getDate()
              let currentHours = currentDate.getHours()
              let currentMinutes = currentDate.getMinutes()
              
              let newYearIndex = pickVal[0]
              let newMonthIndex = 0
              let newDayIndex = 0
              let newHoursIndex = 0
              let newMinutesIndex = 0
              
              let newMonthArr = []
              let newDayArr = []
              let newHoursArr = []
              let newMinutesArr = []
              // 更新月份数据
              if(this.yearArr[newYearIndex] !== currentYear) {
                newMonthArr = [1,2,3,4,5,6,7,8,9,10,11,12]
                newMonthIndex = newMonthArr.findIndex((v, i) => {
                    return this.monthArr[pickVal[1]]  === v
                })
              }else if(this.yearArr[newYearIndex] === currentYear) {
                for (let i = currentMonth; i <= 12; i++) {
                    newMonthArr.push(i)
                }
                if(this.monthArr[pickVal[1]] < currentMonth) {
                  newMonthIndex = 0
                }else {
                  newMonthIndex = newMonthArr.findIndex((v, i) => {
                      return this.monthArr[pickVal[1]]  === v
                  })
                }
              }
              // 更新日份数据
              if(!(newMonthArr[newMonthIndex] === currentMonth && this.yearArr[newYearIndex] === currentYear)) {
                let pickMonthDay = this.getCurrentMonthDay(this.yearArr[newYearIndex], newMonthArr[newMonthIndex] + 1, 0)
                for (let i = 1; i <= pickMonthDay; i++) {
                    newDayArr.push(i)
                }
                newDayIndex = newDayArr.findIndex((v, i) => {
                    return this.dayArr[pickVal[2]]  === v
                })
              } else if(newMonthArr[newMonthIndex] === currentMonth && this.yearArr[newYearIndex] === currentYear) {
                let currentMonthDay = this.getCurrentMonthDay(currentYear, currentMonth + 1, 0)
                for (let i = currentDay; i <= currentMonthDay; i++) {
                    newDayArr.push(i)
                }
                
                if(this.dayArr[pickVal[2]] < currentDay) {
                  newDayIndex = 0
                }else {
                  newDayIndex = newDayArr.findIndex((v, i) => {
                      return this.dayArr[pickVal[2]]  === v
                  })
              }}
              // 更新小时数据
              if(!(newDayArr[newDayIndex] === currentDay && newMonthArr[newMonthIndex] === currentMonth && this.yearArr[newYearIndex] === currentYear)) {
                for (let i = 0; i <= 23; i++) {
                    newHoursArr.push(i)
                }
                newHoursIndex = newHoursArr.findIndex((v, i) => {
                    return this.hoursArr[pickVal[3]]  === v
                })
              } 
              else if(newDayArr[newDayIndex] === currentDay && newMonthArr[newMonthIndex] === currentMonth && this.yearArr[newYearIndex] === currentYear) {
                for (let i = currentHours; i <= 23; i++) {
                    newHoursArr.push(i)
                }
                if(this.hoursArr[pickVal[3]] < currentHours) {
                  newHoursIndex = 0
                }else {
                  newHoursIndex = newHoursArr.findIndex((v, i) => {
                      return this.hoursArr[pickVal[3]]  === v
                  })
                }
              }
              // 更新分钟数据
              // 更新小时数据
              if(!(newHoursArr[newHoursIndex] === currentHours && newDayArr[newDayIndex] === currentDay && newMonthArr[newMonthIndex] === currentMonth && this.yearArr[newYearIndex] === currentYear)) {
                for (let i = 0; i <= 60; i++) {
                    newMinutesArr.push(i)
                }
                newMinutesIndex = newMinutesArr.findIndex((v, i) => {
                    return this.minutesArr[pickVal[4]]  === v
                })
              } 
              else if(newHoursArr[newHoursIndex] === currentHours && newDayArr[newDayIndex] === currentDay && newMonthArr[newMonthIndex] === currentMonth && this.yearArr[newYearIndex] === currentYear) {
                for (let i = currentMinutes; i <= 60; i++) {
                    newMinutesArr.push(i)
                }
                if(this.minutesArr[pickVal[4]] < currentMinutes) {
                  newMinutesIndex = 0
                }else {
                  newMinutesIndex = newMinutesArr.findIndex((v, i) => {
                      return this.minutesArr[pickVal[4]]  === v
                  })
                }
              }
              this.hoursArr = newHoursArr
              this.monthArr = newMonthArr
              this.dayArr = newDayArr
              this.minutesArr = newMinutesArr
               this.$nextTick(() => {
                 this.pickTime = [newYearIndex, newMonthIndex, newDayIndex, newHoursIndex, newMinutesIndex]
                 this.$set(this.pickTime, 3, newHoursIndex)
               })
            },
            getCurrentMonthDay(year, month) {
              return new Date(year, month, 0).getDate()
            },
            bindChange: function (e) {
                const pickVal = e.detail.value
                // 节流
                if(this.timer) {
                  return
                }
                this.timer = setTimeout(() => {
                  this.timer = null
                  clearTimeout(this.timer)
                }, 500)
                 this.renewDate(pickVal)  
            }
        }
    }
</script>
<style>
  .uni-padding-wrap{
    padding: 0 26rpx;
    height: 120rpx;
    background: #f9fafb;
    border-radius:  32rpx 32rpx 0rpx 0rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
    .picker-view {
        width: 750rpx;
        height: 600rpx;
        background-color: #ffffff;
    }
   .item {
        line-height: 100rpx;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #34c4c4;
    }
    .date-item{
      height: 100rpx;
    }
</style>