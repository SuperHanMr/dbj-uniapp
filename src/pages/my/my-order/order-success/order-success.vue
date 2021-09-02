<template>
  <view class="container">
    <!-- 订单完成/确认收货 -->
    <view class="order-container">
      <view class="order-status">
        <view class="status">
          <image
            src="@/static/order/ic_order_success@2x.png"
            mode=""
          ></image>
          <text>退款成功</text>
        </view>
        <text class="time">2021-01-12 16:58:26</text>
      </view>

      <order-user-base-info></order-user-base-info>

      <view class="body2">
        <view class="part1">
          <view class="header">
            <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
            <image
              src="../../../../static/order/ic_more@2x.png"
              mode=""
            ></image>
          </view>
          <order-item></order-item>
          <view class="price-special"></view>
        </view>
      </view>
      <order-price></order-price>

      <view class="order-header1">
        <view class="refund-price">
          <text>退款总金额</text>
          <view style="color:#FF3347;">
            <text style="font-size:26rpx;">￥</text>
            <text style="font-size:40rpx;">8888.</text>
            <text style="font-size:26rpx;">00</text>
          </view>
        </view>
        <view class="router">
          <text style="color: #999999;font-size: 26rpx;">原路径返回微信</text>
          <view>
            <text style="font-size: 20rpx;">￥</text>
            <text style="font-size:28rpx;">8888</text>
            <text style="font-size:20rpx;">.00</text>
          </view>
        </view>
      </view>

      <view class="body1">
        <order-item></order-item>
      </view>

      <order-refund-info></order-refund-info>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 100rpx;
  // background-color: skyblue;
  .order-container {
    .order-status {
      width: 100%;
      height: 140rpx;
      color: #ffffff;
      background-color: pink;
      background-size: 100% 172rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .status {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 8rpx;
        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-right: 12rpx;
        }
        text {
          font-size: 48rpx;
          font-weight: 500;
          color: #ffffff;
        }
      }

      .time {
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        font-weight: 400;
      }
    }

    .order-header1 {
      height: 170rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 32rpx;
      color: #333333;
      font-size: 30rpx;
      box-sizing: border-box;
      flex: 1;
      margin-bottom: 16rpx;
      .refund-price,
      .router {
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16rpx;
      }
    }

    .body1 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 16rpx;
    }

    .body2 {
      background: #ffffff;
      border-radius: 24rpx;
      .part1 {
        padding: 32rpx 32rpx 0;
        border-radius: 24rpx 24rpx 0 0;
        background: #ffffff;
        .header {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          flex-flow: row nowrap;
          padding-bottom: 32rpx;
          text {
            font-weight: 1000;
            max-width: 476rpx;
            font-size: 28rpx;
            line-height: 40rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333333;
          }

          image {
            width: 34rpx;
            height: 34rpx;
            object-fit: cover;
          }
        }
      }
    }

    .refund-info {
      display: flex;
      flex-flow: column nowrap;
      padding: 32rpx;
      border-radius: 24rpx;
      background: #ffffff;
      color: #333333;
      .header {
        font-size: 30rpx;
        font-weight: 1000;
        height: 48rpx;
        line-height: 48rpx;
        margin-bottom: 16rpx;
      }
      .item {
        font-size: 28rpx;
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-bottom: 16rpx;
        .item-header {
          width: 140rpx;
          height: 40rpx;
          line-height: 40rpx;
          color: #999999;
          display: block;
          flex: 1;
        }
        .item-body {
          width: 546rpx;
          line-height: 40rpx;
          display: flex;
          flex-flow: row nowrap;
        }
      }
      .item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
}
.copy-style {
  display: block;
  width: 72rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 8rpx;
  text-align: center;
  border: 2rpx solid #eaeaea;
  font-size: 20rpx;
  color: #111111;
}
</style>
