<template>
  <view class="wrap">
    <view class="opt flex-row" @click="goEdit">
      <image class="edit"></image>
      <view>申请修改</view>
    </view>
    <view class="title">
      平面图
    </view>
    <view class="picture flex-row">
      <view class="imgs" v-for="(item, index) in measureImgList" :key="index">
        <image :src="item" @click="clickImg(measureImgList)"></image>
        <view class="sub-title">业主的小房间平面图</view>
      </view>
    </view>
    <button class="btn" @click="confirm">确认平面图</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        measureImgList: [
          "http://iph.href.lu/328x216?text=平面图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=平面图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=平面图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=平面图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=平面图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=平面图交付&fg=EB7662&bg=FFE2DD"
        ]
      }
    },
    methods: {
      clickImg(url) {
        let arr = new Array();
        if (url instanceof Array) {
          arr = [...url]
        } else {
          arr.push(url)
        }
        console.log(arr)
        uni.previewImage({
          // current: 1,
          urls: arr,
          // longPressActions:{}
        })
      },
      confirm() {
        uni.showModal({
          title: "",
          content: "是否确认该平面图?",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
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
              console.log("点击了确认")
            } else {
              console.log("点击了取消")
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../design-deliver/design-picture.scss"
</style>
