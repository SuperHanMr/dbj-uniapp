<template>
  <view class="">
   <web-view ref='webview' :src="`${baseUrl}/app-pages/new-case-detail/case-detail.html?id=${id}&source=small#params=${params}`"
	@message='message' @load='loadSuccessHandler'></web-view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        url: "",
        id: "",
        searchToken: "",
        hashToken: "",
        height: 0,

		userInfo:{
			token:'',
			userId:''
		},

		params:'',
		baseUrl:''

      };
    },
    onBackPress() {
      console.log(123123);
    },
    onShow() {
      console.log("onShow",  ">>>>>>>>>>>>>>>");
      // this.goH5();
      // this.loadSuccessHandler();
	  this.userInfo.token = getApp().globalData.token,
	  this.userInfo.userId = getApp().globalData.userInfo.id,
	  this.params = JSON.stringify(this.userInfo)
	  console.log(getApp().globalData.token);
    },

    onLoad(props) {
	  // this.baseUrl = this.ENV.VUE_APP_BASE_H5
	  this.baseUrl = 'https://localhost'
      this.id = props.id;
      uni.showShareMenu();
    },

    methods: {
      loadSuccessHandler(e) {
        uni.hideLoading();
      },
      message(event) {
        uni.$emit("isCollect", event.detail.data[event.detail.data.length - 1]);
      },
    },
  };
</script>

<style>
</style>
