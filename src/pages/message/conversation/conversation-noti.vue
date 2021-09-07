<template>
  <view class="conversation-noti-container">
    <scroll-view
      :scroll-top="scrollTop"
      :scroll-y="true"
      :refresher-enabled="refresherEnabled"
      :refresher-triggered="refresherTriggered"
      :scroll-with-animation="false"
      id="messageListNoti"
     class="message-list"
     @scroll="handleMessageListScroll"
     @refresherrefresh="handlePulling"
     >
      <view>conver noti</view>
    </scroll-view>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    data() {
      return {
        clientHeight: 0,
        preScrollHeight: 0,
        scrollTop: 0,
        currentScrollTop: 0,
        refresherEnabled: true,
        refresherTriggered: false
      }
    },
    computed: {
      ...mapState({
        currentConversation: (state) => state.message.currentConversation,
        currentMessageList: (state) => state.message.currentMessageList,
        isCompleted: (state) => state.message.isCompleted,
        isRequesting: (state) => state.message.isRequesting,
      }),
      name() {
        if (this.currentConversation.type === "NOTIFICATION") {
          return this.currentConversation.name;
        }
        return this.currentConversation.conversationID;
      },
    },
    watch: {
    },
    mounted() {
      uni.setNavigationBarTitle({
      　　title: this.name
      });
      const query = uni.createSelectorQuery().in(this);
      this.messageListNodesRef = query.select("#messageListNoti");
      this.messageListNodesRef.boundingClientRect((options) => {
        this.clientHeight = options.height;
      }).exec();
    },
    onLoad(options) {
      // this.$store.dispatch("checkoutConversation", options.id);
    },
    onUnload() {
      this.$store.commit("resetConversation");
    },
    methods: {
      handleMessageListScroll(e) {
        this.currentScrollTop = e.detail.scrollTop;
      },
      handlePulling() {
      },
    }
  }
</script>

<style>
</style>
