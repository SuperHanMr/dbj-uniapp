<template>
  <view class="im-container">
    <!-- <view class="im-header">
      消息
    </view> -->
    <view class="im-common-message-list">
      <conversation-item
        :conversation="cstServConv">
        <template #avatar>
          <image class="im-avatar-image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_customer_service@2x.png"></image>
        </template>
       </conversation-item>
       <conversation-item
         :conversation="sysConv">
         <template #avatar>
           <image class="im-avatar-image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_system@2x.png"></image>
         </template>
        </conversation-item>
        <conversation-item
          :conversation="itaConv">
          <template #avatar>
            <image class="im-avatar-image" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_interaction@2x.png"></image>
          </template>
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
</template>

<script>
  import TIM from 'tim-wx-sdk'
  import ConversationItem from "./conversation-item.vue";
  import { mapState, mapGetters } from "vuex";
  export default {
    components: {
      ConversationItem,
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
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
    },
    methods: {
    }
  }
</script>

<style>
  .webview {
    height: 200px;
    width: 100%;
  }
  .im-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    background: #f9f9f9;
  }

  .im-common-message-list,
  .im-chat-message-list {
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
  }

  .im-chat-message-list {
    margin-top: 32rpx;
  }
  
  .im-avatar-image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 6px;
  }
</style>
