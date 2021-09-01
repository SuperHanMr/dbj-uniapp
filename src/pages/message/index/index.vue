<template>
  <view class="im-container">
    <!-- <view class="im-header">
      消息
    </view> -->
    <view class="im-common-message-list">
      <conversation-item
        :conversation="cstServConv">
        <template #avatar>
          <image class="im-avatar-image" src="../../../static/images/message/ic_customer_service@2x.png"></image>
        </template>
       </conversation-item>
       <conversation-item
         :conversation="sysConv">
         <template #avatar>
           <image class="im-avatar-image" src="../../../static/images/message/ic_system@2x.png"></image>
         </template>
        </conversation-item>
        <conversation-item
          :conversation="itaConv">
          <template #avatar>
            <image class="im-avatar-image" src="../../../static/images/message/ic_interaction@2x.png"></image>
          </template>
         </conversation-item>
    </view>
    <view class="im-chat-message-list">
      <conversation-item 
        v-for="(conv,index) in convList" 
        :key="conv.conversationID" 
        :conversation="conv">
       </conversation-item>
    </view>
  </view>
</template>

<script>
  import {
    genTestUserSig
  } from "../../../utils/debug/GenerateTestUserSig.js"
  import {
    login,
    getSafeTim
  } from "../../../utils/tim.js"
  import ConversationItem from "../conversation/conversation-item.vue";
  export default {
    components: {
      ConversationItem,
    },
    data() {
      return {
        cstServConv: {
          type: "NOTIFICATION",
          name: "在线客服"
        },
        sysConv: {
          type: "NOTIFICATION",
          name: "系统消息",
        },
        itaConv: {
          type: "NOTIFICATION",
          name: "互动消息",
        },
        convList: [],
      }
    },
    mounted() {
      var userId = "user1";
      var {
        userSig
      } = genTestUserSig(userId);
      login(userId, userSig).then(() => {
        console.log("im login success")
      }).catch((e) => {
        console.error("im login failed", e);
      })
      this.requestConvList();
    },
    methods: {
      requestConvList() {
        getSafeTim().then(tim => tim.getConversationList()).then(res => {
          if (res.code === 0) {
            this.convList = res.data.conversationList || [];
          }
        });
      }
    }
  }
</script>

<style>
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
