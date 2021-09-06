<template>
  <view class="bottom-btn" :style="{paddingBottom:systemBottom,height:systemHeight}">
  	<button class="add-btn" @click="subimt">{{btnContent}}</button>
  </view>
</template>

<script>
  export default {
    name:"bottom-btn",
    props:{
      num:0,
      btnContent:''
    },
    data() {
      return {
        systemBottom:'',
        systemHeight:''
      };
    },
    mounted(e){
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.systemBottom = menuButtonInfo.bottom + 'rpx'; 
      this.systemHeight = menuButtonInfo.bottom + this.num +'rpx'
      console.log(this.systemBottom)
    },
    methods:{
      subimt(){
        this.$emit('subimt')
      }
    }
  }
</script>

<style lang="scss">
.bottom-btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 136rpx;
    display: flex;
    flex-direction: row; 
    justify-content: center;  
    align-items: center;
    .add-btn {
      // margin-top: 20rpx;
      height: 88rpx;
      background: linear-gradient(135deg, #53d5cc, #4fc9c9);
      border-radius: 12rpx;
      width: 686rpx;
      line-height: 88rpx;
      text-align: center;
      color: #FFFFFF;
      font-size: 32rpx;
    }
  }
</style>
