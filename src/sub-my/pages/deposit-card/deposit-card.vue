<template>
  <view class="cardWrap">
    <view class="wrap">
      <view class="header">
        <view class="text">余额 (元)</view>
        <view class="balance price-font">
          <view>¥</view>
          <view class="int">{{(balance/100).toFixed(2).split('.')[0]}}</view>
          <view>.{{(balance/100).toFixed(2).split('.')[1]}}</view>
        </view>
        <view class="bill" @click="toBillingDetails">账单明细</view>
        <!-- <view class="freeze">已被冻结金额：¥10.00</view> -->
      </view>
      <view class="noList" v-if="noList">
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/img_sys_city.png"></image>
        <view class="tit">敬请期待</view>
        <view class="txt">您所在的城市暂无储值卡活动</view>
      </view>
      <view class="activity" v-else v-for="(item,index) in list" :key="item.activityId">
        <view class="top">
          <view class="title">{{item.activityName}}</view>
          <view class="rules" @click="clickRules(index)">
            <view class="text">活动规则</view>
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_more.png" class="icon"></image>
          </view>
        </view>
        <view class="instructions">
          <view class="date">活动时间：{{item.activityStartTime}}-{{item.activityEndTime}}</view>
          <view class="text" v-if="!item.eligibility">已参加过活动</view>
        </view>
        <image class="banner" :src="item.activityImage" v-if="item.activityImage"></image>
        <!-- 				优惠券的需求
				<view class="main">
					<view class="item"
						v-for="(amount,idx) in item.detailDTOList"
						:key="amount.detailId"
					>
						<view class="file"
							:class="{'active': amount.detailId===checkedId,'cannot': !item.eligibility,'margin': idx%2===0}"
							@click="chooseOne(amount.detailId,item.eligibility)"
						>
							<view class="total">
								<view class="content">
									<view class="amount" :class="{'cannot': !item.eligibility}">
										<view class="text">充</view>
										<view>¥</view>
										<view class="number">{{amount.rechargeAmount/100}}</view>
									</view>
									<view class="give">送总价值
										<view class="sum price-font">1000</view>元券
									</view>
								</view>
								<image
									src="http://dbj.dragonn.top/static/mp/dabanjia/images/my/checked.png"
									class="choose" v-if="amount.detailId===checkedId"
								></image>
							</view>
							<scroll-view :scroll-x="true" :enable-flex="true" class="scrolls">
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon">
									<view class="couponName">通用券</view>
									<view class="couponNum">¥2000</view>
								</view>
								<view class="coupon-last"></view>
							</scroll-view>
						</view>
					</view>
				</view> -->

        <!-- 储值卡的需求 -->
        <view class="main">
          <view class="prePay"
            :class="{'active': amount.detailId===checkedId,'cannot': !item.eligibility,'margin': idx%2===0}"
            v-for="(amount,idx) in item.detailDTOList" :key="amount.detailId"
            @click="chooseOne(amount.detailId,item.eligibility, amount.rechargeAmount/100)">
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/choosed.png" class="icon"
              v-if="amount.detailId===checkedId"></image>
            <view class="numWrap" :class="{'active': amount.detailId===checkedId,'cannot': !item.eligibility}">
              <view class="text">充</view>
              <view>¥</view>
              <view class="num price-font">{{amount.rechargeAmount/100}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="cover" v-if="showBuyBtn"></view>
      <view class="buyWrap" v-if="showBuyBtn">
        <view class="pay-way-box" @click="morePayWay">
          <view>请选择支付方式</view>
          <view>{{payWayTag?'公司转账':'在线支付'}}
            <view class="pay-icon"></view>
          </view>
        </view>
        <view class="button" @click="buyNow">立即购买</view>
        <view class="explain" @click="toActivityRules">购买即同意
          <text>《打扮家储值卡使用规则》</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="bottom">
      <view class="popup">
        <view class="top">
          <view class="title">活动规则</view>
          <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/close_rules.png" @click="closeRules">
          </image>
        </view>
        <view class="content">{{ruleText}}</view>
        <!-- <scroll-view scroll-y="true" class="content">{{ruleText}}</scroll-view> -->
      </view>
    </uni-popup>
    <pay-way-toast ref='payWayToast' @payWay="payWay"></pay-way-toast>
  </view>
</template>

<script>
  import {
    getBalance,
    getActivity,
    createCardOrder
  } from "../../../api/user.js"
  export default {
    data() {
      return {
        cityId: 0,
        balance: 0,
        list: [],
        noList: false,
        showBuyBtn: true,
        checkedId: 0,
        ruleText: "",
        totalPrice: 0,
        payWayTag: 0,
        payType: 0
      }
    },
    onShow() {
      this.cityId = getApp().globalData.currentHouse.cityId;
      this.requestBalance()
      this.requestPage()
    },
    onPullDownRefresh() {
      this.requestBalance()
      this.requestPage()
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    methods: {
      morePayWay() {
        console.log(this.$refs.payWayToast, "this.$refs.payWayToast")
        this.$refs.payWayToast.showPupop();
      },
      payWay(payWayTag) {
        this.payWayTag = payWayTag
        if (this.payWayTag) {
          this.payType = 6
        }
      },
      toBillingDetails() {
        uni.navigateTo({
          url: "/sub-my/pages/deposit-card/billing-details"
        })
      },
      toActivityRules() {
        uni.navigateTo({
          url: "/sub-my/pages/deposit-card/activity-rules"
        })
      },
      clickRules(index) {
        this.$refs.popup.open()
        this.ruleText = this.list[index].activityRule
        console.log("this.ruleText", this.ruleText)
      },
      closeRules() {
        this.$refs.popup.close()
      },
      chooseOne(detailId, eligibility, amount) {
        if (!eligibility) return
        this.checkedId = detailId
        this.totalPrice = amount
      },
      buyNow() {
        const openId = getApp().globalData.openId;
        //#ifdef MP-WEIXIN
        let payType = 1
        let deviceType = 0
        //#endif
        //#ifdef H5
        let payType = 3
        let deviceType = 2
        //#endif
        createCardOrder({
          activityDetailId: this.checkedId,
          payType: this.payType ? this.payType : payType, //"int //支付方式  1微信支付",
          deviceType: deviceType,
          openid: openId,
          sourceId: 100, //订单来源渠道 100小程序
        }).then(e => {
          if (this.payWayTag) {
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${e.companyTransferPayVO.remittanceCode}&amount=${e.companyTransferPayVO.amount}`
            })
            return;
          }
          const payInfo = e.wechatPayJsapi;
          const id = e.id
          //#ifdef MP-WEIXIN
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
                url: `/sub-classify/pages/pay-order/pay-success?orderId=${id}&from=valueCard`,
              });
            },
            fail(e) {
              uni.showToast({
                title: "支付失败",
                icon: "none",
                duration: 2000,
              });
              uni.redirectTo({
                url: `/sub-my/pages/my-order/my-order?index=1&firstEntry=true`,
              });
            },
          });
          //#endif
          //#ifdef H5
          uni.navigateTo({
            url: `/sub-classify/pages/pay-order/pay-h5?payTal=${e.gomePayH5.payModeList[0].payTal}&totalPrice=${this.totalPrice}&payRecordId=${e.payRecordId}`,
          });
          //#endif
        });
      },
      requestBalance() {
        getBalance().then(data => {
          if (data == null) {
            data = 0
          }
          this.balance = data
          console.log(data)
        })
      },
      requestPage() {
        let params = {
          cityId: this.cityId
        }
        getActivity(params).then(data => {
          console.log(data)
          data = data || [];
          if (!data.length) {
            this.noList = true
            this.showBuyBtn = false
          }
          if (data.every(i => !i.eligibility)) {
            this.showBuyBtn = false
          }
          this.list = data
          for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.eligibility && (item.detailDTOList || []).length) {
              this.checkedId = item.detailDTOList[0].detailId;
              break;
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .cardWrap {
    width: 750rpx;
    background-image: url('https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  .popup {
    height: 652rpx;
    background-color: #FFFFFF;
    border-radius: 32rpx 32rpx 0 0;
    background: #ffffff;
  }

  .popup .top {
    position: relative;
    padding-top: 48rpx;
  }

  .popup .top .title {
    /* margin-left: 256rpx; */
    text-align: center;
    font-weight: 500;
    font-size: 32rpx;
    color: #333333;
  }

  .popup .top image {
    width: 64rpx;
    height: 64rpx;
    display: block;
    position: absolute;
    top: 12rpx;
    right: 12rpx;
  }

  .popup .content {
    /* width: 544rpx; */
    height: 504rpx;
    overflow: auto;
    margin: 48rpx;
    margin-top: 8rpx;
    color: #999999;
  }

  .wrap {
    width: 750rpx;
  }

  .header {
    width: 702rpx;
    height: 266rpx;
    margin: 0 24rpx;
    border-radius: 16rpx;
    box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
    background-image: url('http://dbj.dragonn.top/static/mp/dabanjia/images/my/balance_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .header .text {
    width: 120rpx;
    height: 34rpx;
    margin-left: 48rpx;
    padding-top: 48rpx;
    font-size: 24rpx;
    color: #AC6F28;
  }

  .header .balance {
    width: 196rpx;
    height: 48rpx;
    margin-left: 48rpx;
    margin-top: 22rpx;
    display: flex;
    color: #AC6F28;
  }

  .header .balance view:first-child {
    margin-right: 8rpx;
    font-weight: 600;
    font-size: 40rpx;
  }

  .header .balance view:last-child {
    font-size: 40rpx;
  }

  .header .balance .int {
    margin-top: -10rpx;
    font-size: 56rpx;
  }

  .header .bill {
    width: 128rpx;
    height: 50rpx;
    margin-left: 48rpx;
    margin-top: 14rpx;
    background: #FFF8D6;
    border-radius: 8px;
    font-weight: 500;
    font-size: 24rpx;
    text-align: center;
    line-height: 50rpx;
    color: #BC722D;
  }

  .header .freeze {
    float: right;
    height: 34rpx;
    margin-bottom: 24rpx;
    margin-right: 32rpx;
    font-size: 24rpx;
    color: #AC6F28;
  }

  .noList {
    height: 750rpx;
    margin: 24rpx 24rpx 408rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
  }

  .noList image {
    width: 400rpx;
    height: 400rpx;
    margin: 0 150rpx;
    padding-top: 146rpx;
    display: block;
  }

  .noList .tit {
    margin-left: 286rpx;
    font-size: 32rpx;
    color: #333333;
  }

  .noList .txt {
    margin-left: 196rpx;
    font-size: 24rpx;
    color: #999999;
  }

  .activity {
    width: 702rpx;
    margin: 24rpx 24rpx 0;
    background: #FFFFFF;
    border-radius: 16rpx;
  }

  .activity .top {
    width: 654rpx;
    height: 50rpx;
    padding: 24rpx 24rpx 4rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .activity .top .title {
    max-width: 65%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 50rpx;
    font-weight: 500;
    font-size: 36rpx;
    color: #2B2F33;
  }

  .top .rules {
    display: flex;
  }

  .top .rules .icon {
    width: 16rpx;
    height: 16rpx;
    margin-left: 4rpx;
    margin-top: 8rpx;
    display: block;
  }

  .top .rules .text {
    width: 96rpx;
    height: 28rpx;
    font-size: 22rpx;
    color: #2B2F33;
  }

  .instructions {
    display: flex;
    justify-content: space-between;
  }

  .instructions .text {
    font-size: 21rpx;
    color: #83959E;
    width: 126rpx;
    height: 30rpx;
    margin-right: 24rpx;
  }

  .date {
    /* width: 412rpx; */
    height: 30rpx;
    margin-left: 24rpx;
    font-size: 21rpx;
    color: #83959E;
  }

  .banner {
    display: block;
    width: 654rpx;
    height: 240rpx;
    margin: 24rpx;
    margin-bottom: 0;
    border-radius: 16rpx;
    box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
  }

  /* 充值 */
  .main {
    margin: 24rpx;
    padding-bottom: 8rpx;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .main .file {
    width: 654rpx;
    height: 180rpx;
    margin-bottom: 24rpx;
    padding-bottom: 24rpx;
    background: #FFFDF8;
    border: 2rpx solid #FFE1CD;
    border-radius: 16rpx;
    overflow: hidden;
  }

  .main .file.active {
    background: #FFF8D6;
    border: 3rpx solid #FF6600;
  }

  .main .file.cannot {
    border: none;
    background: #F7F7F7;
  }

  .main .file .scrolls {
    /* max-width: 654rpx; */
    height: 70rpx;
    display: flex;
    white-space: nowrap;
  }

  .scrolls .coupon {
    flex-shrink: 0;
    width: 120rpx;
    height: 70rpx;
    margin-left: 24rpx;
    font-size: 24rpx;
    font-weight: 600;
    color: #FF9900;
    background-image: url('http://dbj.dragonn.top/static/mp/dabanjia/images/my/subtract_active.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .scrolls .coupon:last-child {
    width: 24rpx;
    height: 70rpx;
  }

  .coupon .couponName {
    max-width: 72rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18rpx;
  }

  .main .file .total {
    display: flex;
    justify-content: space-between;
  }

  .file .total .content {
    display: flex;
  }

  .file .give {
    display: flex;
    align-items: center;
    margin: 24rpx 0;
    font-size: 26rpx;
    color: #BC722D;
  }

  .file .give .sum {
    margin: 0 12rpx;
    font-size: 44rpx;
    color: #FF6600;
  }

  .file .choose {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    margin: 24rpx;
  }

  .file .amount {
    max-width: 200rpx;
    overflow: hidden;
    height: 50rpx;
    margin: 24rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #CB985B;
  }

  .file .amount.cannot {
    color: #D1D1D1;
  }

  .amount view:nth-child(2) {
    font-weight: 500;
    font-size: 11px;
    margin-left: 8rpx;
    margin-right: 4rpx;
  }

  .amount .number {
    font-weight: 500;
  }

  /* 只有储值卡的样式 */
  .main .prePay {
    width: 312rpx;
    height: 120rpx;
    margin-bottom: 16rpx;
    display: flex;
    align-items: center;
    background: #FFFDF8;
    border: 1rpx solid #FFE1CD;
    border-radius: 16rpx;
    overflow: hidden;
  }

  .main .prePay.active {
    width: 314rpx;
    border: none;
    background: linear-gradient(277.39deg, #FFA14A 0%, #FFC700 100%);
  }

  .main .prePay.cannot {
    width: 314rpx;
    border: none;
    background: #F7F7F7;
  }

  .main .prePay.margin {
    margin-right: 16rpx;
  }

  .prePay .icon {
    width: 32rpx;
    height: 32rpx;
    background: #fff;
    border-radius: 50%;
    margin-left: 24rpx;
    margin-right: 16rpx;
  }

  .prePay .numWrap {
    width: 158rpx;
    height: 50rpx;
    margin-left: 72rpx;
    display: flex;
    align-items: center;
    color: #CB985B;
  }

  .prePay .numWrap.active {
    margin-left: 0;
    color: #fff;
  }

  .prePay .numWrap.cannot {
    color: #D1D1D1;
  }

  .numWrap .text {
    font-size: 28rpx;
  }

  .numWrap view:nth-child(2) {
    font-weight: 500;
    font-size: 11px;
    margin: 0 4rpx;
  }

  .numWrap .num {
    font-size: 44rpx;
  }



  .cover {
    width: 750rpx;
    height: 350rpx;
    margin-top: 24rpx;
  }

  .buyWrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    background: #fff;
    box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
  }

  .buyWrap .pay-way-box {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 32rpx 0 32rpx;
    font-size: 28rpx;
  }

  .pay-way-box .pay-icon {
    vertical-align: middle;
    display: inline-block;
    width: 48rpx;
    height: 52rpx;
    background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/more_pay_icon.png");
    background-size: contain;
  }

  .button {
    width: 686rpx;
    height: 88rpx;
    margin: 24rpx 32rpx;
    border-radius: 16rpx;
    font-weight: 500;
    font-size: 32rpx;
    text-align: center;
    line-height: 88rpx;
    color: #FFFFFF;
    background: linear-gradient(263.5deg, #FF7051 0.55%, #FFC700 100%);
  }

  .explain {
    width: 412rpx;
    height: 28rpx;
    margin-left: 188rpx;
    margin-bottom: 92rpx;
    font-size: 22rpx;
    color: #999999;
  }

  .explain text {
    color: #FF873D;
  }
</style>
