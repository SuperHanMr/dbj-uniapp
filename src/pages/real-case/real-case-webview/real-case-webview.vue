<template>
  <view class="">
    <web-view ref='webview' :src="url" @message='message' @load='loadSuccessHandler'></web-view>
    <view class="" ref='sad'>
      
    </view>
  </view>
	
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(props) {
      let height = 0
			const token = uni.getStorageSync("scn")
      uni.getSystemInfo({
        success:(res)=>{
          height = res.windowHeight
        }
      })
			this.url = this.ENV.VUE_APP_BASE_H5 + `/app-pages/case-detail/case-detail.html?id=${props.id}&token=${token ? token : 0}&height=${height}`
      console.log(this.url)
      uni.showLoading({
          title: '加载中'
      });

		},

		methods: {
			loadSuccessHandler(e){
        uni.hideLoading();
      },
      message(event){
        // console.log(event.detail.data,event.detail.data.length)
        uni.$emit('isCollect',event.detail.data[event.detail.data.length-1].isCollect)
      }
		}
	}
</script>

<style>

</style>
