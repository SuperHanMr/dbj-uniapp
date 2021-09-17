<template>
  <view class="base-info-container">
    <view class="main-body">
      <uni-list :border="false" class="uni-list">
        <uni-list-item
          title="头像"
          link
          @click="onClick($event,1)"
        >
          <template slot="footer">
            <image
              class="slot-image"
              :src="UserInfo.avatar"
            ></image>
          </template>
        </uni-list-item>
        <uni-list-item
          title="昵称"
          :rightText="UserInfo.name"
          link
          @click="onClick($event,1)"
        >
        </uni-list-item>
        <uni-list-item
          title="手机号"
          :rightText="UserInfo.phone"
        ></uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
			UserInfo:{},
		};
  },
	onShow() {
		this.UserInfo  =getApp().globalData.userInfo
		console.log("UserInfo=",this.UserInfo)
		this.userName=this.UserInfo.name;
	},
  methods: {
    onClick() {
      console.log("打印数据，哈哈哈");
    },
  },
};
</script>

<style scoped>
.base-info-container {
  width: 100%;
  height: 100%;
  /* background-color: #FFC0CB; */
}
.base-info-container .main-body {
  padding-top: 40rpx;
}
.slot-image {
  border-radius: 50%;
  width: 60rpx;
  height: 60rpx;
  background-color: yellowgreen;
}
</style>
