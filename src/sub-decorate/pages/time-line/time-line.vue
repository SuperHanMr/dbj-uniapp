<template>
  <view class="time-line">
    <view class="item" v-for="item of list" :key='item.operateTime'>
      <view class="rightContent">
        <view class="text">{{item.name}}</view>
        <view class="time">{{item.operateTime}}</view>
      </view>
      <view class="line">
        <view class="out">
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {getLogs} from '../../../api/decorate.js'
  export default {
    data() {
      return { 
        list: {}
      }
    },
    onLoad(e) {
      this.getData()
    },
    methods: {
      getData() {
        getLogs(34).then(res=>{
          this.list = res
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .time-line {
    padding: 80rpx 32rpx;
    background-color: #fff;
  }

  .item {
    display: flex;
    position: relative;
    align-items: top;
    height: 144rpx;
  }

  .line {
    width: 4rpx;
    background: #00C2B8;
    position: relative;
    height: 144rpx;

    .out {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12px;
      height: 12px;
      opacity: 1;
      background: #00c2b8;
      border: 2px solid #e0f7f7;
      border-radius: 50%;
    }
  }

  .item:last-child>.line {
    height: 0;
  }
 
  .rightContent {
    width: 606rpx;
    margin-left: 34rpx;
    padding: 0 24rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    position: absolute;
    top: -50%;
    background-color: #F5F6F6;
    height: 96rpx;
    margin-top: 36rpx;

    .text {
      color: #333;
      font-weight: 500;
    }

    .time {
      color: #999;
      font-size: 400;
    }
  }
</style>
