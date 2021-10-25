<template>
  <view class="my-decorate" :style="{height:contentHeight}">
    <uni-popup ref="popup">
      <serviceDesignChange @chooseItem='chooseItem' @closeDesign="this.$refs.popup.close()" :list='designList' :currentId="serverId"></serviceDesignChange>
    </uni-popup>
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
   <view class="sticky report-list" v-if="tabName==='d2'&&isActive">
      <view class="report-item" :class="{'report-item-active':currentItem==='top'}" @click="toItem('top')">
        重大隐患</view>
      <view class="report-item" :class="{'report-item-active':currentItem==='hazardTop'}"
        @click="toItem('hazardTop')">隐患</view>
      <view class="report-item" :class="{'report-item-active':currentItem==='conformTop'}"
        @click="toItem('conformTop')">符合项</view>
    </view>
    <swiper :current="tabIndex" style="flex: 1;min-height: 600px;" :style="{height:contentHeight}" :duration="300" @change="ontabchange">
      <swiper-item class="swiper-item" v-for="(tab,index1) in dataList" :key="index1">
        
        <service-hunman :isDesign="tab.nodeType===1" :serverId='serverId' :tab='tab' :designName='designList' :designData='designData' @openPopup='openPopup'></service-hunman>
        <amount-house :checkData='checkData' :isReport='false' id="d3" @isEmpty='isEmpty' :index='index1' v-if="tab.nodeType===3&&!tab.currentEmpty"></amount-house>
        <resultContent ref='result' id="d2" @isEmpty='isEmpty' :index='index1' :serverId='tab.serveCardId' v-if="tab.nodeType===2&&!tab.currentEmpty" @getData='getData' :scrollTop='scrollTop'
          :isReport='true'></resultContent>
        <serviceDesign id="d1" v-if="tab.nodeType===1&&!tab.currentEmpty" :projectId='projectId' @isEmpty='isEmpty' :index='index1' @changeDesign='changeDesign' :serverId='tab.serveCardId'></serviceDesign>
        <serviceActuarial id="d4" v-if="tab.nodeType===4&&!tab.currentEmpty" @isEmpty='isEmpty' :index='index1' :projectId='projectId' :serverId='tab.serveCardId'></serviceActuarial>
        <serviceSteward id="d5" v-if="tab.nodeType===5&&!tab.currentEmpty" @isEmpty='isEmpty' :index='index1' :projectId='projectId'></serviceSteward>
        <serviceDismantle id="d6" v-if="tab.nodeType>5&&!tab.currentEmpty" :index='index1' @isEmpty='isEmpty' :projectId='projectId' :serveId='tab.serveCardId'></serviceDismantle>
        <no-service v-if="tab.currentEmpty" :listImage='false' words="暂无服务相关信息 验收通过后即会呈现"></no-service>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import resultContent from '../../components/result-content/result-content.vue'
  import serviceHunman from '../../components/service-hunman/service-hunman.vue'
  import serviceActuarial from '../../components/service-actuarial/service-actuarial.vue'
  import serviceDismantle from '../../components/service-dismantle/service-dismantle.vue'
  import serviceDesign from '../../components/service-design/service-design.vue'
  import serviceSteward from '../../components/service-steward/service-steward.vue'
  import serviceDesignChange from '../../components/service-design-change/service-design-change.vue'
  import {getDesignServeMenu,getMyService} from '../../../api/decorate.js'
  export default {
    components: {
      resultContent,
      serviceHunman,
      serviceActuarial,
      serviceDismantle,
      serviceDesign,
      serviceDesignChange,
      serviceSteward
    },
    data() {
      return {
        dataList: [
        ],
        tabIndex: 0,
        tabName: '',
        scrollTop: 0,
        contentHeight: '600px',
        isActive:false,
        currentItem:'top',
        result:{},
        designList:[],
        projectId:0,
        processId:0,
        serverId:0,
        designData:{},
        currentEmpty:0,
        checkData:{},
      };
    },
    onPageScroll(scrollTop) {
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
    onLoad(e){
      this.projectId = e.projectId
      this.processId = e.processId
    },
    mounted() {
      
      this.getMyService()
    },
    methods: {
      toCost() {
        uni.navigateTo({
          url: '/sub-decorate/pages/current-cost/current-cost?id=1&projectId='+this.projectId+'&isCost=0'
        })
      },
      ontabtap(item, index) {
        this.tabIndex = index
        this.tabName = 'd'+(item.nodeType>6?6:item.nodeType)
      },
      ontabchange(e) {
        let current = e.detail.current
        this.tabIndex = current
        this.tabName = 'd'+(this.dataList[current].nodeType>6?6:this.dataList[current].nodeType)
        this.serverId = this.dataList[current].serveCardId
        
        this.dataList[current].currentEmpty = 0
        this.checkData = {
          serveId:this.dataList[current].serveCardId,
          type:this.dataList[current].serveType
        }
        console.log(this.checkData)
        this.changeHeight()
        // this.$nextTick(function(){
        //   this.$refs.result[0].getHeight()
        // })
      },
      openPopup(){
        this.$refs.popup.open('bottom')
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
      isEmpty(item){
        
        this.dataList[item].currentEmpty = 1
        
        
      },
      changeDesign(e){
        this.designData = e
        console.log(e)
        this.changeHeight()
      },
      changeHeight() {
        setTimeout(()=>{
          this.$nextTick(function(){
            let query = uni.createSelectorQuery()
            
            query.select('#' + this.tabName).boundingClientRect();
            query.exec((res) => {
              if (res && res[0]) {
                this.contentHeight =  res[0].height+150+ 'px';
              }
            });
          })
          
        },1000)
          
        
      },
      chooseItem(e){
        this.dataList[this.tabIndex].serveCardId= e.severId
        this.serverId = e.severId
        this.$refs.popup.close()
      },
      getDesignServeMenu(){
        getDesignServeMenu(this.projectId).then(res=>{
          this.designList = res
          console.log(res)
        })
      },
      getMyService(){
        let data = {
          projectId:this.projectId,
          processId:this.processId
        }
        getMyService(data).then(res=>{
          
          this.dataList = res
          this.serverId = this.dataList[0].serveCardId
          this.tabName = 'd'+(this.dataList[0].nodeType>6?6:this.dataList[0].nodeType)
          this.checkData = {
            serveId:this.dataList[0].serveCardId,
            type:this.dataList[0].serveType
          }
          
          if(this.dataList.findIndex(item=>{
            return item.nodeType === 1
          })!==-1){
            this.getDesignServeMenu()
          }
          
          this.changeHeight()
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
    z-index: 10;
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
    background: linear-gradient(129deg,#00cdec 0%, #00ed7d 92%);;
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
      border: 0.5px solid #ececec;
      border-radius: 8rpx;
    }
  
    .report-item-active {
      background: rgba(0, 191, 182, 0.07);
      border: 0.5px solid #00bfb6;
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
