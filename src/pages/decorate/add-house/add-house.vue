<template>
  <view class="add-house">
    <form @submit="formSubmit" @reset="formReset">
      <view class="content">
        <view class="form-item">
          <label class="item-label">业主姓名</label>
          <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
        </view>
        <view class="form-item">
          <label class="item-label">手机号</label>
          <input class="uni-input" name="input" v-model="addData.phone" placeholder="请输入业主姓名" />
        </view>
        <view class="form-item">
          <label class="item-label">所在地区</label>
          <input class="uni-input" @click="chooseMap" disabled name="input" v-model="addData.path" placeholder=" " />
        </view>
        <view class="form-item">
          <label class="item-label">小区</label>
          <input class="uni-input" :disabled="!addData.path" name="input" v-model="addData.home" placeholder=" " />
        </view>
      </view>
      <view class="content">
        <view class="form-item">
          <label class="item-label">楼栋号</label>
          <input class="uni-input" name="input" v-model="addData.num" placeholder="请输入楼栋号" />
        </view>
        <view  class="form-item special">
          <label class="item-label">楼型</label>
          <choose-btn :btnList='floorList' @chooseBtn='chooseFloor'></choose-btn>
        </view>
        <view class="form-item">
          <label class="item-label" >户型</label>
          <input type="text" class="uni-input" disabled v-model="addData.roomData"  @click="openList"/>
        </view>
        <view class="form-item">
          <label class="item-label">房屋面积</label>
          <input class="uni-input" type="digit" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
        </view>
        <view class="form-item special ele">
          <label class="item-label">有无电梯</label>
            <choose-btn :btnList='elevatorList' @chooseBtn="chooseEle"></choose-btn>
          <input v-if="addData.ele" class="ele-input" name="input" v-model="addData.ele" placeholder="请输入电梯楼层" />
        </view>
      </view>
      <view class="content bottom-switch">
        <view class="text-left">
          <text class="text">设置为默认地址</text>
          <text class="tips">提醒：每次下单会默认使用该地址</text>
        </view>
        <switch color="#24BDBD" :checked='addData.checked' @change="switchChange" style="transform:scale(0.9)"></switch>
      </view>
      <view class="submit-bottom">
        <text class="submit" @click="save">保存</text>
      </view>
    </form> 
    <uni-popup ref="popup" @maskClick='pickerCancel' type="bottom">
      <view class="picker-btn">
        <text class="btn cancel-btn" @click="pickerCancel">取消</text>
        <text class="btn sure-btn" @click="pickerSure">确定</text>
      </view>
      <picker-view v-if="visible" :indicator-class='indicatorClass' :value="roomData" @change="bindChange" class="picker-view">
          <picker-view-column class="column">
              <view class="item" v-for="item of roomList" :key="item">{{item}}室</view>
          </picker-view-column>
          <picker-view-column class="column">
              <view class="item" v-for="item of roomList" :key="item">{{item}}厅</view>
          </picker-view-column>
          <picker-view-column class="column">
              <view class="item" v-for="item of roomList" :key="item">{{item}}厨</view>
          </picker-view-column>
          <picker-view-column class="column">
              <view class="item" v-for="item of roomList" :key="item">{{item}}卫</view>
          </picker-view-column>
      </picker-view> 
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        visible:false,
        addData:{
          roomData:'',
          name:1,
          ele:0
        },
        roomData:[],
        roomList:[1,2,3,4,5],
        currentFloor:0,
        floorList:[
          {
            label:'平层',
            id:0
          },
          {
            label:'错层',
            id:1
          },
          {
            label:'跃层',
            id:2
          },
          {
            label:'复式',
            id:3
          },
          {
            label:'别墅',
            id:4
          }
        ],
        elevatorList:[
          {
            label:'有',
            id:0
          },
          {
            label:'无',
            id:1
          }
        ],
        indicatorClass:'choose-item'
      };
    }, 
    methods:{
      formSubmit(){},
      formReset(){},
      chooseMap(){
        uni.chooseLocation({
            success: function (res) {
                console.log('位置名称：' + res.name);
                console.log('详细地址：' + res.address);
                console.log('纬度：' + res.latitude);
                console.log('经度：' + res.longitude);
            }
        });
      },
      openList(){
        // console.log(123)
        this.$refs.popup.open()
        this.visible = true
      },
      bindChange: function (e) {
        this.roomData = e.detail.value
      },
      pickerCancel(){
        this.roomData = this.addData.roomData
        this.$refs.popup.close()
      },
      pickerSure(){
        this.addData.roomData = this.roomData 
        this.$refs.popup.close()
      },
      chooseFloor(id){
        console.log(id)
        this.addData.type = id
      },
      chooseEle(id){
        this.addData.ele = id
        console.log(this.addData.ele)
      },
      switchChange(e){
        this.addData.checked=e.detail.value
        console.log(this.addData.checked)
      }
    }
  }
</script>

<style lang="scss" >
.add-house{
  padding-top: 16rpx;
  view .special{
    height: 180rpx;
    // line-height: 200rpx;
    padding-top: 30rpx;
    label {
      display: block !important;
      // margin-top: 40rpx;
      height: 68rpx;
      line-height: 68rpx;
    }
    label.item-label:before{
      display: none;
    }
  }
  view .ele{
    height: auto;
    .ele-input{
      margin-bottom: 38rpx;
      border: 1px solid #ebebeb;
      height: 84rpx;
      line-height: 84rpx;
      padding:0 16rpx ;
      font-size: 28rpx;
      color: #ccc;
    }
  }
  .form-item{
    height: 116rpx;
    margin: 0 32rpx;
    border-bottom: 1px solid #F2F2F2;
    line-height: 116rpx;
    .item-label{
      color: #333333;
      font-size: 28rpx;
      font-weight: 400;
      display: inline-block;
      width: 126rpx;
      margin: 0 46rpx 0 0;
      text-align: left;
      vertical-align: top;
      
    }
    label.item-label:before{
      content: '*';
      font-size: 26rpx;
      widthw: 14rpx;
      color: red;
    }
    
  }
  .content{
    background-color: #fff;
    margin-bottom: 16rpx;
  }
  .picker-view{
    background-color: #fff;
  }
  .uni-input{
    display: inline-block;
    height: 116rpx;
    line-height: 116rpx;
    vertical-align: top;
    color: #111;
  }
  .picker-view {
    width: 750rpx;
    height: 600rpx;
    margin-top: 20rpx;
  }
  .column{
    position: flex;
    align-items: center;     
  }
  .item {
    // height: 50px;
    line-height: 34px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .choose-item{
    position: relative;
    width: 110rpx;
    margin: 0 40rpx ;
    border: none !important;
    border-radius: 20rpx;
    background-color: #eee;
    z-index: -1111;
  }
  .choose-item::after{
    border: none;
  }
  .choose-item::before{
    border: none;
  }
  .picker-btn{
    position: relative;
    background-color: #F7F7F7;
    top: 20rpx;
    width: 100%;
    // background-color: #fff;
    // opacity: 1;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;     
    border-radius: 20rpx 20rpx 0 0;
    height: 100rpx;
    line-height: 100rpx;

    .btn{
      margin: 0 50rpx;
      color: #999;
    }
    .sure-btn{
      color: #24BDBD;
    }
  }
  .bottom-switch{
    height: 152rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;  
    padding: 0 32rpx;
    .text{
      font-size: 26rpx;
      color: #111;
    }
    .tips{
      display: block;
      font-size: 22rpx;
      color: #999;
    }
  }
  .submit-bottom{
    margin-top: 78rpx;
    width: 100%;
    height: 136rpx;
    display: flex;
    justify-content: center;
    // text-align: center;
    align-items: center;  
    background-color: #fff;
    .submit{
      display: block;
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      color: #fff;
      // opacity: 1;
      background: linear-gradient(135deg,#53d5cc, #4fc9c9);
      border-radius: 12rpx;
    }
  }
}
</style>
