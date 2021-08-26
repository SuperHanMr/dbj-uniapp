<template>
  <view class="content">
		<view class="v1">
			<text>装修服务</text>
			<text>></text>
		</view>
		<view>
			<text>设计图</text>
		</view>
    <decorate-notice
      v-if="noticeActive"
      @closeNotice='closeNotice'
      class="decorate-notice"
    ></decorate-notice>
    <drag-button-follow
      :style.sync="style"
      @btnClick='noticeActive=true'
      :follow='`left,right`'
      className="drag-button"
      class="drag-button"
    >
      <view>
        <text>消息</text>
        <text style="color: red;">2</text>
      </view>
    </drag-button-follow>
    <view>
      <view>量房</view>
      <view>计算服务</view>
      <view>设计服务</view>
    </view>
    <uni-popup
      ref="popup"
      type="bottom"
    >
      <view style="background-color: #fff;">
        <button @click="goToAddHouseInfo">添加房屋信息</button>
        <button @click="goToDecorateService">进行装修服务</button>
        <button @click="goToVerifyHouse">进行验房服务</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { queryEstates } from "../../../api/decorate.js"
export default {
	created() {
		this.getHouses()
	},
  mounted() {},
  data() {
    return {
      style: "",
      noticeActive: false,
      houses: [],
    };
  },
  methods: {
    closeNotice() {
      this.noticeActive = false;
    },
    openPopup() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
    },
    goToAddHouseInfo() {
			uni.navigateTo({
			  url: "/pages/decorate/add-house/add-house",
			});
		},
    goToDecorateService() {},
    goToVerifyHouse() {},
		getHouses() {
			queryEstates({}).then(data => {
				if (data.length < 1) {
				  this.openPopup();
				}
				this.houses = data
			})
		}
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.v1 {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 30rpx;
	border: 2rpx solid green;
}
.drag-button {
  background: #ffffff;
  border: 0.5px solid #eeeeee;
  box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
  width: 100rpx;
  height: 100rpx;
  font-size: 24rpx;
  color: #000000;
  position: absolute;
  right: 0rpx;
  bottom: 188rpx;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
