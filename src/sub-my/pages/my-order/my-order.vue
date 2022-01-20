<template>
  <view class="fill">
    <view class="top-tab">
      <view
        v-for="(item,index) in tabList"
        :key="index"
        class="item"
        :class="{selected:index==currentIndex}"
        @click="currentIndex=index"
      >
        <view class="tab-text">{{item}}</view>
        <view class="bottom-icon"
					:style="{backgroundImage:`url(${bgcIcon})`,backgroundSize: '100% 100%'}"
				/>
      </view>
    </view>
    <swiper
      class="swiper"
      :class="{empty:orderListLength<=0}"
      :current="currentIndex"
      :duration="200"
      @change="swiperChange"
    >
      <swiper-item
        v-for="item in tabList"
        :key="item"
      >
        <scroll-view
          class="scroll-view"
          :enable-back-to-top="true"
          lower-threshold="10"
          scroll-y="true"
          refresher-background="#FFF"
          :refresher-triggered="triggered"
          @refresherrefresh="onRefresh"
          refresher-enabled="true"
          @scrolltolower="onLoadMore"
        >
          <view
            v-if="loading"
            class="swiper-item empty-container"
          />
          <view
            v-if=" orderList.length > 0 "
            :style="{paddingBottom:systemBottom}"
            class="swiper-item"
          >
            <view
              class="order-container"
              v-for="item in orderList"
              :key="item.id"
            >
              <view class="header">
                <view
                  class="store-name"
                  @click="gotoShop(item)"
                >
                  <text v-if="item.type ==5">{{item.orderName}}</text>
                  <text v-else>
                    <text v-if="item.orderStatus == 0 ">{{item.orderName?item.orderName:item.storeName}}</text>
                    <text v-else>{{item.storeName}}</text>
                  </text>
                  <image
                    v-if="!item.orderName && item.type !== 5"
                    src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg"
                    mode=" "
                  />
                </view>
                <view v-if="currentIndex!==1"
                  class="order-status"
                  :class="{active: item.orderStatus == 2 || item.orderStatus == 3}"
                  @click="goToDetail(item)"
                >
                  {{
										item.orderStatus == 1
										?(item.type == 2
											? "进行中"
											:item.stockType == 1
											?"进行中"
											:(item.shipmentStatus == 0
												?"待发货"
												:item.shipmentStatus == 1
													? "待收货"
													:"已收货"))//发货状态 （0待发货 1待收货 2已收货）
										:item.orderStatusName
									}}
                </view>
								<view
									class="countDownStyle"
									v-if="currentIndex==1 && item.showCancelOrderTime"
									:style="{backgroundImage:showDangerBgc?`url(${countDownBgc1})`:`url(${countDownBgc2})`,backgroundSize: '100% 100%'}"
								>
									<count-down
										class="count_down"
									  :start="item.remainTime"
									  :timeBackground="''"
									  :timeColor="!showDangerBgc?'#222222':'#F83112'"
									  :separatorColor="!showDangerBgc?'#222222':'#F83112'"
									  @finish="onRefresh(e)"
										@changeBgc="changeBgc"
									/>
								</view>
              </view>

              <view class="body">
                <!-- 套餐 -->
                <view
                  class="product-info"
                  v-if="item.orderStatus == 0 && item.orderName && item.details.length>1"
                  @click="goToDetail(item)"
                >
                  <view class="product-img">
                    <scroll-view
                      scroll-x
                      style="width: 100%; white-space: nowrap;"
                    >
                      <image
                        v-for="item2 in handleImage(item.details)"
                        :key="item2"
                        :src="`${item2}?x-oss-process=image/resize,m_mfit,w_272,h_272`"
                        mode="aspectFill"
                      />
                    </scroll-view>
                  </view>
                  <view class="total-price">
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text
                        style="font-weight: 400;"
                        class="price-font"
                      >
                        {{handlePrice(item.totalAmount)[0]}}.
                      </text>
                      <text
                        style="font-size:22rpx;"
                        class="price-font"
                      >
                        {{handlePrice(item.totalAmount)[1]}}
                      </text>
                    </view>

                    <view>共{{item.goodsNumber}}类</view>
                  </view>
                </view>

                <!-- 非套餐 -->
                <view
                  v-else
                  v-for="item2 in item.details"
                  :key="item2.id"
                >
                  <!-- 服务和材料 -->
                  <order-item
                    v-if="item2.type !== 5"
                    :dataList="item2"
                    @handleDetail="goToDetail(item)"
                  />
                  <!-- 储值卡 -->
                  <store-calue-card-item
                    v-if="item.orderStatus !==1 && item2.type==5"
                    :dataInfo="item2"
                    @handleDetail="goToDetail(item)"
                  />
                </view>
              </view>

              <view class="price">
                <view class="total-pay">
                  <text>
                    <text>总价</text>
                    <text style="font-size:18rpx;">￥</text>
                    <text style="font-size: 22rpx;">{{handlePrice(item.orderTotalAmount)[0]}}.</text>
                    <text style="font-size:18rpx;">{{handlePrice(item.orderTotalAmount)[1]}}</text>
                  </text>
                  <text v-if="item.discount">
                    <text style="margin-left: 18rpx;">优惠</text>
                    <text style="font-size:18rpx;">￥</text>
                    <text style="font-size: 22rpx;">{{handlePrice(item.discount)[0]}}.</text>
                    <text style="font-size:18rpx;">{{handlePrice(item.discount)[1]}}</text>
                  </text>
                </view>

                <view
                  v-if="item.orderStatus == 0"
                  class="need-pay"
                >
                  <text v-if="item.freight && item.handlingFees">需付款(含运费、搬运费)</text>
                  <text v-if="item.freight && !item.handlingFees">需付款(含运费)</text>
                  <text v-if=" !item.freight && item.handlingFees">需付款(含搬运费)</text>
                  <text v-if="!item.freight && !item.handlingFees">需付款</text>
                  <text style="color:#F83112;margin-left: 8rpx;">
                    <text style="font-size:22rpx;">￥</text>
                    <text
                      style="font-size: 32rpx;"
                      class="price-font"
                    >{{handlePrice(item.payAmount)[0]}}.</text>
                    <text
                      style="font-size:22rpx;"
                      class="price-font"
                    >{{handlePrice(item.payAmount)[1]}}</text>
                  </text>
                </view>

                <view
                  v-else
                  class="need-pay"
                >
                  <text>实付</text>
                  <text
                    v-if="item.orderStatus == 3"
                    style="color:#333333;margin-left: 8rpx;"
                  >
                    <text style="font-size:18rpx;">￥</text>
                    <text
                      style="font-size: 32rpx;"
                      class="price-font"
                    >{{handlePrice(item.payAmount)[0]}}.</text>
                    <text
                      style="font-size:18rpx;"
                      class="price-font"
                    >{{handlePrice(item.payAmount)[1]}}</text>
                  </text>
                  <text
                    v-else
                    style="color:#333333;margin-left: 8rpx;"
                  >
                    <text style="font-size:18rpx;">￥</text>
                    <text
                      style="font-size: 32rpx;"
                      class="price-font"
                    >{{handlePrice(item.totalActualIncomeAmount)[0]}}.</text>
                    <text
                      style="font-size:18rpx;"
                      class="price-font"
                    >{{handlePrice(item.totalActualIncomeAmount)[1]}}</text>
                  </text>
                </view>
              </view>

              <view
                class="line"
                v-if="item.orderStatus == 1 && item.shipmentStatus == 1"
              />

              <view
                class="footer buttonContainer"
                v-if="item.orderStatus == 0 && (item.showCancelBtn || item.showToPayBtn)"
              >
                <!-- <view
                  v-if="item.showCancelOrderTime "
                  class="set-interval"
                >
                  <image
                    src="../../static/ic_time@2x.png"
                    mode=""
                  />

                  <view class="time-text">
                    <text class="remainPayTime">剩余支付时间</text>
                    <count-down
                      :start="item.remainTime"
                      :timeBackground="'#E4E6E6'"
                      :timeColor="'#333333'"
                      :separatorColor="'#333333'"
                      @finish="onRefresh(e)"
                    />
                  </view>

                </view> -->

                <view
                  v-if="item.showToPayBtn || item.showCancelBtn"
                  class="waitPayBottom"
                >
                  <view
                    v-if="item.showCancelBtn"
                    class="cancel-order"
                    @click="handleCancelOrder(item.id)"
                  >
                    取消订单
                  </view>
                  <view
                    v-if="item.showToPayBtn"
                    class="go-to-pay"
                    @click="toPay(item)"
                  >
                    去付款
                  </view>
                </view>
              </view>
              <view
                class="footer buttonContainer"
                v-if="item.orderStatus == 1 && item.stockType == 0 && item.shipmentStatus == 1"
              >
                <view class="button">
                  <view class="go-to-pay" @click="handleConfirmReceipt(item)">确认收货</view>
                </view>
              </view>
            </view>
          </view>
					<!-- 空白页面 -->
          <view v-if="orderList.length == 0 && !loading" class="swiper-item empty-container">
            <view class="empty-page">
              <view class="content ">
                <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/img_noOrder.svg" />
              </view>
							<view class="text">您暂时没有相关订单哦～</view>
            </view>
          </view>


        </scroll-view>
      </swiper-item>

    </swiper>

    <!-- 取消订单的弹框 -->
    <popup-dialog
      ref="cancleOrder"
      :title="title"
      @close="cancelOrderClose"
      @confirm="cancleConfirm"
    />
    <!-- 确认收货的弹框 -->
    <popup-dialog
      ref="confirmReceipt"
      :title="title"
      @close="confirmReceiptClose"
      @confirm="receiptConfirm"
    />

  </view>
</template>

<script>
import {
  queryOrderList,
  orderPay,
  cancelOrder,
  confirmReceiptOrder,
} from "@/api/order.js";
export default {
  data() {
    return {
      tabList: ["全部", "待付款", "进行中", "已完成", "已关闭"],
      triggered: false, //控制刷新显示字段
      title: "",
      firstEntry: false,

      currentIndex: -1,
      orderStatus: -1, //订单状态（-1全部,0待付款，1进行中，2已完成 3已关闭）
      rows: 15,
			showDangerBgc:"",

      lastId: [-1, -1, -1, -1, -1],
      orderList0: [],
      orderList1: [],
      orderList2: [],
      orderList3: [],
      orderList4: [],

      requestedDataLength: -1,
      orderListLength: 1,

      id: -1,
      systemBottom: "",
      areaId: "",
      loading: false,
      navBarHeight: "",
      title: "我的订单",
			bgcIcon:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/selectIcon.svg",
			countDownBgc1:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/countDown_danger.svg" ,//小于两个小时的样式
			countDownBgc2:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/countDown_normal.svg",//大于两个小时的样式
    };
  },

  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    console.log("menuButtonInfo=", menuButtonInfo);
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    console.log("this.systemBottom=", this.systemBottom);
  },

  onLoad(e) {
    this.firstEntry = e.firstEntry;
    if (e.index) {
      if (e.index == "99") {
        this.currentIndex = 0;
      } else {
        this.currentIndex = Number(e.index);
      }
    }
    this.orderStatus = this.currentIndex - 1;
    const currentHouse = getApp().globalData.currentHouse;
    this.areaId = currentHouse.areaId;
    this.getOrderList();
    // 获取胶囊按钮的位置
    const systemInfo = uni.getSystemInfoSync();
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.navBarHeight =
      menuButtonInfo.top +
      (menuButtonInfo.top - systemInfo.statusBarHeight) +
      menuButtonInfo.height +
      "px";
  },
  onShow() {
    this.title = "我的订单";
    if (this.firstEntry) return;
    this.lastId[this.currentIndex] = -1;
    this.handleReset();
    this.getOrderList();
    if (!getApp().globalData.openId) {
      //确保拿到openId，否则无法支付
      getApp().globalData.openId = uni.getStorageSync("openId");
    }
  },
  onUnload() {
    uni.switchTab({
      url: "/pages/my/index/index",
    });
  },

  computed: {
    orderList() {
      // 通过判断currentIndex 返回不同的数组
      if (this.currentIndex == 0) {
        this.orderListLength = this.orderList0.length;
        return this.orderList0;
      } else if (this.currentIndex == 1) {
        this.orderListLength = this.orderList1.length;
        return this.orderList1;
      } else if (this.currentIndex == 2) {
        this.orderListLength = this.orderList2.length;
        return this.orderList2;
      } else if (this.currentIndex == 3) {
        this.orderListLength = this.orderList3.length;
        return this.orderList3;
      } else {
        this.orderListLength = this.orderList4.length;
        return this.orderList4;
      }
    },
  },
  methods: {
    // 获取列表数据
    getOrderList() {
      this.loading = true;
      queryOrderList({
        isNewVersion: true,
        orderStatus: this.currentIndex - 1,
        lastId: this.lastId[this.currentIndex],
        rows: this.rows,
      }).then((data) => {
        this.triggered = false;
        if (!data.length) {
          this.loading = false;
          console.log("this.loading=", this.loading);
          return;
        }
        if (this.currentIndex == 0) {
          this.lastId[0] = data[data.length - 1].id;
          this.orderList0 = this.orderList0.concat(data);
        } else if (this.currentIndex == 1) {
          this.lastId[1] = data[data.length - 1].id;
          this.orderList1 = this.orderList1.concat(data);
        } else if (this.currentIndex == 2) {
          this.lastId[2] = data[data.length - 1].id;
          this.orderList2 = this.orderList2.concat(data);
        } else if (this.currentIndex == 3) {
          this.lastId[3] = data[data.length - 1].id;
          this.orderList3 = this.orderList3.concat(data);
        } else {
          this.lastId[4] = data[data.length - 1].id;
          this.orderList4 = this.orderList4.concat(data);
        }
        this.loading = false;
        console.log("this.loading=", this.loading);
        this.firstEntry = false;
      });
    },

    swiperChange(e) {
      let index = e.target.current || e.detail.current;
      this.currentIndex = index;
      //index对应的list数据是否为空 为空的话请求数据 有数据的话就不请求了
      switch (this.currentIndex) {
        case 0:
          if (this.orderList0.length < 1) this.getOrderList();
          break;
        case 1:
          if (this.orderList1.length < 1) this.getOrderList();
          break;
        case 2:
          if (this.orderList2.length < 1) this.getOrderList();
          break;
        case 3:
          if (this.orderList3.length < 1) this.getOrderList();
          break;
        case 4:
          if (this.orderList4.length < 1) this.getOrderList();
          break;
      }
    },

    toBack() {
      uni.switchTab({
        url: "/pages/my/index/index",
      });
    },

    //跳转到详情页面
    goToDetail(data) {
      switch (data.orderStatus) {
        case 0:
          console.log("订单id===", data.id);
          // return
          uni.navigateTo({
            url: `order-wait-pay/order-wait-pay?orderNo=${data.id}&from=all`,
          });
          break;
        case 1:
          if (this.currentIndex == 0) {
            console.log("订单id===", data.id);
            uni.navigateTo({
              url: `order-in-progress/order-in-progress?orderNo=${data.id}&from=all`,
            });
          } else {
            uni.navigateTo({
              url: `order-in-progress/order-in-progress?orderNo=${data.id}`,
            });
          }
          break;
        case 2:
          uni.navigateTo({
            url: `order-success/order-success?type=complete&id=${data.id}`,
          });
          break;
        case 3:
          uni.navigateTo({
            url: `order-failed/order-failed?type=close&id=${data.id}`,
          });
          break;
      }
      // if (data.orderStatus == 0) {
      //   //（0待付款，1进行中，2已完成 3已关闭）
      //   uni.navigateTo({
      //     url: `order-wait-pay/order-wait-pay?orderNo=${data.id}?&from=all`,
      //   });
      // } else if (data.orderStatus == 1) {
      //   if (this.currentIndex == 0) {
      //     uni.navigateTo({
      //       url: `order-in-progress/order-in-progress?orderNo=${data.id}&from=all`,
      //     });
      //   } else {
      //     uni.navigateTo({
      //       url: `order-in-progress/order-in-progress?orderNo=${data.id}`,
      //     });
      //   }
      // } else if (data.orderStatus == 2) {
      //   uni.navigateTo({
      //     url: `order-success/order-success?type=complete&id=${data.id}`,
      //   });
      // } else {
      //   uni.navigateTo({
      //     url: `order-failed/order-failed?type=close&id=${data.id}`,
      //   });
      // }
    },

    //去店铺首页
    gotoShop(item) {
      if ((item.orderName || item.isReplenish) && item.orderStatus == 0) return; //多店铺购买 或者变更单
      if (item.type == 5) return; //  储值卡
      uni.navigateTo({
        url: `../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`,
      });
    },

    //刷新
    onRefresh(e) {
      if (this.loading) return;
      this.triggered = true;
      this.lastId[this.currentIndex] = -1;
      this.handleReset();
      this.getOrderList();
    },

    // 加载更多
    onLoadMore() {
      if (this.loading) return;
      // 这个是排除请求回来没有数据的情况
      if (!this.requestedDataLength && this.lastId[this.currentIndex] > 0)
        return;
      this.getOrderList();
    },

    // 取消订单
    handleCancelOrder(id) {
      this.id = id;
      this.title = "您确定要取消该订单吗?";
      this.$refs.cancleOrder.open();
      // this.getOrderList();
    },
    cancelOrderClose() {
      this.$refs.cancleOrder.close();
    },
    cancleConfirm() {
      console.log("取消订单按钮成功！");
      //点击确定后订单会被取消且该订单会被移入已关闭订单中
      cancelOrder({
        id: this.id,
      }).then(() => {
        this.$refs.cancleOrder.close();
        uni.showToast({
          title: "取消订单成功!",
          icon: "none",
          duration: 1000,
        });
        this.onRefresh();
        setTimeout(() => {
          //跳转到订单取消页面
          uni.redirectTo({
            url: `../order-failed/order-failed?type=close&id=${this.id}`,
          });
        }, 1000);
      });
    },

    //去支付
    toPay(item) {
      // 先判断是否支付超额拆单了  未拆单 直接支付 拆单之后直接跳转到拆单页面
      console.log(item, "item.id=", item.id, typeof item.id);
      if (item.isSplitPay) {
        //item.id  是订单id
        uni.navigateTo({
          url: `multiple-payments/multiple-payments?orderId=${item.id}&remainTime=${item.remainTime}&type=list`,
        });
      } else {
        let openId = getApp().globalData.openId;
        console.log("openId=", this.openId);
        orderPay({
          orderId: Number(item.id),
          payType: 1, //支付类型  1在线支付",
          openid: openId,
        }).then((e) => {
          const payInfo = e.wechatPayJsapi;
          uni.requestPayment({
            provider: "wxpay",
            ...payInfo,
            success: () => {
              uni.showToast({
                title: "支付成功！",
                icon: "none",
                duration: 1000,
              });
              setTimeout(() => {
                this.getOrderList();
              }, 1000);
            },
            fail: () => {
              uni.showToast({
                title: "支付失败！",
                icon: "none",
                duration: 1000,
              });
            },
          });
        });
      }
    },

    // 确认收货
    handleConfirmReceipt(item) {
      this.id = item.id;
      this.title = "确定要确认收货？";
      this.$refs.confirmReceipt.open();
    },
    confirmReceiptClose() {
      this.$refs.confirmReceipt.close();
    },
    receiptConfirm(value) {
      // 调用确认收货的接口  //goodIsd 商品id(不传代表整个订单收货)"
      confirmReceiptOrder({
        id: this.id,
      }).then((e) => {
        console.log("成功就关闭弹框");
        this.$refs.confirmReceipt.close();
        uni.showToast({
          title: "确认收货成功！",
          icon: "none",
          duration: 1000,
        });
        this.orderList2 = [];
        this.lastId[2] = -1;
        this.getOrderList();
      });
    },

    //处理页面展示的相关函数
    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
    handleImage(list) {
      return list.map((item) => item.imgUrl);
    },
    formatTime(msTime) {
      // let start = this.start.toString()
      // let timer = parseInt(start)

      // let hours = Math.floor(timer / 1000/ 60 / 60);
      // this.hour = (hours < 10 ? ('0' + hours) : hours);

      // // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
      // // console.log("a.hour=",this.hour)
      // var interval = setInterval(() => {
      // 	this.second = (Array(2).join(0) + parseInt(--this.second)).slice(-2)
      // 	if (this.second == 0) {
      // 		if (this.minute != 0) {
      // 				this.minute = (Array(2).join(0) + parseInt(--this.minute)).slice(-2)
      // 				this.second = 59
      // 		} else {
      // 			if (this.hour != 0) {
      // 				this.hour = (Array(2).join(0) + parseInt(--this.hour)).slice(-2)
      // 				this.minute = 59
      // 				this.second = 59
      // 			} else {
      // 				clearInterval(interval)
      // 			}
      // 		}
      // 	}
      // }, 1000)
    },
    handleReset() {
      switch (this.currentIndex) {
        case 0:
          this.orderList0 = [];
          break;
        case 1:
          this.orderList1 = [];
          break;
        case 2:
          this.orderList2 = [];
          break;
        case 3:
          this.orderList3 = [];
          break;
        case 4:
          this.orderList4 = [];
          break;
      }
    },
		changeBgc(){
			this.showDangerBgc = true
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .navi-header view {
  font-size: 32rpx !important;
  font-weight: bold !important;
}

// page{
// 	height: 100% !important;
// }
.fill {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 4rpx;
  background-color: #fff;
}

.item {
  width: 100%;
  height: 96rpx;

  .tab-text {
    width: 150rpx;
    height: 96rpx;
    font-size: 14.5px;
    line-height: 96rpx;
    text-align: center;
  }
}

.top-tab {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 96rpx;
  font-size: 30rpx;

  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    flex-direction: column;
    color: #999;
    position: relative;
  }

  .selected {
    color: black;
    font-weight: 500;

    .bottom-icon {
      position: absolute;
      width: 32rpx;
      height: 4rpx;
      // background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
      border-radius: 200rpx 200rpx 0px 0px;
      bottom: 10rpx;
      left: 60rpx;
    }
  }
}

.header {
  height: 96rpx;
  margin-top: 16rpx;
  padding: 28rpx 32rpx;
  box-sizing: border-box;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .store-name {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    text {
			display: block;
			height: 40rpx;
      font-weight: 500;
      max-width: 476rpx;
      font-size: 28rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    image {
      width: 40rpx;
      height: 40rpx;
      object-fit: cover;
    }
  }

  .order-status {
    color: #fc8b19;
    font-size: 24rpx;
    // font-weight: 800;
    line-height: 100%;
  }
	.countDownStyle{
		position: relative;
		width: 242rpx;
		height: 37rpx;
		.count_down{
			position: absolute;
			top: 2rpx;
			right: 16rpx;
		}

	}
}
.count_down ::v-deep .count .list{
	width: 30rpx;
	height: 32rpx;
}
.count_down ::v-deep .count .separator{
	width: 4rpx;
	height: 38rpx;
}

.body {
  padding: 32rpx 32rpx 0;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;

  .product-info {
    margin-bottom: 32rpx;
    display: flex;
    flex: 1;
    flex-flow: row nowrap;
    align-items: center;

    image {
      width: 136rpx;
      height: 136rpx;
      margin-right: 16rpx;
    }

    .product-img {
      flex: 1;
      overflow: hidden;

      scroll-view {
        image {
          width: 136rpx;
          height: 136rpx;
          border-radius: 8rpx;
          border: 2rpx solid #f4f4f4;
          box-sizing: border-box;
          margin-right: 24rpx;
        }

        image:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }

    .total-price {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-end;
      color: #999;
      font-size: 22rpx;
      font-weight: 500;
      margin-left: 24rpx;

      .product-price {
        height: 32rpx;
        font-size: 32rpx;
        margin-bottom: 16rpx;
        color: #333333;
      }
    }
  }
}

.price {
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 32rpx 32rpx;
  font-size: 22rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #ffffff;

  .total-pay {
    color: #999;
  }

  .need-pay {
    color: #333;
  }
}

.line {
  width: 100%;
  height: 0.5px;
  background-color: #f2f2f2;
}

.footer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx 32rpx;
  background-color: #ffffff;

  .set-interval {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;

    image {
      width: 36rpx;
      height: 36rpx;
      object-fit: cover;
      margin-right: 4rpx;
    }

    .time-text {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .remainPayTime {
        margin-right: 12rpx;
        height: 36rpx;
        line-height: 36rpx;
      }
    }
  }

  .waitPayBottom {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    .cancel-order {
      width: 140rpx;
      height: 56rpx;
      line-height: 54rpx;
      box-sizing: border-box;
      border: 0.5px solid #cccccc;
      border-radius: 32rpx;
      font-size: 24rpx;
      text-align: center;
      margin-left: 24rpx;
      padding: 0;
    }

    .go-to-pay {
      width: 140rpx;
      height: 56rpx;
      font-weight: bold;
      line-height: 56rpx;
      text-align: center;
      font-size: 24rpx;
      margin-left: 24rpx;
      background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%);
      border-radius: 32rpx;
      color: #ffffff;
      padding: 0;
    }
  }
}

.buttonContainer {
  justify-content: flex-end !important;
}

.confirm-receipt {
  text-align: right;
  padding: 32rpx;
  background-color: #ffffff;

  .confirm {
    width: 140rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    font-size: 24rpx;
    padding: 0;
    margin-left: 24rpx;
    background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
    border-radius: 32rpx;
    color: #ffffff;
  }
}

.changeBgc {
  background-color: #ffffff !important;
}

.line {
  height: 1rpx solid #f2f2f2;
}

.go-to-pay {
  width: 140rpx;
  height: 56rpx;
  font-weight: bold;
  line-height: 56rpx;
  text-align: center;
  font-size: 24rpx;
  margin-left: 24rpx;
  background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
  border-radius: 32rpx;
  color: #ffffff;
  padding: 0;
}

.swiper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  // .swiper-item{
  // 	.order-container:nth-last-child(1){
  // 		margin-bottom: 16rpx;
  // 	}
  // }

  swiper-item {
    height: 100%;
    overflow: auto;

    // scroll-view {
    //   padding-bottom: 100rpx;
    // }
    .empty-page {
      // .line {
      //   height: 1rpx solid #f2f2f2;
      // }

      .content {
        margin: 388rpx 254rpx 0 256rpx;
        width: 240rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        color: #999999;
        image {
          width: 400rpx;
          height: 400rpx;
          object-fit: cover;
        }
      }
			.text {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #999999;
					text-align: center;
        }
    }
  }
}

.empty {
  background-color: #ffffff;
}

.scroll-view {
  flex: 1;
  height: 100%;
}

button::after {
  border: none;
}

.active {
  color: #808080 !important;
}

// 倒计时的样式
::v-deep .uni-countdown__number {
  width: 36rpx !important;
  height: 36rpx !important;
}

::v-deep .uni-countdown__splitor {
  line-height: 36rpx !important;
}

// 弹框样式
::v-deep .uni-popup-dialog {
  width: 560rpx !important;
  border-radius: 24rpx !important;
  background-color: #fff !important;
}

::v-deep .uni-dialog-title-text {
  color: #111111 !important;
  font-size: 32rpx !important;
  font-weight: 550 !important;
}

::v-deep .uni-dialog-title {
  padding: 48rpx 0 !important;
}

::v-deep .uni-dialog-content {
  display: none !important;
}

::v-deep .uni-dialog-button-group {
  border-top: 2rpx solid #f5f5f5;
}

::v-deep .uni-dialog-button {
  height: 82rpx !important;
}

::v-deep .uni-button-color {
  color: #ff3347 !important;
  font-size: 30rpx !important;
  font-weight: 500;
}

::v-deep .uni-dialog-button-text {
  font-size: 30rpx !important;
}
</style>
