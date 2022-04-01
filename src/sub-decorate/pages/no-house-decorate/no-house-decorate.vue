<template>
  <view class="no-house-decorate" :class="{center: noData === 0}">
    <view class="content" v-if="noData === 1">
      <view class="addhouse-decs" v-if="!currentHouse.id">
        <button class="addhouse" @click="goAddHouse">
          <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_add_house_info.svg">
          </image>
          <text>添加房屋信息</text>
        </button>
        <view class="decs"><text>打扮家按房子面积计算价格</text></view>
      </view>
      <my-current-house v-if="currentHouse && currentHouse.id" :houseData="currentHouse"
        @changCurrentHouse="changCurrentHouse">
      </my-current-house>
      <service-card v-if="(sssType == 'decorate' || sssType == 'design') && design.id" :setting="design"
        :showLevel="showLevel" class="service-card" @selectAnother="selectAnotherHandler('design')" @changeLevel="open">
        <template slot="check">
          <check-box :checked="design.checked" @change="(value)=> {change(design.cardtype, value)}">
          </check-box>
        </template>
      </service-card>
      <service-card v-if="(sssType == 'decorate' || sssType == 'actuary') && actuary.id" :setting="actuary"
        class="service-card" @selectAnother="selectAnotherHandler('actuary')">
        <template slot="check">
          <check-box :checked="actuary.checked" @change="(value)=> {change(actuary.cardtype, value)}">
          </check-box>
        </template>
      </service-card>
      <service-card v-if="sssType == 'checkHouse' && checkHouse.id" :setting="checkHouse" class="service-card"
        @selectAnother="selectAnotherHandler('checkHouse')" @setDoorTime="openDoorTimePopup">
        <template slot="check">
          <check-box :checked="checkHouse.checked" @change="(value)=> {change(checkHouse.cardtype, value)}">
          </check-box>
        </template>
      </service-card>
      <view class="recharge-row" v-if="haveCard">

        <view v-if="couponList.length" class="row-item" style="margin-bottom: 32rpx;" @click="clickCoupon">
          <image class="card-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
            mode="">
          </image>
          <view>
            <text>优惠券</text>
          </view>
          <view style="flex:1">
          </view>
          <view v-if="selectCoupon&&selectCoupon.total" class="card-price">
            <text style="margin-right:4rpx ;">-</text> <text style="margin-right:2rpx ;">¥</text>
            {{(selectCoupon.total/100).toFixed(2)}}
          </view>
          <image class="selected-img"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_more.svg" mode="">
          </image>
        </view>
        <view v-if="haveCard" class="row-item" @click="clickCard">
          <image class="card-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
            mode="">
          </image>
          <view>
            <text>储值卡</text>
            <text class="card-sub">(可用余额:{{(cardBalance/100).toFixed(2)}}元)</text>
          </view>
          <view style="flex:1">
          </view>
          <view v-if="cardClick" class="card-price">
            <text style="margin-right:4rpx ;">-</text> <text
              style="margin-right:2rpx ;">¥</text>{{(this.cardPrice/100).toFixed(2)}}
          </view>
          <image v-if="cardClick" class="selected-img"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/ic_checked.svg" mode="">
          </image>
          <image v-if="!cardClick&&cardBalance" class="selected-img"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_unselected.png" mode="">
          </image>
          <view v-if="!cardClick&&!cardBalance" class="select-disable">
          </view>
        </view>
      </view>
      <view class="pay-way">
        <text>支付方式</text>
        <view v-if="payChannel" class="flex-center">
          <!-- <image
            class="card-img"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/ic_card.png"
            mode=""
          >
          </image> -->
          <text>储值卡支付</text>
        </view>
        <view v-else @click="morePayWay">
          <!-- <view class="wechat_icon"></view> -->
          <text>{{payWayTag?'公司转账':'在线支付'}}</text>
          <view class="more_pay_icon"></view>
        </view>
      </view>
      <view class='remarks'>
        <text>备注</text>
        <view class="remarks-right">
          <input type="text" maxlength="200" v-model="remarks" cursor-spacing="15px"
            placeholder-class="text-placeholder"
            style="width:100%;line-height: 104rpx;min-height: 104rpx;height: 100%;overflow: scroll;"
            placeholder="选填,说点什么～" />
        </view>
      </view>
    </view>
    <view v-if="noData === 1" class="payment-wrap" :style="{paddingBottom:systemBottom}">
      <payment @gotopay="gotopay" :pieces="pieces" :countPrice="payPrice" :isAllChecked="isAllChecked">
      </payment>
    </view>

    <no-data v-if="noData === 0" words="当前城市暂未开通此服务,敬请期待~"></no-data>
    <uni-popup ref="level">
      <change-level v-if="levelList.length > 0" @changeLevel="setLevel" @close="close" :dataList="levelList"
        descType="design" :current="levelList[0]"></change-level>
    </uni-popup>
    <uni-popup ref="tips">
      <cancel-tip :tips="tips" @result="setCardChecked" @close="tipsClose"></cancel-tip>
    </uni-popup>
    <uni-popup ref="doorTime">
      <door-time-date @getTime="setDoorTime" @close="closeDoorTimePopup"></door-time-date>
    </uni-popup>
    <uni-popup ref="payDialog" type="bottom">
      <pay-dialog :payChannel="payChannel" :payChannelPrice="payChannelPrice" @payOrder="payOrder"
        @closePayDialog="closePayDialog"></pay-dialog>
    </uni-popup>
    <uni-popup ref="couponDialog" type="bottom">
      <coupon-dialog :couponList="couponList" @onSelect="onSelectCoupon" @close="closeCoupon"></coupon-dialog>
    </uni-popup>
    <pay-way-toast ref='payWayToast' @payWay="payWay"></pay-way-toast>
  </view>
</template>

<script>
  import ServiceCard from "../../components/service-card/service-card.vue";
  import Payment from "../../components/payment/payment.vue";
  import CheckBox from "../../components/check-box/check-box.vue";
  import DbjRadio from "../../components/dbj-radio/dbj-radio.vue";
  import MyCurrentHouse from "../../components/my-current-house/my-current-house.vue";
  import CancelTip from "./cancel-tip.vue";
  import DoorTimeDate from "../../components/door-time-date/door-time-date.vue";
  import ChangeLevel from "../../components/change-level/change-level.vue";
  import NoData from "../../components/no-data/no-data.vue";
  import {
    queryEstates,
    getServiceSku
  } from "../../../api/decorate.js";
  import {
    queryMaxLevel,
    changeLevel
  } from "../../../api/level.js";
  import {
    getBalance
  } from "../../../api/user.js";
  import {
    createOrder
  } from "../../../api/order-center.js";
  import {
    log
  } from "../../../utils/log.js";
  const TYPE = {
    decorate: "装修服务",
    design: "设计服务",
    actuary: "精算服务",
    checkHouse: "验房服务",
  };

  export default {
    components: {
      ServiceCard,
      Payment,
      CheckBox,
      DbjRadio,
      MyCurrentHouse,
      CancelTip,
      DoorTimeDate,
      ChangeLevel,
      NoData,
    },
    data() {
      return {
        dataList: [],
        design: {},
        actuary: {},
        checkHouse: {},
        currentHouse: {},
        selectLevel: 1,
        sssType: "",

        tips: {
          id: "",
          content: "",
          value: null,
        },
        selectHouseData: {},
        selectedServer: {},

        projectId: null,
        serveType: null,
        estateId: null,
        customerId: null,
        provinceId: null, //省id
        cityId: null, //市id
        areaId: null, //区id
        levelList: [],
        showLevel: false,
        defaultHouse: {},
        noData: -1,
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
        fromPage: "",
        cardClick: false,
        haveCard: false, //是否有会员卡
        cardBalance: 0, //会员卡余额
        remarks: "",
        couponList: [],
        selectCoupon: {
          total: 10000,
        },
        payWayTag: 0,
        payType: 0
      };
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
      this.systemBottom = menuButtonInfo.bottom + "rpx";
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
    },
    computed: {
      payChannel() {
        var res = this.countPrice - this.cardBalance;
        //支付渠道 true 储值卡  false 微信
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
          return (this.countPrice / 100).toFixed(2);
        }
      },
      cardPrice() {
        var res = this.countPrice - this.cardBalance;
        if (res >= 0) {
          return this.cardBalance;
        } else {
          return this.countPrice;
        }
      },
      payPrice() {
        if (this.cardClick) {
          var res = this.countPrice - this.cardBalance;
          if (res <= 0) {
            return 0;
          }
          return res;
        } else {
          return this.countPrice;
        }
      },
      isAllChecked() {
        return (
          this.design.checked || this.actuary.checked || this.checkHouse.checked
        );
      },
      pieces() {
        let num =
          this.design.checked + this.actuary.checked + this.checkHouse.checked;
        return num;
      },
      countPrice() {
        let dprice = 0;
        let aprice = 0;
        let chprice = 0;
        if (this.design.checked) {
          dprice = this.design.price || 0;
        }
        if (this.actuary.checked) {
          aprice = this.actuary.price || 0;
        }
        if (this.checkHouse.checked) {
          chprice = this.checkHouse.price || 0;
        }
        let insideArea = this.currentHouse.insideArea || 1;

        let dpriceCount = Math.trunc(dprice * insideArea);
        let apriceCount = Math.trunc(aprice * insideArea);
        let chpriceCount = Math.trunc(chprice * insideArea);
        let temp = dpriceCount + apriceCount + chpriceCount;
        console.log(">>>>总价:", temp);
        this.cardClick = this.cardBalance >= temp;
        return temp;
      },
    },
    onLoad(option) {
      uni.$on("selectedHouse", (data) => {
        console.log("selectedHouse:", data);
        this.selectHouseData = data;
      });
      uni.$on("selectedServer", (data) => {
        const {
          serviceType,
          values
        } = data;
        this.selectedServer = data;
      });
      const {
        projectId,
        serveCardId,
        serviceName,
        serviceType,
        serveType,
        serveTypeName,
        estateId,
        roleType,
        customerId,
        provinceId, //省id
        cityId, //市id
        areaId, //区id
      } = getApp().globalData.decorateMsg;
      const {
        type
      } = option;
      this.sssType = type || this.getType(serviceType);

      if (option.isDecorate) {
        this.projectId = Number(option.projectId);
      } else {
        this.projectId = projectId;
      }

      this.serveType = serveType;
      this.estateId = Number(option.estateId) || Number(estateId);
      this.customerId = customerId;
      this.provinceId = provinceId; //省id
      this.cityId = cityId; //市id
      this.areaId = areaId;
      this.fromPage = option.from;
      uni.setNavigationBarTitle({
        title: TYPE[type],
      });
    },
    onShow() {
      this.haveCard = false;
      getBalance().then((e) => {
        if (e != null) {
          this.haveCard = true;
          this.cardBalance = e;
        }
      });
      const {
        serviceType
      } = this.selectedServer;
      if (this.sssType == "decorate") {
        if (serviceType == 1 || serviceType == 4) {
          // 从更换商品返回的
        } else {
          this.design.checked = true;
          this.actuary.checked = true;
        }
      }
      if (this.sssType == "design") {
        if (serviceType == 1) {
          // 从更换商品返回的
        } else {
          this.design.checked = true;
        }
      }
      if (this.sssType == "checkHouse") {
        if (serviceType == 2) {
          // 从更换商品返回的
        } else {
          this.checkHouse.checked = true;
        }
      }
      if (this.sssType == "actuary") {
        if (serviceType == 4) {
          // 从更换商品返回的
        } else {
          this.actuary.checked = true;
        }
      }

      if (!this.selectHouseData.id) {
        this.getMyHouseList();
      } else {
        this.currentHouse = this.selectHouseData;
        this.getServiceSku();
      }
      this.defaultHouse = getApp().globalData.currentHouse;

      if (!getApp().globalData.openId) {
        //确保拿到openId，否则无法支付
        getApp().globalData.openId = uni.getStorageSync("openId");
      }
    },
    methods: {
      payWay(payWayTag) {
        this.payWayTag = payWayTag
        if (this.payWayTag) {
          this.payType = 6
        }
      },
      morePayWay() {
        this.$refs.payWayToast.showPupop();
      },

      onSelectCoupon(item) {
        this.selectCoupon = item;
      },
      closeCoupon() {
        this.$refs.couponDialog.close();
      },
      clickCoupon() {
        this.$refs.couponDialog.open();
      },
      closePayDialog() {
        this.$refs.payDialog.close();
      },
      clickCard() {
        if (this.cardBalance) {
          this.cardClick = !this.cardClick;
          if (this.cardClick) {
            this.payType = 0
          }
        }
      },
      setDoorTime(value) {
        this.checkHouse.doorTime = value;
        this.checkHouse = JSON.parse(JSON.stringify(this.checkHouse));
      },
      openDoorTimePopup() {
        this.$refs.doorTime.open("bottom");
      },
      closeDoorTimePopup() {
        this.$refs.doorTime.close();
      },
      getType(num) {
        if (num == 1) {
          return "design";
        }
        if (num == 2) {
          return "checkHouse";
        }
        if (num == 4) {
          return "actuary";
        }
      },
      radioChange(obj) {
        this.selectLevel = obj.value;
      },
      open() {
        this.$refs.level.open("bottom");
      },
      setLevel(levelObj) {
        let temp = {
          ...this.design,
        };

        temp.level = levelObj.value;
        temp.price = levelObj.price;
        this.design = {
          ...temp,
        };
        console.log(this.design.level, this.design.price);
        this.close();
      },
      close() {
        this.$refs.level.close();
      },
      editField(original, source) {
        // original.appointmentRequired = 可以用原来的吗 //是否需要预约上门时间
        original.categoryId = source.product.category.category1Id;
        original.category4Id = source.product.category.category4Id;
        original.categoryTypeId = source.product.categoryTypeId;
        // original.deposit =  source.product.sku.deposit
        original.id = source.product.skuId;
        original.spuId = source.product.spuId;
        original.imageUrl = source.product.skuImage;
        original.name = source.product.skuName;
        original.price = source.product.skuPrice;
        original.productType = source.product.productType;
        // original.quantity =  数量
        // original.serviceName =  可以用原来的吗
        // original.serviceType =  可以用原来的吗
        // original.unitId = source.product.unitId
        original.unitId = source.product.salesUnit.unitId;
        original.spuName = source.product.spuName;
        original.storeId = source.product.storeId;
        original.appointmentRequired =
          source.product.spu.appointmentRequired ?? false;
      },
      changeLevel() {
        let tmp = {
          cityId: this.currentHouse.cityId || this.defaultHouse.cityId,
          price: this.design.price,
          count: 1,
          categoryTypeId: this.design.categoryTypeId,
          skuId: this.design.id,
        };
        if (this.design.categoryTypeId === 7) {
          tmp.workerType = this.design.workerType;
        }
        this.levelList = [];
        changeLevel(tmp).then((data) => {
          this.showLevel = data?.length > 0;
          console.log(this.showLevel);
          this.levelList = data.map((t) => {
            return {
              value: t.level,
              label: t.levelName,
              totalPrice: t.totalPrice,
              price: t.price,
            };
          });
        });
      },
      getServiceSku() {
        let params = {
          provinceId: this.currentHouse.provinceId || this.defaultHouse.provinceId,
          cityId: this.currentHouse.cityId || this.defaultHouse.cityId,
          areaId: this.currentHouse.areaId || this.defaultHouse.areaId,
          // serveTypes: [1, 2, 4]
        };
        if (this.sssType == "checkHouse") {
          params.serveTypes = [2];
        }
        getServiceSku(params).then((data) => {
          const {
            serviceType,
            values
          } = this.selectedServer;
          if (serviceType == 1) {
            this.design = {
              title: "设计服务",
              cardtype: "design",
              checked: this.design.checked,
              level: 1,
              insideArea: this.currentHouse.insideArea,
            };
            this.editField(this.design, values);
            this.changeLevel();
          } else {
            const checked =
              serviceType == 4 ?
              this.design.checked :
              this.sssType == "decorate" || this.sssType == "design";
            let designData = data.filter(
              (t) => t.serviceType === 1 && t.inServiceArea
            );
            if (designData && designData.length > 0) {
              this.design = {
                ...designData[0],
                title: "设计服务",
                cardtype: "design",
                checked: checked, //this.sssType == "decorate" || this.sssType == "design",
                level: 1,
                insideArea: this.currentHouse.insideArea,
              };
              this.changeLevel();
            } else {
              this.design = {
                checked: false,
              };
            }
          }
          if (serviceType == 2) {
            this.checkHouse = {
              title: "验房服务",
              cardtype: "checkHouse",
              checked: this.checkHouse.checked,
              insideArea: this.currentHouse.insideArea,
            };
            this.editField(this.checkHouse, values);
          } else {
            this.checkHouse = {
              checked: false,
            };
            let checkHouseData = data.filter(
              (t) => t.serviceType === 2 && t.inServiceArea
            );
            if (checkHouseData && checkHouseData.length > 0) {
              this.checkHouse = {
                ...checkHouseData[0],
                title: "验房服务",
                cardtype: "checkHouse",
                checked: this.sssType == "checkHouse",
                insideArea: this.currentHouse.insideArea,
              };
            }
          }
          if (serviceType == 4) {
            this.actuary = {
              title: "精算服务",
              cardtype: "actuary",
              checked: this.actuary.checked,
              insideArea: this.currentHouse.insideArea,
            };
            this.editField(this.actuary, values);
          } else {
            const checked =
              serviceType == 1 ?
              this.actuary.checked :
              this.sssType == "decorate" || this.sssType == "actuary";

            let actuaryData = data.filter(
              (t) => t.serviceType === 4 && t.inServiceArea
            );
            if (actuaryData && actuaryData.length > 0) {
              this.actuary = {
                ...actuaryData[0],
                title: "精算服务",
                cardtype: "actuary",
                checked: checked, //this.sssType == "decorate" || this.sssType == "actuary",
                insideArea: this.currentHouse.insideArea,
              };
            } else {
              this.actuary = {
                checked: false,
              };
            }
          }
          if (this.design?.id || this.actuary?.id || this.checkHouse?.id) {
            this.noData = 1;
          } else {
            this.noData = 0;
          }
          console.log("默认服务： ", this.design, this.actuary, this.checkHouse);
        });
      },

      selectAnotherHandler(pp) {
        let str = "";
        let areaId = this.currentHouse.areaId || this.defaultHouse.areaId;
        if (pp === "design") {
          str =
            `/sub-decorate/pages/service-list/service-list?name=设计服务&serviceType=1&areaId=${areaId}&insideArea=${this.currentHouse.insideArea}&spuId=${this.design.spuId}&categoryId=${this.design.categoryTypeId}&unitId=${this.design.unitId}`;
        }
        if (pp === "checkHouse") {
          str =
            `/sub-decorate/pages/service-list/service-list?name=验房服务&serviceType=2&areaId=${areaId}&insideArea=${this.currentHouse.insideArea}&spuId=${this.checkHouse.spuId}&categoryId=${this.checkHouse.categoryTypeId}&unitId=${this.checkHouse.unitId}`;
        }
        if (pp === "actuary") {
          str =
            `/sub-decorate/pages/service-list/service-list?name=精算服务&serviceType=4&areaId=${areaId}&insideArea=${this.currentHouse.insideArea}&spuId=${this.actuary.spuId}&categoryId=${this.actuary.categoryTypeId}&unitId=${this.actuary.unitId}`;
        }
        uni.navigateTo({
          url: str,
        });
      },
      changCurrentHouse() {
        uni.navigateTo({
          url: "/sub-my/pages/my-house/my-house",
        });
      },
      getMyHouseList() {
        queryEstates({
          isNeedRelative: true,
        }).then((data) => {
          if (!data || (typeof data == "array" && data.length < 1)) {
            this.currentHouse = {};
          } else {
            let flt = null;
            let eastId = Number(this.estateId) ?? false;
            let fromPage = this.fromPage ?? false;
            console.log(">>estateId: >>", eastId);
            console.log(">>fromPage: >>", this.fromPage);

            if (eastId) {
              if (fromPage == "userHome") {
                flt = data.filter((t) => t.id == this.defaultHouse?.id);
              } else {
                flt = data.filter((t) => t.id == eastId);
              }
            } else {
              if (fromPage == "userHome") {
                flt = data.filter((t) => t.id == this.defaultHouse?.id);
              }
              if (!fromPage || this.fromPage == "decorateIndex") {
                console.log(">>fromPage: >>", this.fromPage);
                // 来自消息
                flt = data.filter(
                  (t) => t.id == getApp().globalData.currentProject.estateId
                );
              }
            }
            if (flt && flt.length > 0) {
              this.currentHouse = flt[0];
            } else {
              this.currentHouse = data[0];
            }
            // 如果是从无房屋进来的，那么需要把首页的房产初始化下
            if (!this.defaultHouse.id) {
              let item = data.find((t) => t.defaultHouse);
              item = item ?? data[0];
              uni.$emit("currentHouseChange", item);
              getApp().globalData.currentHouse = item;
            }
            console.log("currentHouse", this.currentHouse);
          }

          this.getServiceSku();
        });
      },
      gotopay() {
        // TODO去结算页面
        if (this.currentHouse && this.currentHouse.id) {
          if (this.cardClick) {
            this.$refs.payDialog.open();
            return;
          }
          this.payOrder();
        } else {
          uni.showToast({
            title: "请您先添加房屋信息",
            icon: "none",
            duration: 3000,
          });
        }
      },
      payOrder() {
        //#ifdef MP-WEIXIN
        let payType = 1;
        let deviceType = 0;
        //#endif
        //#ifdef H5
        let payType = 3;
        let deviceType = 2;
        //#endif
        let params = {
          payType: this.payType ? this.payType : payType, //"int //支付方式  1微信支付",
          deviceType: deviceType,
          openid: getApp().globalData.openId, //"string //微信openid 小程序支付用 app支付不传或传空",
          projectId: this.projectId || 0, //"long //项目id  非必须 默认0",
          customerId: this.customerId || 0, //"long //业主id  非必须 默认0",
          estateId: this.currentHouse.id, //"long //房产id   非必须 默认0",
          total: this.countPrice, //"int //总计",
          remarks: this.remarks, //"string //备注",
          orderName: "", //"string //订单名称",
          details: [],
          scene: 1, // 校验服务是否能重复购买，0不校验，1校验，默认0
          isCardPay: this.cardClick,
        };
        if (this.design.checked) {
          params.details.push({
            relationId: this.design.id, //"long //实体id",
            type: 2, //"int //实体类型   1材料  2服务   3专项付款",
            businessType: this.design.categoryTypeId, //"int //业务类型",
            workType: -2, //"int //工种类型",
            level: this.design.level, //"int //等级  1中级  2高级 3特级  4钻石",
            storeId: this.design.storeId, //"long //店铺id",
            storeType: 0, //"int //店铺类型 0普通 1设计师",
            number: this.currentHouse.insideArea, //"double //购买数量",
            params: "", //string //与订单无关的参数 如上门时间 doorTime"
          });
        }
        if (this.actuary.checked) {
          params.details.push({
            relationId: this.actuary.id, //"long //实体id",
            type: 2, //"int //实体类型   1材料  2服务   3专项付款",
            businessType: this.actuary.categoryTypeId, //"int //业务类型",
            workType: -2, //"int //工种类型",
            storeId: this.actuary.storeId, //"long //店铺id",
            storeType: 0, //"int //店铺类型 0普通 1设计师",
            number: this.currentHouse.insideArea, //"double //购买数量",
            params: "", //string //与订单无关的参数 如上门时间 doorTime"
          });
        }
        if (this.checkHouse.checked) {
          params.details.push({
            relationId: this.checkHouse.id, //"long //实体id",
            type: 2, //"int //实体类型   1材料  2服务   3专项付款",
            businessType: this.checkHouse.categoryTypeId, //"int //业务类型",
            workType: -2, //"int //工种类型",
            storeId: this.checkHouse.storeId, //"long //店铺id",
            storeType: 0, //"int //店铺类型 0普通 1设计师",
            number: this.currentHouse.insideArea, //"double //购买数量",
            params: {
              doorTime: this.checkHouse.doorTime,
            }, //string //与订单无关的参数 如上门时间 doorTime"
          });
        }
        this.createOrder(params);
      },
      createOrder(obj) {
        createOrder(obj).then((data) => {
          if (this.payWayTag && this.payType) {
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/cashier?remittanceCode=${data.companyTransferPayVO.remittanceCode}&amount=${data.companyTransferPayVO.amount}`
            })
            return;
          }
          const {
            wechatPayJsapi,
            cardPayComplete
          } = data;
          if (!cardPayComplete) {
            //#ifdef MP-WEIXIN
            uni.requestPayment({
              provider: "wxpay",
              ...wechatPayJsapi,
              success(res) {
                console.log("付款成功", res);
                uni.redirectTo({
                  url: `/sub-classify/pages/pay-order/pay-success`,
                });
              },
              fail(e) {
                console.log(e);
                const {
                  errMsg
                } = e;
                if (errMsg.indexOf("cancel") !== -1) {
                  uni.navigateTo({
                    url: `/sub-my/pages/my-order/my-order?index=1&firstEntry=true`,
                  });
                } else {
                  uni.showToast({
                    title: "支付失败",
                    icon: "none",
                    duration: 3000,
                  });
                }
                log({
                  type: "wx-pay-fail",
                  page: "no-house-decorate",
                  data: e,
                  openId: getApp().globalData.openId,
                  openIdLocal: uni.getStorageSync("openId"),
                });
              },
            });
            //#endif
            //#ifdef H5
            uni.navigateTo({
              url: `/sub-classify/pages/pay-order/pay-h5?payTal=${data.gomePayH5.payModeList[0].payTal}&totalPrice=${this.countPrice}&payRecordId=${data.payRecordId}`,
            });
            //#endif
          } else {
            uni.redirectTo({
              url: `/sub-classify/pages/pay-order/pay-success`,
            });
          }
        });
      },
      change(id, value) {
        if (id === "design") {
          if (!value) {
            this.checkServiceCardIsSlected("design");
          }
          this.design.checked = value;
        } else if (id === "actuary") {
          if (!value) {
            this.checkServiceCardIsSlected("actuary");
          }
          this.actuary.checked = value;
        } else if (id === "checkHouse") {
          if (!value) {
            this.checkServiceCardIsSlected("checkHouse");
          }
          this.checkHouse.checked = value;
        }
      },

      checkServiceCardIsSlected(type) {
        this.tips = {
          id: type,
          checked: true,
          content: "精算是将您的设计图内容转化为商品或服务消费的过程，是打扮家装修平台的特色服务；您也可以单独验房设计服务，之后再选择是否继续验房精算以及施工服务。",
        };
        this.$refs.tips.open("bottom");
      },
      setCardChecked(obj) {
        this[obj.id].checked = obj.checked;
        this.$refs.tips.close();
      },
      tipsClose() {
        this.$refs.tips.close();
      },
      goAddHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .recharge-row {
    margin-top: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    padding: 32rpx;
    font-size: 28rpx;
    border-radius: 32rpx;

    .row-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 32rpx;
    }
  }

  .mt26 {
    margin-top: 26rpx;
  }

  .select-disable {
    width: 36rpx;
    height: 36rpx;
    background: #f5f5f5;
    border: 1rpx solid #e8e8e8;
    border-radius: 50%;
    margin-left: 16rpx;
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
    border-radius: 32rpx;
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

  .pay-way .wechat_icon {
    vertical-align: sub;
    display: inline-block;
    width: 32rpx;
    height: 32rpx;
    background-image: url("../../static/wechat_icon.png");
    background-size: contain;
    margin-right: 12rpx;
    background-color: #fff;
  }

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
  }

  .remarks {
    overflow: hidden;
    margin-bottom: 16rpx;
    border-radius: 32rpx;
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

  .no-house-decorate {
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: felx-start;
    box-sizing: border-box;
    height: 100%;
  }

  .no-house-decorate.center {
    justify-content: center;
    align-items: center;
  }

  .content {
    height: 100%;
    padding-bottom: 250rpx;
    overflow: scroll;
  }

  .payment-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30rpx 32rpx 24rpx;
    background-color: #fff;
    box-sizing: border-box;
  }

  .addhouse-decs {
    padding-bottom: 54rpx;
  }

  .addhouse {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 278rpx;
    height: 88rpx;
    opacity: 1;
    background: #333333;
    border-radius: 48rpx;
    margin-top: 40rpx;

    image {
      width: 18rpx;
      height: 18rpx;
      opacity: 1;
      margin-right: 12rpx;
    }

    text {
      height: 40rpx;
      opacity: 1;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #fff;
      line-height: 40rpx;
    }
  }

  .decs {
    text-align: center;
    margin-top: 24rpx;

    text {
      height: 36rpx;
      opacity: 1;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #666666;
      line-height: 36rpx;
      letter-spacing: 2rpx;
    }
  }

  .radio-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10rpx 0;

    .radio-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 10rpx;
      font-size: 24rpx;

      text {
        text-indent: 10rpx;
      }
    }
  }

  .pay-way .more_pay_icon {
    vertical-align: middle;
    display: inline-block;
    width: 48rpx;
    height: 52rpx;
    background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/more_pay_icon.png");
    background-size: contain;
  }
</style>
<style>
  .uni-popup__info {
    font-size: 28rpx !important;
  }
</style>
