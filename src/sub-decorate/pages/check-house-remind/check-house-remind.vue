<template>
  <view class="check-house-remind">
    <view class="avtor-wrap flex-row-bet">
      <view class="flex-row-start">
        <image class="avtor" :src="timeMsg.avatar"></image>
        <view class="tigs">
          <view class="username">{{timeMsg.name}}</view>
          <view class="role">{{roleName}}</view>
        </view>
      </view>
      <view class="date">{{timeMsg.appointedServiceMsgTime}}</view>
    </view>
    <view class="tips">
      <view class="tips-1">业主您好</view>
      <view class="tips-2">和你预约的上门时间为</view>
      <view class="tips-3">{{timeMsg.serviceTime}}</view>
    </view>

    <view class="tips">
      <view class="tips-t">验房前准备</view>
      <view class="tips-c">
        {{timeMsg.note}}
      </view>
    </view>
    <view class="btn-wrap">
      <view class="btn" @click="submitConfirmServeTime">我知道了</view>
    </view>
  </view>
</template>

<script>
  import {
    confirmServeTime,
    serviceTimeMsg
  } from "../../../api/reminder.js"
  export default {
    data() {
      return {
        timeMsg: {},
        serverCardId: null
      }
    },
    onLoad(option) {
      // const { serverCardId } = getApp().globalData.decorateMsg
      this.serverCardId = option.serverCardId || getApp().globalData.decorateMsg.serverCardId
      console.log(">>>>>>>>>>>>", option)
    },
    onShow() {
      this.getServiceTimeMsg()
    },
    methods: {
      submitConfirmServeTime() {
        confirmServeTime(this.serverCardId).then(data => {
          uni.switchTab({
            
            url: "/pages/decorate/index/index"
          })
        })
      },
      getServiceTimeMsg() {
        serviceTimeMsg(this.serverCardId).then(data => {
          this.timeMsg = data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .check-house-remind {
    background: #f5f6f6;
    height: 100%;
    position: relative;
  }

  .avtor-wrap {
    margin: 60rpx 32rpx 48rpx 48rpx;

    .avtor {
      width: 104rpx;
      height: 104rpx;
      // border: 2rpx solid #000;
      border-radius: 50%;
      margin-right: 16rpx;
      margin-bottom: 8rpx;
    }

    .tigs {
      .username {
        width: 90rpx;
        height: 42rpx;
        font-size: 30rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 700;
        text-align: left;
        color: #333333;
        line-height: 42rpx;
      }

      .role {
        height: 32rpx;
        background: linear-gradient(45deg, #6d95ef, #84b9fc);
        border-radius: 6rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 32rpx;
      }
    }

    .date {
      height: 36rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      color: #666666;
      line-height: 36rpx;
    }
  }

  .flex-row-bet {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .flex-row-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }

  .tips {
    padding: 32rpx;
    margin: 0 24rpx 32rpx;
    background-color: #fff;
    border-radius: 24rpx;
  }

  .tips-1 {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #666666;
    line-height: 40rpx;
    margin-bottom: 16rpx;
  }

  .tips-2 {
    margin-bottom: 32rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #666666;
    line-height: 40rpx;
  }

  .tips-3 {
    height: 96rpx;
    padding: 20rpx;
    background: #f5f6f6;
    border-radius: 12rpx;
    height: 56rpx;
    font-size: 40rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #00c2b8;
    line-height: 56rpx;
    margin-bottom: 8rpx;
  }

  .tips-t {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    margin-bottom: 16rpx;
  }

  .tips-c {
    height: 200rpx;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #666666;
    line-height: 40rpx;
    letter-spacing: 1rpx;
  }

  .btn-wrap {
    position: absolute;
    bottom: 68rpx;
    left: 0;
    width: 750rpx;
    height: 136rpx;
    background: #fefffe;
    box-sizing: border-box;
    padding: 24rpx 32rpx;

    .btn {
      height: 88rpx;
      background: linear-gradient(135deg, #00c2b2, #00c2bf);
      border-radius: 12rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 88rpx;
    }
  }
</style>
