<template>
  <text-element 
    v-if="message.type === TIM.TYPES.MSG_TEXT" 
    :message="message" 
  />
  <sound-element
    v-else-if="message.type === TIM.TYPES.MSG_AUDIO"
    :message="message"
  />
  <image-element 
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'img_message'"
    :message="message" 
  />
  <video-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'video_message'"
    :message="message"
  />
</template>

<script>
  import TIM from "tim-wx-sdk";
  import TextElement from "./text-element.vue";
  import ImageElement from "./image-element.vue";
  import VideoElement from "./video-element.vue";
  import SoundElement from "./sound-element.vue";
  export default {
    name: "MessageItem",
    props: {
      isNew: {
        type: Boolean,
      },
      message: {
        type: Object,
        required: true,
      },
    },
    components: {
      TextElement,
      ImageElement,
      VideoElement,
      SoundElement
    },
    data() {
      return {
        TIM: TIM
      }
    },
    computed: {
      payloadData() {
        return this.message.payloadData || {};
      },
    }
  }
</script>

<style>
</style>
