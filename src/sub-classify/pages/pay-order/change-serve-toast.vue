<template>
  <view class="good-toast">
    <uni-popup ref="safeToast" type="bottom" @maskClick="close">
      <view class="close" @click="close"></view>
      <view class="toast-content">
        <view class="title">修改服务</view>
        <view class="serve-warp">
          <view class="serve-title">
            <view class="first-box">
              <view class="measuring-icon"></view>
              <view>量房服务</view>
            </view>
            <view class="second-box">
              <view>包含免费远程量房服务</view>
              <!-- <view class="read-icon"></view> -->
            </view>
          </view>
          <view class="serve-card-box" @click="selectScene">
            <view class="serve-unselected" :class="{'serve-selected': !isPropsRemove}"></view>
            <view class="serve-card">
              <view class="card-price">
                <view>现场量房：{{price}}元</view>
              </view>
              <view class="card-area">可服务区域：
                <text v-for="(v, k) in measuringArea" :key="k">
                  {{(v.province?v.province:"") + (v.city?v.city:"") + (v.area?v.area:"")}}
                  <text v-if="k !== measuringArea.length - 1">,
                  </text>
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    props: {
      isPropsRemove: true,
      price: '0',
      measuringArea: []
    },
    data() {
      return {
        isRemove: this.isPropsRemove,
      }
    },
    watch: {
      isPropsRemove(v) {
        this.isRemove = v
      }
    },
    methods: {
      showPupop() {
        this.$refs.safeToast.open()
      },
      close() {
        this.$refs.safeToast.close()
        this.$emit("isRemove", this.isRemove)
      },
      selectScene() {
        this.isRemove = !this.isRemove
        console.log(this.isRemove, "this.isRemove9999999")
        this.$refs.safeToast.close()
        this.$emit("isRemove", this.isRemove)
      }
    }
  }
</script>

<style scoped lang="scss">
  .good-toast {
    position: relative;
  }

  .close {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    top: 14rpx;
    right: 14rpx;
    background-image: url("../../static/image/close.png");
    background-size: contain;
  }

  .toast-content {
    max-height: 1000rpx;
    overflow: scroll;
    background-color: #f5f6f7;
    border-radius: 16px 16px 0px 0px;
  }

  .title {
    height: 100rpx;
    font-size: 32rpx;
    color: #333333;
    font-weight: 500;
    text-align: center;
    line-height: 100rpx;
  }

  .serve-warp {
    border-top: 1rpx solid #f5f5f5;
    padding: 48rpx 30rpx 48rpx 30rpx;

    .serve-title {
      display: flex;
      justify-content: space-between;

      .first-box {
        font-size: 26rpx;
        color: #333;
        display: flex;
        align-items: center;

        .measuring-icon {
          width: 32rpx;
          height: 32rpx;
          background-image: url("../../static/image/measuring-icon.png");
          background-size: contain;
          margin-right: 12rpx;
        }
      }

      .second-box {
        font-size: 24rpx;
        color: #666;
        display: flex;
        align-items: center;

        .read-icon {
          width: 24rpx;
          height: 24rpx;
          background-image: url("../../static/image/read-icon.png");
          background-size: contain;
          margin-left: 12rpx;
        }
      }
    }

    .serve-card-box {
      display: flex;
      margin-top: 36rpx;
      align-items: center;

      .serve-unselected {
        min-width: 48rpx;
        height: 48rpx;
        background-image: url("../../static/image/serve-unselected.png");
        background-size: contain;
      }

      .serve-selected {
        background-image: url("../../static/image/serve-selected.png");
        background-size: contain;
      }

      .serve-card {
        padding: 24rpx 32rpx;
        border: 1rpx solid #e0e0e0;
        border-radius: 12rpx;
        background-color: #fefffe;
        width: 100%;
        .card-price {
          font-size: 26rpx;
          color: #333333;
          display: flex;
          align-items: center;
        }

        .card-area {
          margin-top: 12rpx;
          color: #999;
          font-size: 22rpx;
        }
      }
    }
  }
</style>
