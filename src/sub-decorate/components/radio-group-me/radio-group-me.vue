<template>
  <view class="radio-group">
    <view v-for="(item,index) in items" :key="item.value" class="radio" :class="{active: item.value === value}"
      @click="change(item.value)">
      <view class="top"></view>
      <view>{{item.label}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    },
    props: ["items", "defaultV"],
    methods: {
      change(value) {
        this.value = value
        this.$emit("change", value)
      }
    },
    mounted() {
      this.value = this.defaultV
    }
  }
</script>

<style lang="scss" scoped>
  .radio-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .radio {
      width: 162rpx;
      height: 98rpx;
      background: #f7f7f7;
      border-radius: 8rpx;
      opacity: 1;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #b4b4b4;
      line-height: 90rpx;
      box-sizing: border-box;
      border-radius: 8rpx;
      border: 1rpx solid #f7f7f7;

      .top {
        box-sizing: border-box;
        height: 8rpx;
        background: #f0f0f0;
        border-radius: 8rpx 8rpx 0rpx 0rpx;
      }
    }

    .active.radio {
      background: rgba(197, 165, 141, 0.07);
      border: 1rpx solid #c5a58d;
      border-radius: 8rpx;
      box-shadow: 0rpx 10rpx 8rpx 0rpx rgba(47, 33, 23, 0.04);

      .top {
        height: 8rpx;
        background: linear-gradient(90deg, #c5a58d, #f2ded0);
        // border-radius: 8rpx 8rpx 0rpx 0rpx;
      }
    }
  }
</style>
