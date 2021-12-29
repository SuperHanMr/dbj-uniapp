<script>
import { oauthGomeInfo } from "api/login.js";
import { appconfig } from "api/home.js";
import { createTim } from "utils/tim.js";
import { getOpenId } from "api/other.js";
import { setLogId, log } from "utils/log.js";
import { getMsgNumByHouse } from "api/decorate.js";
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
    decorateMsgNum: 0,
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
    goHomeUrl: false,
    MarketStoreSwitch: false,
    ip: "",
  },

  onLaunch: function () {
    const userId = uni.getStorageSync("userId");
    const shareId = uni.getStorageSync("shareId");
        this.globalData.token = 'Pc0jlCMLaageAbuvl97z3PmZkuU8UOQrHjTV3svtxH%2BTEO%2B7U%2FWrRFtAnA3z1hDOnoxxbbehR56WtOKAjcCb8ETYhwgWaADxzoUIrVU7uqB3GfFUw6bm6RoRrGRY4lGf5b8c5d331b56d3be92816e1d231b30c7'

    // #ifdef MP-WEIXIN
    uni.request({
      url: "https://pv.sohu.com/cityjson", //仅为示例，并非真实接口地址。
      data: {},
      header: {},
      success: (res) => {
        let resList = res.data.split("=");
        if (resList.length > 1) {
          let ip = JSON.parse(resList[1].substr(0, resList[1].length - 1));
          if (ip.cip) {
            this.globalData.ip = ip.cip;
          }
        }
      },
    });
    appconfig().then((e) => {
      if (e.MarketStoreSwitch == "1") {
        this.globalData.MarketStoreSwitch = true;
      }
    });
    setLogId(userId + "-" + new Date().getTime());
    log({
      type: "wx-launch",
      version: uni.getAccountInfoSync().miniProgram.version || "develop",
      userId: userId,
      shareId: shareId,
      openId: uni.getStorageSync("openId"),
    });
    wx.login({
      success: (res) => {
        if (res.code) {
          //微信登录成功 已拿到code
          log({
            type: "wx-login-sucess",
            userId: userId,
            data: res,
          });
          getOpenId({
            code: res.code,
          }).then((e) => {
            this.globalData.openId = e.openid;
            uni.setStorageSync("openId", e.openid);
            log({
              type: "wx-got-openid",
              userId: userId,
              openId: getApp().globalData.openId,
              data: e,
            });
          });
        } else {
          log({
            type: "wx-login-sucess-no-code",
            userId: userId,
            data: res,
          });
        }
      },
      fail: (err) => {
        log({
          type: "wx-login-fail",
          userId: userId,
          data: err,
        });
      },
    });
    // #endif
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
    uni.$on("system-messages", () => {
      console.log(1111);
      this.watchMsg();
    });
    uni.$on("currentHouseChange", () => {
      console.log(222);
      this.watchMsg();
    });
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
  methods: {
    watchMsg() {
      if (
        !this.globalData.token ||
        (!this.globalData.currentHouse.id && !this.globalData.currentEstate.id)
      ) {
        return;
      }
      setTimeout(() => {
        getMsgNumByHouse(
          this.globalData.currentHouse
            ? this.globalData.currentHouse.id
            : this.globalData.currentEstate.id
        )
          .then((res) => {
            let num = res.count + "";
            this.globalData.decorateMsgNum = num;
            if (res.count === 0) {
              uni.removeTabBarBadge({
                index: 2,
              });
            } else {
              uni.setTabBarBadge({
                index: 2,
                text: num,
              });
            }
          })
          .catch((err) => {
            uni.removeTabBarBadge({
              index: 2,
            });
          });
      }, 100);
    },
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
  font-size: 16px;
}

button::after {
  border: none;
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
.navbar-height{
  height: 88rpx;
}
/*每个页面公共css */
</style>
