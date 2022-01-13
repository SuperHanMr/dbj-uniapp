<template>
	<view :class="['real-case', {'real-case-house': currentHouse.address}]">
		<navigation-bar :paddingTop='statusHeight' :showScreen='showScreen' :currentHouse='currentHouse' @openHomeList='openHomeList'/>
		<view class="container" :style="{marginTop: Number(statusHeight) + 44 + 'px'}">
			<view class="home-address" v-if="currentHouse.address && showScreen">
				<home-address :currentHouse='currentHouse' @openHomeList='openHomeList'/>
			</view>
			<!-- <view class="no-case">
				当前房屋所在地区暂无真实案例，为您推荐其他地区的精选案例
			</view> -->
			<view class="screening" v-if="!currentHouse.address">
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
				<view class="screening" :class="['screening', {'screening-noShowScreen': !showScreen}]">
					<!-- <view class="screening-tag" @click="checkoutScreen(item.key)" v-for="item in realListScreen" :key='item.key'>
						<view :class="['title', {'title-active': selectScreenTag == item.key}]">
							{{item.title}}
						</view>
						<view :class="['screening-icon', 'icon-zhuangxiushouye_fuwushouqijiantou', {'screening-icon-active icon-zhuangxiushouye_fuwuzhankaijiantou': selectScreenTag == item.key}]">
						</view>
					</view> -->
				</view>
				<view class="box">
					<real-case-list @triggerScroll='triggerScroll' @scrollUpper='scrollUpper' ref='realCaseList'/>
				</view>
				<!-- <view class="no-service">
					<image src="/static/real-case-design/no-service.png" mode=""></image>
					<view class="title">
						暂无相关案例～
					</view>
				</view> -->
			</view>
		</view>
		<view class="home-info-box" v-if="!currentHouse.address">
			<add-home-info @openHomeList='openHomeList'/>
		</view>
	</view>
</template>

<script>
	import RealCaseScreening from './component/real-case-screening.vue';
	import RealCaseList from './component/real-case-list.vue';
	import HomeAddress from './component/home-address.vue';
	import NavigationBar from './component/navigation-bar.vue';
	import AddHomeInfo from './component/add-home-info.vue'
	export default {
		components:{
			RealCaseScreening,
			RealCaseList,
			HomeAddress,
			NavigationBar,
			AddHomeInfo
		},
		data() {
			return {
				statusHeight: '',
				selectTag: [],
				showScreen: true,
				currentHouse: {},
				realListScreen: [
					{
						title: '户型相似度',
						key: '1'
					},
					{
						title: '距离',
						key: '2'
					}
				],
				selectScreenTag: 1
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusHeight = res.statusBarHeight;
				},
			});
			uni.$on('selectedHouse', (item) => {
				console.log(item, '>>>>>>>')
			});
		},
		onShow() {
			const currentHouse = getApp().globalData.currentHouse;
			this.currentHouse = currentHouse;
			// if (currentHouse.address) {
				
			// }
			
			console.log( getApp().globalData, '>>>>>>')
		},
		methods: {
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
			},
			checkoutScreen(key){
				this.selectScreenTag = key;
			},
			openHomeList(){
				console.log('打开下拉')
				uni.navigateTo({
					url:'/sub-my/pages/my-house/my-house?fromHome=true'
				})
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
		
		.container{
			height: calc(100vh - 88rpx);
			display: flex;
			flex-direction: column;
			
			.home-address{
				padding: 0 32rpx;
				margin-bottom: 40rpx;
			}
			.no-case{
				margin: 8rpx 0 24rpx;
				width: 100%;
				text-align: center;
				font-size: 22rpx;
				line-height: 30rpx;
				color: #999999;
			}
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
				position: relative;
				display: flex;
				flex-direction: column;
				.screening{
					display: flex;
					align-items: center;
					padding: 10rpx 32rpx 32rpx;
					background: #FFFFFF;
					border-radius: 32rpx 32rpx 0 0;
					.screening-tag{
						display: flex;
						align-items: center;
						margin-right: 48rpx;
						.title{
							margin-right: 8rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #CCCCCC;
						}
						.screening-icon{
							font-size: 20rpx;
							color: #CCCCCC;
						}
						.screening-icon-active{
							color: #333333;
						}
						.title-active{
							color: #333333;
						}
					}
				}
				.screening-noShowScreen{
					padding: 26rpx 32rpx 32rpx;
					border-radius: 0;
				}
				.box{
					flex: 1;
					overflow: scroll;
				}
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
	
	.real-case-house{
		background: #E5E5E5;
	}

</style>
