<template>
  <view class="pop-content">
    <view class="title-wrap">
      <view class="title">温馨提示</view>
      <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_cancel.svg" @click="close"></image>
    </view>
    <view class="desc">
      {{tips.content}}
    </view>
    <view class="btn-wrap">
      <view class="no-r" @click="cancel">不需要</view>
      <view class="h-f" @click="select">恢复勾选</view>
    </view>
  </view>
</template>

<script>
  export default {
    props: ["tips"],
    methods: {
      select() {
        this.$emit("result", {
          id: this.tips.id,
          checked: true
        })
      },
      cancel() {
        this.$emit("result", {
          id: this.tips.id,
          checked: false
        })
      },
      close() {
        this.$emit("close")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pop-content {
    padding-bottom: 40rpx;
    height: 554rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 32rpx 32rpx 0 0;
  }

  .title-wrap {
    box-sizing: border-box;
    position: relative;
    text-align: center;
    padding: 38rpx 0;

    .title {
      height: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: #333333;
      line-height: 44rpx;
    }

    image {
      position: absolute;
      top: 36rpx;
      right: 40rpx;
      width: 48rpx;
      height: 48rpx;
    }
  }

  .desc {
    margin-bottom: 82rpx;
    padding: 0 32rpx;
  }

  .btn-wrap {
    box-sizing: border-box;
    padding: 28rpx 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .no-r {
      box-sizing: border-box;
      width: 320rpx;
      height: 80rpx;
      border: 2rpx solid #f2f5f8;
      border-radius: 44rpx;

      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      color: #666666;
      line-height: 80rpx;
    }

    .h-f {
      box-sizing: border-box;
      width: 320rpx;
      height: 80rpx;
      background: linear-gradient(135deg, #00c2b2, #00c2bf);
      border-radius: 44rpx;

      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 80rpx;
    }
  }
</style>
