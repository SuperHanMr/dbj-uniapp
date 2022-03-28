<template>
  <view class="">
   <web-view ref='webview' :src="`${baseUrl}/app-pages/whole-house-do/whole-house-do.html?source=small#${userInfo.token}`"
	></web-view>
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
        isFromIM: false,

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
      this.userInfo.token = getApp().globalData.token
    },

    onLoad(props) {

	  this.baseUrl = this.ENV.VUE_APP_BASE_H5
      
      uni.showShareMenu();
    },

    methods: {
    },
  };
</script>

<style>
</style>
