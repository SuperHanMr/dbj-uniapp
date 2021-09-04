<template>
  <view class="decorate-index">
    <image class="bg" mode="aspectFit" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/bg@2x.png">
    </image>
    <view class="content">
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
                <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_avtor_more.svg"></image>
              </view>
            </view>
          </view>
        </view>

        <!-- 切换房屋弹窗 -->
        <uni-popup ref="sw">
          <house-switch class="margintop" :datalist="myHouseList" :current="current" @goAddHouse="addHouse"
            @checkHouse="checkHouse"></house-switch>
        </uni-popup>

        <view class="uni-padding-wrap">
          <view class="uni-title">{{ currentHouse.housingEstate }}{{currentHouse.address}}</view>
          <view class="design" @click="goDesignPicture">
            <text>设计图</text>
            <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle_999.svg"></image>
          </view>
        </view>

      </view>
      <view class="my-decorate-service-wrap">
        <image mode="aspectFit" class="top-bg"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/service-card-top.svg"></image>
        <view class="my-decorate-service">
          <view class="service-title flex-space-between-row" @click="goToMyDecorate">
            <text class="t">我的装修服务</text>
            <view class="r flex-start-row">
              <text>查看全部</text>
              <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
            </view>
          </view>

          <service-item :status="DECTORE_DICT.inservice" itemName="量房服务" statusName="服务中"></service-item>
          <service-item :status="DECTORE_DICT.robbing" itemName="设计服务" statusName="待确认设计师"></service-item>
          <service-item :status="DECTORE_DICT.shouldsure" itemName="验房服务" statusName="验房员抢单中"></service-item>
          <service-item :status="DECTORE_DICT.uncheck" itemName="精算服务" statusName="待确认精算师"></service-item>
        </view>
      </view>

      <view class="tips-design-actuary">
        <view class="tips">
          购买相关服务 即刻开启装修
        </view>
        <guide-card cardType="service" imageUrl="http://iph.href.lu/702x160?text=设计服务&fg=EB7662&bg=FFE2DD"
          @buyNow="buyServiceNow"></guide-card>
        <guide-card cardType="actuary" imageUrl="http://iph.href.lu/702x160?text=精算服务&fg=4173c8&bg=d0e0fa"
          @buyNow="buyServiceNow"></guide-card>
      </view>
      <decorate-notice @touchmove.stop.prevent="()=>false" v-if="noticeActive" @closeNotice='closeNotice'
        class="decorate-notice"></decorate-notice>

      <drag-button-follow :style.sync="style" @btnClick='openNotice' :follow='`left,right`' className="drag-button"
        class="drag-button">
        <view class="white-circle">
          <view class="gray-circle">
            <view class="black-circle">
              <text class="image-icon"></text>
              <text class="tip">8</text>
            </view>
          </view>
        </view>
        <!--     <view class="white-bg">
			        <view class="gray-bg"></view>
			      </view> -->
      </drag-button-follow>

      <view class="link">
        <button @click="gonohouse">无房屋无服入口</button>
        <button @click="gonohousedecatore">无房屋无服务装修</button>
        <button @click="gonohousecheck">无房屋无服务验房</button>
        <button @click="checkHouseRemind">验房提醒</button>

      </view>

    </view>
    <decorate-notice @touchmove.stop.prevent="()=>false" v-if="noticeActive" @closeNotice='closeNotice'
      class="decorate-notice"></decorate-notice>

  </view>
</template>

<script>
  import {
    queryEstates,
    friendListByEstateId
  } from "../../../api/decorate.js";
  import {
    HouseSwitch
  } from "../../../components/house-switch/house-switch.vue";
  import ServiceItem from "../../../components/service-item/service-item.vue";
  import NoService from "../../../components/no-service/no-service.vue";
  import {
    DECTORE_DICT,
    SERVICE_TYPE
  } from "../../../utils/dict.js";
  import GuideCard from "../../../components/guide-card/guide-card.vue";
  export default {
    components: {
      HouseSwitch,
      ServiceItem,
      GuideCard,
      NoService,
    },
    onShow() {
      if (this.houses && this.houses.length < 1) {
        this.getHouses();
      }
    },
    data() {
      return {
        style: "",
        noticeActive: false,
        houses: getApp().globalData.houses,
        accessKeyId: "LTAI5tKwuhb948v9oakqnbTf",
        instanceId: "post-cn-tl32ajx3u0l",
        groupId: "GID_dabanjia",
        deviceId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
        token: "",
        client: {},
        currentHouse: {},
        myHouseList: [],
        current: null,
        friendList: [],
        DECTORE_DICT,
      };
    },
    mounted() {
      this.getMyHouseList();
    },
    computed: {
      username() {
        return `Token|${this.accessKeyId}|${this.instanceId}`;
      },
      //token和设备id关联，需要后端接口提供
      password() {
        return `R|LzMT+XLFl5s/YWJ/MlDz4t/Lq5HC1iGU1P28HAMaxYzmBSHQsWXgdISJ1ZJ+2cxaamjCkkdmS/XOGd160KYNICpRDnjsfBujbJGYgJWUr5piesdvDY0i8S48f1y+kDSyD1qZq3RLscnvooOIjF1CZUnSLi/oIC4juK1MZ8qVI7uIdBoQzt4TbiQgoJWL8b3AQUS1QPxDA2oGf+JBKuN0DyYW6d7mIYhAqXTpVbQw5nNCvKP80Xo0WQLnbM+hoyCSPOmGbPwAsaS1bd9VJjqDoJlCt6GFmJgm2JFY7PJwf/7OOSmUYIYFs5o/PuPpoTMF+hcVXMs+0yDukIMTOzG9m1KmYYo48q4Eb41jz5zvCIjTrIiblxfX1Q==|W|LzMT+XLFl5s/YWJ/MlDz4t/Lq5HC1iGU1P28HAMaxYzmBSHQsWXgdISJ1ZJ+2cxaamjCkkdmS/XOGd160KYNICpRDnjsfBujbJGYgJWUr5piesdvDY0i8S48f1y+kDSyD1qZq3RLscnvooOIjF1CZUnSLi/oIC4juK1MZ8qVI7uIdBoQzt4TbiQgoJWL8b3AQUS1QPxDA2oGf+JBKuN0DyYW6d7mIYhAqXTpVbQw5nNCvKP80Xo0WQLnbM+hoyCSPOmGbPwAsaS1bd9VJjqDoJlCt6GFmJgm2JFY7PJwf/7OOSmUYIYFs5o/PuPpoTMF+hcVXMs+0yDukIMTOzG9m1KmYYo48q4Eb41jz5zvCIjTrIiblxfX1Q==`;
      },
      clientId() {
        return `${this.groupId}@@@1234`;
      },
    },
    methods: {
      checkHouseRemind() {
        uni.navigateTo({
          url: "/sub-decorate/pages/check-house-remind/check-house-remind",
        });
      },
      async getFriendsList() {
        let list = await friendListByEstateId({
          estateId: this.currentHouse.id,
        });
        this.friendList = list.length > 2 ? list.slice(0, 2) : list;
      },
      toFriends() {
        uni.navigateTo({
          url: "/sub-decorate/pages/friends/friends?id=" + this.currentHouse.id,
        });
      },
      addHouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
      checkHouse(item) {
        this.current = item.id;
        this.currentHouse = item;
        this.$refs.sw.close();
      },
      getMyHouseList() {
        queryEstates({
          isNeedRelative: true,
        }).then((data) => {
          let i = 1;
          let names = ["设计阶段", "未开工", "已竣工"];
          for (let item of data) {
            item.statusName = names[i - 1];
            item.status = i++;
          }
          data[1].ext = "第二次装修";
          data[2].friend = true;
          data[2].ext = "首次装修";
          this.myHouseList = data;
          const arr = data.filter((t) => t.defaultEstate);
          // let temp = null;
          // if(arr.length > 0) {
          // 	temp = arr[0]
          // } else {
          // 	data[0].defaultEstate = true
          // 	temp = data[0]
          // }
          // this.currentHouse = temp
          // this.current = temp.id
          this.currentHouse = arr[0];
          this.current = arr[0].id;
          if (arr[0].id) {
            this.getFriendsList();
          }
        });
      },
      bindChange(e) {
        console.log(e);
      },
      switchVisible() {
        this.$refs.sw.open("top");
      },
      goDesignPicture() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-picture/design-picture",
        });
      },
      gonohousedecatore() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-decorate/no-house-decorate",
        });
      },
      gonohousecheck() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house-checkhouse/no-house-checkhouse",
        });
      },
      gonohavehouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/have-house-no-service/have-house-no-service",
        });
      },
      gonohouse() {
        uni.navigateTo({
          url: "/sub-decorate/pages/no-house/no-house",
        });
      },
      toSend() {
        console.log("发送消息");
        this.client.publish("dabanjia/testTopic", "hello zzz");
      },
      closeNotice() {
        this.noticeActive = false;
        uni.showTabBar();
      },
      openNotice() {
        this.noticeActive = true;
        uni.hideTabBar();
      },
      goToAddHouseInfo() {
        uni.navigateTo({
          url: "/sub-decorate/pages/add-house/add-house",
        });
      },
      goDesignPicture() {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-picture/design-picture",
        });
      },
      goToMyDecorate() {
        uni.navigateTo({
          url: "/sub-decorate/pages/my-decorate/my-decorate",
        });
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
          //   url: "/pages/decorate/have-house-no-service/have-house-no-service",
          // });
          //    }
          getApp().globalData.houses = data;
        });
      },
      buyServiceNow(type) {
        uni.navigateTo({
          url: "/sub-decorate/pages/design-service-list/design-service-list?categoryTypeId=" +
            SERVICE_TYPE[type],
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .decorate-index {
    position: relative;

    .bg {
      width: 100%;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: -304rpx;
  }

  .house-firend {
    position: relative;

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

      .uni-title {
        // width: 314rpx;
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        line-height: 34rpx;
        margin-bottom: 40rpx;
      }

      .design-wrap {
        // margin-left: 40rpx;
      }
    }

    .design {
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      width: 114rpx;
      height: 44rpx;
      background: #f5f6f6;
      border-radius: 12rpx;

      text {
        height: 32rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 32rpx;
        margin-right: 8rpx;
      }

      image {
        height: 13rpx;
        width: 8rpx;
      }
    }
  }

  .my-decorate-service-wrap {
    position: relative;
    margin: 0 24rpx;
    background: #ffffff;
    border-radius: 24rpx;
    box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
    min-height: 256rpx;
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
    margin: -88rpx 45rpx 44rpx 32rpx;

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
        width: 11rpx;
        height: 19rpx;
      }
    }
  }

  .drag-button {
    // background: #ffffff;
    // // border: 0.5px solid #eeeeee;
    // box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
    // width: 100rpx;
    // height: 100rpx;
    // font-size: 24rpx;
    // color: #000000;
    position: absolute;
    right: 0rpx;
    top: 588rpx;

    // border-radius: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .white-circle {
      width: 100rpx;
      height: 100rpx;
      opacity: 1;
      background: #fff;
      // display: inline-block;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      // position: absolute;
      // right: 8px;
      .gray-circle {
        width: 80rpx;
        height: 80rpx;
        opacity: 1;
        background: #999;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .black-circle {
          width: 56rpx;
          height: 56rpx;
          opacity: 1;
          background: #333333;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .image-icon {
            width: 36rpx;
            height: 36rpx;
            background-color: #fff;
          }

          .tip {
            position: absolute;
            width: 24rpx;
            height: 24rpx;
            opacity: 1;
            background: #f70000;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 24rpx;
            font-size: 20rpx;
            top: 16rpx;
            right: 16rpx;
          }
        }
      }
    }

    // .white-bg{
    //   width: 28px;
    //   height: 50px;
    //   background-color: #fff;
    //   .gray-bg{
    //     width: 28px;
    //     height: 40px;
    //     background-color: #999999;
    //   }
    // }
  }

  .link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    button {
      display: inline-block;
      line-height: 1;
      padding: 10rpx 6rpx;
      border: 2rpx solid green;
      color: #fff;
      background-color: #000088;
      margin: 10rpx;
      font-size: 24rpx;
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
      padding-top: 58rpx;
      margin-bottom: 24rpx;
    }
  }
</style>
