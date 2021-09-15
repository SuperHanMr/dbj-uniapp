<template>
  <view class="img-list" :style="{height:maxHeight,marginBottom:-lineSpace+'rpx',overflow: isHidden}">
    <image class="img-item" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx',marginBottom:lineSpace+'rpx'}" v-for="(el,index) of list" @click="previewImage(list,index)" :key='el' :src="el"></image>
    <view class="mask" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx',top:(imgHeight+lineSpace)*(row-1)+'rpx'}" >
    </view>
    <view class="mask-num" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx',top:(imgHeight+lineSpace)*(row-1)+'rpx'}" @click="previewImage(list,3*row)">
      +{{list.length-row*3}}
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      //必传参数
      list:[],
      imgWidth:{
        type:Number,
        default:212
      },
      imgHeight:{
        type:Number,
        default:212
      },
      row:{
        type:Number,
        default:1
      },
      lineSpace:{
        type:Number,
        default:6
      },
      isHidden:{
        type:String,
        default:'hidden'
      }
    },
    computed:{
      maxHeight(){
        return this.imgHeight*this.row+this.lineSpace*(this.row-1)+'rpx'
      }
    },
    methods:{
      previewImage(list,index){
        let urls = []
        list.forEach(item=>{
          urls.push(item.url||item)
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
    justify-content: space-around;
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
      right: 0;
      border-radius: 4px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
    }
  }
</style>
