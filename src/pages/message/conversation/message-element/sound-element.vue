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
      <view class="sound-icon">
        <view class="icon-audio-path1"></view>
        <view class="icon-audio-path2"></view>
        <view class="icon-audio-path3"></view>
      </view>
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
  .sound-icon {
    font-size: 16px;
    position: relative;
    .icon-audio-path1,
    .icon-audio-path2 {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  &.playing {
    .sound-icon {
      .icon-audio-path1 {
        animation: audio-playing1 1s linear infinite;
      }
      .icon-audio-path2 {
        animation: audio-playing2 1s linear infinite;
      }
    }
  }
  &.sound-element-send {
    color: #fff;
    .sound-icon {
      order: 1;
    }
  }
}

@keyframes audio-playing1 {
  0% {
    color: transparent;
  }
  25% {
    color: transparent;
  }
  50% {
    color: inherit;
  }
  75% {
    color: inherit;
  }
  100% {
    color: transparent;
  }
}
@keyframes audio-playing2 {
  0% {
    color: transparent;
  }
  25% {
    color: inherit;
  }
  50% {
    color: inherit;
  }
  75% {
    color: inherit;
  }
  100% {
    color: transparent;
  }
}
</style>
