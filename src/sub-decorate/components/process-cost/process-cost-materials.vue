<template>
  <view class="content">
    <view class="title-wrap">
      <view class="title">
        <view class="s-4level-name">{{content.categoryName || "后端没有返回categoryName字段"}}</view>
      </view>
    </view>
    <view class="index">
      <view class="item-list">
        <view class="item" v-for="(item,index) in itemList" :key="item.id">
          <view class="img-name-tag-guige flex-r-l">
            <view v-if="item.isEdit || !item.inServiceArea" style="width: 32rpx;height: 32rpx;"></view>
            <check-box v-else :checked="item.checked" @change="(val) => {checkItem(val, item)}"></check-box>
            <view class="flex-1">
              <view class="flex-r-l">
                <image class="img" :src="item.imageUrl"></image>
                <view class="tag-name-guige-price-edit">
                  <view class="spu-name-gui-ge-count">
                    <view class="spu-name">
                      <view class="tag">{{item.productType | filterProductType}}</view>
                      <view class="name">{{item.spuName}}</view>
                    </view>
                    <view class="gui-ge-count">
                      <view class="gui-ge">{{item.name}}</view>
                      <view class="count">共{{item.count}}件</view>
                    </view>
                  </view>
                  <view class="price-edit">
                    <view class="price">
                      <text>￥</text>
                      <text>{{item.price / 100}}</text>
                    </view>
                    <view class="editing" v-if="item.isEdit">
                      <view class="btl" @click="restoreDefault">恢复默认</view>
                      <view class="line"></view>
                      <view class="btr" @click="finishEditing(item)">完成编辑</view>
                    </view>
                    <view class="edit" v-if="item.inServiceArea && !item.isEdit" @click="edit(item)">编辑商品</view>
                  </view>
                </view>
              </view>
              <view v-if="item.isEdit" class="b-t-b"></view>
              <view class="number-change-wrap" v-if="item.isEdit">
                <view class="number-wrap">
                  <image @click="reduce(item)" v-if="item.count > item.minimumOrderQuantity"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/details_pop_.svg" class="reduce">
                  </image>
                  <image v-else
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/details_pop_subtract_disabled.svg"
                    class="reduce"></image>
                  <view class="number">
                    {{item.count}}
                  </view>
                  <image @click="plus(item)"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/details_pop_add.svg" class="plus">
                  </image>
                </view>
                <view class="change-wrap"
                  v-if="item.inServiceArea && !isNaN(content.categoryId) && content.categoryName !== '其他' && content.categoryId != ''">
                  <view @click="goMaterialsList(item)">更换商品</view>
                  <image @click="goMaterialsList(item)"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/change_material.svg"></image>
                </view>
              </view>
              <view class="no-pay-change" v-if="!item.inServiceArea">
                <view class="no-pay">商品超出配送范围，请更换可配送商品</view>
                <view class="change"
                  v-if="!isNaN(content.categoryId) && content.categoryName !== '其他' && content.categoryId != ''">
                  <view @click="goMaterialsList2(item)">更换商品</view>
                  <image @click="goMaterialsList2(item)"
                    src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/change_material.svg"></image>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import CheckBox from "../check-box/check-box.vue"
  export default {
    components: {
      CheckBox
    },
    data() {
      return {
        itemList: [],
        currentItemOriginData: {},
        currentItemEditData: {},
      }
    },
    props: {
      content: {
        type: Object,
        required: true
      }
    },
    mounted() {
      uni.$on("selectedMaterial", this.selectedMaterialCb)
      this.initItemList()
    },
    watch: {
      content(newVal, oldVal) {
        this.initItemList()
      }
    },
    filters: {
      filterPrice(val) {
        return (val / 100).toFixed()
      },
      filterProductType(val) {
        let res = ""
        switch (Number(val)) {
          case 1:
            res = "物品"
            break;
          case 2:
            res = "服务"
            break;
          case 3:
            res = "虚拟"
            break;
          default:
            break;
        }
        return res
      }
    },
    methods: {
      restoreDefault() {
        this.$nextTick(() => {
          let arr = []
          this.itemList.forEach(t => {
            if (t.id === this.currentItemOriginData.id) {
              arr.push({
                ...this.currentItemOriginData
              })
            } else {
              arr.push({
                ...t
              })
            }
          })
          this.itemList = [...arr]

          this.submitMaterial(this.currentItemOriginData)
        })
      },
      reduce(item) {
        this.$nextTick(() => {
          if (item.count > item.minimumOrderQuantity) {
            item.count -= Number(item.stepLength)
          }
          this.submitMaterial(item)
        })

      },
      plus(item) {
        this.$nextTick(() => {
          item.count += item.step
          this.submitMaterial(item)
        })
      },
      finishEditing(item) {
        item.isEdit = false
      },
      goMaterialsList(item) {
        uni.navigateTo({
          url: `/sub-decorate/pages/materials-list/materials-list?id=${item.id}&categoryId=${item.categoryId}`
        })
      },
      
      goMaterialsList2(item) {
        return uni.showToast({
          title: "不在服务范围的情况还在开发中，敬请期待......",
          icon: "none"
        })
        uni.navigateTo({
          url: `/sub-decorate/pages/materials-list/materials-list?id=${item.id}&categoryId=${Number(item.categoryId)}`
        })
      },
      selectedMaterialCb(materialDetail) {
        this.$nextTick(() => {
          let item = {}
          for (let i = 0; i < i < this.itemList.length; i++) {
            let t = this.itemList[i]
            if (t.id === this.currentItemOriginData.id) {
              t.id = materialDetail.id
              t.imageUrl = materialDetail.imageUrl
              t.spuName = materialDetail.spuName
            }
            item = t
            break;
          }
          this.submitMaterial(item)
        })
      },
      submitMaterial(item) {
        this.$emit("changeMaterial", {
          categoryType: this.content.categoryType,
          item: {
            ...item
          }
        })
      },
      edit(item) {
        this.currentItemOriginData = {
          ...item
        }
        this.currentItemEditData = {
          ...item
        }
        item.isEdit = true
      },
      initItemList() {
        this.itemList = this.content.itemList.map(item => {
          return {
            ...item
          }
        })
      },
      checkItem(val, item) {
        item.checked = val
        this.$emit("change", {
          val,
          id: item.id
        })
      },

      goDetail(id) {
        uni.setStorageSync('goodId', id)
        uni.navigateTo({
          url: "/sub-classify/pages/goods-detail/goods-detail"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    border-bottom: 2rpx solid #f4f4f4;
  }

  .s-4level-name {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 40rpx;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    padding: 30rpx 0;
  }

  .flex-1 {
    flex: 1;
  }

  .b-t-b {
    border-bottom: 2rpx solid #f4f4f4;
    padding-top: 24rpx;
    transform: translateX(24rpx);
    margin-bottom: 24rpx;
  }

  .flex-r-l {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
  }

  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding-bottom: 32rpx;

    .img-name-tag-guige {}

    .img {
      width: 136rpx;
      height: 136rpx;
      margin-right: 16rpx;
      margin-left: 24rpx;
      border: 1rpx solid #f4f4f4;
      border-radius: 8rpx;
      box-sizing: border-box;
    }

    .tag-name-guige-price-edit {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      height: 136rpx;
    }

    .spu-name {
      width: 475rpx;
      margin-bottom: 8rpx;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: flex-end;
    }

    .tag {
      width: 60rpx;
      height: 30rpx;
      box-sizing: border-box;
      border: 1rpx solid #35c4c4;
      border-radius: 4rpx;
      font-size: 20rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #35c4c4;
      line-height: 27rpx;
      margin-right: 8rpx;
    }

    .name {
      width: 403rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 32rpx;
    }

    .price-edit {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      .price {
        font-size: 32rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 32rpx;
      }

      .edit {
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 700;
        text-align: right;
        color: #00bfb6;
        line-height: 34rpx;
      }
    }

    .gui-ge-count {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      .gui-ge,
      .count {
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        line-height: 26rpx;
      }
    }
  }

  .editing {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .btl {
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 700;
      text-align: right;
      color: #333333;
      line-height: 34rpx;
    }

    .line {
      width: 2rpx;
      height: 22rpx;
      opacity: 1;
      background: #e7e7e7;
      margin: 0 24rpx;
    }

    .btr {
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 700;
      text-align: right;
      color: #00bfb6;
      line-height: 34rpx;
    }
  }

  .no-pay-change {
    margin-top: 24rpx;
    padding: 10rpx 0;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .no-pay {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    line-height: 34rpx;
    transform: translateX(24rpx);
  }

  .change {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;

    view {
      height: 32rpx;
      padding-right: 4rpx;
      font-size: 22rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 700;
      text-align: right;
      color: #00bfb6;
      line-height: 32rpx;
    }

    image {
      width: 20rpx;
      height: 20rpx;
    }
  }

  .number-change-wrap {
    .change-wrap {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
      align-items: center;

      view {
        height: 32rpx;
        padding-right: 4rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 700;
        text-align: right;
        color: #00bfb6;
        line-height: 32rpx;
      }

      image {
        width: 20rpx;
        height: 20rpx;
      }
    }

    .number-wrap {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
      align-items: center;
      margin-bottom: 24rpx;

      image {
        width: 48rpx;
        height: 48rpx;
        border-radius: 4rpx 0rpx 0rpx 4rpx;
      }

      .number {
        margin: 0 4rpx;
        height: 48rpx;
        line-height: 48rpx;
        background: #f2f2f2;
        padding: 0 23rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 700;
        text-align: right;
        color: #333333;
        box-sizing: border-box;
      }
    }
  }
</style>
