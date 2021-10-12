<template>
  <view class="wrap">
    <slot name="subtitle"></slot>
    <view class="content-wrap">
      <view class="avtor-wrap flex-row-bet">
        <view class="flex-row-start">
          <image class="avtor" :src="workerData.avatar"></image>
          <view class="tigs">
            <view class="username">{{workerData.name}}</view>
            <view class="role">{{workerData.nodeName}}</view>
          </view>
        </view>
        <view class="date">{{workerData.createTime}}</view>
      </view>
      <view class="desc">{{workerData.content}}</view>
      <view class="picture flex-row">
        <view class="imgs" v-for="(item, index) in workerData.fileUrls" :key="index" v-if="index < 6">
          <image :src="item" @click="clickImg(workerData.fileUrls)"></image>
          <view class="zz" v-if="index === 5" @click="clickImg(workerData.fileUrls)">+{{workerData.fileUrls.length - 6}}</view>
        </view>
      </view>
      <view v-for="(t,index) in workerData.workerItems">
        <view class="worker-title">{{t.workItemName}}</view>
        <view class="picture flex-row">
          <view class="imgs" v-for="(it, index) in t.fileUrls" :key="index" v-if="index < 3">
            <image :src="it" @click="clickImg(t.fileUrls)"></image>
            <view class="zz" v-if="index === 2" @click="clickImg(t.fileUrls)">+{{t.fileUrls.length - 3}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      workerData: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      clickImg(url) {
        let arr = new Array();
        if (url instanceof Array) {
          arr = [...url]
        } else {
          arr.push(url)
        }
        console.log(arr)
        uni.previewImage({
          // current: 1,
          urls: arr,
          // longPressActions:{}
        })
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
