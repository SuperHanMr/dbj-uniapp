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
			// #ifdef H5
			window.addEventListener("message", (e) => {
				let res = JSON.parse(e.data);
				if (res.type === 'MP-setNavigationBarTitle') {
					uni.setNavigationBarTitle({
						title: res.data
					})
				}
			})
			// #endif
      this.src = `${baseUrl}/app-pages/actuarial/index.html?projectId=${option.projectId}&isActuarial=1&token=${scn}&isClient=${option.isClient}&estateId=${option.estateId}`
      console.log(this.src)
    }
  }
</script>
