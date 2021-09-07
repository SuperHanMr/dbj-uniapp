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
        v-for="(conv,index) in conversationList" 
        :key="conv.conversationID" 
        :conversation="conv"
        >
       </conversation-item>
    </view>
  </view>
</template>

<script>
  import { addListener, removeListener } from "@/utils/tim.js"
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
      }),
    },
    mounted() {
      let userId = "user1";
      this.$store.dispatch("loginIM", userId);
      this.$store.dispatch("requestConversationList");
      addListener("CONVERSATION_LIST_UPDATED", this.onUpdateConversationList);
      this.$once("hook:beforeDestroy", () => {
        removeListener("CONVERSATION_LIST_UPDATED", this.onUpdateConversationList);
      })
    },
    methods: {
      onUpdateConversationList(event) {
        let conversationList = event.data || [];
        this.$store.commit("updateConversationList", conversationList);
      }
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
