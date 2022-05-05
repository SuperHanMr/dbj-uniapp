<template>
  <view class="item">
    <view class="flex-row-bet" @click="openProcsss">
      <view class="item-name flex-row-start">
        <i v-if="serviceData.nodeType == 1" class="icon-zx icon-ic_wodejia_shejifuwu_csn1"></i>
        <i v-if="serviceData.nodeType == 2" class="icon-zx icon-ic_wodejia_yanfangfuwu_csn1"></i>
        <i v-if="serviceData.nodeType == 3" class="icon-zx icon-ic_wodejia_liangfangfuwu_csn1"></i>
        <i v-if="serviceData.nodeType == 4" class="icon-zx icon-ic_wodejia_jingsuanfuwu_csn1"></i>
        <i v-if="serviceData.nodeType == 5" class="icon-zx icon-ic_wodejia_guanjia_csn"></i>
        <i v-if="serviceData.nodeType == 6" class="icon-zx icon-ic_zhuangxiuxianchang_chaichu_csn1"></i>
        <i v-if="serviceData.nodeType == 7" class="icon-zx icon-zx icon-ic_zhuangxiuxianchang_shuidian_csn1"></i>
        <i v-if="serviceData.nodeType == 8" class="icon-zx icon-ic_zhuangxiuxianchang_nigong_csn1"></i>
        <i v-if="serviceData.nodeType == 9" class="icon-zx icon-ic_zhuangxiuxianchang_mugong_csn1"></i>
        <i v-if="serviceData.nodeType == 10" class="icon-zx icon-ic_zhuangxiuxianchang_youqi_csn1"></i>
        <view>{{serviceData.serviceName}}</view>
      </view>
      <view class="status-name mr flex-row-start" :class="{inservice:serviceData.grepOrderStatus > 2,shouldsure:serviceData.grepOrderStatus < 3}">
        <view :class="{inservice:serviceData.grepOrderStatus > 2,shouldsure:serviceData.grepOrderStatus < 3}">{{ serviceData.statusName }}</view>
        <!-- <image :class="{open: open}"
          v-if="serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)"
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/ic_triangle_up.svg"></image> -->
        <view class="icon-zhuangxiushouye_fuwuzhankaijiantou" :class="{open: open}" v-if="serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)"></view>
        <view v-else class="icon-no"></view>
      </view>
    </view>
    <view class="gc"
      v-if="(serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)) && open">
      <view class="procsss flex-row-bet">
        <view class="s0">{{serviceData.serveRoleName}}</view>
        <view class="s1 flex-row-start" @click="personPage(serviceData)">
          <view>{{serviceData.serveName}}</view>
          <i class='icon-alert_notice_jump'></i>
        </view>
      </view>
      <view class="procsss flex-row-bet" v-if="[5, 6, 7, 8, 9, 10].includes(serviceData.nodeType)">
        <view class="s0">工序支付</view>
        <view class="s1 flex-row-start" @click="goProcessCost">
          <view>{{serviceData.payStatus | filterPayStatus}}</view>
          <i class='icon-alert_notice_jump'></i>
        </view>
      </view>
      <view class="procsss flex-row-bet" v-if="serviceData.processDenominator!==0">
        <view class="s0">进度</view>
        <view class="s1 flex-row-start" @click="goTimeLine">
          <view>{{serviceData.processNumerator}}/{{serviceData.processDenominator}}</view>
          <i class='icon-alert_notice_jump'></i>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ServiceItem",
    props: {
      serviceData: {
        style: Object,
        required: true
      },
      currentProject: {
        style: Object,
        required: true
      }
    },
    data() {
      return {
        open: true,
      }
    },
    methods: {
      personPage(serviceData) {
        uni.navigateTo({
          // url: `/sub-decorate/pages/person-page/person-page?personId=${serviceData.serveId}`
          url: `/sub-decorate/pages/grab/grab?personId=${serviceData.serveId}&isServed=true&serveCardId=${serviceData.serveCardId}`
        })
      },
      openProcsss() {
        this.open = !this.open
      },
      goTimeLine() {
        uni.navigateTo({
          url: `/sub-decorate/pages/time-line/time-line?id=${this.serviceData.serveCardId}&name=${this.serviceData.nodeName}`
        })
      },
      goProcessCost() {
        const customerId = uni.getStorageSync("userId")
        uni.navigateTo({
          url: `/sub-decorate/pages/gj-process-cost/gj-process-cost?partpay=1&payStatus=${this.serviceData.payStatus}&serveCardId=${this.serviceData.serveCardId}&estateId=${this.currentProject.estateId}&serviceType=${this.serviceData.nodeType}&projectId=${this.currentProject.projectId}&customerId=${customerId}&obtainType=2`
        })
      }
    },
    filters: {
      // filterStatusName(data) {
      //   if (data.status === 0) {
      //     return data.grepOrderStatusName
      //   } else {
      //     return data.statusName
      //   }
      // },
      filterPayStatus(payStatus) {
        // if (payStatus == 0) {
        //   return "未支付"
        // } else 
        if (payStatus === 1) {
          return "部分支付"
        } else if (payStatus === 2) {
          return "全部支付"
        } else {
          return "--"
        }
      }
    }
  }
</script>

<style lang="scss">
.icon-alert_notice_jump{
  color: #b9b9b9 !important;
}
.item {
  box-sizing: border-box;
  width: 100%;
  min-height: 104rpx;
  background: #fbfbfb;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}
.flex-row-bet {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.flex-row-start {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}
.item-name {
  padding: 34rpx 40rpx 34rpx 24rpx;
  image {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
  }
  .icon-zx {
    font-size: 32rpx;
    margin-right: 16rpx;
  }
  .icon-ic_wodejia_shejifuwu_csn1 {
    color: #4FBEED;
  }
  .icon-ic_wodejia_yanfangfuwu_csn1 {
    color: #5481F3;
  }
  .icon-ic_wodejia_liangfangfuwu_csn1 {
    color: #43d9e1;
  }
  .icon-ic_wodejia_jingsuanfuwu_csn1 {
    color: #3FCECE;
  }
  .icon-ic_wodejia_guanjia_csn {
    color: #FF775B;
  }
  .icon-ic_zhuangxiuxianchang_chaichu_csn1 {
    color: #A38AE4;
  }
  .icon-ic_zhuangxiuxianchang_shuidian_csn1 {
    color: #5B98F3;
  }
  .icon-ic_zhuangxiuxianchang_nigong_csn1 {
    color: #D7C467;
  }
  .icon-ic_zhuangxiuxianchang_mugong_csn1 {
    color: #DAB163;
  }
  .icon-ic_zhuangxiuxianchang_youqi_csn1 {
    color: #27D19A;
  }
  view {
    height: 36rpx;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 36rpx;
  }
}
.status-name {
  padding-right: 48rpx;
  view {
    // width: 156rpx;
    height: 36rpx;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    line-height: 36rpx;
  }
  .icon-no{
    width: 26rpx;
    height: 36rpx;
    margin-left: 8rpx;
  }
  .icon-zhuangxiushouye_fuwuzhankaijiantou {
    transition: all 0.2s;
    margin-left: 8rpx;
    // width: 24rpx;
    // height: 24rpx;
    font-size: 26rpx;
    color: #ccc;
    transform: rotate(180deg);
  }
  .icon-zhuangxiushouye_fuwuzhankaijiantou.open {
    transition: all 0.2s;
    transform: none;
  }
}
.mr.status-name  {
  padding-right: 16rpx;
}
.robbing {
  color: red;
}
.shouldsure {
  color: #FA4D32;
}
.inservice {
  color: #333;
}
.uncheck{
  color: red;
}
.completed{
  color: #999999;
}
.gc {
  .procsss {
    padding: 20rpx 20rpx 9rpx 72rpx;
    .s0 {
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 34rpx;
    }
    .s1 {
      max-width: 70%;
      view {
        height: 34rpx;
        opacity: 1;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #333333;
        line-height: 34rpx;
        margin-right: 8rpx;
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      image {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
}
</style>