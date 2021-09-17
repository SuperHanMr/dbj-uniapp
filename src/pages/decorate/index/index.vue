<template>
  <view class="decorate-index">
    <image class="bg-index" mode="aspectFit" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/bg@2x.png">
    </image>
    <view class="content flex-column">
      <view class="house-firend">
        <view class="title">
          <view class="house" @click="switchVisible">
            <text>{{who}}的家</text>
            <image class="ic-triangle" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle.svg">
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
                :src="aServiceData.insuranceStatus ? 'http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/insurance-pay.jpeg': 'http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/insurance-unpay.jpeg'">
              </image>
            </view>
            <view class="uni-title">{{ currentProject.housingEstate }}{{currentProject.address}}</view>
          </view>
          <view class="picture-btn-wrap">
            <picture-btn v-if="aServiceData.showDesignFlag" class="p-i-t" text="设计图" @gotoPage="goDesignPicture"></picture-btn>
            <picture-btn v-if="aServiceData.showActuaryFlag" class="p-i-t" text="精算单" @gotoPage="goActuary"></picture-btn>
            <picture-btn v-if="aServiceData.showVideoFlag" class="p-i-t" text="工地视频" @gotoPage="goVideo"></picture-btn>
            <picture-btn v-if="aServiceData.constructionFlag" text="施工" @gotoPage="goConstrction"></picture-btn>
            <!-- <picture-btn text="施工" @gotoPage="goConstrction"></picture-btn> -->
          </view>
        </view>
      </view>

      <view class="scroll-view flex-1">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll"
          scroll-with-animation="true" :style="{height: viewHieght + 'rpx'}">
          <!-- 每日播报 -->
          <text-scroll></text-scroll>
          <!-- 我的仓库 -->
          <view v-if="haveWarehouse" class="my-decorate-service-wrap">
            <image mode="aspectFit" class="top-bg"
              src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/service-card-top.svg">
            </image>
            <view class="my-decorate-service">
              <view class="service-title flex-space-between-row">
                <text class="t">我的仓库</text>
                <view class="r flex-start-row" @click="goToMyWarehouse">
                  <text>查看全部</text>
                  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg">
                  </image>
                </view>
              </view>
              <view class="my-warehouse">
                <mwarehouse-btn :iconStyle="{'width': '52rpx','height': '62rpx'}" @gotoPage="gotoPage('待发货')"
                  name="待发货"></mwarehouse-btn>
                <mwarehouse-btn :iconStyle="{'width': '58rpx','height': '58rpx'}" @gotoPage="gotoPage('待收货')"
                  name="待收货"></mwarehouse-btn>
                <mwarehouse-btn :iconStyle="{'width': '50rpx','height': '60rpx'}" @gotoPage="gotoPage('已收货')"
                  name="已收货"></mwarehouse-btn>
                <mwarehouse-btn :iconStyle="{'width': '54rpx','height': '44rpx'}" @gotoPage="gotoPage('退款')" name="退款">
                </mwarehouse-btn>
              </view>
            </view>
          </view>
          <!-- 我的装修服务 -->
          <view class="my-decorate-service-wrap">
            <image mode="aspectFit" class="top-bg"
              src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/service-card-top.svg">
            </image>
            <view class="my-decorate-service">
              <view class="service-title flex-space-between-row">
                <text class="t">我的装修服务</text>
                <view class="r flex-start-row" v-if="isShowMyDecorateAll" @click="goToMyDecorate">
                  <text>查看全部</text>
                  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg">
                  </image>
                </view>
              </view>
              <service-item v-for="(item, index) in purchasedServiceList" :key="item.nodeType" :serviceData="item">
              </service-item>
              <no-service v-if="purchasedServiceList.length == 0" words="暂无进行中服务"></no-service>
            </view>
          </view>
          <view class="tips-design-actuary">
            <view v-if="availGuides.length > 0" class="tips">
              购买相关服务 即刻开启装修
            </view>
            <guide-card v-if="availGuides.includes('design')" cardType="service"
              imageUrl="http://iph.href.lu/702x160?text=702x160&fg=EB7662&bg=FFE2DD"
              @buyNow="gonohousedecatore('design')">
            </guide-card>
            <guide-card v-if="availGuides.includes('actuary')" cardType="actuary"
              imageUrl="http://iph.href.lu/702x160?text=702x160&fg=4173c8&bg=d0e0fa"
              @buyNow="gonohousedecatore('actuary')">
            </guide-card>
          </view>

          <!-- 切换房屋弹窗 -->
          <uni-popup ref="sw">
            <house-switch class="margintop" :datalist="projectList" :current="currentProject.estateId"
              @goAddHouse="addHouse" @checkHouse="checkHouse"></house-switch>
          </uni-popup>
          <decorate-notice @touchmove.stop.prevent="()=>false" v-if="noticeActive" :num='msgNum'
            :current='currentProject.projectId' @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
          <view class="link">
            <view @click="gonohouse">无房屋无服入口</view>
            <view @click="gonohousedecatore('decorate')">无房屋无服务装修</view>
            <view @click="gonohousedecatore('checkHouse')">无房屋无服务验房</view>
            <view @click="checkHouseRemind">验房提醒</view>
            <view @click="confirm1">设计交付</view>
            <view @click="confirm4">线上交底</view>
            <view @click="dsport">设计报告交付</view>
            <view @click="hcaa">管家竣工验收申请</view>
            <view @click="workerCapplication">工人阶段验收申请</view>
            <view @click="gjgxf">管家工序费</view>
          </view>
        </scroll-view>
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
</template>

<script>
  import {
    queryEstates,
    friendListByEstateId,
    // getToken,
    // getMqtt,
    getMsgNum
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
  // import monidata from "./monidata.js"
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
    },
    onLoad() {
      let _this = this
      uni.getSystemInfo({
        success(res) {
          console.log(res)
          _this.viewHieght = res.windowHeight * 2 - 416
        }
      })
    },
    onShow() {
      uni.showTabBar()
      if (this.estateList && this.estateList.length < 1) {
        this.getEstateList();
      }
    },
    data() {
      return {
        scrollTop: 416,
        viewHieght: "",
        style: "",
        noticeActive: false,
        currentProject: {},
        projectList: [],
        current: null,
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
        isShowMyDecorateAll: false,
        haveWarehouse: false,

        who: "我",
      };
    },
    mounted() {
      uni.showTabBar()
      this.deviceId = uni.getStorageSync('uuDeviceId')
      if (!this.deviceId) {
        this.deviceId = uuidv4()
        uni.setStorageSync('uuDeviceId', this.deviceId);
      }
      // this.getToken()
      // this.getMqtt()
    },
    computed: {
      username() {
        return `Token|${this.accessKeyId}|${this.instanceId}`
      },
      //token和设备id关联，需要后端接口提供
      password() {
        return `R|${this.token}|W|${this.token}`
      },
      clientId() {
        return `${this.groupId}@@@${this.deviceId}`
      },
      msgTopic() {
        return `dabanjia_pull_special_msg_${this.currentProject.projectId}`;
      },
    },
    destory() {
      clearTimeout(timer)
      timer = null
    },
    methods: {
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
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      scroll(e) {},
      getAvailableService() {
        console.log("this.currentProject", this.currentProject)
        availableService({
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
          } = data
          this.purchasedServiceList = purchasedServiceList || []
          this.availableServiceList = availableServiceList || []
          this.defaultServices = defaultServices || []
          this.aServiceData = {
            constructionFlag,
            insuranceStatus,
            showActuaryFlag,
            showDesignFlag,
            showVideoFlag
          }
          timer = setTimeout(() => {
            this.addServiceCard(this.defaultServices, "serviceType")
            this.addServiceCard(this.availableServiceList, "nodeType")
          }, 0)
          this.isShowMyDecorateAll = this.purchasedServiceList.filter(t => (t.status == 0 && t.grepOrderStatus ==
            3) || t.status >= 2).length > 0
          this.haveWarehouse = this.purchasedServiceList.filter(t => t.nodeType >= 5).length > 0
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
      checkHouse(item) {
        this.currentProject = item
        this.initData(item)
        this.$refs.sw.close()
      },
      getProjectList() {
        getEstateProjectInfoList({
          isNeedRelative: true
        }).then(data => {
          // 有房屋有服务，初始化当前的默认房屋
          if (data && data.length > 0) {
            this.projectList = data
            const arr = data.filter(t => t.defaultEstate)
            this.currentProject = arr[0]
            this.initData(arr[0])
          } else {
            // TODO 有房屋无服务处理逻辑
          }
        })
      },
      // 根据查询出来的项目信息处理
      initData(obj) {
        this.getMsgNum()
        this.who = this.currentProject.relegationType == 2 ? "亲友" : "我"
        this.currentEstate = this.estateList.filter(t => t.id === obj.estateId)[0]
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
          url: "/sub-decorate/pages/construction/construction"
        })
      },
      goDesignPicture() {
        uni.navigateTo({
          url: "/sub-home/pages/decorate-scene/construction-drawings"
        })
      },
      goActuary() {
        uni.navigateTo({
          url: `/sub-decorate/pages/actuary-bill/actuary-bill?url=https://local.meiwu365.com/app-pages/actuarial/index.html&title=精算单`
        })
      },
      goVideo() {
        uni.navigateTo({
          url: "/sub-home/pages/lives-decorate/lives-decorate"
        })
      },
      gonohousedecatore(type) {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-decorate/no-house-decorate?type=" + type
        })
      },
      gjgxf() {
        uni.navigateTo({
          url: `/sub-decorate/pages/gj-process-cost/gj-process-cost?projectId=${this.currentProject.projectId}&estateId=${this.currentProject.estateId}&roleType=10&serviceType=5`
        })
      },
      gonohouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house/no-house"
        })
      },
      toSend() {
        console.log('发送消息')
        this.client.publish('dabanjia/testTopic', 'hello zzz')
      },
      closeNotice() {
        this.noticeActive = false;
        uni.showTabBar()
      },
      openNotice() {
        this.noticeActive = true
        uni.hideTabBar()
      },
      goToAddHouseInfo() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
      goToMyDecorate() {
        uni.navigateTo({
          url: "/sub-decorate/pages/my-decorate/my-decorate?processId="+this.currentProject.processId+'&projectId='+this.currentProject.projectId,
        });
      },
      goToMyWarehouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/warehouse-list/warehouse-list",
        });
      },
      gotoPage(value) {
        if (value === '退款') {
          uni.navigateTo({
            url: "/sub-decorate/pages/warehouse-refund/warehouse-refund"
          })
        } else {
          uni.navigateTo({
            url: "/sub-decorate/pages/warehouse-list/warehouse-list"
          })
        }
      },
      getEstateList() {
        queryEstates({
          isNeedRelative: true,
        }).then(data => {
          console.log(data)
          if (!data || (typeof data == "array" && data.length < 1) ) {
            uni.navigateTo({
              url: "/sub-decorate/pages/no-house/no-house",
            });
          } else {
            const temp = data.filter(t => t.defaultEstate)
            this.defaultEstate = temp && temp.length > 0 ? temp[0] : null
            this.estateList = data;
            this.getProjectList();
          }
        });
      },
      // getToken() {
      //   let data = {
      //     topics: [this.msgTopic],
      //     deviceId: this.deviceId
      //   }
      //   getToken(data).then(res => {
      //     console.log(res)
      //   })
      // },
      // getMqtt() {
      //   getMqtt().then(res => {
      //     this.accessKeyId = res.accessKey
      //     this.url = 'wxs://' + res.endPoint
      //     this.groupId = res.groupId
      //     this.instanceId = res.instanceId
      //   })
      // },
      getMsgNum() {
        if(this.currentProject.projectId){
          getMsgNum(this.currentProject.projectId).then(res => {
            this.msgNum = res.count
          })
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .decorate-index {
    position: relative;
    padding-top: 176rpx;
    height: 100%;
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
    // margin-top: 176rpx;
    z-index: 9;
    height: 100%;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .scroll-Y {
    // height: calc(100% - 416rpx);
    // height: 1208rpx;
  }

  .flex-1 {
    flex: 1;
  }

  .scroll-view {
    // background-color: red;
    overflow: hidden;
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

      .ic-triangle {
        width: 13rpx;
        height: 8rpx;
      }

      text {
        width: 126rpx;
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

      >text {
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
          border: 1rpx solid #ffffff;
          border-radius: 50%;
          z-index: 99;

          image {
            width: 20rpx;
            height: 4rpx;
            margin: 13rpx 10rpx;
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
        width: 142rpx;
        height: 32rpx;
        margin-right: 16rpx;

        image {
          width: 142rpx;
          height: 32rpx;
        }

        // height: 32rpx;
        // background: rgba(145, 166, 174, 0.12);
        // border: 1rpx solid #518ea7;
        // border-radius: 6rpx;
        // backdrop-filter: blur(4rpx);
        // margin-right: 16rpx;
        // display: flex;
        // justify-content: flex-start;
        // align-items: center;
        // flex-direction: row;

        // image {
        //   width: 36rpx;
        //   height: 30rpx;
        //   margin-right: 4rpx;
        //   box-sizing: border-box;
        //   border: 2rpx solid #000;
        // }

        // .text {
        //   font-size: 20rpx;
        //   font-family: PingFangSC, PingFangSC-Medium;
        //   font-weight: 700;
        //   text-align: left;
        //   color: #518ea7;
        //   line-height: 28rpx;
        // }
      }

      .insurance.payed {
        // background: linear-gradient(135deg, #36d9cd, #28c6c6);
        // .text {
        //   color: #ffffff;
        // }
        width: 128rpx;
        height: 32rpx;

        image {
          width: 142rpx;
          height: 32rpx;
        }
      }

      .uni-title {
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        line-height: 34rpx;
      }
    }
  }

  .my-decorate-service-wrap {
    position: relative;
    margin: 0 24rpx 24rpx;
    background: #ffffff;
    border-radius: 24rpx;
    box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
    min-height: 256rpx;
  }

  .my-warehouse {
    display: flex;
    height: 134rpx;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
    padding: 0 48rpx 40rpx;
    background: #ffffff;
  }

  .my-decorate-service {
    padding: 0 24rpx 24rpx;
    position: relative;
  }

  .top-bg {
    width: 100%;
    height: 120rpx;
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
    margin: -88rpx 21rpx 44rpx 8rpx;

    .t {
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
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

      image {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }

  .drag-button {
    background: #ffffff;
    border: 0.5px solid #eeeeee;
    box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
    width: 100rpx;
    height: 100rpx;
    font-size: 24rpx;
    color: #000000;
    position: absolute;
    right: 0rpx;
    top: 588rpx;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .link {
    // display: flex;
    // justify-content: flex-start;
    // align-items: center;
    // flex-wrap: wrap;
    height: 400rpx;

    view {
      display: inline-block;
      line-height: 1;
      // padding: 10rpx 6rpx;
      border: 2rpx solid green;
      color: #fff;
      background-color: #000088;
      margin: 0 10rpx;
      font-size: 24rpx;
      height: 36rpx;
    }
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

    .p-i-t {
      margin-right: 24rpx;
    }
  }
</style>
