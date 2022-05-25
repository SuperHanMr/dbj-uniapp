<template>
  <view class="fill">
    <view class="top-tab">
      <view v-for="(item,index) in tabList" :key="item.id" class="item" :class="{selected:index==currentIndex}"
        @click="currentIndex=index">
        <view class="tab-text">
          {{item}}
        </view>
        <image class="bottom-icon" src="/static/images/real-case/select_head.png" v-if="index==currentIndex"/>
      </view>
    </view>
    <swiper class="swiper" :current="currentIndex" :duration="200" @change="swiperChange">
      <swiper-item class="swiper-item" v-for="item in tabList" :key="item">
        <scroll-view class="scroll-view" :enable-back-to-top="true" scroll-y="true" lower-threshold="10"
          refresher-background="#FFF" refresher-enabled="true" :refresher-triggered="triggered" @scroll="onScroll"
          @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">

          <!-- <view v-if="currentList.length==0" class="no-list-content">
            <image class="no-list" src="/static/order/blank_house@2x.png" mode=""></image>
            <view class="tip-text">
              您还没有任何数据~
            </view>
          </view> -->
          <view class="service-area-change-item" v-for="item in currentList" :key="item" @click="toCost">
            <view class="item-top">
              <view class="item-top-left">
                <image class="avatar" :src="isDesign&&(designData.designServerVO && designData.designServerVO.avatar)||tab.avatar" mode="aspectFit"></image>
              </view>
              <view class="item-top-middle">
                  <view>
                    <text class="name">拉布布</text>
                    <text class="role">设计师</text>
                  </view>
                  <view class="time">2022-5-30 12:00:00</view>
              </view>
              <view class="item-top-right">
                <view class="status">已支付</view>
                <view ><text class="symbol">￥</text>
                <text class="price-font price">
                  {{"590.00"}}
                </text>
                </view>
              </view>
            </view>
            <view class="item-bottom">
              增加面积：10平米
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    deliveredList,
    reimburseList,
    receivedList,
  } from "../../../api/order.js";
  import {
    confirmGoods,
    judgeOwner
  } from "../../../api/decorate.js";
  export default {
    data() {
      return {
        projectId: "0",
        list0: [{name:'测试'},{name:'测试'}],
        list1: [{name:'测试'}],
        list2: [{name:'测试'}],
        tabList: ["已完成", "待处理", "已拒绝"],
        lastId: ["", "", ""],
        triggered: false, //控制刷新显示字段
        currentIndex: 0,
        refreshIndex: -1,
        ownered: false,
      };
    },
    computed: {
      currentList() {
        if (this.currentIndex == 0) {
          return this.list0;
        } else if (this.currentIndex == 1) {
          return this.list1;
        } else {
          return this.list2;
        }
      },
    },
    onLoad(e) {
      if (e && e.projectId) {
        this.projectId = e.projectId;
        judgeOwner({
          projectId: this.projectId
        }).then((e) => {
          this.ownered = e.ownered;
        });
      }
      if (e && e.type) {
        this.currentIndex = Number(e.type);
      }

      // if (this.currentIndex == 0) {
        // this.getList(true);
      // }
    },
    // onShow() {
    //   this.onRefresh()
    // },
    methods: {
      foramtPrice(item) {
        let price = String(item || "0");
        console.log(price)
        return price.slice(0, price.length - 2) || "0";
      },
      foramtPrePrice(price) {
        return Number(price / 100).toFixed(2);
      },
      formatCent(item) {
        let price = String(item || "0");
        let fixedNum = Number(price / 100).toFixed(2);
        if (String(fixedNum).split(".").length > 1) {
          return String(fixedNum).split(".")[1];
        } else {
          return "";
        }
      },
      toDetail(e) {
        let id;
        if (this.currentIndex == 0) {
          id = e.orderId;
        } else {
          id = e.id;
        }
        if (this.currentIndex != 3) {
          uni.navigateTo({
            url: `/sub-decorate/pages/warehouse-refund-detail/warehouse-refund-detail?type=${this.currentIndex}&id=${id}&projectId=${this.projectId}&stockStatus=${e.stockStatus}`,
          });
        } else {
          uni.navigateTo({
            url: `/sub-decorate/pages/warehouse-refund-state/warehouse-refund-state?type=${this.currentIndex}&id=${id}&projectId=${this.projectId}&stockStatus=${e.stockStatus}`,
          });
        }
      },
      toRequire() {
        getApp().globalData.naviData = [];
        uni.navigateTo({
          url: `/sub-decorate/pages/require-goods/require-goods?projectId=${this.projectId}`,
        });
      },
      toRefund() {
        getApp().globalData.naviData = {};
        uni.navigateTo({
          url: "/sub-decorate/pages/warehouse-refund/warehouse-refund?projectId=${this.projectId}",
        });
      },
      onScroll(e) {},
      swiperChange(e) {
        let index = e.target.current || e.detail.current;
        this.currentIndex = index;
        if (this.currentIndex == 0 && this.list0.length) {
          return;
        }
        if (this.currentIndex == 1 && this.list1.length) {
          return;
        }
        if (this.currentIndex == 2 && this.list2.length) {
          return;
        }
        // this.getList(false);
      },
      toCost(){
        console.log(111)
        uni.navigateTo({
          url: `/sub-decorate/pages/service-area-change-cost/service-area-change-cost?projectId=${this.projectId}`,
        });
      },
      getList(isRefresh) {
        if (this.lastId[this.currentIndex] == "-1") {
          return;
        }
        let params = {};
        params.projectId = this.projectId;
        params.rows = 10;
        if (this.lastId[this.currentIndex]) {
          params.lastId = this.lastId[this.currentIndex];
        }
        if (this.currentIndex == 0) {
          deliveredList(params)
            .then((e) => {
              if (isRefresh) {
                this.triggered = false;
                this.refreshIndex = -1;
              }
              if (e.length) {
                this.lastId[this.currentIndex] = e[e.length - 1].orderId;
                e.forEach((item) => {
                  item.stockAppVOS.forEach((subItem) => {
                    subItem.number = subItem.stockNumber;
                  });
                });
                console.log(e);
                this.list0 = this.list0.concat(e);
              } else {
                if (this.lastId[this.currentIndex]) {
                  this.lastId[this.currentIndex] = "-1";
                }
              }
            })
            .catch((e) => {
              if (isRefresh) {
                this.triggered = false;
                this.refreshIndex = -1;
              }
            });
        } else if ([1, 2].includes(this.currentIndex)) {
          params.status = this.currentIndex + 1;
          receivedList(params)
            .then((e) => {
              if (isRefresh) {
                this.triggered = false;
                this.refreshIndex = -1;
              }
              if (e.length) {
                this.lastId[this.currentIndex] = e[e.length - 1].id;
                if (this.currentIndex == 1) {
                  this.list1 = this.list1.concat(e);
                }
                if (this.currentIndex == 2) {
                  this.list2 = this.list2.concat(e);
                }
              } else {
                if (this.lastId[this.currentIndex]) {
                  this.lastId[this.currentIndex] = "-1";
                }
              }
            })
            .catch((e) => {
              if (isRefresh) {
                this.triggered = false;
                this.refreshIndex = -1;
              }
            });
        } else {
          reimburseList(params)
            .then((e) => {
              if (isRefresh) {
                this.triggered = false;
                this.refreshIndex = -1;
              }
              if (e.length) {
                this.lastId[this.currentIndex] = e[e.length - 1].id;
                this.list3 = this.list3.concat(e);
              } else {
                if (this.lastId[this.currentIndex]) {
                  this.lastId[this.currentIndex] = "-1";
                }
              }
            })
            .catch((e) => {
              if (isRefresh) {
                this.triggered = false;
                this.refreshIndex = -1;
              }
            });
        }
      },
      onLoadMore() {
        this.getList(false);
      },
      onRefresh() {
        if (this.refreshIndex == -1) {
          this.refreshIndex = this.currentIndex;
        } else {
          return;
        }
        this.triggered = true;
        this.lastId[this.currentIndex] = "";
        if (this.currentIndex == 0) {
          this.list0 = [];
        }
        if (this.currentIndex == 1) {
          this.list1 = [];
        }
        if (this.currentIndex == 2) {
          this.list2 = [];
        }
        this.getList(true);
      },
    },
  };
</script>

<style scoped lang="scss">
  .no-list-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
		background: #ffffff;
  }

  .no-list {
    width: 400rpx;
    height: 400rpx;
  }

  .tip-text {
    margin-top: 24rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #999999;
  }

  .fill {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // overflow-y: hidden;
  }

  .item {
    width: 100%;
    height: 96rpx;
    color: #999999;
    font-size: 30rpx;
    position: relative;

    .tab-text {
      width: 150rpx;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
    }
  }

  .top-tab {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 96rpx;
    background-color: #ffffff;

    .item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      color: #999999;
    }

    .selected {
      color: #111111;
      font-weight: 500;
      font-size: 30rpx;

      .bottom-icon {
        position: absolute;
        width: 32rpx;
        height: 6rpx;
        bottom: 10rpx;
        left: 50%;
        margin-left: -16rpx;
      }
    }
  }

  .swiper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .swiper-item {
    height: 100%;
    overflow: auto;
  }

  .scroll-view {
    flex: 1;
    height: 100%;
  }

  .service-area-change-item{
    display: flex;
    flex-direction: column;
    background: #fff;
    margin: 24rpx;
    padding: 24rpx;
    border-radius: 24rpx;
    .item-top{
      display: flex;
      .item-top-left{
        .avatar {
          width: 72rpx;
          height: 72rpx;
          border-radius: 36px;
          object-fit: cover;
          background: rgb(228, 227, 227);
        }
      }
      .item-top-middle{
        margin-left: 24rpx;
        .name{
          font-size: 28rpx;
          color: #333333;

        }
        .role{
          margin-left: 12rpx;
          padding: 0 8rpx;
          line-height: 28ppx;
          font-size: 20rpx;
          color: #4FBEED;
          background: #F4FBFE;
        }
        .time {
          font-size: 22rpx;
          color: #999999;
        }
      }
      .item-top-right{
        flex: 1;
        text-align: right;
        .status{
          font-size: 26rpx;
          color: #999999
        }
        .symbol{
          font-size: 24rpx;
        }
        .price{
          font-size: 32rpx;
          color: #333333;
        }
      }

    }
    .item-bottom{
      margin-top: 16rpx;
      padding: 16rpx 40rpx;
      background: #F6F7F7;
      border-radius: 8rpx;
      font-size: 26rpx;
      color: #333333;

    }
  }

</style>
