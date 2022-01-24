<template>
  <view class="container" :style="{paddingBottom:containerPaddingBottom}">
    <custom-navbar
      :opacity="scrollTop/100"
      :title="headerTitle"
    >
      <template v-slot:back>
        <i class="icon-ic_cancel_white back-icon"
          :style="{color: (scrollTop/100>1)?'black':'white'}"
          @click="toBack"
        ></i>
      </template>
    </custom-navbar>


    <view class="order-container"
			:style="{paddingBottom:systemBottom}"
		>
      <view style="position: relative;">
        <view
					class="bgcStyle"
					:style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
				/>
        <view :style="{height:navBarHeight}"></view>

        <view class="order-status">
					<view class="status1">
						<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_status_inprogress.svg" mode="scaleToFill"></image>
						<view>进行中</view>
					</view>
					
         <!-- <view class="status1">
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_failed.svg" mode="" />
            <view class="text">已关闭</view>
          </view>
					<view class="status1">
					  <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_success.svg" mode=""/>
					  <view class="text">已完成</view>
					</view> -->
        </view>
				<!-- <view class="order-status">
				  <view class="status">
				    <image
				      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_status_wait_pay.svg"
				      mode="scaleToFill"
				    />
				    <view class="text">待付款</view>
				  </view>
				  <view
				    class="time"
				    v-if="orderInfo.showCancelOrderTime"
				  >
				    <text style="margin-right: 16rpx;">剩余支付时间</text>
				    <count-down
				      class="countStyle"
				      :start="orderInfo.remainTime"
				      @finish="goToCancelDetail"
				    ></count-down>
				  </view>
				</view>
      -->
			</view>
      <order-user-base-info
				v-if="orderInfo.customerName && orderInfo.customerPhone && orderInfo.estateInfo"
				:data="orderInfo"
			/>
			<view class="order-container" :style="{paddingBottom:112+containerBottom+'rpx'}">
			
				<order-user-base-info :data="orderInfo"></order-user-base-info>
			
				<view class="storeContainer">
					<view v-for="item in orderInfo.details" :key="item.storeId" class="item">
						<view class="header">
							<view class="header-content">
								<view class="storeName" @click="gotoShop(item)">{{item.storeName}}</view>
								<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" mode=""/>
							</view>
							<view class="icon"></view>
						</view>
			
						<view v-for="item2 in item.details" :key="item2.id" class="orederItem">
							<order-item :orderStatus="2" :paddingBottom="24" :dataList="item2"
								:productNum="item.details.length"
								:refundApplyMode="orderInfo.refundApplyMode"
								@handleDetail="goToDetail(item2)"
								@toApplayForRefund="toApplayForRefund(item2,1)"
								@refundCancel="refundCancel(item2)"
								@refundSuccess="refundSuccess(item2)"
								@refundFailed="refundFailed(item2,1)"
								@refundClose="refundClose(item2)"
							/>
						</view>
					</view>
			
					<order-price :data="orderInfo" />
			
				</view>
			
				<order-info v-if="orderInfo.orderNo" :orderNo="orderInfo.orderNo" :createTime="orderInfo.createTime" :showPayTime="true"
					:showPayType="true" :payTime="orderInfo.payTime" :payChannel="orderInfo.payChannel" />
			
				<view class="applyforRefund-confirmReceipt" :style="{paddingBottom:systemBottom,height:systemHeight}"
					v-if="orderInfo.showRefundBtn || (orderInfo.stockType == 0 && orderInfo.shipmentStatus == 1)">
					<view v-if="orderInfo.showRefundBtn" class="applyforRefund" @click="toApplayForRefund(orderInfo,2)">
						申请退款
					</view>
					<view v-if="orderInfo.stockType==0 && orderInfo.shipmentStatus == 1" class="confirmReceipt"
						@click="handleConfirmReceipt">
						确认收货
					</view>
				</view>
			
				<!-- 申请退款之后的其他状态 -->
				<!--
					showRefundBtn  是否显示退款按钮
					refundApplyMode 申请方式 1单商品 2 整单退款
					stockType 库存方式 0无仓库 1有仓库  服务订单默认显示的是零
					shipmentStatus 发货状态（0待发货 1待收货 2已收货）
					type:1 材料 2 服务
				-->
				<view class="applyforRefund-confirmReceipt2" :style="{paddingBottom:systemBottom}"
					v-if="!orderInfo.showRefundBtn && orderInfo.refundApplyMode == 2 && (orderInfo.stockType == 0 || orderInfo.type == 2)">
			
					<view class="refundOrderStatus"
						v-if="orderInfo.refundBillStatus == 0 || (orderInfo.refundBillStatus == 1 && orderInfo.type == 2)"
						@click="refundCancel(orderInfo)">
						取消退款
					</view>
			
					<view class="refundOrderStatus" v-if="orderInfo.refundBillStatus == 2"
						@click="refundSuccess(orderInfo)">
						退款成功
					</view>
			
					<view class="refundOrderStatus" style="color:#FF3347;" v-if="orderInfo.refundBillStatus == 5"
						@click="refundFailed(orderInfo)">
						退款失败
					</view>
			
					<view class="refundOrderStatus"
						v-if="(orderInfo.refundBillStatus == 3 || orderInfo.refundBillStatus == 4) && (orderInfo.shipmentStatus == 0 || (orderInfo.type ==2 && orderInfo.shipmentStatus == -1 ))"
						@click="refundClose(orderInfo)">
						退款关闭
					</view>
				</view>
			
			</view>
			
			
			<!-- 确认收货的弹框 -->
			<popup-dialog ref="confirmReceipt" :title="title" @close="confirmReceiptClose" @confirm="receiptConfirm" />
			
			<!-- 取消退款的弹框 -->
			<popup-dialog ref="cancelRefund" :title="title" @close="cancelRefundClose" @confirm="cancelRefundConfirm" />
				
			<!--  代付款多店铺的时候展示 -->
			<!-- <view class="moreStore" v-if=" orderInfo.orderName && orderInfo.type !==5 ">
        {{orderInfo.orderName}}
      </view>
			
			<view class="store-container" v-for="(item,index) in orderInfo.details":key="index" >
			  <view
			    v-if="index > 0"
			    style="height:0.5px;margin: 0 32rpx;background-color: #EBEBEB;"
			  />
			  <view
			    class="storeItem"
			    :class="{paddingBottom: item.stockType == 1 }"
			    :style="{borderRadius:index >= 1 ? '0' :'24rpx 24rpx 0 0'}"
			  >
			    <view class="header">
			      <view class="header-content" v-if="orderInfo.type !== 5">
			        <view class="storeName" @click="gotoShop(item)">{{item.storeName}}</view>
			        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg"/>
			      </view>
			      <view class="header-content" v-else>
			        <view class="storeName">{{orderInfo.orderName}}</view>
			      </view>
			      <view class="icon"></view>
			    </view>
			    <view v-for="item2 in item.details" :key="item2.id" >
			      <order-item
			        v-if="item2.type !==5"
			        :orderStatus="1"
			        :dataList="item2"
			        @handleDetail="productDetail(item2)"
			      />
			      <store-calue-card-item :dataInfo="item2"  v-else/>
			    </view>
			
					<view class="discount-container" v-if="item.hasMaterial &&  orderInfo.details.length>1">
						<view class="item_css_style">
							<view class="left">
							 	<view style="margin-right: 8rpx;">运费</view>
								<image
								  class="icon"
								  src="../../../../static/price_icon.svg"
								  @click="readExpenses(1)"
								/>
							</view>
							<view class="right">
								<text class="price-font"v-if="orderInfo.stockType == 0">
									￥{{item.freight?`${item.freight}`:"0.00"}}
								</text>
								<text class="price-font" :style="{marginTop:item.freight?'0':'8rpx'}" v-else>
									{{item.freight?`￥${item.freight}`:"--"}}
								</text>
							</view>
						</view>
						<view class="item_css_style">
							<view class="left">
								<view style="margin-right: 8rpx;">搬运费</view>
								<image
								  class="icon"
								  src="../../../../static/price_icon.svg"
								  mode=""
								  @click="readExpenses(2)"
								/>
							</view>
							<view class="right">
								<text class="price-font" v-if="orderInfo.stockType == 0">
								  ￥{{item.handlingFees?item.handlingFees:"0.00"}}</text>
								<text
								  class="price-font" :style="{marginTop:item.handlingFees ? '0' : '8rpx' }"
								  v-else
								>{{item.handlingFees?`￥${item.handlingFees}`:"--"}}</text>
							</view>
						</view>
						<view class="item_css_style"  v-if="item.storeDiscount">
							<view class="left">
								<text>商家</text>
							</view>
							<view class="right">
								<text  class="price-font"> -￥{{item.storeDiscount}}</text>
							</view>
						</view>
			
						<view class="item_css_style"  v-if="item.platformDiscount">
							<view class="left">
								<text>平台优惠</text>
							</view>
							<view class="right">
								<text  class="price-font"> -￥{{item.platformDiscount}}</text>
							</view>
						</view>
					</view>
				</view>
			  <view class="split-line" />
			</view>
			
			<order-price
				:data="orderInfo"
				:waitPay="true"
				:payPrice="payPrice"
			/>
			<view
			  v-if="haveCard && orderInfo.isReplenish"
			  class="pay-way"
			  style="justify-content:center"
			  @click="clickCard"
			>
			  <image
			    class="card-img"
			    src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
			    mode=""
			  >
			  </image>
			  <view>
			    <text>储值卡</text>
			    <text class="card-sub">(可用余额:{{(cardBalance/100).toFixed(2)}}元)</text>
			  </view>
			  <view style="flex:1">
			  </view>
			  <view
			    v-if="cardClick"
			    class="card-price"
			  >
			    -¥{{(this.cardPrice/100).toFixed(2)}}
			  </view>
			  <image
			    v-if="cardClick"
			    class="selected-img"
			    src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_selected.png"
			    mode=""
			  >
			  </image>
			  <image
			    v-else
			    class="selected-img"
			    src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_unselected.png"
			    mode=""
			  >
			  </image>
			</view>
			<view class="pay-way mrb">
			  <text style="color: #333333;">支付方式</text>
				<view v-if="payChannel" class="flex-center"><text>储值卡支付</text></view>
			  <view v-else class="flex-center"><text>在线支付</text></view>
			</view>
			<view class='remarks'>
			  <text>备注</text>
			  <view class="remarks-right">
			    <textarea
			      type="text"
			      maxlength="200"
			      v-model="remarks"
			      cursor-spacing="15px"
			      placeholder-class="text-placeholder"
			      style="width:100%;line-height: 68rpx;min-height: 90rpx;height: 85%;overflow: scroll;padding-top: 30rpx;"
			      placeholder="选填,说点什么～"
			    />
			  </view>
			</view>
			<order-info
			  v-if="orderInfo.orderNo"
			  :orderNo="orderInfo.orderNo"
			  :createTime="orderInfo.createTime"
			/> -->
			<!-- 底部按钮 -->
			<!-- <view
			  v-if="orderInfo.showCancelBtn || orderInfo.showToPayBtn "
			  :class="{noCancelBtn:true}"
			  class="waitPayBottom"
			  :style="{paddingBottom:systemBottom,height:systemHeight,justifyContent:bottomStyle }"
			>
			  <view
			    v-if="orderInfo.showCancelBtn"
			    class="canclePay"
			    @click="handleCancelOrder"
			  >
			    取消订单
			  </view>
			  <view
			    v-if="orderInfo.showToPayBtn"
			    class="gotoPay"
			    @click="toPay"
			  >
			    去付款
			  </view>
			</view> -->
			<!-- 取消该订单弹框 -->
			<!-- <popup-dialog
			  ref="cancleOrder"
			  :title="title"
			  @close="cancelOrderClose"
			  @confirm="cancleConfirm"
			>
			</popup-dialog>
			<expenses-toast
			  ref='expensesToast'
			  :expensesType="expensesType"
			></expenses-toast>
			<uni-popup
			  ref="payDialog"
			  type="bottom"
			>
			  <view class="cart-header">
			    立即支付
			    <image
			      class="remove-all"
			      @click="closePayDialog"
			      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_closed_black.png"
			    >
			    </image>
			  </view>
			  <view class="pay-diaolog">
			    <view class="pay-diaolog-title">
			      需支付
			    </view>
			    <view class="pay-diaolog-price">
			      <text style="font-size: 28rpx;">¥</text>{{payChannelPrice}}
			    </view>
			    <view class="pay-diaolog-tip">
			      {{payChannel?'您正在使用储值卡支付,请确认':'您还需用在线支付,请确认'}}
			    </view>
			    <view class="pay-diaolog-alert">
			      金额以实际金额为准，若储值卡余额不足将用在线支付剩余部分
			    </view>
			    <view
			      class="pay-diaolog-btn"
			      @click="payOrder()"
			    >
			      确认支付
			    </view>
			  </view>
			</uni-popup> -->
			<!-- 已关闭订单信息 -->
			<!-- <view class="body" v-for="(item2,index2) in orderInfo.details" :key="index2">
				<view class="header">
			    <view class="header-content">
			      <view v-if="orderInfo.type !==5" class="storeName" @click="gotoShop(item2)" >{{item2.storeName}}</view>
			      <view v-else class="storeName" >{{orderInfo.orderName}}</view>
						<image v-if="orderInfo.type !==5 " src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" mode=""/>
			    </view>
			    <view class="icon"></view>
			  </view>
			  <view v-for="item3 in item2.details" :key="item3.id" >
			    <order-item
						v-if="item3.type !== 5"
			      :dataList="item3"
			      @handleDetail="productDetail(item3)"
			    />
			    <store-calue-card-item :dataInfo="item3" :showActualPay="true" v-else />
			  </view>
			</view> -->
      <!-- <order-price
        :data="orderInfo"
        :orderFailed="true"
      />
      <order-info
        v-if="orderInfo.orderNo"
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
        :cancelTime="orderInfo.cancelTime"
        :showCancelTime="true"
        :payChannel="orderInfo.payChannel"
      /> -->
			<!-- 已完成订单信息 -->
			<!-- <order-price :data="orderInfo" />

			<order-info
        v-if="orderInfo.orderNo"
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
        :showPayTime="true"
				:payChannel="orderInfo.payChannel"
        :payTime="orderInfo.payTime"
        :showPayType="true"
      />
			<view v-if=" orderInfo.showRefundBtn " class="applyforRefund-container" :style="{paddingBottom:systemBottom,}">
			  <view class="applyforRefund" @click="toApplayForRefund(orderInfo,2)" >
			    申请退款
			  </view>
			</view> -->

			<!-- 申请售后的按钮 -->
			<!-- <view v-if="orderInfo.showApplyAfterSalesBtn" class="applyforRefund-container" :style="{paddingBottom:systemBottom,}">
			  <view class="applyforRefund" @click="toApplyForAfterSales()" >
			    申请售后
			  </view>
			</view> -->

			<!-- <view class="applyforRefund-confirmReceipt2" :style="{paddingBottom:systemBottom}"
				v-if="!orderInfo.showRefundBtn && orderInfo.refundApplyMode == 2 && (orderInfo.stockType == 0 || orderInfo.type == 5)">

				<view class="refundOrderStatus"
					v-if="orderInfo.refundBillStatus == 0 || (orderInfo.refundBillStatus == 1 && orderInfo.type == 5)"
					@click="refundCancel(orderInfo)">
					取消退款
				</view>

				<view class="refundOrderStatus" v-if="orderInfo.refundBillStatus == 2"
					@click="refundSuccess(orderInfo)">
					退款成功
				</view>

				<view class="refundOrderStatus" style="color:#FA4D32;" v-if="orderInfo.refundBillStatus == 5"
					@click="refundFailed(orderInfo)">
					退款失败
				</view>
				<view class="refundOrderStatus"
					v-if="(orderInfo.refundBillStatus == 3 || orderInfo.refundBillStatus == 4) && (orderInfo.type ==5 && orderInfo.shipmentStatus == -1 )"
					@click="refundClose(orderInfo)">
					退款关闭
				</view>
			</view> -->
				<!-- shipmentStatus 发货状态（0待发货 1待收货 2已收货） -->

    </view>
    <expenses-toast
      ref='expensesToast'
      :expensesType="expensesType"
    />
		<!-- 取消退款的弹框 -->
		<popup-dialog
			ref="cancelRefund"
			:title="title"
			@close="cancelRefundClose"
			@confirm="cancelRefundConfirm"
		/>
  </view>
</template>

<script>
import { formatDate } from "../../../../utils/common.js";
import { 
	getRefundDetail, 
	getOrderDetail,
	cancelRefund ,
	orderPay,
  cancelOrder,
  confirmReceiptOrder,
	} from "@/api/order.js";
import { getBalance } from "../../../../api/user.js";
import { log } from "../../../../utils/log.js";
export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      scrollTop: 0,
      headerTitle: "订单详情",
      orderId: -1,//订单id
      status: "", //退款状态 0待确认 1退款中 2退款完成 3已拒绝 4已取消 5退款失败  退款处理中(0,1) 退款成功(2) 退款关闭(3,4)"
      from: "",
      showReApply: false,//重新申请
			showContactCustomer:false,//联系客服

      orderInfo: {},
      expensesType: 0,

      systemBottom: "",
      containerPaddingBottom: "",
      title: "您确定要取消该订单吗？",
      areaId: "",
      navBarHeight: "",
      bgImg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/order_bg.png",
			cardClick: false, //是否选中储值卡
			haveCard: false, //是否有会员卡
			cardBalance: 11111111, //会员卡余额
			totalPrice: "0.00",
			bottomStyle:"",
			remarks: "",
		};
  },
 computed: {
    payChannel() {
      var res = Number(this.totalPrice) * 100 - this.cardBalance;
      //支付渠道 true 储值卡  false 微信
      console.log(
        this.cardClick && res > 0,
        res,
        Number(this.totalPrice) * 100
      );
      if (this.cardClick && res <= 0) {
        return true;
      } else {
        return false;
      }
    },
    payChannelPrice() {
      //提示框价格
      if (!this.payChannel) {
        return (
          (Number(this.totalPrice) * 100 - this.cardBalance) /
          100
        ).toFixed(2);
      } else {
        return this.totalPrice;
      }
    },
    cardPrice() {
      var res = Number(this.totalPrice) * 100 - this.cardBalance;
      if (res >= 0) {
        return this.cardBalance;
      } else {
        return Number(this.totalPrice) * 100;
      }
    },
    payPrice() {
      if (this.cardClick) {
        var res = Number(this.totalPrice) * 100 - this.cardBalance;
        if (res <= 0) {
          return "0.00";
        }
        return String((res / 100).toFixed(2));
      } else {
        return String(this.totalPrice);
      }
    },
  },
  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.containerPaddingBottom = menuButtonInfo.bottom + 112 + "rpx";
		// this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
    console.log(this.systemBottom);
  },

  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
		if(this.scrollTop/100>1){
			uni.setNavigationBarColor({
			  frontColor: "#333333",
			  animation: {
			    duration: 400,
			    timingFunc: "easeIn",
			  },
			});
		}else{
			uni.setNavigationBarColor({
			  frontColor: "#ffffff",
			  animation: {
			    duration: 400,
			    timingFunc: "easeIn",
			  },
			});
		}
  },

  onLoad(e) {
    this.type = e.type;
    this.orderId = Number(e.orderId);
    this.status = Number(e.status);
    this.from = e.from;
    // 获取胶囊按钮的位置
    const systemInfo = uni.getSystemInfoSync();
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.navBarHeight =
      menuButtonInfo.top +
      (menuButtonInfo.top - systemInfo.statusBarHeight) +
      menuButtonInfo.height +
      "px";
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#ff0000",
      animation: {
        duration: 400,
        timingFunc: "easeIn",
      },
    });
  },

	onShow() {
		 this.haveCard = false;
      //订单关闭页面
		this.headerTitle = "订单详情";
		this.orderDetail();
		const currentHouse = getApp().globalData.currentHouse;
		console.log("currentHouse=", currentHouse);
		this.areaId = currentHouse.areaId;
		// 代付款订单详情独有
    getBalance().then((e) => {
      if (e != null) {
        this.haveCard = true;
        this.cardBalance = e;
      }
    });

    if (!getApp().globalData.openId) {
      //确保拿到openId，否则无法支付
      getApp().globalData.openId = uni.getStorageSync("openId");
    }

  },

  methods: {
    orderDetail() {
      console.log("订单完成页面");
      getOrderDetail({ id: this.orderId }).then((e) => {
        this.orderInfo = e;
				//以下代码是代付款独有的
				this.totalPrice = this.orderInfo.payAmount;
				this.bottomStyle = this.orderInfo.showCancelBtn
				  ? "space-between"
				  : "flex-end";
				console.log("this.orderInfo=", this.orderInfo);
      });
    },

    // 改变返回下一个页面的路径
    toBack() {
      if (this.from == "waitPay") {
        uni.redirectTo({
          url: `../my-order?index=1&firstEntry=true`,
        });
      } else if (this.from == "inprogress") {
        uni.redirectTo({
          url: `../my-order?index=2&firstEntry=true`,
        });
      } else if(this.from == "multiple"){
				uni.redirectTo({
					 url: `../my-order?index=4&firstEntry=true`,
				})
			}
			else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },

		// 跳转到商品详情页面
    productDetail(item, type) {
      console.log("item=", item, "type=", type);
      uni.navigateTo({
				url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`,
			});
    },
    // 跳转到店铺页面
    gotoShop(item) {
      console.log("去店铺首页！！！！");
      uni.navigateTo({
        url: `../../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`,
      });
    },
    // 联系客服
    contactCustomer() {
      //跳转到客服的页面
      console.log("联系客服");
      this.$store.dispatch("openCustomerConversation");
    },
    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
		//代付款订单独有的接口
		// 取消订单
		handleCancelOrder() {
		  this.$refs.cancleOrder.open();
		},
		cancelOrderClose() {
		  this.$refs.cancleOrder.close();
		},
		cancleConfirm() {
		  //点击确定后订单会被取消且该订单会被移入已关闭订单中
		  cancelOrder({
		    id: this.orderNo,
		  })
		    .then((e) => {
		      this.$refs.cancleOrder.close();
		      uni.redirectTo({
		        url: `../order-failed/order-failed?type=close&id=${this.orderNo}&from=waitPay`,
		      });
		    })
		    .catch(() => {
		      uni.showToast({
		        title: "取消订单失败,请重试",
		        icon: "none",
		        duration: 2000,
		      });
		    });
		},
		closePayDialog() {
		  this.$refs.payDialog.close();
		},
		clickCard() {
		  if (this.cardBalance) {
		    this.cardClick = !this.cardClick;
		  }
		},
		readExpenses(num) {
		  this.expensesType = num;
		  this.$refs.expensesToast.showPupop();
		},

		// 倒计时间触发到的时间
		goToCancelDetail() {
		  uni.redirectTo({
		    url: `../order-failed/order-failed?type=close&id=${this.orderNo}&from=waitPay`,
		  });
		},
		//去支付
		toPay() {
		  // 先判断是否支付超额拆单了 // 拆单之后直接跳转到拆单页面	// 未拆单 直接支付
		  console.log(this.orderInfo, "orderInfo.orderId=", this.orderInfo.orderId);
		  if (this.orderInfo.isSplitPay) {
		    // orderId 是订单id
		    uni.navigateTo({
		      url: `../multiple-payments/multiple-payments?orderId=${this.orderNo}&type=detail&remainTime=${this.orderInfo.remainTime}`,
		    });
		  } else {
		    if (this.cardClick) {
		      this.$refs.payDialog.open();
		      return;
		    }
		    this.payOrder();
		  }
		},
		payOrder() {
		  let openId = getApp().globalData.openId;
		  orderPay({
		    remarks: this.remarks,
		    orderId: this.orderNo,
		    payType: 1, //支付类型  1在线支付",
		    openid: openId,
		    isCardPay: this.cardClick,
		  }).then((e) => {
		    const payInfo = e.wechatPayJsapi;
		    const cardPayComplete = e.cardPayComplete;
		    if (!cardPayComplete) {
		      uni.requestPayment({
		        provider: "wxpay",
		        ...payInfo,
		        success: () => {
		          uni.showToast({
		            title: "支付成功！",
		            icon: "none",
		            duration: 1000,
		          });
		          uni.redirectTo({
		            url: `../../../../sub-classify/pages/pay-order/pay-success?orderId=${this.orderNo}`,
		          });
		        },
		        fail(e) {
		          uni.showToast({
		            title: "支付失败",
		            icon: "none",
		            duration: 2000,
		          });
		          log({
		            type: "wx-pay-fail",
		            page: "order-wait-pay",
		            data: e,
		            openId: getApp().globalData.openId,
		            openIdLocal: uni.getStorageSync("openId"),
		          });
		        },
		      });
		    } else {
		      uni.showToast({
		        title: "支付成功！",
		        icon: "none",
		        duration: 1000,
		      });
		      uni.redirectTo({
		        url: `../../../../sub-classify/pages/pay-order/pay-success?orderId=${this.orderNo}`,
		      });
		    }
		  });
		},
		formatTime(msTime) {
		  let time = msTime / 1000;
		  let hour = Math.floor(time / 60 / 60);
		  if (!hour) {
		    hour = 0;
		  }
		  let minute = Math.floor(time / 60) % 60;
		  if (!minute) {
		    minute = 0;
		  }
		  let second = Math.floor(time) % 60;
		  console.log("hour=", hour, "minute=", minute, "second=", second);
		  return [hour, minute, second];
		},

		handlePrice(price) {
		  if (!price) return ["0", "00"];
		  let list = String(price).split(".");
		  if (list.length == 1) {
		    return [list[0], "00"];
		  } else {
		    return [list[0], list[1]];
		  }
		},










		// 已完成页面独有的接口
		// 申请退款
		toApplayForRefund(data, type) {
		  // wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
			uni.navigateTo({
		    url: `/sub-my/pages/apply-for-refund/apply-for-refund?orderId=${this.id}&type=whole&status=2&applyMode=2`,
		  });
		},
		toApplyForAfterSales(){
			console.log("申请售后 跳转到客服聊天页面")
			this.$store.dispatch("openCustomerConversation");
		},
		// 取消退款
		refundCancel(item) {
			this.itemId = item.refundId;
			this.title = "确定要取消本次申请退款？";
			this.$refs.cancelRefund.open();
		},
		cancelRefundClose() {
			this.$refs.cancelRefund.close();
		},
		cancelRefundConfirm() {
			cancelRefund({
				id: this.itemId,
			}).then(() => {
				this.$refs.cancelRefund.close();
				this.orderDetail();
			});
		},
		// 申请退款成功
		refundSuccess(item) {
			uni.navigateTo({
				url: `../order-success/order-success?type=refund&id=${item.refundId}`,
			});
		},
		refundFailed(item) {
			console.log("item数据=", item, "测试");
			const showReApply = item.shipmentStatus !== 2 ? true : false;
			console.log("showReApply=", showReApply);
			uni.navigateTo({
				url: `../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`,
			});
		},

		refundClose(item) {
			console.log("item数据=", item);
			const showReApply = item.shipmentStatus !== 2 ? true : false;
			console.log("showReApply=", showReApply);
			uni.navigateTo({
				url: `../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`,
			});
		},
  },
};
</script>

<style lang="scss" scoped>
	.pay-way {
	  padding: 0 32rpx;
	  background-color: #ffffff;
	  margin-top: 16rpx;
	  font-size: 28rpx;
	  font-family: PingFangSC, PingFangSC-Regular;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  height: 104rpx;
	  line-height: 104rpx;
	  border-radius: 24rpx;
	}
	
	.pay-way .wechat_icon {
	  vertical-align: sub;
	  display: inline-block;
	  width: 32rpx;
	  height: 32rpx;
	  background-image: url("@/static/order/ic_order_wechat@2x.png");
	  background-size: contain;
	  margin-right: 12rpx;
	}
	
	.remarks {
	  padding: 5rpx 32rpx;
	  margin-bottom: 16rpx;
	  background-color: #ffffff;
	  // margin-top: 25rpx;
	  font-size: 28rpx;
	  font-family: PingFangSC, PingFangSC-Regular;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  height: 104rpx;
	  border-radius: 24rpx;
	  line-height: 104rpx;
	}
	
	.remarks {
	  overflow: hidden;
	}
	
	.remarks text {
	  min-width: 180rpx;
	}
	
	.remarks .remarks-right {
	  flex: 1;
	  position: relative;
	  height: 100%;
	  overflow: scroll;
	}
	
	.pay-diaolog {
	  border-top: 1rpx solid #f2f2f2;
	  display: flex;
	  flex-direction: column;
	  background-color: #fff;
	  padding-bottom: 80rpx;
	  align-items: center;
	
	  &-title {
	    color: #999999;
	    font-size: 30rpx;
	    margin-top: 40rpx;
	  }
	
	  &-price {
	    color: #333333;
	    font-size: 56rpx;
	    margin-top: 16rpx;
	
	    font-family: PriceFont;
	  }
	
	  &-tip {
	    width: 684rpx;
	    height: 68rpx;
	    line-height: 68rpx;
	    background: #fafafa;
	    border-radius: 8rpx;
	    text-align: center;
	    color: #ff3347;
	    font-size: 26rpx;
	    margin-top: 40rpx;
	  }
	
	  &-alert {
	    color: #999999;
	    font-size: 22rpx;
	    margin-top: 60rpx;
	  }
	
	  &-btn {
	    width: 686rpx;
	    height: 88rpx;
	    background: linear-gradient(135deg, #00ccbe, #00c2bf);
	    border-radius: 12rpx;
	    line-height: 88rpx;
	    text-align: center;
	    color: #ffffff;
	    font-size: 32rpx;
	    margin-top: 24rpx;
	  }
	}
	
	.cart-header {
	  width: 100%;
	  height: 104rpx;
	  line-height: 104rpx;
	  background: #ffffff;
	  border-radius: 32rpx 32rpx 0 0;
	  text-align: center;
	  font-size: 32rpx;
	  font-weight: 500;
	  color: #111111;
	
	  .remove-all {
	    position: absolute;
	    top: 12rpx;
	    right: 16rpx;
	    width: 80rpx;
	    height: 80rpx;
	    font-size: 24rpx;
	    color: #999999;
	  }
	}
	.flex-center {
	  display: flex;
	  align-items: center;
	  justify-content: center;
		text{
			color: #111111;
		}
	}
	
	.mrb {
	  margin-bottom: 16rpx;
	}
	
	.selected-img {
	  width: 36rpx;
	  height: 36rpx;
	  margin-left: 16rpx;
	}
	
	.card-img {
	  width: 32rpx;
	  height: 32rpx;
	  margin-right: 12rpx;
	}
	
	.card-price {
	  font-family: PriceFont;
	  font-size: 24rpx;
	  color: #ff3347;
	}
	
	.card-sub {
	  font-size: 24rpx;
	  font-weight: 400;
	  color: #999999;
	}
.bgcStyle {
  width: 100%;
  // height: 32rpx;
	height: 116%;
  position: absolute;
  bottom: -32rpx;
  z-index: -1;
}
.back-icon {
  color: white;
  font-size: 40rpx;
  padding: 20rpx;
}
 .moreStore {
		background-color: #ffffff;
		padding: 40rpx 0 10rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
	}
	.store-container {
	  .storeItem {
	    padding: 32rpx 32rpx 0;
	    background: #ffffff;
	    border-radius: 24rpx 24rpx 0 0;
	
	    .header {
	      margin-bottom: 32rpx;
	      display: flex;
	      justify-content: space-between;
	
	      .header-content {
	        box-sizing: border-box;
	        display: flex;
	        align-items: center;
	        .storeName {
						height: 40rpx;
						color: #333333;
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
						display: block;
	        }
	      }
	
	      .icon {
	        width: 1rpx;
	      }
	    }
	  }
	
	  .tips {
	    background: #f7f7f7;
	    border-radius: 16rpx;
	    color: #999999;
	    font-size: 22rpx;
	    padding: 16rpx 24rpx;
	    box-sizing: border-box;
	  }
	
	  .discount-container {
	    padding-bottom: 22rpx;
	    display: flex;
	    flex-flow: column nowrap;
	    flex: 1;
	    align-items: center;
	    justify-content: flex-end;
	    font-size: 22rpx;
	    color: #999999;
			.item_css_style{
				width: 100%;
				height: 36rpx;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 8rpx;
				.left{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					.icon {
					  width: 24rpx;
					  height: 24rpx;
					}
				}
				.right{
					text{
						color: #666666;
						font-size: 26rpx;
					}
				}
			}
	  }
	
	  .discount-container2 {
	    margin-bottom: 24rpx;
	    display: flex;
	    flex-flow: row nowrap;
	    flex: 1;
	    align-items: flex-start;
	    justify-content: flex-end;
	    font-size: 22rpx;
	    color: #999999;
	
	    .left,
	    .right {
	      .item {
	        width: 302rpx;
	        height: 32rpx;
	        line-height: 32rpx;
	        display: flex;
	        flex: 1;
	        flex-flow: row nowrap;
	        justify-content: space-between;
	        margin-bottom: 8rpx;
	      }
	
	      .item:nth-last-child(1) {
	        margin-bottom: 0;
	      }
	    }
	
	    .line {
	      width: 2rpx;
	      height: 80rpx;
	      background: #ebebeb;
	      margin: 16rpx 40rpx;
	    }
	  }
	
	  .paddingBottom {
	    padding-bottom: 32rpx !important;
	  }
	}
	

.container {
  .order-container {
    width: 100%;
    height: 100%;
    overflow: auto;
		.order-status {
      width: 100%;
      // height: 140rpx;
      color: #ffffff;
      background-size: 100% 172rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .status,.status1 {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 8rpx;
        image {
          width: 64rpx;
          height: 64rpx;
					display: block;
          margin-right: 12rpx;
        }
        .text {
					height: 64rpx;
					line-height: 62rpx;
          font-size: 40rpx;
          font-weight: 500;
          color: #ffffff;
        }
      }
			.status1{
				margin-bottom: 32rpx;
			}

      .time {
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        font-weight: 400;
				margin-bottom: 32rpx;
      }
			.time {
			  color: #ffffff;
			  height: 40rpx;
			  line-height: 40rpx;
			  font-size: 24rpx;
			  font-weight: 400;
			  padding-left: 5rpx;
			  box-sizing: border-box;
			  display: flex;
			  flex-flow: row nowrap;
			  align-items: center;
			  .countStyle {
			    width: 154rpx;
			    height: 40rpx;
			    padding-left: 4rpx;
					display: flex;
					align-items: center;
			    box-sizing: border-box;
			    border-radius: 8rpx;
			    background: rgba(255, 255, 255, 0.06);
			    background-blend-mode: darken;
			    mix-blend-mode: normal;
			    border: 2rpx solid rgba(255, 255, 255, 0.3);
			  }
			}
			    
    }

    .order-header {
      margin-bottom: 16rpx;
      padding: 32rpx;
      background: #ffffff;
      border-radius: 20rpx;
      color: #333333;
      box-sizing: border-box;
      display: flex;
      flex: 1;
      flex-flow: row nowrap;
      justify-content: flex-start;
      image {
        width: 32rpx;
        height: 32rpx;
        object-fit: cover;
        margin: 8rpx 16rpx 0 0;
      }
      .cancel-text {
        color: #333333;
        font-size: 30rpx;
        line-height: 46rpx;
        word-wrap: break-word;
        word-break: break-all;
      }
      .failed-text {
        color: #ff3347 !important;
      }
    }

     .body {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx 24rpx 0 0;
      .header {
        margin-bottom: 32rpx;
        display: flex;
        justify-content: space-between;
        .header-content {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .storeName {
						height: 40rpx;
						color: #333333;
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
          }
        }
        .icon {
          width: 1rpx;
        }
      }
    }

    .contact-service {
      margin-top: 16rpx;
      background-color: #ffffff;
      padding: 38rpx 32rpx;
      border-radius: 24rpx;
      font-size: 26rpx;
      height: 112rpx;
      text-align: center;
      box-sizing: border-box;
    }
  }
}

// 底部 联系客服 及重新申请按钮
.contact-customer-Reapply {
  position: fixed;
  bottom: 0;
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 20rpx 32rpx;
  .Reapply {
    margin-left: 32rpx;
    width: 184rpx;
    height: 72rpx;
    line-height: 72rpx;
    box-sizing: border-box;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
    border-radius: 12rpx;
    font-size: 28 rpx;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
  }
  .contact-customer {
    width: 184rpx;
    height: 72rpx;
    line-height: 72rpx;
    box-sizing: border-box;
    text-align: center;
    background: #ffffff;
    border-radius: 12rpx;
    color: #111111;
    font-size: 28 rpx;
    font-weight: 500;
    border: 0.5rpx solid #eaeaea;
  }
}



// 底部 确认收货 及申请退款按钮
.applyforRefund-container,
.applyforRefund-confirmReceipt2 {
  position: fixed;
  bottom: 0;
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 30rpx 32rpx 26rpx 32rpx;
  .applyforRefund {
    box-sizing: border-box;
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    background: #ffffff;
    border-radius: 16rpx;
    color: #111111;
    font-size: 24rpx;
    border: 2rpx solid #eaeaea;
  }
}
.applyforRefund-confirmReceipt2 {
		padding-top: 30rpx;

		.refundOrderStatus {
			width: 160rpx;
			height: 56rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 16rpx;
			border: 2rpx solid #eaeaea;
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
		}
	}

// 底部 取消支付按钮样式 确认收货 及申请退款按钮
.waitPayBottom {
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 32rpx;
  position: fixed;
  bottom: 0;

  .gotoPay {
    width: 248rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(117.02deg, #fa3b34 24.56%, #ff6a33 92.21%);
    border-radius: 12rpx;
  }
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
  color: #FA4D32 !important;
  font-size: 30rpx !important;
  font-weight: 500;
}

::v-deep .uni-dialog-button-text {
  font-size: 30rpx !important;
}
</style>
