<template>
  <view class="wrap">
    <image class="top-bg" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/top_bg%402x.png"></image>
    <view class="title">
      <view class="left">
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_level.svg"></image>
        <view>选择您想要更换人工的等级</view>
      </view>
      <view class="right left" @click="lookdesc">
        <view>什么是人工等级</view>
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_why.svg"></image>
      </view>
    </view>
    <view class="r-d-g">
      <group-radio-me :items="dataList" :defaultV="1" @change="change"></group-radio-me>
    </view>
    <view class="line"></view>
    <view class="price-count">所有人工费用总和：¥{{currentLevel && currentLevel.totalPrice ? (currentLevel.totalPrice / 100).toFixed(2) : ''}}</view>
    <view class="btn-wrap">
      <view class="cancel" @click="cancel">取消</view>
      <view class="submit" @click="ok">确定更改</view>
    </view>
    <uni-popup ref="levelDesc">
      <view class="level-desc-wrap">
        <view class="title-wrap">
          <view class="d-title"><text>等级说明规则</text></view>
          <view class="close" @click="close">+</view>
        </view>
        <view v-if="descType == 'design'">
          <view class="desc">
            <view class="sub-title-1">中级设计师：</view>平均5年以上设计经验，平均服务业主100+，平均拥有三项及以上设计师相关身份认证；
          </view>
          <view class="desc">
            <view class="sub-title-1">高级设计师：</view>平均8年以上设计经验，平均服务业主200+，平均拥有五项及以上设计师相关身份认证；
          </view>
          <view class="desc">
            <view class="sub-title-1">特级设计师：</view>平均10年以上设计经验，平均服务业主350+，平均拥有七项及以上设计师相关身份认证；
          </view>
          <view class="desc">
            <view class="sub-title-1">钻石设计师：</view>平均15年以上设计经验，平均服务业主500+，平均拥有十项及以上设计师相关身份认证；
          </view>
          <view class="desc">
            根据设计师级别不同，服务费也会有所差异，以购买时实际支付费用为准。
          </view>
        </view>
        <view v-if="descType == 'worker'">
          <view class="desc">
            <view class="sub-title-1">中级工人：</view>在平台服务工地数量20个以上；
          </view>
          <view class="desc">
            <view class="sub-title-1">高级工人：</view>在平台服务工地数量30个以上；
          </view>
          <view class="desc">
            <view class="sub-title-1">特级工人：</view>在平台服务工地数量40个以上；
          </view>
          <view class="desc">
            <view class="sub-title-1">钻石级工人：</view>在平台服务工地数量50个以上；
          </view>
          <view class="desc">
            根据工人级别不同，服务费也会有所差异，以购买时实际支付费用为准。
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import GroupRadioMe from "../radio-group-me/radio-group-me.vue"
  export default {
    components: {
      GroupRadioMe
    },
    props: ["dataList", "current", "descType"],
    data() {
      return {
        radioValue: null,
        currentLevel: null
      }
    },
    mounted() {
      this.currentLevel = this.current
    },
    watch: {
      current(value) {
        this.currentLevel = value
      }
    },
    methods: {
      change(value) {
        this.radioValue = value
        this.currentLevel = this.dataList.filter(t => t.value == value)[0]
      },
      lookdesc() {
        this.$refs.levelDesc.open("bottom")
      },
      close() {
        this.$refs.levelDesc.close()
      },
      cancel() {
        this.$emit("close")
      },
      ok() {
        this.$emit("changeLevel", this.currentLevel)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 586rpx;
    background: #fff;
    border-radius: 32rpx 32rpx 2rpx 2rpx;
    padding: 40rpx 32rpx 0;
    box-sizing: border-box;
    z-index: 9;
  }

  .top-bg {
    width: 750rpx;
    height: 146rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .title {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 64rpx;
    z-index: 9;

    .left {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;

      image {
        width: 32rpx;
        height: 32rpx;
      }

      view {
        height: 44rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #c5a58d;
        line-height: 44rpx;
      }
    }

    .right {
      view {
        height: 32rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #c5a58d;
        line-height: 32rpx;
      }

      image {
        width: 26rpx;
        height: 26rpx;
      }
    }
  }

  .r-d-g {
    margin-bottom: 62rpx;
    height: 98rpx;
    z-index: 9;
  }

  .line {
    height: 2rpx;
    background-color: #F0F0F0;
  }

  .price-count {
    text-align: center;
    height: 40rpx;
    opacity: 1;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
    padding: 42rpx 0 58rpx;
  }

  .btn-wrap {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 136rpx;
    background: #fefffe;

    .cancel {
      width: 326rpx;
      height: 88rpx;
      border: 2rpx solid #00bfb6;
      border-radius: 16rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #00bfb6;
      line-height: 88rpx;
    }

    .submit {
      width: 326rpx;
      height: 88rpx;
      opacity: 1;
      background: linear-gradient(135deg, #00bfaf, #00bfbc);
      border-radius: 16rpx;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 88rpx;
    }
  }

  .level-desc-wrap {
    background-color: #fff;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    padding-bottom: 48rpx;
    height: 75vh;

    .title-wrap {
      height: 103rpx;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      // padding: 16rpx;
      border-bottom: 2rpx solid #f2f2f2;
      margin-bottom: 48rpx;
      box-sizing: border-box;

      .d-title {
        flex: 1;
        height: 40rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 700;
        text-align: center;
        color: #333333;
        margin: 0 32rpx;
        // padding: 16rpx;
      }

      .close {
        width: 80rpx;
        height: 80rpx;
        margin-right: 16rpx;
        transform: rotate(45deg) scale(0.64, 0.64);
        font-size: 100rpx;
        line-height: 51rpx;
        font-weight: lighter;
      }
    }
  }

  .desc {
    margin: 0 32rpx 32rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    letter-spacing: 0rpx;
    margin-bottom: 24rpx;
    .sub-title-1 {
      font-weight: 600;
    }
  }
</style>
