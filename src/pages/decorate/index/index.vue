<template>
  <view v-if="isLogin">
    <view class="decorate-index" v-if="estateList.length > 0">
      <image class="bg-index" 
        src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/bg%402x-4.png">
      </image>
      <view class="content flex-column">
        <view class="house-firend">
          <view class="title">
            <view class="house" @click="switchVisible">
              <text>{{who}}的家</text>
              <i class="icon icon-zhuangxiushouye_fuwuzhankaijiantou"></i>
            </view>
            <view class="friend" @click="toFriends">
              <view class="text">亲友团</view>
              <view class="friend-list">
                <image class="avtor" v-for="(item, index) in friendList" :key="item.id" :src="item.relativeAvatar"
                  :class="{avtor1: index == 0, avtor1: index == 0,avtor2: index == 1}"></image>
                <view class="avtor-more">
                  <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_avtor_more.svg">
                  </image>
                </view>
              </view>
            </view>
          </view>

          <view class="uni-padding-wrap">
            <view class="insurance-house">
              <view :class="{'payed':aServiceData.insuranceStatus}" class="insurance">
                <image @click="consultingService"
                
                  :src="aServiceData.insuranceStatus ? '../../../static/insurance-pay.png': '../../../static/insurance-unpay.png'">
                </image>
              </view>
              <view class="uni-title">{{ currentProject.housingEstate || '' }}{{currentProject.address || ''}}</view>
            </view>
            <view class="picture-btn-wrap">
              <picture-btn v-if="aServiceData.showDesignFlag"
                iconUrl="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_sgtz.svg" class="p-i-t"
                text="设计服务交付物内容" @gotoPage="goDesignPicture">
              </picture-btn>
              <picture-btn v-if="aServiceData.showActuaryFlag"
                iconUrl="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_jsd.svg" class="p-i-t"
                text="精算单" @gotoPage="goActuary">
              </picture-btn>
              <picture-btn v-if="aServiceData.showVideoFlag"
                iconUrl="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_gdsp.svg" class="p-i-t"
                text="工地视频" @gotoPage="goVideo"></picture-btn>
              <picture-btn v-if="aServiceData.constructionFlag"
                iconUrl="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_sg.svg" text="施工"
                @gotoPage="goConstrction"></picture-btn>
            </view>
          </view>
        </view>

        <view class="scroll-view flex-1">
          <!-- 每日播报 -->
          <text-scroll :show="showScroll" :dataList="broadcastList" v-if="isConstruction"
            @goDecorateCalendar="goDecorateCalendar"></text-scroll>
          <!-- 我的仓库 -->
          <view v-if="haveWarehouse" class="my-decorate-service-wrap">
            <view class="my-decorate-service ck">
              <view class="service-title flex-space-between-row">
                <text class="t">{{who}}的仓库</text>
                <view class="r flex-start-row" @click="goToMyWarehouse">
                  <text>查看全部</text>
                  <i class='icon-alert_notice_jump'></i>
                  </image>
                </view>
              </view>
              <view class="my-warehouse">
                <mwarehouse-btn
                  iconUrl="../../static/ic_ck_dfh.svg"
                  @gotoPage="gotoPage('0')" name="待发货">
                </mwarehouse-btn>
                <mwarehouse-btn
                  iconUrl="../../static/ic_ck_dsh.svg"
                  @gotoPage="gotoPage('1')" name="待收货">
                </mwarehouse-btn>
                <mwarehouse-btn
                  iconUrl="../../static/ic_ck_ysh.svg"
                  @gotoPage="gotoPage('2')" name="已收货">
                </mwarehouse-btn>
                <mwarehouse-btn iconUrl="../../static/ic_ck_tk.svg"
                  @gotoPage="gotoPage('3')" name="退款">
                </mwarehouse-btn>
              </view>
            </view>
          </view>
          <!-- 我的装修服务 -->
          <view class="my-decorate-service-wrap my-decorate-service-dec-wrap"
            v-if="purchasedServiceList.length > 0 || aServiceData.myServiceFlag">
            <view class="my-decorate-service">
              <view class="service-title flex-space-between-row">
                <text class="t">{{who}}的装修服务</text>
                <view class="r flex-start-row" v-if="aServiceData.myServiceFlag" @click="goToMyDecorate">
                  <text>查看全部</text>
                  <i class='icon-alert_notice_jump'></i>

                </view>
              </view>
              <service-item v-for="(item, index) in purchasedServiceList" :key="item.nodeType" :serviceData="item"
                :currentProject="currentProject">
              </service-item>
              <!--  -->
              <view v-if="aServiceData.projectStatus == 3 && purchasedServiceList.length == 0" class="jun-gong-da-ji">
                <image mode="aspectFit"
                  src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/img_finish.webp"></image>
              </view>
              <no-service v-if="aServiceData.projectStatus != 3 && purchasedServiceList.length == 0" words="暂无进行中服务">
              </no-service>
            </view>
          </view>
          <view class="tips-design-actuary">
            <view v-if="availGuides.length > 0" class="tips">
              购买相关服务 即刻开启装修
            </view>
            <guide-card v-if="availGuides.includes('design')" cardType="service"
              imageUrl="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/ic_myhouse_design2.png"
              @buyNow="gonohousedecatore('design')">
            </guide-card>
            <guide-card v-if="availGuides.includes('actuary')" cardType="actuary"
              imageUrl="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/ic_myhouse_actuary2.png"
              @buyNow="gonohousedecatore('actuary')">
            </guide-card>
          </view>

          <!-- 切换房屋弹窗 -->
          <uni-popup ref="sw">
            <house-switch class="margintop" :datalist="projectList" :current="currentProject.uid" @goAddHouse="addHouse"
              @checkHouse="changeCurrentProject"></house-switch>
          </uni-popup>
          <decorate-notice @touchmove.stop.prevent="()=>false" v-if="noticeActive" :num='msgNum'
            :current='currentProject.projectId' @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
        </view>
        <drag-button-follow v-if="msgNum>0&&dragButton" :num='msgNum' :style.sync="style" @btnClick='openNotice'
          :follow='`left,right`' className="drag-button" class="drag-button">
        </drag-button-follow>
      </view>
    </view>
    <no-house :showNoHouse="showNoHouse"></no-house>
  </view>
  <unlogin-page v-else />
</template>

<script>
  import {
    queryEstates,
    friendListByEstateId,
    getMsgNum,
    getCarouselMsg,
  } from "../../../api/decorate.js";
  import {
    getEstateProjectInfoList,
    availableService,
  } from "../../../api/project.js";
  import {
    HouseSwitch
  } from "../../../components/house-switch/house-switch.vue";
  import ServiceItem from "../../../components/service-item/service-item.vue";
  import NoService from "../../../components/no-service/no-service.vue";
  import {
    v4 as uuidv4
  } from "uuid";
  import GuideCard from "../../../components/guide-card/guide-card.vue";
  import PictureBtn from "../../../components/picture-btn/picture-btn.vue";

  import MwarehouseBtn from "../../../components/mwarehouse-btn/mwarehouse-btn.vue";
  import TextScroll from "../../../components/text-scroll/text-scroll.vue";
  import NoHouse from "../../../components/no-house/no-house.vue";
  import {
    mapGetters
  } from "vuex";
  // let timer = null;
  export default {
    components: {
      HouseSwitch,
      ServiceItem,
      GuideCard,
      NoService,
      PictureBtn,
      MwarehouseBtn,
      TextScroll,
      NoHouse,
    },
    onLoad() {
      this.showNoHouse = false;
      uni.$on("currentHouseChange", (item) => {
        this.homePageEstate = item;
        getApp().globalData.switchFlag = "home";
      });
    },
    onShow() {
      let scn = uni.getStorageSync("scn") || null;
      if (scn) {
        this.isLogin = true;
        console.log("showTabBar");
        this.showNoHouse = false;
        this.availGuides = [];
        if (!this.noticeActive) {
          uni.showTabBar();
        } else {
          uni.hideTabBar();
        }

        this.getEstateList();
        this.$store.dispatch("updateTabBarBadge");
        this.showScroll = true;
      } else {
        this.isLogin = false;
      }
    },
    onHide() {
      this.showScroll = false;
      if (this.$refs.sw) {
        this.$refs.sw.close();
      }
    },
    data() {
      return {
        style: "",
        noticeActive: false,
        currentProject: {},
        projectList: [],
        current: null,
        homePageEstate: null, // 首页选择房屋
        currentEstate: null,
        defaultEstate: null,
        estateList: [],
        friendList: [],
        purchasedServiceList: [],
        availableServiceList: [],
        defaultServices: [],
        availGuides: [],
        deviceId: "",
        accessKeyId: "LTAI5tKwuhb948v9oakqnbTf",
        instanceId: "post-cn-tl32ajx3u0l",
        groupId: "GID_dabanjia",
        token: "",
        msgNum: 0,
        aServiceData: {},
        haveWarehouse: false,

        who: "我",
        broadcastList: [],
        isConstruction: false,
        showNoHouse: false,
        showScroll: false,
        isLogin: false,
        dragButton: true,
      };
    },
    onPullDownRefresh() {
      this.getProjectList();
    },
    mounted() {
      uni.showTabBar();
      this.showNoHouse = false;
      uni.$on("system-messages", this.watchMsg);
      this.deviceId = uni.getStorageSync("uuDeviceId");
      if (!this.deviceId) {
        this.deviceId = uuidv4();
        uni.setStorageSync("uuDeviceId", this.deviceId);
      }
      getApp().globalData.screenHeight = uni.getSystemInfoSync().windowHeight;
      console.log(getApp().globalData.screenHeight, ">>>>>>>>当前屏幕高度");
    },
    methods: {
      guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function(c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      },
      goDecorateCalendar() {
        let type = this.currentProject.relegationType == 2 ? 0 : 1;
        uni.navigateTo({
          url: `/sub-home/pages/decorate-scene/decorate-calendar?projectId=${this.currentProject.projectId}&isDecorate=${type}`,
        });
      },
      getCarouselMsg() {
        if (this.currentProject.projectId) {
          getCarouselMsg(this.currentProject.projectId).then((data) => {
            this.broadcastList = data;
            if (this.broadcastList?.length < 1) {
              this.broadcastList = [{
                recordTime: "",
                content: "暂无施工消息",
              }, ];
            }

            this.isConstruction = this.currentProject.showBroadcast || false;
          });
        }
      },
      watchMsg() {
        this.getMsgNum();
        this.getAvailableService();
      },
      consultingService() {
        if (this.aServiceData.insuranceStatus === 1) {
          return;
        }
        uni.showModal({
          title: "",
          content: "为了您房屋装修可以得到更好的保障，建议您购买工地保险，详情可咨询客服",
          confirmText: "去咨询",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认");
              this.$store.dispatch("openCustomerConversation");
            } else {
              console.log("点击了取消");
            }
          },
        });
      },
      getAvailableService() {
        this.availGuides = [];
        this.isConstruction = false;
        availableService({
            relegationType: this.currentProject.relegationType,
            projectId: this.currentProject.projectId,
          })
          .then((data) => {
            const {
              purchasedServiceList,
              availableServiceList,
              defaultServices,
              constructionFlag,
              insuranceStatus,
              showActuaryFlag,
              showDesignFlag,
              showVideoFlag,
              projectStatus,
              myServiceFlag,
            } = data;
            this.purchasedServiceList = purchasedServiceList || [];
            this.availableServiceList = availableServiceList || [];
            this.defaultServices = defaultServices || [];
            this.aServiceData = {
              constructionFlag,
              insuranceStatus,
              showActuaryFlag,
              showDesignFlag,
              showVideoFlag,
              projectStatus,
              myServiceFlag,
            };
            this.availGuides = [];
            this.defaultServices &&
              this.addServiceCard(this.defaultServices, "serviceType");
            this.availableServiceList &&
              this.addServiceCard(this.availableServiceList, "nodeType");
            this.haveWarehouse = this.currentProject.existWarehouse || false;

            uni.stopPullDownRefresh();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      addServiceCard(arr, key) {
        arr.forEach((t) => {
          if (t[key] === 1) {
            this.availGuides.push("design");
          }
          if (t[key] === 4) {
            this.availGuides.push("actuary");
          }
        });
        console.log(this.availGuides);
      },
      async getFriendsList() {
        let list = await friendListByEstateId({
          estateId: this.currentProject.estateId,
        });
        this.friendList = list.length > 2 ? list.slice(0, 2) : list;
      },
      toFriends() {
        uni.navigateTo({
          url: "/sub-decorate/pages/friends/friends?id=" +
            this.currentProject.estateId,
        });
      },
      addHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
      changeCurrentProject(item, isOpenMsgList) {
        this.currentProject = item;
        console.log('111111111111111',item)
        getApp().globalData.switchFlag = "decorate";
        
        if (this.currentProject?.showBroadcast) {
          this.getCarouselMsg();
        }
				uni.setStorageSync(
					'houseListChooseId',
					item.estateId,
				);
        this.initData(item);
        let index = 0;
        let firstItem = null;
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i].uid === this.currentProject.uid) {
            index = i;
            firstItem = {
              ...this.projectList[i],
            };
            break;
          }
        }
        if (index !== 0) {
          console.log("被切换的项目索引", "-", index);
          let arr = [...this.projectList];
          arr.splice(index, 1);
          arr.unshift(firstItem);
          this.projectList = [...arr];
        }
        if (this.currentEstate) {
          uni.$emit("selectedHouse", this.currentEstate);
        }

        // 是否需要打开消息弹窗
        if (isOpenMsgList) {
          this.openNotice();
        }
        this.$refs.sw.close();
      },
      getProjectList() {
        getEstateProjectInfoList({
          isNeedRelative: true,
        }).then((data) => {
          // 有房屋有服务，初始化当前的默认房屋
          if (data && data.length > 0) {
            data.forEach((item) => {
              // 因为项目列表中的projectId字段没有，所以唯一标识用guid方法生成
              item.uid = this.guid();
            });
            console.log(">>>>>>>>data", data);
            //将默认项目放在首位
            data.sort((a, b) => {
              if (a.defaultEstate && a.relegationType === 1) {
                return -1;
              }
              return b.createTime - a.createTime;
            });
            //end
            this.projectList = data;
            const {
              currentProject,
              switchFlag,
              msgProjectId
            } =
            getApp().globalData;
            // 设置当前的项目
            let arr = [];
            let isMsgAndProjectExist = 0; // 0,不是消息跳转，1是消息跳转但项目已经不存在了，2是从消息跳转，且项目存在
            if (msgProjectId) {
              let temp = data.some((t) => t.projectId === msgProjectId);
              console.log("temp>>>>>>>>>>", temp);
              isMsgAndProjectExist = temp ? 2 : 1;
            }
            if (isMsgAndProjectExist === 2) {
              //从消息跳转过来
              arr = data.filter((t) => t.projectId === msgProjectId);
              this.currentProject = arr[0];
              // 打开消息弹窗
              this.noticeActive = true;
              this.changeCurrentProject(this.currentProject, true);
              getApp().globalData.msgProjectId = null;
            } else {
              if (isMsgAndProjectExist === 1) {
                this.noticeActive = true;
                getApp().globalData.msgProjectId = null;
              }
              if (switchFlag === "home") {
                arr = data.filter(
                  (t) =>
                  t.estateId === this.homePageEstate?.id ||
                  t.estateId === getApp().globalData.currentHouse?.id
                );
                if (arr.length > 1) {
                  arr = arr.filter(
                    (t) => t.projectStatus !== 3 && t.projectStatus !== 4
                  );
                }
              } else {
                arr = data.filter(
                  (t) => t.projectId === currentProject?.projectId
                );
              }
              if (arr.length === 0) {
                arr = data.filter(
                  (t) => t.defaultEstate && t.relegationType === 1
                );
              }
              if (arr && arr.length > 0) {
                this.currentProject = arr[0];
              } else {
                this.currentProject = data[0];
              }
              this.initData(this.currentProject);
            }
            if (this.currentProject?.showBroadcast) {
              this.getCarouselMsg();
            }
            // end
          }
        });
      },
      // 根据查询出来的项目信息处理
      initData(obj) {
        this.getMsgNum();
        this.who = this.currentProject.relegationType == 2 ? "亲友" : "我";
        this.currentEstate = this.estateList.filter(
          (t) => t.id === obj.estateId
        )[0];
        getApp().globalData.currentEstate = this.currentEstate;
        getApp().globalData.currentProject = this.currentProject;
        if (this.currentProject.estateId) {
          this.getAvailableService();
          this.getFriendsList();
        }
      },
      switchVisible() {
        this.$refs.sw.open("top");
      },
      goConstrction() {
        uni.navigateTo({
          url: `/sub-decorate/pages/construction/construction?projectId=${this.currentProject.projectId}`,
        });
      },
      goDesignPicture() {
        uni.navigateTo({
          url: `/sub-home/pages/decorate-scene/construction-drawings?projectId=${this.currentProject.projectId}`,
        });
      },
      goActuary() {
        uni.navigateTo({
          url: `/sub-decorate/pages/actuary-detail/actuary-detail?projectId=${this.currentProject.projectId}&isClient=1&estateId=${this.currentProject.estateId}`,
        });
      },
      goVideo() {
        uni.navigateTo({
          url: `/sub-home/pages/lives-decorate/lives-decorate?projectId=${this.currentProject.projectId}`,
        });
      },
      gonohousedecatore(type) {
        if (this.currentEstate && this.currentEstate.id) {
          let url = null;
          if (this.currentProject && this.currentProject.projectId) {
            url =
              `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=${type}&estateId=${this.currentProject.estateId}&projectId=${this.currentProject.projectId}&isDecorate=1&from=decorateIndex`;
          } else {
            url =
              `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=${type}&estateId=${this.currentProject.estateId}&isDecorate=1&from=decorateIndex`;
          }
          uni.navigateTo({
            url,
          });
        } else {
          uni.navigateTo({
            url: `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=${type}&isDecorate=1&from=decorateIndex`,
          });
        }
      },
      closeNotice() {
        this.noticeActive = false;
        console.log("showTabBar");
        uni.showTabBar();
      },
      openNotice() {
        this.noticeActive = true;
        console.log("hideTabBar");
        uni.hideTabBar();
      },
      goToAddHouseInfo() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
      goToMyDecorate() {
        uni.navigateTo({
          url: "/sub-decorate/pages/my-decorate/my-decorate?processId=" +
            this.currentProject.processId +
            "&projectId=" +
            this.currentProject.projectId,
        });
      },
      goToMyWarehouse() {
        uni.navigateTo({
          url: `/sub-decorate/pages/warehouse-list/warehouse-list?projectId=${this.currentProject.projectId}`,
        });
      },
      gotoPage(value) {
        uni.navigateTo({
          url: `/sub-decorate/pages/warehouse-list/warehouse-list?projectId=${this.currentProject.projectId}&type=${value}`,
        });
      },
      getEstateList() {
        queryEstates({
            isNeedRelative: false,
          },
          true
        ).then((data) => {
          if (!data || (data instanceof Array && data.length < 1)) {
            uni.hideTabBar();
            this.showNoHouse = true;
          } else {
            const temp = data.filter((t) => t.defaultEstate);
            this.defaultEstate = temp && temp.length > 0 ? temp[0] : null;
            this.estateList = data;
            this.getProjectList();
          }
        });
      },
      getMsgNum() {
        if (this.currentProject && this.currentProject.projectId) {
          this.dragButton = false;
          this.style = "";
          getMsgNum(this.currentProject.projectId).then((res) => {
            this.msgNum = res.count + "";
            this.dragButton = true;
            getApp().globalData.decorateMsgNum = this.msgNum;
            uni.stopPullDownRefresh();
            if (res.count === 0) {
              console.log(1111);
              uni.removeTabBarBadge({
                index: 2,
              });
            } else {
              let num = res.count + "";
              uni.setTabBarBadge({
                index: 2,
                text: this.msgNum,
              });
            }
          });
        } else {
          this.msgNum = 0;
          uni.removeTabBarBadge({
            index: 2,
          });
        }
      },
    },
  };
</script>

<style lang="scss">
  .decorate-index {
    position: relative;
    padding-top: 176rpx;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;

    .bg-index {
      top: 0;
      width: 100%;
      height: 480rpx;
      position: fixed;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9;
    height: 100%;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-1 {
    flex: 1;
  }

  .scroll-view {
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 112rpx;
  }

  .house-firend {
    position: relative;
    height: 242rpx;

    .title {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      margin-bottom: 4rpx;
    }

    .house {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      margin-left: 40rpx;

      .icon {
        font-size: 15px;
        color: #333;
      }

      text {
        height: 56rpx;
        font-size: 40rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 56rpx;
        letter-spacing: 2rpx;
        margin-right: 9rpx;
      }
    }

    .friend {
      margin-right: 32rpx;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;

      view.text {
        height: 40rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #666666;
        line-height: 40rpx;
        margin-right: 16rpx;
      }

      .friend-list {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;

        .avtor {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
        }

        .avtor2,
        .avtor-more {
          margin-left: -12rpx;
        }

        .avtor2 {
          z-index: 9;
        }

        .avtor-more {
          box-sizing: border-box;
          width: 40rpx;
          height: 40rpx;
          background: #f5f6f6;
          border: 1rpx solid #f5f6f6;
          border-radius: 50%;
          z-index: 99;

          image {
            width: 20rpx;
            height: 4rpx;
            margin: 17rpx 10rpx;
          }
        }
      }
    }

    .picker-view {
      width: 750rpx;
      height: 600rpx;
      margin-top: 20rpx;
    }

    .item {
      height: 50px;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .uni-padding-wrap {
      margin-left: 40rpx;
      height: 182rpx;

      .insurance-house {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-bottom: 40rpx;
      }

      .insurance {
        width: 128rpx;
        height: 32rpx;
        margin-right: 16rpx;

        image {
          width: 128rpx;
          height: 32rpx;
        }
      }

      .insurance.payed {
        width: 128rpx;
        height: 32rpx;
        // background-color: #fff;
        image {
          width: 128rpx;
          height: 32rpx;
          // background-color: #fff;
          z-index: 10;
        }
      }

      .uni-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 1rpx;
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        margin-right: 40rpx;
        color: #333;
        line-height: 34rpx;
      }
    }
  }

  .my-decorate-service-dec-wrap {
    .my-decorate-service {
      padding: 32rpx 24rpx;
      position: relative;
    }
    .service-title {
      padding: 0 8rpx;
    }
  }

  .my-decorate-service-wrap {
    position: relative;
    margin: 0 24rpx 16rpx;
    background: #ffffff;
    border-radius: 16rpx;
    min-height: 256rpx;
  }

  .my-warehouse {
    display: flex;
    height: 106rpx;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-end;
    // padding: 0 20rpx;
    margin-bottom: 8rpx;
    background: #ffffff;
  }

  .my-decorate-service {
    padding: 32rpx;
    position: relative;
  }
  .ck.my-decorate-service {
    padding: 32rpx 0;
    position: relative;
  }
  .ck.my-decorate-service {
    .service-title {
      margin: 0 32rpx 32rpx;
    }
  }
  .top-bg {
    width: 100%;
    height: 108rpx;
  }

  .flex-space-between-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .flex-start-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }

  .service-title {
    margin-bottom: 32rpx;

    .t {
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      text-align: left;
      color: #333333;
      letter-spacing: 1rpx;
    }

    .r {
      text {
        height: 36rpx;
        margin-right: 16rpx;
        font-size: 26rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #999999;
        line-height: 36rpx;
      }

      i {
        font-size: 24rpx;
        color: #b9b9b9;
      }
    }
  }

  .drag-button {
    // background: #ffffff;
    // border: 0.5px solid #eeeeee;

    // width: 100rpx;
    // height: 100rpx;
    // font-size: 24rpx;
    // color: #000000;
    position: absolute;
    right: 0rpx;
    top: 588rpx;
    z-index: 99;
    // border-radius: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }

  .tips-design-actuary {
    margin: 0 24rpx;

    .tips {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #333333;
      line-height: 40rpx;
      letter-spacing: 2rpx;
      padding-top: 34rpx;
      margin-bottom: 24rpx;
    }
  }

  .picture-btn-wrap {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    justify-items: center;
    padding-right: 40rpx;

    .p-i-t {
      margin-right: 24rpx;
    }
  }

  .jun-gong-da-ji {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 360rpx;
    background-color: #FBFBFB;
    border-radius: 24rpx;
    image {
      width: 240rpx;
    }
  }
</style>