<template>
  <view class="item-wrap">
    <view class="info-wrap">
      <view class="cover-wrap">
        <image class="cover" :src="itemData.spuImageUrl+'?x-oss-process=image/resize,m_mfit,w_150,h_150'">
        </image>
        <view class="type-1">{{itemData.type | filterType}}</view>
      </view>
      <view class="info">
        <view style="top">
          <view class="name-wrap">
            <view class="type">服务</view>
            <view class="spu-name">{{itemData.spuName}}</view>
          </view>
          <!-- <view class="name">{{itemData.skuName}}</view> -->
        </view>
        <view class="price">
          <view class="unit">￥</view>
          <view class="price-int">{{newPrice[0]}}</view>
          <view class="price-float">.{{newPrice[1]}}/{{itemData.unitName}}</view>
        </view>
      </view>
    </view>
    <view class="count-wrap">
      <view class="total">
        <text class="unit">￥</text>{{(itemData.newAmount/100).toFixed(2)}}
      </view>
      <view class="line"></view>
      <view class="volume-wrap">
        <view class="volume" :class="{'add': km[itemData.type] === '增加'}">
          {{km[itemData.type]}}{{itemData.newNumber.toFixed(2)}}{{itemData.unitName}}</view>
        <!-- 减量 -->
        <view class="jian" v-if="itemData.type === 3 || itemData.type === 4">
          已购买：{{itemData.oldNumber.toFixed(2)}}{{itemData.unitName}}；剩余：{{((itemData.oldNumber-itemData.newNumber)*100/100).toFixed(2)}}{{itemData.unitName}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: ["itemData"],
    data() {
      return {
        km: [" ", "增加", "增加", "减少", "减少"]
      }
    },
    computed: {
      newPrice() {
        return (this.itemData.newPrice / 100).toFixed(2).split(".")
      }
    },
    filters: {
      filterType(type) {
        let result = ""
        switch (type) {
          case 1:
            result = "增项"
            break;
          case 2:
            result = "增量"
            break;
          case 3:
            result = "减项"
            break;
          case 4:
            result = "减量"
            break;
          default:
            result = "未知"
            break;
        }
        return result
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

    .cover-wrap {
      width: 150rpx;
      height: 150rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
      position: relative;

      .cover {
        width: 150rpx;
        height: 150rpx;
        border-radius: 8rpx;
      }

      .type-1 {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 0 0 8rpx 8rpx;
        width: 150rpx;
        height: 42rpx;
        line-height: 42rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }
  }

  .name-wrap {
    width: 520rpx;
    max-height: 64rpx;
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
      max-height: 64rpx;
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
    padding: 0 32rpx;
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
    height: 36rpx;
    font-size: 30rpx;
    font-family: PriceFont;
    font-weight: 400;
    text-align: left;
    color: #ff3347;
    line-height: 40rpx;

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

  .volume-wrap {}

  .volume {
    height: 26rpx;
    font-size: 22rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 26rpx;
  }
  .volume.add {
    line-height: 24rpx;
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
