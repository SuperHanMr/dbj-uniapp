<template>
  <view class="check-box-e" :class="{'checked': checked}" @click="change"
    :style="{width: width, height: height,lineHeight:height,borderRadius: borderRadius}">
    
   <image v-if="checked" :style="{width: width, height: height, borderRadius: borderRadius}" class="checked-img"
      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/ic_checked.svg"></image>
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
        default: "50%",
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
      // background: linear-gradient(134.53deg, #6D6D6D 5.36%, #333333 100.8%);
    }
  }

  .checked {
    border: 1rpx solid transparent;
  }
</style>
