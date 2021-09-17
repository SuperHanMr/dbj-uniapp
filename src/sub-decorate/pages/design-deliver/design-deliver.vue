<template>
  <view class="design-deliver">
    <view class="opt flex-row" @click="goEdit">
      <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_edit_2.svg" class="edit"></image>
      <view>申请修改</view>
    </view>
    <tabs :items="items" :current="current"  @changeItem="changeItem"></tabs>
    <pictures :imgList="imgList"></pictures>
    <button class="btn" @click="confirm">确认{{message.stageName}}</button>
  </view>
</template>

<script>
  import Tabs from "../../components/tabs/tabs.vue"
  import Pictures from "./pictures.vue"
  import { confirmStageDeliver, reviseStageDeliver, designListByQuery } from "../../../api/decorate.js"
  export default {
    components: {Tabs, Pictures},
    data() {
      return {
        message: getApp().globalData.decorateMsg,
        imgList: [],
        items: ["平面图", "施工图", "全景图", "效果图"],
        current: "平面图",
        originList: []
      }
    },
    onShow() {
      uni.setNavigationBarTitle({
          title: this.message.stageName
      });
      this.getDataList()
    },
    methods: {
      getDataList() {
        designListByQuery(this.message.serveId).then(data => {
          this.originList = data
          this.filterImgList(this.message.stageName)
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
          content: `是否确认该${this.message.stageName}图?`,
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              confirmStageDeliver(this.message.serveId).then(data => {
                console.log(data)
                uni.switchTab({
                  url: "/pages/decorate/index/index"
                })
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
              reviseStageDeliver(this.message.serveId).then(data => {
                console.log(data)
                uni.switchTab({
                  url: "/pages/decorate/index/index"
                })
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
