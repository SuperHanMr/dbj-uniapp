<template>
  <view class="text-scroll">
    <view class="text-scroll-item" @click="goDecorateCalendar">
      <image class="icon-rili" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_rili%402x.webp"></image>
      <view class="line"></view>
      <view class="content">{{current.content}}</view>
      <view class="date">{{current.recordDate | formatDate}}</view>
      <image class="icon-r" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
    </view>
  </view>
</template>

<script>
  import {
    formatDate
  } from "../../utils/common.js";
  import {
    calendarFormat
  } from "../../utils/date.js";
  export default {
    props: ["dataList", "show"],
    data() {
      return {
        timer: null,
        current: {},
        index: 0,
      };
    },
    methods: {
      setTimer() {
        clearInterval(this.timer);
        if (this.dataList.length <= 1) {
          return
        }
        this.timer = setInterval(() => {
          if (this.index < 4 && this.index < this.dataList.length - 1) {
            this.index++;
          } else {
            this.index = 0;
          }
          console.log(this.index)
          this.current = this.dataList[this.index];
        }, 7000);
      },
      goDecorateCalendar() {
        // if(!this.current?.recordDate) {
        //   return
        // }
        let yyyymmdd = formatDate(this.current.recordDate)
          .split(" ")[0]
          .split("-");
        let yyyy = yyyymmdd[0] + "";
        let mm = yyyymmdd[1] + "";
        this.$emit("goDecorateCalendar", yyyy + mm);
      },
      clearTimer() {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    filters: {
      formatDate(val) {
        if(val) {
          return calendarFormat(val, {
            sameDay: "[今天]",
            nextDay: "[明天]",
            lastDay: "[昨天]",
            last2Day: "[前天]",
            sameYear: "MM-DD",
            sameElse: "YYYY-MM-DD",
          });
        } else {
          return ""
        }
        
      },
    },
    mounted() {
      this.current = this.dataList[this.index];
      this.setTimer();
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
    watch: {
      show(val) {
        if (!val) {
          this.clearTimer()
        } else {
          this.setTimer()
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .text-scroll {
    height: 88rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin: 0 24rpx 16rpx;
    padding: 24rpx;
    box-sizing: border-box;
    overflow: hidden;
  }

  .text-scroll-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin-bottom: 4rpx;

    .icon-rili {
      // font-size: 37rpx;
      width: 36rpx;
      height: 36rpx;
      // border: 2rpx solid;
      // box-sizing: border-box;
      // color: #00bfb6;
      margin-right: 16rpx;
    }

    .line {
      width: 2rpx;
      height: 24rpx;
      background: #dcdcdc;
      margin-right: 17rpx;
    }

    .content {
      flex: 1;
      height: 36rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 36rpx;
      margin-right: 12rpx;
      margin-right: 8rpx;
      width: 282rpx;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .date {
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #999999;
      line-height: 34rpx;
      margin-right: 8rpx;
    }

    .icon-r {
      width: 24rpx;
      height: 24rpx;
    }
  }

  .slide-enter-active {
    transition: all 1.5s ease-in;
    opacity: 1;
  }

  .slide-leave-active {
    transition: all 1s ease-out;
    opacity: 0;
  }

  .slide-enter {
    transform: translateY(20rpx);
    transition: all 1s ease-in;
    opacity: 0;
  }

  .slide-leave-to {
    transform: translateY(-30rpx);
  }
</style>
