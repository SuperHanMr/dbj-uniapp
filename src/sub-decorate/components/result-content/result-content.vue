<template>
  <view class="result-content" >
    <view class="report-time" v-show="!isReport&&checkData.time">{{checkData.time}}后将会自动确认验房结果</view>
    <view class="report-content" v-show="isLoading">
      <view class="report-title">
        <view>
          <text class="title">验房报告</text>
          <text class="time">{{checkData.submitReportTime}}</text>
        </view>
      </view>
      <!-- #ifdef MP-WEIXIN -->
        <view class="charts-box">
          <uniEcCanvas class="uni-ec-canvas" id="uni-ec-canvas" ref="canvas" canvas-id="uni-ec-canvas" :ec="ec">
          </uniEcCanvas>
        </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <view class="charts-box" id="echarts"></view>
      <!-- #endif -->
      <text class="report-text" :class="{'report-text-hidden':isHidden}">{{checkData.summaryDescription}}</text>
      <view class="openHidden" v-if="showBtn" @click="clickHidden">
        {{hddenText}}
        <i :class="{'icon-a-ic_zhuangxiuxianchang_jingsuanzhankai_csn':isHidden,'icon-a-ic_zhuangxiuxianchang_jingsuanshouqi_csn':!isHidden}"></i>
      </view>
      <view class="img-list">
        <image-preview :list='checkData.imageUrlList' :row='2'></image-preview>
        <!-- <image v-for="item of checkData.imageUrlList" :key='item' :src="item"></image> -->
      </view>
    </view>
    <view class="sticky" v-if="isActive&&!isReport">
      <view class="item" :class="{'item-active':!isReport&&currentItem==='top'}" @click="toItem('top')">
        重大隐患({{data[2].value}})</view>
      <view class="item" :class="{'item-active':!isReport&&currentItem==='hazardTop'}" @click="toItem('hazardTop')">
        隐患({{data[1].value}})</view>
      <view class="item" :class="{'item-active':!isReport&&currentItem==='conformTop'}" @click="toItem('conformTop')">
        符合项({{data[0].value}})</view>
    </view>
    <view class="text-content" v-if="isLoading">
      <deliverCard id="major-hazard" backgroundColor="linear-gradient(90.02deg, rgba(250, 77, 50, 0.09) 0.02%, rgba(250, 77, 50, 0.02) 99.99%);" color="#F5432D" title="重大隐患" :data='data[2]'></deliverCard>
      <deliverCard id="hazard"  backgroundColor="linear-gradient(90.02deg, rgba(254, 195, 101, 0.09) 0.02%, rgba(254, 195, 101, 0.02) 99.99%);" color="#FF7F1E" title="隐患" :data='data[1]'></deliverCard>
      <deliverCard id="conform"  backgroundColor="linear-gradient(90.02deg, rgba(74, 164, 252, 0.09) 0.02%, rgba(74, 164, 252, 0.02) 99.99%);" color="#4AA4FC" title="符合项" :data='data[0]'></deliverCard>
    </view>
    <text class="bottom-text" v-show="isLoading">我是有底线的~</text>

  </view>
</template>
<script>
  // #ifdef MP-WEIXIN 
  import uniEcCanvas from '../../components/uni-ec-canvas/uni-ec-canvas.vue'
  // #endif
  import * as echarts from '../../components/uni-ec-canvas/echarts.min'
  import deliverCard from '../delivery-card/delivery-card.vue'
  // import imagePreview from '../../../components/image-preview/image-preview.vue'
  // // import * as echarts from "./echarts.min";
  import {
    getCheckResultDetail,
    confirmCheckResult
  } from '../../../api/decorate.js'
  import { formatDate } from '../../../utils/common.js'
  
  let myChart = null
  let chart = null
  export default {
    components: {
      // #ifdef MP-WEIXIN 
      uniEcCanvas,
      // #endif
      deliverCard,
      // imagePreview
    },
    props: {
      isReport: true,
      scrollTop: 0,
      serverId:{
        type:Number,
        default:0
      },
      index:0
    },
    filters:{
      formatDate
    },
    data() {
      return {
        ec: {
          lazyLoad: true
        },
        isLoading:false,
        option: {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: "center",
            right: "40px",
            width: "150px",
            itemWidth: 8,
            itemHeight: 8,
            selectedMode: false,
            orient: 'vertical',
            textStyle: {
              rich: {
                // legend: {
                //   width: 40,
                //   color: "#fff"
                // },
                name:{
                  fontSize:13,
                },
                legend2: {
                  color: "#333333",
                },
              },
            },
            padding: [0, 10, 0, 0],
            itemGap: 15,
            icon: "circle",
            formatter: function(name) {

              return name + `name`;
            },
          },
          series: [{
            name: '检查问题',
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            center: ["90px", "center"],
            label: {
              show: true,
              position: 'center',
              formatter: "",
              rich: {
                a: {
                  color: "#0d0e10",
                  lineHeight: 24,
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: "PriceFont",
                },
                b: {
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#0d0e10",
                },
                x: {
                  fontSize: 12,
                  color: "#666666",
                  lineHeight: 17,
                  verticalAlign: "bottom",
                },
              },
            },
            labelLine: {
              show: false
            },
            data: []
          }]
        },
        data: [{
            value: 37,
            name: '符合项',
            itemStyle: {
              color: '#348BE2'
            },
            arr: []
          },
          {
            value: 12,
            name: '隐患',
            itemStyle: {
              color: '#F6A93B'
            },
            arr: []
          },
          {
            value: 8,
            name: '重大隐患',
            itemStyle: {
              color: '#CA3737'
            },
            arr: []
          },
        ],
        top: '',
        hazardTop: '',
        conformTop: '',
        isActive: false,
        checkData: {
          
        },
        currentItem: 'top',
        isHidden:false,
        showBtn:false,
        hddenText:'查看全部',
        
      }
    },
    watch: {
      serverId:{
        handler:function(){
          this.getData()
          
        },
        immediate: true
      },
      scrollTop() {
        
        if (this.scrollTop > this.top) {
          this.isActive = true
          this.currentItem = 'top'
          this.currentItem = this.scrollTop > this.conformTop ? 'conformTop' : this.scrollTop > this.hazardTop ?
            'hazardTop' : 'top'
        } else {
          this.isActive = false
        }
      },
      checkData() {}
    },
    methods: {
      getData() {
        // this.isLoading = false
        if(this.serverId === 0){
          return
        }
        getCheckResultDetail(this.serverId).then(res => {
          
          if(this.isReport&&res.serveCardState===4){
            console.log('123')
            this.$emit('isEmpty',this.index)
            return
          }else{
            // this.isLoading = true
          }
          
          this.checkData = res
          
          this.checkData.time = '00:00:00'
          this.data[0].arr = res.normalList
          this.data[0].value = res.normalList.length
          this.data[1].arr = res.generalProblemList
          this.data[1].value = res.generalProblemList.length
          this.data[2].arr = res.seriousProblemList
          this.data[2].value = res.seriousProblemList.length
          
          this.isLoading = true
          this.getMsgHeight()
          setTimeout(()=>{
            // #ifdef MP-WEIXIN 
            this.$refs.canvas.init(this.initChart)
            // #endif
            // #ifdef H5
            chart = echarts.init(document.getElementById('echarts'))
            myChart.setOption(this.option)
            // #endif
            // this.$refs.canvas.initByOldWay(this.initChart)
            // console.log(2222)
            this.drawImage()
            this.getTop()
          },1000)
          
          
          
          if(!this.isReport&&this.checkData.autoSubmitTime>0){
            let id = setInterval(()=>{
              if(this.checkData.autoSubmitTime===0){
                clearInterval(id)
                return
              }
              this.checkData.autoSubmitTime = this.checkData.autoSubmitTime-1000
              this.checkData.time = this.toHHmmss(this.checkData.autoSubmitTime-1000).split('.')[0]
            },1000)
          }
          
        }).catch(err=>{
          this.$emit('isEmpty',this.index)
        })
      },
      toHHmmss(date){
        let time;
        let hours = parseInt((date%(1000*60*60*24))/(1000*60*60))
        let minutes = parseInt((date%(1000*60*60))/(1000*60))
        let seconds = (date%(1000*60))/1000
        time = (hours<10?('0'+hours):hours)+':'+(minutes<10?('0'+minutes):minutes) +':'+ (seconds<10?('0'+seconds):seconds)
        return time
      },
      getMsgHeight(){
        let query = uni.createSelectorQuery().in(this)
        this.$nextTick(function() {
        query.select(".report-text").boundingClientRect((res) => {
          console.log(res)
          this.isHidden = res.height/20 > 6;
          this.showBtn = res.height/20 > 6;
          // console.log(res.height,this.isHidden)
          
        }).exec()
        })
      },
      getTop() {
        let query = uni.createSelectorQuery().in(this)
        
        this.$nextTick(function() {
          
          query.select("#major-hazard").boundingClientRect((res) => {
            
            this.top = res.top;
            
          })
          query.select("#hazard").boundingClientRect((res) => {
            this.hazardTop = res.top;
          })
          query.select("#conform").boundingClientRect((res) => {
            this.conformTop = res.top;
          })
          
          
          query.exec(function(res) {
            res[0].top // #the-id节点的上边界坐标
            res[1].scrollTop // 显示区域的竖直滚动位置
          })
          
        })
      },
      getHeight(){
        let data = {
          top:this.top,
          hazardTop:this.hazardTop,
          conformTop:this.conformTop,
        }
        
        this.$emit('getData',data)
      },
      toItem(id) {
        this.currentItem = id 
        let location = this[id] + 6
        if (this.isReport) {
          location = location - 44
        }
        uni.pageScrollTo({
          duration: 100, // 过渡时间
          scrollTop: location, // 滚动的实际距离
        })
      },
      clickHidden(){
        this.isHidden = !this.isHidden
        this.hddenText = this.isHidden?'查看全部':'收起隐藏'
        this.getTop()
      },
      drawImage() {
        this.option.series[0].data = this.data
        console.log(11111111111111)
        let text = [`{a|${this.checkData.checkCount}}{b|项}`, "{x|总检查}"].join("\n")
        this.option.series[0].label.formatter = text
        this.option.legend.formatter = (name) => {
          let i = this.data.findIndex(item => {
            return item.name === name
          })
          return `{name|${name}}  {legend2|${this.data[i].value}}`
        }
      },
      initChart(canvas, width, height, canvasDpr) {
        console.log(111111111,">>>>>>>>>>>>>><<<<<<<<<<<<")
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: canvasDpr
        })
        canvas.setChart(chart)
        chart.setOption(this.option)
        console.log(chart,">>>>>>>>>>>>>><<<<<<<<<<<<")
        return chart
      },
    }
  }
</script>

<style lang="scss" scoped>
  .report-time{
    width: 100%;
    height: 56rpx;
    background-color: #fff5de;
    color: #a28645;
    font-size: 24rpx;
    text-align: center;
    line-height: 56rpx;
    margin-bottom: 24rpx;
    // position: sticky;
    // top: 0;
    // z-index: 100;
  }
  .result-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .text-content{
    padding: 0 24rpx;
  }
  .report-content {
    // width: 638rpx;
    padding: 32rpx 32rpx 40rpx;
    margin: 0 24rpx;
    width: 100%;
    // height: 608px;
    opacity: 1;
    background: #ffffff;
    border-radius: 24rpx;

    .report-title {
      // height: 162rpx;
      display: flex;
      // align-items: center;
      border-bottom: 0.5px solid #efefef;
      padding-bottom: 32rpx;

      .title {
        color: #333333;
        font-size: 40rpx;
        font-weight: 500;
        letter-spacing: 1px;
        // margin-bottom: 8rpx;
        display: block;
      }

      .time {
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
      }
    }

    .report-text {
      color: #333;
      font-size: 26rpx;
      font-weight: 400;
      letter-spacing: 1px;
      width: 100%;
      line-height: 40rpx;
    }
    .report-text-hidden{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
    .openHidden{
      width: 148rpx;
      height: 44rpx;
      opacity: 1;
      border: 0.5px solid #cccccc;
      border-radius: 12px;
      margin: 24rpx auto;
      line-height: 44rpx;
      font-weight: 400;
      text-align: center;
      color: #999999;
      font-size: 24rpx;
      i{
        display: inline-block;
        font-size: 8rpx;
        margin-left: 8rpx;
        vertical-align: middle;
      }
    }
    .img-list {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      margin-top: 32rpx;

      image {
        width: 208rpx;
        height: 208rpx;
        opacity: 1;
        border-radius: 8rpx;
        margin-right: 8rpx;
        // border: 1px solid #eee;
        background-color: #eee;
      }
    }
  }
  
  .charts-box {
    height: 350rpx;
    width: 100%;

    .uni-ec-canvas {
      height: 100%;
      width: 100%;
      display: block;
    }
  }

  .report-list {
    padding: 0 32rpx;
    top: 88rpx !important;
  }

  .sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 98rpx;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;

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

    // .report-item {
    //   width: 144rpx;
    //   margin-right: 16rpx;
    //   height: 58rpx;
    //   line-height: 58rpx;
    //   border: 0.5px solid #ececec;
    //   border-radius: 8rpx;
    // }

    // .report-item-active {
    //   background: rgba(0, 191, 182, 0.07);
    //   border: 0.5px solid #00bfb6;
    //   color: #00BFB6;
    //   font-size: 26rpx;
    //   font-weight: 400;
    // }
    .item-active{
      font-weight: 500;
      color: #333;
    }
    .item-active::after {
      content: "";
      display: inline-block;
      width: 68rpx;
      height: 6rpx;
      opacity: 1;
      background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%);
      border-radius: 100px 100px 0px 0px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }

  .bottom-text {
    display: block;
    margin-top: 80rpx;
    text-align: center;
    width: 100%;
    font-size: 26rpx;
    color: #999;
    padding-bottom: 190rpx;
  }


</style>
