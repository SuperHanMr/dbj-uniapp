<template>
  <view class="wrap">
    <slot name="subtitle"></slot>
    <view class="content-wrap">
      <view class="avtor-wrap flex-row-bet">
        <view class="flex-row-start">
          <image mode="aspectFill" class="avtor" :src="workerData.avatar+'?x-oss-process=image/resize,m_mfit,w_52,h_52'" @click="goPersonPage"></image>
          <view class="tigs">
            <view class="username">{{workerData.name}}</view>
            <view class="role">{{workerData.nodeName}}</view>
          </view>
        </view>
        <view class="date">{{workerData.createTime | calendarFormat}}</view>
      </view>
      <view class="desc">{{workerData.content}}</view>
      <view class="picture flex-row">
        <view class="imgs" :class="{'img3': index % 3 == 2}" v-for="(item, index) in workerData.fileUrls" :key="index"
          v-if="index < 6">
          <image mode="aspectFill" :src="item+'?x-oss-process=image/resize,m_mfit,w_110,h_110'" @click="clickImg(workerData.fileUrls, index)"></image>
          <view class="zz" v-if="workerData.fileUrls.length > 6 && index === 5"
            @click="clickImg(workerData.fileUrls, 5)">+{{workerData.fileUrls.length - 6}}</view>
        </view>
      </view>
      <view v-for="(t,index) in workerData.workerItems" :key="index">
        <view class="worker-title">{{t.workItemName}}</view>
        <view class="picture flex-row">
          <view class="imgs" :class="{'img3': index % 3 == 2}" v-for="(kit, i) in t.fileUrls" :key="i" v-if="i < 3">
            <image mode="aspectFill" :src="kit+'?x-oss-process=image/resize,m_mfit,w_110,h_110'" @click="clickImg(t.fileUrls, i)"></image>
            <view class="zz" v-if="t.fileUrls.length > 3 && i === 2" @click="clickImg(t.fileUrls, 2)">
              +{{t.fileUrls.length - 3}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    formatDate
  } from "../../../utils/common.js"
  export default {
    props: {
      workerData: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      clickImg(url, index) {
        let arr = new Array();
        if (url instanceof Array) {
          arr = [...url]
        } else {
          arr.push(url)
        }
        console.log(arr, index)
        uni.previewImage({
          current: index,
          urls: arr,
          // longPressActions:{}
        })
      },
      goPersonPage() {
        uni.navigateTo({
          url: `/sub-decorate/pages/person-page/person-page?personId=${this.workerData?.zeusId}`
        })
      }
    },
    filters: {
      calendarFormat(time) {
        return formatDate(time)
      }
    }
  }
</script>

<style scoped lang="scss">
  .flex-row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .bt-btn-wrap {
    width: calc(100% - 64rpx);
    position: fixed;
    bottom: 64rpx;
    justify-content: space-between;
  }

  .content-wrap {
    background-color: #fff;
    padding: 24rpx;
    border-radius: 16rpx;
  }

  .avtor-wrap {
    // padding-top: 112rpx;
    margin-bottom: 23rpx;
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 24rpx;

    .avtor {
      width: 104rpx;
      height: 104rpx;
      // border: 2rpx solid #000;
      border-radius: 50%;
      margin-right: 16rpx;
    }

    .tigs {
      .username {
        width: 300rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 42rpx;
        font-size: 30rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 700;
        text-align: left;
        color: #333333;
        line-height: 42rpx;
      }

      .role {
        width: 90rpx;
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

    .img3.imgs {
      margin-right: 0;
    }

    .imgs {
      margin-bottom: 8rpx;
      margin-right: 8rpx;
      width: 32%;
      position: relative;

      .zz {
        position: absolute;
        top: 0;
        left: 0;
        color: #ffffff;
        font-weight: 700;
        text-align: center;
        font-size: 40rpx;
        line-height: 220rpx;
        // opacity: 0.25;
        background: rgba(0, 0, 0, .25);
        border-radius: 12rpx;
      }

      image,
      .zz {
        box-sizing: border-box;
        width: 100%;
        height: 220rpx;
        border: 2rpx solid #f5f6f6;
        border-radius: 12rpx;
      }
    }
  }

  .desc {
    min-height: 88rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    margin-bottom: 24rpx;
    word-break: break-all;
  }

  .worker-title {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 40rpx;
    letter-spacing: 1rpx;
    margin-bottom: 16rpx;
  }
</style>
