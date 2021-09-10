<template>
  <message-bubble 
    :message="message" 
    :payload-data="payloadData" 
    class="sound-message"
    @body-click="handlePlaySound">
    <view 
      class="sound-element" 
      :class="{playing: isPlaying}" 
      :style="{width: elementWidth + 'px'}"
      >
      <text class="sound-duration">{{ duration }}″</text>
      <view class="icon-audio"></view>
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
}
</style>
