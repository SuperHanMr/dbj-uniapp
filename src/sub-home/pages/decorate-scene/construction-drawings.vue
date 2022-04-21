<template>
  <view class="constructionWrap">
    <view
      class="noTypes"
      v-if="!serveTypes.length"
    >
      <image
        class="noTypesImg"
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/drawings_empty.png"
      ></image>
      <view class="text">暂无施工图纸</view>
    </view>
    <view class="fixed">
      <scroll-view
        :scroll-x="true"
        :enable-flex="true"
        class="tabWrap"
        v-if="serveTypes.length"
      >
        <view
          class="tab"
          @click="checkIndex(index,item.type)"
          v-for="(item,index) in serveTypes"
          :key="item.type"
        >
          <view
            class="text"
            :class="{'color':navIndex===index}"
          >{{item.severName}}</view>
          <view class="lineWrap">
						<image src="/static/images/real-case/select_head.png" class="underline"
              v-if='navIndex===index' mode=""></image>

          </view>
        </view>
      </scroll-view>
      <!-- <view
        class="divideLine"
        v-if="serveTypes.length"
      ></view> -->
      <view
        class="cardWrap"
        v-if="serverList.length>=2"
      >
        <view class="designer">
          <view class="designerInfo">
            <image
              class="avatar"
              @click="toPersonal(serverList[selectedIndex].userId)"
              :src="serverList[selectedIndex].avatar+'?x-oss-process=image/resize,m_mfit,w_52,h_52'"
            ></image>
            <view>
              <view class="designerName">{{serverList[selectedIndex].userName}}</view>
              <view class="role">{{serverList[selectedIndex].role}}</view>
            </view>
          </view>
          <view
            class="select"
            @click="switchC"
          >
            <view>切换设计师</view>
            <image
              class="switch"
              src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_switch%402x.png"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <view
      class="noDrawings"
      v-if="serveTypes.length && !drawings.length"
    >
      <image
        class="noDrawingsImg"
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/drawings_empty.png"
      ></image>
      <view class="text">暂无施工图纸</view>
    </view>
    <scroll-view
      :scroll-y="true"
      :class="{'switchServer':showCard}"
      class="contentWrap"
      v-else
    >
      <view
        class="content"
        v-if="navIndex===index"
        v-for="(item,index) in serveTypes"
        :key="item.type"
      >
        <view
          class="category"
          v-for="(category,index) in drawings"
          :key="category.categoryName"
        >
          <view class="title">{{category.categoryName}}</view>
          <view class="itemWrap">
            <view
              class="drawing"
              @click="previewImage(category.imageFileList,index)"
              v-for="(imgItem,index) in category.imageFileList"
              :key="imgItem.createTime"
            >
              <image
                class="img"
                :src="imgItem.fileUrl+'?x-oss-process=image/resize,m_mfit,w_164,h_108'"
              ></image>
              <view class="name">{{imgItem.fileName}}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view
      class="mask"
      v-if="showSwitchDesigner"
    >
      <view class="popupSwitch">
        <view class="topArea">
          <view class="mainTit">切换设计师</view>
          <image
            class="close"
            @click="showSwitchDesigner=false"
            src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_closed_black%402x.png"
          ></image>
        </view>
        <ul class="options">
          <li
            v-for="(item,index) in serverList"
            :key="item.severId"
            @click="selectC(item.severId,index)"
          >
            <view class="designerInfo">
              <image
                class="avatar"
                :src="item.avatar+'?x-oss-process=image/resize,m_mfit,w_38,h_38'"
                
              ></image>
              <view class="designerName">{{item.userName}}</view>
              <view class="role">{{item.role}}</view>
            </view>
            <image
              class="img"
              v-if="item.checked"
              src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_checked%402x.png"
            ></image>
          </li>
        </ul>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getServeTypes,
  getDrawings,
  updateDrawings,
} from "../../../api/real-case.js";
export default {
  data() {
    return {
      projectId: 2,
      navIndex: 0,
      serveTypes: [],
      serverList: [],
      drawings: [],
      showSwitchDesigner: false,
      selectedIndex: 0,
      showCard: false,
    };
  },
  onLoad(option) {
    this.projectId = option.projectId;
    uni.showShareMenu();
  },
  mounted() {
    this.requestPage();
  },
  methods: {
    toPersonal(userId) {
      uni.navigateTo({
        url: `/sub-decorate/pages/person-page/person-page?personId=${userId}`,
      });
    },
    previewImage(list, index) {
      let urls = [];
      list.forEach((item) => {
        urls.push(item.fileUrl);
      });
      uni.previewImage({
        current: index,
        urls: urls,
      });
    },
    switchC() {
      this.showSwitchDesigner = true;
    },
    selectC(severId, index) {
      this.selectedIndex = index;
      this.serverList.map((item) => {
        if (severId === item.severId) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
      updateDrawings(severId).then((data) => {
        if (data) {
          this.$nextTick(() => {
            this.drawings = data;
          });
          this.showSwitchDesigner = false;
        }
      });
    },
    checkIndex(index, type) {
      console.log(index, type);
      this.navIndex = index;
      this.requestDrawings(type);
    },
    requestPage() {
      getServeTypes(this.projectId).then((data) => {
        if (data) {
          this.serveTypes = data || [];
          if (data.length) {
            this.requestDrawings(this.serveTypes[0].type);
          }
        }
      });
    },
    requestDrawings(type) {
      let params = {
        projectId: this.projectId,
        severType: type,
      };
      getDrawings(params).then((data) => {
        if (data) {
          this.serverList = data.serverVOS.map((item) => {
            item.checked = false;
            return item;
          });
          this.drawings = data.fileListVO;
          this.showCard = this.serverList.length >= 2;
          console.log(data.serverVOS, data.fileListVO, "///");
        }
      });
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
	width: 100%;
}
.noTypesImg {
  display: block;
  width: 750rpx;
  height: 640rpx;
}
.noTypes .text {
  width: 168rpx;
  height: 40rpx;
  margin: 24rpx 291rpx 692rpx;
  font-size: 28rpx;
  color: #999999;
}
.noDrawingsImg {
  display: block;
  width: 750rpx;
  height: 640rpx;
  margin: 24rpx 0;
}
.noDrawings .text {
  width: 168rpx;
  height: 40rpx;
  margin: 0 291rpx 602rpx;
  font-size: 28rpx;
  color: #999999;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
}
.popupSwitch {
  width: 100%;
  height: 840rpx;
  padding-bottom: 40rpx;
  background: #ffffff;
  border-radius: 32rpx 32rpx 0rpx 0rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
}
.popupSwitch .options {
  width: 100%;
  height: 786rpx;
  overflow: auto;
}
.options li {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 120rpx;
  background: #ffffff;
  border-top: 2rpx solid #f2f2f2;
}
.options .img {
  width: 48rpx;
  height: 48rpx;
  display: block;
  margin: 36rpx 24rpx 36rpx 0;
}
.options .designerInfo {
  display: flex;
  width: 502rpx;
  height: 76rpx;
  margin: 22rpx 32rpx;
}
.options .designerInfo .avatar {
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  display: block;
}
.options .designerInfo .designerName {
  /* width: fit-content; */
  max-width: 260rpx;
  height: 42rpx;
  margin: 18rpx 8rpx 16rpx 24rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #333333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.options .designerInfo .role {
  width: 76rpx;
  height: 28rpx;
  margin: 24rpx 0;
  background: linear-gradient(45deg, #6d95ef, #84b9fc);
  border-radius: 6rpx;
  font-size: 20rpx;
  text-align: center;
  color: #ffffff;
  line-height: 28rpx;
}
.popupSwitch .topArea {
  height: 120rpx;
  border-radius: 32rpx 32rpx 0rpx 0rpx;
  display: flex;
  align-items: center;
}
.topArea .mainTit {
  width: 160rpx;
  height: 40rpx;
  margin-left: 296rpx;
  margin-right: 208rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
}
.topArea .close {
  width: 64rpx;
  height: 64rpx;
  display: block;
  margin-right: 20rpx;
}
.constructionWrap {
  width: 100%;
  height: fit-content;
  background: #ffffff;
}

.tabWrap {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  white-space: nowrap;
  max-width: 750rpx;
  height: 88rpx;
  background-color: #fff;
}
.tabWrap .tab {
  width: fit-content;
  height: 88rpx;
  margin-right: 48rpx;
}
.tabWrap .tab .text {
  max-width: 140rpx;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 40rpx;
  margin-top: 48rpx;
  margin-bottom: 16rpx;
  color: #999999;
  font-size: 28rpx;
}
.tabWrap .tab:first-child {
  margin-left: 32rpx;
}
.tabWrap .tab:last-child {
  margin-right: 32rpx;
}
.tabWrap .tab .text.color {
  color: #333333;
  font-weight: 500;
}
.lineWrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
.lineWrap .underline {
  width: 32rpx;
	height: 6rpx;
}
.divideLine {
  width: 750rpx;
  height: 0.5px;
  background-color: #f4f4f4;
}
.cardWrap {
  width: 750rpx;
  height: 230rpx;
  background-color: #fff;
}
.designer {
  width: 702rpx;
  height: 176rpx;
  background: #f7f7f7;
  border-radius: 24rpx;
  margin: 0 24rpx;
  display: flex;
  position: fixed;
  left: 0;
  top: 136rpx;
  justify-content: space-between;
}
.designer .select {
  display: flex;
  margin: 72rpx 0 68rpx 0;
}
.select > view {
  width: 130rpx;
  height: 36rpx;
  font-size: 26rpx;
  color: #666666;
}
.select .switch {
  width: 24rpx;
  height: 24rpx;
  display: block;
  margin: 6rpx 22rpx 6rpx 10rpx;
}
.designer .designerInfo {
  display: flex;
  margin: 36rpx 0 36rpx 32rpx;
}
.designer .designerInfo .avatar {
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
  margin-right: 16rpx;
  display: block;
}

.designerInfo > view .designerName {
  max-width: 260rpx;
  height: 42rpx;
  margin: 8rpx 0;
  font-size: 30rpx;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.designerInfo > view .role {
  width: 76rpx;
  height: 28rpx;
  background: linear-gradient(45deg, #6d95ef, #84b9fc);
  border-radius: 6rpx;
  font-size: 20rpx;
  text-align: center;
  color: #ffffff;
  line-height: 28rpx;
}
.contentWrap {
  width: 100%;
  height: fit-content;
  margin-top: 88rpx;
  padding-bottom: 62rpx;
}
.contentWrap.switchServer {
  margin-top: 318rpx;
}
.content {
  width: 686rpx;
  height: fit-content;
  margin: 0 32rpx;
}
.content .category {
}
.category .title {
  max-width: 686rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 40rpx;
  margin-top: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
}
.category .itemWrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.itemWrap .drawing {
  width: 328rpx;
  height: 268rpx;
  margin-top: 48rpx;
}
.itemWrap .drawing:first-child {
  margin-top: 26rpx;
}
.itemWrap .drawing:nth-child(2) {
  margin-top: 26rpx;
}
.itemWrap .drawing .img {
  width: 328rpx;
  height: 216rpx;
  display: block;
  /* border: 2rpx solid #f5f6f6; */
  border-radius: 12rpx;
}
.itemWrap .drawing .name {
  max-width: 312rpx;
  height: 36rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #333333;
}
</style>
