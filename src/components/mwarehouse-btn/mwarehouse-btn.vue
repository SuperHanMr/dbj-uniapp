<template>
  <view class="wrap" @click="gotoPage">
    <!-- <image class="icon" :style="iconStyle" :src="iconUrl"></image> -->
    <image class="icon" :src="iconUrl"></image>
    <view class="name">{{name}}</view>
  </view>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: ""
      },
      // iconStyle: {
      //   type: Object,
      //   default: ""
      // },
      name: {
        type: String
      },
      iconUrl: {
        type: String
      }
    },
    methods: {
      gotoPage() {
        this.$emit("gotoPage")
      }
    }
  }
</script>

<style scoped>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 72rpx;
  }
  .icon {
    margin-bottom: 8rpx;
    /* border: 2rpx solid #666; */
    width: 64rpx;
    height: 64rpx;
    /* border-radius: 25rpx; */
  }
  .name {
    width: 72rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
