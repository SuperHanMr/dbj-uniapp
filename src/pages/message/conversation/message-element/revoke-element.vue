<template>
  <view class="message-bubble">
    <view
      v-if="!message.isRevoked"
      class="message-content"
      :class="bubbleStyle"
    >
      <slot></slot>
    </view>
    <view class="message-revoke-tip" v-if="message.isRevoked">
      {{ text }}
      <text
        type="text"
        size="mini"
        class="edit-button"
        v-show="isEdit"
        @click="reEdit"
        >&nbsp;重新编辑</text
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "MessageBubble",
  data() {
    return {
      isTimeout: false,
    };
  },
  props: {
    isMine: {
      type: Boolean,
    },
    isNew: {
      type: Boolean,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.isTimeoutHandler();
  },
  computed: {
    bubbleStyle() {
      let classString = "";
      if (this.isMine) {
        classString += "message-send";
      } else {
        classString += "message-received";
      }
      if (this.isNew) {
        classString += " new";
      }
      return classString;
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
    isEdit() {
      if (!this.isMine) {
        return false;
      }
      if (this.message.type !== this.TIM.TYPES.MSG_TEXT) {
        return false;
      }
      if (this.isTimeout) {
        return false;
      }
      return true;
    },
  },
  methods: {
    isTimeoutHandler() {
      // 从发送消息时间开始算起，5分钟内可以编辑
      let now = new Date();
      if (parseInt(now.getTime() / 1000) - this.message.time > 5 * 60) {
        this.isTimeout = true;
        return;
      }
      setTimeout(this.isTimeoutHandler, 1000);
    },
    reEdit() {
      this.$bus.$emit("reEditMessage", this.message.payload.text);
    },
    showMenus() {
      
    },
    handleRevokeMessage() {
    },
  },
};
</script>

<style lang="scss">
.message-bubble {
  position: relative;

  .message-content {
    outline: none;
    font-size: 14px;
    position: relative;
    max-width: 500px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .message-received {
    margin-left: 12px;

    &::before {
      left: -10px;
      transform: scaleX(-1);
      color: #ffffff;
    }

    &.new {
      transform: scale(0);
      transform-origin: top left;
      animation: bounce 500ms linear both;
    }
  }

  .message-send {
    margin-right: 12px;

    &::before {
      right: -10px;
      color: #5cadff;
    }

    &.new {
      transform: scale(0);
      transform-origin: top right;
      animation: bounce 500ms linear both;
    }

    .link {
      color: #fff;
    }
  }

  &.text-message {
    .message-content {
      padding: 10px;

      > span {
        white-space: pre-wrap;
        margin: 0;
      }
    }

    .message-received {
      background-color: #fff;
      border-radius: 0 8px 8px 8px;
    }

    .message-send {
      background-color: #35C4C4;
      border-radius: 8px 0 8px 8px;
      color: #fff;
    }
  }
}

.message-revoke-tip {
  padding: 4px 15px;
  border-radius: 3px;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.edit-button {
  margin-left: 4px;
  font-weight: normal;
}

@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}
</style>
