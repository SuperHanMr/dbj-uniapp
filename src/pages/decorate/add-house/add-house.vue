<template>
  <view class="add-house">
    <form @submit="formSubmit" @reset="formReset">
      <view class="form-item">
        <label class="item-label">业主姓名</label>
        <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
      </view>
      <view class="form-item">
        <label class="item-label">手机号</label>
        <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
      </view>
      <view class="form-item">
        <label class="item-label">所在地区</label>
        <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
      </view>
      <view class="form-item">
        <label class="item-label">楼栋号</label>
        <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
      </view>
      <view class="form-item">
        <label class="item-label">楼型</label>
        <radio-group>
            <label>
                <radio value="cb" checked="true" />选中
            </label>
            <label>
                <radio value="cb" />未选中
            </label>
        </radio-group>
      </view>
      <view class="form-item">
        <label class="item-label" >户型</label>
        <input type="text" v-model="addData.roomData"  @click="openList"/>

      </view>
      <view class="form-item">
        <label class="item-label">房屋面积</label>
        <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入业主姓名" />
      </view>
      <view class="form-item">
        <label class="item-label">是否有电梯</label>
        <input class="uni-input" name="input" v-model="addData.name" placeholder="请输入电梯楼层" />
      </view>
    </form> 
    <uni-popup ref="popup" type="bottom">
      <picker-view v-if="visible" :value="addData.roomData" @change="bindChange" class="picker-view">
          <picker-view-column>
              <view class="item" v-for="item of roomList" :key="item">{{item}}室</view>
          </picker-view-column>
          <picker-view-column>
              <view class="item" v-for="item of roomList" :key="item">{{item}}厅</view>
          </picker-view-column>
          <picker-view-column>
              <view class="item" v-for="item of roomList" :key="item">{{item}}厨</view>
          </picker-view-column>
          <picker-view-column>
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
          roomData:[0,3,0,4],
          name:1
        },
        roomList:[1,2,3,4,5],
        value:[1,1,1,1],
        indicatorStyle: `height: 50px;line-height:50px`
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
        console.log(123)
        this.$refs.popup.open()
        this.visible = true
      },
      bindChange: function (e) {
        const val = e.detail.value
        console.log(val)
        this.addData.roomData = val
      }
    }
  }
</script>

<style lang="scss">
.form-item{
  
}
.uni-input{
  display: inline-block;
}
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
}
.item {
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
