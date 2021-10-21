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
      <view class="procsss flex-row-bet" v-if="[5, 6, 7, 8, 9, 10].includes(serviceData.nodeType)">
        <view class="s0">工序支付</view>
        <view class="s1 flex-row-start" @click="goProcessCost">
          <view>{{serviceData.payStatus | filterPayStatus}}</view>
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
