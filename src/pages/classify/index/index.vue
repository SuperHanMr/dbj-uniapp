<template>
  <view class="tabs">
    <view class="search">
      <view class="uni-searchbar" @click="searchClick">
        <view class="uni-searchbar__box-icon-search">
          <uni-icons color="#999999" size="18" type="search" />
          <text class="uni-searchbar__text-placeholder">请输入搜索内容</text>
        </view>
      </view>
    </view>
    <view class="content-view">
      <!-- :scroll-into-view="'tab' + scrollInto" 点击移动 -->
      <scroll-view id="tab-bar" class="scroll-h" scroll-x="true" :show-scrollbar="false" v-if="dataList.length > 1">
        <view v-for="(tab,index) in dataList" :key="index" :class="{'uni-tab-item': dataList.length >4, 'uni-tab-item-short2': dataList.length === 2,
             'uni-tab-item-short3': dataList.length === 3, 'uni-tab-item-short4': dataList.length === 4}"
          :id="'tab' + index" :data-current="index" @click="ontabtap">
          <text class="uni-tab-item-title"
            :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
        </view>
      </scroll-view>
      <swiper :current="tabIndex" style="flex: 1;height: 100%" :duration="300" @change="ontabchange">
        <swiper-item class="swiper-item" v-for="(tab,index1) in dataList" :key="index1">
          <index-item :detailData="tab['children']" :tabIndex="tabIndex"></index-item>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
  import indexItem from './index-item.vue';
  import {
    getClassifyList
  } from "../../../api/classify.js";

  export default {
    components: {
      indexItem
    },
    data() {
      return {
        navBarHeight: 0,
        dataList: [],
        newsList: [1, 2, 3, 4],
        cacheTab: [],
        tabIndex: 0,
        scrollInto: ""
      }
    },
    onLoad() {
      getApp().globalData.currentRoute = "/pages/classify/index/index"
    },
    onShow() {
      //增加首页跳转过来逻辑处理
      let naviData = getApp().globalData.naviData
      if (naviData && naviData.id) {
        this.id = naviData.id;
        getApp().globalData.naviData = null
      }
      console.log(naviData);
      this.getList();
    },
    methods: {
      searchClick() {
        uni.navigateTo({
          url: "/sub-classify/pages/search/index"
        })
      },
      getList() {
        let areaId = getApp().globalData.currentHouse.areaId
        getClassifyList(areaId).then((data) => {
          this.dataList = data;
          if (this.id) {
            for (let i = 0; i < data.length; i++) {
              if (this.id == data[i].id) {
                this.tabIndex = i;
              }
            }
          }
        })
      },
      ontabtap(e) {
        let index = e.target.dataset.current || e.currentTarget.dataset.current;
        this.switchTab(index);
      },
      ontabchange(e) {
        let index = e.target.current || e.detail.current;
        this.switchTab(index);
      },
      switchTab(index) {
        if (this.tabIndex === index) {
          return;
        }
        this.tabIndex = index;
        this.scrollInto = index;
      }
    }
  }
</script>

<style scoped>
  .search {
    position: relative;
    height: 90rpx;
  }

  .uni-searchbar {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 686rpx;
    height: 62rpx;
    opacity: 1;
    background: #f7f7f7;
    border-radius: 16rpx;
  }

  .uni-searchbar__box-icon-search {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 16rpx;
    align-items: center;
  }

  .uni-searchbar__text-placeholder {
    font-size: 26rpx;
    color: #A9A9A9;
    margin-left: 10rpx;
  }

  .content-view {
    height: 100%
  }

  .tabs {
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
    height: 100vh;
  }

  .scroll-h {
    width: 100%;
    height: 80rpx;
    text-align: center;
    white-space: nowrap;
  }

  .uni-tab-item-short2 {
    display: inline-block;
    text-align: center;
    min-width: calc(50% - 64rpx);
    width: fit-content;
    margin: 0 1%;
  }

  .uni-tab-item-short3 {
    display: inline-block;
    flex-wrap: nowrap;
    text-align: center;
    min-width: calc(33.3% - 42.7rpx);
    width: fit-content;
    margin: 0 1%;
  }

  .uni-tab-item-short4 {
    display: inline-block;
    flex-wrap: nowrap;
    text-align: center;
    min-width: calc(25% - 32rpx);
    width: fit-content;
    margin: 0 1%;
  }

  .uni-tab-item {
    /* #ifndef APP-PLUS */
    display: inline-block;
    /* #endif */
    flex-wrap: nowrap;
    text-align: center;
    width: fit-content;
    min-width: 16%;
    margin: 0 1%;
  }

  .uni-tab-item-title {
    color: #555;
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-family: PingFangSC;
    color: #999999;
  }

  .uni-tab-item-title-active {
    position: relative;
    color: #111111;
  }

  .uni-tab-item-title-active::after {
    content: "";
    display: inline-block;
    width: 50%;
    height: 4rpx;
    background-color: #00ed7d;
    border-radius: 100px 100px 0px 0px;
    position: absolute;
    bottom: -6rpx;
    left: 0;
    right: 0;
    margin: auto;
  }

  .swiper-item {
    flex: 1;
    flex-direction: row;
  }

  .scroll-v {
    flex: 1;
    /* #ifndef MP-ALIPAY */
    flex-direction: column;
    /* #endif */
    width: 750rpx;
    width: 100%;
  }
</style>
