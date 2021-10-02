<template>
  <view class="item">
    <view class="flex-row-bet" @click="openProcsss">
      <view class="item-name flex-row-start">
        <i v-if="serviceData.nodeType == 1" class="icon-sheji" style="color: #2bbaf2;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 2" class="icon-yanfang" style="color: #5A99DA;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 3" class="icon-liangfang" style="color: #43d9e1;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 4" class="icon-jingsuan" style="color: #1E7BEA;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 5" class="icon-guanjia" style="color: #ffb568;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 6" class="icon-chaichu" style="color: #a38af4;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 7" class="icon-shuidian" style="color: #58a8ff;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 8" class="icon-nigong" style="color: #f47f62;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 9" class="icon-mugong" style="color: #a38af4;font-size: 30rpx;margin-right: 16rpx;"></i>
        <i v-if="serviceData.nodeType == 10" class="icon-youqi" style="color: #8cd874;font-size: 30rpx;margin-right: 16rpx;"></i>
        <text>{{serviceData.nodeName}}</text>
      </view>
      <view class="status-name mr inservice flex-row-start">
        <view>{{ serviceData.statusName }}</view>
        <image :class="{open: open}"
          v-if="serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle_up.svg"></image>
      </view>
    </view>
    <view class="gc"
      v-if="(serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)) && open">
      <view class="procsss flex-row-bet">
        <view class="s0">{{serviceData.serveRoleName}}</view>
        <view class="s1 flex-row-start" @click="personPage(serviceData)">
          <view>{{serviceData.serveName}}</view>
          <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
        </view>
      </view>
      <view class="procsss flex-row-bet">
        <view class="s0">进度</view>
        <view class="s1 flex-row-start" @click="goTimeLine">
          <view>{{serviceData.processNumerator}}/{{serviceData.processDenominator}}</view>
          <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
        </view>
      </view>
      <view class="procsss flex-row-bet" v-if="['管家', '拆除', '水电', '泥工', '木工', '油漆'].includes(serviceData.nodeName)">
        <view class="s0">工序支付</view>
        <view class="s1 flex-row-start" @click="goProcessCost">
          <view>{{serviceData.payStatus | filterPayStatus}}</view>
          <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import "./item.scss"
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
          url: `/sub-decorate/pages/person-page/person-page?personId=${serviceData.serveId}`
        })
      },
      openProcsss() {
        this.open = !this.open
      },
      goTimeLine() {
        uni.navigateTo({
          url: `/sub-decorate/pages/time-line/time-line?id=${this.serviceData.serveCardId}`
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
        if (payStatus == 0) {
          return "未支付"
        } else if (payStatus == 1) {
          return "部分支付"
        } else if (payStatus == 2) {
          return "全部支付"
        }
      }
    }
  }
</script>
