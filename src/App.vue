<script>
import { oauthGomeInfo } from "api/login.js";
import { createTim } from "utils/tim.js";
import { getOpenId } from "api/other.js";
export default {
  globalData: {
    userInfo: {},
    token: "",
    city: "",
    houses: [],
    tim: null,
    currentEstate: {},
    currentProject: {},
    naviData: null,
    decorateMsg: {},
    currentHouse: {
      name: "北京市朝阳区",
      provinceId: 1,
      cityId: 36,
      areaId: 41,
    },
    switchFlag: "home",
    currentRoute: "/pages/home/index/index",
    previewimageStatus: false,
    screenHeight: 0,
    openId: "",
    shareId: "",
  },

  onLaunch: function () {
    const userId = uni.getStorageSync("userId");
    const shareId = uni.getStorageSync("shareId");
    wx.login({
      success: (res) => {
        if (res.code) {
          //微信登录成功 已拿到code
          // ...doSomething
          console.log(res);
          getOpenId({
            code: res.code,
          }).then((e) => {
            this.globalData.openId = e.openid;
            uni.setStorageSync("openId", e.openid);
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
    console.log("onLaunch", "userId:", userId, "shareId:", shareId);
    if (shareId && !this.globalData.shareId) {
      this.globalData.shareId = shareId;
    }
    if (userId) {
      let token = uni.getStorageSync("scn");
      this.globalData.token = token;
      oauthGomeInfo({
        hideToast: true,
        ignoreLogin: true,
        clientType: "3",
      })
        .then((data) => {
          getApp().globalData.userInfo = data;
          uni.setStorageSync("userId", data.id);
          getApp().tim = createTim(data.appId);
          this.$store.dispatch("loginIM", {
            userId: data.tid,
            userSig: data.userSign,
          });
        })
        .catch((e) => {
          getApp().globalData.token = "";
          uni.clearStorageSync("scn");
          uni.clearStorageSync("userId");
        });
    }
    // 检查新版本
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("检查新版本回调", res.hasUpdate, res);
    });
    updateManager.onUpdateReady(function (res) {
      console.log("新版本已准备好", res);
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          console.log("确定更新版本", res);
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失败
      console.error("新的版本下载失败", res);
      uni.showToast({
        icon: "error",
        title: "新版本下载失败",
      });
    });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/* 字体图标 */
@import "./static/css/iconfont.css";

[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "iconfont" !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

page {
  height: 100%;
  background-color: #f5f6f6;
}

::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

@font-face {
  font-family: PriceFont;
  src: url("https://ali-res.dabanjia.com/static/font/price-font/price-font.woff2"),
    url("https://ali-res.dabanjia.com/static/font/price-font/price-font.woff");
}
.price-font {
  font-family: PriceFont;
}

/*每个页面公共css */
</style>
