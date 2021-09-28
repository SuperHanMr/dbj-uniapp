<template>
  <view class="fill" >
    <view class="top-tab">
      <view
        v-for="(item,index) in tabList"
        :key="index"
        class="item"
        :class="{selected:index==currentIndex}"
        @click="currentIndex=index"
      >
        <view class="tab-text">{{item}}</view>
        <view class="bottom-icon" />
      </view>
    </view>
    <view class="line" />
    <swiper class="swiper" :class="{empty:orderListLength<=0}" :style="{paddingBottom:systemBottom}" :current="currentIndex" :duration="200" @change="swiperChange" >
      <swiper-item  v-for="(item,tabindex) in tabList":key="item">
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
          <view v-if=" orderList.length > 0 "  class="swiper-item">
            <view  class="order-container" v-for="item in orderList" :key="item.id">
              <view class="header">
                <view class="store-name"  @click="gotoShop(item)">
                  <text v-if="item.orderStatus == 0 ">{{item.orderName?item.orderName:item.storeName}}</text>
                  <text v-else>{{item.storeName}}</text>
                  <image v-if="!item.orderName" src="../../../static/order/ic_more@2x.png" mode=" "/>
                </view>
                <view
                  class="order-status"
                  :class="{active: item.orderStatus == 2 || item.orderStatus == 3}">
								<!-- {{item.orderStatusName}} -->
                  {{
										item.orderStatus == 1
										?(item.shipmentStatus == 0?"待发货":item.shipmentStatus == 1 ? "已发货" :"已收货")//发货状态（1待发货，2已发货）
										:item.orderStatusName
									}}
                </view>
              </view>

              <view class="body">
                <!-- 套餐 -->
                <view class="product-info" v-if="item.orderStatus == 0 && item.orderName && item.details.length>1"
                  @click="goToDetail(item)" >
                  <view class="product-img">
                    <scroll-view
                      scroll-x
                      style="width: 100%; white-space: nowrap;"
                    >
                      <image
                        v-for="item2 in handleImage(item.details)"
                        :key="item2"
                        :src="item2"
                        mode=""
                      ></image>
                    </scroll-view>
                  </view>
                  <view class="total-price">
                    <view class="product-price">
                      <text style="font-size:22rpx;">￥</text>
                      <text style="font-weight: 400;">{{handlePrice(item.totalAmount)[0]}}.</text>
                      <text style="font-size:22rpx;">{{handlePrice(item.totalAmount)[1]}}</text>
                    </view>
                    <view>共{{item.goodsNumber}}件</view>
                  </view>
                </view>

                <!-- 非套餐 -->
                <view v-else v-for="item2 in item.details"  :key="item2.id">
                  <order-item
                    :dataList="item2"
                    @handleDetail="goToDetail(item)"
                    :showPrice="true"
                  />
                </view>
              </view>

              <view class="price">
								<view class="total-pay">
									<text>
										<text>总价</text>
										<text style="font-size:18rpx;">￥</text>
										<text>{{handlePrice(item.orderTotalAmount)[0]}}.</text>
										<text style="font-size:18rpx;">{{handlePrice(item.orderTotalAmount)[1]}}</text>
									</text>
									<text v-if="item.discount">
										<text style="margin-left: 18rpx;">优惠</text>
										<text style="font-size:18rpx;">￥</text>
										<text>{{handlePrice(item.discount)[0]}}.</text>
										<text style="font-size:18rpx;">{{handlePrice(item.discount)[1]}}</text>
									</text>
								</view>
								
								<view v-if="item.orderStatus == 0" class="need-pay" >
                  <text v-if="item.freight && item.handlingFees">需付款(含运费、搬运费)</text>
                  <text v-if="item.freight && !item.handlingFees">需付款(含运费)</text>
                  <text v-if=" !item.freight && item.handlingFees">需付款(含搬运费)</text>
                  <text v-if="!item.freight && !item.handlingFees">需付款</text>
                  <text style="color:#FF3347;margin-left: 8rpx;">
                    <text style="font-size:18rpx;">￥</text>
                    <text style="font-size: 32rpx;">{{handlePrice(item.payAmount)[0]}}.</text>
                    <text style="font-size:18rpx;">{{handlePrice(item.payAmount)[1]}}</text>
                  </text>
								</view>
								
								<view v-else class="need-pay">
								  <text>实付</text>
								  <text style="color:#FF3347;margin-left: 8rpx;">
								    <text style="font-size:18rpx;">￥</text>
								    <text style="font-size: 32rpx;">{{handlePrice(item.totalActualIncomeAmount)[0]}}.</text>
								    <text style="font-size:18rpx;">{{handlePrice(item.totalActualIncomeAmount)[1]}}</text>
								  </text>
								</view>
              </view>

              <view  class="line"  v-if="item.orderStatus == 0 && (item.showCancelOrderTime || item.showCancelBtn || item.showToPayBtn)" />
							
              <view class="footer"  v-if="item.orderStatus == 0 && (item.showCancelOrderTime || item.showCancelBtn || item.showToPayBtn)" :class="{buttonContainer:!item.showCancelOrderTime}">
								<view  v-if="item.showCancelOrderTime"  class="set-interval">
                  <image src="../../static/ic_time@2x.png"  mode=""/>
									
                  <view class="time-text">
                    <text class="remainPayTime">剩余支付时间</text>
                    <uni-countdown
                      color="#333333"
                      background-color="#E4E6E6"
                      :showDay="false"
                      :hour="formatTime(item.remainTime)[0]"
                      :minute="formatTime(item.remainTime)[1]"
                      :second="formatTime(item.remainTime)[2]"
                    />
                  </view>

                </view>
								<view  v-if="item.showToPayBtn || item.showCancelBtn"  class="button">
                  <button
                    v-if="item.showCancelBtn"
                    type="default"
                    size="mini"
                    class="cancel-order"
                    @click="handleCancelOrder(item.id)"
                  >取消订单</button>

                  <button
                    v-if="item.showToPayBtn"
                    type="default"
                    size="mini"
                    class="go-to-pay"
                    @click="toPay(item)"
                  >去付款</button>

                </view>
              </view>
              <view  class="line" v-if="item.orderStatus == 1 && item.shipmentStatus == 2" />
              <view  class="footer buttonContainer " v-if="item.orderStatus == 1 && item.shipmentStatus == 2">
                <view class="button">
                  <button
                   type="default"
                    size="mini"
                    class="go-to-pay"
                    @click="handleConfirmReceipt(item)"
                  >确认收货</button>
                </view>
              </view>
            </view>
          </view>

          <view v-else class="swiper-item empty-container">
            <view class="empty-page">
              <view class="line" />
              <view class="content ">
                <image
                  src="../../static/empty_page@2x.png"
                  mode=""
                ></image>
                <text>暂无相关订单~</text>
              </view>
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
import { getOrderList, orderPay, cancelOrder, confirmReceiptOrder,} from "@/api/order.js";
export default {
  data() {
    return {
      tabList: ["全部", "待付款", "进行中", "已完成", "已关闭"],
      triggered: false, //控制刷新显示字段
			title:"",

      currentIndex: 4,
      orderStatus: -1, //订单状态（-1全部,0待付款，1进行中，2已完成 3已关闭）
      rows: 15,

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
			reRefresh:false,
			areaId:"",
    };
  },
	mounted(e) {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.containerBottom = menuButtonInfo.bottom
		this.systemBottom = menuButtonInfo.bottom + "rpx";
		this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
	
	},
	watch:{
		reRefresh(newVal,oldVal){
			console.log("newVal=",newVal,"oldVal=",oldVal)
			if(newVal){
				this.lastId[this.currentIndex]=-1
				switch(this.currentIndex){
					case 0:
						this.orderList0=[];
						this.getOrderList()
						break;
					case 1:
						this.orderList1=[];
						this.getOrderList()
						break;
					case 2:
						this.orderList2=[];
						this.getOrderList()
						break;
					case 3:
						this.orderList3=[];
						this.getOrderList()
						break;
					case 4:
						this.orderList4=[];
						this.getOrderList()
						break;
				}
			}
		}
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
	onShow() {
		uni.$once("refreshPage",function(data){
			switch(this.currentIndex){
				case 0 : 
				
			}
        console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
    })
	},
 
	onLoad(e) {
		this.reRefresh = e.reRefresh
    if (e.index) {
      if (e.index == "99") {
        this.currentIndex = 0;
      } else {
        this.currentIndex = Number(e.index);
      }
    }
    this.orderStatus = this.currentIndex - 1;
		const currentHouse =JSON.parse(uni.getStorageSync('currentHouse')) 
		this.areaId =currentHouse.areaId
  },

  methods: {
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
		
    
    goMultiplePay() {
      uni.navigateTo({
        url: "order-success/order-success",
      });
    },
    //跳转到详情页面
    goToDetail(data) {
      if (data.orderStatus == 0) {
        //（0待付款，1进行中，2已完成 3已关闭）
        uni.navigateTo({
          url: `order-wait-pay/order-wait-pay?orderNo=${data.id}`,
        });
      } else if (data.orderStatus == 1) {
        uni.navigateTo({
          url: `order-in-progress/order-in-progress?orderNo=${data.id}`,
        });
      } else if (data.orderStatus == 2) {
        uni.navigateTo({
          url: `order-success/order-success?type=complete&id=${data.id}`,
        });
      } else {
        uni.navigateTo({
          url: `order-failed/order-failed?type=close&id=${data.id}`,
        });
      }
    },
		//去店铺首页
    gotoShop(item) {
			console.log("this.storeId=",item.storeId,"this.areaId=",this.areaId)
			uni.navigateTo({
				url:`../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`
			});
    },

    async getOrderList() {
      this.loading = true;
			getOrderList({
				orderStatus: this.currentIndex - 1,
				lastId: this.lastId[this.currentIndex],
				rows: this.rows,
			}).then(data=>{
				this.triggered = false;
				if(!data.length) return 
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
			})
		 },	
			
			// async getOrderList() {
			//   this.loading = true;
      // let orderItem = await getOrderList({
      //   orderStatus: this.currentIndex - 1,
      //   lastId: this.lastId[this.currentIndex],
      //   rows: this.rows,
      // });

      // if (!orderItem.length) return;

      // if (this.currentIndex == 0) {
      //   this.lastId[0] = orderItem[orderItem.length - 1].id;
      //   this.orderList0 = this.orderList0.concat(orderItem);
      // } else if (this.currentIndex == 1) {
      //   this.lastId[1] = orderItem[orderItem.length - 1].id;
      //   this.orderList1 = this.orderList1.concat(orderItem);
      // } else if (this.currentIndex == 2) {
      //   this.lastId[2] = orderItem[orderItem.length - 1].id;
      //   this.orderList2 = this.orderList2.concat(orderItem);
      // } else if (this.currentIndex == 3) {
      //   this.lastId[3] = orderItem[orderItem.length - 1].id;
      //   this.orderList3 = this.orderList3.concat(orderItem);
      // } else {
      //   this.lastId[4] = orderItem[orderItem.length - 1].id;
      //   this.orderList4 = this.orderList4.concat(orderItem);
      // }
      // this.loading = false;
			// },

    onLoadMore() {
      if (this.loading) return;
      // 这个是排除请求回来没有数据的情况
      if (!this.requestedDataLength && this.lastId[this.currentIndex] > 0) return;
      this.getOrderList();
    },

    onRefresh(e) {
      this.triggered = true;
			this.getOrderList()
  
    },

    // 取消订单
    handleCancelOrder(id) {
      this.id = id;
			this.title= "您确定要取消该订单吗?"
      this.$refs.cancleOrder.open();
			this.getOrderList()
    },
    cancelOrderClose() {
      this.$refs.cancleOrder.close();
    },
    cancleConfirm() {
      console.log("取消订单按钮成功！");
      //点击确定后订单会被取消且该订单会被移入已关闭订单中
      cancelOrder({ id: this.id }).then(() => {
				this.$refs.cancleOrder.close();
				uni.showToast({
					title:"取消订单成功!",
					icon:"none",
					duration:1000,
				})
				setTimeout(()=>{
					//跳转到订单取消页面
					uni.redirectTo({
						url: `../order-failed/order-failed?type=close&id=${this.id}`,
					});
				},1000)
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
        let openId = uni.getStorageSync("openId");
        orderPay({
          orderId: item.id,
          payType: 1, //支付类型  1微信支付",
          openid: openId,
        }).then((e) => {
          const payInfo = e.wechatPayJsapi;
          uni.requestPayment({
            provider: "wxpay",
            ...payInfo,
            success(res) {
              console.log(res);
							uni.showToast({
								title:"支付失败！",
								icon:"none",
								duration:1000,
							})
							setTimeout(()=>{
								this.getOrderList();
								
							},1000)
            },
            fail(e) {
              console.log(e);
              // 支付失败时候跳转到哪个页面
							uni.showToast({
								title:"支付失败！",
								icon:"none",
								duration:1000,
							})
            },
          });
        });
      }
    },

    // 确认收货
    handleConfirmReceipt(item) {
      this.id = item.id;
			this.title = "确定要确认收货？"
      this.$refs.confirmReceipt.open();
    },
		confirmReceiptClose() {
      this.$refs.confirmReceipt.close();
    },
		receiptConfirm(value) {
      // 调用确认收货的接口  //goodIsd 商品id(不传代表整个订单收货)"
      confirmReceiptOrder({ id: this.id}).then((e) => {
          console.log("成功就关闭弹框");
          this.$refs.confirmReceipt.close();
					this.orderList1 = []
					this.lastId[1]=-1
					this.getOrderList()
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
      let time = msTime / 1000;
      let hour = Math.floor(time / 60 / 60) % 24;
      if (!hour) {
        hour = 0;
      }
      let minute = Math.floor(time / 60) % 60;
      if (!minute) {
        minute = 0;
      }
      let second = Math.floor(time) % 60;
      return [hour, minute, second];
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
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
			.remainPayTime{
				margin-right: 12rpx;
				height: 36rpx;
				line-height: 36rpx;
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
.swiper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  swiper-item {
    height: 100%;
    overflow: auto;

    // scroll-view {
    //   padding-bottom: 100rpx;
    // }
    .empty-page {
      .line {
        height: 1rpx solid #f2f2f2;
      }
      .content {
        margin: 388rpx 254rpx 0 256rpx;
        width: 240rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        color: #999999;
        image {
          width: 240rpx;
          height: 240rpx;
          object-fit: cover;
          margin-bottom: 24rpx;
        }
        text {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #999999;
        }
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
::v-deep .uni-countdown__splitor.data-v-02c75d70 {
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
