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
          refresher-background="#FFF" :refresher-enabled="true" :refresher-triggered="triggered" @scroll="onScroll"
          @refresherrefresh="onRefresh">
          <view v-if="currentList.length==0" class="no-list-content">
            <image class="no-list" src="/static/order/blank_house@2x.png" mode=""></image>
            <view class="tip-text">
              您还没有任何数据~
            </view>
          </view>
          <view class="service-area-change-item" v-for="item in currentList" :key="item" @click="toCost(item)">
            <view class="item-top">
              <view class="item-top-left">
                <image class="avatar" :src="item.imageUrl" mode="aspectFit"></image>
              </view>
              <view class="item-top-middle">
                  <view>
                    <text class="name">{{ item.serverName }}</text>
                    <text class="role">设计师</text>
                  </view>
                  <view class="time"> {{ item.createTime | formatDate}}</view>
              </view>
              <view class="item-top-right">
                <view :class="{ 'status': true, 'status-green': item.status == 2 && item.type == 3,
                  'status-orange': (item.status == 2 && item.type == 1) || item.status == 5 || item.status == 6 }">
                  {{ getStatusStr(item.type, item.status) }}
                </view>
                <view><text class="symbol"><text v-if="item.type == 3">-</text>￥</text>
                <text class="price-font price">
                  {{ (Math.abs(item.amount) / 100).toFixed(2)}}
                </text>
                </view>
              </view>
            </view>
            <view class="item-bottom">
              {{ item.type == 3 ? "减少": "增加" }}面积：{{ item.newNum }}{{ item.unit }}
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    getAreaChangeOrder
  } from "../../../api/decorate.js";
  import {
    formatDate
  } from '@/utils/common.js'
  export default {
    data() {
      return {
        serveCardId: 0,
        list0: [],
        list1: [],
        list2: [],
        tabList: ["已完成", "待处理", "已拒绝"],
        triggered: false, //控制刷新显示字段
        currentIndex: 0,
        refreshIndex: -1,
        ownered: false,
      };
    },
    filters: {
      formatDate
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
      this.serveCardId = e.serveCardId
      this.getList(true);
    },

    methods: {
      foramtPrice(item) {
        let price = String(item || "0");
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

      getStatusStr(type, status) {
        let res = "";
        switch(status) {
          case 2:
            if(type == 1){
              res = "待付款";
            } else if (type == 3){
              res = "待退款";
            }
            break;
          case 3:
            res = "已拒绝";
            break;
          case 5:
            res = "待付款";
            break;
          case 6:
            res = "退款中";
            break;
          case 7:
            res = "已支付";
            break;
          case 8:
            res = "已退款";
            break;
        }
        return res;
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
        this.getList(false);
      },

      toCost(item){
        uni.navigateTo({
          url: `/sub-decorate/pages/service-area-change-cost/service-area-change-cost?changeOrderId=${item.changeOrderId}`,
        });
      },

      getList(isRefresh) {
        const params = {
          state: this.currentIndex,
          serveCardId : this.serveCardId
        };
        getAreaChangeOrder(params).then((res) => {
          if (isRefresh) {
            this.triggered = false;
            this.refreshIndex = -1;
          }
          if(!res.length) return;
          if (this.currentIndex === 0) {
            this.list0 = this.list0.concat(res);
          } else if (this.currentIndex === 1) {
            this.list1 = this.list1.concat(res);
          } else if (this.currentIndex === 2) {
            this.list2 = this.list2.concat(res);
          }
        }).catch((e) => {
          if(isRefresh) {
            this.triggered = false;
            this.refreshIndex = -1;
          }
        })
      },

      onRefresh() {
        if (this.refreshIndex == -1) {
          this.refreshIndex = this.currentIndex;
        } else {
          return;
        }
        this.triggered = true;
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
        flex: 1 0 30%;
        text-align: right;
        .status{
          font-size: 26rpx;
          color: #999999;
        }
        .status-green{
          color: #00BFB6;
        }
        .status-orange{
          color: #FE9000;
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
