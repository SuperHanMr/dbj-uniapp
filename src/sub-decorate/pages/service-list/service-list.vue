<template>
  <view class="design-list">
    <service-content-card class="card-item" v-for="(item, index) in dataList" :key="item.product.spuId"
      :insideArea="insideArea" :content="item">
      <template slot="radio">
        <dbj-radio class="card-radio" :value="item.product.spuId + ''" :checked="checkedId === item.product.spuId + ''"
          @change="radioChange"></dbj-radio>
      </template>
    </service-content-card>
    <view v-if="isAllDataLoaded">~我也是有底线的</view>
  </view>
</template>

<script>
  import {
    productList
  } from "../../../api/decorate.js"
  import {
    DbjRadio
  } from "../../components/dbj-radio/dbj-radio.vue"
  import {
    ServiceContentCard
  } from "../../components/service-content-card/service-content-card.vue"
  export default {
    components: {
      DbjRadio,
      ServiceContentCard
    },
    data() {
      return {
        dataList: [],
        checkedId: "",
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
        id,
        categoryId,
        name,
        serviceType,
        areaId
      } = option
      this.checkedId = id + ""
      this.title = name
      this.categoryId = categoryId
      this.serviceType = serviceType
      this.insideArea = insideArea
      this.areaId = areaId
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.title
      })
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
        })
      },
      radioChange(obj) {
        this.checkedId = obj.value
        let tmp = this.dataList.filter(t => t.id == Number(obj.value))[0]
        uni.$emit('selectedServer', {
          serviceType: this.serviceType,
          values: tmp
        });
        setTimeout(() => {
          console.log(getApp().globalData)
        }, 0)
      }
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
