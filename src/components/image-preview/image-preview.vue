<template>
  <view class="img-list" :style="{maxHeight:hasHeight?maxHeight:'auto',marginBottom:-lineSpace+'rpx',marginRight:-colSpace*3+'rpx',overflow: isHidden}">
    <!-- <text>{{}}</text> -->
    <image class="img-item" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx',marginBottom:lineSpace+'rpx',marginRight:colSpace+'rpx'}" v-for="(el,index) of list" @click="previewImage(list,index)" :key='index' :src="(el.url||el.fileUrl||el)+`?x-oss-process=image/resize,m_lfit,w_${imgWidth},h_${imgHeight}`" mode="aspectFill"></image>
    <view class="" v-if="hasHeight&&list.length-row*3>0">
      <view class="mask" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx',top:(imgHeight+lineSpace)*(row-1)+1+'rpx',left:imgWidth*2+colSpace*2-1+'rpx'}" >
      </view>
      <view class="mask-num" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx',top:(imgHeight+lineSpace)*(row-1)+'rpx',left:imgWidth*2+colSpace*2+'rpx'}" @click="previewImage(list,3*row)">
        +{{list.length-row*3}}
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      //必传参数，图片数组
      list:{
        type:Array,
        default:()=>{
          return[]
        }
      },
      //图片宽度
      imgWidth:{
        type:Number,
        default:212
      },
      //图片高度
      imgHeight:{
        type:Number,
        default:212
      },
      //行数
      row:{
        type:Number,
        default:1
      },
      //行间距
      lineSpace:{
        type:Number,
        default:6
      },
      //列间距
      colSpace:{
        type:Number,
        default:8
      },
      isHidden:{
        type:String,
        default:'hidden'
      },
      //是否限高
      hasHeight:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return{
        maskStyle:{
          width:this.imgWidth+'rpx',
          height:this.imgHeight+'rpx',
          top:(this.imgHeight+this.lineSpace)*(this.row-1)+'rpx',
          left:this.imgWidth*2+this.colSpace*2+'rpx'
        }
      }
    },
    computed:{
      maxHeight(){
        console.log(this.imgHeight*this.row+this.lineSpace*this.row+'rpx')
        return this.imgHeight*this.row+this.lineSpace*this.row - 4 +'rpx'
      }
    },
    methods:{
      previewImage(list,index){
        let urls = []
        list.forEach(item=>{
          let url = (item.url||item.fileUrl||item)+`?x-oss-process=image/resize,m_lfit,w_${this.imgWidth},h_${this.imgHeight}`
          urls.push(item.url||item.fileUrl||item)
        })
        uni.previewImage({
        	urls: urls,
        	current: index
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .img-list{
    position: relative;
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    .img-item{
      border-radius: 8rpx;
    }
    .mask{
      position: absolute;
      right: 0;
      opacity: 0.25;
      background: #000000;
      border-radius: 4px;
      color: #fff;
      
    }
    .mask-num{
      position: absolute;
      border-radius: 4px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
    }
  }
</style>
