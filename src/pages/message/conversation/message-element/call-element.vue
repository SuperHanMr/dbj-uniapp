<template>
  <message-bubble :message="message" class="call-message">
    <view
      class="call-element" 
      :class="{'call-element-send': isMine}"
      >{{ text }}</view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";

export default {
  name: "CallElement",
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
    data() {
      return this.message.payloadData.params || {};
    },
    text() {
      return "语音通话";
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
.call-element.call-element-send {
  color: #fff;
}
.call-element {
  color: #111;
  font-size: 16px;
}
</style>
