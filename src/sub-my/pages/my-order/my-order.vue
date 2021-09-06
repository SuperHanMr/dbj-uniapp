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
        <view class="tab-text">
          {{item}}
        </view>
        <view class="bottom-icon" />
      </view>
    </view>
    <swiper
      class="swiper"
      :current="currentIndex"
      :duration="200"
      @change="swiperChange"
    >
      <swiper-item
        v-for="(item,tabindex) in tabList"
        :key="tabindex"
      >
        <scroll-view
          :scroll-y="true"
          refresher-background="#FFF"
          :refresher-triggered="triggered"
          @refresherrefresh="onRefresh"
          @scrolltolower="onLoadMore"
        >
          <view class="swiper-item">

            <view
              class="order-container"
              v-if="currentIndex==1"
              v-for="item in orderList"
              :key="item.id"
            >
              <view class="header">
                <view class="store-name">
                  <text>{{item.orderName?item.orderName:item.storeName}}</text>
                  <image
										v-if="!item.orderName"
                    src="../../../static/order/ic_more@2x.png"
                    mode=""
                  ></image>
                </view>
                <view
                  class="order-status"
                  :class="{active:false}"
                >
                  <!-- 代付款 -->
                  {{
										item.orderStatus === 0
										?"代付款"
										:item.orderStatus === 1
										?(item.shipmentStatus == 1?"待发货":"已发货")//发货状态（1待发货，2已发货）
										:item.orderStatus === 2
										?"已完成"
										:item.orderStatus === 3
										?"已关闭"
										:"1111"
									}}
                </view>
              </view>

              <view class="body">
								<view class="product-info" v-if="item.orderName">
								  <view class="product-img">
								    <scroll-view
								      scroll-x
								      style="width: 100%; white-space: nowrap;"
								    >
								      <image
								        src="../../../static/images/message/ic_interaction@2x.png"
								        mode=""
								      ></image>
								      <image
								        src="../../../static/images/message/ic_interaction@2x.png"
								        mode=""
								      ></image>
								      <image
								        src="../../../static/images/message/ic_interaction@2x.png"
								        mode=""
								      ></image>
								      <image
								        src="../../../static/images/message/ic_interaction@2x.png"
								        mode=""
								      ></image>
								      <image
								        src="../../../static/images/message/ic_interaction@2x.png"
								        mode=""
								      ></image>
								      <image
								        src="../../../static/images/message/ic_interaction@2x.png"
								        mode=""
								      ></image>
								    </scroll-view>
								  </view>
								  <view class="total-price">
								    <view class="product-price">
								      <text style="font-size:22rpx;">￥</text>
								      <text style="font-weight: 400;">1111128</text>
								      <text style="font-size:22rpx;">.00</text>
								    </view>
								    <view>共1件</view>
								  </view>
								</view>
								 
								 <order-item v-else></order-item>					 
              </view>
							
							<view class="price">
							  <view class="total-pay">
							    <text>总价</text>
							    <text style="font-size:18rpx;">￥</text>
							    <text>{{handlePrice(item.orderTotalAmount)[0]}}.</text>
							    <text style="font-size:18rpx;">{{handlePrice(item.orderTotalAmount)[1]}}</text>
							    <text style="margin-left: 18rpx;">优惠</text>
							    <text style="font-size:18rpx;">￥</text>
							    <text>99.</text>
							    <text style="font-size:18rpx;">00</text>
							  </view>
							  <view class="need-pay">
							    <text>需付款(含搬运费)</text>
									<!-- <text>实付</text>
									<text>需付款</text> -->
							    <text style="color:#FF3347;margin-left: 8rpx;">
							      <text style="font-size:18rpx;">￥</text>
							      <text style="font-size: 32rpx;">{{handlePrice(item.orderReceivableAmount)[0]}}.</text>
							      <text style="font-size:18rpx;">{{handlePrice(item.orderReceivableAmount)[1]}}</text>
							    </text>
							  </view>
							</view>

              <view class="line" v-if="item.showCancelOrderTime || item.showCancelBtn || item.showToPayBtn"/>

              <view class="footer" v-if="item.showCancelOrderTime || item.showCancelBtn || item.showToPayBtn" :class="{buttonContainer:!item.showCancelOrderTime}">
           
                <view v-if="item.showCancelOrderTime" class="set-interval">
                  <image  src="../../static/ic_time@2x.png" mode=""></image>
                  <view class="time-text">
                    <text style="margin-right: 12rpx;height: 36rpx;line-height: 36rpx;">剩余支付时间</text>
                    <text class="time-style1">01</text>
                    <text style="color:#FF3347; margin: 0 6rpx;">:</text>
                    <text class="time-style1">59</text>
                    <text style="color:#FF3347; margin: 0 6rpx;">:</text>
                    <text class="time-style1">59</text>
                  </view>
                  <!-- view class="time-text">
							      <text style="margin-right: 12rpx;height: 36rpx;line-height: 36rpx;">剩余支付时间</text>
							      <text class="time-style2">01</text>
							      <text style="margin: 0 6rpx;">:</text>
							      <text class="time-style2">59</text>
							      <text style="margin: 0 6rpx;">:</text>
							      <text class="time-style2">59</text>
							    </view> -->
                </view>

                <view  v-if="item.showToPayBtn || item.showCancelBtn" class="button">
                  <button
                    v-if="item.showCancelBtn"
                    type="default"
                    size="mini"
                    class="cancel-order"
                  >取消订单</button>
									
                  <button
                    v-if="item.showToPayBtn"
                    type="default"
                    size="mini"
                    class="go-to-pay"
                  >去付款</button>
                </view>
              </view>
            
						</view>
						
						
						
						
						
						
						
						
						
						

            <view class="order-container">
              <view class="header">
                <view class="store-name">
                  <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
                  <image
                    src="../../../static/order/ic_more@2x.png"
                    mode=""
                  ></image>
                </view>
                <view
                  class="order-status"
                  :class="{active:isActive}"
                >
                  代付款
                </view>
              </view>

              <view class="body">
                <order-item></order-item>
                <order-item></order-item>
              </view>

              <view class="price">
                <view class="total-pay">
                  <text>总价</text>
                  <text style="font-size:18rpx;">￥</text>
                  <text>320.</text>
                  <text style="font-size:18rpx;">00</text>
                  <text style="margin-left: 18rpx;">优惠</text>
                  <text style="font-size:18rpx;">￥</text>
                  <text>99.</text>
                  <text style="font-size:18rpx;">00</text>
                </view>
                <view class="need-pay">
                  <text>需付款(含搬运费)</text>
                  <text style="color:#FF3347;margin-left: 8rpx;">
                    <text style="font-size:18rpx;">￥</text>
                    <text style="font-size: 32rpx;">8888.</text>
                    <text style="font-size:18rpx;">00</text>
                  </text>
                </view>
              </view>

              <view class="line" />

              <!-- <view class="footer" >
								<view class="set-interval">
									<image src="../../../static/order/ic／time@2x.png" mode=""></image>
									<text>
										<text style="margin-right: 12rpx;">剩余支付时间</text>
										<text class="time-style1">01</text>
										<text style="color:#FF3347; margin: 0 6rpx;">:</text>
										<text class="time-style1">59</text>
										<text style="color:#FF3347; margin: 0 6rpx;">:</text>
										<text class="time-style1">59</text>
									</text>
									<text>
										<text style="margin-right: 12rpx;">剩余支付时间</text>
										<text class="time-style2">01</text>
										<text style="margin: 0 6rpx;">:</text>
										<text class="time-style2">59</text>
										<text style="margin: 0 6rpx;">:</text>
										<text class="time-style2">59</text>
									</text>
								</view>

								<view class="button">
									<button
										type="default"
										size="mini"
										class="cancel-order"
									>取消订单</button>
									<button
										type="default"
										size="mini"
										class="go-to-pay"
									>去付款</button>
								</view>
							</view> -->

              <view class="confirm-receipt">
                <button
                  type="default"
                  size="mini"
                  class="confirm"
                >确认收货
                </button>
              </view>

            </view>

            <view class="order-container">
              <view class="header">
                <view class="store-name">
                  <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
                  <image
                    src="../../../static/order/ic_more@2x.png"
                    mode=""
                  ></image>
                </view>
                <view
                  class="order-status"
                  :class="{active:isActive}"
                >
                  代付款
                </view>
              </view>

              <view class="body">
                <order-item></order-item>
              </view>

              <view class="price">
                <view class="total-pay">
                  <text>总价</text>
                  <text style="font-size:18rpx;">￥</text>
                  <text>320.</text>
                  <text style="font-size:18rpx;">00</text>
                  <text style="margin-left: 18rpx;">优惠</text>
                  <text style="font-size:18rpx;">￥</text>
                  <text>99.</text>
                  <text style="font-size:18rpx;">00</text>
                </view>
                <view class="need-pay">
                  <text>需付款(含搬运费)</text>
                  <text style="color:#FF3347;margin-left: 8rpx;">
                    <text style="font-size:18rpx;">￥</text>
                    <text style="font-size: 32rpx;">8888.</text>
                    <text style="font-size:18rpx;">00</text>
                  </text>
                </view>
              </view>

              <view class="line" />

              <view class="footer">

                <view class="set-interval">
                  <image
                    src="../../../static/order/ic_more@2x.png"
                    mode=""
                  ></image>
                  <!-- <text>
										<text style="margin-right: 12rpx;">剩余支付时间</text>
										<text class="time-style1">01</text>
										<text style="color:#FF3347; margin: 0 6rpx;">:</text>
										<text class="time-style1">59</text>
										<text style="color:#FF3347; margin: 0 6rpx;">:</text>
										<text class="time-style1">59</text>
									</text> -->
                  <text>
                    <text style="margin-right: 12rpx;">剩余支付时间</text>
                    <text class="time-style2">01</text>
                    <text style="margin: 0 6rpx;">:</text>
                    <text class="time-style2">59</text>
                    <text style="margin: 0 6rpx;">:</text>
                    <text class="time-style2">59</text>
                  </text>
                </view>

                <view class="button">
                  <button
                    type="default"
                    size="mini"
                    class="cancel-order"
                  >取消订单</button>
                  <button
                    type="default"
                    size="mini"
                    class="go-to-pay"
                  >去付款</button>
                </view>
              </view>

              <!-- <view class="confirm-receipt" >
								<button
									type="default"
									size="mini"
									class="confirm"
								>确认收货
								</button>
							</view> -->

            </view>

            <view class="order-container">
              <view class="header">
                <view class="store-name">
                  <text>多店铺同时下单的标题样式真复杂</text>
                </view>
                <view class="order-status">
                  代付款
                </view>
              </view>
              <view class="body">
                <view class="product-info">
                  <view class="product-img">
                    <scroll-view
                      scroll-x
                      style="width: 100%; white-space: nowrap;"
                    >
                      <image
                        src="../../../static/images/message/ic_interaction@2x.png"
                        mode=""
                      ></image>
                      <image
                        src="../../../static/images/message/ic_interaction@2x.png"
                        mode=""
                      ></image>
                      <image
                        src="../../../static/images/message/ic_interaction@2x.png"
                        mode=""
                      ></image>
                      <image
                        src="../../../static/images/message/ic_interaction@2x.png"
                        mode=""
                      ></image>
                      <image
                        src="../../../static/images/message/ic_interaction@2x.png"
                        mode=""
                      ></image>
                      <image
                        src="../../../static/images/message/ic_interaction@2x.png"
                        mode=""
                      ></image>
                    </scroll-view>
                  </view>
                  <view class="total-price">
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text style="font-weight: 400;">1111128</text>
                      <text style="font-size:22rpx;">.00</text>
                    </view>
                    <view>共1件</view>
                  </view>
                </view>
              
							
							
							</view>
              <view class="price">
                <view class="total-pay">
                  <text>总价</text>
                  <text style="font-size:18rpx;">￥</text>
                  <text>320.</text>
                  <text style="font-size:18rpx;">00</text>
                  <text style="margin-left: 18rpx;">优惠</text>
                  <text style="font-size:18rpx;">￥</text>
                  <text>99.</text>
                  <text style="font-size:18rpx;">00</text>
                </view>
                <view class="need-pay">
                  <text>需付款(含搬运费)</text>
									
                  <text style="color:#FF3347;margin-left: 8rpx;">
                    <text style="font-size:18rpx;">￥</text>
                    <text style="font-size: 32rpx;">99.</text>
                    <text style="font-size:18rpx;">00</text>
                  </text>
                </view>
              </view>
              <view class="line" />
              <view class="footer">
                <view class="set-interval">
                  <image
                    src="../../../static/order/ic_time@2x.png"
                    mode=""
                  ></image>
                  <text>
                    <text style="margin-right: 12rpx;">剩余支付时间</text>
                    <text class="time-style1">01</text>
                    <text style="color:#FF3347; margin: 0 6rpx;">:</text>
                    <text class="time-style1">59</text>
                    <text style="color:#FF3347; margin: 0 6rpx;">:</text>
                    <text class="time-style1">59</text>
                  </text>
                  <!-- 	<text>
										<text style="margin-right: 12rpx;">剩余支付时间</text>
										<text class="time-style2">01</text>
										<text style="margin: 0 6rpx;">:</text>
										<text class="time-style2">59</text>
										<text style="margin: 0 6rpx;">:</text>
										<text class="time-style2">59</text>
									</text> -->
                </view>

                <view class="button">
                  <button
                    type="default"
                    size="mini"
                    class="cancel-order"
                  >取消订单</button>
                  <button
                    type="default"
                    size="mini"
                    class="go-to-pay"
                  >去付款</button>
                </view>

              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getOrderList } from "@/api/order.js";
export default {
  data() {
    return {
      tabList: ["全部", "待付款", "进行中", "已完成", "已关闭"],
      triggered: false, //控制刷新显示字段
      isActive: true,
      currentIndex: 1,
      query: {},
      orderStatus: 0, //订单状态（-1全部,0待付款，1进行中，2已完成 3已关闭）
      rows: 15,
      lastId: -1,
      customerId: 3907,
      orderList: [],
    };
  },
  onShow() {
    this.getOrderList();
  },
  computed: {
	
		
		
		
    currentList() {
      if (this.currentIndex == 0) {
        //全部
        this.orderStatus = -1;
        return this.list;
      } else if (this.currentIndex == 1) {
        //代付款
        this.orderStatus = 0;
        return this.list;
      } else if (this.currentIndex == 2) {
        // 进行中
        this.orderStatus = 1;
        return this.list;
      } else if (this.currentIndex == 3) {
        // 已完成
        this.orderStatus = 2;
        return this.list;
      } else {
        //已关闭
        this.orderStatus = 3;
        return this.list;
      }
    },
		
  },
  watch: {
    orderList() {},
  },

  methods: {
		handlePrice(price){
			let list=String(price).split(".")
			if(list.length==1){
				return [list[0],"00"]
			}else{
				return[list[0],list[1]]
			}
		},
    toDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: "order-in-progress/order-in-progress?orderNo=" + item.id,
      });
    },

    swiperChange(e) {
      let index = e.target.current || e.detail.current;
      this.currentIndex = index;
    },

    async getOrderList() {
      this.loading = true;
      let caseItem = await getOrderList({
        orderStatus: this.orderStatus,
        lastId: this.lastId,
        rows: this.rows,
        customerId: this.customerId,
      });
      console.log(caseItem, "caseItem");
      this.orderList = this.orderList.concat(caseItem);
      this.totalPage = caseItem.totalPage;
      this.loading = false;
    },

    onLoadMore() {
      console.log("onLoadMore!!!!!!!!!!!!!!");
      if (this.loading || this.page >= this.totalPage) {
        return;
      }
      this.page++;
      this.getOrderList();
    },

    onRefresh(e) {
      console.log("刷新!!!!!");
      this.triggered = true;
      setTimeout(() => {
        console.log("????!!!!");
        this.triggered = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.fill {
  width: 100%;
  min-height: 100%;
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
    font-weight: 1000;

    .bottom-icon {
      position: absolute;
      width: 32rpx;
      height: 4rpx;
      background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
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
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .store-name {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    text {
      font-weight: 1000;
      max-width: 476rpx;
      font-size: 28rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    image {
      width: 34rpx;
      height: 34rpx;
      object-fit: cover;
    }
  }

  .order-status {
    color: #fc8b19;
    font-size: 24rpx;
    // font-weight: 800;
    line-height: 100%;
  }
}

.body {
  padding: 32rpx 32rpx 0;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  .product-info {
    // margin-top: 32rpx;
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
      margin-left: 24rpx;
      .product-price {
        height: 32rpx;
        font-size: 32rpx;
        margin-bottom: 8rpx;
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
  height: 1rpx;
  background-color: #f2f2f2;
}



.footer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
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
      .time-style1 {
        width: 36rpx;
        height: 36rpx;
        line-height: 36rpx;
        border-radius: 4rpx;
        background: rgba($color: #ff3347, $alpha: 0.08);
        text-align: center;
        color: #ff3347;
      }
      .time-style2 {
        width: 36rpx;
        height: 36rpx;
        line-height: 36rpx;
        background: #e4e6e6;
        border-radius: 4rpx;
        text-align: center;
      }
    }
  }

  .button {
    .cancel-order {
      width: 140rpx;
      height: 56rpx;
      box-sizing: border;
      border: 2rpx solid #cccccc;
      line-height: 52rpx;
      border-radius: 32rpx;
      font-size: 24rpx;
      text-align: center;
      margin-left: 24rpx;
      padding: 0;
    }

    .go-to-pay {
      width: 140rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      font-size: 24rpx;
      margin-left: 24rpx;
      background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
      border-radius: 32rpx;
      color: #ffffff;
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

.swiper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  swiper-item {
    height: 100%;
    overflow: auto;
    // scroll-view {
    //   padding-bottom: 100rpx;
    // }
  }
}

.scroll-view {
  flex: 1;
  height: 100%;
  background-color: green;
}

button::after {
  border: none;
}

.active {
  color: #808080 !important;
}
</style>
