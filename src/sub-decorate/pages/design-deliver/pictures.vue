<template>
  <view class="wrap">
    <view class="picture flex-row">
      <view class="imgs" v-for="(item, index) in imgList" :key="index">
        <image :src="item.fileUrl" @click="clickImg(imgList)"></image>
        <view class="sub-title">业主的小房间施工图</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      imgList: {
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {
      clickImg(url) {
        let arr = new Array();
        if (url instanceof Array) {
          arr = url.map(t => t.fileUrl)
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
          content: "是否确认该施工图?",
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
    }
  }
</script>

<style scoped lang="scss">
  @import "./design-picture.scss"
</style>
