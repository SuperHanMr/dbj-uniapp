<template>
  <view class="call-element">
    {{ text }}
  </view>
</template>

<script>
export default {
  name: "CallElement",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    data() {
      return this.message.payloadData.params || {};
    },
    text() {
      switch(this.data.action) {
        case 1:
          return `【${this.message.nick || ""}】已取消`;
        case 2:
          return `【${this.message.nick || ""}】通话超时`;
        case 3:
          return `【${this.message.nick || ""}】加入通话`;
      }
      return "通话消息";
    },
  },
  methods: {
  },
};
</script>

<style>
.call-element {
  color: #808080;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 24rpx;
}

</style>
