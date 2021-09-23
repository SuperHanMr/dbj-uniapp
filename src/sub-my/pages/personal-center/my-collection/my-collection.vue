<template>
  <view class="fill">
    <view class="tab-container">
      <view class="top-tab">
        <view
          v-for="(item,index) in tabList"
          :key="index"
          class="item"
          :class="{selected:index==currentIndex}"
          @click="currentIndex=index"
        >
          <view class="tab-text">
            {{item}}
          </view>

          <view class="bottom-icon" />
        </view>
      </view>
      <view class="edit-btn">
        <text>管理</text>
        <!-- <text>完成</text> -->
      </view>
    </view>

    <swiper
      class="swiper"
      :current="currentIndex"
      :duration="200"
      @change="swiperChange"
      :style="{background:tabList.length > 0 ?'none':'#fff'}"
    >
      <swiper-item
        v-if="tabList.length > 0"
        v-for="(item,tabindex) in tabList"
        :key="tabindex"
      >
        <scroll-view
          class="scroll-view"
          scroll-y="true"
          refresher-background="#FFF"
          refresher-enabled="true"
          :refresher-triggered="triggered"
          @refresherrefresh="onRefresh"
          @scrolltolower="onLoadMore"
        >
          <waterfall
            :list="caseList"
            @selectedItem="onSelectedItem"
          ></waterfall>

        </scroll-view>

      </swiper-item>

      <swiper-item
        v-else
        class="empty-container"
      >
        <view class="line" />
        <view class="empty-body">
          <image
            src="../../../../static/order/blank_house@2x.png"
            mode=""
          ></image>
          <text v-if="tabindex==0">您还没有收藏商品</text>
          <text v-if="tabindex==1">您还没有收藏案例</text>
        </view>
      </swiper-item>

    </swiper>
  </view>
</template>

<script>
import { caseList } from "../../../../api/home.js";
export default {
  data() {
    return {
      triggered: false,
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        11,
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
      ],
      list1: [
        "sad",
        "ddw",
        "sdfsda",
        "sdfas",
        "gfds",
        "zxcv",
        "bgf",
        "uytre",
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
      ],
      tabList: ["商品", "案例"],
      triggered: false, //控制刷新显示字段
      currentIndex: 0,
      caseList: [],
      loading: false,
      page: 1,
      totalPage: 1,
    };
  },
  onShow() {
    this.getCaseList();
  },
  computed: {
    currentList() {
      if (this.currentIndex == 0) {
        return this.list;
      } else if (this.currentIndex == 1) {
        return this.list1;
      } else if (this.currentIndex == 2) {
        return this.list2;
      } else {
        return this.list1;
      }
    },
  },
  methods: {
    swiperChange(e) {
      let index = e.target.current || e.detail.current;
      this.currentIndex = index;
    },
    async getCaseList() {
      this.loading = true;
      let caseItem = await caseList({
        page: this.page,
      });
      this.totalPage = caseItem.totalPage;
      this.caseList = this.caseList.concat(caseItem.list);
      this.loading = false;
    },
    onLoadMore() {
      if (this.loading || this.page >= this.totalPage) {
        return;
      }
      this.page++;
      this.getCaseList();
    },
    onRefresh(e) {
      this.triggered = true;
      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.fill {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}
.tab-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx 0 32rpx;
  background-color: #fff;
  .top-tab {
    height: 80rpx;
    display: flex;
    flex-direction: row;
    .item {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      height: 80rpx;
      color: #999999;
      font-size: 30rpx;
      position: relative;

      .tab-text {
        width: 60rrpx;
        height: 42rpx;
        line-height: 42rpx;
        text-align: center;
        margin-right: 72rpx;
      }
    }

    .selected {
      color: #333333;
      .bottom-icon {
        position: absolute;
        width: 32rpx;
        height: 4rpx;
        background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
        border-radius: 200rpx 200rpx 0px 0px;
        bottom: 0;
        left: 30rpx;
        margin-left: -16rpx;
      }
    }
  }

  .edit-btn {
    font-size: 28rpx;
    color: #00bfb6;
  }
}

.swiper-item {
  height: 200rpx;
  width: 100%;
}

.swiper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  height: 100%;
}
.empty-container {
  .line {
    width: 100%;
    height: 2rpx;
    background: #f4f4f4;
  }
  .empty-body {
    padding: 180rpx 240rpx 0 240rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
    image {
      width: 248rpx;
      height: 248rpx;
      object-fit: cover;
      margin-bottom: 22rpx;
    }
    text {
      font-size: 26rpx;
      font-weight: 400;
      text-align: center;
      color: #999999;
    }
  }
}
</style>
