<template>
  <view class="process-cost">
    <view class="artificial" v-if="msg.obtainType != 2">
      <view class="title">
        <view>人工费用（{{levelList.length > 0 ? LEVEL[artificialLevel - 1].label : (dataOrigin.artificial.grade || "无等级")}}）</view>
        <view class="change-level" @click="openPopUp">更换等级</view>
      </view>
      <view class="process-cost-list">
        <process-cost-artificial :key="index" v-for="(item,index) in dataOrigin.artificial.categoryList"
          :content="item">
        </process-cost-artificial>
      </view>
      <no-data v-if="noData" :words="message"></no-data>
    </view>
    <view class="material-cost" :style="{paddingBottom:containerBottom * 2 + 48 + 88 + 'rpx'}"
      v-if="msg.obtainType != 1">
      <view class="title">
        <view>辅材费用</view>
      </view>
      <view class="process-cost-list">
        <process-cost-materials :key="index" v-for="(item,index) in dataOrigin.material.categoryList" :content="item"
          @change="selectWp" @changeMaterial="changeMaterial">
        </process-cost-materials>
      </view>
      <no-data v-if="noData" :words="message"></no-data>
    </view>
    <view class="payment-wrap" :style="{paddingBottom:systemBottom,height:systemHeight}">
      <payment @gotopay="gotopay" :pieces="pieces" :countPrice="countPrice" :isAllChecked="isAllChecked"></payment>
    </view>
    <uni-popup ref="level">
      <change-level @changeLevel="setLevel" @close="close" :dataList="levelList" :current="levelList[0]"></change-level>
    </uni-popup>
  </view>
</template>

<script>
  import ProcessCostArtificial from "../../components/process-cost/process-cost-artificial.vue"
  import ProcessCostMaterials from "../../components/process-cost/process-cost-materials.vue"
  import Payment from "../../components/payment/payment.vue"
  import ChangeLevel from "../../components/change-level/change-level.vue"
  import NoData from "../../components/no-data/no-data.vue"
  import {
    LEVEL
  } from "../../../utils/dict.js"
  import {
    createOrder
  } from "../../../api/order-center.js"
  import {
    sellList
  } from "../../../api/decorate.js"
  import {
    batchChangeLevel
  } from "../../../api/level.js"

  export default {
    components: {
      ProcessCostArtificial,
      Payment,
      ChangeLevel,
      ProcessCostMaterials,
      NoData
    },
    onLoad(option) {
      const {
        partpay
      } = option
      if (partpay) {
        this.msg = {
          ...option
        }
      } else {
        this.msg = getApp().globalData.decorateMsg
      }
    },
    onShow() {
      this.getDataList()
      uni.setNavigationBarTitle({
        title: this.msg.pushTitle
      })
    },
    data() {
      return {
        msg: {},
        dataOrigin: {},
        checkedIds: [],
        shopping: {
          artificial: [],
          material: []
        },
        countPrice: 0,
        pieces: 0,
        artificialLevel: 1,
        curr_artificial_categoryId: null,
        levelList: [],
        workerLevelSkuMapping: [],
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
        noData: false,
        message: null,
        skuRelation: [], // 精算单更换商品  新旧商品id对照表
      }
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
      this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
    },
    computed: {
      isAllChecked() {
        return this.checkedIds.length > 0
      },
    },
    methods: {
      changeMaterial(values) {
        const {
          categoryType,
          item
        } = values
        this.$nextTick(() => {
          for (let i = 0; i < this.dataOrigin.material.categoryList.length; i++) {
            if (this.dataOrigin.material.categoryList[i].categoryType == categoryType) {
              for (let j = 0; j < this.dataOrigin.material.categoryList[i].itemList.length; j++) {
                if (this.dataOrigin.material.categoryList[i].itemList[j].id == item.id) {
                  this.dataOrigin.material.categoryList[i].itemList[j] = item

                  // 添加新旧id对应关系
                  const flgArr = this.skuRelation.filter(t => t.originalId == item.originalId)
                  if (flgArr?.length > 0) {
                    // 如果是已经存在了新旧id对应关系，则替换新的id
                    flgArr[0].newSuk = item.id
                  } else {
                    // 否则就是第一次替换
                    this.skuRelation.push({
                      oldSuk: item.originalId,
                      newSuk: item.id
                    })
                  }
                  break
                }
              }
            }
          }
        })
        this.dataOrigin.material.categoryList = JSON.parse(JSON.stringify(this.dataOrigin.material.categoryList))
        this.computePriceAndShopping()
      },
      openPopUp() {
        if(this.levelList.length > 0) {
          this.$refs.level.open("bottom")
        } else {
          uni.showToast({
            icon: "none",
            title: "无等级可替换"
          })
        }
        
      },
      computePriceAndShopping() {
        // 先清空
        this.shopping = {
          artificial: [],
          material: []
        }
        this.countPrice = 0
        this.pieces = 0

        if (this.msg.obtainType != 2) {
          // 先计算人工费用
          this.dataOrigin.artificial.categoryList.forEach((item, i) => {
            item.itemList.forEach((it, j) => {
              this.shopping.artificial.push(it)
              this.countPrice += it.price * it.count / 100
              this.pieces += it.count
            })
          })
        }

        if (this.msg.obtainType != 1) {
          // 再计算辅材费用
          this.dataOrigin.material.categoryList.forEach((item, i) => {
            item.itemList.forEach((it, j) => {
              if (this.checkedIds.includes(it.id)) {
                this.shopping.material.push(it)
                this.countPrice += it.price * it.count / 100
                this.pieces += it.count
              }
            })
          })
        }
        // this.countPrice = temp
        console.log(this.shopping, this.countPrice)
        // return temp
      },
      batchChangeLevel(cllist) {
        batchChangeLevel({
          changeLevelDetailList: cllist
        }).then(data => {
          if (data && data.length > 0) {
            let list = []
            // 取第一项查询所有等级
            data[0].changeLevelDetailList.forEach(itm => {
              list.push({
                value: itm.level,
                label: itm.levelName
              })
            })
            data.forEach(workerSku => {
              // 储存所有工人对应的等级列表和溢价价格
              workerSku.changeLevelDetailList.forEach(levelItem => {
                this.workerLevelSkuMapping.push({
                  ...levelItem,
                  skuId: workerSku.skuId
                })
              })

              workerSku.changeLevelDetailList.forEach(itm => {
                let level = list.filter(l => l.value = itm.level)[0]
                level.totalPrice += itm.totalPrice / 100
              })
            })
            this.levelList = list
            
          }
        })
      },
      getDataList() {
        this.noData = false
        sellList({
          projectId: this.msg.projectId,
          type: this.msg.serviceType,
          obtainType: this.msg.obtainType
        }).then(data => {
          this.dataOrigin = data
          if (this.dataOrigin?.artificial?.categoryList?.length > 0) {
            let cllist = []
            this.dataOrigin?.artificial?.categoryList?.forEach(category => {
              category?.itemList.forEach(t => {
                let obj = {
                  skuId: t.id, //"long //商品id【必须】",
                  cityId: this.dataOrigin.areaId, //"long //市id【必须】",
                  categoryTypeId: t.categoryTypeId, //"int //商品品类类型id【必须】",
                  price: t.price, //"int //商品总价格 工艺商品单价个数 单位分【必须】",
                  count: t.count,
                  // workerType: t.workType, //"int //工种,品类为工人时（categoryTypeId=7）必传
                }
                if (t.categoryTypeId == 7) {
                  obj.workerType = t.workType
                }
                cllist.push(obj)
              })
            })
            if (cllist.length > 0) {
              this.batchChangeLevel(cllist)
            }
          }
          this.initData()
        }).catch(err => {
          const {
            data
          } = err
          if (data && data.code !== 1) {
            this.noData = true
            this.message = data.message
          }
        })
      },
      initData() {
        if (this.msg.obtainType != 2) {
          this.dataOrigin.artificial.categoryList.forEach(t => {
            t.itemList.forEach(it => {
              this.checkedIds.push(it.id)
            })
          })
        }

        if (this.msg.obtainType != 1) {
          this.dataOrigin.material.categoryList.forEach(t => {
            t.itemList.forEach(it => {
              it.checked = true
              it.isEdit = false
              if (it.inServiceArea && !it.selling) {
                this.checkedIds.push(it.id)
              }
            })
          })
        }

        this.computePriceAndShopping()
      },
      selectWp(obj) {
        this.$nextTick(function() {
          console.log(obj)
          const {
            val,
            id
          } = obj
          let arr = this.checkedIds
          if (val) {
            if (!arr.includes(id)) {
              arr.push(id)
            }
          } else {
            if (arr.includes(id)) {
              const i = arr.indexOf(id)
              arr.splice(i, 1)
            }
          }
          this.checkedIds = arr
          this.computePriceAndShopping()
        })
      },
      gotopay() {
        // TODO去结算页面
        // let skuInfos = []
        if (this.shopping.artificial.length > 0 || this.shopping.material.length > 0) {
          let params = {
            payType: 1, //"int //支付方式  1微信支付",
            openid: uni.getStorageSync("openId"), //"string //微信openid 小程序支付用 app支付不传或传空",
            projectId: Number(this.msg.projectId), //"long //项目id  非必须 默认0",
            customerId: Number(this.msg.customerId), //"long //业主id  非必须 默认0",
            estateId: Number(this.msg.estateId), //"long //房产id   非必须 默认0",
            total: this.countPrice * 100, //"int //总计",
            remarks: "", //"string //备注",
            orderName: "管家工序费", //"string //订单名称",
            details: []
          }
          // roleType 7工人，10管家
          let roleType = this.msg.serviceType == 5 ? 10 : 7
          if (this.msg.obtainType != 2) {
            this.shopping.artificial.forEach(it => {
              // skuInfos.push({
              //   skuId: it.id, //"long //商品id",
              //   storeId: it.storeId, //"long //店铺id",
              //   buyCount: it.count, //"double //购买数量",
              //   unit: "件", //"string //单位",
              //   level: this.artificialLevel, //"int //等级"
              // })
              params.details.push({
                // supplierType: it.supplierType,
                roleType,
                relationId: it.id, //"long //实体id",
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
          }
          if (this.msg.obtainType != 1) {
            this.shopping.material.forEach(it => {
              // skuInfos.push({
              //   skuId: it.id, //"long //商品id",
              //   storeId: it.storeId, //"long //店铺id",
              //   buyCount: it.count, //"double //购买数量",
              //   unit: "件", //"string //单位",
              //   level: 1, //"int //等级"
              // })
              params.details.push({
                // supplierType: it.supplierType,
                relationId: it.id, //"long //实体id",
                type: 1, //"int //实体类型   1材料  2服务   3专项付款",
                businessType: 1, //it.categoryTypeId, //"int //业务类型",辅材的businessType固定为1
                workType: it.workType, //"int //工种类型",
                level: 1, //"int //等级  0中级  1高级 2特级  3钻石",
                storeId: it.storeId, //"long //店铺id",
                storeType: 0, //"int //店铺类型 0普通 1设计师",
                number: it.count, //"double //购买数量",
                params: {
                  skuRelation: this.skuRelation
                }, //string //与订单无关的参数 如上门时间 doorTime"
              })
            })
          }
          // uni.navigateTo({
          //   url: "/sub-classify/pages/pay-order/index",
          //   success: (res) => {
          //     res.eventChannel.emit('acceptDataFromOpenerPage', {
          //       skuInfos,
          //       originFrom: "processcost",
          //       estateId: this.estateId
          //     })
          //   }
          // })
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
      setLevel(levelObj) {
        this.artificialLevel = levelObj.value

        this.dataOrigin?.artificial?.categoryList?.forEach(category => {
          category.itemList.forEach(item => {
            let temp = this.workerLevelSkuMapping.filter(t => t.skuId === item.id && levelObj.value === t.level)
            if (temp?.length > 0) {
              item.price = temp[0].price
            }
          })
        })
        
        this.close()
        this.computePriceAndShopping()
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
    background-color: #fff;
  }

  .payment-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 24rpx 32rpx;
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
