<template>
  <view class="check-box-e" :class="{'checked': checked}" @click="change"
    :style="{width: width, height: height, borderRadius: borderRadius}">
    <image v-if="checked" :style="{width: width, height: height, borderRadius: borderRadius}" class="checked-img"
      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_checked.svg"></image>
  </view>
</template>

<script>
  export default {
    props: {
      width: {
        type: String,
        default: "32rpx",
      },
      height: {
        type: String,
        default: "32rpx",
      },
      borderRadius: {
        type: String,
        default: "10rpx",
      },
      checked: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      change() {
        this.$emit("change", !this.checked)
      }
    }
  }
</script>

<style scoped lang="scss">
  .check-box-e {
    box-sizing: border-box;
    border: 1rpx solid #bababa;

    .checked-img {
      width: 32rpx;
      height: 32rpx;
    }
  }

  .checked {
    border: 1rpx solid transparent;
  }
</style>
