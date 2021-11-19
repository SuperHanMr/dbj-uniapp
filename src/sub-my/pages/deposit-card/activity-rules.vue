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
      this.src = `${baseUrl}/protocol-c/rules/store-value-card-usage-rules.html`
      console.log(this.src)
    }
  }
</script>