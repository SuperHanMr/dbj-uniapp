<template>
  <view class="pop-container">
    <view class="pop-body">
      <view class="user-list">
        <view class="user-item" @click="handleClick({nick: '所有人', userID: 'zeus_0'})">
          <view class="user-avatar">
            <image class="avatar" mode="aspectFill" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_at_all.png"></image>
          </view>
          <view class="user-info">
            <view class="user-name">
              所有人
            </view>
            <view class="user-flag">
              <view class="all-user-tip">
                提示所有成员
              </view>
            </view>
          </view>
        </view>
        <view v-for="(member,index) in memberList" :key="member.userID" class="user-item" @click="handleClick(member)">
          <view class="user-avatar">
            <image class="avatar" mode="aspectFill" :src="member.avatar"></image>
          </view>
          <image v-if="member.role && member.role.type === 1" class="home_owner_flag" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/home_ower_flag.png"></image>
          <view class="user-info">
            <view class="user-name">
              {{ member.nick }}
            </view>
            <view v-if="member.role" class="user-flag">
              <view v-if="member.role.type === 1" class="user-tag">
                业主
              </view>
              <view v-else-if="member.role.type === 2" class="user-tag">
                亲友·{{ member.role.relativeRelationName }}
              </view>
              <view v-else class="job-tag">
                {{ member.role.typeName }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: "AtUserList",
    computed: {
      ...mapState({
        currentConversation: (state) => state.message.currentConversation,
        groupMembersMap: (state) => state.message.groupMembersMap,
        currentChatGroupMembers: (state) => state.message.currentChatGroupMembers,
        CONV_TYPES: (state) => state.message.CONV_TYPES,
      }),
      toAccount() {
        if (!this.currentConversation || !this.currentConversation.conversationID) {
          return ''
        }
        return this.currentConversation.conversationID.replace(this.currentConversation.type, '');
      },
      memberList() {
        let imGroupMembers = this.groupMembersMap[this.toAccount] || [];
        if (this.currentChatGroupMembers.length) {
          return this.currentChatGroupMembers.map(mem => {
            let imMem = imGroupMembers.find(item => item.userID === mem.tid) || {};
            return {
              nick: imMem.nameCard || mem.userName || imMem.nick,
              avatar: mem.headImg || imMem.avatar,
              userID: mem.tid,
              role: mem
            }
          })
        }
        return imGroupMembers.map(imMem => {
          return {
            nick: imMem.nameCard || imMem.nick,
            avatar: imMem.avatar,
            userID: imMem.userID
          }
        });
      }
    },
    methods: {
      handleClick(user) {
        uni.$emit("at-user-pick", user);
        uni.navigateBack();
      }
    },
    onUnload() {
      uni.$emit("at-user-close");
    }
  }
</script>

<style>
  .pop-container {
    display: flex;
    flex-flow: column nowrap;
    background: #fff;
    height: 100%;
    border-radius: 16px 16px 0px 0px;
  }
  .pop-header {
    height: 104rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: none;
  }
  .pop-title {
    font-size: 16px;
    color: #111;
    font-weight: 500;
  }
  .pop-close {
    position: absolute;
    right: 16rpx;
    top: 50%;
    font-size: 32px;
    margin-top: -16px;
  }
  .pop-body {
    flex: 1;
    overflow-y: auto;
  }
  .user-list {
    min-height: 100%;
    background-color: #fff;
  }
  .user-item {
    width: 100%;
    height: 140rpx;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    position: relative;
  }
  .user-item:active {
    background-color: #fafafa;
  }
  .all-user-tip {
    font-size: 11px;
    color: #999;
  }
  .user-avatar, .user-avatar .avatar {
    width: 96rpx;
    height: 96rpx;
  }
  .user-avatar {
    position: relative;
    margin-left: 32rpx;
    flex: none;
  }
  .home_owner_flag {
    width: 16px;
    height: 16px;
    position: absolute;
    z-index: 10;
    left: 110rpx;
    top: 92rpx;
  }
  .user-avatar .avatar {
    border-radius: 8px;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
  }
  .user-info {
    margin-left: 24rpx;
    margin-right: 32rpx;
    max-width: 100%;
  }
  .user-name {
    font-size: 14px;
    color: #333;
    line-height: 40rpx;
    text-overflow: ellipsis;
  }
  .user-flag {
    margin-top: 8rpx;
  }
  .job-tag {
    display: inline-block;
    background: linear-gradient(135deg, #40BFF5 0%, #53A9FF 100%);
    border-radius: 2px;
    font-size: 10px;
    color: #fff;
    text-align: center;
    padding: 0 4px;
    line-height: 28rpx;
    height: 28rpx;
  }
  .user-tag {
    color: #00C2B8;
    font-size: 10px;
    background: #E5F9F8;
    display: inline-block;
    padding: 0 4px;
    border-radius: 2px;
    line-height: 28rpx;
    height: 28rpx;
  }
</style>
