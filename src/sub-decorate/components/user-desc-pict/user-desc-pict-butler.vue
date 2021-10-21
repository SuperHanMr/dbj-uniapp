<template>
  <view class="wrap">
    <slot name="subtitle"></slot>
    <view class="content-wrap">
      <view class="avtor-wrap flex-row-bet">
        <view class="flex-row-start">
          <image mode="aspectFill" class="avtor" :src="detail.avatar"></image>
          <view class="tigs">
            <view class="username">{{detail.userName}}</view>
            <view class="role">管家</view>
          </view>
        </view>
        <view class="date">{{detail.createTime | calendarFormat}}</view>
      </view>
      <view class="desc">{{detail.summaryDescription}}</view>
      <view class="picture flex-row">
        <view class="imgs" v-for="(item, index) in detail.sitePhotoList" :key="index" v-if="index < 6">
          <image  mode="aspectFill" :src="item" @click="clickImg(detail.sitePhotoList, index)"></image>
          <view class="zz" v-if="index === 5" @click="clickImg(detail.sitePhotoList, 5)">+{{detail.sitePhotoList.length - 6}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    calendarFormat
  } from "../../../utils/date.js"
  export default {
    props: {
      detail: {
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
      }
    },
    filters: {
      calendarFormat(time) {
        return calendarFormat(time)
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
  }

  .worker-title {
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
