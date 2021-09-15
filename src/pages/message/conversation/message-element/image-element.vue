<template>
  <message-bubble :message="message" :payload-data="payloadData" class="image-message">
    <image class="image-element" :src="url" />
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";

export default {
  name: "ImageElement",
  components: {
    MessageBubble,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    payloadData: {
      type: Object,
      required: true,
    }
  },
  computed: {
    isMine() {
      return this.message.flow === "out";
    },
    url() {
      let url = this.payloadData.fileUrl;
      if (/\.dabanjia\.com\//.test(url)) {
        return url + "?x-oss-process=image/resize,m_lfit,h_280,w_280";
      }
      return url;
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
.image-element {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
}
</style>
