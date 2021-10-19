<template>
  <view class="design-list">
    <service-content-card class="card-item" v-for="(item, index) in dataList" :key="item.product.spuId"
      :insideArea="insideArea" :content="item">
      <template slot="radio">
        <btn-radio :value="item.product.spuId + ''" :checked="checkedSpuId === item.product.spuId + ''"
          @change="radioChange"></btn-radio>
      </template>
    </service-content-card>
    <view v-if="isAllDataLoaded" style="padding: 24rpx;text-align: center;font-size: 26rpx;">~我也是有底线的~</view>
  </view>
</template>

<script>
  import {
    productList
  } from "../../../api/decorate.js"
  import {
    BtnRadio
  } from "../../components/btn-radio/btn-radio.vue"
  import {
    ServiceContentCard
  } from "../../components/service-content-card/service-content-card.vue"
  let timer = null
  export default {
    components: {
      BtnRadio,
      ServiceContentCard
    },
    data() {
      return {
        dataList: [],
        checkedSpuId: "",
        title: null,
        categoryId: null,
        serviceType: null,
        insideArea: null,
        page: 1,
        areaId: null,
        total: 0,
        isAllDataLoaded: false
      }
    },
    onLoad(option) {
      const {
        insideArea,
        spuId,
        categoryId,
        name,
        serviceType,
        areaId,
        unitId
      } = option
      this.checkedSpuId = spuId
      this.title = name
      this.categoryId = categoryId
      this.serviceType = serviceType
      this.insideArea = insideArea ?? 1
      this.areaId = areaId
      this.unitId = unitId
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.title
      })
      this.queryProductList();
      this.dataList = []
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
          // categoryStatus: 0,
          categoryTypeId: Number(this.categoryId),
          pageSize: 10,
          pageIndex: this.page,
          areaId: Number(this.areaId),
          unitId: Number(this.unitId)
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
        uni.$emit('selectedServer', {
          serviceType: this.serviceType,
          values: tmp
        });
        uni.navigateBack({
        
        })
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
