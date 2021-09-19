<template>
  <view class="item">
    <view class="flex-row-bet">
      <view class="item-name flex-row-start">
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_mer.svg"></image>
        <text>{{serviceData.nodeName}}</text>
      </view>
      <view class="status-name mr inservice flex-row-start">
        <view>{{ serviceData | filterStatusName }}</view>
        <image @click="openProcsss" :class="{open: open}"
          v-if="serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)"
          src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle_up.svg"></image>
      </view>
    </view>
    <view class="gc"
      v-if="(serviceData.status >= 2 || (serviceData.status == 0 && serviceData.grepOrderStatus === 3)) && open">
      <view class="procsss flex-row-bet">
        <view class="s0">{{serviceData.serveRoleName || "后端没返回字段"}}</view>
        <view class="s1 flex-row-start">
          <view>{{serviceData.serveName || "后端没返回字段"}}</view>
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
          url: `/sub-decorate/pages/gj-process-cost/gj-process-cost?serveCardId&=${this.serviceData.serveCardId}&estateId=${this.currentProject.estateId}&serviceType=${this.serviceData.nodeType}&projectId=${this.currentProject.projectId}&customerId=${customerId}`
        })
        // this.serveCardId = serveCardId || option.serveCardId
        // this.estateId = estateId || option.estateId
        // this.serviceType = serviceType || option.serviceType 
        // this.projectId = projectId || option.projectId 
        // this.customerId = customerId || option.customerId 
      }
    },
    filters: {
      filterStatusName(data) {
        if (data.status === 0) {
          return data.grepOrderStatusName
        } else {
          return data.statusName
        }
      },
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
