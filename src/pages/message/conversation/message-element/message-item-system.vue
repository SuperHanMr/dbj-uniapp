<template>
  <card-template 
    v-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'card'"
    :template="template"
    :message="message"
  />
  <form-template
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'form'"
    :template="template"
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
  import CardTemplate from "./template/card-tpl.vue"
  import FormTemplate from "./template/form-tpl.vue"
  export default {
    name: "MessageItemSystem",
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    components: {
      CardTemplate,
      FormTemplate
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
