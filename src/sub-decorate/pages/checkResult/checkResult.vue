<template>
  <view class="check-result">
    <result-content :scrollTop='scrollTop'></result-content>
  </view>
</template>

<script>
  import resultContent from '../../components/result-content/result-content.vue'
  export default {
    components:{
      resultContent
    },
    data(){
      return{
        scrollTop:0
      }
    },
    onPageScroll(scrollTop){
      this.scrollTop = scrollTop.scrollTop   
    },
  }
</script>

<style>
  
</style>
