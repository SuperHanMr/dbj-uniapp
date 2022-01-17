<template>
  <view style="background-color: #F6F6F6;margin-bottom: 60rpx;">
    <!-- <view > -->
    <custom-navbar
      :opacity="scrollTop/100"
      title="找设计"
      bgcolor="#FFF"
    >
      <template v-slot:back>
        <view @click="toBack">
          <i
            class="icon-ic_cancel_white header-back"
            style="color:'black'"
          >
          </i>
        </view>
      </template>
    </custom-navbar>

    <!-- 	<view class="top-bg">
			<view class="pleaholder"></view>
		</view> -->
    <!-- <view class="sticky-view" :style="{top:navBarHeight}">
			<scroll-view class="tab-list" scroll-x="true" @scroll="scroll">
				<view v-for="(item,index) in tabList" :key="item.id" class="tab-item"
					:class="index==currentTab?'selected-tab ':'nomal-tab'" @click="onTab(index,item)">
					<image v-if="index==0" :class="currentTab==0?'tab-img':'tab-img-un'"
						:src=" currentTab==0? 'https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/design_fire.png':'https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/desigon_unfire.png'"
						mode=""></image>
					<text>{{item.name}}</text>
					<view v-if="index==currentTab" class="current-select">

					</view>
				</view>
			</scroll-view>

			<scroll-view v-if="subChildren.length" style="height: 84rpx;line-height:84rpx" class="tab-list"
				scroll-x="true" @scroll="scroll">
				<view v-for="(item,index) in subChildren" :key="item.id" style="line-height:52rpx ;" class="tab-item"
					:class="index==subIndex?'sub-selected':'sub-unselected'" @click="onSubTab(index,item)">
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="" @click="toRealCase">
			真实案例
		</view>
		<design-list ref="designList"></design-list> -->

    <!-- 		<view v-if="goodsList.length==0" class="noMemo">
			<image class="noMemoImg" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/pic_empty%402x.png">
			</image>
			<view class="noMemoText">暂无内容~</view>
		</view>
		<view class="goods-list">
			<view class="item" v-for="(item,index) in goodsList" :key="item.id" @click="toGoodsDetail(item.id)">
				<image class="img" :src="item.imageUrl" mode=""></image>
				<view class="info">
					<view class="title">
						<text>{{item.name}}</text>
					</view>
					<view class="flex1">

					</view>
					<view class="price">
						¥
						<text class="amount">
							{{foramtPrice(item)}}
						</text>
						<text class="ex">.{{formatCent(item)}}</text>
						/{{item.unitName}}
					</view>
				</view>
			</view>
		</view>-->

    <view
      class="header-container"
      :style="{backgroundImage:`url(${bgImg2})`}"
    >
      <!-- <view class="backgroundStyle"
			></view> -->
      <view class="search_container">
        <view
          class="search_style"
          @click="findOwnDesigner()"
        >
          <image
            src="../../static/findDesingerSearchIcon.svg"
            mode=""
          ></image>
          <text>我想自己找...</text>
        </view>
        <image
          class="customerServiceIcon"
          @click="contactService"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/online-server.png"
        />
      </view>
      <view class="title">
        找设计
      </view>
      <view class="tab-container">
        <view
          class="tabItem"
          v-for="item1 in iconList"
          :key="item1"
        >
          <image
            :src="item1.url"
            mode=""
          ></image>
          <view style="color: #333333;font-size: 26rpx;">
            {{item1.name}}
          </view>
        </view>
      </view>
    </view>
    <view class="recommendForYou-container">
      <view class="title_container">
        <view class="left">
          为您推荐
        </view>
        <view
          class="right"
          @click="gotoMoreDesigner"
        >
          <text>更多</text>
          <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" />
        </view>
      </view>

    </view>
    <!-- 推荐设计师的名片 -->
    <view class="designCard_container">
      <scroll-view
        scroll-x="true"
        style="white-space: nowrap;"
        @scrolltolower="gotoNext"
      >
        <view
          class="design-card-item"
          v-for="item2 in searchDesignerList"
          :key="item2.id"
          :style="{backgroundImage:`url(${item2.artImage}?x-oss-process=image/resize,m_fill,h_572,w_434,limit_0)`,backgroundSize:'434rpx 572rpx'}"
          @click="gotoDesignerHomePage(item2.id)"
        >
          <view class="basic-info">
            <view class="header">
              <view class="name">{{item2.name}}</view>
              <view class="rank">{{item2.levelName}}</view>
            </view>
            <view
              class="goodPraise"
              style="margin-bottom: 8rpx;"
            >
              <view class="item">
                <text>好评率{{item2.praiseEfficiency}}%</text>
                <text class="icon"></text>
                <text>{{item2.industryYears}}年设计经验</text>
              </view>
            </view>
            <view class="attr">
              <view  class="attrItem" v-for=" item3 in item2.designs" :key="item3" >{{item3}}</view>
            </view>
          </view>
        </view>
        <view class="showMoreCard">
          <view class="content">
            <image
              src="../../static/showMoreCard.svg"
              mode=""
            ></image>
            <view class="text">
              左滑查看更多
            </view>
          </view>
        </view>
      </scroll-view>

    </view>
    <view
      class="perfectHouseInfo_container"
      @click="gotoEditHouse"
    >
      <!-- <view class="perfect_house_info"
			>
				<view class="title">
					完善房屋信息
				</view>
				<view class="sub_title">
					即可查看您家附近的案例
				</view>
				<view class="button">
					<text>去完善</text>
					<image src="../../static/gotoCase.svg" mode=""></image>
				</view>
			</view> -->
      <image
        class="bigImage"
        src="../../static/perfectHouseInfo.svg"
        mode=""
      ></image>

      <view
        class="btn"
        @click="gotoRealCase"
      >
        <text>去看推荐案例</text>
        <image src="../../static/gotoCase.svg" />
      </view>
    </view>

    <view class="recommendCase title_container">
      <view class="left">
        为您推荐
      </view>
      <view class="right">
        <text>更多</text>
        <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" />
      </view>
    </view>
    <view class="recommendCaseItem_container">
      <view
        :style="{backgroundImage:`url(${bgImg})`}"
        class="case-item"
        v-for="item4 in CaseList"
        :key="item4"
      >
        <view class="left">
          <view class="name_container">
            <view class="name">{{item.nikeName}}</view>
            <view class="cost">预算： {{item.budget|| "-"}} {{item.Similarity || "-"}}</view>
          </view>
          <view class="attr_container">
            <view class="attr_item">{{item.styleName}}</view>
            <view class="attr_item">极简简装</view>
          </view>
        </view>
        <image
          class="right"
          @click="toRealCase()"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg"
        />
      </view>
    </view>

  </view>
</template>

<script>
import { findDesign, defaultSkus } from "../../../api/home.js";
import DesignList from "./design-list.vue";

import {
  recommendCaseList,
  searchDesigner,
} from "../../../api/home-find-design.js";
export default {
  components: {
    DesignList,
  },
  data() {
    return {
      scrollTop: 0,
      navBarHeight: "",
      tabList: ["1", "2", "3"],
      currentTab: 0,
      subChildren: [],
      subIndex: 0,
      goodsList: [],
      //新加的
      userId: "",
      bgImg: "../../static/caseItemBg.svg",
      bgImg1:
        "https://ali-res-test.dabanjia.com/res/20211024/17/1635068528844_4631%24%E8%B6%85%E8%B6%8A3.jpg?x-oss-process=image/resize,m_mfit,w_686,h_686",
      bgImg2: "../../static/findDesignbg.svg",
      iconList: [
        {
          key: 1,
          url: "../../static/guomeiIcon.svg",
          name: "服务保障",
        },
        {
          key: 2,
          url: "../../static/pingtairenzheng.svg",
          name: "平台认证",
        },
        {
          key: 3,
          url: "../../static/yanxuan.svg",
          name: "严选设计师",
        },
        {
          key: 4,
          url: "../../static/baozhang.svg",
          name: "品质设计",
        },
      ],
      searchDesignerList: [], //设计师列表
      CaseList: [], //推荐列表
    };
  },
  onLoad() {
    const systemInfo = uni.getSystemInfoSync();
    this.navBarHeight = systemInfo.statusBarHeight + "px";
    findDesign().then((e) => {
      this.tabList = e;
      let id = "";
      if (this.tabList?.length) {
        id = this.tabList[0].id;
      }
      if (this.tabList?.length && this.tabList[0] && this.tabList[0].children) {
        this.subChildren = this.tabList[0].children;
        id = this.subChildren[0].id;
      }
      // this.getGoods(id)
    });
    this.getDesignerList();
    this.getRecommendCaseList();

    // 新加的
    this.userId = getApp().globalData.token;
    if (this.userId) {
      // 登录
    } else {
      // 未登录
    }
  },
  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
  },
  methods: {
    // getGoods(id) {
    // 	this.$refs.designList.getList(id)
    // 	// defaultSkus({
    // 	// 	relationType: 5,
    // 	// 	relationId: id
    // 	// }).then(e => {
    // 	// 	this.goodsList = e
    // 	// })
    // },
    foramtPrice(item) {
      let price = String(item.price || "0");
      return price.slice(0, price.length - 2) || "0";
    },
    formatCent(item) {
      let price = String(item.price || "0");
      let fixedNum = Number(price / 100).toFixed(2);
      if (String(fixedNum).split(".").length > 1) {
        return String(fixedNum).split(".")[1];
      } else {
        return "";
      }
    },
    onSubTab(index, item) {
      this.subIndex = index;
      // this.getGoods(item.id);
    },
    toGoodsDetail(id) {
      uni.navigateTo({
        url: "/sub-classify/pages/goods-detail/goods-detail?goodId=" + id,
      });
    },
    onTab(index, item) {
      this.currentTab = index;
      this.subIndex = 0;
      this.subChildren = this.tabList[index].children;
      let id = item.id;
      if (this.subChildren && this.subChildren.length) {
        id = this.subChildren[0].id;
      }
      // this.getGoods(id);
    },
    toBack() {
      uni.navigateBack({});
    },
    toRealCase() {
      uni.navigateTo({
        url: "/sub-home/pages/find-design/real-case/real-case",
      });
    },

    // 新加的
    gotoNext() {
      console.log("查看更多啊！！");
    },
    getRecommendCaseList() {
      recommendCaseList({}).then((res) => {
        this.CaseList = res;
        console.log("res1====", this.CaseList);
      });
    },
    getDesignerList() {
      let params = {
        page: 1,
        rows: 5,
        position: "",
        searchKey: "",
        topic: "",
        style: "",
        sortType: "", //排序类型 0:默认排序，1:服务次数排序 2： 好评率排序"
      };
      searchDesigner(params).then((res) => {
        console.log("userId==", getApp().globalData.token);
        console.log("getApp().globalData===", getApp().globalData.userInfo);
        this.searchDesignerList = res.list;
        console.log("res2====", res.list);
      });
    },

    //自己找设计师
    findOwnDesigner() {
      uni.navigateTo({
        url: "/sub-home/pages/find-design/designer-list",
      });
    },
    //联系客服
    contactService() {
      console.log("联系客服");
      this.$store.dispatch("openCustomerConversation");
      // uni.navigateTo({
      // 	url:""
      // })
    },
    //去完善房屋信息
    gotoEditHouse() {
      uni.navigateTo({
        url: "/sub-my/pages/my-house/my-house?fromHome=true",
      });
    },
    //更多设计师
    gotoMoreDesigner() {
      console.log("筛选更多设计师");
      uni.navigateTo({
        url: "/sub-home/pages/find-design/search-design",
      });
    },
    //去设计师个人主页
    gotoDesignerHomePage(zeusId) {
      console.log("zeusId====", zeusId);
      uni.navigateTo({
        url: `/sub-decorate/pages/person-page/person-page?personId=${zeusId}`,
      });
    },
    //去推荐案例
    gotoRealCase() {
      uni.navigateTo({
        url: "/sub-home/pages/find-design/real-case/real-case",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bg {
  width: 100%;
  // height: 420rpx;
  height: 156rpx;
  // background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/find_design_bg.png");
  background-size: contain;
  position: relative;

  .pleaholder {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 32rpx;
    background: #ffffff;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
  }
}
// 新添加的
.header-container {
  padding: 188rpx 0 36rpx 40rpx;
  position: relative;
  background-size: contain;
  position: relative;
  .backgroundStyle {
    position: absolute;
    height: 440rpx;
    top: 0;
  }
  .search_container {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-right: 32rpx;
    .search_style {
      width: 574rpx;
      height: 62rpx;
      box-sizing: border-box;
      border: 0.5px solid #999999;
      border-radius: 16rpx;
      background-color: #ffffff;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding-left: 24rpx;
      image {
        display: block;
        width: 25rpx;
        height: 26rpx;
        margin-right: 16rpx;
      }
      text {
        color: #cccccc;
        font-size: 26rpx;
      }
    }
    .customerServiceIcon {
      width: 76rpx;
      height: 76rpx;
    }
  }
  .title {
    padding-left: 2rpx;
    padding-top: 36rpx;
    color: #222222;
    font-size: 44rpx;
    font-weight: 500;
    letter-spacing: 1rpx;
    margin-bottom: 2rpx;
  }
  .tab-container {
    height: 36rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .tabItem {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-right: 24rpx;
      image {
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
      }
    }
    .tabItem:last-child {
      margin-right: 0;
    }
  }
}

.recommendForYou-container {
  background-color: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
}
.designCard_container {
  height: 698rpx;
  padding-left: 32rpx;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%);
  display: flex;
  align-items: center;
  scroll-view {
    .design-card-item {
      width: 434rpx;
      height: 698rpx;
      margin-right: 32rpx;
      background-color: pink;
      border-radius: 16rpx;
      background-color: #ffffff;
      background-repeat: no-repeat;
      background-position: top center;
      display: inline-block;
      position: relative;
      overflow: hidden;
      box-shadow: 4rpx 4rpx 10px #e5e5e5;
      .basic-info {
        position: absolute;
        bottom: 0;
        width: 434rpx;
        height: 170rpx;
        box-sizing: border-box;
        padding: 24rpx;
        background: linear-gradient(
          180deg,
          rgba(136, 141, 145, 0.79) -2.26%,
          rgba(74, 81, 86, 0.51) 100%
        );
        border-radius: 16rpx;
        backdrop-filter: blur(28rpx);
        // transform: matrix(1, 0, 0, -1, 0, 0);
        .header,
        .goodPraise {
          display: flex;
          align-items: center;
          margin-bottom: 4rpx;
          .name {
            color: #ffffff;
            font-size: 30rpx;
            display: block;
            height: 42rpx;
            line-height: 42rpx;
          }
          .rank {
            margin-left: 12rpx;
            height: 30rpx;
            box-sizing: border-box;
            padding: 0 8rpx;
            line-height: 26rpx;
            border: 0.5px solid #ffffff;
            box-sizing: border-box;
            border-radius: 4rpx;
            color: #ffffff;
            font-size: 20rpx;
          }
          .item {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            height: 34rpx;
            font-size: 24rpx;
            color: #ffffff;
            opacity: 0.6;
            text {
              line-height: 34rpx;
              color: #ffffff;
            }
            .icon {
              display: block;
              height: 20rpx;
              width: 2rpx;
              background: #ffffff;
              opacity: 0.7;
              margin: 0 16rpx;
            }
          }
        }

        .attr {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          .attrItem {
            height: 34rpx;
            line-height: 30rpx;
            box-sizing: border-box;
            border: 0.5px solid #ffffff;
            border-radius: 6rpx;
            padding: 0 12rpx;
            color: #ffffff;
            opacity: 0.6;
            font-size: 20rpx;
            margin-right: 12rpx;
          }
        }
      }
    }
    // .design-card-item:nth-last-child(1) {
    // 	margin-right: 0;
    // }
    .showMoreCard {
      width: 252rpx;
      height: 698rpx;
      border-radius: 32rpx 0 0 32rpx;
      display: inline-block;
      background-color: pink;
      position: relative;
      .content {
        position: absolute;
        left: 66rpx;
        top: 320rpx;
        image {
          width: 32rpx;
          height: 18rpx;
          margin-bottom: 10rpx;
        }
        .text {
          width: 144rpx;
          height: 34rpx;
          line-height: 34rpx;
          font-size: 24rpx;
          color: #ffffff;
          font-weight: 500;
        }
      }
    }
  }
}

.perfectHouseInfo_container {
  // margin: 54rpx 32rpx 60rpx;
  margin: 20rpx 0 60rpx;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .bigImage {
    width: 100%;
    height: 234rpx;
  }
  .perfect_house_info {
    width: 100%;
    padding: 24rpx 0 28rpx 56rpx;
    box-sizing: border-box;
    background: #fafaff;
    border: 3rpx solid #ffffff;
    box-sizing: border-box;
    border-radius: 32rpx;
    box-shadow: 0 2rpx 22rpx rgba(0, 0, 0, 0.02);
    .title {
      width: 218rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 36rpx;
      color: #333333;
      font-weight: 500;
    }
    .sub_title {
      height: 36rpx;
      line-height: 36rpx;
      width: 292rpx;
      color: #999999;
      font-size: 26rpx;
      margin-bottom: 26rpx;
    }
    .button {
      width: 150rpx;
      height: 54rpx;
      display: flex;
      align-items: center;
      padding: 10rpx 21rpx 10rpx 24rpx;
      background: linear-gradient(117.02deg, #fa3b34 24.56%, #ff6a33 92.21%);
      border-radius: 16rpx;
      image {
        width: 24rpx;
        height: 12rpx;
        display: block;
      }
      text {
        font-size: 24rpx;
        color: #ffffff;
      }
    }
  }
  .btn {
    margin-top: 34rpx;
    width: 321rpx;
    height: 64rpx;
    padding: 0 65rpx;
    box-sizing: border-box;
    border: 0.5px solid #fa4d32;
    display: flex;
    border-radius: 12rpx;
    align-items: center;
    text {
      color: #fa4d32;
      font-size: 26rpx;
    }
    image {
      display: block;
      width: 32rpx;
      height: 32rpx;
    }
  }
}

.title_container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 32rpx 26rpx 40rpx;
  .left {
    height: 44rpx;
    line-height: 44rpx;
    color: #333333;
    font-size: 32rpx;
    font-weight: 500;
  }
  .right {
    height: 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 14rpx 0 16rpx;
    box-sizing: border-box;
    border: 0.5px solid #adadad;
    border-radius: 16rpx;
    text {
      color: #333333;
      font-size: 22rpx;
    }
    image {
      display: block;
      width: 16rpx;
      height: 16rpx;
    }
  }
}
.recommendCaseItem_container {
  padding: 0 32rpx 32rpx;
  .case-item {
    height: 182rpx;
    padding: 24rpx 24rpx 24rpx 32rpx;
    margin-bottom: 20rpx;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: right bottom;
    border-radius: 16rpx;
    display: flex;
    flex: 1;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .left {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      flex: 1;
      .name_container {
        .name {
          height: 44rpx;
          font-size: 32rpx;
          color: #333333;
          margin-bottom: 4rpx;
        }
        .cost {
          height: 30rpx;
          line-height: 30rpx;
          color: #999999;
          font-size: 22rpx;
          margin-bottom: 16rpx;
        }
      }
      .attr_container {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        .attr_item {
          width: 128rpx;
          height: 40rpx;
          line-height: 40rpx;
          color: #999999;
          background-color: #f6f6f6;
          text-align: center;
          border-radius: 6rpx;
          font-size: 24rpx;
          margin-right: 16rpx;
        }
      }
    }
    .right {
      width: 40rpx;
      height: 40rpx;
    }
  }
}

// 之前的
// page {
// 	background: #FFF;
// }
.header-back {
  width: 82rpx;
  height: 82rpx;
  // background-color: #eee;
  color: #000;
  line-height: 82rpx;
  text-align: center;
}
.tes1t {
  width: 100%;
  height: 10000rpx;
  background-color: yellow;
}

.noMemo {
  width: 100%;
  height: fit-content;
}

.noMemo .noMemoImg {
  width: 750rpx;
  height: 580rpx;
  display: block;
}

.noMemo .noMemoText {
  width: fit-content;
  height: 36rpx;
  margin-top: 24rpx;
  margin-left: 324rpx;
  font-size: 26rpx;
  color: #999999;
}

.sub-selected {
  background: linear-gradient(129deg, #00cdec 4%, #00ed7d 100%);
  border-radius: 12rpx;
  font-size: 24rpx;
  padding: 16rpx;
  font-weight: 500;
  color: #ffffff;
  margin-left: 20rpx;
}

.sub-unselected {
  background: #f7f7f7;
  color: #999999;
  border-radius: 12rpx;
  font-size: 24rpx;
  padding: 16rpx;
  font-weight: 400;
  margin-left: 20rpx;
}

.tab-item {
  padding: 0 20rpx;
  text-align: center;
  display: inline-block;
  position: relative;
}

.current-select {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 32rpx;
  height: 4rpx;
  background: linear-gradient(129deg, #00cdec 0%, #00ed7d 92%);
  border-radius: 200rpx 200rpx 0rpx 0rpx;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tab-img {
  display: inline-block;
  width: 32rpx;
  height: 32rpx;
}

.tab-img-un {
  display: inline-block;
  width: 26rpx;
  height: 26rpx;
}

.nomal-tab {
  font-size: 26rpx;
  font-weight: 400;
  color: #696d70;
}

.selected-tab {
  font-weight: 500;
  font-size: 32rpx;
  color: #2d3033;
}

.sticky-view {
  position: sticky;
  position: -webkit-sticky;
  left: 0;
  right: 0;
  background-color: white;
}

.tab-list {
  height: 64rpx;
  line-height: 64rpx;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.goods-list {
  display: flex;
  margin-top: 24rpx;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  .item {
    margin-top: 16rpx;
    flex-shrink: 0;
    width: 343rpx;
    height: 520rpx;
    border-radius: 18rpx;
    border: 1rpx solid #e6eaed;
    margin-left: 21.3rpx;
    position: relative;
    overflow: hidden;

    .img {
      width: 100%;
      height: 343rpx;
    }

    .price {
      margin-bottom: 28rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #939699;
      line-height: 26rpx;

      .amount {
        font-size: 40rpx;
        font-weight: 400;
        color: #2b2f33;
        line-height: 42rpx;
      }

      .ex {
        font-size: 24rpx;
        font-weight: 400;
        color: #2b2f33;
        line-height: 26rpx;
      }
    }

    .info {
      padding: 0 24rpx;
      display: flex;
      flex-direction: column;
      height: 177rpx;

      .title {
        margin-top: 10rpx;
        font-size: 28rpx;
        font-weight: 600;
        color: #2b2f33;
        line-height: 40rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //这个代表你要在几行显示省略号
        -webkit-box-orient: vertical;
      }

      .tip {
        display: inline-block;
        height: 30rpx;
        line-height: 30rpx;
        margin-right: 10rpx;
        width: 60rpx;
        border-radius: 4rpx;
        border: 1rpx solid #00bfb6;
        text-align: center;
        font-weight: 500;
        color: #00bfb6;
        font-size: 20rpx;
      }

      .tip:before,
      .tip:after {
        display: inline-block;
        vertical-align: middle;
        content: "";
        height: 100%;
      }
    }
  }
}
</style>
