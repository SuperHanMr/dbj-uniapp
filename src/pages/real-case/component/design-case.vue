<template>
	<view class="decorate">
		<view class="waterfall-box h-flex-x h-flex-2">
			<view>
				<waterfall 
					v-for="(item,index) in leftList" 
					:key="index" 
					:params="item" 
					tag="left"
					:index="index"
					@height="onHeight"
					@click="onClick(index, 'left')"
				></waterfall>
			</view>
			<view>
				<waterfall 
					v-for="(item,index) in rightList" 
					:key="index" 
					:params="item" 
					@height="onHeight"
					@click="onClick(index, 'right')"
					tag="right"
					:index="index"
				></waterfall>
			</view>
			<!-- <image src='https://img.yzcdn.cn/vant/apple-1.jpg' mode=""></image> -->					<!-- <video id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"					                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video> -->
		</view>
	</view>
</template>

<script>
	import waterfall from "./waterfall-design-case.vue"
	export default {
		props:["leftList", "rightList", "leftHeight", "rightHeight"],
		components:{
			waterfall
		},
		data() {
			return {
				
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
			setTimeout(()=>{
				this.ajax.page = 1;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.ajax.load = true;
				this.getList();
			},800);
		},
		methods: {
			onHeight() {
				this.$parent.onHeight();
			},
			onClick (index, tag){
				this.$parent.onClick(index, tag);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.waterfall-box {
		padding: 24rpx 8rpx 24rpx 24rpx;
		box-sizing: border-box;
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			>view {
				width: 50%;
			}
		}
	}
	
	.load-txt{
		padding: 0 0 20rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
</style>