<template>
  <view class="wrap">
    <view class="message">
      管家发起竣工验收申请，系统将在{{countdown}}后自动确认验收
    </view>
    <view class="content">
      <user-desc-pict-butler :detail="detail"></user-desc-pict-butler>
    </view>
    <view class="bt-btn-wrap flex-row" :style="{paddingBottom:systemBottom,height:systemHeight}">
      <view class="btn-l" @click="refuse">拒绝通过</view>
      <view class="btn-r" @click="confirm">验收通过</view>
    </view>
  </view>
</template>

<script>
  let timer = null
  import {
    completionDetail,
    ownerCompletionAudit
  } from "../../../api/construction.js"
  import UserDescPictButler from "../../components/user-desc-pict/user-desc-pict-butler.vue"

  export default {
    components: {
      UserDescPictButler
    },
    onLoad(option) {
      this.msg = getApp().globalData.decorateMsg
      this.id = id
    },
    onShow() {
      // this.queryCompletionDetail()
    },
    mounted() {
      this.queryCompletionDetail()
    },
    data() {
      return {
        msg: {},
        detail: {},
        id: null,
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
        countdown: "72:00:00",
        updateTime: new Date().getTime(),
      }
    },
    onHide() {
      clearInterval(timer)
      timer = null
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
      this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
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
              ownerCompletionAudit({
                id: this.msg.data.id,
                status: 2
              }).then(data => {
                console.log(data)
                uni.showToast({
                  title: "已提交验收"
                })
                uni.navigateBack({

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
          url: `/sub-decorate/pages/housekeeper-refuse/housekeeper-refuse?id=${this.msg.data.id}`
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
      queryCompletionDetail() {
        completionDetail(this.msg.data.id).then(data => {
          this.detail = data
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
      },

    },
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
