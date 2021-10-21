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
      <no-data words="暂无该施工数据"></no-data>
    </view>
  </view>
</template>

<script>
  import {
    getCompletionLog,
    getConstructionNodes
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
      this.getConstructionNodes()
    },
    data() {
      return {
        dataList: [],
        current: "",
        items: [],
        originItem: [],
        projectId: null,
        nodata: false,
        noDataWords: "",
      }
    },
    methods: {
      getConstructionNodes() {
        getConstructionNodes({
          projectId: this.projectId
        }).then(data => {
          this.constructionNodes = data
          if (data?.length > 0) {
            this.nodata = false
            this.originItem = data
            this.items = data.map(it => it.nodeName)
            this.currentNodeType = data[0].nodeType
            this.current = this.items[0]
            this.getCompletionLog()
          } else {
            this.nodata = true
            this.items = []
          }
            console.log(this.currentNodeType, this.current, this.items)
        })
      },
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
        let temp = this.originItem.find(it => it.nodeName == item);
        this.currentNodeType = temp.nodeType
        this.current = temp.nodeName
        this.getCompletionLog()
      },
      getCompletionLog() {
        this.dataList = []
        getCompletionLog({
          page: 1,
          rows: 1000,
          nodeType: this.currentNodeType,
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

  .no-data-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 68rpx);
  }
</style>
