<template>
  <view class="result-content">
    <view class="report-time" v-if="!isReport">{{checkData.time}}后将会自动确认验房结果</view>
    <view class="report-content">
      <view class="report-title">
        <view>
          <text class="title">验房报告</text>
          <text class="time">{{checkData.submitReportTime}}</text>
        </view>
      </view>
      <view class="charts">
        <uniEcCanvas class="uni-ec-canvas" id="uni-ec-canvas" ref="canvas" canvas-id="uni-ec-canvas" :ec="ec">
        </uniEcCanvas>
      </view>
      <text class="report-text" :class="{'report-text-hidden':isHidden}">{{checkData.summaryDescription}}看见阿三开afksjlakjfklsa可怜少女风圣诞快乐能否抽空拉升能否都是快乐烦恼撒到了咖啡奈拉蒂考是你疯狂了你都IE撒发呢可是你发教案的饭卡的女克拉女阿克琉斯的那份v发卡量苏丹诺夫蓝坤大厦内费拉达斯你发了肯定是你疯狂思念疯狂拉升能否顺利可能疯了</text>
      <view class="openHidden" v-if="showBtn" @click="clickHidden">
        {{hddenText}}
      </view>
      <view class="img-list">
        <imagePreview :list='checkData.imageUrlList' :row='2'></imagePreview>
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
    <view class="text-content">
      <deliverCard id="major-hazard" color="#CA3737" title="重大隐患" :data='data[2]'></deliverCard>
      <deliverCard id="hazard" color="#F6A93B" title="隐患" :data='data[1]'></deliverCard>
      <deliverCard id="conform" color="#348BE2" title="符合项" :data='data[0]'></deliverCard>
    </view>
    <text class="bottom-text">我是有底线的~</text>

  </view>
</template>
<script>
  import uniEcCanvas from '../../components/uni-ec-canvas/uni-ec-canvas.vue'
  import * as echarts from '../../components/uni-ec-canvas/echarts'
  import deliverCard from '../delivery-card/delivery-card.vue'
  import imagePreview from '../../../components/image-preview/image-preview.vue'
  
  import {
    getCheckResultDetail,
    confirmCheckResult
  } from '../../../api/decorate.js'
  import { formatDate } from '../../../utils/common.js'
  
  let chart = null
  export default {
    components: {
      uniEcCanvas,
      deliverCard,
      imagePreview
    },
    props: {
      isReport: false,
      scrollTop: 0,
      serverId:0
    },
    filters:{
      formatDate
    },
    data() {
      return {
        ec: {
          lazyLoad: true
        },
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
                legend: {
                  width: 40,
                  color: "#666"
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
            radius: ['50%', '70%'],
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
    mounted() {
      this.getData();
    },
    watch: {
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
        getCheckResultDetail(this.serverId).then(res => {
          this.checkData = res
          this.checkData.time = '00:00:00'
          this.data[0].arr = res.normalList
          this.data[0].value = res.normalList.length
          this.data[1].arr = res.generalProblemList
          this.data[1].value = res.generalProblemList.length
          this.data[2].arr = res.seriousProblemList
          this.data[2].value = res.seriousProblemList.length
          this.$refs.canvas.init(this.initChart)
          this.drawImage()
          this.getTop()
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
          console.log(err)
          this.$emit('isEmpty')
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
      getTop() {
        this.$nextTick(function() {
          let query = uni.createSelectorQuery().in(this)
          query.select("#major-hazard").boundingClientRect((res) => {
            this.top = res.top;
          })
          query.select("#hazard").boundingClientRect((res) => {
            this.hazardTop = res.top;
          })
          query.select("#conform").boundingClientRect((res) => {
            this.conformTop = res.top;
          })
          query.select(".report-text").boundingClientRect((res) => {
            this.isHidden = res.height/20 > 5;
            this.showBtn = res.height/20 > 5;
            // console.log(res.height,this.isHidden)
            
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
        console.log(data)
        this.$emit('getData',data)
      },
      toItem(id) {
        this.currentItem = id
        let location = this[id] + 16
        if (this.isReport) {
          location = location - 44
        }
        uni.pageScrollTo({
          duration: 100, // 过渡时间
          scrollTop: this[id] + 16, // 滚动的实际距离
        })
      },
      clickHidden(){
        this.isHidden = !this.isHidden
        this.hddenText = this.isHidden?'查看全部':'收起隐藏'
      },
      drawImage() {
        this.option.series[0].data = this.data
        let text = [`{a|${this.checkData.checkCount}}{b|项}`, "{x|总检查}"].join("\n")
        this.option.series[0].label.formatter = text
        this.option.legend.formatter = (name) => {
          let i = this.data.findIndex(item => {
            return item.name === name
          })
          return `${name}  {legend2|${this.data[i].value}}`
        }
      },
      initChart(canvas, width, height, canvasDpr) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: canvasDpr
        })
        canvas.setChart(chart)
        chart.setOption(this.option)
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
      height: 162rpx;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #efefef;

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
      border: 1px solid #cccccc;
      border-radius: 12px;
      margin: 24rpx auto;
      line-height: 44rpx;
      font-weight: 400;
      text-align: center;
      color: #999999;
      font-size: 24rpx;
      
    }
    .img-list {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      margin-top: 40rpx;

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

  .charts {
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
    height: 96rpx;
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
