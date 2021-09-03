<template>
  <view class="check-result">
    <view class="report-content">
      <view class="report-title">
        <text class="title">验房报告</text>
        <text class="time">2021-08-21 13:00:00</text>
      </view>
      <view class="charts">
        <uniEcCanvas class="uni-ec-canvas" id="uni-ec-canvas" ref="uni-ec-canvas" canvas-id="uni-ec-canvas" :ec="ec">
        </uniEcCanvas>
      </view>
    </view>
  </view>
</template>

<script>
  import uniEcCanvas from '../../components/uni-ec-canvas/uni-ec-canvas.vue'

  export default {
    components: {
      uniEcCanvas
    },
    data() {
      return {
        ec: {
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
                  },
                  legend2: {
                    color: "#ffffff",
                  },
                },
              },
              padding: [0, 10, 0, 0],
              itemGap: 15,
              icon: "circle",
              formatter: (name) => {
                      
                        return name+`name`;
                      },
            },
            series: [{
              name: '访问来源',
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
              data: [{
                  value: 1048,
                  name: '搜索引擎'
                },
                {
                  value: 735,
                  name: '直接访问'
                },
                {
                  value: 580,
                  name: '邮件营销'
                },
              ]
            }]
          }
        },
        num: 43
      }
    },
    mounted() {
      this.drawImage()
    },
    methods: {
      drawImage() {
        this.ec.option.series[0].data = [
                {
                  value: 37,
                  name: '符合项',
                  itemStyle:{
                    color:'#348BE2'
                  }
                  
                },
                {
                  value: 12,
                  name: '隐患',
                  itemStyle:{
                    color:'#F6A93B'
                  }
                },
                {
                  value: 8,
                  name: '重大隐患',
                  itemStyle:{
                    color:'#CA3737'
                  }
                  
                },
              ]
        let text = [`{a|${this.num}}{b|项}`, "{x|总检查}"].join("\n")
        this.ec.option.series[0].label.formatter = text
        // this.ec.option.legend.formatter = (name)=>{name+123}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .check-result {
    display: flex;
    justify-content: center;
  }

  .report-content {
    width: 638rpx;
    // height: 608px;
    opacity: 1;
    background: #ffffff;
    border-radius: 24rpx;
    padding: 32rpx;
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
