<template>
  <view class="unsupported-element">
    不支持的消息类型
  </view>
</template>

<script>
export default {
  name: "UnsupportedElement",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isMine() {
      return this.message.flow === "out";
    },
    payload() {
      if (!this.message) {
        return {};
      }
      return this.message.payload;
    },
  },
};
</script>

<style>
.unsupported-element {
  color: #808080;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 24rpx;
}
</style>
