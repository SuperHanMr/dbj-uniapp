<template>
  <view class="service-content">
    <slot name="radio"></slot>
    <image @click="goDetail" class="avotr" :src="content.imageUrl"></image>
    <view style="flex: 1">
      <view class="subtitle" @click="goDetail">{{content.spuName}}</view>
      <view class="desc-area" @click="goDetail">
        <text>按平方米计价</text>
        <text>x {{content.insideArea || 1}}m²</text>
      </view>
      <view class="price">
        <view class="t1">￥</text><text class="t2">{{(content.price/100).toFixed(2)}}</text><text class="t3">/m²</text></view>
        <view class="change" @click="selectAnother">
          <view class="change-t">更换</view>
          <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/arrow-r-gr.svg" class="change-img"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      content: {
        type: Object,
        required: true
      },
    },
    methods: {
      selectAnother() {
        this.$emit("selectAnother")
      },
      goDetail() {
        uni.setStorageSync('goodId', this.content.id)
        uni.navigateTo({ url: "/sub-classify/pages/goods-detail/goods-detail" })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 48rpx;
    padding: 16rpx;
    background: #f5f6f6;
    border-radius: 16rpx;

    .avotr {
      width: 136rpx;
      height: 136rpx;
      opacity: 1;
      border-radius: 12rpx;
      margin-right: 16rpx;
    }

    .subtitle {
      // width: 446rpx;
      // height: 36rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 36rpx;
      margin-bottom: 8rpx;
      margin-right: 8rpx;
    }

    .desc-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32rpx;
      font-size: 22rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 32rpx;
      margin-bottom: 30rpx;
      margin-right: 8rpx;
    }

    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;

      .t1 {
        height: 24rpx;
        font-size: 20rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #333;
        line-height: 24rpx;
      }

      .t2 {
        height: 28rpx;
        font-size: 28rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #333;
        line-height: 28rpx;
      }

      .t3 {
        height: 22rpx;
        font-size: 24rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #333;
        line-height: 24rpx;
      }
    }
  }

  .change {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .change-t {
      // width: 44rpx;
      height: 32rpx;
      font-size: 22rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: left;
      color: #00c2b8;
      line-height: 32rpx;
      margin-right: 4rpx;
    }
    .change-img {
      width: 20rpx;
      height: 20rpx;
      
    }
  }
</style>
