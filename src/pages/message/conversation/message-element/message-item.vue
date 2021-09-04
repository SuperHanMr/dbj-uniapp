<template>
  <text-element v-if="message.type === TIM.TYPES.MSG_TEXT" :message="message" :is-new="isNew"></text-element>
</template>

<script>
  import TIM from "tim-wx-sdk";
  import TextElement from "./text-element.vue";
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
      TextElement
    },
    data() {
      return {
        TIM: TIM
      }
    }
  }
</script>

<style>
</style>
