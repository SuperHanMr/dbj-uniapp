<template>
  <view>
    <custom-navbar
      title="????AAAA"
      :opacity="scrollTop/100"
      :showBack="false"
    >
      <slot-one>
        <view @click="toCity">
          {{citydata}}
        </view>
      </slot-one>
    </custom-navbar>
    <scroll-view
      class="content"
      scroll-y="true"
      @scroll="onScroll"
      @scrolltolower="onLoadMore"
    >
      <view
        style="margin-top: 300rpx;"
        class=""
        @click="toFriends"
      >
        去亲友团
      </view>
      <button
        style="width: 50%;margin-top: 20rpx;"
        type="default"
        @click="toNextPage"
      >去封装好的列表页</button>
      <button
        style="width: 50%;margin-top: 20rpx;"
        type="default"
        @click="toSubPage"
      >去分包1</button>
      <button
        style="width: 50%;margin-top: 20rpx;"
        type="default"
        @click="toCalebdar"
      >去日历</button>
      <swiper
        class="banner-content"
        :indicator-dots="true"
        :autoplay="true"
        interval="2000"
        duration="500"
        :circular="true"
      >
        <swiper-item
          v-for="(item,index) in bannerList"
          :key="index"
        >
          <image
            class="banner-img"
            :src="item.resUrl"
            mode="aspectFit"
            @click="toWebview(item.jumpUrl)"
          >
          </image>
        </swiper-item>
      </swiper>
      <view class="flex-row">
        <view
          class="item"
          v-for="(item,index) in liveList"
          :key="index"
          @click="toLiveRoom(item)"
        >
          <image
            class="img"
            :src="item.scaleImg"
            mode="scaleToFill"
          ></image>
          {{item.title}}
        </view>
      </view>
      <waterfall
        :list="caseList"
        @selectedItem="onSelectedItem"
      ></waterfall>
    </scroll-view>
  </view>
</template>

<script>
import { getBanner, queryLive, caseList } from "../../../api/home.js";

import { orderList } from "../../../api/order.js";
import { queryEstates } from "../../../api/decorate.js";
export default {
  data() {
    return {
      tophight: 0,
      navBarHeight: 0,
      scrollTop: 0,
      liveList: [],
      citydata: "北京市",
      roomId: "",
      bannerList: [],
      list: [],
      comList: [],
      caseList: [],
      loading: false,
      page: 1,
      totalPage: 1,
    };
  },
  onLoad() {
    this.getAuthorizeInfo();
  },
  onShow() {
    this.reloadData();
    // let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1]; //当前页面
    // let res = currPage.data.city;
    // if (res) {
    // 	this.citydata = res.title;
    // 	this.changeCity();
    // }
  },
  methods: {
    toSubPage() {
      uni.navigateTo({
        url: "/sub-home/pages/test1/test1",
      });
    },
    toCalebdar() {
      uni.navigateTo({
        url: "../../decorate/calendar/calendar",
      });
    },
    onLoadMore() {
      if (this.loading || this.page >= this.totalPage) {
        return;
      }
      this.page++;
      this.getCaseList();
    },
    onSelectedItem(item) {
      if (item.shareLinks) {
        this.toWebview(item.shareLinks);
      }
    },
    toWebview(url) {
      if (!url) {
        return;
      }
      uni.navigateTo({
        url: "../../common/webview/webview?url=" + encodeURIComponent(url),
      });
    },
    async toFriends() {
      let list = await queryEstates();
      console.log(list);
      this.roomId = list[0].id;
      uni.navigateTo({
        url: "../../decorate/friends/friends?id=" + this.roomId,
      });
    },
    changeCity() {
      console.log("切换城市");
    },
    toCity() {
      uni.navigateTo({
        url: "../select-city/select-city?title=" + this.citydata,
      });
    },
    getAuthorizeInfo() {
      const that = this;
      uni.authorize({
        scope: "scope.userLocation",
        success() {
          // 允许授权
          that.getLocationInfo();
        },
        fail() {
          // 拒绝授权
          that.openConfirm();
          console.log("你拒绝了授权，无法获得周边信息");
        },
      });
    },
    // 获取地理位置
    getLocationInfo() {
      let vm = this;
      uni.getLocation({
        type: "gcj02",
        success(res) {
          let that = vm;
          const latitude = res.latitude;
          const longitude = res.longitude;
          uni.request({
            header: {
              "Content-Type": "application/text",
            },
            //注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
            url:
              "https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=" +
              longitude +
              "," +
              latitude +
              "&key=4d1476e82ce1ca125c7452c625e6d541&radius=1000&extensions=all",
            success(re) {
              console.log(re);
              if (re.statusCode === 200) {
                let addressComponent = re.data.regeocode.addressComponent;
                that.citydata =
                  addressComponent.city.length > 0
                    ? addressComponent.city
                    : addressComponent.province;
                getApp().globalData.city = that.citydata;
              } else {
                console.log("获取信息失败，请重试！");
              }
            },
          });
        },
      });
    },
    // 再次获取授权
    // 当用户第一次拒绝后再次请求授权
    openConfirm() {
      uni.showModal({
        title: "请求授权当前位置",
        content: "需要获取您的地理位置，请确认授权",
        success: (res) => {
          if (res.confirm) {
            uni.openSetting(); // 打开地图权限设置
          } else if (res.cancel) {
            uni.showToast({
              title: "你拒绝了授权，无法获得周边信息",
              icon: "none",
              duration: 1000,
            });
          }
        },
      });
    },
    toLiveRoom(item) {
      console.log("../lives-room/lives-room?livePreview=" + item.livePreview);
      if (item && item.livePreview) {
        uni.navigateTo({
          url: "../lives-room/lives-room?livePreview=" + item.livePreview,
        });
      } else if (item && item.videoFileUrl) {
        uni.navigateTo({
          url:
            "../../common/video-player/video-player?url=" + item.videoFileUrl,
        });
      }
    },
    reloadData() {
      this.getBannerList();
      this.getHomeList();
      this.getCaseList();
    },
    async getCaseList() {
      this.loading = true;
      let caseItem = await caseList({
        page: this.page,
      });
      this.totalPage = caseItem.totalPage;
      this.caseList = this.caseList.concat(caseItem.list);
      this.loading = false;
      console.log(this.caseList.length);
    },
    async getBannerList() {
      this.bannerList = await getBanner();
    },
    async getHomeList() {
      let list = await queryLive();
      this.liveList = list;

      console.log(this.liveList);
    },
    onScroll(e) {
      this.scrollTop = e.detail.scrollTop;
    },
    toNextPage() {
      uni.navigateTo({
        url: "../../decorate/warehouse-list/warehouse-list",
      });
    },
  },
};
</script>

<style lang="scss">
.pubuBox {
  padding: 22rpx;
}

.pubuItem {
  column-count: 2;
  column-gap: 20rpx;
}

.item-masonry {
  box-sizing: border-box;
  border-radius: 15rpx;
  overflow: hidden;
  background-color: #fff;
  break-inside: avoid;
  /*避免在元素内部插入分页符*/
  box-sizing: border-box;
  margin-bottom: 20rpx;
  box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
}

.item-masonry image {
  width: 100%;
}

.listtitle {
  padding-left: 22rpx;
  font-size: 24rpx;
  padding-bottom: 22rpx;

  .listtitle1 {
    line-height: 39rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 39rpx;
    max-height: 78rpx;
  }

  .listtitle2 {
    color: #ff0000;
    font-size: 32rpx;
    line-height: 32rpx;
    font-weight: bold;
    padding-top: 22rpx;

    .listtitle2son {
      font-size: 32rpx;
    }
  }

  .listtitle3 {
    font-size: 28rpx;
    color: #909399;
    line-height: 32rpx;
    padding-top: 22rpx;
  }
}

.Index {
  width: 100%;
  height: 100%;
}

.banner-content {
  width: 100%;
  height: 200rpx;

  .banner-img {
    width: 100%;
    height: 200rpx;
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
  width: 100%;

  .item {
    flex-shrink: 0;
    width: 200rpx;
    // height: 200rpx;
    text-align: center;
    margin-left: 20rpx;
    // background-color: yellow;

    .img {
      width: 200rpx;
      height: 200rpx;
    }
  }
}

.content {
  height: 100vh;
}

.banner {
  height: 2000rpx;
}

.test {
  height: 2000rpx;
  width: 750rpx;
}
</style>
