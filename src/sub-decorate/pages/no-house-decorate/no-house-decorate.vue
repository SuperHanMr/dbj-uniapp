<template>
  <view class="no-house-decorate">
    <view class="content" v-if="noData === 1">
      <view class="addhouse-decs" v-if="!currentHouse.id">
        <button class="addhouse" @click="goAddHouse">
          <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_add_house_info.svg"></image>
          <text>添加房屋信息</text>
        </button>
        <view class="decs"><text>打扮家按房子面积计算价格</text></view>
      </view>
      <my-current-house v-if="currentHouse && currentHouse.id" :houseData="currentHouse"
        @changCurrentHouse="changCurrentHouse">
      </my-current-house>
      <service-card v-if="(sssType == 'decorate' || sssType == 'design') && design.id" :setting="design"
        class="service-card" @selectAnother="selectAnotherHandler('design')" @changeLevel="open">
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
    </view>
    <payment v-if="noData === 1" class="payment" @gotopay="gotopay" :pieces="pieces" :countPrice="countPrice" :isAllChecked="isAllChecked">
    </payment>
    <no-data v-if="noData === 0" words="当前城市暂未开通此服务,敬请期待~"></no-data>
    <uni-popup ref="level">
      <change-level @changeLevel="setLevel" @close="close" :dataList="levelList" :current="levelList[0]"></change-level>
    </uni-popup>
    <uni-popup ref="tips">
      <cancel-tip :tips="tips" @result="setCardChecked" @close="tipsClose"></cancel-tip>
    </uni-popup>
    <uni-popup ref="doorTime">
      <door-time-date @getTime="setDoorTime" @close="closeDoorTimePopup"></door-time-date>
    </uni-popup>
  </view>
</template>

<script>
  import ServiceCard from "../../components/service-card/service-card.vue";
  import Payment from "../../components/payment/payment.vue";
  import CheckBox from "../../components/check-box/check-box.vue";
  import DbjRadio from "../../components/dbj-radio/dbj-radio.vue";
  import MyCurrentHouse from "../../components/my-current-house/my-current-house.vue";
  import CancelTip from "./cancel-tip.vue"
  import DoorTimeDate from "../../components/door-time-date/door-time-date.vue"
  import ChangeLevel from "../../components/change-level/change-level.vue"
  import NoData from "../../components/no-data/no-data.vue"
  import {
    queryEstates,
    getServiceSku
  } from "../../../api/decorate.js"
  import {
    queryMaxLevel,
    changeLevel
  } from "../../../api/level.js"

  import {
    createOrder
  } from "../../../api/order-center.js"

  const TYPE = {
    decorate: "装修服务",
    design: "设计服务",
    actuary: "精算服务",
    checkHouse: "验房服务",
  }

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
      NoData
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
          value: null
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
        defaultHouse: {},
        noData: -1
      }
    },
    computed: {
      isAllChecked() {
        return this.design.checked || this.actuary.checked || this.checkHouse.checked
      },
      pieces() {
        let num = this.design.checked + this.actuary.checked + this.checkHouse.checked;
        return num
      },
      countPrice() {
        let dprice = 0
        let aprice = 0
        let chprice = 0
        if (this.design.checked) {
          dprice = this.design.price / 100 || 0
        }
        if (this.actuary.checked) {
          aprice = this.actuary.price / 100 || 0
        }
        if (this.checkHouse.checked) {
          chprice = this.checkHouse.price / 100 || 0
        }
        let insideArea = this.currentHouse.insideArea || 1
        let temp = dprice * insideArea + aprice * insideArea + chprice * insideArea
        return temp
      }
    },
    onLoad(option) {
      uni.$on("selectedHouse", (data) => {
        console.log("selectedHouse:", data)
        this.selectHouseData = data
      })
      uni.$on("selectedServer", (data) => {
        const {
          serviceType,
          values
        } = data
        this.selectedServer = data
      })
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
      } = getApp().globalData.decorateMsg
      const {
        type,
      } = option
      this.sssType = type || this.getType(serviceType)

      if (option.isDecorate) {
        this.projectId = Number(option.projectId)
      } else {
        this.projectId = projectId
      }

      this.serveType = serveType
      this.estateId = Number(estateId) || Number(option.estateId)
      this.customerId = customerId
      this.provinceId = provinceId //省id
      this.cityId = cityId //市id
      this.areaId = areaId
      uni.setNavigationBarTitle({
        title: TYPE[type]
      })
    },
    onShow() {
      if (this.sssType == "decorate") {
        this.design.checked = true
        this.actuary.checked = true
      }
      if (this.sssType == "design") {
        this.design.checked = true
      }
      if (this.sssType == "actuary") {
        this.actuary.checked = true
      }
      if (this.sssType == "checkHouse") {
        this.checkHouse.checked = true
      }
      if (!this.selectHouseData.id) {
        this.getMyHouseList();
      } else {
        this.currentHouse = this.selectHouseData
        this.getServiceSku()
      }
      this.defaultHouse = getApp().globalData.currentHouse
    },
    methods: {
      setDoorTime(value) {
        this.checkHouse.doorTime = value
        this.checkHouse = JSON.parse(JSON.stringify(this.checkHouse))
      },
      openDoorTimePopup() {
        this.$refs.doorTime.open('bottom')
      },
      closeDoorTimePopup() {
        this.$refs.doorTime.close()
      },
      getType(num) {
        if (num == 1) {
          return "design"
        }
        if (num == 2) {
          return "checkHouse"
        }
        if (num == 4) {
          return "actuary"
        }
      },
      radioChange(obj) {
        this.selectLevel = obj.value
      },
      open() {
        this.$refs.level.open('bottom')
      },
      setLevel(levelObj) {
        this.design.level = levelObj.value
        this.design.price = levelObj.price
        console.log(this.design.level, this.design.price)
        this.close()
      },
      close() {
        this.$refs.level.close()
      },
      editField(original, source) {
        // original.appointmentRequired = 可以用原来的吗 //是否需要预约上门时间
        original.categoryId = source.product.category.category1Id
        original.category4Id = source.product.category.category4Id
        original.categoryTypeId = source.product.categoryTypeId
        // original.deposit =  source.product.sku.deposit
        original.id = source.product.skuId
        original.spuId = source.product.spuId
        original.imageUrl = source.product.skuImage
        original.name = source.product.skuName
        original.price = source.product.skuPrice
        original.productType = source.product.productType
        // original.quantity =  数量
        // original.serviceName =  可以用原来的吗
        // original.serviceType =  可以用原来的吗
        original.spuName = source.product.spuName
        original.storeId = source.product.storeId
      },
      changeLevel() {
        let tmp = {
          cityId: this.currentHouse.cityId || this.defaultHouse.cityId,
          price: this.design.price,
          count: 1,
          categoryTypeId: this.design.categoryTypeId,
          skuId: this.design.id
        }
        if (this.design.categoryTypeId === 7) {
          tmp.workerType = this.design.workerType
        }
        changeLevel(tmp).then(data => {
          this.levelList = data.map(t => {
            return {
              value: t.level,
              label: t.levelName,
              totalPrice: t.totalPrice,
              price: t.price
            }
          })
        })
      },
      getServiceSku() {
        let params = {
          province_id: this.currentHouse.provinceId || this.defaultHouse.provinceId,
          city_id: this.currentHouse.cityId || this.defaultHouse.cityId,
          area_id: this.currentHouse.areaId || this.defaultHouse.areaId,
          // serveTypes: [1, 2, 4]
        }
        if (this.sssType == "checkHouse") {
          params.serveTypes = [2]
        }
        getServiceSku(params).then(data => {
          const {
            serviceType,
            values
          } = this.selectedServer
          this.design = {
            checked: false,
          }
          this.checkHouse = {
            checked: false,
          }
          this.actuary = {
            checked: false,
          }
          if (serviceType == 1) {
            this.design = {
              title: "设计服务",
              cardtype: "design",
              checked: true,
              level: 1,
              insideArea: this.currentHouse.insideArea
            }
            this.editField(this.design, values)
            this.changeLevel()
          } else {
            let designData = data.filter(t => t.serviceType === 1)
            if (designData && designData.length > 0) {
              this.design = {
                ...designData[0],
                title: "设计服务",
                cardtype: "design",
                checked: this.sssType == "decorate" || this.sssType == "design",
                level: 1,
                insideArea: this.currentHouse.insideArea
              }
              this.changeLevel()
            }
          }
          if (serviceType == 2) {
            this.checkHouse = {
              title: "验房服务",
              cardtype: "checkHouse",
              checked: true,
              insideArea: this.currentHouse.insideArea
            }
            this.editField(this.checkHouse, values)
          } else {
            let checkHouseData = data.filter(t => t.serviceType === 2)
            if (checkHouseData && checkHouseData.length > 0) {
              this.checkHouse = {
                ...checkHouseData[0],
                title: "验房服务",
                cardtype: "checkHouse",
                checked: this.sssType == "checkHouse",
                insideArea: this.currentHouse.insideArea
              }
            }
          }
          if (serviceType == 4) {
            this.actuary = {
              title: "精算服务",
              cardtype: "actuary",
              checked: true,
              insideArea: this.currentHouse.insideArea
            }
            this.editField(this.actuary, values)
          } else {
            let actuaryData = data.filter(t => t.serviceType === 4)
            if (actuaryData && actuaryData.length > 0) {
              this.actuary = {
                ...actuaryData[0],
                title: "精算服务",
                cardtype: "actuary",
                checked: this.sssType == "decorate" || this.sssType == "actuary",
                insideArea: this.currentHouse.insideArea
              }
            }
          }
          if (this.design?.id || this.actuary?.id || this.actuary?.id) {
            this.noData = 1
          } else {
            this.noData = 0
          }
          console.log("默认服务： ", this.design, this.actuary, this.checkHouse)
        })
      },

      selectAnotherHandler(pp) {
        let str = ""
        let areaId = this.currentHouse.areaId || this.defaultHouse.areaId
        if (pp === "design") {
          str =
            `/sub-decorate/pages/service-list/service-list?name=设计服务&serviceType=1&areaId=${areaId}&insideArea=${this.currentHouse.insideArea}&spuId=${this.design.spuId}&categoryId=${this.design.category4Id}&unitId=${this.design.unitId}`
        }
        if (pp === "checkHouse") {
          str =
            `/sub-decorate/pages/service-list/service-list?name=验房服务&serviceType=2&areaId=${areaId}&insideArea=${this.currentHouse.insideArea}&spuId=${this.checkHouse.spuId}&categoryId=${this.checkHouse.category4Id}&unitId=${this.checkHouse.unitId}`
        }
        if (pp === "actuary") {
          str =
            `/sub-decorate/pages/service-list/service-list?name=精算服务&serviceType=4&areaId=${areaId}&insideArea=${this.currentHouse.insideArea}&spuId=${this.actuary.spuId}&categoryId=${this.actuary.category4Id}&unitId=${this.actuary.unitId}`
        }
        uni.navigateTo({
          url: str
        })
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
          if (!data || (typeof data == "array" && data.length < 1)) {
            this.currentHouse = {}
          } else {
            let flt = null
            if (this.estateId) {
              flt = data.filter(t => t.id == this.estateId);
            } else {
              // flt = this.defaultHouse
              flt = data.filter(t => t.id == this.defaultHouse?.id);
            }
            if (flt && flt.length > 0) {
              this.currentHouse = flt[0]
            } else {
              this.currentHouse = data[0]
            }
            // 如果是从无房屋进来的，那么需要把首页的房产初始化下
            if(!this.defaultHouse.id) {
              let item = data.find(t => t.defaultHouse)
              item = item ?? data[0] 
              uni.$emit('currentHouseChange', item)
              getApp().globalData.currentHouse = item;
            }
            console.log("currentHouse", this.currentHouse)
          }

          this.getServiceSku();
        })
      },
      gotopay() {
        // TODO去结算页面
        if (this.currentHouse && this.currentHouse.id) {
          // let skuInfos = []
          let params = {
            payType: 1, //"int //支付方式  1微信支付",
            openid: uni.getStorageSync("openId"), //"string //微信openid 小程序支付用 app支付不传或传空",
            projectId: this.projectId || 0, //"long //项目id  非必须 默认0",
            customerId: this.customerId || 0, //"long //业主id  非必须 默认0",
            estateId: this.currentHouse.id, //"long //房产id   非必须 默认0",
            total: this.countPrice * 100, //"int //总计",
            remarks: "", //"string //备注",
            orderName: "", //"string //订单名称",
            details: [],
            scene: 1 // 校验服务是否能重复购买，0不校验，1校验，默认0
          }
          if (this.design.checked) {
            // skuInfos.push({
            //   skuId: this.design.id,//"long //商品id",
            //   storeId: this.design.storeId,//"long //店铺id",
            //   buyCount: this.currentHouse.insideArea,//"double //购买数量",
            //   unit: "平米",//"string //单位",
            //   level: this.design.level,//"int //等级"
            // })
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
            })
          }
          if (this.actuary.checked) {
            // skuInfos.push({
            //   skuId: this.actuary.id,//"long //商品id",
            //   storeId: this.actuary.storeId,//"long //店铺id",
            //   buyCount: this.currentHouse.insideArea,//"double //购买数量",
            //   unit: "平米",//"string //单位",
            //   level: 1,//"int //等级"
            // })
            params.details.push({
              relationId: this.actuary.id, //"long //实体id",
              type: 2, //"int //实体类型   1材料  2服务   3专项付款",
              businessType: this.actuary.categoryTypeId, //"int //业务类型",
              workType: -2, //"int //工种类型",
              storeId: this.actuary.storeId, //"long //店铺id",
              storeType: 0, //"int //店铺类型 0普通 1设计师",
              number: this.currentHouse.insideArea, //"double //购买数量",
              params: "", //string //与订单无关的参数 如上门时间 doorTime"
            })
          }
          if (this.checkHouse.checked) {
            // skuInfos.push({
            //   skuId: this.checkHouse.id,//"long //商品id",
            //   storeId: this.checkHouse.storeId,//"long //店铺id",
            //   buyCount: this.currentHouse.insideArea,//"double //购买数量",
            //   unit: "平米",//"string //单位",
            //   level: 1,//"int //等级"
            // })
            params.details.push({
              relationId: this.checkHouse.id, //"long //实体id",
              type: 2, //"int //实体类型   1材料  2服务   3专项付款",
              businessType: this.checkHouse.categoryTypeId, //"int //业务类型",
              workType: -2, //"int //工种类型",
              storeId: this.checkHouse.storeId, //"long //店铺id",
              storeType: 0, //"int //店铺类型 0普通 1设计师",
              number: this.currentHouse.insideArea, //"double //购买数量",
              params: {doorTime: this.checkHouse.doorTime}, //string //与订单无关的参数 如上门时间 doorTime"
            })
          }
          this.createOrder(params)
          // uni.navigateTo({
          //   url: "/sub-classify/pages/pay-order/index",
          //   success: (res) => {
          //     res.eventChannel.emit('acceptDataFromOpenerPage', {
          //       skuInfos,
          //       originFrom: "decorate",
          //       estateId: this.currentHouse.id
          //     })
          //   }
          // })
        } else {
          uni.showToast({
            title: "请您先添加房屋信息",
            icon: "none",
            duration: 3000
          })
        }
      },
      createOrder(obj) {
        createOrder(obj).then(data => {
          const {
            wechatPayJsapi
          } = data
          uni.requestPayment({
            provider: "wxpay",
            ...wechatPayJsapi,
            success(res) {
              console.log("付款成功", res)
              uni.navigateBack({

              })
            },
            fail(e) {
              console.log(e);
            },
          });
        })
      },
      change(id, value) {
        if (id === "design") {
          if (!value) {
            this.checkServiceCardIsSlected("design")
          }
          this.design.checked = value;

        } else if (id === "actuary") {
          if (!value) {
            this.checkServiceCardIsSlected("actuary")
          }
          this.actuary.checked = value;
        } else if (id === "checkHouse") {
          if (!value) {
            this.checkServiceCardIsSlected("checkHouse")
          }
          this.checkHouse.checked = value;
        }

      },

      checkServiceCardIsSlected(type) {
        this.tips = {
          id: type,
          checked: true,
          content: "精算是将您的设计图内容转化为商品或服务消费的过程，是打扮家装修平台的特色服务；您也可以单独验房设计服务，之后再选择是否继续验房精算以及施工服务。"
        }
        this.$refs.tips.open("bottom")
      },
      setCardChecked(obj) {
        this[obj.id].checked = obj.checked
        this.$refs.tips.close()
      },
      tipsClose() {
        this.$refs.tips.close()
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
