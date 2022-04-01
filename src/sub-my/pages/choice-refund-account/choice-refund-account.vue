<template>
  <view class="container">
    <text class="refund-title">
      请选择退款收款账户
    </text>
    <view class="refund-tips">
      因您在付款时通过不同银行账号进行汇款，故需要您选择汇款信息，我们将根据您所选的汇款信息进行线下公司银行转账。
    </view>
    <view class="account-list">
      <view
        v-for="item in accountList"
        :key="item.accountNo"
        class="account-item"
      >
        <view class="card-left">
          <img
            v-if="item.accountNo === checkedAccount.accountNo"
            src="https://ali-image.dabanjia.com/image/20220328/16/164845631915103.png"
            alt=""
          >
        </view>
        <view
          @click="choiceAccount(item)"
          class="card-right"
        >
          <view class="card-row">
            <text class="label">户名：</text>
            <text>{{item.accountName}}</text>
          </view>
          <view class="card-row">
            <text class="label">银行账号：</text>
            <text>{{item.accountNo}}</text>
          </view>
          <view class="card-row">
            <text class="label">开户行：</text>
            <text>{{item.accountBank}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="footer-btn">
      <button @click="submitApply">确认并提交申请</button>
    </view>
  </view>
</template>
<script>
import {
  getCompanyTransfes,
  particalOrderApplyForRefund,
  wholeOrderApplyForRefund,
} from "@/api/order.js";
import { goodsBack, goodsRefund } from "@/api/decorate.js";
import { createChangeOrderApi } from "@/api/changeOrder.js";
export default {
  data() {
    return {
      accountList: [],
      checkedAccount: null,
      query: null,
    };
  },
  onLoad(e) {
    console.log("url传参", JSON.parse(decodeURIComponent(e.query)));
    this.query = JSON.parse(decodeURIComponent(e.query));
  },
  mounted() {
    if (this.query.type !== "changeApplication") {
      this.getCompanyTransfes();
    } else if (this.query.type === "changeApplication") {
      this.getCompanyAccounts();
    }
  },
  methods: {
    getCompanyTransfes() {
      getCompanyTransfes({ orderId: this.query.orderId }).then((res) => {
        this.accountList = res;
        this.checkedAccount = { ...this.accountList[0] };
      });
    },
    getCompanyAccounts() {
      createChangeOrderApi(this.query.params).then((data) => {
        this.accountList = data.accounts;
        this.checkedAccount = { ...this.accountList[0] };
      });
    },
    choiceAccount(item) {
      this.checkedAccount = { ...item };
    },
    submitApply() {
      if (!this.checkedAccount.accountNo) {
        uni.showToast({
          title: "请选择退款收款账户",
          icon: "none",
        });
        return;
      }
      let { type, params } = this.query;
      params.accountNo = this.checkedAccount.accountNo;
      switch (type) {
        case "whole":
          wholeOrderApplyForRefund(params).then((res) => {
            if (res.isRefundSuccess) {
              uni.redirectTo({
                url: `../refund-list/refunding-detail/refunding-detail?id=${res.id}&from=refund`,
              });
            } else {
              uni.showToast({
                title: "提交失败，请稍后重试",
                icon: "none",
              });
            }
          });
          break;
        case "partical":
          particalOrderApplyForRefund(params).then((res) => {
            if (res.isRefundSuccess) {
              uni.redirectTo({
                url: `../refund-list/refunding-detail/refunding-detail?id=${res.id}&from=refund`,
              });
            } else {
              uni.showToast({
                title: "提交失败，请稍后重试",
                icon: "none",
              });
            }
          });
          break;
        case "changeApplication":
          createChangeOrderApi(params).then((data) => {
            uni.switchTab({
              url: "/pages/decorate/index/index",
            });
          });
        case 1:
          goodsBack(params).then((data) => {
            if (data.isRefundSuccess) {
              this.toastHandler();
            } else {
              uni.showToast({
                title: "提交失败，请稍后重试",
                icon: "none",
              });
            }
          });
          break;
        default:
          goodsRefund(params).then((data) => {
            if (data.isRefundSuccess) {
              this.toastHandler();
            } else {
              uni.showToast({
                title: "提交失败，请稍后重试",
                icon: "none",
              });
            }
          });
          break;
      }
    },
    toastHandler() {
      uni.showToast({
        title: "提交成功",
        icon: "none",
      });
      setTimeout(() => {
        uni.navigateBack({
          delta: 3,
        });
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: #fff;
  padding: 0 28rpx 136rpx 36rpx;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
}
.refund-title {
  font-size: 36rpx;
  line-height: 56rpx;
  color: #222;
}
.refund-tips {
  margin: 24rpx 0 40rpx;
  padding: 16rpx 24rpx;
  background: #fcfcfc;
  color: #999;
  font-size: 22rpx;
  line-height: 38rpx;
}
.account-item {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 32rpx;
  font-size: 28rpx;
  .card-left {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: 1rpx solid #999;
    margin: 0 24rpx 0 8rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .card-right {
    flex: 1;
    padding: 32rpx 32rpx 16rpx;
    line-height: 40rpx;
    background: #fafafa;
    border: 2rpx solid transparent;
    border-radius: 16rpx;
  }
  .card-row {
    display: flex;
    margin-bottom: 16rpx;
    .label {
      width: 148rpx;
      color: #999;
      text-align: left;
    }
    text {
      &:last-child {
        flex: 1;
        color: #333;
      }
    }
  }
}
.footer-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 16rpx;
  padding: 24rpx 0;
  font-size: 32rpx;
  background: #fff;
  line-height: 88rpx;
  text-align: center;
  button {
    color: #fff;
    width: calc(100% - 64rpx);
    height: 88rpx;
    background: linear-gradient(117.02deg, #fa3b34 24.56%, #ff6a33 92.21%);
  }
}
</style>