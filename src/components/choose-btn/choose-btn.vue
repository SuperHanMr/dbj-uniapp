<template>
  <view class="floor-btn">
    <button class="btn" :class="{active:item.id==currentBtn}" v-for="item of btnList" :key='item.id' @click="chooseBtn(item.id)">{{item.label}}</button>
  </view>
</template>

<script>
  export default {
    name:"choose-btn",
    props:{
      btnList:{
        type:Array,
        default:[{id:0}]
      },
      currentBtn:''
    },
    data() {
      return {
        
      };
    },
    mounted(){
    },
    // watch:{
    //   btnList(){
    //     console.log(123)
        
    //   }
    // },
    methods:{
      chooseBtn(id){
        
        this.$emit('chooseBtn',id)
      }
    }
  }
</script>

<style lang="scss">
.btn{
      display: inline-block;
      width: 116rpx;
      height: 64rpx;
      background-color: #f7f7f7;
      border-radius: 32rpx;
      margin-right: 24rpx;
      border: 0;
      font-size: 26rpx;
      color: #111;
    }
    .btn:last-child{
      margin-right: 0;
    }
    .btn:after{
      border: none;
    }
    .active{
      background-color: #e8fafa;
      border: 1px solid #35C4C4;
      color: #24bdbd;
    }
</style>
