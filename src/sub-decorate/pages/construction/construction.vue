<template>
  <view class="construction">
    <tabs :current="current" :items="items" @changeItem="changeItem"></tabs>
    <view class="s-g-list">
      <view class="s-g-item">
        <user-desc-pict :pictList="pictList">
          <template slot="subtitle">
            <sub-title text="拆除阶段完工申请"></sub-title>
          </template>
        </user-desc-pict>
        <user-desc-pict :pictList="pictList" :isWorker="true">
        </user-desc-pict>
      </view>
    </view>
  </view>
</template>

<script>
  import Tabs from "../../components/tabs/tabs.vue"
  import UserDescPict from "../../components/user-desc-pict/user-desc-pict.vue"
  import SubTitle from "../../components/user-desc-pict/sub-title.vue"
  export default {
    components: {
      Tabs,
      UserDescPict,
      SubTitle
    },
    data() {
      return {
        pictList: [
          "http://iph.href.lu/328x216?text=picture&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=picture&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=picture&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=picture&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=picture&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=picture&fg=EB7662&bg=FFE2DD"
        ],
        current: "拆除",
        items: ["拆除", "水电", "泥工", "木工", "油工"]
      }
    },
    methods: {
      changeItem(item) {
        this.current = item;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .construction {}
  .s-g-list {
    .s-g-item {
      margin: 0 24rpx 24rpx;
    }
  }
</style>
