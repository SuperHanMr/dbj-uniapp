<template>
  <view class="unlogin-page">
    <view class="unlogin-content">
      <image class="empty-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/message/img_sys_listempty.png"></image>
      <view class="unlogin-tip">
        登录后可查看全部内容
      </view>
      <view class="unlogin-btn" @click="gotoLogin">
        点击登录
      </view>
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
  justify-content: center;
  width: 100%;
  background-color: #fff;
  height: 100%;
}
.unlogin-content{
  text-align: center;
}
.empty-img {
  /* margin-top: 268rpx; */
  width: 400rpx;
  height: 400rpx;
}
.unlogin-tip {
  color: #999;
  margin-top: 24rpx;
  font-size: 13px;
}
.unlogin-btn {
  width: 150px;
  height: 44px;
  background: linear-gradient(117deg, #FA3B34 25%, #FF6A33 92%);
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  /* margin-top: 100rpx; */
  margin: 100rpx auto 0;
}
</style>
