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
import { decodeText } from "@/utils/decode-text.js";

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
      return '<span class="text">' + decodeText(this.payload.text) + '</span>';
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
.text-element.text-element-send {
  color: #fff;
  .at {
    color: #fff;
  }
}
.text-element {
  color: #111;
  font-size: 16px;
  word-break: break-all;
  .text {
    display: inline;
    white-space: pre-line;
  }
  .at {
    margin-left: 4px;
    margin-right: 4px;
    color: $uni-color-primary;
  }
  .emoji {
    width: 24px;
    height: 24px;
    vertical-align: -5px;
    padding: 0 4px;

    + .text:empty {
      margin-left: -4px;
      white-space: nowrap;
    }
  }

  .link {
    text-decoration: underline;
  }
}
</style>
