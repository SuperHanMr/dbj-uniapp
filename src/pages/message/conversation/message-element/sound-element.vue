<template>
  <message-bubble 
    :message="message" 
    :payload-data="payloadData" 
    class="sound-message"
    @body-click="handlePlaySound">
    <view 
      class="sound-element" 
      :class="{playing: isPlaying, 'sound-element-send': isMine}" 
      :style="{width: elementWidth + 'px'}"
      >
      <text class="sound-duration">{{ duration }}″</text>
      <view class="sound-icon icon-audio"></view>
     </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";
import { mapState } from "vuex";
export default {
  name: "SoundElement",
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
    ...mapState({
      currentSoundUrl: (state) => state.message.currentSoundUrl,
      soundPlayStatus: (state) => state.message.soundPlayStatus
    }),
    isMine() {
      return this.message.flow === "out";
    },
    payload() {
      return this.message.payload || {};
    },
    duration() {
      return this.payload.second || 1;
    },
    url() {
      return this.payload.url;
    },
    isPlaying() {
      return this.url === this.currentSoundUrl && this.soundPlayStatus === "playing";
    },
    elementWidth() {
      return this.duration*2.5 + 60;
    }
  },
  methods: {
    handlePlaySound() {
      this.$store.dispatch("playMessageSound", { url : this.url });
    }
  },
};
</script>

<style lang="scss">
.sound-element {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  .sound-duration {
    font-size: 14px;
    margin-right: 8rpx;
  }
  &.playing {
    background-color: #f00;
  }
  &.sound-element-send {
    color: #fff;
    .sound-icon {
      order: 1;
    }
  }
}
</style>
