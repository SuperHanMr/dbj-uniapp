<template>
  <message-bubble
    :message="message"
    :body-style="bodyStyle"
    no-padding
    class="video-message"
    >
    <view class="video-element" @click="handlePlayVideo">
      <image class="video-thumb-img" :src="url" />
      <image class="play-icon" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_play%402x.png" />
    </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";
const IMG_MAX_HEIGHT = 140;
const IMG_MAX_WIDTH = 140;
export default {
  name: "VideoElement",
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
      let url = this.payloadData.thumbnailUrl;
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
    handlePlayVideo() {
      this.$store.dispatch("playMessageVideo", { url : this.payloadData.fileUrl });
    }
  },
};
</script>

<style lang="scss">
.video-element {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  position: relative;
}
.video-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
.play-icon {
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  top: 50%;
  left: 50%;
  margin-top: -24rpx;
  margin-left: -24rpx;
}
</style>
