<template>
  <view class="content">
    <video
      class="video"
      id="myVideo"
      :src="url"
      @error="videoErrorCallback"
      controls
    ></video>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  onLoad(e) {
    if (e && e.url) {
      this.url = decodeURIComponent(e.url);
    }
    if (e && e.title) {
      uni.setNavigationBarTitle({
        title: e.title,
      });
    }
  },
};
</script>

<style lang="scss">
.content {
  width: 100vw;
  height: 100vh;
}

.video {
  width: 100%;
  height: 100%;
}
</style>
