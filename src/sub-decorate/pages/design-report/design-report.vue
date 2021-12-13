<template>
  <view class="wrap">
    <view class="avtor-wrap flex-row-bet">
      <view class="flex-row-start">
        <image class="avtor" :src="detail.designServerVO.avatar"></image>
        <view class="tigs">
          <view class="username">{{detail.designServerVO.userName}}</view>
          <view class="role">设计师</view>
        </view>
      </view>
      <view class="date">{{calendarFormat(detail)}}</view>
    </view>
    <view v-if="detail.beautyReport && detail.beautyReport.id && detail.beautyReport.templateId"
      class="card flex-row-bet">
      <view class="t">{{detail.beautyReport.title}}</view>
      <view class="lookDetail flex-row-start" @click="beatifulReport">
        <view>立即查看</view>
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
      </view>
      <!-- <view v-else class="lookDetail">未生成颜值报告</view> -->
    </view>
    <view v-if="detail.customReport && detail.customReport.id" class="card flex-row-bet">
      <view class="t">{{detail.customReport.title}}</view>
      <view class="lookDetail flex-row-start" @click="customReport">
        <view>立即查看</view>
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
      </view>
      <!-- <view v-else class="lookDetail">未生成自定义报告</view> -->
    </view>
    <button class="btn" @click="confirm">确认设计报告</button>
  </view>
</template>

<script>
  import {
    confirmDesignReport,
    serverReports,
    isAllowOperate
  } from "../../../api/decorate.js"
  import {
    calendarFormat
  } from "../../../utils/date.js"
  export default {
    data() {
      return {
        decorateMsg: {},
        detail: {}
      }
    },
    onLoad() {
      this.decorateMsg = getApp().globalData.decorateMsg
    },
    onShow() {
      this.getPorts()
    },
    methods: {
      confirm() {
        uni.showModal({
          title: "",
          content: "确认通过设计报告验收?",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
              confirmDesignReport(this.decorateMsg.serveId).then(data => {
                uni.navigateBack({})
              })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },

      customReport() {
        const {
          customReport
        } = this.detail
        isAllowOperate(customReport.serveId).then(res => {
          const token = uni.getStorageSync("scn")
          uni.navigateTo({
            url: `/sub-decorate/pages/custom-report/custom-report?token=${token}&id=${customReport.id}`
          })
        }).catch(res => {
          if (res.code === 6959) {
            uni.showToast({
              title: "已申请退款",
              icon: "error",
            })
          } else if (res.code === 6962) {
            uni.showToast({
              title: "变更服务者",
              icon: "error",
            })
          } else if (res.code === 6966) {
            uni.showToast({
              title: "变更单进行中",
              icon: "error",
            })
          }
        })
      },
      beatifulReport() {
        const {
          beautyReport
        } = this.detail
        isAllowOperate(beautyReport.serveId).then(res => {
          console.log(">>>>>>>data>>>>>>>>>:", res)
          const token = uni.getStorageSync("scn")
          uni.navigateTo({
            url: `/sub-decorate/pages/beatiful-report/beatiful-report?token=${token}&serveId=${beautyReport.serveId}&themeId=${beautyReport.templateId}&id=${beautyReport.id}`
          })
        }).catch(res => {
          if (res.code === 6959) {
            uni.showToast({
              title: "已申请退款",
              icon: "error",
            })
          } else if (res.code === 6962) {
            uni.showToast({
              title: "变更服务者",
              icon: "error",
            })
          } else if (res.code === 6966) {
            uni.showToast({
              title: "变更单进行中",
              icon: "error",
            })
          }
        })
      },
      getPorts() {
        serverReports(this.decorateMsg.serveId).then(data => {
          this.detail = data
        })
      },
      calendarFormat(detail) {
        return calendarFormat(detail?.designServerVO?.updateTime)
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    padding: 24rpx;
    background: #ffffff;
    height: 100%;
  }

  .avtor-wrap {
    margin-bottom: 33rpx;
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 24rpx;

    .avtor {
      width: 104rpx;
      height: 104rpx;
      border-radius: 50%;
      margin-right: 33rpx;
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

  .card {
    height: 100rpx;
    background: #f7f7f7;
    border-radius: 24rpx;
    padding: 30rpx 16rpx 30rpx 36rpx;
    margin-bottom: 24rpx;
  }

  .t {
    flex: 1;
    margin-right: 30rpx;
    // width: 490rpx;
    height: 32rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 40rpx;
  }

  .lookDetail {
    width: 130rpx;

    view {
      height: 36rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      color: #666666;
      line-height: 36rpx;
    }

    image {
      width: 24rpx;
      height: 24rpx;
    }
  }
</style>
