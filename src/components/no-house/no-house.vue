<template>
  <view ref="nggg" class="no-house" v-if="showNoHouse" :style="{display: showNoHouse ? 'flex' : 'none'}">
    <view class="nnn">
      <button class="add-house" @click="goAddHouse">
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_add_house.svg"></image>
        <text>添加房屋信息</text>
      </button>
      <view class="decorate-yf">
        <view class="wrap decorate" @click="goNoHouseDecorate">
          <view class="bg">
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_decorate.svg"></image>
          </view>
          <text>进行装修服务</text>
        </view>
        <view class="wrap yf" @click="goCheckService">
          <view class="bg">
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_checkhouse.svg"></image>
          </view>
          <text>进行验房服务</text>
        </view>
      </view>
      <view class="cancel-wrap">
        <image class="cancel" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_cancel.svg"
          @click="gobackHome"></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      showNoHouse: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this.$refs.nggg.style.display = "flex"
      // }, 200)
    },
    methods: {
      goNoHouseDecorate() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-decorate/no-house-decorate?type=decorate",
        });
      },
      goCheckService() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-decorate/no-house-decorate?type=checkHouse",
        });
      },
      goAddHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house?type=decorate",
        });
      },
      gobackHome() {
        const {
          currentRoute
        } = getApp().globalData
        uni.switchTab({
          url: currentRoute,
          success() {
            uni.showTabBar()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .no-house {
    width: 750rpx;
    height: 100vh;
    opacity: 1;
    background: rgba(255, 255, 255, 0.60);
    backdrop-filter: blur(16rpx);
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    display: none;
  }

  .add-house {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #fff;
    margin: 0 64rpx;
    height: 112rpx;
    opacity: 1;
    border: 2rpx solid #333333;
    border-radius: 32rpx;

    image {
      width: 28rpx;
      height: 28rpx;
      margin-right: 24rpx;
    }

    text {
      height: 44rpx;
      opacity: 1;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
      line-height: 44rpx;
    }
  }

  .decorate-yf {
    margin: 72rpx 92rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      .bg {
        width: 128rpx;
        height: 128rpx;
        // opacity: 1;
        // margin: 0 14rpx;
        // border-radius: 52rpx;
        // box-sizing: border-box;
        // display: flex;
        // justify-content: center;
        // align-items: center;

        image {
          width: 128rpx;
          height: 128rpx;
        }
      }

      text {
        margin-top: 24rpx;
        width: 156rpx;
        height: 36rpx;
        opacity: 1;
        font-size: 26rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #333333;
        line-height: 36rpx;
      }
    }

    // .decorate {
    //   .bg {
    //     background: #a591d4;
    //   }
    // }

    // .yf {
    //   .bg {
    //     background: #15d3ab;
    //   }
    // }
  }

  .cancel-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 96rpx;
    margin-bottom: 116rpx;

    .cancel {
      width: 50rpx;
      height: 50rpx;
      opacity: 1;
    }
  }
  // .nnn {
  //   animation: sport 1s;
  //   transform: translateY(0rpx);
  // }
  // @keyframes sport {
  //   0% {
  //     transform: translateY(160rpx);
  //     opacity: 1;
  //   }

  //   25% {
  //     transform: translateY(100rpx);
  //     opacity: 1
  //   }

  //   50% {
  //     transform: translateY(40rpx);
  //     opacity: 1
  //   }

  //   100% {
  //     transform: translateY(0rpx);
  //     opacity: 1
  //   }
  // }
</style>
