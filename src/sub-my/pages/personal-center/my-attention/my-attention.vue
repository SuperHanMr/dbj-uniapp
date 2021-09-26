<template>
  <view class="fill">
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
		 <view class="line" />
    <swiper
      class="swiper"
      :current="currentIndex"
      :duration="200"
      @change="swiperChange"
			:style="{paddingBottom:systemBottom,backgroundColor:currentList.length < 1?'#ffffff':'#f5f6f6'}"
    >
      <swiper-item
        v-for="(item,tabindex) in tabList"
        :key="item"
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
         
          
          <view class="empty-container" v-if="currentList.length < 1">
						<image src="../../../../static/order/blank_house@2x.png" mode=""></image>
						<text v-if="tabindex==0">您还没有关注房子</text>
						<text v-if="tabindex==1">您还没有关注工匠</text>
						<text v-if="tabindex==2">您还没有关注优先推荐</text>
					</view>
					
					<view  v-else >
						<!-- 房屋 -->
						<view v-if="tabindex==0"  class="house-item" v-for="item in houselist" :key="item.id">
							<image
							  :src="item.estateImage"
							  mode=""
							/>
						  <view class="houseInfo">
						    <view class="header">
						      {{item.address}}
						    </view>
						
						    <view class="area-house">
						      <text>{{item.insideArea}}㎡</text>
						      <view class="split-line" />
						      <text>{{item.houseStructureName}}</text>
						    </view>
							</view>
						</view>
						<!-- 工匠 -->
						<view  v-if="tabindex == 1" class="craftsmanAndRecommend" v-for="item2 in currentList" :key="item2.id">
						  <view class="left">
						    <image
						      :src="item2.avatar"
						      mode=""
									@click="goToPersonalHome(item2)"
						    />
						    <view class="baseInfo">
						      <view class="name1">
						       {{item2.nickName}}
						      </view>
						      <view class="icon">
						        {{item2.position}}
						      </view>
						    </view>
						  </view>
						  <view class="right">
						    <view class="button2" v-if="item2.isFocused">
						      已关注
						    </view>
						    <view class="button1" v-else>
									+关注
								</view>
						  </view>
						</view>
						<!-- 优先推荐 -->
						<view  v-if=" tabindex == 2" v-for="item3 in recommendlist" :key="item3.id"  >
							<view class="craftsmanAndRecommend">
								<view class="left">
									<image
										:src="item3.avatar"
										mode=""
									></image>
									<view class="baseInfo">
										<view class="name2">
											{{item3.nickName}}
										</view>
										<view class="icon">
											{{item3.position}}
										</view>
									</view>
								</view>
								<view class="right">
									<view class="button4" v-if="item3.isRecommend">
										已优先推荐
									</view>
									<view class="button3" v-else>
										<image src="../../../static/icon_recommend_@2x.png" mode=""></image>
										优先推荐
									</view>
								</view>
							</view>
						</view>
						
					</view>
				</scroll-view>
			</swiper-item>
    </swiper>
  </view>
</template>

<script>
import {getCraftsmanList, getHouseList, getRecommendList } from "../../../../api/order.js";
export default {
  data() {
    return {
			tabList: ["房子", "工匠", "优先推荐"],
      triggered: false, //控制刷新显示字段
      currentIndex: 0,
			houselist:[],
			craftsmanlist:[],
      recommendlist: [],
			page:[1,1,1],
      totalPage: [1,1,1],
      loading: false,
			
      routeId:"",
			systemBottom:"",
		};
  },
  onShow() {
		this.houseList();
	},
	mounted(e) {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.systemBottom = menuButtonInfo.bottom + "rpx";
	},
	computed: {
		currentList() {
			if (this.currentIndex == 0) {
				return this.houselist;
			} else if (this.currentIndex == 1) {
				return this.craftsmanlist;
			} else {
				return this.recommendlist;
			} 
		},
	},
		
  methods: {
    swiperChange(e) {
      let index = e.target.current || e.detail.current;
      this.currentIndex = index;
			switch(this.currentIndex){
				case 0: 
					this.houselist.length <1 ? this.houseList() :""
					break;
				case 1: 
					this.craftsmanlist.length <1 ? this.craftsmanList() :""
					break;
				case 2:
					this.recommendlist.length <1 ? this.recommendList() :""
					break;
			}
		},
		
		// 房屋请求
		houseList(){
			this.loading = true;
			getHouseList({routeId:1002}).then(data=>{
				this.houselist = data
				this.loading = false
				console.log("data= ",data)
			})
		},
		// 工匠请求
		craftsmanList(){
			this.loading = true;
			getCraftsmanList({routeId:1001}).then(data=>{
				this.craftsmanlist = data
				this.loading = false
				console.log("data= ",data)
			})
		},
		// 优先推荐请求
    recommendList() {
      this.loading = true;
			getRecommendList({routeId:2001}).then(data=>{
				this.recommendlist = data
				this.loading = false
				console.log("data= ",data)
			})
		},
		
		
		
		// 去工匠的个人主页
		goToPersonalHome(data){
			uni.redirectTo({
			  url: "/sub-decorate/pages/person-page/person-page",
			});
		},
		
		
		
		onLoadMore() {
      if (this.loading || this.page[this.currentIndex] >= this.totalPage[this.currentIndex]) {
        return;
      }
      this.page[this.currentIndex]++;
      // this.getCaseList();
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

.item {
  width: 100%;
  height: 80rpx;
  color: #999999;
  font-size: 30rpx;
  position: relative;

  .tab-text {
    width: 150rpx;
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
  }
}

.top-tab {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 80rpx;
  background-color: #fff;

  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selected {
    color: #333333;

    .bottom-icon {
      position: absolute;
      width: 32rpx;
      height: 4rpx;
      background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
      border-radius: 200rpx 200rpx 0px 0px;
      bottom: 1rpx;
      left: 50%;
      margin-left: -16rpx;
    }
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

.line {
	height: 2rpx;
	background: #f4f4f4;
}
.scroll-view {
  flex: 1;
  height: 100%;
  background-color: #ffffff;

  .house-item {
    padding: 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    align-items:center;
		image {
		  width: 112rpx;
		  height: 112rpx;
		  object-fit: cover;
			background-color: pink;
			margin-right: 32rpx;
		}
    .houseInfo {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      .header {
        max-width: 542rpx;
        height: 42rpx;
        line-height: 42rpx;
        color: #333333;
        font-size: 30rpx;
				font-weight: 550;
        margin-bottom: 8rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .area-house {
        color: #999999;
        font-size: 24rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .split-line {
          margin: 0 20rpx;
          width: 1rpx;
          height: 20rpx;
          background: #d1d1d1;
        }
      }
      
    }
    
  }

  .empty-container {
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

  .craftsmanAndRecommend {
    padding: 24rpx 32rpx;
    height: 144rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      flex: 1;
      image {
        width: 96rpx;
        height: 96rpx;
        object-fit: cover;
        margin-right: 24rpx;
      }
      .baseInfo {
        .name1,
        .name2 {
          height: 42rpx;
          line-height: 42rpx;
          color: #333333;
          font-size: 30rpx;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .name1 {
          max-width: 410rpx;
        }
        .name2 {
          max-width: 350rpx;
        }
        .icon {
          margin-top: 4rpx;
          width: 73rpx;
          height: 30rpx;
          line-height: 30rpx;
          background: linear-gradient(45deg, #6d95ef, #84b9fc);
          border-radius: 6rpx;
          text-align: center;
          font-size: 20rpx;
          color: #ffffff;
        }
      }
    }
    .right {
			
      .button1,
      .button2,
      .button3,
      .button4 {
        height: 68rpx;
        line-height: 40rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        text-align: center;
        border-radius: 8rpx;
      }
      .button1,
      .button2 {
        width: 144rpx;
      }
      .button3,
      .button4 {
        width: 200rpx;
      }
      .button1,
      .button3 {
        background: linear-gradient(135deg, #36d9cd, #28c6c6);
        color: #ffffff;
				padding: 14rpx 30rpx;
        
      }
      .button2,
      .button4 {
        background: #ffffff;
        border: 2rpx solid #dbdbdb;
        padding: 12rpx 28rpx;
      }
			
			.button3{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				image{
					width: 24rpx;
					height: 26rpx;
					object-fit: cover;
					margin-right: 4rpx;
				}
			}
    }
  }
}
</style>
