<template>
  <view class="notice">
    <view
      class="notice-mask"
      @click="close()"
    ></view>
    <view class="item-list">
      <view
        class="notice-item"
        @click="to(0)"
      >
        <view class="item-top">
          <view class="item-top-left">
            <image
              src="../../pages/login/imgs/Lark20210823-152715.png"
              mode=""
            ></image>
            <text class="item-title">量房服务</text>
          </view>
          <text class="item-top-right">2021-08-21 13:00:00</text>
        </view>
        <view class="item-content">
          <text>有量房员接单啦，请确认</text>
          <image src="../../static/images/ic_more_black.svg"></image>
        </view>
      </view>
      <view
        class="notice-item"
        @click="to(1)"
      >量房交付</view>
      <view
        class="close-icon"
        @click="close()"
      >
        <image
          src="../../static/images/ic_cancel_white.svg"
          mode=""
        ></image>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: "decorate-notice",
  data() {
    return {
      urlList: [
        "/pages/decorate/grab/grab",
        "/sub-home/pages/decorate/amoutDelivery/amoutDelivery",
      ],
    };
  },
  methods: {
    close() {
      // console.log(123)
      this.$emit("closeNotice");
    },
    to(param) {
      this.close();
      uni.navigateTo({
        url: this.urlList[param],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .item-list {
    position: absolute;
    width: 100%;
    bottom: 0;
    // padding: 24rpx;
    z-index: 11;
    .close-icon {
      margin: 88rpx 0 48rpx;
      text-align: center;
      image {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }
  .notice-item {
    background-color: #fff;
    margin: 24rpx;
    // width: 351px;
    height: 168rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 12px;
    padding: 32rpx 24rpx;
    // z-index: 11;
    .item-top {
      display: flex;
      justify-content: space-between;
      .item-top-left {
        image {
          font-size: 26rpx;
        }
      }
    }
  }
  .notice-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    // background-color: #000;
    // opacity: 0.8;
    z-index: 10;
    // filter: blur(10rpx);
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
  }
}
</style>
