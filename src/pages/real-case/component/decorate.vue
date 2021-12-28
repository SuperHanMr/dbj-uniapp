<template>
	<view class="decorate">
		<view class="waterfall-box h-flex-x h-flex-2" v-if="!leftList.length == 0 && !rightList.length == 0">
			<view>
				<waterfall 
					v-for="(item,index) in leftList" 
					:key="index" 
					:params="item" 
					tag="left"
					:index="index"
					@click="onClick(index, '0')"
				></waterfall>
			</view>
			<view>
				<waterfall 
					v-for="(item,index) in rightList" 
					:key="index" 
					:params="item" 
					@click="onClick(index, '1')"
					tag="right"
					:index="index"
				></waterfall>
			</view>
		</view>
		<view class="no-info" v-if="leftList.length == 0 && rightList.length == 0">
			<image src="/static/images/real-case/pic_empty.png" mode=""></image>
			<view class="text">
				敬请期待，装修案例即将呈现
			</view>
		</view>
	</view>
</template>

<script>
	import waterfall from "./waterfall-decorate.vue"
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
			onHeight(height, tag) {
				this.$emit("height", height, tag);
				// this.$parent.onHeight(height, tag);
			},
			onClick (index, tag){
				this.$emit("click", index, tag);
				// this.$parent.onClick(index, tag);
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}
</style>

<style lang="scss" scoped>
	.waterfall-box {
		padding: 20rpx 0rpx 20rpx 14rpx;
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
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
	
	.no-info{
		width: 100%;
		image{
			width: 100%;
			height: 640rpx;
		}
		.text{
			margin-top: 24rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #999999;
		}
	}
</style>