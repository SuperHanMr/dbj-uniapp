<template>
  <view>
    <web-view :src= "baseUrl + '/static/dbj-protocol/protocol.html'">
    </web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: ""
      }
    },
    onShow() {
      this.baseUrl = this.ENV.VUE_APP_BASE_API
    },
    methods: {

    } 
  }
</script>

<style>

</style>
