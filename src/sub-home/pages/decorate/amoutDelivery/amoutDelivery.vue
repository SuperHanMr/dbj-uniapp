<template>
  <view class="amount-delivery">
    <button @click="openChangeModal">修改量房结果</button>
    <view class="content">
      <view class="content-top">
        <text>原始结构尺寸图</text>
        <image></image>
      </view>
      <view class="content-list">
        <text>量房图片</text>
        <image></image>
      </view>
    </view>
    <view class="bottom">
      <button @click="openModal">确认量房结果</button>
    </view>
  </view>
</template>

<script>
  export default{
    data(){
      return{}
    },
    methods:{
      openModal(){
        
        uni.showModal({
          content:'是否确认量房方案',
          success:res => {
            if(res.confirm){
              this.subimt();
            }
          }
        })  
      },
      openChangeModal(){
        uni.showModal({
          content:'请先与量房员沟通需要修改的内容',
          confirmText:'确定修改',
          success:res=>{
            if(res.confirm){
              this.subimt();
            }
          }
        })  
      },
      subimt(){
        uni.switchTab({
          url:'/pages/decorate/index/index'
        })
      }
    }
  }
</script>

<style>
</style>
