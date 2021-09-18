<template>
  <view class="current-cost">
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url:'app-pages/beauty-report/?themeId=2&id=3'
      }
    },
    onLoad(e){
      let themeId = e.themeId
      let id = e.id
      this.url = process.env.VUE_APP_BASE_H5+this.url + themeId + '&id=' + id +'&token='+getApp().globalData.token
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
  .cost-item {
    width: 100%;
    height: 256rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 12px;

    .item-top {
      height: 120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 46rpx 0 32rpx;

      .item-top-left {
        .icon {
          width: 40rpx;
          height: 40rpx;
          // margin-right: 16rpx;
          display: inline-block;
          vertical-align: middle;
        }

        .title {
          font-size: 30rpx;
          font-weight: 500;
          color: #333;
          margin: 0 16rpx;
        }

        .tip {
          font-size: 22rpx;
          font-weight: 500;
          color: #999;
        }
      }

      .item-top-right {
        font-weight: 500;
        color: #333;
        font-size: 36rpx;

        text {
          font-size: 24rpx;
        }
      }
    }

    .item-content {
      margin: 0 24rpx;
      padding: 0 22rpx 0 24rpx;
      height: 52px;
      opacity: 1;
      background: #fbfbfb;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      .line{
        display: inline-block;
        width: 12rpx;
        border-bottom: 1px solid #c7c7c7;
        // height: 52rpx;
        vertical-align: middle;
      }
      .text {
        font-size: 26rpx;
        font-weight: 500;
        display: inline-block;
        margin-left: 28rpx;
      }

      .item-content-right {
        font-size: 20rpx;
        text {
          font-size: 32rpx;
        }
      }
    }
  }
</style>
