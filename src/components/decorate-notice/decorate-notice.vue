<template>
	<view class="notice" >
		<view class="notice-mask" @click="close()"></view>
		<view class="item-list">
			<view class="notice-item" @click="to(321)">asfasf</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"decorate-notice",
		data() {
			return {
				
			};
		},
		methods:{
			close(){
				console.log(123)
				this.$emit('closeNotice')
			},
			to(param){
				uni.navigateTo({
					url:'/pages/decorate/grab/grab'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.notice{
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	.item-list{
		position: relative;		
		margin: 40rpx;
		z-index: 11;
	}
	.notice-item{
		background-color: #fff;
		padding: 20rpx;
		
		opacity: 1;
		// z-index: 11;
	}
	.notice-mask{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.5;
		z-index: 10;
	}
}
</style>
