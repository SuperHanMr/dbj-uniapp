<template>
  <view class="order-container">
    <view v-if="!isShow && !isFromPackage">
      <uni-popup
        ref="houseDialog"
        :mask-click="false"
      >
        <view class="popup-item">
          <view class="popup-title">请选择房产</view>
          <view class="popup-button">
            <view
              class="popup-ok"
              @click='backFrom'
            >取消</view>
            <view
              class="popup-cancel"
              @click='chooseHouse'
            >去选择</view>
          </view>
        </view>
      </uni-popup>
    </view>
    <view v-else>
      <address-picker
        :houseId="houseId"
        :productType="productType"
        @emitInfo="emitInfo"
        @typeServe2="typeServe2"
        :originFrom="originFrom"
        :addUser="addUser"
        v-if="isShow && !isFromPackage"
      >
      </address-picker>
      <view class="content">
        <view
          class="shop-item"
          v-for="(shopItem, shopIndex) in orderInfo.storeInfos"
          :key="shopIndex"
        >
          <view
            class="shop-name"
            v-if="shopItem.skuInfos.length"
          >{{shopItem.storeName}}</view>
          <view
            class="goods-item item-box"
            v-for="(goodsItem, goodIndex) in shopItem.skuInfos"
            :key="goodIndex"
          >
            <view class="goods-item">
              <image
                :src="goodsItem.imageUrl"
                class="goodsItemImg"
              ></image>
              <!-- <image src="https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png" class="goodsItemImg"></image> -->
              <view class="goods-info">
                <view class="goods-desc">
                  <text class="goods-type">{{goodsItem.productType === 1?"物品":"服务商品"}}</text>
                  {{goodsItem.spuName}}
                </view>
                <view class="spu-class">
                  <view class='tag'>{{goodsItem.levelName?goodsItem.levelName + '|': ''}}{{goodsItem.skuName}}</view>
                </view>
                <view
                  class="safeguard"
                  @click="readSafeguard(goodsItem.refundable)"
                  v-if="goodsItem.productType === 1"
                >
                  {{goodsItem.refundable?'七天无理由退换': '无质量问题不退换'}}
                  <text class="question-icon safe-icon"></text>
                </view>
                <view class="goods-spec">
                  <view class="goods-money price-font">
                    ￥
                    <text class="integer-price">{{String(goodsItem.price).split(".")[0]?String(goodsItem.price).split(".")[0]:0}}</text>
                    <text>.{{String(goodsItem.price).split(".")[1]?String(goodsItem.price).split(".")[1]:0}}</text>
                    <text>/{{goodsItem.unit?goodsItem.unit:""}}</text>
                  </view>
                  <view>
                    <view
                      class="sku-deposit price-font"
                      v-if="goodsItem.deposit && goodsItem.productType === 2"
                    >押金
                      ¥{{goodsItem.deposit}}</view>
                  </view>
                  <view class="total-num">共{{goodsItem.buyCount}}{{goodsItem.unit?goodsItem.unit:""}}
                  </view>
                </view>
              </view>
            </view>
            <view
              class="shop-reduce no-send-tip good-tip"
              v-if="goodsItem.errorType"
            >
              <view
                class="item-reduce-box"
                v-if="goodsItem.errorType"
              >
                <text v-if="goodsItem.errorType === 1">当前地址不在商品服务范围内，请更换地址</text>
                <text v-if="goodsItem.errorType === 2">当前地址无法配送该商品，请更换地址</text>
                <text v-if="goodsItem.errorType === 3">该房屋下已购买该服务，不可重复购买</text>
                <text v-if="goodsItem.errorType === 4 && cancelDialog">该服务需精算师指导下完成</text>
                <text v-if="goodsItem.errorType === 5 && cancelDialog">请从精算单购买管家服务</text>
                <text v-if="goodsItem.errorType === 6">您已跳过该工序，不可购买</text>
                <text v-if="goodsItem.errorType === 7">暂不可购买，请在精算服务结束后于精算单中购买</text>
                <text v-if="goodsItem.errorType === 8 && cancelDialog">请从装修页面查询购买</text>
                <text v-if="goodsItem.errorType === 9">暂不可购买，请确认管家抢单后，在精算单中购买</text>
              </view>
            </view>
            <view
              class="choose-time"
              v-if="productType === 2 && goodsItem.appointmentRequired"
            >
              <view
                class="time-bar"
                @click='chooseTime(shopIndex, goodIndex)'
              >
                <view v-if="!time"><text style="color: #FF3347">* </text> 请选择上门时间</view>
                <text v-else>{{time}}</text>
                <image
                  class="choose-icon"
                  src="../../../static/images/ic_back.png"
                ></image>
              </view>
            </view>
          </view>
<!--          <view
            class="cost-detail"
            v-if="(shopItem.deliveryFee || shopItem.totalHandlingFee) && productType === 1"
          >
            <view
              v-if="shopItem.deliveryFee !== undefined"
              class="price-font"
            >
              <text>运费</text>
              <text>¥{{shopItem.deliveryFee}}</text>
            </view>
            <view
              v-if="shopItem.totalHandlingFee !== undefined"
              class="price-font"
            >
              <text>搬运费</text>
              <text>¥{{shopItem.totalHandlingFee}}</text>
            </view>
          </view> -->
<!--          <view
            class="shop-reduce"
            v-if="shopItem.freeDeliveryCount && productType === 1"
          >
            <view class="item-reduce-box">
              <view class="question-box">本订单已获得了该店铺{{shopItem.freeDeliveryCount}}次免运费权益
                <text
                  class="question-icon free-icon"
                  @click="readExpenses(0)"
                ></text>
              </view>
            </view>
          </view> -->
        </view>
      </view>
      <view
        class="good-store-account"
        v-if="productType === 1"
      >
        <view v-if="orderInfo.totalDeliveryFee !== undefined" class="price-font mt26">
          <view class="question-box">
            运费
            <text
              class="question-icon"
              @click="readExpenses(1)"
            ></text>
          </view>
          <text>¥<text class="fee">{{orderInfo.totalDeliveryFee}}</text></text>
        </view>
        <view
          v-if="orderInfo.totalHandlingFee !== undefined"
          class="price-font mt26"
        >
          <view class="question-box">
            搬运费
            <text
              class="question-icon"
              @click="readExpenses(2)"
            ></text>
          </view>
          <text>¥<text class="fee">{{orderInfo.totalHandlingFee}}</text></text>
        </view>
        <view class="price-font mt26">
          <text>商品总价</text>
          <text v-if="Number(orderInfo.totalPrice)">¥<text class="total-fee">{{orderInfo.totalPrice}}</text></text>
          <text v-else>¥- -</text>
        </view>
        <view
          class="store-read"
          v-if="orderInfo.hasStock"
        >
          <text>
            辅材商品下单时不收取运费搬运费，具体费用将在仓库要货时产生并另行结算
          </text>
        </view>
      </view>
      <view
        class="good-store-account is-store"
        v-else
      >
        <view class="price-font">
          <text>商品总价</text>
          <text>¥{{orderInfo.totalPrice}}</text>
        </view>
        <view
          class="pledge price-font total-deposit"
          v-if="orderInfo.totalDeposit"
        >
          <text>押金</text>
          <text>¥{{orderInfo.totalDeposit}}</text>
        </view>
      </view>
      <view
        v-if="haveCard"
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
          <text style="margin-right:4rpx ;">-</text> <text style="margin-right:2rpx ;">¥</text>
          {{(this.cardPrice/100).toFixed(2)}}
        </view>
        <image
          v-if="cardClick"
          class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_selected.png"
          mode=""
        >
        </image>
        <image
          v-if="!cardClick&&cardBalance"
          class="selected-img"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_unselected.png"
          mode=""
        >
        </image>
        <view
          v-if="!cardClick&&!cardBalance"
          class="select-disable"
        >
        </view>
      </view>
      <view class="pay-way">
        <text>支付方式</text>

        <view
          v-if="payChannel"
          class="flex-center"
        >
          <!-- <image
            class="card-img"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
            mode=""
          >
          </image> -->
          <text>储值卡支付</text>

        </view>
        <view v-else>
          <view class="wechat_icon"></view><text>在线支付</text>
        </view>
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
            style="width:100%;line-height: 46rpx;min-height: 90rpx;height: 85%;overflow: scroll;padding-top: 36rpx;"
            placeholder="选填,说点什么～"
          />
        </view>
      </view>
      <view class="bottom">
        <view class="agree-box">
          购买即代表您已阅读并同意
          <text
            class="agreement"
            @click="goAgreement"
          >《打扮家平台服务协议》</text>
        </view>
        <view class="second-part">
          <view class="total-price-info">
            <text class="info-text1">共{{totalClassNum}}类</text>
            <view class="info-text2">总计：</view>
            <view
              class="total-money price-font"
              v-if="Number(totalPrice)"
            >
              ￥
              <text class="mony-text">{{payPrice?String.prototype.split.call(payPrice, ".")[0]: "-"}}</text>
              <text>.{{payPrice?String.prototype.split.call(payPrice, ".")[1]?String.prototype.split.call(payPrice, ".")[1]:"-":"-"}}</text>
            </view>

          </view>
          <button
            class="pay-button"
            :class="{'no-pay': !hasCanBuy || hasNoBuyItem}"
            @click="pay"
            ref="test"
          >立即支付</button>
        </view>
      </view>
      <expenses-toast
        ref='expensesToast'
        :expensesType="expensesType"
      ></expenses-toast>
      <safeguard-toast
        ref='safeguardToast'
        :refundable="refundable"
      ></safeguard-toast>
      <date-picker
        ref='datePicker'
        @getTime="getTime"
      ></date-picker>
      <order-toast
        ref='orderToast'
        :houseId="houseId"
        :hasCanBuy="hasCanBuy"
        :noStoreInfos="noStoreInfos"
        @toastConfirm="toastConfirm"
        @backCart="backCart"
      ></order-toast>
      <uni-popup
        ref="cancelDialog"
        :mask-click="false"
      >
        <view class="popup-item">
          <view class="popup-title">{{toastText}}</view>
          <view class="popup-button">
            <view
              class="popup-ok"
              @click='cancelGoodPop'
            >取消</view>
            <view
              class="popup-cancel"
              @click='confirmGoodPop'
            >去购买</view>
          </view>
        </view>
      </uni-popup>
      <uni-popup
        ref="houseDialog"
        :mask-click="false"
      >
        <view class="popup-item house-item">
          <view class="popup-title house-popup">由于服务类商品的特殊属性，请前往首页切换地址后重新购买</view>
          <view class="popup-button house-button">
            <view
              class="popup-ok"
              @click='cancelHousePop'
            >取消</view>
            <view
              class="popup-cancel"
              @click='confirmHousePop'
            >前往</view>
          </view>
        </view>
      </uni-popup>
      <uni-popup
        ref="timeDialog"
        :mask-click="false"
      >
        <view class="popup-item">
          <view class="popup-title">请选择期望上门时间</view>
          <view class="popup-button">
            <view
              class="popup-cancel"
              @click='confirmTimePop'
            >确定</view>
          </view>
        </view>
      </uni-popup>

      <uni-popup
        ref="payDialog"
        type="bottom"
      >
        <pay-dialog
          :payChannel="payChannel"
          :payChannelPrice="payChannelPrice"
          @payOrder="payOrder"
          @closePayDialog="closePayDialog"
        ></pay-dialog>
      </uni-popup>
    </view>

  </view>
</template>
<script>
import {
  getAddWorker,
  getDetailInfo,
  payOrder,
  getBundleDetail,
  payBundleOrder,
} from "../../../api/classify.js";
import { getBalance } from "../../../api/user.js";
import orderToast from "./order-toast.vue";
import datePicker from "./date-picker.vue";
// import expensesToast from "./expenses-toast.vue"
import safeguardToast from "./safeguard-toast.vue";
import { log } from "../../../utils/log.js";

export default {
  components: {
    orderToast,
    datePicker,
    safeguardToast,
  },
  data() {
    return {
      isFromPackage: false, // 来源于套包下单
      packageId: 0, // 促销套包id
      isShow: true,
      hasTime: false,
      time: "",
      shopIndex: 0,
      goodIndex: 0,
      originFrom: "",
      orderCartParams: {},
      addressInfo: {},
      orderInfo: {},
      canStoreInfos: {},
      noStoreInfos: {},
      hasNoBuyItem: false,
      houseId: 0,
      addUser: [],
      goodDetailId: 0,
      buyCount: 0,
      skuId: 0,
      storeId: 0,
      unit: "",
      estateId: 0,
      expensesType: 0,
      productType: 1,
      frontendServe: "",
      toastType: 0,
      toastText: "",
      tipTest: "",
      remarks: "",
      orderName: "",
      orderDetails: [],
      totalClassNum: 0,
      totalPrice: "0.00",
      hasCanBuy: false,
      projectId: 0,
      level: 0,
      cancelDialog: false,
      refundable: false,
      cardClick: false,
      haveCard: false, //是否有会员卡
      cardBalance: 1111, //会员卡余额
      shareOriginType: "",
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
        return (this.cardPrice / 100).toFixed(2);
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
        console.log(this.totalPrice);
        return this.totalPrice;
      }
    },
  },
  onLoad(e) {
    // 购物车数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      this.orderCartParams = data;
      this.originFrom = data.originFrom;
    });
    // 小程序数据
    if (e.from) {
      this.originFrom = e.from;
    }
    if (Number(e.fromPackage) !== 1) { // 套包下单
      this.isFromPackage = true;
      this.packageId = e.packageId;
      // e.houseId = 277;
      this.estateId = e.houseId;
      // TODO 接收套包下单页传递的商品列表信息
      // this.orderCartParams = e.
      this.getBundleDetail({
        bundleId: 63496,
        skuIds: [133505, 133498]
      });
    }
    this.houseId = e.houseId ? e.houseId : getApp().globalData.currentHouse.id;
    this.buyCount = e.buyCount;
    this.skuId = e.skuId;
    this.storeId = e.storeId;
    this.unit = e.unit;
    this.level = e.level;
    this.goodDetailId = uni.getStorageSync("goodId");
    this.shareOriginType = e.shareOriginType;
    console.log(e.houseId, getApp().globalData.currentHouse.id);
  },
  onShow() {
    if (uni.getStorageSync("houseListChooseId")) {
      this.houseId = uni.getStorageSync("houseListChooseId");
      console.log(this.houseId, "this.houseId");
      if (this.$refs.houseDialog) {
        this.$refs.houseDialog.close();
      }
    }
    if (!Number(this.houseId)) {
      this.isShow = false;
      setTimeout(() => {
        if (this.$refs.houseDialog) {
          this.$refs.houseDialog.open();
        }
      });
    } else {
      this.isShow = true;
    }
    if (!getApp().globalData.openId) {
      //确保拿到openId，否则无法支付
      getApp().globalData.openId = uni.getStorageSync("openId");
    }

    this.haveCard = false;
    console.log("!!!!!!!!!!");
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
  onUnload() {
    uni.removeStorageSync("houseListChooseId");
  },
  methods: {
    closePayDialog() {
      this.$refs.payDialog.close();
    },
    clickCard() {
      if (this.cardBalance) {
        this.cardClick = !this.cardClick;
      }
    },
    backFrom() {
      uni.navigateBack();
    },
    backCart() {
      uni.removeStorageSync("houseListChooseId");
    },
    chooseHouse() {
      uni.navigateTo({
        url: "/sub-my/pages/my-house/my-house?isEdit=0",
      });
    },
    goAgreement() {
      uni.navigateTo({
        url: "/sub-classify/pages/pay-order/agreement",
      });
    },
    readExpenses(num) {
      this.expensesType = num;
      this.$refs.expensesToast.showPupop();
    },
    readSafeguard(type) {
      this.refundable = type;
      this.$refs.safeguardToast.showPupop();
    },
    getTime(val) {
      this.time =
        val[0] +
        "年" +
        val[1] +
        "月" +
        val[2] +
        "日" +
        val[3] +
        "时" +
        val[4] +
        "分";
      this.$set(
        this.orderInfo.storeInfos[this.shopIndex].skuInfos[this.goodIndex],
        "doorTime",
        this.time
      );
    },
    typeServe2() {
      this.$refs.houseDialog.open();
    },
    confirmHousePop() {
      uni.switchTab({
        url: "/pages/home/index/index",
      });
    },
    cancelHousePop() {
      this.$refs.houseDialog.close();
    },
    getBundleDetail(params) {
      getBundleDetail(params).then(data => {
        this.reducePayParams(this.reduceDetailInfo(data));
      })
    },
    emitInfo(val) {
      this.addUser = [];
      this.hasCanBuy = false;
      this.hasNoBuyItem = false;
      this.projectId = val.projectId;
      this.orderDetails = [];
      this.addressInfo = val;
      this.estateId = val.id ? val.id : 0;
      let params = {};
      if (this.originFrom === "h5GoodDetail") {
        params = {
          skuInfos: [
            {
              skuId: this.skuId,
              storeId: this.storeId,
              buyCount: this.buyCount,
              unit: this.unit ? this.unit : "",
              level: this.level,
            },
          ],
          estateId: this.estateId,
        };
      } else if (this.originFrom === "shopCart") {
        params = {
          skuInfos: this.orderCartParams.skuInfos,
          estateId: this.estateId,
        };
      }
      getDetailInfo(params).then((data) => {
        this.reducePayParams(this.reduceDetailInfo(data));
      });
    },
    // XXX: getBundleDetail 和 getDetailInfo 接口返回的数据接口不一致
    // 对getBundleDetail 数据聚合以供 reducePayParams 方法使用
    reduceDetailInfo(data) {
      if (this.isFromPackage) {
        let storeInfos = []
        let storeMap = {};
        data.skuPropertyVOS.forEach(sku => {
          let storeId = sku.storeId;
          let store = storeMap[storeId];
          if (!storeMap[storeId]) {
            store = {
              storeId: storeId,
              "storeName":"商家店铺名字",
              skuInfos: [],
            }
            storeMap[storeId] = store;
            storeInfos.push(store);
          }

          let skuInfo = {
            ...sku,
            skuId: sku.id,
				    // storeId: storeId,
				    // productType: sku.productType,
				    // categoryTypeId: sku.categoryTypeId,
				    // categoryId: sku.categoryId,
				    skuName: sku.name,
				    // spuName: sku.spuName,
				    // spuId: sku.spuId,
				    // imageUrl: sku.imageUrl,
				    // appointmentRequired: sku.appointmentRequired,
				    // unit: sku.unit,
				    price: sku.discountPrice, // 折后价
				    buyCount: sku.minimumOrderQuantity, // 购买数量取起购价
				    handlingFee: sku.stairwayRoomHandlingFee,
				    // deposit: sku.deposit,
				    // shippingFee: sku.shippingFee,
				    // refundable:sku.refundable
          }

          store.skuInfos.push(skuInfo);
        })

        return {
          totalPrice: data.totalPrice,
          totalDeliveryFee: 0,
          totalHandlingFee: 0,
          totalDeposit: 0,
          totalDiscount: 0,
          storeInfos: storeInfos,
        }
      }

      return data
    },
    // 整理结算相关参数
    reducePayParams(data) {
      this.totalPrice = (
          data.totalPrice +
          data.totalDeliveryFee +
          data.totalHandlingFee +
          data.totalDeposit -
          data.totalDiscount
        ).toFixed(2);
        let dataInfo = data;
        this.orderInfo = dataInfo;
        this.noStoreInfos = JSON.parse(JSON.stringify(dataInfo));
        this.noStoreInfos.storeInfos = [];
        this.canStoreInfos = JSON.parse(JSON.stringify(dataInfo));
        this.canStoreInfos.storeInfos = [];
        this.orderInfo.storeInfos.map((storeItem, storeK) => {
          let noStoreItem = JSON.parse(JSON.stringify(storeItem));
          noStoreItem.skuInfos = [];
          let canStoreItem = JSON.parse(JSON.stringify(storeItem));
          canStoreItem.skuInfos = [];
          this.noStoreInfos.storeInfos.push(noStoreItem);
          this.canStoreInfos.storeInfos.push(canStoreItem);
          storeItem.skuInfos.map((skuItem, skuK) => {
            this.productType = skuItem.productType;
            // 头部补人工数据
            if (skuItem.addingJobName) {
              this.addUser.push({
                addingJobName: skuItem.addingJobName,
                addingUserName: skuItem.addingUserName,
                addingUserId: skuItem.addingUserId,
              });
            }
            if (skuItem.appointmentRequired) {
              this.hasTime = true;
            }
            // 结算可配送和不可配送数据
            if (skuItem.errorType) {
              noStoreItem.skuInfos.push(skuItem);
              if (skuItem.errorType === 4) {
                this.toastType = 4;
                this.toastText = "该服务需精算师指导下完成";
                if (this.$refs.cancelDialog.open) {
                  this.$refs.cancelDialog.open();
                }
              } else if (skuItem.errorType === 5) {
                this.toastType = 5;
                this.toastText = "请从精算单购买管家服务";
                if (this.$refs.cancelDialog.open) {
                  this.$refs.cancelDialog.open();
                }
              } else if (skuItem.errorType === 8) {
                this.toastType = 8;
                this.toastText = "请从装修页面查询购买";
                if (this.$refs.cancelDialog.open) {
                  this.$refs.cancelDialog.open();
                }
              }
              this.hasNoBuyItem = true; // 判断所有数据中有没有不可配送数据
            } else {
              this.hasCanBuy = true;
              canStoreItem.skuInfos.push(skuItem);
              this.totalClassNum += 1;
              // 整理出结算参数
              let orderDetailItem = {
                relationId: skuItem.skuId, //实体id,
                type: skuItem.productType, //1材料  2服务   3专项付款,
                businessType: skuItem.categoryTypeId, //业务类型,
                roleType: skuItem.roleType ? Number(skuItem.roleType) : 0, //角色类型  7工人  10管家  购买工人和管家时参数必传,
                workType: skuItem.workType ? Number(skuItem.workType) : -2, //工种类型 购买工人时参数必传,
                level: skuItem.level, //等级  0中级  1高级 2特级  3钻石",
                storeId: storeItem.storeId, //店铺id,
                storeType: 0, //店铺类型 0普通 1设计师",
                number: skuItem.buyCount, //购买数量",
                params: {}, //与订单无关的参数 如上门时间 doorTime
              };
              this.orderDetails.push({
                orderDetailItem: orderDetailItem,
                paramsInfo: skuItem,
              });
            }
          });
        });
        if (
          this.orderInfo.storeInfos.length > 1 ||
          this.orderInfo.storeInfos[0].skuInfos.length > 1
        ) {
          this.orderInfo = this.canStoreInfos;
          if (this.hasNoBuyItem) {
            this.$refs.orderToast.showPupop();
          }
        }
        if (this.orderInfo.storeInfos[0].skuInfos.length === 1) {
          this.totalClassNum = 1;
        }
    },
    chooseTime(shopIndex, goodIndex) {
      this.shopIndex = shopIndex;
      this.goodIndex = goodIndex;
      this.$refs.datePicker.showDatePicker();
    },
    toastConfirm() {
      this.hasNoBuyItem = false;
    },
    pay() {
      if (this.hasTime && !this.time) {
        this.$refs.timeDialog.open();
        return;
      }
      if (!this.hasCanBuy || this.hasNoBuyItem || !this.totalPrice) {
        return;
      }
      if (this.cardClick) {
        this.$refs.payDialog.open();
        return;
      }
      this.payOrder();
    },
    createOrder(params) {
      return this.isFromPackage ? payBundleOrder(params) : payOrder(params);
    },
    payOrder() {
      let details = [];
      this.orderDetails.map((v, k) => {
        details.push(v.orderDetailItem);
        Object.keys(v.paramsInfo).map((item, index) => {
          if (item === "doorTime") {
            v.orderDetailItem.params[item] = v.paramsInfo.doorTime;
          }
        });
      });
      uni.$emit("submitOrder"); // 购物车需要的逻辑
      let orderPrice = Number(
        Number(this.totalPrice).toFixed(2).replace(".", "")
      );
      let params = {
        payType: 1, //"int //支付方式  1在线支付",
        openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
        projectId: this.projectId, //"long //项目id  非必须 默认0",
        customerId: 0, //"long //业主id  非必须 默认0",
        estateId: this.estateId, //"long //房产id   非必须 默认0",
        total: orderPrice, //"int //总计",
        remarks: this.remarks, //"string //备注",
        orderName: "", //"string //订单名称 可为空",
        details: details,
        isCardPay: this.cardClick,
        origin: decodeURIComponent(this.shareOriginType),
        packageId: this.isFromPackage ? this.packageId : undefined, // 套包下单时需要套包id参数，默认undefined
      };
      this.createOrder(params).then((data) => {
        const { wechatPayJsapi, cardPayComplete } = data;
        if (!cardPayComplete) {
          uni.requestPayment({
            provider: "wxpay",
            ...wechatPayJsapi,
            success(res) {
              console.log("付款成功", res);
              if (data.subOrderIds && data.subOrderIds.length === 1) {
                uni.navigateTo({
                  url:
                    "/sub-classify/pages/pay-order/pay-success?orderId=" +
                    data.subOrderIds[0],
                });
              } else {
                uni.navigateTo({
                  url:
                    "/sub-classify/pages/pay-order/pay-success?orderId=" +
                    data.id,
                });
              }
            },
            fail(e) {
              console.log(e, "取消付款");
              if (data.subOrderIds && data.subOrderIds.length === 1) {
                uni.navigateTo({
                  url: `/sub-my/pages/my-order/order-wait-pay/order-wait-pay?orderNo=${data.subOrderIds[0]}&from=waitPayOrder`,
                });
              } else {
                uni.navigateTo({
                  url: `/sub-my/pages/my-order/order-wait-pay/order-wait-pay?orderNo=${data.id}&from=waitPayOrder`,
                });
              }
              log({
                type: "wx-pay-fail",
                page: "pay-order/index",
                data: e,
                openId: getApp().globalData.openId,
                openIdLocal: uni.getStorageSync("openId"),
              });
            },
          });
        } else {
          uni.navigateTo({
            url: "/sub-classify/pages/pay-order/pay-success?orderId=" + data.id,
          });
        }
      });
    },
    cancelGoodPop() {
      this.cancelDialog = true;
      this.$refs.cancelDialog.close();
    },
    confirmGoodPop() {
      if (this.toastType === 4) {
        uni.navigateTo({
          url:
            "/sub-classify/pages/search-result/search-result?searchText=" +
            "精算",
        });
      } else if (this.toastType === 5) {
        uni.switchTab({
          url: "/pages/decorate/index/index",
        });
      } else if (this.toastType === 8) {
        uni.switchTab({
          url: "/pages/decorate/index/index",
        });
      }
    },
    confirmTimePop() {
      this.$refs.timeDialog.close();
    },
  },
};
</script>
<style>
/*  .text-placeholder{
    color: green !important;
    line-height: 100rpx !important;
  } */
</style>
<style lang="scss" scoped>
  .mt26 {
    margin-top: 26rpx;
    font-size: 24rpx;
  }
  .mt26 .fee{
    font-size: 28rpx;
  }
  .mt26 .total-fee{
    font-size: 32rpx;
  }
  .select-disable {
    width: 36rpx;
    height: 36rpx;
    background: #f5f5f5;
    border: 1rpx solid #e8e8e8;
    border-radius: 50%;
    margin-left: 16rpx;
  }

  .selected-img {
    width: 36rpx;
    height: 36rpx;
    margin-left: 16rpx;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-img {
    width: 32rpx;
    height: 32rpx;
    margin-right: 12rpx;
  }

  .card-price {
    font-family: PriceFont;
    font-size: 28rpx;
    color: #ff3347;
  }

  .card-sub {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
  }

  .order-container {
    width: 100%;
    overflow: scroll;
    background: #f5f6f7;
    color: #333333;
    padding-bottom: 300rpx;
  }

  .question-box {
    width: fit-content !important;
    position: relative;
    display: inline-block !important;
  }

  .question-icon {
    position: absolute;
    width: 30rpx;
    height: 28rpx;
    top: 6rpx;
    margin-left: 2rpx;
    background-image: url("../../static/image/question.png");
    background-size: cover;
  }

  .item-reduce-box .question-box .free-icon {
    top: 14rpx;
  }

  // 商品item
  .content{
    background-color: #ffffff;
    border-radius: 32rpx;
    overflow: hidden;
  }
  .shop-item {
    margin-top: 25rpx;
    padding: 0 32rpx;
  }

  .shop-name {
    height: 106rpx;
    line-height: 106rpx;
  }

  .item-box {
    flex-wrap: wrap;
  }

  .goods-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 20rpx;
  }

  .goods-item .good-tip {
    width: 100%;
  }

  .good-tip .item-reduce-box {
    bottom: 0;
  }

  .goods-item .goodsItemImg {
    width: 192rpx;
    height: 192rpx;
    display: block;
    margin-right: 24rpx;
    border-radius: 8rpx;
  }

  .goods-item .goods-info {
    height: 200rpx;
    position: relative;
    flex: 1;
  }

  .goods-info .goods-desc {
    width: 260rpx;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    vertical-align: middle;
    padding-bottom: 2rpx;
  }

  .goods-info .goods-desc .goods-type {
    height: 30rpx;
    padding: 2rpx 10rpx 2rpx 10rpx;
    margin-right: 4rpx;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #333333;
    line-height: 28rpx;
    text-align: center;
    vertical-align: middle;
    background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
  }

  .goods-info .goods-spec {
    width: fit-content;
    text-overflow: ellipsis;
    padding: 0 4rpx;
    margin-top: 2rpx;
    font-size: 22rpx;
    position: absolute;
    top: 0;
    right: 0;
    align-items: baseline;
  }

  .goods-info .spu-class {
    position: relative;
    margin-top: 10rpx;
  }

  .goods-info .tag {
    font-size: 22rpx;
    color: #999999;
    line-height: 38rpx;
    text-align: center;
    border-radius: 6rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 270rpx;
    text-align: left;
  }

  .goods-info .total-num {
    font-size: 28rpx;
    color: #999999;
    float: right;
  }

  .goods-info .sku-deposit {
    float: right;
  }

  .safeguard {
    padding: 2rpx 6rpx;
    border: 1rpx solid rgba(255, 51, 71, 0.18);
    color: #ff3347;
    font-size: 20rpx;
    width: fit-content;
    border-radius: 6rpx;
  }

  .safe-icon {
    position: static;
    display: inline-block;
    width: 18rpx;
    height: 18rpx;
    background-image: url("../../static/image/safe-question.png");
  }

  .goods-money {
    font-size: 24rpx;
    color: #333333;
    vertical-align: bottom;
    font-weight: bold;
  }

  .goods-money .integer-price {
    font-size: 30rpx;
  }

  .cost-detail {
    border-top: 2rpx solid #f2f2f2;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #999999;
    display: flex;
    flex-wrap: wrap;
    height: 140rpx;
    align-content: space-around;
  }

  .cost-detail view {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cost-detail view text:nth-child(2) {
    corlor: #333333;
  }

  .shop-reduce {
    position: relative;
    height: 56rpx;
  }

  .item-reduce-box {
    height: 56rpx;
    width: 666rpx;
    line-height: 56rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
    padding-left: 20rpx;
    color: #ff3347;
    font-size: 22rpx;
    position: absolute;
    bottom: 16rpx;
  }

  .item-reduce-box .question-icon {
    top: 0;
  }

  .no-send-tip .item-reduce-box {
    background-color: #fff6f7;
    color: #ff3347;
  }

  .choose-time {
    width: 100%;
  }

  .time-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .time-bar text {
    font-size: 28rpx;
    color: #333333;
  }

  .choose-icon {
    width: 40rpx;
    height: 40rpx;
  }

  .good-store-account {
    padding: 35rpx 32rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    border-radius: 32rpx;
    overflow: hidden;
  }

  .good-store-account view {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .good-store-account .is-store {
    height: 170rpx;
  }

  .good-store-account .store-read {
    color: #666666;
    font-size: 24rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
  }

  .total-deposit {
    padding: 0 !important;
  }
  .pay-way,
  .pledge,
  .remarks {
    padding: 5rpx 32rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 104rpx;
    line-height: 104rpx;
    overflow: hidden;
    border-radius: 32rpx;
  }

  .pay-way .wechat_icon {
    vertical-align: sub;
    display: inline-block;
    width: 32rpx;
    height: 32rpx;
    // background-image: url("../../static/image/wechat_icon.png");
    background-size: contain;
    margin-right: 12rpx;
  }

  .remarks {
    overflow: hidden;
  }

  .remarks view {
    flex: 1;
    overflow: scroll;
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

  .bottom {
    padding: 24rpx 32rpx 50rpx 32rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 26rpx;
    z-index: 10;
  }
  .bottom .agree-box{
    color: #999999;
  }
  .bottom .agreement {
    color: #333333;
  }

  .bottom .second-part {
    margin-top: 32rpx;
    height: 88rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bottom .total-price-info {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex: 1;
    flex-wrap: wrap;
  }

  .total-price-info .info-text1 {
    font-family: PingFangSC, PingF;
    color: #999999;
    width: 100%;
  }

  .total-price-info .info-text2 {
    font-family: PingFangSC, PingF;
    color: #111111;
    font-weight: 500;
  }

  .total-price-info .info-text2 {
    font-family: PingFangSC, PingF;
    color: #111111;
    font-weight: 500;
  }

  .total-price-info .total-money {
    color: #ff3347;
    font-weight: 500;
  }

  .total-money .mony-text {
    font-size: 48rpx;
  }

  .bottom .pay-button {
    width: 248rpx;
    height: 88rpx;
    background: linear-gradient(114.87deg, #FA3B34 23.76%, #FF6A33 93.55%);
    border-radius: 6px;
    color: #ffffff;
    font-size: 32rpx;
    line-height: 88rpx;
    text-align: center;
  }

  .bottom .no-pay {
    opacity: 0.4;
    background: linear-gradient(114.87deg, #FA3B34 23.76%, #FF6A33 93.55%);
  }

  .popup-item {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 560rpx;
    height: 212rpx;
    background: #ffffff;
    border-radius: 24rpx;
  }

  .house-item {
    height: 250rpx;
    overflow: hidden;
  }

  .popup-item .popup-title {
    height: 128rpx;
    line-height: 128rpx;
    border-bottom: 1rpx solid #f5f5f5;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #111111;
  }

  .house-item .house-popup {
    box-sizing: border-box;
    padding: 40rpx 10rpx;
    height: 160rpx;
    line-height: 1.6em;
  }

  .popup-item .popup-button {
    display: flex;
  }

  .popup-item .house-button {
    height: 100rpx;
  }

  .popup-item .house-button view {
    height: 100% !important;
    border-right: 1px solid #f5f5f5;
  }

  .popup-item .popup-button view {
    height: 82rpx;
    line-height: 84rpx;
    text-align: center;
  }

  .popup-button .popup-ok {
    width: 50%;
    border-right: 1rpx solid #f5f5f5;
  }

  .popup-button .popup-cancel {
    flex: 1;
    color: #00bfb6;
  }
</style>