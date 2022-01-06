<template>
  <message-bubble
    :message="message"
    :body-style="bodyStyle"
    no-padding
    class="image-message"
    >
    <image class="image-element" :src="url" @click="handlePreview" />
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";
const IMG_MAX_HEIGHT = 140;
const IMG_MAX_WIDTH = 140;
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
    bodyStyle() {
      let { width = 0, height = 0 } = this.payloadData;
      if (width/height > IMG_MAX_WIDTH/IMG_MAX_HEIGHT) {
        if (width > IMG_MAX_WIDTH) {
          height = height/width * IMG_MAX_WIDTH;
          width = IMG_MAX_WIDTH;
        }
      } else {
        if (height > IMG_MAX_HEIGHT) {
          width = width/height * IMG_MAX_HEIGHT;
          height = IMG_MAX_HEIGHT;
        }
      }
      return [
        `width: ${Math.round(width)}px`,
        `height: ${Math.round(height)}px`
      ].join(";") + ";";
    }
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
