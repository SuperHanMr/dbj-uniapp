<template>
  <view class="wrap">
    <view class="pieces-price-unit">
      <view class="pieces">共{{pieces}}件</view>
      <view class="price-wrap">
        <view class="unit">总计：<text style="color: #FA3E24;">￥</text></view>
        <view class="price">{{__countPrice[0]}}</view>
        <view class="flot">.{{__countPrice[1]}}</view>
      </view>
    </view>
    <view class="wrp-btn">
      <button class="btn" :disabled="!isAllChecked" :class="{ disabled: !isAllChecked }" @click="gotopay">去结算</button>
    </view>
  </view>
</template>

<script>
  export default {
    name: "Payment",
    props: {
      pieces: {
        type: Number,
        default: 0
      },
      countPrice: {
        type: Number,
        default: 0
      },
      isAllChecked: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      __countPrice() {
        return (this.countPrice / 100).toFixed(2).split(".")
        // if (this.countPrice == 0) {
        //   return ["0", "00"]
        // }
        // if (String(this.countPrice).indexOf(".") == -1) {
        //   return [this.countPrice, "00"]
        // } else {
        //   return String(this.countPrice).split(".")
        // }

      }
    },
    data() {
      return {}
    },
    methods: {
      checkPrice(value) {
        var re = /^[1-9]+[0-9]*]*$/;
        return re.test(value)
      },
      gotopay() {
        this.$emit("gotopay")
      },
    },
    filters: {
      filterLength(val) {
        val = val.length <= 2 ? val : val.slice(0, 2)
        return val
      }
    },
    watch: {
      pieces(val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    height: 112rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .pieces-price-unit {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: Unnamed, Unnamed-Regular;

    .pieces {
      letter-spacing: 0;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      line-height: 40rpx;
      color: #999999;
    }

    .price-wrap {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: flex-end;
      height: 72rpx;
    }

    .unit {
      letter-spacing: 0;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: left;
      line-height: 56rpx;
      color: #333333;
    }

    .price {
      letter-spacing: 0;
      font-size: 48rpx;
      font-family: Unnamed, Unnamed-Regular;
      font-weight: 400;
      text-align: left;
      color: #FA3E24;
      vertical-align: bottom;
      line-height: 72rpx;
    }

    .flot {
      letter-spacing: 0;
      font-size: 30rpx;
      font-family: Unnamed, Unnamed-Regular;
      font-weight: 400;
      text-align: left;
      line-height: 58rpx;
      color: #FA3E24;
    }
  }

  .wrp-btn {
    margin-top: 24rpx;
  }

  .btn {
    margin: 0;
    box-sizing: border-box;
    width: 248rpx;
    height: 88rpx;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
    border-radius: 12rpx;
    border: 1rpx solid transparentize;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 88rpx;
  }

  .btn.disabled {
    opacity: 0.5;
    background: linear-gradient(117.02deg, rgba(250, 59, 52, 0.4) 24.56%, rgba(255, 106, 51, 0.4) 92.21%), #FFFFFF;
    color: #ffffff;
  }
</style>
