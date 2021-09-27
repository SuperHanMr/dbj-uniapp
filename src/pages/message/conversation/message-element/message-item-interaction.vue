<template>
  <comment-and-reply-element 
    v-if="true"
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
  import CommentAndReplyElement from "./comment-and-reply-element.vue"
  import UnsupportedElement from "./unsupported-element.vue"
  export default {
    name: "MessageItemInteraction",
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    components: {
      CommentAndReplyElement,
      UnsupportedElement,
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
