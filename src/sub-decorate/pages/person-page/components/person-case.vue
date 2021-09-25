<template>
  <view class="person-case person-content-item">
    <view class="title">Ta的案例</view>
    <designCase :leftList="leftList" :rightList="rightList" :leftHeight="leftHeight" :rightHeight="rightHeight" ></designCase>
  </view>
</template>

<script>
  import designCase from '@/components/design-case/design-case.vue'
  export default{
    components:{
      designCase
    },
    data(){
      return{
        leftHeight: 0,
        rightHeight: 0,
        leftList: [],
        rightList: [],
      }
    },
    methods:{
      
    }
  }
</script>

<style lang="scss" scoped>
</style>
