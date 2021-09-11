<template>
  <view class="no-house-decorate">
    <view class="content">
      <view class="addhouse-decs" v-if="!currentHouse && !currentHouse.id">
        <button class="addhouse" @click="goAddHouse">
          <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_add_house_info.svg"></image>
          <text>添加房屋信息</text>
        </button>
        <view class="decs"><text>打扮家按房子面积计算价格</text></view>
      </view>
      <my-current-house v-if="currentHouse && currentHouse.id" :houseData="currentHouse"
        @changCurrentHouse="changCurrentHouse">
      </my-current-house>
      <service-card :setting="design" class="service-card" @selectAnother="selectAnother('design')" @changeLevel="open">
        <template slot="check">
          <check-box :checked="design.checked" @change="(value)=> {change(design.cardtype, value)}">
          </check-box>
        </template>
      </service-card>
      <service-card :setting="actuary" class="service-card" @selectAnother="selectAnother('actuary')">
        <template slot="check">
          <check-box :checked="actuary.checked" @change="(value)=> {change(actuary.cardtype, value)}">
          </check-box>
        </template>
      </service-card>
    </view>
    <payment class="payment" @gotopay="gotopay" :pieces="pieces" :countPrice="countPrice" :isAllChecked="isAllChecked">
    </payment>
    <uni-popup ref="popup" type="dialog" :mask-click="false">
      <uni-popup-dialog mode="base" type="info" title="请选择您想要更换人工的等级" :duration="2000" :before-close="true"
        @close="close" @confirm="confirm">
        <view class="radio-wrap">
          <view class="radio-item">
            <dbj-radio value="1" :checked="selectLevel == 1" @change="radioChange"></dbj-radio>
            <text>中级</text>
          </view>
          <view class="radio-item">
            <dbj-radio value="2" :checked="selectLevel == 2" @change="radioChange"></dbj-radio>
            <text>高级</text>
          </view>
          <view class="radio-item">
            <dbj-radio value="3" :checked="selectLevel == 3" @change="radioChange"></dbj-radio>
            <text>特级</text>
          </view>
          <view class="radio-item">
            <dbj-radio value="4" :checked="selectLevel == 4" @change="radioChange"></dbj-radio>
            <text>钻级</text>
          </view>
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import ServiceCard from "../../components/service-card/service-card.vue";
  import Payment from "../../components/payment/payment.vue";
  import CheckBox from "../../components/check-box/check-box.vue";
  import DbjRadio from "../../components/dbj-radio/dbj-radio.vue";
  import MyCurrentHouse from "../../components/my-current-house/my-current-house.vue"
  import {
    queryEstates,
    getProductsSkusPage,
    getServiceSku
  } from "../../../api/decorate.js"
  export default {
    components: {
      ServiceCard,
      Payment,
      CheckBox,
      DbjRadio,
      MyCurrentHouse
    },
    data() {
      return {
        dataList: [],
        design: {
          title: "设计服务",
          cardtype: "design",
          checked: true,
          level: 1,
          price: 29.9,
          insideArea: 88,
          id: 1054,
          imageUrl: "https://ali-image-test.dabanjia.com//image/20210313/1615618135579_0296%24pexels-eberhard-grossgasteiger-1428277.jpg",
          name: "橙色",
          quantity: 1,
          serviceName: "设计服务",
          serviceType: 1,
          spuName: "韩永辉测试视频无法播放"
        },
        actuary: {
          title: "精算服务",
          cardtype: "actuary",
          checked: true,
          price: 59.9,
          insideArea: 88,
          categoryTypeId: 4,
          id: 38085,
          imageUrl: "https://ali-image-test.dabanjia.com//image/20210313/1615618135579_0296%24pexels-eberhard-grossgasteiger-1428277.jpg",
          name: "橙色",
          quantity: 1,
          serviceName: "设计服务",
          serviceType: 1,
          spuName: "韩永辉测试视频无法播放"
        },
        currentHouse: {},
        selectLevel: 1
      }
    },
    computed: {
      isAllChecked() {
        return this.design.checked || this.actuary.checked
      },
      pieces() {
        let num = this.design.checked + this.actuary.checked;
        return num
      },
      countPrice() {
        // let qian = 0.00
        // if (this.design.checked) {
        //   qian += parseFloat(this.design.price) * this.currentHouse.insideArea
        // }
        // if (this.actuary.checked) {
        //   qian += parseFloat(this.actuary.price) * this.currentHouse.insideArea
        // }
        // return qian + "0.00"
        let dprice = this.design.price || 29.9
        let aprice = this.design.price || 59.9
        return dprice * this.currentHouse.insideArea + aprice * this.currentHouse.insideArea
      }
    },
    onLoad() {
      uni.$on("selectedHouse", (data) => {
        console.log("selectedHouse:", data)
        this.currentHouse = data
      })
    },
    onShow() {
      this.getMyHouseList();
      const {
        noHouseActuaryId,
        noHouseDesignId
      } = getApp().globalData;
      // if (noHouseActuaryId || noHouseDesignId) {
      // this.getProductsSkusPage();
      // }
    },
    methods: {
      radioChange(obj) {
        this.selectLevel = obj.value
      },
      open() {
        this.$refs.popup.open('dialog')
      },
      close() {
        this.$refs.popup.close();
      },
      confirm(value) {
        // 输入框的值
        console.log(value)
        // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
        // ...
        this.$refs.popup.close()
        this.design.level = Number(this.selectLevel)
      },
      getServiceSku() {
        console.log(getApp().globalData)
        getServiceSku({
          codeKey: "decoration_default_service",
          province_id: 1,
          city_id: 1,
          area_id: 1,
          serveTypes: [1, 4]
        }).then(data => {
          const {
            noHouseActuaryId,
            noHouseDesignId
          } = getApp().globalData
          if (!noHouseDesignId) {
            let designData = data.filter(t => t.serviceType === 1 && t.categoryTypeId === 6)
            if (designData && designData.length > 0) {
              this.design = {
                ...designData[0],
                title: "设计服务",
                cardtype: "design",
                checked: true,
                level: 1,
                insideArea: this.currentHouse.insideArea
              }
            }
          }
          if (!noHouseActuaryId) {
            let actuaryData = data.filter(t => t.serviceType === 4)
            if (actuaryData && actuaryData.length > 0) {
              this.actuary = {
                ...actuaryData[0],
                title: "精算服务",
                cardtype: "actuary",
                checked: true,
                insideArea: this.currentHouse.insideArea
              }
            }
          }

          console.log("默认服务： ", this.design, this.actuary)
        })
      },
      getProductsSkusPage() {
        getProductsSkusPage({
          categoryTypeId: [5, 6]
        }).then(data => {
          this.dataList = data.list
          const {
            noHouseActuaryId,
            noHouseDesignId
          } = getApp().globalData
          // if( noHouseActuaryId ) {

          // } else {

          // }
          // data.list.forEach((item, idx) => {
          // 	if() {
          // 		this.actuary = {
          // 			...item,
          // 			cardtype: "actuary",
          // 			checked: true
          // 		}
          // 	}
          // })
          const {} =
          this.actuary = {
            ...data.list[0],
            title: "精算服务",
            cardtype: "actuary",
            checked: true,
          }
          this.design = {
            ...data.list[1],
            title: "设计服务",
            cardtype: "design",
            checked: true,
            level: 2
          }
        })
      },
      selectAnother(pp) {
        if (pp === "design") {
          uni.navigateTo({
            url: '/sub-decorate/pages/design-service-list/design-service-list?id=6'
          })
        }
        if (pp === "actuary") {
          uni.navigateTo({
            url: '/sub-decorate/pages/design-service-list/design-service-list?id=5'
          })
        }
      },
      changCurrentHouse() {
        uni.navigateTo({
          url: "/sub-my/pages/my-house/my-house"
        })
      },
      getMyHouseList() {
        queryEstates({
          isNeedRelative: true
        }).then(data => {
          let flt = data.filter(t => t.defaultEstate);
          if (flt && flt.length > 0) {
            this.currentHouse = flt[0]
          } else {
            this.currentHouse = {}
          }
          console.log("currentHouse", this.currentHouse)

          this.getServiceSku();
        })
      },
      gotopay() {
        // TODO去结算页面
        if (this.currentHouse && this.currentHouse.id) {
          uni.redirectTo({
            url: ""
          })
        } else {
          uni.showToast({
            title: "请您先添加房屋信息",
            icon: "none",
            duration: 3000
          })
        }
      },
      change(id, value) {
        if (id === "design") {
          this.design.checked = value;
        } else if (id === "actuary") {
          this.actuary.checked = value;
        }
      },
      goAddHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house"
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .no-house-decorate {
    background-color: #f2f5f8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: felx-start;
    box-sizing: border-box;
    height: 100%;
    // font-size: 20rpx;
  }

  .content {
    height: calc(100% - 250rpx);
  }

  .payment {
    padding: 24px 32rpx 92rpx;
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
</style>
<style>
  .uni-popup__info {
    font-size: 28rpx !important;
  }
</style>
