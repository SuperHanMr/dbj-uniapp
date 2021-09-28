<template>
  <interaction-template 
    v-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'interaction'"
    :message="message"
    :template="template"
  />
  <unsupported-element
    v-else
    :message="message"
  />
</template>

<script>
  import TemplateMap from "@/utils/interaction_tpl.json";
  import TIM from "tim-wx-sdk";
  import InteractionTemplate from "./template/interaction-tpl.vue"
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
      InteractionTemplate,
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
        return TemplateMap[this.payloadData.type] || {};
      }
    }
  }
</script>

<style>
</style>
