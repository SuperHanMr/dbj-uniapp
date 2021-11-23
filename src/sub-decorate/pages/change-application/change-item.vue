<template>
  <view class="item-wrap">
    <view class="info-wrap">
      <image class="cover"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F201403%2F29%2F20140329145413_hw4HA.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640159046&t=cda8819804ff701c21d17d857a0110f1">
      </image>
      <view class="info">
        <view class="name-wrap">
          <view class="type">服务</view>
          <view class="spu-name">名称名称名称名称名称名称名称名称名称名称称名名称称名名称称名名称称称称名名称称名名称称名名称称称称名</view>
        </view>
        <view class="name">规格规格规格规格规规格规格规规格规规格规格规规格规格规格规格规规格规格规规格规规格规格规</view>
        <view class="price">
          <view class="unit">￥</view>
          <view class="price-int">10</view>
          <view class="price-float">.00</view>
        </view>
      </view>
    </view>
    <view class="count-wrap">
      <view class="total">
        <text class="unit">￥</text>800.85
      </view>
      <view class="line"></view>
      <view class="volume-wrap">
        <view class="volume">{{km[type]}}99999.99</view>
        <!-- 减量 -->
        <view class="jian" v-if="type === 0">
          已购买：9999.85；剩余：0.00
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: ["type"],
    data() {
      return {
        km: ["减量", "增量"]
      }
    }
  }
</script>

<style scoped lang="scss">
  .item-wrap {
    padding: 32rpx 32rpx 16rpx;
  }

  .info-wrap {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 24rpx;

    .cover {
      width: 150rpx;
      height: 150rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }

    .info {
      flex: 1;
    }
  }

  .name-wrap {
    width: 520rpx;
    height: 64rpx;
    margin-bottom: 8rpx;
    position: relative;

    .type {
      position: absolute;
      left: 0;
      top: 0;
      width: 60rpx;
      box-sizing: border-box;
      text-align: center;
      height: 30rpx;
      line-height: 26rpx;
      border: 1rpx solid #999999;
      border-radius: 4rpx;
      font-size: 20rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #999;
    }

    .spu-name {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      width: 520rpx;
      text-indent: 70rpx;
      height: 64rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 32rpx;
    }
  }

  .name {
    width: 520rpx;
    height: 26rpx;
    font-size: 22rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999;
    line-height: 26rpx;
    margin-bottom: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    font-family: PriceFont;
    align-items: flex-end;

    .unit {
      height: 32rpx;
      font-size: 22rpx;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 34rpx;
    }

    .price-int {
      height: 32rpx;
      font-size: 32rpx;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 32rpx;
    }

    .price-float {
      height: 32rpx;
      font-size: 22rpx;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 36rpx;
    }
  }

  .count-wrap {
    padding: 16rpx 32rpx;
    height: 88rpx;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    background: #fafafa;
    border: 1rpx solid #f0f0f0;
    border-radius: 12rpx;
  }

  .total {
    height: 26rpx;
    font-size: 30rpx;
    font-family: PriceFont;
    font-weight: 400;
    text-align: left;
    color: #ff3347;
    line-height: 26rpx;

    .unit {
      font-size: 24rpx;
    }
  }

  .line {
    width: 2rpx;
    height: 16rpx;
    background: #cfcfcf;
    margin: 0 24rpx 0 26rpx;
  }
  .volume{
    height: 26rpx;
    font-size: 22rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 26rpx;
  }
  .jian {
    padding-top: 4rpx;
    height: 26rpx;
    font-size: 20rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    line-height: 26rpx;
  }
</style>
