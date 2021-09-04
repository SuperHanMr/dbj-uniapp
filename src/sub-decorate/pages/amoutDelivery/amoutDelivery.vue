<template>
  <view class="amount-delivery">
    <amount-house></amount-house>
    <bottom-btn btnContent="确认量房图" @subimt='subimt'></bottom-btn>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods:{
      subimt(){
        uni.showModal({
          content:'是否确认该量房结果？',
          success:(res)=>{
            if(res.confirm){
              uni.switchTab({
                url:'/pages/decorate/index/index'
              })
            }
          }
        })
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .amount-delivery{
    height: 100%;
    
    background-color: #fff;
  }
</style>
