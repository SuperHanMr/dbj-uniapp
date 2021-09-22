<template>
  <view class="text-scroll">
    <view class="text-scroll-item">
      <image class="icon-l"></image>
      <view class="line"></view>
      <view class="content">{{current.content}}</view>
      <view class="date">{{current.date}}</view>
      <image class="icon-r" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
    </view>
  </view>
</template>

<script>
  import {
    getCarouselMsg
  } from "../../api/decorate.js";
  export default {
    props: ["projectId"],
    data() {
      return {
        list: [{
            id: 1,
            content: "业主您好我是您今天的是您今天的是的工反动当局立法机关",
            date: "8.19"
          },
          {
            id: 2,
            content: "热舞热退热退热天文台热热刚刚",
            date: "8.19"
          },
          {
            id: 3,
            content: "风格豆腐干豆腐干梵蒂冈梵蒂冈梵蒂冈反对法国梵蒂冈梵蒂冈梵蒂冈法国梵蒂冈梵蒂冈",
            date: "8.19"
          },
          {
            id: 4,
            content: "热特瑞特瑞特瑞特瑞特让他",
            date: "8.19"
          },
          {
            id: 5,
            content: "热望热热我热热舞",
            date: "8.19"
          }
        ],
        timer: null,
        current: {},
        index: 0
      }
    },
    methods: {
      setTimer() {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (this.index < 4) {
            this.index++
          } else {
            this.index = 0
          }
          this.current = this.list[this.index]
        }, 7000)
      }
    },
    mounted() {
      this.current = this.list[this.index]
      this.setTimer()
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null;
    }
  }
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

    .icon-l {
      width: 24rpx;
      height: 22rpx;
      border: 2rpx solid;
      box-sizing: border-box;
      margin-right: 22rpx;
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
