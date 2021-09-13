<template>
  <view class="my-decorate" :style="{height:contentHeight}">
    <view class="my-decorate-top">
      <scroll-view id="tab-bar" class="scroll-h" scroll-x="true" :show-scrollbar="false">
        <view v-for="(tab,index) in dataList" class="item" :key="index" :data-current="index"
          @click="ontabtap(tab,index)">
          <text class="uni-tab-item-title"
            :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.nodeName}}</text>
        </view>
      </scroll-view>
      <view class="cost" @click="toCost">
        当前花销
      </view>
    </view>
   <view class="sticky report-list" v-if="tabName==='result'&&isActive">
      <view class="report-item" :class="{'report-item-active':currentItem==='top'}" @click="toItem('top')">
        重大隐患</view>
      <view class="report-item" :class="{'report-item-active':currentItem==='hazardTop'}"
        @click="toItem('hazardTop')">隐患</view>
      <view class="report-item" :class="{'report-item-active':currentItem==='conformTop'}"
        @click="toItem('conformTop')">符合项</view>
    </view>
    <swiper :current="tabIndex" style="flex: 1" :style="{height:contentHeight}" :duration="300" @change="ontabchange">
      <swiper-item class="swiper-item" v-for="(tab,index1) in dataList" :key="index1">
        <service-hunman></service-hunman>
        <amount-house id="amount" v-if="tab.nodeType==='amount'"></amount-house>
        <resultContent ref='result' id="result" v-if="tab.nodeType==='result'" @getData='getData' :scrollTop='scrollTop'
          :isReport='true'></resultContent>
        <serviceActuarial  v-if="tab.nodeType==='actuarial'"></serviceActuarial>
        <serviceDismantle v-if="tab.nodeType==='dismantle'"></serviceDismantle>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import resultContent from '../../components/result-content/result-content.vue'
  import serviceHunman from '../../components/service-hunman/service-hunman.vue'
  import serviceActuarial from '../../components/service-actuarial/service-actuarial.vue'
  import serviceDismantle from '../../components/service-dismantle/service-dismantle.vue'
  import {getDesignServeMenu,getMyService} from '../../../api/decorate.js'
  export default {
    components: {
      resultContent,
      serviceHunman,
      serviceActuarial,
      serviceDismantle
    },
    data() {
      return {
        dataList: [{
            nodeName: '量房',
            nodeType: 'amount'
          },
          {
            nodeName: '验房',
            nodeType: 'result'
          },
          {
            nodeName: '设计',
            nodeType: 'desgin'
          },
          {
            nodeName: '精算',
            nodeType: 'actuarial'
          },
          {
            nodeName: '管家',
            nodeType: 'steward'
          },
          {
            nodeName: '拆除',
            nodeType: 'dismantle'
          },
          {
            nodeName: '水电',
            nodeType: 'hydroelectric'
          },
          {
            nodeName: '泥工',
            nodeType: 'tiler'
          },
          {
            nodeName: '木工',
            nodeType: 'woodworking'
          },
          {
            nodeName: '油漆',
            nodeType: 'paint'
          },
        ],
        tabIndex: 0,
        tabName: 'amount',
        scrollTop: 0,
        contentHeight: 0,
        isActive:false,
        currentItem:'top',
        result:{},
      };
    },
    onPageScroll(scrollTop) {
      console.log(scrollTop.scrollTop,this.result)
      this.scrollTop = scrollTop.scrollTop+92
      if (this.scrollTop > this.result.top) {
        this.isActive = true
        this.currentItem = 'top'
        this.currentItem = this.scrollTop > this.result.conformTop ? 'conformTop' : this.scrollTop > this.result.hazardTop ?
          'hazardTop' : 'top'
      } else {
        this.isActive = false
      }
    },
    mounted() {
      setTimeout(() => {
        this.$nextTick(function() {
          let query = uni.createSelectorQuery()
          query.select('#' + this.tabName).boundingClientRect();
          query.exec((res) => {
            if (res && res[0]) {
              this.contentHeight = res[0].height + 'px';
              
            }
          });
        })
      }, 1000)
      this.getDesignServeMenu()
      this.getMyService()
    },
    methods: {
      toCost() {
        uni.navigateTo({
          url: '/sub-decorate/pages/current-cost/current-cost'
        })
      },
      ontabtap(item, index) {
        this.tabIndex = index
        this.tabName = item.nodeType
      },
      ontabchange(e) {
        let current = e.detail.current
        this.tabIndex = current
        this.tabName = this.dataList[current].nodeType
        this.changeHeight()
        this.$nextTick(function(){
          this.$refs.result[0].getHeight()
        })
      },
      toItem(id) {
        this.currentItem = id
        // let location = this[id] + 16
        // if (this.isReport) {
        //   location = location - 44
        // }
        uni.pageScrollTo({
          duration: 100, // 过渡时间
          scrollTop: this.result[id] - 58, // 滚动的实际距离
        })
      },
      getData(e) {
        this.result = e
      },
      changeHeight() {
        this.$nextTick(function() {
          let query = uni.createSelectorQuery()
          query.select('#' + this.tabName).boundingClientRect();
          query.exec((res) => {
            console.log(res)
            if (res && res[0]) {
              
              this.contentHeight = res[0].height + 'px';
            }
          });
        })
      },
      getDesignServeMenu(){
        getDesignServeMenu(2).then(res=>{
          console.log(res)
        })
      },
      getMyService(){
        let data = {
          projectId:6,
          processId:1
        }
        getMyService(data).then(res=>{
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-decorate {
    height: 100%;
  }

  .my-decorate-top {
    display: flex;
    justify-content: space-between;
    height: 88rpx;
    padding: 0 32rpx;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1000;
    .cost {
      padding-top: 28rpx;
      width: 104rpx;
      font-size: 26rpx;
      color: #333;
      font-weight: 400;
    }
  }

  .scroll-h {
    white-space: nowrap;
    height: 88rpx;
    max-width: 550rpx;
    
  }

  .item {
    display: inline-block;
    width: 64rpx;
    // margin-top: 28rpx;
    color: #999;
    font-size: 28rpx;
    margin-right: 48rpx;
    position: relative;
    line-height: 88rpx;
    text-align: center;
  }
  .uni-tab-item-title-active{
    font-size: 32rpx;
    color: #333333;
    font-weight: 500;
  }
  .uni-tab-item-title-active:after {
    content: "";
    display: inline-block;
    width: 32rpx;
    height: 6rpx;
    opacity: 1;
    background: linear-gradient(135deg, #00c2b2, #00c2bf);
    border-radius: 100px 100px 0px 0px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .sticky {
    position: sticky;
    top: 88rpx;
    width: 100%;
    height: 96rpx;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    z-index: 1000;
    align-items: center;
    padding: 0 32rpx;
    view {
      line-height: 96rpx;
      text-align: center;
      color: #999;
      font-size: 28rpx;
    }
  
    .item {
      position: relative;
  
      width: 33.3%;
    }
  
    .report-item {
      width: 144rpx;
      margin-right: 16rpx;
      height: 58rpx;
      line-height: 58rpx;
      border: 1px solid #ececec;
      border-radius: 8rpx;
    }
  
    .report-item-active {
      background: rgba(0, 191, 182, 0.07);
      border: 1px solid #00bfb6;
      color: #00BFB6;
      font-size: 26rpx;
      font-weight: 400;
    }
  
    .item-active::after {
      content: "";
      display: inline-block;
      width: 68rpx;
      height: 6rpx;
      opacity: 1;
      background: linear-gradient(135deg, #00c2b2, #00c2bf);
      border-radius: 100px 100px 0px 0px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>
