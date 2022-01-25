<template>
  <view class="refund">
    <warehouse-item minInput="0.01" :showSubtitle="false" :showBtns="false" :item="data" :isEdit="type!=0"
      @numChange="onNumChange"></warehouse-item>
    <view class="back">
      <view class="back-res">
        <view class="back-res-row">
          <view class="res-pre">
            <text class="color-red">*</text>退款原因
          </view>
          <view style="flex:1">
          </view>
          <view :class="{'have-reason':reasonName!='','no-reason':reasonName==''}" @click="selectRes">
            {{reasonName!=''?reasonName:'请选择'}}
          </view>
          <view class="">
            <i class="icon-size icon-dianpu_ic_fenleishouqijiantou "></i>
          </view>
        </view>
      </view>

      <view class="back-res">
        <view class="back-res-row">
          <view class="res-pre">
            <text class="color-red">*</text>退款金额
          </view>
          <view style="flex:1">
          </view>
          <view class="flex-row">
            <input style="color: #FF3347;max-width: 200rpx;text-align: right;" dir="rtl" type="number"
              placeholder="请输入金额" :disabled="true" v-model="num" />
            <!-- <i class="icon-xiaochengxu_fangwuguanli_bianji icon-size"></i> -->
          </view>
        </view>
      </view>
    </view>

    <view class="textarea">
      <view class="flex-row-between">
        <view class="text-area-title">
          备注说明

        </view>
        <view class="text-area-count">
          {{remark.length}}/200
        </view>
      </view>

      <textarea v-model="remark" maxlength="200" style="font-size: 28rpx" placeholder="可以填写一些与客服沟通过的备注信息" />
    </view>
    <view class="remark-tip">
      建议与商家沟通后再发起退款
    </view>
    <view style="height: 300rpx;">

    </view>
    <view class="bottom-holder">

    </view>
    <bottom-btn btnContent="提交申请" :disable="!canSubmit" @submit="submitRefund">
    </bottom-btn>
  </view>
</template>

<script>
  import {
    goodsBack,
    goodsRefund
  } from "../../../api/decorate.js";
  import {
    refundReason
  } from "../../../api/order.js";
  export default {
    data() {
      return {
        reason: "",
        num: "",
        remark: "",
        type: 0,
        projectId: "",
        data: {},
        refundReasonList: [], //退款原因
        reasonList: [],
        reasonValue: "",
        reasonName: "",
        refundList: [],
        refundType: 0,
        id: "",
      };
    },
    computed: {
      canSubmit() {
        if (this.reasonName && this.num > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    onShow() {},
    onLoad(e) {
      this.data = getApp().globalData.naviData;
      if (
        this.data.detailAppVOS &&
        this.data.detailAppVOS.length &&
        !this.data.stockAppVOS
      ) {
        this.data.stockAppVOS = this.data.detailAppVOS;
      }

      this.reasonName = this.data.reason || "";
      this.remark = this.data.remark || "";
      this.reasonValue = this.data.reasonId || "";
      this.num = this.data.refundAmount || 0;
      let title;
      this.type = e.type;
      if (e.type == 0) {
        this.refundType = e.refundType;
        console.log(this.refundType);
        title = "仅退款(已收货)";
      } else {
        title = "仅退款(退库存)";
      }
      this.projectId = e.projectId;
      this.getRefundReasonList();
      uni.setNavigationBarTitle({
        title: title,
      });
      this.id = e.id;
      let list = [];
      this.data.stockAppVOS.forEach((e) => {
        list.push({
          returnNumber: e.refundNumber ?
            e.refundNumber : e.requireNumber ?
            e.requireNumber : e.stockNumber ?
            e.stockNumber : e.requireNumber,
          amountNumber: e.refundNumber ?
            e.refundNumber : e.requireNumber ?
            e.requireNumber : e.stockNumber ?
            e.stockNumber : e.requireNumber,
          stockId: e.id,
          goodsId: e.relationId,
          price: e.discountPrice,
          alreadyReturnNumber: e.returnNumber || 0,
          number: e.number || e.totoalNum,
          actualIncomeAmount: e.actualIncomeAmount,
          discountSubtotal: e.discountSubtotal
        });
      });
      console.log('?????', this.data.stockAppVOS)
      console.log(list)
      this.refundList = list;
      this.uploadNum();
    },

    methods: {
      uploadNum() {
        let totalBack = 0;
        this.refundList.forEach((e) => {
          if (e.returnNumber == e.amountNumber && e.alreadyReturnNumber == 0 && e.discountSubtotal > 0) {
            totalBack += e.discountSubtotal* 100
          } else {


            console.log(e)
            console.log('~~~~~~')
            console.log(e.returnNumber)
            console.log(e.alreadyReturnNumber)
            console.log(e.number)
            if (e.returnNumber + e.alreadyReturnNumber <= e.number) {

              totalBack += e.price * e.returnNumber * 100;
              console.log('~~~~~~totalBack11111111', totalBack)
            } else {

              let count = e.discountSubtotal * 100 - e.price * 100 * e.alreadyReturnNumber
              totalBack += count
              console.log('~~~~~~totalBack12222', totalBack)
            }
          }

        });
        totalBack = totalBack / 100
        console.log('~~~~', totalBack);

        if (totalBack > 0) {
          this.num = totalBack.toFixed(2);
        } else {
          this.num = 0;
        }
      },
      onNumChange(e) {
        this.refundList.forEach((item) => {
          if (item.stockId == e.item.id) {
            item.returnNumber = e.num;
          }
        });

        this.uploadNum();
      },
      getRefundReasonList() {
        refundReason({
          codeKey: "refund_reason",
        }).then((list) => {
          this.refundReasonList = list;
          this.reasonList = list.map((item) => {
            return item.itermName;
          });
        });
      },
      submitRefund() {
        if (!this.reasonName) {
          uni.showToast({
            title: "请选择退款原因",
            icon: "none",
          });
          return;
        }
        if (!this.num || this.num <= 0) {
          uni.showToast({
            title: "请输入退款金额",
            icon: "none",
          });
          return;
        }
        let params = {};
        params.id = this.id;
        params.returnMoney = this.num * 100;
        params.refundAmount = this.num * 100;
        params.remark = this.remark;
        params.reasonId = this.reasonValue;
        params.reason = this.reasonName;
        if (this.type == 1) {
          params.details = this.refundList;
          goodsBack(params).then((e) => {
            uni.showToast({
              title: "提交成功",
              icon: "none",
            });
            uni.navigateBack({
              delta: 2,
            });
          });
        } else {
          params.type = this.refundType;
          if (params.type == 2) {
            params.goodsId = this.data.stockAppVOS[0].relationId;
          }
          goodsRefund(params).then((e) => {
            uni.showToast({
              title: "提交成功",
              icon: "none",
            });
            uni.navigateBack({
              delta: 2,
            });
          });
        }
      },
      selectRes() {
        uni.showActionSheet({
          itemList: this.reasonList,
          success: (res) => {
            this.reasonName = this.reasonList[res.tapIndex];
            this.reasonValue = this.refundReasonList.filter((item) => {
              return item.itermName == this.reasonList[res.tapIndex];
            })[0].itermValue;
          },
          fail: (res) => {
            console.log(res.errMsg);
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .bottom-holder {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 136rpx;
    background-color: #FFF;
    opacity: 1;
  }

  .opacity-5 {
    opacity: 0.5;
  }

  .opacity-1 {
    opacity: 1;
  }

  .icon-size {
    font-size: 32rpx;
    color: #c7c7c7;
    margin-left: 16rpx;
  }

  .have-reason {
    color: black;
    font-size: 28rpx;
  }

  .no-reason {
    color: #c7c7c7;
    font-size: 28rpx;
  }

  .color-red {
    color: #ff3b30;
    margin-right: 12rpx;
  }

  .textarea {
    background-color: #fff;
    padding: 32rpx;
    margin-top: 16rpx;

    .flex-row-between {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 36rpx;
      margin-bottom: 13rpx;

      .text-area-title {
        color: #666666;
        font-size: 28rpx;
      }

      .text-area-count {
        color: #666666;
        font-size: 26rpx;
      }
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .remark-tip {
    color: #808080;
    font-size: 24rpx;
    margin: 16rpx 32rpx;
  }

  .back {
    background-color: #fff;
    padding: 0 32rpx;
  }

  .back-res {
    padding: 32rpx 0;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f4f4f4;

    &-row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .res-pre {
    color: #666666;
  }
</style>
