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
  <card-template 
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'card'"
    :template="template"
    :message="message"
  />
  <questions-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'questions_message'"
    :message="message" 
  />
  <unsupported-element
    v-else
    :message="message"
  />
</template>

<script>
  import MessageTemplate from "@/utils/message-template.json";
  import TIM from "tim-wx-sdk";
  import TextElement from "./text-element.vue";
  import ImageElement from "./image-element.vue";
  import VideoElement from "./video-element.vue";
  import SoundElement from "./sound-element.vue";
  import QuestionsElement from "./questions-element.vue";
  import UnsupportedElement from "./unsupported-element.vue";
  import CardTemplate from "./template/card-tpl.vue"
  export default {
    name: "MessageItem",
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    components: {
      TextElement,
      ImageElement,
      VideoElement,
      SoundElement,
      QuestionsElement,
      UnsupportedElement,
      CardTemplate
    },
    computed: {
      TIM() {
        return TIM;
      },
      payloadData() {
        return this.message.payloadData || {};
      },
      template() {
        return MessageTemplate[this.payloadData.type] || {};
      }
    }
  }
</script>

<style>
</style>
