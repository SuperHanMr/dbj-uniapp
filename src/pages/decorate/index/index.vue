<template>
  <view class="decorate-index">
    <image class="bg-index" mode="aspectFit" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/bg@2x.png">
    </image>
    <view class="content flex-column">
      <view class="house-firend">
        <view class="title">
          <view class="house" @click="switchVisible">
            <text>我的家</text>
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
            <view class="insurance">
              <image class="img"></image>
              <view class="text">工地保险</view>
            </view>

            <view class="uni-title">{{ currentHouse.housingEstate }}{{currentHouse.address}}</view>
          </view>
          <view class="picture-btn-wrap">
            <picture-btn class="p-i-t" text="设计图" @gotoPage="goDesignPicture"></picture-btn>
            <picture-btn class="p-i-t" text="精算单" @gotoPage="goDesignPicture"></picture-btn>
            <picture-btn class="p-i-t" text="工地视频" @gotoPage="goDesignPicture"></picture-btn>
            <picture-btn text="施工" @gotoPage="goConstrction"></picture-btn>
          </view>
        </view>

      </view>

      <view class="scroll-view flex-1">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll"
          scroll-with-animation="true" :style="{height: viewHieght + 'rpx'}">
          <!-- 每日播报 -->
          <text-scroll></text-scroll>
          <!-- 我的仓库 -->
          <view class="my-decorate-service-wrap">
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
                <view class="r flex-start-row" @click="goToMyDecorate">
                  <text>查看全部</text>
                  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg">
                  </image>
                </view>
              </view>

              <service-item :status="DECTORE_DICT.inservice" itemName="量房服务" statusName="服务中">
              </service-item>
              <service-item :status="DECTORE_DICT.robbing" itemName="设计服务" statusName="待确认设计师">
              </service-item>
              <service-item :status="DECTORE_DICT.shouldsure" itemName="验房服务" statusName="验房员抢单中">
              </service-item>
              <service-item :status="DECTORE_DICT.uncheck" itemName="精算服务" statusName="待确认精算师">
              </service-item>
              <service-item :status="DECTORE_DICT.inservice" itemName="管家服务" statusName="服务中">
              </service-item>
            </view>
          </view>
          <view class="tips-design-actuary">
            <view class="tips">
              购买相关服务 即刻开启装修
            </view>
            <guide-card cardType="service" imageUrl="http://iph.href.lu/702x160?text=702x160&fg=EB7662&bg=FFE2DD"
              @buyNow="buyServiceNow">
            </guide-card>
            <guide-card cardType="actuary" imageUrl="http://iph.href.lu/702x160?text=702x160&fg=4173c8&bg=d0e0fa"
              @buyNow="buyServiceNow">
            </guide-card>
          </view>
          <no-service words="暂无进行中服务"></no-service>
          <!-- 切换房屋弹窗 -->
          <uni-popup ref="sw">
            <house-switch class="margintop" :datalist="projectList" :current="currentHouse.estateId"
              @goAddHouse="addHouse" @checkHouse="checkHouse"></house-switch>
          </uni-popup>
          <decorate-notice @touchmove.stop.prevent="()=>false" v-if="noticeActive" :current='current' @closeNotice='closeNotice'
            class="decorate-notice"></decorate-notice>
          <view class="link">
            <view @click="confirm1">平面图交付</view>
            <view @click="gonohouse">无房屋无服入口</view>
            <view @click="gonohousedecatore">无房屋无服务装修</view>
            <view @click="gonohousecheck">无房屋无服务验房</view>
            <view @click="checkHouseRemind">验房提醒</view>
            <view @click="confirm2">三维设计图交付</view>
            <view @click="confirm3">施工图交付</view>
            <view @click="confirm4">线上交底</view>
            <view @click="hcaa">管家竣工验收申请</view>
            <view @click="housekeeperrefuse">管家竣工拒绝</view>
            <view @click="workerCapplication">工人阶段验收申请</view>
          </view>
        </scroll-view>
      </view>
      <drag-button-follow :style.sync="style" @btnClick='openNotice' :follow='`left,right`' className="drag-button"
        class="drag-button">
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
    getToken,
    getMqtt
  } from "../../../api/decorate.js";
  import {
    getEstateProjectInfoList
  } from "../../../api/project.js";
  import {
    HouseSwitch
  } from "../../../components/house-switch/house-switch.vue"
  import ServiceItem from "../../../components/service-item/service-item.vue"
  import NoService from "../../../components/no-service/no-service.vue"
  import {
    DECTORE_DICT,
    SERVICE_TYPE
  } from "../../../utils/dict.js"
  import { v4 as uuidv4 } from 'uuid';
  import GuideCard from "../../../components/guide-card/guide-card.vue"
  import PictureBtn from "../../../components/picture-btn/picture-btn.vue"

  import MwarehouseBtn from "../../../components/mwarehouse-btn/mwarehouse-btn.vue"
  import TextScroll from "../../../components/text-scroll/text-scroll.vue"
  export default {
    components: {
      HouseSwitch,
      ServiceItem,
      GuideCard,
      NoService,
      PictureBtn,
      MwarehouseBtn,
      TextScroll
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
      if (this.houses && this.houses.length < 1) {
        this.getHouses();
      }
    },
    data() {
      return {
        scrollTop: 416,
        old: {
          scrollTop: 416
        },
        viewHieght: "",
        style: "",
        noticeActive: false,
        houses: getApp().globalData.houses,
        currentHouse: {},
        myHouseList: [],
        projectList: [],
        current: null,
        currentEstateId: null,
        friendList: [],
        DECTORE_DICT,
        
        deviceId:'',
        accessKeyId:'LTAI5tKwuhb948v9oakqnbTf',
        instanceId:'post-cn-tl32ajx3u0l',
        groupId:'GID_dabanjia',
        token:'',
      };
    },
    mounted() {
      uni.showTabBar()
      // this.getMyHouseList();
      this.getEstateProjectInfoList();
      this.deviceId = uni.getStorageSync('uuDeviceId')
      if(!this.deviceId){
        this.deviceId = uuidv4()
        uni.setStorageSync('uuDeviceId', this.deviceId);
      }
      this.getToken()
      this.getMqtt()
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
                return `dabanjia_pull_special_msg_${this.currentHouse.projectId}`;
              },
        },
    methods: {
      scroll: function(e) {
        // console.log(e)
        this.old.scrollTop = e.detail.scrollTop
      },
      goTop: function(e) {
        this.scrollTop = this.old.scrollTop
        this.$nextTick(() => {
          this.scrollTop = 0
        });
      },
      checkHouseRemind() {
        uni.navigateTo({
          url: "/sub-decorate/pages/check-house-remind/check-house-remind"
        })
      },
      confirm1() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-deliver/design-deliver"
        })
      },
      confirm2() {
        uni.navigateTo({
          url: "/sub-decorate/pages/graphic-model/graphic-model"
        })
      },
      confirm3() {
        uni.navigateTo({
          url: "/sub-decorate/pages/construction-plans/construction-plans"
        })
      },
      confirm4() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-online-disclosure/design-online-disclosure"
        })
      },
      hcaa() {
        uni.navigateTo({
          url: "/sub-decorate/pages/housekeeper-c-a-application/housekeeper-c-a-application"
        })
      },
      housekeeperrefuse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/housekeeper-refuse/housekeeper-refuse"
        })
      },
      workerCapplication () {
        uni.navigateTo({
          url: "/sub-decorate/pages/worker-c-application/worker-c-application"
        })
      },
      async getFriendsList() {
        let list = await friendListByEstateId({
          estateId: this.currentHouse.estateId
        });
        this.friendList = list.length > 2 ? list.slice(0, 2) : list
      },
      toFriends() {
        uni.navigateTo({
          url: "/sub-decorate/pages/friends/friends?id=" + this.currentHouse.estateId,
        });
      },
      addHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house"
        })
      },
      checkHouse(item) {
        this.currentHouse = item
        this.$refs.sw.close()
      },
      getMyHouseList() {
        queryEstates({
          isNeedRelative: true
        }).then(data => {
          console.log(data)
        })
      },
      getEstateProjectInfoList() {
        getEstateProjectInfoList({
          isNeedRelative: true
        }).then(data => {
          this.projectList = data
          const arr = data.filter(t => t.defaultEstate)
          this.currentHouse = arr[0]
          if (this.currentHouse.estateId) {
            this.getFriendsList()
          }
        })
      },
      bindChange(e) {
        console.log(e)
      },
      switchVisible() {
        this.$refs.sw.open('top')
      },
      goConstrction () {
        uni.navigateTo({
          url: "/sub-decorate/pages/construction/construction"
        })
      },
      goDesignPicture() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-picture/design-picture"
        })
      },
      gonohousedecatore() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-decorate/no-house-decorate"
        })
      },
      gonohousecheck() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-checkhouse/no-house-checkhouse"
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
          url: "/sub-decorate/pages/my-decorate/my-decorate",
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
      getHouses() {
        queryEstates({
          isNeedRelative: true,
        }).then((data) => {
          //    if (data.length < 1) {
          //      uni.navigateTo({
          //        url: "/pages/decorate/no-house/no-house",
          //      });
          //    } else {
          //      getApp().globalData.houses = data;
          // uni.navigateTo({
          //   url: "",
          // });
          //    }
          getApp().globalData.houses = data;
        });
      },
      buyServiceNow(type) {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-service-list/design-service-list?categoryTypeId=" +
            SERVICE_TYPE[
              type]
        })
      },
      getToken(){
        let data = {
          topics:[this.msgTopic],
          deviceId:this.deviceId
        }
        getToken(data).then(res=>{
          console.log(res)
        })
      },
      getMqtt(){
        getMqtt().then(res=>{
          this.accessKeyId = res.accessKey
          this.url = 'wxs://'+res.endPoint
          this.groupId = res.groupId
          this.instanceId = res.instanceId
        })
      },
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
        padding: 0 8rpx;
        height: 36rpx;
        background: linear-gradient(135deg, #36d9cd, #28c6c6);
        border-radius: 6rpx;
        margin-right: 16rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;

        image {
          width: 18rpx;
          height: 22rpx;
          margin-right: 6rpx;
          border: 2rpx solid #fff6;
          border-radius: 25rpx;
        }

        .text {
          height: 28rpx;
          font-size: 20rpx;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
          color: #ffffff;
          line-height: 28rpx;
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
      margin:0 10rpx;
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
