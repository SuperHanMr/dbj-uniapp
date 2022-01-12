<template>
	<view class="real-case">
		<view class="navigation-bar" :style="{paddingTop: Number(statusHeight) + 'px'}">
			<view class="box">
				<view class="navigation-bar-back icon-ic_cancel_white" @click="goBack">
				</view>
				<text>真实案例</text>
			</view>
		</view>
		<view class="container" :style="{marginTop: Number(statusHeight) + 44 + 'px'}">
			<view class="screening" >
				<real-case-screening v-if="showScreen"/>
				<view class="hide-screen" v-else>
					<view class="title">
						隐藏
					</view>
					<view class="icon-ic_cancel_white">
						
					</view>
				</view>
			</view>
			<view class="list">
				<real-case-list @triggerScroll='triggerScroll' @scrollUpper='scrollUpper'/>
			</view>
		</view>
		<view class="perfect-house-info">
			
		</view>
	</view>
</template>

<script>
	import RealCaseScreening from './component/real-case-screening.vue';
	import RealCaseList from './component/real-case-list.vue';
	export default {
		components:{
			RealCaseScreening,
			RealCaseList
		},
		data() {
			return {
				statusHeight: '',
				showScreen: true
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusHeight = res.statusBarHeight;
				},
			});
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			triggerScroll(){
				console.log('触发了滚动')
				this.showScreen = false;
			},
			scrollUpper(){
				this.showScreen = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.real-case{
		width: 100%;
		height: 100vh;
		background: #fcfcfc;
		overflow: hidden;
		.navigation-bar{
			position: fixed;
			top: 0;
			left: 0;
			height: 88rpx;
			width: 100%;
			line-height: 88rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			background-color: #ffffff;
			z-index: 10;
			
			.box {
				position: relative;
				text-align: center;
			
				.navigation-bar-back {
					position: absolute;
					left: 34rpx;
					top: 28rpx;
					font-size: 34rpx;
				}
			}
		}
		.container{
			height: calc(100vh - 88rpx);
			display: flex;
			flex-direction: column;
			.hide-screen{
				padding: 20rpx 32rpx;
				display: flex;
				justify-content: space-between;
				background: #FFFFFF;
				.title{
					font-size: 28rpx;
					line-height: 40rpx;
					color: #333333;
				}
				.hide-screen-icon{
					font-size: 32rpx;
				}
			}
			.list{
				flex: 1;
				overflow: scroll;
			}
		}
	}

</style>
