<template>
  <view class="replace-worker">
    <view class="content">
      <text class="replace-tip">请选择更换的原因</text>
      <view class="radio-group">
        <view class="radio-item" v-for="(item, index) in items" :class="{last:item.value==='其他'}"  :key="item.value" @click="radioChange(item)">
          <view class="text">{{item.label}}</view>
          <view class="circle" :class="{isActive:currentId===item.value}" >
            <view></view>
          </view>
        </view>
      </view>
      <view class="text-area" v-if="currentId === '其他'">
        <textarea  v-model="otherReason" class="replace-text-area" :maxlength='500' placeholder="请输入原因详情"/>
        <text class="text-area-warning" v-if="!otherReason">（必填）</text>
        <text class="text-area-info" v-if="otherReason">{{otherReason.length}}/500</text>
      </view>
      <view class="upload-tip">上传照片<text>（{{num}}/6）</text></view>
      <uni-file-picker 
        v-model="imageValue" 
        fileMediatype="image" 
        mode="grid"   
        :limit="6"
        @select="select" 
        @progress="progress" 
        @success="success" 
        @fail="fail" 
      >
        <view class="upload-contet">
          <view>
            <image src="../../../static/shopping-cart/details_pop_add_normal@2x.png"></image>
            <text>点击上传</text>
          </view>
        </view>
      </uni-file-picker>
    </view>
    <bottom-btn btnContent="提交" @subimt="subimt()"></bottom-btn>
	</view>
</template>

<script>
  import {replaceGrab} from '../../../api/decorate.js'
	export default {
		data() {
			return {
				num:0,
				items:[
					{
						label:"服务态度不好",
						value:"服务态度不好"
					},
					{
						label:"能力不足",
						value:"能力不足"
					},
					{
						label:"沟通能力不足",
						value:"沟通能力不足"
					},
					{
						label:"其他原因",
						value:'其他'
					},
				],
        currentId:"",
				imageValue:[],
        otherReason:""
			};
		},
		methods:{
			radioChange(evt){
				this.currentId = evt.value

			},
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},

			// 上传成功
			success(e){
				console.log('上传成功')
        console.log(this.imageValue)
			},

			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},
      subimt(){
        if(!this.currentId){
          uni.showToast({
            title: '请您选择更换原因',
            duration: 2000,
            icon:'none'
          })
          return
        }else if(this.currentId==='其他'&&this.otherReason.length===0){
          uni.showToast({
            title: '请您描述具体原因',
            duration: 2000,
            icon:'none'
          })
          return
        }
        uni.switchTab({
          url:'/pages/decorate/index/index'
        })
        // replaceGrab().then(res=>{
        //   uni.showToast({
        //     title: '已提交申请',
        //     duration: 2000,
        //     icon:'success'
        //   })
        // })
      }
	}
}
</script>

<style lang="scss">
.replace-worker{
  // padding: 0 32rpx;
  background-color: #fff;
  height: 100%;
  .content{
    padding: 0 32rpx;
  }
  .replace-tip{
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #999;
  }
  .radio-item{
    height: 104rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
    .text{
      font-size: 28rpx;
      font-weight: 400;
      color: #333;
    }
    .circle{
      width: 32rpx;
      height: 32rpx;
      border-radius: 50%;
      border: 1px solid #bababa;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .isActive{
      border: 1px solid #35c4c4;
      view{
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #35c4c4;
      }
    }
  }
  .last{
    border-bottom: none;
  }
  .text-area{
    position: relative;
    .replace-text-area{
      width: calc(100% - 24px);
      height: 232rpx;
      padding: 24rpx 24rpx 68rpx;
      opacity: 1;
      background: #f5f6f6;
      border-radius: 24rpx;
      font-size: 26rpx;
      color: #333;
      font-weight: 400;
      letter-spacing: 2rpx;
    }
    .text-area-warning,.text-area-info{
      color: #ea3434;
      font-size: 26rpx;
      position: absolute;
      bottom: 24rpx;
      right: 24rpx;
    }
    .text-area-info{
      color: #999;
    }
  }
  .upload-tip{
    height: 104rpx;
    line-height: 104rpx;
    color: #333;
    font-size: 28rpx;
    font-weight: 400;
    text{
      color: #999;
    }
  }
  .upload-contet{
    width: 100%;
    height: 100%;
    background-color: #F5F6F6;
    display: flex;
    justify-content: center;
    align-items: center;
    image{
      width: 56rpx;
      height: 56rpx;
      margin: 0 auto;
      display: block;
    }
    text{
      font-size: 24rpx;
      color: #999;
      font-weight: 400;
      display: block;
    }
  }
}
</style>
