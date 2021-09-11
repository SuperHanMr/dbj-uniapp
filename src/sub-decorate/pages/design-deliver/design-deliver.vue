<template>
  <view class="design-deliver">
    <!-- <graphic-model v-if="message.title === '三维图'"> </graphic-model>
    <plan-check v-if="message.title === '平面图'"> </plan-check>
    <construction-plans v-if="message.title === '施工图'"> </construction-plans> -->
    <view class="opt flex-row" @click="goEdit">
      <image class="edit"></image>
      <view>申请修改</view>
    </view>
    <tabs :items="items" :current="current"  @changeItem="changeItem"></tabs>
    <pictures :imgList="imgList"></pictures>
    <button class="btn" @click="confirm">确认{{message.title}}</button>
  </view>
</template>

<script>
  // import ConstructionPlans from "./construction-plans.vue"
  // import GraphicModel from "./graphic-model.vue"
  // import PlanCheck from "./plan-check.vue"
  import Tabs from "../../components/tabs/tabs.vue"
  import Pictures from "./pictures.vue"
  import { confirmStageDeliver, reviseStageDeliver, designListByQuery } from "../../../api/decorate.js"
  export default {
    components: {Tabs, Pictures},
    data() {
      return {
        message: getApp().globalData.message || { title: "施工图", serveCardId: 34},
        imgList: [],
        items: ["平面图", "施工图", "全景图", "效果图"],
        current: "平面图",
        originList: []
      }
    },
    onShow() {
      uni.setNavigationBarTitle({
          title: this.message.title
      });
      this.getDataList()
    },
    methods: {
      getDataList() {
        designListByQuery(this.message.serveCardId).then(data => {
          this.originList = data
          this.filterImgList(this.message.title)
        })
      },
      filterImgList(title) {
        if (title.includes("三维图")) {
          this.imgList = this.originList.filter(t => t.categoryName.includes("全景图"))[0].imageFileList
        }
        if (title.includes("平面图")) {
          this.imgList = this.originList.filter(t => t.categoryName.includes("平面图"))[0].imageFileList
        }
        if (title.includes("施工图")) {
          this.imgList = this.originList.filter(t => t.categoryName.includes("施工图"))[0].imageFileList
        }
        if (title.includes("全景图")) {
          this.imgList = this.originList.filter(t => t.categoryName.includes("全景图"))[0].imageFileList
        }
        if (title.includes("效果图")) {
          this.imgList = this.originList.filter(t => t.categoryName.includes("效果图"))[0].imageFileList
        }
      },
      confirm() {
        uni.showModal({
          title: "",
          content: "是否确认该三维设计图?",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              confirmStageDeliver(this.message.serveCardId).then(data => {
                console.log(data)
              })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      goEdit() {
        uni.showModal({
          title: "",
          confirmText: "确定修改",
          content: "提交修改反馈前，请先与设计师沟通需要修改的内容",
          success: (res) => {
            if (res.confirm) {
              reviseStageDeliver(this.message.serveCardId).then(data => {
                console.log(data)
              })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      changeItem(item) {
        this.current = item
        this.filterImgList(this.current)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./design-picture.scss"
</style>
