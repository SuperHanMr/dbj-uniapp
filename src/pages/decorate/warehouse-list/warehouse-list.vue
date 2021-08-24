<template>
	<view>
		<view class="top-tab">
			<view  v-for="(item,index) in tabList" class="item" :class="{selected:index==currentIndex}" @click="currentIndex=index">
				{{item}}
			</view>
			
			
		</view>
		<swiper  class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" @change="swiperChange">
			<swiper-item>
				<view class="swiper-item">
					!!!!!!
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					???????
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[1,2,3,4,5,6,7,8,9,0],
				tabList:[
					'待发货','已发货','已收货','退款'
				],
				currentIndex:0
			};
		},
		methods:{
			swiperChange(e){
				console.log(e);
				
			}
		}
	}
</script>

<style lang="scss">
	   page {
	        width: 100%;
	        min-height: 100%;
	        display: flex;
			
        flex-direction: column;
	    }
	.item{
		width: 100%;
		height: 80rpx;
	}
	.top-tab{
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 80rpx;
		.item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.selected{
			color: yellow;
		}
	}
	.swiper-item{
		flex: 1;
		width: 100%;
		background-color: blue;
	}
	..swiper{
		flex: 1;
		display: flex;
	}
	
</style>
