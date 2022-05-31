<template>
  <revoke-element
    v-if="message.isRevoked"
    :message="message"
  />
  <group-tip-element
    v-else-if="message.from === 'administrator' && message.type === TIM.TYPES.MSG_TEXT"
    :message="message"
  />
  <text-element
    v-else-if="message.type === TIM.TYPES.MSG_TEXT"
    :message="message"
  />
  <sound-element
    v-else-if="message.type === TIM.TYPES.MSG_AUDIO"
    :message="message"
  />
  <group-tip-element
    v-else-if="message.type === TIM.TYPES.MSG_GRP_TIP"
    :message="message"
  />
  <image-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'img_message'"
    :message="message"
  />
  <file-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'file_message'"
    :message="message"
  />
  <video-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'video_message'"
    :message="message"
  />
  <questions-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && payloadData.type === 'questions_message'"
    :message="message"
  />
  <call-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'call'"
    :message="message"
  />
  <goods-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'goods'"
    :message="message"
  />
  <serve-card-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'servecard'"
    :message="message"
  />
  <consult-product-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'consult_product'"
    :message="message"
  />
  <serve-product-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'serve_product'"
    :message="message"
  />
  <case-card-element
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'case'"
    :message="message"
  />
  <card-template
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'card'"
    :template="template"
    :message="message"
  />
  <tip-template
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'tip'"
    :template="template"
    :message="message"
  />
  <tip2-template
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'tip2'"
    :template="template"
    :message="message"
  />
  <text-template
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'text'"
    :template="template"
    :message="message"
  />
  <product-template
    v-else-if="message.type === TIM.TYPES.MSG_CUSTOM && template.template === 'product-tpl'"
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
  import ProductTemplate from "./product-template.vue";
  import TextElement from "./text-element.vue";
  import ImageElement from "./image-element.vue";
  import VideoElement from "./video-element.vue";
  import FileElement from "./file-element.vue";
  import SoundElement from "./sound-element.vue";
  import GroupTipElement from "./group-tip-element.vue"
  import QuestionsElement from "./questions-element.vue";
  import RevokeElement from "./revoke-element.vue";
  import CallElement from "./call-element.vue"
  import GoodsElement from "./goods-element.vue"
  import ConsultProductElement from "./consult-product-element.vue";
  import ServeProductElement from "./serve-product-element.vue";
  import UnsupportedElement from "./unsupported-element.vue";
  import CardTemplate from "./template/card-tpl.vue"
  import ServeCardElement from "./serve-card-element.vue";
  import CaseCardElement from "./case-card-element.vue";
  import TipTemplate from "./template/tip-tpl.vue"
  import Tip2Template from "./template/tip2-tpl.vue"
  import TextTemplate from "./template/text-tpl.vue"
  export default {
    name: "MessageItem",
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    components: {
      ProductTemplate,
      TextElement,
      ImageElement,
      VideoElement,
      FileElement,
      SoundElement,
      GroupTipElement,
      QuestionsElement,
      RevokeElement,
      CallElement,
      GoodsElement,
      UnsupportedElement,
      CardTemplate,
      TipTemplate,
      Tip2Template,
      TextTemplate,
      CaseCardElement,
      ServeCardElement,
      ConsultProductElement,
      ServeProductElement,
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
