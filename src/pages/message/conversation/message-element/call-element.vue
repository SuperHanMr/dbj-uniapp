<template>
  <message-bubble :message="message" class="call-message">
    <view
      class="call-element" 
      :class="{'call-element-send': isMine}"
      >{{ text }}
      <view v-if="isVideo" class="call-type-icon icon-call-video"></view>
      <view v-else class="call-type-icon icon-call-audio"></view>
    </view>
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
      let text = this.data.actionName;
      if (this.data.duration) {
        text += " " + this.data.duration;
      }
      return text;
    },
    isVideo() {
      return this.data.callType == 2;
    }
  },
  methods: {
  },
};
</script>

<style lang="scss">
.call-element {
  color: #111;
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.call-type-icon {
  order: -1;
  margin-right: 12px;
  font-size: 20px;
}
.call-element.call-element-send {
  color: #fff;
  .call-type-icon {
    order: 1;
    margin-right: 0;
    margin-left: 12px;
  }
}
</style>
