<template>
  <view class="bt-btn-wrap flex-row" :style="{paddingBottom:systemBottom,height:systemHeight}">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        containerBottom: null,
        systemBottom: null,
        systemHeight: null
      }
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
      this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
    },
  }
</script>

<style scoped>
  .bt-btn-wrap {
    background-color: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 24rpx 32rpx;
  }
</style>
