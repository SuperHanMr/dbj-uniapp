<template>
  <view class="design-deliver">
    <view class="opt flex-row" @click="goEdit">
      <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_edit_2.svg" class="edit"></image>
      <view>申请修改</view>
    </view>
    <view class="tabs-wrap">
      <tabs :items="items" :current="current" @changeItem="changeItem"></tabs>
    </view>
    <pictures :imgList="imgList"></pictures>
    <view :style="{height: containerBottom * 2 + 48 + 88 + 'rpx'}"></view>
    <view class="btn-wrap" :style="{paddingBottom:systemBottom,height:systemHeight}">
      <button class="btn" @click="confirm">确认{{message.stageName}}</button>
    </view>
  </view>
</template>

<script>
  import Tabs from "../../components/tabs/tabs.vue"
  import Pictures from "./pictures.vue"
  import {
    confirmStageDeliver,
    reviseStageDeliver,
    designListByQuery
  } from "../../../api/decorate.js"
  export default {
    components: {
      Tabs,
      Pictures
    },
    data() {
      return {
        message: getApp().globalData.decorateMsg,
        imgList: [],
        items: [],
        current: "",
        originList: [],
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
      }
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
      this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.message.stageName
      });
      // if(getApp().globalData.)
      this.getDataList()
    },
    methods: {
      getDataList() {
        designListByQuery(this.message.serveId).then(data => {
          this.originList = data
          this.items = this.originList.map(t => t.categoryName)
          if (this.items.length > 0) {
            this.current = this.items[0]
            this.filterImgList(this.items[0])
          }
        })
      },
      filterImgList(title) {
        this.imgList = []
        this.imgList = this.originList.filter(t => t.categoryName == title)[0]?.imageFileList
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
                uni.navigateBack({

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
