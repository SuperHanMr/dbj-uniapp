<template>
  <view class="check-result">
    <view class="report-content">
      <view class="report-title">
        <view>
          <text class="title">验房报告</text>
          <text class="time">2021-08-21 13:00:00</text>
        </view>
      </view>
      <view class="charts">
        <uniEcCanvas class="uni-ec-canvas" id="uni-ec-canvas" ref="canvas" canvas-id="uni-ec-canvas" :ec="ec">
        </uniEcCanvas>
      </view>
      <text class="report-text">这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第一个版本可支持语音和视频这里的文字是识别出来的。这里展示验房人员在总结中的文字稿，不可隐藏，所有的内容都展示。第一都展都展</text>
      <view class="img-list">
        <image></image>
        <image></image>
        <image></image>
      </view>
      
    </view>
    <deliverCard color="#CA3737" title="重大隐患" :data='data[2]'></deliverCard>
    <deliverCard color="#F6A93B" title="隐患" :data='data[1]'></deliverCard>
    <deliverCard color="#348BE2" title="符合项" :data='data[0]'></deliverCard>
  </view>
</template>

<script>
  import uniEcCanvas from '../../components/uni-ec-canvas/uni-ec-canvas.vue'
  import * as echarts from '../../components/uni-ec-canvas/echarts'
  import deliverCard from '../../components/delivery-card/delivery-card.vue'
  let chart = null
  export default {
    components: {
      uniEcCanvas,
      deliverCard
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
            arr:[
              {
                title:"满敲墙面，每处空鼓面积≤0.04m²，且每个自然间不多于2处",
                content:"这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第版支持语音和视手机都可能发生了咖啡那是开发那开发哪上课"
              },
            ]
          },
          {
            value: 12,
            name: '隐患',
            itemStyle: {
              color: '#F6A93B'
            },
            arr:[
              {
                title:"满敲墙面，每处空鼓面积≤0.04m²，且每个自然间不多于2处",
                content:"这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第版支持语音和视手机都可能发生了咖啡那是开发那开发哪上课"
              },
              {
                title:"满敲墙面，每处空鼓面积≤0.04m²，且每个自然间不多于2处",
                content:"这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第版支持语音和视手机都可能发生了咖啡那是开发那开发哪上课"
              },
            ]
          },
          {
            value: 8,
            name: '重大隐患',
            itemStyle: {
              color: '#CA3737'
            },
            arr:[
              {
                title:"满敲墙面，每处空鼓面积≤0.04m²，且每个自然间不多于2处",
                content:"这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第版支持语音和视手机都可能发生了咖啡那是开发那开发哪上课"
              },
              {
                title:"满敲墙面，每处空鼓面积≤0.04m²，且每个自然间不多于2处",
                content:"这里展示验房人员在总结中的文字稿，不可隐藏所有的内容都展示。第版支持语音和视手机都可能发生了咖啡那是开发那开发哪上课"
              },
              {
                title:"满敲墙面，每处空鼓面积≤0.04m²",
                content:"不可隐藏所有的内容都展示。第版支持语音和视手机都可能发生了咖啡那是开发那开发哪上课"
              },
            ]
          },
        ],
        num: 43
      }
    },
    mounted() {
      this.drawImage()
    },
    onLoad() {
      this.$refs.canvas.init(this.initChart)
    },
    methods: {
      drawImage() {
        this.option.series[0].data = this.data
        let text = [`{a|${this.num}}{b|项}`, "{x|总检查}"].join("\n")
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
      }

    }
  }
</script>

<style lang="scss" scoped>
  .check-result {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 24rpx;
  }

  .report-title{
    height: 162rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
    .title{
      color: #333333;
      font-size: 40rpx;
      font-weight: 500;
      letter-spacing: 1px;
      // margin-bottom: 8rpx;
      display: block;
    }
    .time{
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
    }
  }
  
  .report-content {
    // width: 638rpx;
    padding: 32rpx 32rpx 40rpx;
    // height: 608px;
    opacity: 1;
    background: #ffffff;
    border-radius: 24rpx;
    .report-text{
      color: #333;
      font-size: 26rpx;
      font-weight: 400;
      letter-spacing: 1px;
    }
    .img-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 40rpx;
      image{
        width: 208rpx;
        height: 208rpx;
        opacity: 1;
        border-radius: 8rpx;
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
  
</style>
