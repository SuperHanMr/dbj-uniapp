<template>
  <view class="group-tip-element">
    <view class="group-tip-content">
      {{ text }}
    </view>
  </view>
</template>

<script>
import { getTextFromGroupTipMessage } from "@/utils/group-util.js";
export default {
  name: "GroupTipElement",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    text() {
      if (this.message.from === "administrator") {
        return this.message.payload.text;
      }
      return getTextFromGroupTipMessage(this.message);
    },
  },
};
</script>

<style>
.group-tip-element {
  padding: 24rpx 0;
  display: flex;
  justify-content: center;
}
.group-tip-content {
  color: #808080;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  /* padding: 24rpx 32rpx;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 120rpx; */
}
</style>
