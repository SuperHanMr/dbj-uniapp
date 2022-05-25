<template>
  <view class="wrap">
    <button class="btn btn-refuse" @click="gotopay">拒绝申请</button>
    <button class="btn btn-agree" @click="gotopay">同意并支付<text class="symbol">￥</text>{{countPrice}}</button>
  </view>
</template>

<script>
  export default {
    name: "Payment",
    props: {
      countPrice: {
        type: Number,
        default: 0
      },
    },
    computed: {
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
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    margin: 0;
    box-sizing: border-box;
    height: 88rpx;
    border-radius: 12rpx;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    line-height: 88rpx;
  }

  .btn-agree {
    width: 466rpx;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
    border: 1rpx solid transparentize;
    color: #ffffff;
    .symbol {
      font-size: 24rpx
    }
  }

  .btn-refuse{
    border: 1rpx solid #cccccc;
    background: #ffffff;
    color: #666666;
  }

</style>
