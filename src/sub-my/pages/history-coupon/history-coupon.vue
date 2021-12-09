<template>
	<view class="fill">
		<view class="top-tab">
			<view 
				v-for="(item,index) in tabList"
				:key="index"
				class="item" 
				:class="{selected:index == currentIndex}"
				@click="currentIndex = index"
			>
				<view class="tab-text">{{item}}</view>
				<view class="bottom-icon" />
			</view> 
		</view>
		
		<view class="line"/>
		<swiper 
			class="swiper"
			:current="currentIndex" 
			:duration="200" 
			@change="swiperChange"
		>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view v-if="!usedList.length" class="empty-history">
						<image src="../../static/img_noCoupon@2x.png" mode=""></image>
						<text>您还没有已使用优惠券</text>
					</view>
					<view class="usedList-container">
						<view class="coupon-item" v-for="item1 in usedList" :key=item1>
							<coupon-item :showStatusIcon="true"></coupon-item>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" >
					<view v-if="!invalidList.length" class="empty-invalidOrUsed">
						<image src="../../static/img_noCoupon@2x.png" mode=""></image>
						<text>您还没有已过期/已失效优惠券</text>
					</view>
					<view class="invalidList-container">
						<view class="coupon-item" v-for="item2 in invalidList" :key=item2>
							<coupon-item :showStatusIcon="true"></coupon-item>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:0,
				tabList:['已使用' ,"已过期/已失效"],
				usedList:[
					{
						key:1,
					},
					{
						key:2,
					},
					{
						key:3,
					},
					{
						key:4,
					},
				],
				invalidList:[
					{
						key:5,
					},
					{
						key:6,
					},
					{
						key:7,
					},
					{
						key:8,
					},
				],
				loading:false,
				
			}
		},
		methods: {
			swiperChange(e) {
			  let index = e.target.current || e.detail.current;
			  this.currentIndex = index;
				console.log("this.currentIndex=",this.currentIndex)
			},
		}
	}
</script>

<style lang="scss" scoped >
	.fill {
	  width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  padding-top: 4rpx;
	  background-color: #fff;
		.top-tab {
			width: 100%;
			display: flex;
			flex-direction: row;
			// height: 96rpx;
			font-size: 30rpx;
		
			.item {
				width: 100%;
				height: 80rpx;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: normal;
				flex-direction: column;
				color: #999;
				position: relative;
				.tab-text {
					height: 80rpx;
					font-size: 28rpx;
					line-height: 80rpx;
					text-align: center;
				}
			}
		
			.selected {
				.tab-text{
					color: #333333;
					font-weight: 500;
				}
				.bottom-icon {
					position: absolute;
					width: 32rpx;
					height: 4rpx;
					background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
					border-radius: 200rpx 200rpx 0px 0px;
					bottom: 8rpx;
					left: 176rpx;
				}
			}
		}
		.line {
			width: 100%;
			height: 0.5px;
			background-color: #f2f2f2;
		}
		.swiper{
			height: 100% ;
		}
		.empty-history,.empty-invalidOrUsed{
			padding-top: 328rpx;
			display: flex;
			flex-flow: column nowrap; 
			align-items: center;
			image{
				width: 400rpx;
				height: 400rpx;
			}
			text{
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				font-weight:400;
				color: #CBCCCC;
			}
		}
	
		.usedList-container,.invalidList-container{
			.coupon-item{
				margin: 0 24rpx 24rpx;
				width: 702rpx;
			}
			.coupon-item:nth-child(1){
				padding-top: 8rpx;
			}
		}
	}
	
</style>

