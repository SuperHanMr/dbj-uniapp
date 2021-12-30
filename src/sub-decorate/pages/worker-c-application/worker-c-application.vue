<template>
  <view class="wrap">
    <view class="message" :style="{top: messageTop + 'rpx'}">
      管家已验收通过，系统将在{{countdown}}后自动确认验收
    </view>
    <view class="content" :style="{paddingBottom:containerBottom * 2 + 48 + 88 + 'rpx'}">
      <user-desc-pict :butlerData="butlerData"></user-desc-pict>
      <user-desc-pict-worker :workerData="workerData"></user-desc-pict-worker>
    </view>
    <view class="bt-btn-wrap flex-row" :style="{paddingBottom:systemBottom}">
      <view class="btn-l" @click="refuse">拒绝通过</view>
      <view class="btn-r" @click="confirm">验收通过</view>
    </view>
  </view>
</template>

<script>
  let timer = null
  import {
    ownerInsertAudit,
    getCompletionLogById
  } from "../../../api/construction.js"

  import UserDescPictWorker from "../../components/user-desc-pict/user-desc-pict-worker.vue"
  import UserDescPict from "../../components/user-desc-pict/user-desc-pict.vue"
  export default {
    components: {
      UserDescPictWorker,
      UserDescPict
    },
    onLoad(option) {
      this.msg = getApp().globalData.decorateMsg

    },
    onShow() {
      
      this.getCompletionLogById()
    },
    
    mounted() {
      // this.getCompletionLogById()
    },
    data() {
      return {
        workerData: {},
        butlerData: {},
        daojishi: "",
        msg: {},
        timer: null,
				messageTop: 0,
        countdown: "72:00:00",
        updateTime: new Date().getTime(),

        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
      }
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
			this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
			// #ifdef H5
      this.systemBottom = menuButtonInfo.bottom * 4 + "rpx";
			this.messageTop = 76
			// #endif
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
    },
    destroyed() {
      clearInterval(this.timer)
      this.timer = null
    },
    methods: {
      confirm() {
        uni.showModal({
          title: "",
          content: "是否确认该阶段已验收通过?",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
              ownerInsertAudit({
                applyId: this.msg.data.id,
                status: 5
              }).then(data => {
                uni.showToast({
                  title: "已提交申请",
                  icon: false
                })
                uni.navigateBack({})
              })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      refuse() {
        uni.navigateTo({
          url: `/sub-decorate/pages/worker-refuse/worker-refuse?id=${this.msg.data?.id}&serveTypeName=${this.msg?.serveTypeName}`
        })
      },
      countTime() {
        let nowtime = new Date(), //获取当前时间
          endtime = new Date(this.updateTime + 604800000)//  7 * 24 * 60 * 60 * 1000); //定义结束时间
        let lefttime = endtime.getTime() - nowtime.getTime() //距离结束时间的毫秒数
        // let leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)) //计算天数
        let lefth = Math.floor(lefttime / (1000 * 60 * 60)) //计算小时数
        lefth = lefth > 9 ? lefth : '0' + lefth
        let leftm = Math.floor(lefttime / (1000 * 60) % 60) //计算分钟数
        leftm = leftm > 9 ? leftm : '0' + leftm
        let lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
        lefts = lefts > 9 ? lefts : '0' + lefts
        // this.countdown = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
        this.countdown = lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
      },
      getCompletionLogById() {
        getCompletionLogById(this.msg.data.id).then(data => {
          let type = "--工人--服务验收申请"
          if(data?.type == 3) {
            type = "服务阶段验收申请";
          }
          if(data?.type == 4) {
            type = "服务整体验收申请";
          }
          uni.setNavigationBarTitle({
            title: data?.nodeName + type
          })
          this.workerData = data.workerDecorationTrendLogVO
          this.butlerData = data.butlerDecorationTrendLogVO
          this.updateTime = data.updateTime
          if (this.updateTime) {
            this.countTime()
            timer = setInterval(() => {
              this.countTime()
            }, 1000)
          } else {
            this.countdown = "72:00:00"
          }
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
    margin-top: 56rpx;
  }

  .message {
    position: fixed;
    top: 86rpx;
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
    z-index: 999;
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
    justify-content: flex-start;
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
    height: 88rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
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
