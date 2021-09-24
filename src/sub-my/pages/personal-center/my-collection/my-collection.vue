<template>
  <view class="fill">
    <view class="tab-container">
      <view class="top-tab">
        <view
          v-for="(item,index) in tabList"
          :key="index"
          class="item"
          :class="{selected:index==currentIndex}"
          @click="currentIndex=index"
        >
          <view class="tab-text">
            {{item}}
          </view>

          <view class="bottom-icon" />
        </view>
      </view>
      <view class="edit-btn" v-if="currentList.length > 1">
        <text v-if="ShowMgrBrn" @click="ShowMgrBrn=!ShowMgrBrn">管理</text>
        <text v-else @click="ShowMgrBrn=!ShowMgrBrn">完成</text>
      </view>
    </view>

    <swiper
      class="swiper"
      :current="currentIndex"
      :duration="200"
      @change="swiperChange"
      :style="{background:tabList.length > 0 ?'none':'#fff'}"
    >
      <swiper-item
        v-if="tabList.length > 0"
        v-for="(item,tabindex) in tabList"
        :key="tabindex"
      >
        <scroll-view
          class="scroll-view"
          scroll-y="true"
          refresher-background="#FFF"
          refresher-enabled="true"
          :refresher-triggered="triggered"
          @refresherrefresh="onRefresh"
          @scrolltolower="onLoadMore"
        >
          <waterfall
            :list="caseList"
            @selectedItem="onSelectedItem"
						:showCheckIcon="!ShowMgrBrn"
						
          ></waterfall>
				</scroll-view>
			</swiper-item>

      <swiper-item
        v-else
        class="empty-container"
      >
        <view class="line" />
        <view class="empty-body">
          <image
            src="../../../../static/order/blank_house@2x.png"
            mode=""
          ></image>
          <text v-if="tabindex==0">您还没有收藏商品</text>
          <text v-if="tabindex==1">您还没有收藏案例</text>
        </view>
      </swiper-item>

    </swiper>
		
		<!-- 底部按钮 -->
		<view class="footer" v-if=" currentList.length > 1 && !ShowMgrBrn" :style="{paddingBottom:systemBottom}">
			<view class="left">
				<image  src="../../../../sub-home/static/checked@2x.png" mode=""></image>
				<image  src="../../../../static/order/images/product_unChecked.png" mode="" />
				<text>全选</text>
			</view>
			<view class="button" @click="handleCancel" >
				取消收藏
			</view>
		</view>-
	
		<!-- 取消收藏弹框 -->
		<popup-dialog ref="popup" :title="title" @confirm="confirmCancelCollection"></popup-dialog>
		
		
		
  </view>
</template>

<script>
import{getGoodsList,getRealCaseList} from "../../../../api/order.js"
import { caseList } from "../../../../api/home.js";
export default {
  data() {
    return {
      triggered: false,
      list: [
        "阿道夫",
        "刮大风",
        "部分地方",
        "不梵蒂冈",
        "有人特",
      ],
      
      tabList: ["商品", "案例"],
      triggered: false, //控制刷新显示字段
      currentIndex: 0,
      caseList: [],
      loading: false,
      page: 1,
      totalPage: 1,
			
			
			
			userId:"",
			ShowMgrBrn:true,
			isChecked:false,
			title:"",
			
			systemBottom:"",
    };
  },
	
  onShow() {
		this.userId=getApp().globalData.userInfo.id
		console.log("this.userId=",this.userId)
    this.getCaseList();
  },
	mounted(e) {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.systemBottom = menuButtonInfo.bottom + 32 + "rpx";
	},
  computed: {
    currentList() {
      if (this.currentIndex == 0) {
				this.title="确定要将选中商品取消收藏吗？"
        return this.list;
      } else {
				this.title="确定要将选中案例取消收藏吗？"
        return this.list;
      } 
    },
  },
  methods: {
		swiperChange(e) {
      let index = e.target.current || e.detail.current;
      this.currentIndex = index;
    },
		async getCaseList() {
      this.loading = true;
			// let caseItem =await getRealCaseList({
			// 	isReverse:true,
			// 	routeId:5001,//【收藏真实案例路由id，记录用户收藏的真实案例】
			// 	userId:this.userId,
			// 	type:1,//(1,"收藏")
			// 	bizType:7,//【真实案例】REAL_CASE(7,"真实案例")
			// })
      let caseItem = await caseList({
        page: this.page,
      });
      this.totalPage = caseItem.totalPage;
      this.caseList = this.caseList.concat(caseItem.list);
			
			this.caseList = this.caseList.map(item=>{
				item.isChecked = true
				return item
			})
			
      this.loading = false;
    },
		async getProductList(){
			this.loading = true;
			let productItem = await getGoodsList({
				isReverse:true,
				routeId:5002,//【收藏商品路由id：记录用户收藏的商品】
				userId:this.userId,
				type:1,//(1,"收藏")
				bizType:1,//(1,"商品")
			})
			this.totalPage = caseItem.totalPage;
			this.caseList = this.caseList.concat(caseItem.list);
			this.loading = false;
		},
		
		handleCancel(){
			this.$refs.popup.open()	
		},
		
		
		
		
		
		onSelectedItem(item){
			console.log("点击了收藏item")
		},
		
		confirmCancelCollection(){
			console.log("确认取消")
		},
		
		
		
		
		
    onLoadMore() {
      if (this.loading || this.page >= this.totalPage) {
        return;
      }
      this.page++;
      this.getCaseList();
    },
		onRefresh(e) {
      this.triggered = true;
      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.fill {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}
.tab-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx 0 32rpx;
  background-color: #fff;
  .top-tab {
    height: 80rpx;
    display: flex;
    flex-direction: row;
    .item {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      height: 80rpx;
      color: #999999;
      font-size: 30rpx;
      position: relative;

      .tab-text {
        width: 60rrpx;
        height: 42rpx;
        line-height: 42rpx;
        text-align: center;
        margin-right: 72rpx;
      }
    }

    .selected {
      color: #333333;
      .bottom-icon {
        position: absolute;
        width: 32rpx;
        height: 4rpx;
        background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
        border-radius: 200rpx 200rpx 0px 0px;
        bottom: 0;
        left: 30rpx;
        margin-left: -16rpx;
      }
    }
  }

  .edit-btn {
    font-size: 28rpx;
    color: #00bfb6;
  }
}

.swiper-item {
  height: 200rpx;
  width: 100%;
}

.swiper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  height: 100%;
}
.empty-container {
  .line {
    width: 100%;
    height: 2rpx;
    background: #f4f4f4;
  }
  .empty-body {
    padding: 180rpx 240rpx 0 240rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
    image {
      width: 248rpx;
      height: 248rpx;
      object-fit: cover;
      margin-bottom: 22rpx;
    }
    text {
      font-size: 26rpx;
      font-weight: 400;
      text-align: center;
      color: #999999;
    }
  }
}
.footer{
	height: 88rpx;
	background-color: #FFFFFF;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 32rpx;
	.left{
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		image{
			width:40rpx ;
			height: 40rpx;
			object-fit: cover;
			margin-right: 10rpx;
		}
		text{
			height: 40rpx;
			line-height: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #111111;
		}
	}
	.button{
		width:400rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: linear-gradient(135deg,#36d9cd, #28c6c6);
		border-radius: 12rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
}
::v-deep .uni-popup-dialog {
  width: 560rpx !important;
  border-radius: 24rpx !important;
  background-color: #fff !important;
}
::v-deep .uni-dialog-title-text {
  color: #111111 !important;
  font-size: 32rpx !important;
  font-weight: 550 !important;
}
::v-deep .uni-dialog-title {
  padding: 48rpx 0 !important;
}
::v-deep .uni-dialog-content {
  display: none !important;
}
::v-deep .uni-dialog-button-group {
  border-top: 2rpx solid #f5f5f5;
}
::v-deep .uni-dialog-button {
  height: 82rpx !important;
}
::v-deep .uni-button-color {
  color: #ff3347 !important;
  font-size: 30rpx !important;
  font-weight: 500;
}
::v-deep .uni-dialog-button-text {
  font-size: 30rpx !important;
}
</style>
