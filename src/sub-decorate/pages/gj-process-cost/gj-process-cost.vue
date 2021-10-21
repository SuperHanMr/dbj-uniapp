<template>
  <view class="process-cost">
    <view class="artificial" v-if="msg.payStatus == 2 || msg.obtainType != 2">
      <view class="title">
        <view>人工费用{{levelLabel}}
        </view>
        <view v-if="msg.payStatus != 2 && levelList.length > 0" class="change-level" @click="openPopUp">更换等级</view>
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
        <process-cost-materials :areaId="dataOrigin.areaId" :key="index"
          v-for="(item,index) in dataOrigin.material.categoryList" :content="item" @change="selectWp"
          @changeMaterial="changeMaterial">
        </process-cost-materials>
      </view>
      <no-data v-if="noData" :words="message"></no-data>
    </view>
    <view v-if="!msg.payStatus || msg.payStatus != 2" class="payment-wrap" :style="{paddingBottom:systemBottom,height:systemHeight}">
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
        this.partpay = partpay
      } else {
        console.log(getApp().globalData.decorateMsg)
        this.msg = getApp().globalData.decorateMsg
      }
      uni.$on("selectedMaterial", this.selectedMaterialCb)
    },
    onShow() {
      if (this.selectedMaterialData?.categoryId) {
        const {
          origin,
          categoryId
        } = this.selectedMaterialData
        this.setMaterial(categoryId, origin)
      } else {
        this.getDataList()
        let title = ""
        switch (Number(this.msg.serviceType)) {
          case 5:
            title = "管家工序费"
            break
          case 6:
            title = "拆除工序费"
            break
          case 7:
            title = "水电工序费"
            break
          case 8:
            title = "泥瓦工序费"
            break
          case 9:
            title = "木工工序费"
            break
          case 10:
            title = "油漆工序费"
            break
          default:
            break
        }
        uni.setNavigationBarTitle({
          title: title
        })
      }
    },
    data() {
      return {
        partpay: null,
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
        levelLabel: "",
        curr_artificial_categoryId: null,
        levelList: [],
        workerLevelSkuMapping: [],
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
        noData: false,
        message: null,
        skuRelation: [], // 精算单更换商品  新旧商品id对照表
        selectedMaterialData: null,
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
      selectedMaterialCb(values) {
        this.$nextTick(() => {
          this.selectedMaterialData = values
          this.setCurrentEditMaterialChangData()
        })
      },
      setCurrentEditMaterialChangData() {
        const {
          categoryId,
          item
        } = this.selectedMaterialData
        let origin = {}
        // 缓存里的旧存储的原始的辅材列表数据
        // const originMaterialList = uni.getStorageSync("originMaterialList")
        // const categoryStorage = originMaterialList.find(cg => cg.categoryId == categoryId)
        // if(categoryStorage) {
        //   originStorage = categoryStorage?.itemList.find(t => t.originalId == item.originalId)
        // }
        
        // 取当前的数量
        const categoryOld = this.dataOrigin?.material?.categoryList?.find(cg => cg.categoryId == categoryId)

        if(categoryOld) {
          origin = categoryOld?.itemList.find(t => t.originalId == item.originalId)
        }
        // 注释的字段是不允许替换的
        // origin.originalId = origin.originalId // "原始ID 【下单params附带参数】",
        // origin.originalId = origin.originalId // "原始ID 【下单params附带参数】",
        origin.id = item.product.skuId //"long //商品ID 【下单params附带参数】",
        origin.title = item.title //"string //标题",
        // origin.productType = origin.productType //"int //下单参数 type\r      标签 1.物品 2.服务 3.虚拟\r ,
        // origin.roleType = item.roleType // "int //下单参数 roleType",  这里是辅材所以不需要替换
        // origin.businessType = item.businessType //"int //下单参数 businessType",
        // origin.categoryId = item.categoryId //"string //分类",
        // origin.workType = item.workType //"int //工种",
        origin.categoryTypeId = item.product.categoryTypeId //"int //品类类型ID",
        origin.storeId = item.product.storeId //"long //店铺ID",
        origin.inServiceArea = true // 从商品列表更换来的商品一定是在服务范围内的
        origin.imageUrl = item.product.skuImage //"string //图片地址",
        origin.spuName = item.product.spuName //"string //商品名称",
        let deposit = item.product.sku.deposit ?? 0
        origin.price = item.product.skuPrice + deposit//"int //价格",
        // origin.count = origin.count //"double //数量",
        origin.minimumOrderQuantity = item.product.sku.minimumOrderQuantity //"string //最小购买数量",
        origin.stepLength = item.product.sku.stepLength //"string //数量增加步长",
        origin.unit = item.product.salesUnit.unitName //"string //单位",
        origin.name = item.product.skuName //"string //规格",
        // origin.inServiceArea = origin.inServiceArea //"boolean //是否在服务区",
        // origin.selling = origin.selling //"boolean //是否已购买 false未购买 true已购买"
        this.selectedMaterialData = {
          origin,
          categoryId
        }
      },
      changeMaterial(values) {
        const {
          categoryId,
          item
        } = values
        this.setMaterial(categoryId, item)
      },
      setMaterial(categoryId, item) {
        this.$nextTick(() => {
          for (let i = 0; i < this.dataOrigin.material.categoryList.length; i++) {
            if (this.dataOrigin.material.categoryList[i].categoryId == categoryId) {
              for (let j = 0; j < this.dataOrigin.material.categoryList[i].itemList.length; j++) {
                if (this.dataOrigin.material.categoryList[i].itemList[j].originalId === item.originalId) {
                  this.dataOrigin.material.categoryList[i].itemList[j] = item
                  this.setSkuRelation(item)
                  this.computePriceAndShopping()
                  this.selectedMaterialData = null
                  break
                }
              }
            }
          }
        })
      },
      setSkuRelation(item) {
        // 添加新旧id对应关系
        const flgArr = this.skuRelation.filter(t => t.originalId == item.originalId)
        if (flgArr?.length > 0) {
          if (item.checked) {
            // 如果选择了
            // 如果是已经存在了新旧id对应关系，则替换新的id
            flgArr[0].newSuk = item.id
          } else {
            let index = null
            for (let i = 0; i < this.skuRelation.length > 0; i++) {
              if (this.skuRelation[i].originalId == item.originalId) {
                index = i
                break
              }
            }
            if (index) {
              this.skuRelation.splice(index, 1)
            }
          }
          // 如果是已经存在了新旧id对应关系，则替换新的id
          flgArr[0].newSuk = item.id
        } else {
          if (item.checked) {
            // 否则就是初始化
            this.skuRelation.push({
              originalId: item.originalId,
              oldSuk: item.oldId || item.id,
              newSuk: item.id
            })
          }
        }
      },
      openPopUp() {
        if (this.levelList.length > 0) {
          this.$refs.level.open("bottom")
        } else {
          uni.showToast({
            icon: "none",
            title: "无等级可替换"
          })
        }

      },
      initData() {
        this.checkedIds = []
        if (this.msg.obtainType != 2) {
          this.dataOrigin?.artificial?.categoryList?.forEach(t => {
            t.itemList.forEach(it => {
              it.originalId = it.originalId || -1
              // 默认初始化SkuRelation
              this.skuRelation.push({
                originalId: it.originalId,
                oldSuk: it.id,
                newSuk: it.id
              })
              this.checkedIds.push(it.originalId)
            })
          })
        }
      
        if (this.msg.obtainType != 1) {
          this.dataOrigin?.material?.categoryList?.forEach(t => {
            t.itemList.forEach(it => {
              it.checked = true
              it.isEdit = false
              if (it.inServiceArea && !it.selling) {
                this.checkedIds.push(it.originalId)
                // 默认初始化SkuRelation
                this.skuRelation.push({
                  originalId: it.originalId,
                  oldSuk: it.id,
                  newSuk: it.id
                })
              }
            })
          })
        }
        
        this.computePriceAndShopping()
      },
      computePriceAndShopping() {
        // 先清空
        this.shopping = {
          artificial: [],
          material: []
        }
        this.countPrice = 0
        this.pieces = 0

        if (this.msg?.obtainType != 2) {
          // 先计算人工费用
          this.dataOrigin?.artificial?.categoryList?.forEach((item, i) => {
            item.itemList.forEach((it, j) => {
              this.shopping.artificial.push(it)
              this.countPrice += it.price * it.count
              this.pieces += it.count
            })
          })
        }

        if (this.msg?.obtainType != 1) {
          // 再计算辅材费用
          this.dataOrigin?.material?.categoryList?.forEach((item, i) => {
            item.itemList.forEach((it, j) => {
              if (this.checkedIds.includes(it.originalId)) {
                this.shopping.material.push(it)
                this.countPrice += it.price * it.count
                this.pieces += it.count
              }
            })
          })
        }
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
                label: itm.levelName,
                totalPrice: 0,
              })
            })
            this.levelLabel = "（" + list[0].label + "）"
            data.forEach(workerSku => {
              // 储存所有工人对应的等级列表和溢价价格
              workerSku.changeLevelDetailList.forEach(levelItem => {
                this.workerLevelSkuMapping.push({
                  ...levelItem,
                  skuId: workerSku.skuId
                })
              })
              workerSku.changeLevelDetailList.forEach(it => {
                let level = list.find(l => l.value == it.level)
                level.totalPrice += it.totalPrice
              })
            })
            this.levelList = list
          } else {
            this.levelList = []
          }
        })
      },
      getDataList() {
        this.noData = false
        let params = {
          projectId: this.msg.projectId,
          type: this.msg.serviceType
        }
        if (!this.partpay) {
          params.obtainType = this.msg.obtainType
        }
        console.log(">>>>>>>params>>>>>>>", params)
        sellList(params).then(data => {
          this.dataOrigin = data
          if (this.dataOrigin?.artificial?.categoryList?.length > 0) {
            let cllist = []
            this.dataOrigin?.artificial?.categoryList?.forEach(category => {
              category?.itemList.forEach(t => {
                let obj = {
                  skuId: t.id, //"long //商品id【必须】",
                  cityId: this.dataOrigin.cityId, //"long //市id【必须】",
                  categoryTypeId: t.categoryTypeId, //"int //商品品类类型id【必须】",
                  price: t.price, //"int //商品总价格 工艺商品单价个数 单位分【必须】",
                  count: t.count
                }
                if (t.categoryTypeId == 7) {
                  obj.workerType = t.workType //"int //工种,品类为工人时（categoryTypeId=7）必传
                }
                cllist.push(obj)
              })
            })
            if (cllist.length > 0) {
              this.batchChangeLevel(cllist)
            } else {
              this.levelLabel = "（中级）"
            }
          }
          // if (this.selectedMaterialData?.categoryId) {
          //   const {
          //     origin,
          //     categoryId
          //   } = this.selectedMaterialData
          //   this.setMaterial(categoryId, origin)
          // }
          if(data?.material?.categoryList?.length > 0) {
            let tempArr = [...data?.material?.categoryList]
            tempArr.forEach(category => {
              category.itemList.forEach(it => {
                it.oldId = it.id
                it.checked = true
                it.isEdit = false
              })
            })
            uni.setStorageSync("originMaterialList", tempArr)
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
      selectWp(obj) {
        this.$nextTick(function() {
          console.log(obj)
          const {
            val,
            originalId,
            categoryId,
            item
          } = obj
          let arr = this.checkedIds
          if (val) {
            if (!arr.includes(originalId)) {
              arr.push(originalId)
            }
          } else {
            if (arr.includes(originalId)) {
              const i = arr.indexOf(originalId)
              arr.splice(i, 1)
            }
          }
          this.checkedIds = arr

          this.setSkuRelation(obj)
          this.computePriceAndShopping()
          this.setMaterial(categoryId, item)
        })
      },
      gotopay() {
        // TODO去结算页面
        // let skuInfos = []
        if (this.shopping?.artificial?.length > 0 || this?.shopping?.material?.length > 0) {
          let params = {
            payType: 1, //"int //支付方式  1微信支付",
            openid: uni.getStorageSync("openId"), //"string //微信openid 小程序支付用 app支付不传或传空",
            projectId: Number(this.msg.projectId), //"long //项目id  非必须 默认0",
            customerId: Number(this.msg.customerId), //"long //业主id  非必须 默认0",
            estateId: Number(this.msg.estateId), //"long //房产id   非必须 默认0",
            total: this.countPrice, //"int //总计",
            remarks: "", //"string //备注",
            orderName: "管家工序费", //"string //订单名称",
            details: []
          }
          // roleType 7工人，10管家
          let roleType = this.msg.serviceType == 5 ? 10 : 7
          if (this.msg.obtainType != 2) {
            this.shopping?.artificial?.forEach(it => {
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
                params: {
                  serviceType: this.msg.serviceType
                }, //string //与订单无关的参数 如上门时间 doorTime"
              })
            })
          }
          if (this.msg.obtainType != 1) {
            this.shopping?.material?.forEach(it => {
              params.details.push({
                // supplierType: it.supplierType,
                relationId: it.id, //"long //实体id",
                type: 1, //"int //实体类型   1材料  2服务   3专项付款",
                businessType: 1, //it.categoryTypeId, //"int //业务类型",辅材的businessType固定为1
                workType: it.workType, //"int //工种类型",
                // level: 1, //"int //等级  0中级  1高级 2特级  3钻石",
                storeId: it.storeId, //"long //店铺id",
                storeType: 0, //"int //店铺类型 0普通 1设计师",
                number: it.count, //"double //购买数量",
                params: {
                  skuRelation: this.skuRelation,
                  serviceType: this.msg.serviceType
                }, //string //与订单无关的参数 如上门时间 doorTime"
              })
            })
          }
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
              console.log(e)
              const { errMsg } = e
              if(errMsg.indexOf("cancel") !==-1) {
                uni.navigateTo({
                  url: `/sub-my/pages/my-order/my-order?index=1&firstEntry=true`
                })
              } else {
                uni.showToast({
                  title: "掉起微信支付失败"
                })
              }
            },
          });
        })
      },
      setLevel(levelObj) {
        this.artificialLevel = levelObj.value
        this.levelLabel = "（" + levelObj.label + "）"

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
