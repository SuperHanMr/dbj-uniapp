<template>
  <view class="design-list">
    <material-content-card class="card-item" v-for="(item, index) in dataList" :key="item.id" :content="item">
      <template slot="radio">
        <dbj-radio class="card-radio" :value="item.id + ''" :checked="checkedId === item.id + ''" @change="radioChange">
        </dbj-radio>
      </template>
    </material-content-card>
    <view v-if="isAllDataLoaded">~我也是有底线的</view>
  </view>
</template>

<script>
  import {
    productList
  } from "../../../api/decorate.js"
  import DbjRadio from "../../components/dbj-radio/dbj-radio.vue"
  import MaterialContentCard from "../../components/material-content-card/material-content-card.vue"
  export default {
    components: {
      DbjRadio,
      MaterialContentCard
    },
    data() {
      return {
        dataList: [],
        checkedId: "",
        categoryId: null,
        areaId: null,
        page: 1,
        total: 0,
        isAllDataLoaded: false
      }
    },
    onLoad(option) {
      const {
        id,
        categoryId,
        areaId
      } = option
      this.checkedId = id + ""
      this.categoryId = categoryId
      this.areaId = areaId
    },
    onShow() {
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
        uni.$emit('selectedMaterial', {
          ...tmp
        });
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
