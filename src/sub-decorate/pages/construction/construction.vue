<template>
  <view class="construction">
    <tabs :current="current" :items="items" @changeItem="changeItem"></tabs>
    <view class="s-g-list">
      <view class="s-g-item" v-for="(item,index) in dataList" :key="item.id">
        <user-desc-pict :butlerData="item.butlerDecorationTrendLogVO">
          <template slot="subtitle">
            <sub-title :text="setTitle(item.type)"></sub-title>
          </template>
        </user-desc-pict>
        <user-desc-pict-worker :workerData="item.workerDecorationTrendLogVO">
        </user-desc-pict-worker>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getCompletionLog
  } from "../../../api/construction.js"
  import Tabs from "../../components/tabs/tabs.vue"
  import UserDescPict from "../../components/user-desc-pict/user-desc-pict.vue"
  import UserDescPictWorker from "../../components/user-desc-pict/user-desc-pict-worker.vue"
  import SubTitle from "../../components/user-desc-pict/sub-title.vue"
  export default {
    components: {
      Tabs,
      UserDescPict,
      UserDescPictWorker,
      SubTitle
    },
    onShow() {
      this.getCompletionLog()
    },
    data() {
      return {
        dataList: [],
        current: "拆除",
        items: ["拆除", "水电", "泥工", "木工", "油工"]
      }
    },
    methods: {
      setTitle(type) {
        str = type === 4 ? '整体' : '阶段'
        return this.current + type + '完工申请'
      },
      changeItem(item) {
        this.current = item;
        this.getCompletionLog()
      },
      getCompletionLog() {
        this.dataList = []
        getCompletionLog({
          page: 1,
          // position: ,
          rows: 1000,
          nodeType: this.items.indexOf(this.current) + 6,
          projectId: 1
        }).then(data => {
          this.dataList = data.list
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .construction {}

  .s-g-list {
    .s-g-item {
      margin: 24rpx;
    }
  }
</style>
