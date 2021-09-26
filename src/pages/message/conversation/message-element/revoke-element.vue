<template>
  <view class="revoke-element">
    {{ text }}
    <text
      v-if="canEdit"
      class="edit-button"
      >重新编辑</text
    >
  </view>
</template>

<script>
export default {
  name: "RevokeElement",
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
    text() {
      if (this.message.conversationType === "C2C" && !this.isMine) {
        return "对方撤回了一条消息";
      }
      if (this.message.conversationType === "GROUP" && !this.isMine) {
        return `“${this.message.nick || this.message.from}” 撤回了一条消息`;
      }
      return "你撤回了一条消息";
    },
    canEdit() {
      return false;
    }
  },
  methods: {
  },
};
</script>

<style>
.revoke-element {
  color: #808080;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  padding: 24rpx;
}

.edit-button {
  color: #35C4C4;
  margin-left: 4px;
  font-weight: normal;
}
</style>
