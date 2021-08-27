<template>
  <view
    v-if="avatarList.length"
    class="group-avatars"
    :class="[`group-avatars--children${avatarList.length}`]"
  >
    <image
      v-for="(ava, avaIdx) in avatarList"
      :key="avaIdx"
      :src="ava"
      class="avatar"
      shape
    />
  </view>
</template>

<script>
export default {
  name: "GroupAvatars",
  props: ["list"],
  computed: {
    avatarList() {
      return this.list ? this.list.slice(0, 4) : [];
    },
  },
};
</script>

<style lang="scss">
.group-avatars {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  border-radius: 6px;

  .avatar {
    box-sizing: border-box;

    img {
      object-fit: cover;
    }
  }

  &.group-avatars--children2 {
    .avatar {
      width: 50%;
      height: 100%;

      &:nth-child(2) {
        border-left: 1px solid #fff;
      }
    }
  }

  &.group-avatars--children3 {
    position: relative;

    .avatar {
      position: absolute;
      width: 50%;
      height: 50%;

      &:nth-child(1) {
        left: 0;
        top: 0;
        width: 50%;
        height: 100%;
      }

      &:nth-child(2) {
        right: 0;
        top: 0;
        border-left: 1px solid #fff;
      }

      &:nth-child(3) {
        top: 50%;
        right: 0;
        border-left: 1px solid #fff;
        border-top: 1px solid #fff;
      }
    }
  }

  &.group-avatars--children4 {
    .avatar {
      width: 50%;
      height: 50%;

      &:nth-child(2) {
        border-left: 1px solid #fff;
      }

      &:nth-child(3) {
        border-top: 1px solid #fff;
      }

      &:nth-child(4) {
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
      }
    }
  }
}
</style>