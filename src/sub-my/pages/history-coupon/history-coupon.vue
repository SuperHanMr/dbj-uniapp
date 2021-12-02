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
				<view class="tab-text">
					{{item}}
				</view>
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
					<view class="empty-history">
						<image src="../../static/blank_ic@2x.png" mode=""></image>
						<text>您还没有已过期优惠券</text>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" >
					<view class="empty-invalidOrUsed">
						<image src="../../static/blank_ic@2x.png" mode=""></image>
						<text>您还没有已过期优惠券</text>
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
			}
		},
		methods: {
			swiperChange(e) {
			  let index = e.target.current || e.detail.current;
			  this.currentIndex = index;
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
					bottom: 0rpx;
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
				width: 402rpx;
				height: 416rpx;
			}
			text{
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				font-weight:400;
				color: #999999;
			}
		}
	}

	
</style>

