<template>
  <view class="process-cost">
    <view class="artificial">
      <view class="title">
        <view>人工费用（{{levels[artificialLevel].label }}）</view>
        <view class="change-level" @click="openPopUp">更换等级</view>
      </view>
      <view class="process-cost-list">
        <process-cost :key="index" :noArtificial="false" v-for="(item,index) in dataOrigin.artificial.categoryList"
          :content="item">
        </process-cost>
      </view>
    </view>
    <view class="material-cost">
      <view class="title">
        <view>辅材费用</view>
      </view>
      <view class="process-cost-list">
        <process-cost :key="index" v-for="(item,index) in dataOrigin.material.categoryList" :content="item"
          @change="selectWp">
        </process-cost>
      </view>
    </view>
    <view class="payment-wrap">
      <payment @gotopay="gotopay" :pieces="pieces" :countPrice="countPrice" :isAllChecked="isAllChecked"></payment>
    </view>
    <uni-popup ref="level">
      <change-level @changeLevel="setLevel" @close="close"></change-level>
    </uni-popup>
  </view>
</template>

<script>
  import ProcessCost from "../../components/process-cost/process-cost.vue"
  import Payment from "../../components/payment/payment.vue"
  import ChangeLevel from "../../components/change-level/change-level.vue"
  import {
    createOrder
  } from "../../../api/order-center.js"
  import {
    sellList
  } from "../../../api/decorate.js"
  export default {
    components: {
      ProcessCost,
      Payment,
      ChangeLevel
    },
    onLoad(option) {
      const {
        projectId,
        serveCardId,
        serviceName,
        serviceType,
        serveType,
        serveTypeName,
        estateId,
        roleType,
        customerId
      } = getApp().globalData.decorateMsg
      this.serveCardId = serveCardId || option.serveCardId
      this.estateId = estateId || option.estateId
      this.serviceType = serviceType || option.serviceType
      this.projectId = projectId || option.projectId
      this.customerId = customerId || option.customerId
    },
    onShow() {
      this.getDataList()
    },
    data() {
      return {
        serveCardId: null,
        serviceType: null,
        dataOrigin: {},
        checkedIds: [],
        shopping: {
          artificial: [],
          material: []
        },
        countPrice: 0,
        estateId: null,
        artificialLevel: 0,
        roleType: null,
        levels: [{
          label: "中级",
          value: 0
        }, {
          label: "高级",
          value: 1
        }, {
          label: "特高级",
          value: 2
        }, {
          label: "钻石",
          value: 3
        }],
      }
    },
    computed: {
      isAllChecked() {
        return this.shopping.artificial.length > 0 || this.shopping.material.length > 0
      },
      pieces() {
        return this.shopping.artificial.length + this.shopping.material.length
      },
    },
    methods: {
      openPopUp() {
        this.$refs.level.open("bottom")
      },
      computePriceAndShopping() {
        // 先清空
        this.shopping = {
          artificial: [],
          material: []
        },
        this.countPrice = 0
        // 先计算人工费用
        this.dataOrigin.artificial.categoryList.forEach((item, i) => {
          item.itemList.forEach((it, j) => {
            this.shopping.artificial.push(it)
            this.countPrice += it.price * it.count / 100
          })
        })
        // debugger
        // 再计算辅材费用
        this.dataOrigin.material.categoryList.forEach((item, i) => {
          item.itemList.forEach((it, j) => {
            if (this.checkedIds.includes(it.productId)) {
              this.shopping.material.push(it)
              this.countPrice += it.price * it.count / 100
            }
          })
        })
        // this.countPrice = temp
        console.log(this.shopping, this.countPrice)
        // return temp
      },
      getDataList() {
        sellList({
          serveId: this.serveCardId,
          type: this.serviceType,
        }).then(data => {
          this.dataOrigin = data
          this.dataOrigin.artificial.categoryList.forEach(t => {
            t.itemList.forEach(it => {
              this.checkedIds.push(it.productId)
            })
          })
          this.dataOrigin.material.categoryList.forEach(t => {
            t.itemList.forEach(it => {
              this.checkedIds.push(it.productId)
            })
          })
          this.computePriceAndShopping()
        })
      },
      selectWp(obj) {
        console.log(obj)
        const {
          val,
          productIds
        } = obj
        if (val) {
          for (let i = 0; i < productIds.length; i++) {
            if (!this.checkedIds.includes(productIds[i])) {
              this.checkedIds.push(productIds[i])
            }
          }
        } else {
          for (let i = 0; i < productIds.length; i++) {
            if (this.checkedIds.includes(productIds[i])) {
              this.checkedIds.splice(i, 1)
            }
          }
        }
        this.computePriceAndShopping()
        // console.log(this.checkedIds)
      },
      gotopay() {
        // TODO去结算页面
        if (this.shopping.artificial.length > 0 || this.shopping.material.length > 0) {
          let params = {
            payType: 1, //"int //支付方式  1微信支付",
            openid: uni.getStorageSync("openId"), //"string //微信openid 小程序支付用 app支付不传或传空",
            projectId: this.projectId, //"long //项目id  非必须 默认0",
            customerId: this.customerId, //"long //业主id  非必须 默认0",
            estateId: this.estateId, //"long //房产id   非必须 默认0",
            total: this.countPrice * 100, //"int //总计",
            remarks: "", //"string //备注",
            orderName: "管家工序费", //"string //订单名称",
            details: []
          }
          // roleType 7工人，10管家
          let roleType = this.serviceType == 5 ? 10 : 7

          this.shopping.artificial.forEach(it => {
            params.details.push({
              supplierType: it.supplierType,
              roleType,
              relationId: it.productId, //"long //实体id",
              type: 2, //"int //实体类型   1材料  2服务   3专项付款",
              businessType: it.categoryTypeId, //"int //业务类型",
              workType: it.workType, //"int //工种类型",
              level: this.artificialLevel, //"int //等级  0中级  1高级 2特级  3钻石",
              storeId: it.storeId, //"long //店铺id",
              storeType: 0, //"int //店铺类型 0普通 1设计师",
              number: it.count, //"double //购买数量",
              params: "", //string //与订单无关的参数 如上门时间 doorTime"
            })
          })
          this.shopping.material.forEach(it => {
            params.details.push({
              supplierType: it.supplierType,
              relationId: it.productId, //"long //实体id",
              type: 1, //"int //实体类型   1材料  2服务   3专项付款",
              businessType: 1, //it.categoryTypeId, //"int //业务类型",辅材的businessType固定为1
              workType: it.workType, //"int //工种类型",
              level: 0, //"int //等级  0中级  1高级 2特级  3钻石",
              storeId: it.storeId, //"long //店铺id",
              storeType: 0, //"int //店铺类型 0普通 1设计师",
              number: it.count, //"double //购买数量",
              params: "", //string //与订单无关的参数 如上门时间 doorTime"
            })
          })
          this.createOrder(params)
        } else {
          uni.showToast({
            title: "请您先选择人工",
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
              uni.switchTab({
                url: "/pages/decorate/index/index"
              })
            },
            fail(e) {
              console.log(e);
            },
          });
        })
      },
      setLevel(value) {
        this.artificialLevel = value
        console.log(value)
        this.close()
      },
      close() {
        this.$refs.level.close()
      }
    }
  }
</script>

<style scoped lang="scss">
  .process-cost {
    position: relative;
    height: 100%;
    background-color: #fff;
  }

  .title {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    height: 112rpx;
    padding: 48rpx 32rpx 24rpx;
    background: #f5f6f6;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 40rpx;

    .change-level {
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #999999;
      line-height: 34rpx;
    }
  }

  .process-cost-list {
    padding: 0 32rpx;
  }

  .payment-wrap {
    position: fixed;
    bottom: 68rpx;
    left: 32rpx;
    width: calc(100% - 64rpx)
  }
</style>
