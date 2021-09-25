<template>
  <view class="tip2-template">
    <view class="tip2-element">
      {{ content }}
    </view>
  </view>
</template>

<script>
import { compileTemplateStr as compile } from "@/utils/util.js";
export default {
  name: "Tip2Template",
  props: {
    template: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    data() {
      return this.message.payloadData.params || {};
    },
    content() {
      return compile(this.template.body.content)(this.data);
    },
  }
};
</script>

<style>
.tip2-template {
  padding: 24rpx 0;
  display: flex;
  justify-content: center;
}
.tip2-element {
  color: #808080;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 24rpx 32rpx;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 120rpx;
}
</style>
