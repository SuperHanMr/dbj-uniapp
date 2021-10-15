<template>
  <view>
    <view class="decorate-index" v-if="estateList.length > 0">
      <image class="bg-index" mode="aspectFit"
        src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/bg@2x-3.png">
      </image>
      <view class="content flex-column">
        <view class="house-firend">
          <view class="title">
            <view class="house" @click="switchVisible">
              <text>{{who}}的家</text>
              <image class="ic-triangle"
                src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle.svg">
              </image>
            </view>
            <view class="friend">
              <text>亲友团</text>
              <view class="friend-list">
                <image class="avtor" v-for="(item, index) in friendList" :key="item.id" :src="item.relativeAvatar"
                  :class="{avtor1: index == 0, avtor1: index == 0,avtor2: index == 1}"></image>
                <view class="avtor-more" @click="toFriends">
                  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_avtor_more.svg">
                  </image>
                </view>
              </view>
            </view>
          </view>

          <view class="uni-padding-wrap">
            <view class="insurance-house">
              <view :class="{'payed':aServiceData.insuranceStatus}" class="insurance">
                <image @click="consultingService"
                  :src="aServiceData.insuranceStatus ? 'http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/insurance-pay.svg': 'http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/insurance-unpay.svg'">
                </image>
              </view>
              <view class="uni-title">{{ currentProject.housingEstate }}{{currentProject.address}}</view>
            </view>
            <view class="picture-btn-wrap">
              <picture-btn v-if="aServiceData.showDesignFlag"
                iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_sgtz.svg" class="p-i-t"
                text="施工图纸" @gotoPage="goDesignPicture">
              </picture-btn>
              <picture-btn v-if="aServiceData.showActuaryFlag"
                iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_jsd.svg" class="p-i-t" text="精算单"
                @gotoPage="goActuary">
              </picture-btn>
              <picture-btn v-if="aServiceData.showVideoFlag"
                iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_gdsp.svg" class="p-i-t"
                text="工地视频" @gotoPage="goVideo"></picture-btn>
              <picture-btn v-if="aServiceData.constructionFlag"
                iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_sg.svg" text="施工"
                @gotoPage="goConstrction"></picture-btn>
            </view>
          </view>
        </view>

        <view class="scroll-view flex-1">
          <!-- 每日播报 -->
          <text-scroll :dataList="broadcastList" v-if="broadcastList.length > 0 && isConstruction"
            @goDecorateCalendar="goDecorateCalendar"></text-scroll>
          <!-- 我的仓库 -->
          <view v-if="haveWarehouse" class="my-decorate-service-wrap">
            <view class="top-bg"></view>
            <view class="my-decorate-service">
              <view class="service-title flex-space-between-row">
                <text class="t">{{who}}的仓库</text>
                <view class="r flex-start-row" @click="goToMyWarehouse">
                  <text>查看全部</text>
                  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg">
                  </image>
                </view>
              </view>
              <view class="my-warehouse">
                <mwarehouse-btn iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_ck_dfh.svg"
                  @gotoPage="gotoPage('0')" name="待发货">
                </mwarehouse-btn>
                <mwarehouse-btn iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_ck_dsh.svg"
                  @gotoPage="gotoPage('1')" name="待收货">
                </mwarehouse-btn>
                <mwarehouse-btn iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_ck_ysh.svg"
                  @gotoPage="gotoPage('2')" name="已收货">
                </mwarehouse-btn>
                <mwarehouse-btn iconUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_ck_tk.svg"
                  @gotoPage="gotoPage('3')" name="退款">
                </mwarehouse-btn>
              </view>
            </view>
          </view>
          <!-- 我的装修服务 -->
          <view class="my-decorate-service-wrap" v-if="purchasedServiceList.length > 0 || aServiceData.myServiceFlag">
            <view class="top-bg"></view>
            <view class="my-decorate-service">
              <view class="service-title flex-space-between-row">
                <text class="t">{{who}}的装修服务</text>
                <view class="r flex-start-row" v-if="aServiceData.myServiceFlag" @click="goToMyDecorate">
                  <text>查看全部</text>
                  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg">
                  </image>
                </view>
              </view>
              <service-item v-for="(item, index) in purchasedServiceList" :key="item.nodeType" :serviceData="item"
                :currentProject="currentProject">
              </service-item>
              <no-service v-if="purchasedServiceList.length == 0" words="暂无进行中服务"></no-service>
            </view>
          </view>
          <view v-if="aServiceData.projectStatus == 3" class="jun-gong-da-ji">
            竣工大吉
          </view>
          <view class="tips-design-actuary">
            <view v-if="availGuides.length > 0" class="tips">
              购买相关服务 即刻开启装修
            </view>
            <guide-card v-if="availGuides.includes('design')" cardType="service"
              imageUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_myhouse_design%402x.png"
              @buyNow="gonohousedecatore('design')">
            </guide-card>
            <guide-card v-if="availGuides.includes('actuary')" cardType="actuary"
              imageUrl="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_myhouse_actuary%402x.png"
              @buyNow="gonohousedecatore('actuary')">
            </guide-card>
          </view>

          <!-- 切换房屋弹窗 -->
          <uni-popup ref="sw">
            <house-switch class="margintop" :datalist="projectList" :current="currentProject.estateId"
              @goAddHouse="addHouse" @checkHouse="changeCurrentProject"></house-switch>
          </uni-popup>
          <decorate-notice @touchmove.stop.prevent="()=>false" v-if="noticeActive" :num='msgNum'
            :current='currentProject.projectId' @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
          <!-- <view class="link">
            <view @click="gonohouse">无房屋无服入口</view>
            <view @click="gonohousedecatore('decorate')">无房屋无服务装修</view>
            <view @click="gonohousedecatore('checkHouse')">无房屋无服务验房</view>
            <view @click="checkHouseRemind">验房提醒</view>
            <view @click="confirm1">设计交付</view>
            <view @click="confirm4">线上交底</view>
            <view @click="dsport">设计报告交付</view>
            <view @click="hcaa">管家竣工验收申请</view>
            <view @click="workerCapplication">工人阶段验收申请</view>
            <view @click="gjgxf">工序费</view>
          </view> -->
        </view>
        <drag-button-follow v-if="msgNum>0" :num='msgNum' :style.sync="style" @btnClick='openNotice'
          :follow='`left,right`' className="drag-button" class="drag-button">
          <view>
            <text>消息</text>
            <text style="color: red;">2</text>
          </view>
        </drag-button-follow>
      </view>
    </view>
    <no-house :showNoHouse="showNoHouse"></no-house>
  </view>
</template>

<script>
  import "./index.scss"
  import {
    queryEstates,
    friendListByEstateId,
    getMsgNum,
    getCarouselMsg
  } from "../../../api/decorate.js";
  import {
    getEstateProjectInfoList,
    availableService
  } from "../../../api/project.js";
  import {
    HouseSwitch
  } from "../../../components/house-switch/house-switch.vue"
  import ServiceItem from "../../../components/service-item/service-item.vue"
  import NoService from "../../../components/no-service/no-service.vue"
  import {
    v4 as uuidv4
  } from 'uuid';
  import GuideCard from "../../../components/guide-card/guide-card.vue"
  import PictureBtn from "../../../components/picture-btn/picture-btn.vue"

  import MwarehouseBtn from "../../../components/mwarehouse-btn/mwarehouse-btn.vue"
  import TextScroll from "../../../components/text-scroll/text-scroll.vue"
  import NoHouse from "../../../components/no-house/no-house.vue"
  import {
    mapGetters
  } from "vuex";
  let timer = null;
  export default {
    components: {
      HouseSwitch,
      ServiceItem,
      GuideCard,
      NoService,
      PictureBtn,
      MwarehouseBtn,
      TextScroll,
      NoHouse
    },
    onLoad() {
      this.showNoHouse = false
      uni.$on("currentHouseChange", (item) => {
        this.homePageEstate = item
        getApp().globalData.switchFlag = "home"
      })
    },
    onShow() {
      console.log('showTabBar')
      this.showNoHouse = false
      this.availGuides = []
      uni.showTabBar()
      // const {
      //   currentHouse
      // } = getApp().globalData
      // if (currentHouse?.id) {
      //   this.getEstateList()
      //   this.$store.dispatch("updateTabBarBadge");
      // } else {
      //   this.getEstateList()
      //   // this.showNoHouse = true
      // }
      this.getEstateList()
      this.$store.dispatch("updateTabBarBadge")
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

        deviceId: '',
        accessKeyId: 'LTAI5tKwuhb948v9oakqnbTf',
        instanceId: 'post-cn-tl32ajx3u0l',
        groupId: 'GID_dabanjia',
        token: '',
        msgNum: 0,
        aServiceData: {},
        haveWarehouse: false,

        who: "我",
        broadcastList: [],
        isConstruction: false,
        showNoHouse: false
      };
    },
    mounted() {
      uni.showTabBar()
      this.showNoHouse = false
      // const {
      //   currentHouse
      // } = getApp().globalData
      uni.$on('system-messages', this.watchMsg)
      this.deviceId = uni.getStorageSync('uuDeviceId')
      if (!this.deviceId) {
        this.deviceId = uuidv4()
        uni.setStorageSync('uuDeviceId', this.deviceId);
      }
      
    },
    destory() {
      clearTimeout(timer)
      timer = null
    },
    methods: {
      guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      goDecorateCalendar(date) {
        console.log("date: ", date)
        uni.navigateTo({
          url: `/sub-home/pages/decorate-scene/decorate-calendar?projectId=${this.currentProject.projectId}&date=${date}&isDecorate=1`
        })
      },
      getCarouselMsg() {
        if (this.currentProject.projectId) {
          getCarouselMsg(this.currentProject.projectId).then(data => {
            this.broadcastList = data
          })
        }
      },
      watchMsg() {
        this.getMsgNum();
        this.getAvailableService()
      },
      consultingService() {
        if (this.aServiceData.insuranceStatus === 1) {
          return
        }
        uni.showModal({
          title: "",
          content: "为了您房屋装修可以得到更好的保障，建议您购买工地保险，详情可咨询客服",
          confirmText: "去咨询",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
              this.$store.dispatch("openCustomerConversation")
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      getAvailableService() {
        this.availGuides = []
        this.isConstruction = false
        availableService({
          relegationType: this.currentProject.relegationType,
          projectId: this.currentProject.projectId
        }).then(data => {
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
            myServiceFlag
          } = data
          this.purchasedServiceList = purchasedServiceList || []
          this.availableServiceList = availableServiceList || []
          this.defaultServices = defaultServices || []
          this.aServiceData = {
            constructionFlag,
            insuranceStatus,
            showActuaryFlag,
            showDesignFlag,
            showVideoFlag,
            projectStatus,
            myServiceFlag
          }
          this.availGuides = []
          this.defaultServices && this.addServiceCard(this.defaultServices, "serviceType")
          this.availableServiceList && this.addServiceCard(this.availableServiceList, "nodeType")
          this.haveWarehouse = this.purchasedServiceList.filter(t => t.nodeType >= 5).length > 0
          for (let i = 0; i < this.purchasedServiceList.length; i++) {
            if ([5, 6, 7, 8, 9, 10].includes(this.purchasedServiceList[i].nodeType) && (this.purchasedServiceList[i]
                .status >= 2 || (this.purchasedServiceList[i].status == 0 && this.purchasedServiceList[i]
                  .grepOrderStatus === 3))) {
              this.isConstruction = true
              break
            }
          }
          if (this.isConstruction) {
            this.getCarouselMsg()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      addServiceCard(arr, key) {
        arr.forEach(t => {
          if (t[key] === 1) {
            this.availGuides.push("design")
          }
          if (t[key] === 4) {
            this.availGuides.push("actuary")
          }
        })
        console.log(this.availGuides)
      },
      checkHouseRemind() {
        uni.navigateTo({
          url: "/sub-decorate/pages/check-house-remind/check-house-remind?serverCardId=36"
        })
      },
      confirm1() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-deliver/design-deliver"
        })
      },
      dsport() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-report/design-report"
        })
      },
      confirm4() {
        uni.navigateTo({
          url: `/sub-decorate/pages/design-online-disclosure/design-online-disclosure?serverId=34`
        })
      },
      hcaa() {
        uni.navigateTo({
          url: `/sub-decorate/pages/housekeeper-c-a-application/housekeeper-c-a-application?projectId=${this.currentProject.projectId}`
        })
      },
      housekeeperrefuse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/housekeeper-refuse/housekeeper-refuse"
        })
      },
      workerCapplication() {
        uni.navigateTo({
          url: "/sub-decorate/pages/worker-c-application/worker-c-application"
        })
      },
      async getFriendsList() {
        let list = await friendListByEstateId({
          estateId: this.currentProject.estateId
        });
        this.friendList = list.length > 2 ? list.slice(0, 2) : list
      },
      toFriends() {
        uni.navigateTo({
          url: "/sub-decorate/pages/friends/friends?id=" + this.currentProject.estateId,
        });
      },
      addHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house"
        })
      },
      changeCurrentProject(item) {
        this.currentProject = item
        getApp().globalData.switchFlag = 'decorate'
        this.initData(item)
        this.$refs.sw.close()
      },
      getProjectList() {
        getEstateProjectInfoList({
          isNeedRelative: true
        }).then(data => {
          // 有房屋有服务，初始化当前的默认房屋
          if (data && data.length > 0) {
            data.forEach(item => {
              // 因为项目列表中的projectId字段没有，所以唯一标识用guid方法生成
              item.uid = this.guid()
            })
            this.projectList = data
            const {
              currentProject,
              switchFlag
            } = getApp().globalData
            // 设置当前的项目
            let arr = []
            if (switchFlag === "home") {
              arr = data.filter(t => t.estateId === this.homePageEstate?.id || t.estateId === getApp().globalData
                .currentHouse?.id)
            } else {
              arr = data.filter(t => t.projectId === currentProject?.projectId)
            }
            if (arr.length === 0) {
              arr = data.filter(t => t.defaultEstate && t.relegationType === 1)
            }
            if (arr && arr.length > 0) {
              this.currentProject = arr[0]
              this.initData(arr[0])
            } else {
              this.currentProject = data[0]
              this.initData(data[0])
            }
            // end
          }
        })
      },
      // 根据查询出来的项目信息处理
      initData(obj) {
        this.getMsgNum()
        this.who = this.currentProject.relegationType == 2 ? "亲友" : "我"
        this.currentEstate = this.estateList.filter(t => t.id === obj.estateId)[0]
        getApp().globalData.currentEstate = this.currentEstate
        getApp().globalData.currentProject = this.currentProject
        if (this.currentProject.estateId) {
          this.getAvailableService()
          this.getFriendsList()
        }
      },
      bindChange(e) {
        console.log(e);
      },
      switchVisible() {
        this.$refs.sw.open('top')
      },
      goConstrction() {
        uni.navigateTo({
          url: `/sub-decorate/pages/construction/construction`
        })
      },
      goDesignPicture() {
        uni.navigateTo({
          url: `/sub-home/pages/decorate-scene/construction-drawings?projectId=${this.currentProject.projectId}`
        })
      },
      goActuary() {
        uni.navigateTo({
          url: `/sub-decorate/pages/actuary-detail/actuary-detail?projectId=${this.currentProject.projectId}`
        })
      },
      goVideo() {
        uni.navigateTo({
          url: `/sub-home/pages/lives-decorate/lives-decorate?projectId=${this.currentProject.projectId}`
        })
      },
      gonohousedecatore(type) {
        if (this.currentEstate && this.currentEstate.id) {
          let url = null
          if (this.currentProject && this.currentProject.projectId) {
            url =
              `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=${type}&estateId=${this.currentEstate.id}&projectId=${this.currentProject.projectId}&isDecorate=1`
          } else {
            url =
              `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=${type}&estateId=${this.currentEstate.id}&isDecorate=1`
          }
          uni.navigateTo({
            url
          })
        } else {
          uni.navigateTo({
            url: `/sub-decorate/pages/no-house-decorate/no-house-decorate?type=${type}&isDecorate=1`
          })
        }

      },
      gjgxf() {
        uni.navigateTo({
          url: `/sub-decorate/pages/gj-process-cost/gj-process-cost?partpay=1&projectId=${this.currentProject.projectId}&estateId=${this.currentProject.estateId}&roleType=10&serviceType=5&obtainType=0`
        })
      },
      gonohouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house/no-house"
        })
      },
      closeNotice() {
        this.noticeActive = false;
        console.log('showTabBar')
        uni.showTabBar()
      },
      openNotice() {
        this.noticeActive = true
        console.log('hideTabBar')
        uni.hideTabBar()
      },
      goToAddHouseInfo() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
      goToMyDecorate() {
        uni.navigateTo({
          url: "/sub-decorate/pages/my-decorate/my-decorate?processId=" + this.currentProject.processId +
            '&projectId=' + this.currentProject.projectId,
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
          isNeedRelative: false
        }, true).then(data => {
          if (!data || (data instanceof Array && data.length < 1)) {
            uni.hideTabBar()
            this.showNoHouse = true
          } else {
            const temp = data.filter(t => t.defaultEstate)
            this.defaultEstate = temp && temp.length > 0 ? temp[0] : null
            this.estateList = data;
            this.getProjectList();
          }
        });
      },
      getMsgNum() {
        if (this.currentProject && this.currentProject.projectId) {
          getMsgNum(this.currentProject.projectId).then(res => {
            this.msgNum = res.count
          })
        } else {
          this.msgNum = 0
        }
      }
    },
  };
</script>
