<template>
  <view class="container">
    <custom-navbar :opacity="scrollTo 100" :title="headerTi tle">
      <template v-slot:back>
        <i
          class="icon-ic_cancel_white back-icon"
          :style="{colo r: (scrollTop/100>1)?'black':'white'}"
          @click="toBack"
        ></i>
      </template>
    </custom-navbar>

    <view class="order-container" :style="{paddingBottom:112+containerBottom+'rpx'}">
      <view
        style="position: relative;"
        :style="{backgroundImage      rl(${bgImg} )`,ba      roundSize: '100% 1      '}"
      >
        <view
          class="bgcStyle"
          :style="{backgrou ndIm      :`url(${bgImg})`,backgr ound      e: '100% 100% '}"
        />
        <view :style="{height:navBar      ght}"></view>
        <view class="order-status">
          <view class="status">
            <image src="../../../static/ic_status_wait_pay.svg" mode="scaleToFill" />
            <text>待付款</text>
          </view>
          <view class="time" v-if="ord erIn      showCa ncelOrderTime">
            <text style="margin-right: 16rpx;">剩余支付时间</text>
            <count-down :start="orderInfo.remainTime" @finish="goToCancelDetail"></count-down>
          </view>
        </view>
      </view>

      <order-user-base-info :data="orderInfo"></order-user-base-info>
      <view class="moreStore" v-if=" orderInfo.orderName ">{{orderInfo.o    erName}}</view>
      <view class="store-container" v-for="(item,index) in orderInfo.details" :key="index">
        <view v-if="inde    > 0" style="height:0.5px;margin: 0 32rpx;background-color: #EBEBEB;" />
        <view
          class="storeItem"
          :class="{paddingBottom: item.stockType == 1 }"
          :style="{borderRadius:index >= 1 ? '0' :'24rp    24rpx 0 0'}"
        >
          <view class="header" @click="gotoShop(item)">
            <text style="color: #333333;">{{item.storeName}}</text>
            <image src="../../../static/ic_more.svg" mode />
          </view>
          <view v-for="item2 in item.details" :key="item    id">
            <order-item :orderStatus="1" :dataList="item2" @handleDetail="productDe  ail  item2)" />
          </view>
          <view class="discount-container" v-if="item.hasMateria    &&  orderInfo.details.length>1">
            <view class="left">
              <view class="item">
                <view class="item-style">
                  <view style="margin-right: 8rpx;">运费</view>
                  <image
                    class="icon"
                    src="../../../../static/price_icon.svg"
                    mode
                    @click="re  dExpenses(1)"
                  />
                </view>
                <view
                  class="price-font"
                  style="color: #333;font-size: 26rpx;"
                  v-if="    derInfo.stockT ype == 0"
                >￥{{item.f    ight?`${item.freight    :"0.00"}}</view>
                <view
                  class="price-font"
                  :style="{marginTop:ite    freight?'0':'8rpx'}"
                  style="color: #333;font-size: 26rpx;"
                  v-else
                >{{item.freight?`￥${ite    freight}    "--"}}</view>
              </view>

              <view class="item" v-if="item.platformDiscount">
                <text>平台优惠</text>
                <text
                  class="price-font"
                  style="color: #333;font-size: 26rpx;"
                >-￥{{item.platformDis    unt}}</text>
              </view>
            </view>
            <!-- {{item.handlingFees}} {{ item.storeDiscount}} -->
            <view class="line1" v-if="item.    oreDiscount" />
            <view class="line2" v-else />

            <view class="right">
              <view class="item">
                <view class="item-style">
                  <view style="margin-right: 8rpx;">搬运费</view>
                  <image
                    class="icon"
                    src="../../../../static/price_icon.svg"
                    mode
                    @click="readExpenses(2)"
                  />
                </view>
                <text
                  class="price-font"
                  style="color: #333;font-size: 26rpx;"
                  v-if="orderInfo.stockType == 0"
                >￥{{item.handlingFees?i      .handlingFees:"0.00"}}</text>
                <text
                  class="price-font"
                  style="color: #333;font-size: 26rpx;"
                  :style="{marginTop:item.handlingFees ? '0' : '8rpx' }"
                  v-else
                >{{i      .handlingFees?`￥${item.h      lingFe    }`:"--"}}</text>
              </view>
              <view class="item" v-if="item.storeDiscount">
                <text>商家优惠</text>
                <text
                  style="color: #333;font-size: 26rpx;"
                  class="price-font"
                >-￥{{item.storeDiscount}}</text>
              </view>
            </view>
          </view>
          <!-- {{ orderInfo.type }} {{ item.freeShipCount }} {{ orderInfo.stockType }} -->

          <view
            v-if="item.hasMateria l && orderI      .stockType == 1"
            :style="{paddingBott        item.hasMaterial && o      rI    o.s  ockType == 1 ? '3    px':'0'} "
          >
            <view class="tips" v-if="item.freeShipCount         item.f ul      emp    onA    unt ">
              <text>本次支付</text>
              <text style="color: #333333;">满{{item.fullExe      ionAmount}}元</text>
              <text>，可获得</text>
              <text style="color: #333333;">{{item. freeSh      ount}}次免运费额度，</text>
              <text>搬运费需要根据实际要货时进行核算</text>
            </view>
            <view class="tips" v-else>
              <text>搬运费需要根据实际要货时进行核算</text>
            </view>
          </view>
        </view>
        <view class="split-line" />
      </view>

      <order-price :data="orderInfo" :waitPay="true" />

      <view class="payment-method">
        <text>支付方式</text>
        <view class="method">
          <image src="@/static/order/ic_order_wechat@2x.png" mode />
          <text>微信支付</text>
        </view>
      </view>

      <order-info :orderNo=" order Info      de rNo" :createTime="o        Info.crea      ime" />

      <!-- 底部按钮 -->
      <view
        v-if="orderInfo.showCancelBtn ||  order Info      ow ToPayBtn  "
        :class="{noCancel Bt      rue}"
        class="waitPayBottom"
        :style="{paddingBottom:systemBottom ,hei      :systemHeight ,justif yContent    otto    tyle }"
      >
        <view class="canclePay" v-if="ord er      o.showCancelBtn" @click="handleCancelOrder">取消订单</view>
        <view class="gotoPay" v-if="or de rI        .showToPayBtn" @click="toPay">去付款</view>
      </view>
    </view>
    <!-- 取消该订单弹框 -->
    <popup-dialog
      ref="cancleOrder"
      :title="title"
      @close="cancelOrderClose"
      @confirm="can    eCo    irm"
    ></popup-dialog>
    <expenses-toast ref="expensesToast" :expensesType="expen    sType"></expenses-toast>
  </view>
</template>

<script>
mport {
   etOrderDetai,
  orderPay,
  cancelOrder,
  cnfirmRecei  Order,
} from   ./../../../apiorder.js";
export default {
  ata()  { 
    retu r n {
      orderNo: "",
      orerInfo: {},
			ex  nsesType:"",         systemB  tom:  ",
          temHeight:      
      containerBottom: "",
      title: "您确定要取消该订单吗？",
      areaId: "",
			from:"",
			na      Height: "",
			bot      tyle:"",
			scroll       0,
			heade      le:"",
			bgImg:'      s://ali-image.dab      a.com/stati      /dabanjia      ges/decorate/order      orange.png'
        
  },
 
  mou    d(e  {
    const menuButtonInfo = uni    tMenuButtonBoundingClientRect();
      is.c  tainerBottom     enuButtonInfo.bottom;
    this.systemBottom     enuButton    o.bottom + "rpx";
    this.systemHeight = menuButto    fo.bottom + th    num + "rpx";
    console.log(this.systemBottom);
  },
	onPag    roll(scrollTop) {
		this.scrollTop = scrollT    scrollTop
	},
  onLoad(e) {
		this.from= e.from
      this.orderNo = Numb      .orderNo) || getApp().globalData.decorateMsg.orderId;
    const currentHouse       tApp().globalData.current      e;
       is.areaId = curren      se.areaId;

		      取胶囊按钮的位置
		const syste    fo     ni .g et SystemInfoSy nc(      		const menu ButtonInfo  = uni.getM enuButton Bo und        ientRect();
 
 		this.navB      ight    
			m    ButtonInfo.top +
			(menuB      nInfo.top - systemInfo.statusBarHe    t)   
			  nuButtonInfo    ight +
			"px      		uni.setNavigationBarCo        
			frontColor: '#fffff        			backgroundColo r:'#ff          
			animation: {
				du        n:       
			    ming    c: 'easeIn'
		      		})
	},
  onShow() {
		this.headerTitle="订单详情"
      th    orderDetail()       },
  method      
    orderDetail() {
      getOrderDetail({            id: this.      rNo,
      }).then((e) => {
                le.log(e);               his.orderInfo = e;        	this.bottomStyle= this.orderInfo.showCancelBtn?'space-between':'flex-end'
        console.log("this.orderInf       this.    erIn    ;
      });
    },      // 改变返回下一个页面的路径      toBack(){
			if(        from=="wa          rder"){
				uni.r          tTo({
	        rl:"../my          ?firstEntry=true&i          "
				}        	}else{
          i.navigateBack({
            delta:        			});
	          	},
		readExp          num) {
        his.expens           = num
      thi      efs.expensesT    t.sh    upop()
		},

         跳转到商品详情页面
         ductDetail(item)             uni.navigateTo({
            rl: `../../../../ sub-class          ges/goods-detail/goo            il?goodId=${item                    });
            
    // 跳转到店铺页面
              oShop(item) {
      c            log(          ！！！！");
      console.log            storeId=", item.storeId,          .ar        ",       .area    ;
       uni.navigateTo(             url: `../        /../      classify/pages/s        shops?storeId=${item.storeId}&area        this.areaId}`,
          );
    },
    // 倒计时间触发到的时间
             ancelDe           {
      uni.redirectTo({              url: `../o            iled/order-failed?type=close&id=${this.orderNo}&from=waitPay`,
      });
    },

            请退款页面
    toApplayForRefund(               uni          ateTo({
        url: "/sub          ges/apply-for-            apply-for-refund",
      });
    },
    // 取消订单
    handleCancelOrder() {
      thi        fs.cancleOrder.open();
    },
    cancelOr          se() {
          this.$refs.cancleOrder            );
    },
    cancleConfi            
      //点击确定后订单会被取消且该订单会被移入已关闭订单中
              elO          
        id: this.ord                  }).then((e) => {
               is.$refs.cancleOrder.close();
        un          rec          
          url: `../or            led/order-failed?type=close            his.orderNo}&from=waitPay`,
        });            }            },

    //              toPay() {
      // 先判断是否支付超额拆单了 // 拆单之后直接跳转到拆单页面	// 未拆单 直接支付
      console.log(this.        Inf      orde    fo.o    rId=", thi      derInfo.orderId);
       if   hisorderInfo.isSplitPay) {
        // orderId 是订单id
        uni.navigateTo({
          url: `../multiple-payments/multiple-payments?orderId=${this.orderNo}&type=detail&remainTime=${this.orderInfo.remainTime}`,
        });
      } else {
        let openId = uni.getStorageSync("openId");
        orderPay({
          orderId: this.orderNo,
          payType: 1, //支付类型  1微信支付",
          openid: openId,
        }).then((e) => {
          const payInfo = e.wechatPayJsapi;
          uni.requestPayment({
            provider: "wxpay",
            ...payInfo,
            success(res) {
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
            },
          });
        });
      }
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
			if(!price) return ['0','00']
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bgcStyle {
  width: 100%;
  height: 32rpx;
  position: absolute;
  bottom: -32rpx;
  z-index: -1;
}
.back-icon {
  color: white;
  font-size: 40rpx;
  padding: 20rpx;
}
.container {
  // background-color: skyblue;
  .order-container {
    height: 100%;
    overflow: auto;

    .order-status {
      width: 100%;
      height: 140rpx;
      color: #ffffff;
      background-size: 100% 172rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      position: relative;

      // .backgroundStyle {
      //   position: absolute;
      //   z-index: -1;
      //   width: 100%;
      //   height: 172rpx;
      //   // background-color: #ffb245;
      // }

      .status {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 8rpx;

        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-right: 12rpx;
        }

        text {
          font-size: 48rpx;
          font-weight: 500;
          color: #ffffff;
        }
      }

      .time {
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        font-weight: 400;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }
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
          box-sizing: border-box;
          display: flex;
          align-items: center;
          text {
            font-weight: 500;
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

        .tips {
          background: #f7f7f7;
          border-radius: 16rpx;
          color: #999999;
          font-size: 22rpx;
          padding: 16rpx 24rpx;
          box-sizing: border-box;
        }

        .discount-container {
          padding-bottom: 32rpx;
          display: flex;
          flex-flow: row nowrap;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
          font-size: 22rpx;
          color: #999999;

          .left,
          .right {
            .item {
              width: 302rpx;
              height: 32rpx;
              display: flex;
              flex: 1;
              flex-flow: row nowrap;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8rpx;
              color: #999999;
              font-size: 22rpx;
              .item-style {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;

                .icon {
                  width: 24rpx;
                  height: 24rpx;
                  object-fit: cover;
                }
              }
            }

            .item:nth-last-child(1) {
              margin-bottom: 0;
            }
          }

          .line1 {
            width: 2rpx;
            height: 40rpx;
            background: #ebebeb;
            margin: 16rpx 40rpx;
          }

          .line2 {
            width: 2rpx;
            height: 20rpx;
            background: #ebebeb;
            margin: 6rpx 40rpx;
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
      }

      .paddingBottom {
        padding-bottom: 32rpx !important;
      }
    }

    .payment-method {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      height: 112rpx;
      color: #333333;
      font-size: 30rpx;
      font-weight: 500;
      padding: 32rpx;
      margin-bottom: 16rpx;
      border-radius: 24rpx;
      box-sizing: border-box;

      .method {
        display: flex;
        align-items: center;

        image {
          width: 32rpx;
          height: 32rpx;
          object-fit: cover;
          margin-right: 16rpx;
        }

        text {
          font-size: 28rpx;
        }
      }
    }
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
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
    border-radius: 12rpx;
  }
}

//头部倒计时样式
// ::v-deep .uni-countdown__number {
//   width: 36rpx !important;
//   height: 36rpx !important;
// }

// ::v-deep .uni-countdown__splitor {
//   line-height: 32rpx !important;
//   color: #ffffff !important;
// }

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
