<template>
  <view class="unlogin-page">
    <image class="empty-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/message/img_sys_listempty.png"></image>
    <view class="unlogin-tip">
      登录后可查看全部内容
    </view>
    <view class="unlogin-btn" @click="gotoLogin">
      点击登录
    </view>
  </view>
</template>

<script>
export default {
  name: "UnloginPage",
  methods: {
    gotoLogin() {
      uni.navigateTo({
      	url: "/pages/login/login",
      });
    }
  }
}
</script>

<style>
.unlogin-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}
.empty-img {
  margin-top: 268rpx;
  width: 248rpx;
  height: 248rpx;
}
.unlogin-tip {
  color: #999;
  margin-top: 24rpx;
  font-size: 13px;
}
.unlogin-btn {
  width: 178px;
  height: 44px;
  background: linear-gradient(117deg, #FA3B34 25%, #FF6A33 92%);
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 100rpx;
}
</style>
