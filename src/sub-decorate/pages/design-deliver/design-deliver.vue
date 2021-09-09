<template>
  <view style="height: 100%">
    <graphic-model v-if="message.title === '三维图'">

    </graphic-model>
    <plan-check v-if="message.title === '平面图'">

    </plan-check>
    <construction-plans v-if="message.title === '施工图'">

    </construction-plans>
  </view>
</template>

<script>
  import ConstructionPlans from "../construction-plans/construction-plans.vue"
  import GraphicModel from "../graphic-model/graphic-model.vue"
  import PlanCheck from "../plan-check/plan-check.vue"
  export default {
    components: {ConstructionPlans, GraphicModel, PlanCheck},
    data() {
      return {
        message: getApp().globalData.message
      }
    },
    onShow() {
      uni.setNavigationBarTitle({
          title: this.message.title
      });
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "./design-picture.scss"
</style>
