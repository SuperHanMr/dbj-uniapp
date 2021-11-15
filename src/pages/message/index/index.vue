<template>
  <view v-if="isIMLogin" class="im-container">
    <!-- <view class="im-header">
      消息
    </view> -->
    <view class="im-common-message-list">
      <conversation-item
        key="cstServConv"
        :conversation="cstServConv">
      </conversation-item>
      <conversation-item
        key="sysConv"
        :conversation="sysConv">
      </conversation-item>
      <conversation-item
        key="itaConv"
        :conversation="itaConv">
       </conversation-item>
    </view>
    <view class="im-chat-message-list">
      <conversation-item 
        v-for="(conv,index) in allConvList" 
        :key="conv.conversationID" 
        :conversation="conv"
        >
       </conversation-item>
    </view>
  </view>
  <unlogin-page v-else />
</template>

<script>
  import TIM from 'tim-wx-sdk'
  import { isSDKReady } from '@/utils/tim.js'
  import ConversationItem from "./conversation-item.vue";
  import { mapState, mapGetters } from "vuex";
  export default {
    components: {
      ConversationItem,
    },
    onLoad() {
      getApp().globalData.currentRoute = "/pages/message/index/index"
    },
    onShow() {
      uni.showTabBar()
      this.$store.commit("setIMLogin", isSDKReady());
      this.$store.dispatch("updateTabBarBadge");
    },
    onPullDownRefresh() {
      console.log("page pull down")
      this.$store.dispatch("requestDBGroupList")
        .then(res => this.$store.dispatch("requestConversationList"))
        .then(res => {
          uni.stopPullDownRefresh();
        }).catch(e => {
          uni.stopPullDownRefresh();
        });
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        isIMLogin: (state) => state.message.isIMLogin,
        cstServConv: (state) => state.message.cstServConv,
        sysConv: (state) => state.message.sysConv,
        itaConv: (state) => state.message.itaConv,
        conversationList: (state) => state.message.conversationList,
        chatGroupList: (state) => state.message.chatGroupList,
      }),
      allConvList() {
        let convIdMap = {};
        let groupMap = this.chatGroupList.reduce((map, group) => {
          let convId = "GROUP" + group.imGroupId;
          map[convId] = group;
          return map;
        }, {});
        let list = this.conversationList.map(conv => {
          convIdMap[conv.conversationID] = true;
          return {
            ...conv,
            groupDB: groupMap[conv.conversationID]
          }
        })
        let list2 = this.chatGroupList.filter(group => !convIdMap["GROUP"+group.imGroupId]).map((group) => {
          return {
            type: TIM.TYPES.CONV_GROUP,
            conversationID: "GROUP" + group.imGroupId,
            groupDB: group,
          }
        })
        return list.concat(list2);
      }
    },
    mounted() {
      uni.showTabBar()
    },
    methods: {
    }
  }
</script>

<style>
  .im-container {
    width: 100%;
    min-height: 100%;
    background: #fff;
  }

  .im-common-message-list,
  .im-chat-message-list {
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
  }

  .im-chat-message-list {
    border-top: 8rpx solid #f9f9f9;
  }
  
  .im-avatar-image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 6px;
  }
</style>
