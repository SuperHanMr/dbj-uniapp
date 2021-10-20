<template>
  <view class="material-content">
    <image :src="content.product.skuImage" @click="goDetail"></image>
    <view class="con">
      <view class="subtitle" @click="goDetail">{{content.product.spuName}}</view>
      <view class="desc-area" @click="goDetail">
        <text>{{content.product.skuName}}</text>
        <text>{{content.product.sku.minimumOrderQuantity}}{{content.product.salesUnit.unitName}}</text>
      </view>
      <view class="check-price">
        <view class="price">
          <text class="t1">￥</text><text class="t2">{{content | filterShowPrice}}</text></text>
        </view>
        <slot name="radio"></slot>
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
      }
    },
    methods: {
      goDetail() {
        uni.setStorageSync('goodId', this.content.product.skuId)
        uni.navigateTo({
          url: "/sub-classify/pages/goods-detail/goods-detail"
        })
      }
    },
    filters: {
      filterShowPrice(content) {
        let deposit = content.product.sku.deposit ?? 0
        return (content.product.skuPrice + Number(deposit)) / 100
      }
    }
  }
</script>

<style lang="scss" scoped>
  .material-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx 32rpx;
    background: #fff;
    // border-radius: 16rpx;
    width: 100%;

    image {
      width: 176rpx;
      height: 176rpx;
      opacity: 1;
      border-radius: 12rpx;
      margin-right: 16rpx;
      // margin-left: 16rpx;
    }
    .con {
      flex: 1;
    }

    .subtitle {
      width: 454rpx;
      opacity: 1;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333;
      line-height: 36rpx;
      margin-bottom: 8rpx;
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
    }

    .check-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }

    .price {
      text-align: right;

      .t1 {
        height: 24rpx;
        font-size: 20rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #29c7c7;
        line-height: 24rpx;
      }

      .t2 {
        height: 28rpx;
        font-size: 28rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #29c7c7;
        line-height: 28rpx;
      }

      .t3 {
        height: 22rpx;
        font-size: 24rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #35c4c4;
        line-height: 24rpx;
      }
    }
  }
</style>
