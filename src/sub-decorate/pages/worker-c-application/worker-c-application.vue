<template>
  <view class="wrap">
    <view class="message">
      拆除工人发起阶段服务验收申请，系统将在72:00:00后自动确认验收
    </view>
    <view class="content">
      <user-desc-pict-worker :workerData="workerData" :isWorker="true"></user-desc-pict-worker>
    </view>
    <view class="bt-btn-wrap flex-row">
      <view class="btn-l" @click="refuse">拒绝通过</view>
      <view class="btn-r" @click="confirm">验收通过</view>
    </view>
  </view>
</template>

<script>
  import {
    ownerInsertAudit,
    getCompletionLogById
  } from "../../../api/construction.js"

  import UserDescPictWorker from "../../components/user-desc-pict/user-desc-pict-worker.vue"
  export default {
    components: {
      UserDescPictWorker
    },
    onLoad(option) {
      this.msg = getApp().globalData.decorateMsg
      
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.msg.nodeName
      })
      this.getCompletionLogById()
    },
    data() {
      return {
        workerData: {},
        id: null,
        msg: {}
      }
    },
    methods: {
      confirm() {
        uni.showModal({
          title: "",
          content: "是否通过竣工验收?",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
              ownerInsertAudit({
                applyId: this.msg.id,
                status: 5
              }).then(data => {
                uni.showToast({
                  title: "已提交申请",
                  icon: false
                })
              })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      refuse() {
        uni.navigateTo({
          url: `/sub-decorate/pages/worker-refuse/worker-refuse?id=${this.msg.id}&serveTypeName=${this.msg.serveTypeName}`
        })
      },
      getCompletionLogById() {
        getCompletionLogById(this.msg.id).then(data => {
          this.workerData = data.workerDecorationTrendLogVO
          // this.id = data.id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {

    padding: 24rpx;
    position: relative;
    height: 100%;

    background: #f5f6f6;
  }

  .wrap.ext {
    padding: 24rpx;
  }

  .content {
    //   background: #ffffff;
    //   border-radius: 16rpx;
    margin-top: 56rpx;
    // padding: 24rpx;
  }

  // .content-ext {
  //   background: #ffffff;
  //   border-radius: 16rpx;
  //   margin-top: 56rpx;
  //   padding: 24rpx;
  // }

  .message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56rpx;
    line-height: 56rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #a28645;
    background: #fff5de;
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }



  .avtor-wrap {
    padding-top: 112rpx;
    margin-bottom: 23rpx;
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

  .picture {
    justify-content: space-between;
    flex-wrap: wrap;

    .imgs {
      margin-bottom: 8rpx;
      width: 32%;

      image {
        box-sizing: border-box;
        width: 100%;
        height: 220rpx;
        border: 2rpx solid #f5f6f6;
        border-radius: 12rpx;
      }

      .sub-title {
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 34rpx;
      }
    }
  }

  .desc {
    height: 88rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    margin-bottom: 24rpx;
  }

  .bt-btn-wrap {
    background-color: #fff;
    width: 100%;
    position: fixed;
    bottom: 68rpx;
    // bottom: env(safe-area-insert-bottom);
    // bottom: 68rpx;
    left: 0;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: flex-start;
    padding: 24rpx 32rpx;

    .btn-l {
      width: 188rpx;
      height: 88rpx;
      line-height: 88rpx;
      border: 1rpx solid #cccccc;
      border-radius: 16rpx;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #666666;
    }

    .btn-r {
      width: 466rpx;
      height: 88rpx;
      line-height: 88rpx;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      background: linear-gradient(135deg, #00bfaf, #00bfbc);
      border-radius: 16rpx;
    }
  }
</style>
