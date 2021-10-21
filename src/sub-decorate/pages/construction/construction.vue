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
    <view v-if="nodata" class="no-data-wrap">
      <no-data words="暂无改施工数据"></no-data>
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
  import NoData from "../../components/no-data/no-data.vue"
  export default {
    components: {
      Tabs,
      UserDescPict,
      UserDescPictWorker,
      SubTitle,
      NoData
    },
    onLoad(option) {
      const {
        projectId
      } = option
      this.projectId = projectId
    },
    onShow() {
      // if(getApp().globalData.previewimageStatus) {
      //   getApp().globalData.previewimageStatus = false
      // } else {
      //   this.getCompletionLog()
      // }
    },
    mounted() {
      this.getCompletionLog()
    },
    data() {
      return {
        dataList: [],
        current: "拆除",
        items: ["拆除", "水电", "泥工", "木工", "油工"],
        projectId: null,
        nodata: false,
        noDataWords: ""
      }
    },
    methods: {
      setTitle(type) {
        let str = ''
        if (type == 4) {
          str = '整体'
        } else if (type == 3) {
          str = '阶段'
        } else {
          str = '未知阶段' + type
        }
        return this.current + str + '完工申请'
      },
      changeItem(item) {
        this.current = item;
        this.getCompletionLog()
      },
      getCompletionLog() {
        this.dataList = []
        getCompletionLog({
          page: 1,
          rows: 1000,
          nodeType: this.items.indexOf(this.current) + 6,
          projectId: this.projectId
        }).then(data => {
          this.dataList = data.list || []
          if (this.dataList?.length === 0) {
            this.nodata = true
            // this.noDataWords = "暂无改施工数据"
          } else {
            this.nodata = false
            // this.noDataWords = ""
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .construction {
    height: 100vh;
  }

  .s-g-list {
    padding-top: 96rpx;
    .s-g-item {
      margin: 24rpx;
    }
  }
  .no-data-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 68rpx);
  }
</style>
