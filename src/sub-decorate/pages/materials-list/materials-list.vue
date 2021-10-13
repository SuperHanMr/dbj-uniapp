<template>
  <view class="design-list">
    <material-content-card class="card-item" v-for="(item, index) in dataList" :key="item.product.spuId"
      :content="item">
      <template slot="radio">
        <dbj-radio class="card-radio" :value="item.product.spuId + ''"
          :checked="checkedSpuId === item.product.spuId + ''" @change="radioChange">
        </dbj-radio>
      </template>
    </material-content-card>
    <view v-if="isAllDataLoaded" style="padding: 24rpx;text-align: center;font-size: 26rpx;">~我也是有底线的~</view>
  </view>
</template>

<script>
  import {
    productList
  } from "../../../api/decorate.js"
  import DbjRadio from "../../components/dbj-radio/dbj-radio.vue"
  import MaterialContentCard from "../../components/material-content-card/material-content-card.vue"
  let timer = null
  export default {
    components: {
      DbjRadio,
      MaterialContentCard
    },
    data() {
      return {
        dataList: [],
        checkedSpuId: null,
        categoryId: null,
        areaId: null,
        page: 1,
        total: 0,
        isAllDataLoaded: false
      }
    },
    onLoad(option) {
      const {
        spuId,
        categoryId,
        areaId
      } = option
      this.checkedSpuId = spuId + ''
      this.categoryId = categoryId
      this.areaId = areaId
    },
    onShow() {
      this.dataList = []
      this.queryProductList();
    },
    onReachBottom() {
      if (this.page * 10 < this.total) {
        this.page++;
        this.queryProductList();
      } else {
        this.isAllDataLoaded = true
      }
    },
    onPullDownRefresh() {
      this.dataList = []
      this.page = 1;
      this.isAllDataLoaded = false
      timer = setTimeout(() => {
        this.queryProductList();
      }, 200)
    },
    methods: {
      queryProductList() {
        productList({
          categoryStatus: 0,
          categoryId: Number(this.categoryId),
          pageSize: 10,
          pageIndex: this.page,
          areaId: Number(this.areaId)
        }).then(data => {
          const {
            total,
            page
          } = data
          this.total = total
          this.dataList = this.dataList.concat(page)
          this.isAllDataLoaded = false
          uni.stopPullDownRefresh()
        })
      },
      radioChange(obj) {
        this.checkedSpuId = obj.value + ''
        let tmp = this.dataList.filter(t => t.product.spuId == Number(obj.value))[0]
        uni.$emit('selectedMaterial', {
          categoryId: Number(this.categoryId),
          item: tmp
        });
        uni.navigateBack({})
      }
    },
    destroyed() {
      clearTimeout(timer)
    }
  }
</script>

<style lang="scss" scoped>
  .design-list {
    display: flex;
    flex-direction: column;
  }

  .card-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
</style>
