<template>
  <view>
    <web-view :src="src"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        src: ""
      }
    },
    onLoad(option) {
      const baseUrl = process.env.VUE_APP_BASE_H5
      const scn = uni.getStorageSync("scn")
      this.src = `${baseUrl}/app-pages/actuarial/index.html?projectId=${option.projectId}&isActuarial=1&token=${scn}`
    }
  }
</script>
