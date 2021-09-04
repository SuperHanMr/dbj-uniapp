<template>
  <view class="notice" :style="{height:systemHeight}">
    <view class="notice-mask"  ></view>
    <view class="notice-view">
      <scroll-view class="item-list" scroll-y="true">
        <view
          class="notice-item"
          @click="to(0)"
        >
          <view class="item-top">
            <view class="item-top-left">
              <image
                src="../../static/home_owner.png"
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
        >
          <view class="item-top">
            <view class="item-top-left">
              <image
                src="../../static/home_owner.png"
                mode=""
              ></image>
              <text class="item-title">量房交付</text>
            </view>
            <text class="item-top-right">2021-08-21 13:00:00</text>
          </view>
          <view class="item-content">
            <text>有量房员交付啦，请确认</text>
            <image src="../../static/images/ic_more_black.svg"></image>
          </view>
        </view>
        <view
          class="notice-item"
          @click="to(2)"
        >
          <view class="item-top">
            <view class="item-top-left">
              <image
                src="../../static/home_owner.png"
                mode=""
              ></image>
              <text class="item-title">验房交付</text>
            </view>
            <text class="item-top-right">2021-08-21 13:00:00</text>
          </view>
          <view class="item-content">
            <text>有量房员交付啦，请确认</text>
            <image src="../../static/images/ic_more_black.svg"></image>
          </view>
        </view>
        <view
          class="notice-item"
          @click="to(1)"
        >
          <view class="item-top">
            <view class="item-top-left">
              <image
                src="../../static/home_owner.png"
                mode=""
              ></image>
              <text class="item-title">量房交付</text>
            </view>
            <text class="item-top-right">2021-08-21 13:00:00</text>
          </view>
          <view class="item-content">
            <text>有量房员交付啦，请确认</text>
            <image src="../../static/images/ic_more_black.svg"></image>
          </view>
        </view>
        <view
          class="notice-item"
          @click="to(1)"
        >
          <view class="item-top">
            <view class="item-top-left">
              <image
                src="../../static/home_owner.png"
                mode=""
              ></image>
              <text class="item-title">量房交付</text>
            </view>
            <text class="item-top-right">2021-08-21 13:00:00</text>
          </view>
          <view class="item-content">
            <text>有量房员交付啦，请确认</text>
            <image src="../../static/images/ic_more_black.svg"></image>
          </view>
        </view>
        <view
          class="notice-item"
          @click="to(1)"
        >
          <view class="item-top">
            <view class="item-top-left">
              <image
                src="../../static/home_owner.png"
                mode=""
              ></image>
              <text class="item-title">量房交付</text>
            </view>
            <text class="item-top-right">2021-08-21 13:00:00</text>
          </view>
          <view class="item-content">
            <text>有量房员交付啦，请确认</text>
            <image src="../../static/images/ic_more_black.svg"></image>
          </view>
        </view>
        </scroll-view>
        <view
          class="close-icon"
        >
          <image
            src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle.svg"
            mode=""
            @click="close()"
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
        "/sub-decorate/pages/amoutDelivery/amoutDelivery",
        "/sub-decorate/pages/checkResult/checkResult",
      ],
      systemHeight:''
    };
  },
  mounted(){
    this.systemHeight = wx.getSystemInfoSync().windowHeight + 'px'
    
  },
  methods: {
    close() {
      // console.log(123)
      this.$emit("closeNotice");
    },
    to(param) {
      uni.navigateTo({
        url: this.urlList[param],
      });
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  .notice-view{
    position: relative;
    height: 100%;
  }
  .item-list {
    position: absolute;
    width: 100%;
    bottom: 100rpx;
    height: 1000rpx;
    // padding: 24rpx;
    z-index: 101;
    
  }
  .close-icon {
    position: absolute;
    bottom: 0;
    // margin-top: 88rpx ;
    text-align: center;
    width: 100%;
    z-index: 111;
    image {
      width: 50rpx;
      height: 50rpx;
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
      padding: 0 8rpx;
      .item-top-left {
        image {
          // font-size: 26rpx;
          width: 32rpx;
          height: 32rpx;
          margin-right: 16rpx;
          vertical-align: middle;
        }
        text {
          color: #333;
          font-size: 28rpx;
          font-weight: 400;
          vertical-align: middle;
        }
      }
      .item-top-right {
        font-size: 24rpx;
        color: #999;
      }
    }
    .item-content {
      height: 104rpx;
      line-height: 104rpx;
      background: #fbfbfb;
      border-radius: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16rpx 0 24rpx;
      margin-top: 24rpx;
      text {
        color: #333;
        font-size: 30rpx;
        font-weight: 500;
      }
      image {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
  .notice-mask {
    position: absolute;
    width: 100%;
    height: 100vh;
    // top: -304rpx;
    // background-color: #000;
    // opacity: 0.8;
    z-index: 100;
    // filter: blur(10rpx);
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16rpx);
  }
}
</style>
