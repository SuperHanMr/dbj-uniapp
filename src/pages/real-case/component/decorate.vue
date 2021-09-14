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
					@click="onClick(index, '1')"
				></waterfall>
			</view>
			<view>
				<waterfall 
					v-for="(item,index) in rightList" 
					:key="index" 
					:params="item" 
					@height="onHeight"
					@click="onClick(index, '1')"
					tag="right"
					:index="index"
				></waterfall>
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
				this.$parent.onHeight(height, tag);
			},
			onClick (index, tag){
				this.$parent.onClick(index, tag);
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
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		>view {
			padding: 0 10rpx;
		}
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