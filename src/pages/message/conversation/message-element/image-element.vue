<template>
  <message-bubble :message="message" class="image-message">
    <image class="image-element" :src="url" @click="handlePreview" />
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
  },
  computed: {
    isMine() {
      return this.message.flow === "out";
    },
    payloadData() {
      return this.message.payloadData;
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
    handlePreview() {
      this.$store.dispatch("preivewMessageImage", { url: this.payloadData.fileUrl });
    }
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
