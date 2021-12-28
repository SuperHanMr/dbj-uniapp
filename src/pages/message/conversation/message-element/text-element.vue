<template>
  <message-bubble :message="message" class="text-message">
    <rich-text 
      class="text-element" 
      :class="{'text-element-send': isMine}"
      :nodes="text"
      ></rich-text>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";
import { decodeText, atDecode } from "@/utils/decode-text.js";

export default {
  name: "TextElement",
  components: {
    MessageBubble,
  },
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
    text() {
      let tid = (getApp().globalData && getApp().globalData.userInfo) ? getApp().globalData.userInfo.tid : "";
      return '<span class="text">' + atDecode(decodeText(this.payload.text), tid) + '</span>';
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.text-element.text-element-send {
  color: #fff;
  ::v-deep .at {
    color: #fff;
    font-weight: normal;
    &.mark {
      padding: 0;
      background-color: transparent;
    }
  }
}
.text-element {
  color: #111;
  font-size: 16px;
  word-break: break-all;
  ::v-deep .text {
    display: inline;
    white-space: pre-line;
  }
  ::v-deep .at {
    margin-right: 4px;
    font-weight: bold;
    border-radius: 3px;
    &.mark {
      padding: 0 2px;
      background-color: #E5F9F8;
    }
  }
  ::v-deep .emoji {
    width: 24px;
    height: 24px;
    vertical-align: -5px;
    padding: 0 4px;

    + .text:empty {
      margin-left: -4px;
      white-space: nowrap;
    }
  }

  ::v-deep .link {
    text-decoration: underline;
  }
}
</style>
