<template>
  <text-element 
    v-if="message.type === TIM.TYPES.MSG_TEXT" 
    :message="message" 
    :is-new="isNew"
  />
  <image-element 
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'img_message'"
    :message="message" 
    :payload-data="payloadData"
  />
  <video-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'video_message'"
    :message="message" 
    :payload-data="payloadData"
  />
</template>

<script>
  import TIM from "tim-wx-sdk";
  import TextElement from "./text-element.vue";
  import ImageElement from "./image-element.vue";
  import VideoElement from "./video-element.vue";
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
      VideoElement
    },
    data() {
      return {
        TIM: TIM
      }
    },
    computed: {
      payload() {
        if (!this.message) {
          return {};
        }
        return this.message.payload;
      },
      payloadData() {
        if (this.message.type === TIM.TYPES.MSG_CUSTOM) {
          try {
            return JSON.parse(this.payload.data);
          } catch (e) {
            console.error(e);
          }
        }
        return {};
      }
    }
  }
</script>

<style>
</style>
