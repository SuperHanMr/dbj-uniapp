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
				<real-case-screening v-show="showScreen" @updateTag='updateTag'/>
				<view class="hide-screen" v-if="!showScreen" @click="onShowScreen">
					<view class="title" v-if="selectTag.length <= 0">
						筛选
					</view>
					<view class="tag" v-else>
						<view class="name" v-for="name in selectTag" :key='name'>
							{{name}}
						</view>
						<view class="point" v-if="selectTag.length >= 2">
							
						</view>
					</view>
					<view class="icon-ic_cancel_white">
						
					</view>
				</view>
			</view>
			<view class="list">
				<real-case-list @triggerScroll='triggerScroll' @scrollUpper='scrollUpper' ref='realCaseList'/>
				<!-- <view class="no-service">
					<image src="/static/real-case-design/no-service.png" mode=""></image>
					<view class="title">
						暂无相关案例～
					</view>
				</view> -->
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
				selectTag: [],
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
				if (!this.showScreen) return;
				this.showScreen = false;
			},
			scrollUpper(){
				if (this.scshowScreen) return;
				this.showScreen = true;
			},
			onShowScreen(){
				this.showScreen = true;
				this.$refs.realCaseList.scrollToTop();
			},
			updateTag(obj){
				const arr = [];
				for(let i in obj) {
					arr.push(obj[i])
				}
				console.log(arr)
				this.selectTag = arr;
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
				position: relative;
				.title, .name{
					font-size: 28rpx;
					line-height: 40rpx;
					color: #333333;
				}
				.tag{
					display: flex;
					.name{
						margin-right: 38rpx;
					}
					.point{
						width: 4rpx;
						height: 4rpx;
						background: #333333;
						position: absolute;
						left: 102rpx;
						top: 38rpx;
					}
				}
				.hide-screen-icon{
					font-size: 32rpx;
				}
			}
			.list{
				flex: 1;
				overflow: scroll;
				.no-service{
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					image{
						width: 400rpx;
						height: 400rpx;
					}
					view{
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: center;
						color: #CBCCCC;
					}
				}
			}
		}
	}

</style>
