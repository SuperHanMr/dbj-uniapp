<template>
  <message-bubble :message="message" class="text-template">
    <rich-text 
      class="text-element" 
      :class="{'text-element-send': isMine}"
      :nodes="text"
      ></rich-text>
  </message-bubble>
</template>

<script>
import MessageBubble from "../message-bubble.vue";
import { decodeText } from "@/utils/decode-text.js";
import { compileTemplateStr as compile } from "@/utils/util.js";

export default {
  name: "TextElement",
  components: {
    MessageBubble,
  },
  props: {
    template: {
      type: Object,
      required: true
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
    isMine() {
      return this.message.flow === "out";
    },
    content() {
      return compile(this.template.body.content)(this.data);
    },
    text() {
      return '<span class="text">' + decodeText(this.content) + '</span>';
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
.text-element.text-element-send {
  color: #fff;
}
.text-element {
  color: #111;
  font-size: 16px;
  word-break: break-all;
  .text {
    display: inline;
    white-space: pre-line;
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
