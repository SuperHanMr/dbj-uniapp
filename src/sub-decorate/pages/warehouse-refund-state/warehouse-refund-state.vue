<template>
  <view>
    <custom-navbar
      :opacity="scrollTop/100"
      :title="headerTitle"
    >
      <template v-slot:back>
        <i
          class="icon-ic_cancel_white back-icon"
          :style="{color: (scrollTop/100>1)?'black':'white'}"
          @click="back"
        ></i>
      </template>
    </custom-navbar>
    <view>

      <view
        class="basic-info"
        :style="{backgroundImage:'url(https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/order_bg.png)',backgroundSize: '100% 100%'}"
      >
        <view class="navbar-height">
        </view>
        <view class="info">
          <view class="header1">
            <image
              v-if="[2].includes(detail.status)"
              class="success-icon"
              src="../../static/ic_order_success.svg"
              mode=""
            />{{headerTitle}}
          </view>
        </view>
        <view class="header2">
          {{detail.refundTime | formatDate}}
        </view>
        <view class="placehold">
        </view>
      </view>
      <view
        v-if="![0, 1].includes(detail.status)"
        class="header-content"
      >
        <view
          v-if="tips"
          class="icon"
        >
          <i class="icon-icon_order_tips"></i>
        </view>
        <view
          class="alert"
          :style="{color:detail.status==5?'#FF3347':'#333333'}"
          style="flex:1"
        >
          {{tips}}
        </view>
      </view>
    </view>
    <view
      v-if="detail.status==2"
      class="flex-between "
    >
      <view class="row">
        <view class="title">
          退款总金额
        </view>
        <view class="price">
          ¥ <text style="font-size: 40rpx;"> {{foramtPrice(detail.refundAmount)}}</text>. <text> {{formatCent(detail.refundAmount)}}</text>
        </view>
      </view>
      <view
        v-if=" Number(detail.weChatRefundedAmount)>0"
        class="row mt16"
      >
        <view class="sub-title">
          原路径退回至原账户
        </view>
        <view class="sub-price">
          ¥ <text style="font-size: 30rpx;"> {{foramtPrice(detail.weChatRefundedAmount)}}</text>. <text> {{formatCent(detail.weChatRefundedAmount)}}</text>
        </view>
      </view>
      <view
        v-if=" Number(detail.cardRefundedAmount)>0"
        class="row mt16"
      >
        <view class="sub-title">
          原路径退回至储值卡
        </view>
        <view class="sub-price">
          ¥ <text style="font-size: 30rpx;"> {{foramtPrice(detail.cardRefundedAmount)}}</text>. <text> {{formatCent(detail.cardRefundedAmount)}}</text>
        </view>
      </view>
    </view>
    <view
      v-if="detail.status==2"
      style="height: 16rpx;"
    >

    </view>
    <warehouse-item
      v-if="detail"
      :showTitle="false"
      :showPayPrice="true"
      :showPrePrice="false"
      :item="detail"
      :key="item.id"
      @detail="toDetail"
      @refund="toRefund"
    >
    </warehouse-item>
    <view class="info-content">
      <view class="title">
        退款信息
      </view>
      <view class="row">
        <view class="heaer">
          退款原因：
        </view>
        <view class="text">
          {{detail.reason}}
        </view>
      </view>

      <view class="row">
        <view class="heaer">
          退款类型：
        </view>
        <view class="text">
          {{refuntType(detail.type)}}

        </view>

      </view>

      <view class="row">
        <view class="heaer">
          退款金额：

        </view>
        <view class="text">
          ￥{{detail.refundAmount}}
        </view>
      </view>

      <view class="row">
        <view class="heaer">
          申请时间：
        </view>
        <view class="text">
          {{detail.createTime | formatDate}}
        </view>
      </view>

      <view class="row">
        <view class="heaer">
          退款编号：

        </view>
        <view class="text">
          {{detail.refundNo}}
          <text
            class="tip"
            @click="copy(detail.refundNo)"
          >
            复制</text>
        </view>
      </view>

      <view class="row">
        <view class="heaer">
          备注信息：
        </view>
        <view class="text">
          {{detail.remark}}
        </view>
      </view>

    </view>
    <view class="offline-info" v-if="detail.isOrderCompanyTransfer">
    	<view class="header">
    		退款线下收款信息
    	</view>
    	<view class="item">
    		<text class="item-header">户名：</text>
    		<text class="item-body">{{detail.accountName}}</text>
    	</view>
    	<view class="item">
    		<text class="item-header">银行账号：</text>
    		<text class="item-body">{{detail.accountNo}}</text>
    	</view>
    	<view class="item">
    		<text class="item-header">开户行：</text>
    		<text class="item-body">{{detail.accountBank}}</text>
    	</view>
    </view>
    <view
      v-if="[4,5].includes(detail.status)&&ownered"
      class="other-btn"
      @click="toMessage"
    >联系客服
    </view>
    <view
      v-if="[4,5].includes(detail.status)&&ownered"
      class="other-btn"
      @click="reApply"
    >重新申请
    </view>

    <view style="height: 200rpx;">

    </view>
    <view
      v-if="(detail.status==1||detail.status==0) &&ownered"
      class="bottom-btn"
    >
      <view
        class="btn"
        @click="cancelRefund"
      >
        取消退款
      </view>
    </view>
  </view>
</template>

<script>
import { formatDate } from "../../../utils/common.js";
import { refundDetail, cancelRefund } from "../../../api/order.js";
import { judgeOwner } from "../../../api/decorate.js";
export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      bgImg:
        "https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png",
      currentList: [1],
      detail: {},
      headerTitle: "",
      headerTime: "",
      tips: "",
      id: "",
      stockStatus: "",
      scrollTop: 0,
      ownered: false,
    };
  },
  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
  },
  onLoad(e) {
    if (e && e.id) {
      this.id = e.id;
      this.getDetail(e.id);
    }
    if (e && e.projectId) {
      judgeOwner({
        projectId: e.projectId,
      }).then((e) => {
        this.ownered = e.ownered;
      });
    }

    if (e && e.stockStatus) {
      this.stockStatus = e.stockStatus;
    }
  },
  methods: {
    copy(data) {
      uni.setClipboardData({
        data: data.toString(),
        success: function () {
          console.log("success");
        },
      });
    },
    toMessage() {
      this.$store.dispatch("openCustomerConversation");
    },
    reApply() {
      //TODO 重新申请
      getApp().globalData.naviData = this.detail;
      let type = 0;
      if (this.detail.isReturnInventory) {
        type = 1;
      }
      uni.navigateTo({
        url: `../warehouse-refund/warehouse-refund?refundType=${this.detail.type}&id=${this.detail.requireId}&type=${type}`,
      });
    },
    refuntType(type) {
      let res = "";
      switch (type) {
        case 0:
          res = "仅退款（未发货）";
          break;
        case 1:
          res = "仅退款（退库存）";
          break;
        case 2:
          res = "仅退款（已收货）";
          break;
        case 3:
          res = "服务退款";
          break;
        default:
          break;
      }
      return res;
    },
    cancelRefund() {
      let vm = this;
      console.log("vm.detail.approvalCompleted=", vm.detail.approvalCompleted);
      let content;
      if (vm.detail.approvalCompleted) {
        content = "退款审核已通过，不可取消";
      } else {
        content = "确定要取消本次退款申请？";
      }
      uni.showModal({
        content: content,
        success: function (res) {
          if (res.confirm) {
            if (!vm.detail.approvalCompleted) {
              cancelRefund({
                id: vm.id,
              }).then((e) => {
                uni.navigateBack({});
              });
            } else {
              uni.navigateBack({});
            }
          } else if (res.cancel) {
            console.log("用户点击取消");
          } else {
            console.log("打印数据");
          }
        },
      });
    },
    foramtPrice(item) {
      item = Number(item * 100).toFixed(0);
      let price = String(item || "0");
      return price.slice(0, price.length - 2) || "0";
    },
    formatCent(item) {
      item = item * 100;
      let price = String(item || "0");
      let fixedNum = Number(price / 100).toFixed(2);
      if (String(fixedNum).split(".").length > 1) {
        return String(fixedNum).split(".")[1];
      } else {
        return "";
      }
    },
    getDetail(id) {
      refundDetail({
        id,
      }).then((e) => {
        console.log(e);
        e.stockStatus = this.stockStatus;
        e.detailAppVOS.map((e) => {
          e.discountPriceFormate = e.discountPrice * 100;
          e.number = e.refundNumber;
        });
        this.detail = e;
        console.log(this.detail.refundAmount);
        if ([0, 1].includes(e.status)) {
          //退款中
          this.headerTitle = "退款中";
          this.bgImg =
            "https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_orange.png";
        } else if (e.status == 2) {
          //退款完成
          this.headerTitle = "退款成功";
          this.bgImg =
            "https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png";
        } else if ([3, 4, 5].includes(e.status)) {
          //退款完成
          if (e.status == 3) {
            this.headerTitle = "退款失败";
            this.tips = "商家拒绝了您的申请,如有问题未解决,您可重新申请";
          }
          if (e.status == 4) {
            this.headerTitle = "退款关闭";
            this.tips = "您已取消了本次退款，如有问题未解决，您可以重新申请";
          }
          if (e.status == 5) {
            this.headerTitle = "退款失败";
            this.tips = "您的退款账户存在异常，您可联系客服或重新发起申请";
          }
          this.bgImg =
            "https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png";
        }
      });
    },
    back() {
      uni.navigateBack({});
    },
  },
};
</script>

<style lang="scss" scoped>
  .mt16{
    margin-top: 16rpx;
  }
  .flex-between {
    background-color: #FFF;
    padding: 0 32rpx 32rpx 32rpx;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .title {
        font-weight: 500;
        font-size: 30rpx;
        color: #333333;
      }

      .sub-title {
        font-size: 26rpx;
        font-weight: 400;
        color: #999999;

      }

      .sub-price {
        font-family: PriceFont;
        font-size: 22rpx;
        color: #333333;

      }

      .price {
        font-family: PriceFont;
        font-size: 26rpx;
        color: #ff3347;

      }
    }
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
			overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
		}
	}
	.item:nth-last-child(1){
		margin-bottom: 0;
	}
}
  .success-icon {
    width: 64rpx;
    height: 64rpx;
    object-fit: cover;
    margin-right: 12rpx;
  }

  .tip {
    width: 60rpx;
    height: 30rpx;
    margin-left: 8rpx;
    line-height: 30rpx;
    border-radius: 4rpx;
    color: #111111;
    font-size: 20rpx;
    text-align: center;
    display: inline-block;
    border: 1rpx solid #EAEAEA;
    vertical-align: 13%;
  }

  .other-btn {
    width: 100%;
    height: 112rpx;
    line-height: 112rpx;
    text-align: center;
    color: #333333;
    font-size: 26rpx;
    font-weight: 500;
    margin-top: 16rpx;
    background-color: #FFF;
  }

  .bottom-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 750rpx;
    height: 136rpx;
    opacity: 1;
    background: #fefffe;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      opacity: 1;
      background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
      border-radius: 16rpx;
      text-align: center;
      font-size: 32rpx;
      color: #ffffff;
      font-weight: 500;

    }
  }

  .placehold {
    margin-top: 20rpx;
    height: 32rpx;
    width: 100%;
    background-color: #FFF;
    border-top-right-radius: 32rpx;
    border-top-left-radius: 32rpx;
  }

  .info-content {
    margin-top: 16rpx;
    background-color: #FFF;
    border-radius: 24rpx;
    padding: 32rpx;

    .header {
      color: #333333;
      font-weight: 500;
      font-size: 30rpx;
      margin-bottom: 16rpx;
    }

    .row {
      display: flex;
      flex-direction: row;
      margin-top: 16rpx;
      align-items: flex-start;

      .heaer {
        font-size: 28rpx;
        color: #999999;
      }

      .text {
        flex: 1;
        font-size: 28rpx;
        color: #333333;
      }
    }
  }

  .header-content {
    background: #ffffff;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
    display: flex;
    font-size: 30rpx;
    color: #333333;
    padding: 0 32rpx 12rpx 32rpx;

    .icon {
      margin-top: 6rpx;
      line-height: 32rpx;
      margin-right: 16rpx;
      font-weight: 20rpx;
    }

    .alert {

      line-height: 46rpx;
      font-size: 30rpx;
      font-weight: 400;
      text-align: left;
      color: #333333;
    }
  }

  .back-icon {
    color: white;
    font-size: 40rpx;
    padding: 20rpx;
  }

  .basic-info {
    // height: 296rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: relative;

    .image-ic {
      margin-top: 200rpx;
      width: 184rpx;
      height: 184rpx;
      object-fit: cover;
      margin-bottom: 16rpx;
    }

    .info {
      display: flex;
      justify-content: center;
      align-items: center;

      .header1 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64rpx;
        // line-height: 64rpx;
        font-size: 48rpx;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 12rpx;
      }

    }

    .header2 {
      font-size: 26rpx;
      height: 40rpx;
      line-height: 40rpx;
      color: #ffffff;
      text-align: center;
    }
  }
</style>
