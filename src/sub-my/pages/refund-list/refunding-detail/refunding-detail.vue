<template>
  <view class="container" >
		<custom-navbar :opacity="scrollTop/100" :title="headerTitle">
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" :style="{color: (scrollTop/100>1)?'black':'white'}"
					@click="toBack"></i>
			</template>
		</custom-navbar>

		<view class="refund-container" :style="{paddingBottom:containerPaddingBottom}" >
			<view style="position: relative;" >
				<view 
					class="bgcStyle" 
					:style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
				/>
				<view :style="{height:navBarHeight}"></view>
				<view class="refund-status" >
					<view v-for="statusItem in refundStatusList" :key="statusItem.value">
						<view class="status" v-if="refundInfo.status == statusItem.value">
							<image :src="statusItem.imgUrl" />
							<view class="text">{{statusItem.statusName}}</view>
						</view>
					</view>
					<view class="time"
						v-if="refundInfo.status == 2 || refundInfo.status == 3 || refundInfo.status == 4"
					>{{refundInfo.createTime | formatDate}}</view>
				</view>
			</view>

			<!-- 退款关闭独有的 -->
			<view class="order-header" 	v-if="refundInfo.status ==3 || refundInfo.status ==4 || refundInfo.status ==5">
			  <image v-if="refundInfo.status == 5 " src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_refund_failed.svg" mode="" />
			  <image v-else src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_failed.svg"  mode=""/>

			  <view v-if="refundInfo.status == 3" class="cancel-text">
					商家拒绝了您的申请，如有问题未解决，您可以重新申请
				</view>
			  <view v-if="refundInfo.status == 4 && refundInfo.type !== 6" class="cancel-text">
					您已取消了本次退款，如有问题未解决，您可以重新申请
				</view>
				<!-- 变更单退款详情需要显示的文案 -->
				<view v-if="refundInfo.status == 4 && refundInfo.type == 6" class="cancel-text failed-text" >
					您已经取消了本次退款，如有问题可联系客服
				</view>

			  <view v-if="refundInfo.status == 5" class="cancel-text failed-text" >
					您的退款账户存在异常，您可联系客服或者重新发起申请
				</view>
			</view>

			<view class="refund-product-info"
				v-if="refundInfo.status ==3 || refundInfo.status ==4 || refundInfo.status ==5"
				:style="{paddingBottom:refundInfo.type==2  ?'24rpx':'0'}"
			>
			  <order-item
					v-if="refundInfo.type !==5"
			    v-for="item in refundInfo.detailAppVOS"
			    :key="item.id"
			    :dataList="item"
			    :refundType="true"
			    @handleDetail="productDetail(item)"
			  />
			  <store-calue-card-item
					v-else
					v-for="item in refundInfo.detailAppVOS"
					:key="item.id"
					:dataInfo="item"
				/>

			  <view class="refund-money" v-if="(refundInfo.status ==3 || refundInfo.status ==4 ) && (refundInfo.freight || refundInfo.handlingFees) ">
			    <!--运费 -->
			    <view  class="price-item" v-if="refundInfo.freight">
			      <view class="title">
			        <text style="margin-right: 8rpx;">运费</text>
			        <image src="../../../../static/price_icon.svg" class="icon" @click="readExpenses(1)"/>
			      </view>
			      <view class="price">
			        <text>￥</text>
			        <text class="price-style price-font">{{handlePrice(refundInfo.freight)[0]}}.{{handlePrice(refundInfo.freight)[1]}}</text>
			      </view>
			    </view>

			    <!-- 搬运费 -->
			    <view class="price-item" v-if="refundInfo.handlingFees" >
			      <view class="title">
			        <text style="margin-right: 8rpx;">搬运费</text>
			        <image  class="icon"  src="../../../../static/price_icon.svg" @click="readExpenses(2)"/>
			      </view>
			      <view>
			        <text>￥</text><text class="price-style price-font">{{handlePrice(refundInfo.handlingFees)[0]}}.{{handlePrice(refundInfo.handlingFees)[1]}}</text>
			      </view>
			    </view>
			  </view>
			</view>


			<!-- 退款成功独有的 -->
			<view class="order-header1"  v-if="refundInfo.status ==2">
			  <view class="refund-price">
			    <text>退款总金额</text>
			    <view style="color:#FA4D32;">
			      <text style="font-size:26rpx;">￥</text>
			      <text style="font-size:40rpx;" class="price-font" >
							{{handlePrice(refundInfo.refundAmount)[0]}}.
						</text>
			      <text  style="font-size:26rpx;" class="price-font">
							{{handlePrice(refundInfo.refundAmount)[1]}}
						</text>
			    </view>
			  </view>
				<!-- 储值卡需求 -->
				<view class="router" v-if="refundInfo.deductedAmount" :style="{marginBottom:(refundInfo.weChatRefundedAmount || refundInfo.cardRefundedAmount)?'16rpx':'0'}">
				  <text  style="color: #999999;font-size: 26rpx;">变更单抵扣</text>
				  <view>
				    <text style="font-size: 20rpx;">￥</text>
				    <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.deductedAmount)[0]}}.
						</text>
				    <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.deductedAmount)[1]}}
						</text>
				  </view>
				</view>
				<view class="router" v-if="refundInfo.cardRefundedAmount" :style="{marginBottom:refundInfo.weChatRefundedAmount?'16rpx':'0'}">
				  <text  style="color: #999999;font-size: 26rpx;">原路径退回至储值卡</text>
				  <view>
				    <text style="font-size: 20rpx;">￥</text>
				    <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.cardRefundedAmount)[0]}}.
						</text>
				    <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.cardRefundedAmount)[1]}}
						</text>
				  </view>
				</view>
			  <view class="router" v-if="refundInfo.weChatRefundedAmount" :style="{marginBottom:refundInfo.couponRefundedAmount?'16rpx':'0'}" >
			    <text style="color: #999999;font-size: 26rpx;">原路径退回至原账户</text>
			    <view>
			      <text style="font-size: 20rpx;">￥</text>
			      <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.weChatRefundedAmount)[0]}}.
						</text>
			      <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.weChatRefundedAmount)[1]}}
						</text>
			    </view>
			  </view>
				<!-- 优惠卡需求 -->
				<view class="router" v-if="refundInfo.couponRefundedAmount"  style="margin-bottom: 0">
				  <text  style="color: #999999;font-size: 26rpx;">退回优惠券</text>
				  <view>
				    <text style="font-size: 20rpx;">￥</text>
				    <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.couponRefundedAmount)[0]}}.
						</text>
				    <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.couponRefundedAmount)[1]}}
						</text>
				  </view>
				</view>
			</view>

			<view class="refund-product-info" v-if="refundInfo.status ==2"
				:style="{paddingBottom:(refundInfo.type==2 || (productLength==1 && refundInfo.type !==5 )) ?'32rpx':'0'}"
			>
			  <order-item
					v-if="refundInfo.type !==5"
					v-for="item1 in refundInfo.detailAppVOS"
					:key="item1.id"
			    :dataList="item1"
			    :orderType="2"
			    :refundType="true"
			    @handleDetail="productDetail(item1)"
			  />
				<store-calue-card-item
					v-else
					:dataInfo="item1"
				/>
			</view>

			<!-- 退款中 -->
			<view class="refund-product-info"  v-if="refundInfo.status ==0 || refundInfo.status ==1"
			 :style="{paddingBottom:(refundInfo.type==2 || (productLength==1 && refundInfo.type !==5 )) ?'24rpx':'0'}">
				<order-item
					v-if="refundInfo.type !==5"
					v-for="item in refundInfo.detailAppVOS"
					:orderType="refundInfo.type"
					:key="item.id"
					:dataList="item"
					:refundType="true"
					@handleDetail="productDetail(item)"
				/>
				<store-calue-card-item
					v-else
					v-for="item in refundInfo.detailAppVOS"
					:key="item.id"
					:refundType="true"
					:dataInfo="item"
				/>
			</view>
			<!-- 公用的 -->
			<order-refund-info :refundInfo="refundInfo"></order-refund-info>
			
			<!-- 对公收付款 -->
			<view class="offline-info" v-if="refundInfo.isOrderCompanyTransfer">
				<view class="header">
					退款线下收款信息
				</view>
				<view class="item">
					<text class="item-header">户名：</text>
					<text class="item-body">{{refundInfo.accountName}}</text>
				</view>
				<view class="item">
					<text class="item-header">银行账号：</text>
					<text class="item-body">{{refundInfo.accountNo}}</text>
				</view>
				<view class="item">
					<text class="item-header">开户行：</text>
					<text class="item-body">{{refundInfo.accountBank}}</text>
				</view>
			</view>
		</view>

		<!-- 退款关闭底部按钮 -->
		<view v-if="refundInfo.showContactCustomer || refundInfo.showReApply || refundInfo.cancelRefunded"
			class="footerBtn-container"
			:style="{paddingBottom:systemBottom}"
		>
			<view v-if="refundInfo.showContactCustomer" class="contact-customer" @click="contactCustomer()">
				联系客服
			</view>
			<view v-if="refundInfo.showReApply" class="Reapply" @click="toApplayForRefund(refundInfo)" >
				重新申请
			</view>
			<view class="button"  @click="cancelToPay()">
				取消退款
			</view>
		</view>


		<!-- 取消退款的弹框 -->
    <uni-popup  ref="cancelRefund"  type="dialog">
      <uni-popup-dialog
        mode="base"
        :title="title"
        :before-close="true"
        @close="cancelToPayClose"
        @confirm="confirmCancelToPay"
      />
    </uni-popup>

	</view>
</template>

<script>
import { formatDate } from "../../../../utils/common.js";
import {  getRefundDetail,cancelRefund,confirmReceiptOrder } from "../../../../api/order.js";
export default {
	filters: {
	  formatDate,
	},
  data() {
    return {
      id: "",
			refundInfo:{},
			productLength:"",
			systemBottom: "",
			containerBottom:"",
			containerPaddingBottom:"",
			navBarHeight:"",
			scrollTop: 0,
			title:"确定要取消本次退款申请？",

			headerTitle:"退款详情",
			bgImg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/order_bg.png",
			areaId:"" ,
			status: "", //退款状态 0待确认 1退款中 2退款完成 3已拒绝 4已取消 5退款失败  退款处理中(0,1) 退款成功(2) 退款关闭(3,4)"
			from:"",
			expensesType: 0,
			refundStatusList:[
				{
					value:0,
					imgUrl:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_status_inprogress.svg",
					statusName:"退款中",
				},
				{
					value:1,
					imgUrl:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_status_inprogress.svg",
					statusName:"退款中",
				},
				{
					value:2,
					imgUrl:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_success.svg",
					statusName:"退款成功",
				},
				{
					value:3,
					imgUrl:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_failed.svg",
					statusName:"退款关闭",
				},
				{
					value:4,
					imgUrl:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_failed.svg",
					statusName:"退款关闭",
				},
				{
					value:5,
					imgUrl:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_failed.svg",
					statusName:"退款失败",
				},
			],
		};
  },

	mounted(e) {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.containerBottom = menuButtonInfo.bottom
		this.systemBottom = menuButtonInfo.bottom + 24 + "rpx";
		this.containerPaddingBottom = menuButtonInfo.bottom + 160 + "rpx";
		console.log(this.systemBottom);
	},
	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	},
  onLoad(e) {
		this.id =Number(e.id);
		this.from = e.from
		this.refundDetail()
		this.status = Number(e.status);
		const systemInfo = uni.getSystemInfoSync();
		//状态栏高度
		this.tophight = systemInfo.statusBarHeight + "px";
		// 获取胶囊按钮的位置
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.navBarHeight =
			menuButtonInfo.top +
			(menuButtonInfo.top - systemInfo.statusBarHeight) +
			menuButtonInfo.height +
			"px";
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor:'#ff0000',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		})
	},


  methods: {
		toBack(){
			if (this.from == "inprogress") {
			  uni.redirectTo({
					url:"../../my-order/my-order?index=2&firstEntry=true"
			  });
			}else if(this.from == "refund"){
				uni.redirectTo({
					url:"../refund-list"
				})
			}
			else{
				uni.navigateBack({
					delta:1
				})
			}
		},


		refundDetail(){
			getRefundDetail({ id: this.id }).then(e=>{
			console.log("打印请求回来的数据=",e,"e")
				this.refundInfo = e
				this.productLength = this.refundInfo.detailAppVOS.length
				console.log("获取详情数据data=", this.refundInfo);

			})
		},

		// 跳转到商品详情页面
		productDetail(item){
			console.log("item!!!!",item)
			uni.navigateTo({
				url:`../../../../sub-classify/pages/product-detail/index?productId=${item.relationId}`
				// url:`../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.relationId}`
			})
		},

		//取消退款
		 cancelToPay() {
			 console.log("this.refundInfo.approvalCompleted==",this.refundInfo.approvalCompleted)
			 // this.refundInfo.approvalCompleted = true
			 if(this.refundInfo.approvalCompleted){
				this.title="退款审核已通过，不可取消"
			 }else{
				 this.title="确定要取消本次退款申请？"
			 }
      this.$refs.cancelRefund.open();
    },
    cancelToPayClose() {
      this.$refs.cancelRefund.close();
    },
    confirmCancelToPay(value) {
      // 调用取消退款的接口
			if(this.refundInfo.approvalCompleted){
				this.$refs.cancelRefund.close();
			}else{
				cancelRefund({id:this.id }).then(e=>{
					console.log(e)
					// 成功就关闭弹框
					// 跳转到退款关闭页面  退款取消页面
					this.$refs.cancelRefund.close();
					this.refundDetail()
					this.from ="inprogress"
				})
			}
    },

		// 联系客服
		contactCustomer() {
		  this.$store.dispatch("openCustomerConversation");
		},

		// 申请退款
		toApplayForRefund(data) {
		  if (data.isWarehoused) {
		    console.log(data);
		    // 有仓库跳转到成龙的页面
		    getApp().globalData.naviData = data;
		    let type = 0;
		    if (data.isReturnInventory) {
		      type = 1;
		    }
		    uni.redirectTo({
		      url: `/sub-decorate/pages/warehouse-refund/warehouse-refund?refundType=${data.type}&id=${data.id}&type=${type}`,
		    });
		  } else {
		    wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
		    uni.redirectTo({
		      url: `/sub-my/pages/apply-for-refund/apply-for-refund?refundId=${data.id}`,
		    });
		  }
		},

		// 显示运费搬运费弹框
		readExpenses(num) {
		  this.expensesType = num;
		  this.$refs.expensesToast.showPupop();
		},
		// 处理价格显示的弹框
		handlePrice(price){
			if(!price) return ['0','00']
			let list=String(price).split(".")
			if(list.length==1){
				return [list[0],"00"]
			}else{
				return[list[0],list[1]]
			}
		},

	},
};
</script>

<style lang="scss" scoped>
	.bgcStyle{
		width: 100%;
		height: 116%;
		// height: 32rpx;
		position: absolute;
		bottom: -32rpx;
		z-index: -1;
	}
	.back-icon {
		color: white;
		font-size: 40rpx;
		padding: 20rpx;
	}
.header {
  margin-bottom: 32rpx;
  box-sizing: border-box;
  display: flex;
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

.tips {
  background: #f7f7f7;
  border-radius: 16rpx;
  color: #999999;
  font-size: 22rpx;
  padding: 16rpx 24rpx;
  box-sizing: border-box;
}

.discount-container1 {
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
		height: 40rpx;
		background: #ebebeb;
		margin: 16rpx 40rpx;
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

.discount-container3 {
	padding-bottom: 24rpx;
	display: flex;
	flex-flow: row nowrap;
	flex: 1;
	align-items: flex-start;
	justify-content: flex-end;
	font-size: 22rpx;
	color: #999999;
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
	}
}



.container {
	.refund-container{
		width: 100%;
		height: 100%;
		overflow: auto;
		.refund-status{
			width: 100%;
			color: #ffffff;
			background-size: 100% 172rpx;
			padding-bottom: 32rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			.status {
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
			.time{
				margin-top: 6rpx;
				color: #ffffff;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				font-weight: 400;
			}
		}
	}
  .order-container {
		width: 100%;
		height: 100%;
		overflow: auto;
    .order-status {
      width: 100%;
      color: #ffffff;
      background-size: 100% 172rpx;
			margin-bottom: 32rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      position: relative;
      .backgroundStyle {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 172rpx;
        background-color: #ffb245;
      }
      .status {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-right: 12rpx;
        }
        text {
					font-size: 40rpx;
          font-weight: 500;
          color: #ffffff;
        }
      }

      .time {
				margin-top: 6rpx;
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        font-weight: 400;
        display: flex;
        align-items: center;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
      }
    }


    .delete-button {
      margin: 60rpx 0;
      background: #fefffe;
      padding: 24rpx 32rpx;
      .delete {
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
        font-weight: 500;
        background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
        border-radius: 12rpx;
      }
    }


    .body1 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 16rpx;
    }
		.singleStore{
			.productInfo{
				padding: 32rpx 32rpx 0;
				background: #ffffff;
				border-radius: 24rpx 24rpx 0 0;
			}
		}
    .body2 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx 24rpx 0 0;
      .apply-refund-container {
        padding: 24rpx 0 32rpx 0;
        display: flex;
        justify-content: flex-end;
        .button {
          width: 160rpx;
          height: 56rpx;
          line-height: 52rpx;
          text-align: center;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 24rpx;
          border: 2rpx solid #eaeaea;
          font-size: 24rpx;
          font-weight: 400;
          color: #111111;
        }
      }

      .warehouse-container {
        margin: 24rpx 0 40rpx 0;
				padding:12rpx 0 14rpx 0;
				height: 98rpx;
				box-sizing: border-box;
				background: #FAFCFC;
				border-radius: 16rpx;
				border: 2rpx solid #E4F0F0;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				.left{
					width: 174rpx;
					box-sizing: border-box;
				}
				.line{
					width: 2rpx;
					height: 36rpx;
					background: #E4EDED;
				}
				.right{
					width: 510rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					.item{
						width: 170rpx;
						box-sizing: border-box;
					}
				}
				.left,.right .item{
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					justify-content: space-around;
					.text1{
						color: #808080;
						font-size: 22rpx;
						margin-bottom: 14rpx;
					}
					.text2{
						color: #333333;
						font-size: 28rpx;
						font-weight: 500;
					}
				}
      }

      .shop-item {
        margin-bottom: 32rpx;


        .split-line {
          height: 1rpx;
          background-color: #ebebeb;
        }
      }
      .shop-item:nth-last-child(1) {
        margin-bottom: 0;
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
	//退款关闭页面独有的样式
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
	}

	//退款成功页面独有的样式
	.order-header1 {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 32rpx;
		color: #333333;
		font-size: 30rpx;
		box-sizing: border-box;
		flex: 1;
		margin-bottom: 16rpx;

		.refund-price{
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16rpx;
		}
		.router {
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16rpx;
		}
	}

.refund-product-info {
	padding: 32rpx 32rpx 0 32rpx;
	background-color: #ffffff;
	margin-bottom: 16rpx;
	border-radius: 24rpx;
}
.offline-info{
	background-color: #fff;
	padding: 32rpx;
	border-radius: 24rpx;
	margin-top: 16rpx;
	.header{
		font-size: 30rpx;
		font-weight: 1000;
		height: 48rpx;
		line-height: 48rpx;
		margin-bottom: 16rpx;
	}
	.item{
		font-size: 28rpx;
		display: flex;
		flex: 1;
		flex-flow: row nowrap;
		justify-content: flex-start;
		margin-bottom: 16rpx;
		.item-header{
			width: 140rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #999999;
			display: block;
			flex: 1;
		}
		.item-body{
			width: 546rpx;
			line-height: 40rpx;
			display: flex;
			flex-flow: row nowrap;
			
		}
	}
	.item:nth-last-child(1){
		margin-bottom: 0;
	}
}
// 底部 取消支付按钮样式 确认收货 及申请退款按钮
.footerBtn-container {
	position: fixed;
	bottom: 0;
	width: 686rpx;
	background-color: #FFFFFF;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 32rpx;
	font-size: 26rpx;
	.button{
		height: 88rpx;
		background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
		border-radius: 12rpx;
		width: 686rpx;
		line-height: 88rpx;
		text-align: center;
		color: #ffffff;
		font-size: 32rpx;
		margin: 4rpx 0;
	}
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

