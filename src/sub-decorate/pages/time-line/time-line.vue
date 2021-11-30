<template>
  <view class="time-line">
    <view class="item" v-if="list.length>0" v-for="item of list" :key='item.operateTime'>
      <view class="rightContent">
        <view class="text">{{item.name}}</view>
        <view class="time">{{item.operateTime |formatDate}}</view>
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
  import { formatDate } from '@/utils/common.js'
  export default {
    data() {
      return { 
        list: {}
      }
    },
    onLoad(e) {
      this.getData(e.id)
      uni.setNavigationBarTitle({
        title:e.name+'服务进度'
      })
    },
    filters:{
      formatDate
    },
    methods: {
      getData(id) {
        getLogs(id).then(res=>{
          this.list = res
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .time-line {
    min-height: 100%;
    padding: 80rpx 32rpx;
    background-color: #fff;
    box-sizing: border-box;
  }

  .item {
    display: flex;
    position: relative;
    align-items: top;
    height: 144rpx;
  }

  .line {
    box-sizing: border-box;
    width: 4rpx;
    background: #00C2B8;
    position: relative;
    height: 144rpx;

    .out {
      box-sizing: border-box;
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
    box-sizing: border-box;
    width: 638rpx;
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
    
    border-radius: 12rpx;
    .text {
      color: #333;
      font-weight: 500;
      max-width: 292rpx;
          // overflow: hidden;
          word-break: break-all;
    }

    .time {
      color: #999;
      font-size: 400;
    }
  }
</style>
