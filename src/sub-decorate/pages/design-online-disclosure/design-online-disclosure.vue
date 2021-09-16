<template>
  <view class="wrap">
    <view class="avtor-wrap flex-row-bet">
      <view class="flex-row-start">
        <image class="avtor" :src="dataDetail.avatar"></image>
        <view class="tigs">
          <view class="username">{{dataDetail.userName}}</view>
          <view class="role">{{dataDetail.role}}</view>
        </view>
      </view>
      <view class="date">{{dataDetail.updateTime | dateFilter}}</view>
    </view>
    <view class="desc">
      线上交底阶段交付确认后，服务将进入报告交付阶段，设计师将为您生成属于您的专属设计报告，已交付的全部设计图纸也将不可再进行修改。
    </view>
    <button class="btn" @click="confirm">确认线上交底</button>
  </view>
</template>

<script>
  import {
    serverInfo,
    confirmStageDeliver
  } from "../../../api/decorate.js"
  import { calendarFormat } from "../../../utils/date.js"
  export default {
    data() {
      return {
        dataDetail: {},
        serverId: null
      }
    },
    onLoad(option) {
      this.serverId = option.serverId
    },
    onShow() {
      this.queryServerInfo()
    },
    filters: {
      dateFilter(v) {
        return calendarFormat(v, "YYYY-MM-DD HH:mm:ss")
      }
      
    },
    methods: {
      confirm() {
        uni.showModal({
          title: "",
          content: "是否确认该线上交底?确认后设计服务将完成",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              confirmStageDeliver(this.serverId).then(data => {
                console.log(data)
                wx.showToast({
                  title: "已提交确认"
                })
              })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      queryServerInfo() {
        serverInfo(this.serverId).then(data => {
          this.dataDetail = data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #fff;
    padding: 32rpx;
    height: 100%;
  }

  .avtor-wrap {
    margin: 48rpx 0 23rpx;
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 24rpx;

    .avtor {
      width: 104rpx;
      height: 104rpx;
      border: 2rpx solid #000;
      border-radius: 50%;
      margin-right: 16rpx;
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

  .desc {
    height: 132rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    letter-spacing: 1rpx;
    margin-bottom: 180rpx;
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

  .btn {
    position: fixed;
    bottom: 64rpx;
    width: calc(100% - 64rpx);
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(135deg, #00c2b2, #00c2bf);
    border-radius: 12rpx;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }
</style>
