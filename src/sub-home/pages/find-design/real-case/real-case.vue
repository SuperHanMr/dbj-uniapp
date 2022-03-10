<template>
	<view :class="['real-case', {'real-case-house': currentHouse.id}]">
		<Navigation-bar :paddingTop='statusHeight' :showScreen='showScreen' :currentHouse='currentHouse'
			@openHomeList='openHomeList' />
		<view class="container" :style="{marginTop: Number(statusHeight) + 44 + 'px'}">
			<!-- <view class="home-address" v-if="currentHouse.id && showScreen">
				<home-address :currentHouse='currentHouse' @openHomeList='openHomeList' />
			</view> -->
			<view class="no-case" v-if="currentHouse.id && !caseDetailInfo.caseFlag && showScreen">
				当前房屋所在地区暂无真实案例，为您推荐其他地区的精选案例
			</view>
			<view class="screening">
				<real-case-screening v-show="showScreen" :caseStyleList="caseStyleList" @updateTag='updateTag' ref='realCaseScreeningRef' />
				<view class="hide-screen" v-if="!showScreen" @click="onShowScreen">
					<view class="title" v-if="selectTag.length <= 0">
						筛选
					</view>
					<view class="tag" v-else>
						<view class="name" v-for="(item, index) in selectTag" :key='item.key'>
							<view class="text">
								{{item.name}}
							</view>
							<view class="point" v-if="selectTag.length - 1 > index">
							
							</view>
						</view>
					</view>
					<view class="tag-icon icon-list_arrow_dropdown">

					</view>
				</view>
			</view>
			<view class="list" @scroll='scrollHandler'>
				<!-- <view :class="['screening', {'screening-noShowScreen': !showScreen}]">
					<view class="screening-tag" @click="checkoutScreen(item.key)" v-for="item in realListScreen" :key='item.key'>
						<view :class="['title', {'title-active': selectScreenTag == item.key}]">
							{{item.title}}
						</view>
						<view :class="['screening-icon', 'icon-zhuangxiushouye_fuwushouqijiantou', {'screening-icon-active icon-zhuangxiushouye_fuwuzhankaijiantou': selectScreenTag == item.key}]">
						</view>
					</view>
				</view> -->
				<view class="box" @scroll='scrollHandler' v-if="realCaseListData && realCaseListData.length > 0">
					<real-case-list :currentHouse='currentHouse' :realCaseListData='realCaseListData'
						@triggerScroll='triggerScroll' @scrollUpper='scrollUpper' @scrolltolower='scrolltolower'
						@refresherrefresh='refresherrefresh' @toCaseDetail='toCaseDetail' ref='realCaseList' />
				</view>
				<view class="no-service" v-else>
					<image
						src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/no-service.png?x-oss-process=image/resize,m_lfit,w_400,h_400"
						mode=""></image>
					<view class="title">
						暂无相关案例～
					</view>
				</view>
			</view>
			<view class="bottom-view">
				
			</view>
		</view>
		<view class="home-info-box" v-if="!currentHouse.id">
			<add-home-info :bottom="systemBottom" @openHomeList='openHomeList' />
		</view>
	</view>
</template>

<script>
	import RealCaseScreening from './component/real-case-screening.vue';
	import RealCaseList from './component/real-case-list.vue';
	import HomeAddress from './component/home-address.vue';
	import NavigationBar from './component/navigation-bar.vue';
	import AddHomeInfo from './component/add-home-info.vue';
	import {
		moreCaseList,
		getCaseStyleList
	} from '/src/api/home-find-design.js'
	export default {
		components: {
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
				systemBottom:"",
				realListScreen: [{
						title: '户型相似度',
						key: '1'
					},
					{
						title: '距离',
						key: '2'
					}
				],
				selectScreenTag: 1,
				listParam: {
					page: 0,
					row: 10,
				},
				realCaseListData: [],
				caseDetailInfo: {},
				endPage: false,
				selectData: {},
				triggered: false,
				caseDetail: false,
				caseStyleList: []
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusHeight = res.statusBarHeight;
				},
			});
			uni.$on('defaultHouseChange',() => {
				this.caseDetail = false;
			})

			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + 32 + "rpx";
			this.getCaseStyleListHandler();

		},
		onShow() {
			if (this.caseDetail) {
				this.caseDetail = false;
				return;
			}
			const currentHouse = getApp().globalData.currentHouse;
			let isRefshList = null;
			if (this.currentHouse.id != currentHouse.id) {
				isRefshList = true;
				this.listParam.page = 0;
			}
			this.currentHouse = currentHouse;
			this.getListData(isRefshList);
			this.$nextTick(function() {
				this.$refs.realCaseList && this.$refs.realCaseList.scrollToTop && this.$refs.realCaseList
					.scrollToTop();
			})
		},
		methods: {
			getListData(isTagSearch) {
				// 如果是最后一页  直接返回
				if (this.endPage && !isTagSearch) return;
				let obj;
				if (this.$refs.realCaseScreeningRef) {
					obj = this.$refs.realCaseScreeningRef.selectData
					this.selectData = obj;
				} else {
					obj = this.selectData;
				}
				let param = {};
				// 居室查询条件
				if (obj[0] && obj[0].code != null) {
					param.roomNum = obj[0].code;
				}
				// 面积查询条件
				if (obj[1] && obj[1].code != null) {
					let areaObj = obj[1].code.split('-');
					param.minInsideArea = Number(areaObj[0]);
					param.maxInsideArea = Number(areaObj[1]);
				}
				// 风格查询条件
				if (obj[2] && obj[2].code != null) {
					param.styleCode = obj[2].code;
				}
				// 有无默认房屋
				if (this.currentHouse.id) {
					param.estateId = this.currentHouse.id;
				}
				// 获取列表
				moreCaseList({
					...param,
					...this.listParam
				}).then((res) => {
					const obj = res.moreCasePageVOPager
					if (isTagSearch) {
						this.realCaseListData = obj.list
					} else {
						this.realCaseListData = [...this.realCaseListData, ...obj.list];
					}
					this.caseDetailInfo = {
						estateFlag: res.estateFlag,
						caseFlag: res.caseFlag,
					};
					this.listParam = {
						page: obj.page,
						row: obj.rows,
					}
					if (this.listParam.page >= obj.totalPage && !isTagSearch) {
						this.endPage = true;
					}
					if (this.listParam.page < obj.totalPage && isTagSearch) {
						this.endPage = false;
					}
					if (this.$refs.realCaseList) {
						this.$refs.realCaseList.triggered = false;
					}
				})
			},
			// 滑动不显示筛选条件
			triggerScroll() {
				if (!this.showScreen) return;
				this.showScreen = false;
			},
			// 滑动到顶部显示筛选条件
			scrollUpper() {
				if (this.scshowScreen) return;
				this.showScreen = true;
			},
			// 显示筛选条件
			onShowScreen() {
				this.showScreen = true;
				this.$refs.realCaseList.scrollToTop();
			},
			// 房屋面积和居室筛选条件
			updateTag(obj) {
				const arr = [];
				for (let i in obj) {
					if (obj[i].code != null) {
						arr.push(obj[i])
					}
				}
				this.selectTag = arr;
				this.listParam.page = 0;
				this.getListData(true);
			},
			checkoutScreen(key) {
				this.selectScreenTag = key;
			},
			// 跳转房屋列表
			openHomeList() {
				uni.navigateTo({
					url: '/sub-my/pages/my-house/my-house?fromHome=true'
				})
			},
			// 上拉获取更多
			scrolltolower() {
				this.listParam.page += 1;
				this.getListData();
			},
			refresherrefresh() {
				this.endPage = false;
				this.listParam.page = 0;
				this.$refs.realCaseList.triggered = true;
				this.getListData(true);
			},
			onPullDownRefresh() {
				this.endPage = false;
				this.listParam.page = 0;
				this.getListData(true);
				uni.stopPullDownRefresh()
			},
			toCaseDetail(){
				this.caseDetail = true;
			},
			scrollHandler(e){
				console.log(e, '>>>>')
			},
			getCaseStyleListHandler(){
				getCaseStyleList().then((res) => {
					this.caseStyleList = res;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.real-case {
		width: 100%;
		height: 100vh;
		background: #fcfcfc;
		overflow: hidden;

		.container {
			height: calc(100vh - 88rpx);
			display: flex;
			flex-direction: column;

			.home-address {
				padding: 0 32rpx;
				margin-bottom: 40rpx;
			}
			
			.bottom-view{
				height: 120rpx;
				width: 100%;
				background-color: rgb(255,255,255);
			}

			.no-case {
				padding: 16rpx 0;
				width: 100%;
				text-align: center;
				font-size: 22rpx;
				color: #A28645;
				background: #FFF5DE;
			}

			.hide-screen {
				padding: 20rpx 32rpx;
				display: flex;
				justify-content: space-between;
				background: #FFFFFF;
				position: relative;

				.title,
				.name {
					font-size: 28rpx;
					line-height: 40rpx;
					color: #333333;
				}

				.tag-icon {
					font-size: 32rpx;
					color: #222222;
				}

				.tag {
					display: flex;

					.name {
						margin-right: 16rpx;
						display: flex;
						align-items: center;
					}

					.point {
						width: 4rpx;
						height: 4rpx;
						background: #333333;
						margin-left: 16rpx;
					}
				}

				.hide-screen-icon {
					font-size: 32rpx;
				}
			}

			.list {
				flex: 1;
				overflow: scroll;
				position: relative;
				display: flex;
				flex-direction: column;
				background-color: #ffffff;

				.screening {
					display: flex;
					align-items: center;
					padding: 10rpx 32rpx 32rpx;
					background: #FFFFFF;
					border-radius: 32rpx 32rpx 0 0;

					.screening-tag {
						display: flex;
						align-items: center;
						margin-right: 48rpx;

						.title {
							margin-right: 8rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #CCCCCC;
						}

						.screening-icon {
							font-size: 20rpx;
							color: #CCCCCC;
						}

						.screening-icon-active {
							color: #333333;
						}

						.title-active {
							color: #333333;
						}
					}
				}

				.screening-noShowScreen {
					padding: 10rpx 32rpx 32rpx;
					// padding: 26rpx 32rpx 32rpx;
					border-radius: 0;
				}

				.box {
					flex: 1;
					overflow: scroll;
				}

				.no-service {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 400rpx;
						height: 400rpx;
					}

					view {
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: center;
						color: #CBCCCC;
					}
				}
			}
		}


	}

	.real-case-house {
		background: #E5E5E5;
	}
</style>
