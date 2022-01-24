<template>
  <view class="unlogin-page">
    <image class="empty-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/empty.png"></image>
    <view class="unlogin-tip">
      登录后可查看全部内容
    </view>
    <view class="unlogin-btn" @click="gotoLogin">
      点击登录
    </view>
  </view>
</template>

<script>
import request from '../../utils/request';
export default {
  name: "UnloginPage",
  methods: {
    gotoLogin() {
      // #ifdef MP-WEIXIN
      uni.navigateTo({
      	url: "/pages/login/login",
      });
      // #endif
      // #ifdef H5
      function oauthGomeInfo(data) {
        let shareId = uni.getStorageSync("shareId");
        if (shareId) {
          //只要是从胶囊小店跳转过来的就传这个值
          data.sourceType = "CAPSULE_STORE_APPLET"
        }
        data = Object.assign(data, {
          clientCode: "APPLET",
          ignoreLogin: true
        })
        return request.post('http://apis-dbj.gomeuat.com.cn/customer/app/oauth/gome/loginByCookie', data)
      }
      console.log("发送登录请求测试");
      oauthGomeInfo({
        hideToast: true,
        ignoreLogin: true,
        clientType: "3",
      })
      .then((data) => {
        console.log("请求成功！", data);
      }).catch(err => {
        console.error("请求失败", err);
      })
      // #endif
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
  background: linear-gradient(135deg,#00bfaf, #00bfbc);
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 100rpx;
}
</style>
