<template>
	<view class="real-case">
		<!-- <view class="" @click="toRuzhu()">
			商家入驻
		</view> -->
		<view class="collectWrapper">
			<view class="tabbar">
				<view class="tabbar-switch-box">
					<view :class="selectStatus == index ? 'selectStatus' : 'tabbar-switch'"
						v-for="(item, index) in items" :key="index" @tap="changeTabs(index)">
						{{item}}
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<swiper class="swiper" :duration="duration" @change="swiperChange" :current="currentVal">
					<swiper-item class="swiper-item">
						<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="bindscrolltolower">
							<DesignCase v-if="selectStatus === 0" :leftList="leftList" :rightList="rightList"
								:leftHeight="leftHeight" :rightHeight="rightHeight" @height="onHeight" @click="onClick" @collection="onCollection" />
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="bindscrolltolower">
							<Decorate v-if="selectStatus === 1" :leftList="leftList" :rightList="rightList"
								:leftHeight="leftHeight" :rightHeight="rightHeight" @height="onHeight" @click="onClick" />
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- <view class="load-txt">{{pagState.loadTxt}}</view> -->
	</view>
</template>

<script>
	import DesignCase from "./component/design-case.vue";
	import Decorate from "./component/decorate.vue";
	import {
		getCaseList,
		getDecorateist,
		getCollection
	} from "../../api/real-case.js";
	import {
		debounce
	} from "utils/fun-public.js"
	export default {
		components: {
			DesignCase,
			Decorate,
		},
		data() {
			return {
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				pagState: {
					// 是否可以加载
					load: true,
					// 加载中提示文字
					loadTxt: "",
					// 每页的请求条件
					rows: 10,
					// 页码
					page: 1,
					totalPage: '',
					totalRows: '',
					end: "",
				},

				items: ["设计案例", "装修现场"],
				active: 0,
				background: ["color1", "color2", "color3"],
				duration: 500,
				// 控制swiper的显示
				currentVal: 0,
				// 顶部tabs显示状态
				selectStatus: 0,
			};
		},
		onLoad() {
			uni.$on('isCollect',(data)=>{
				let list = [];
				if (this.tag == '0') {
					list = this.leftList;
				} else {
					list = this.rightList;
				}
			  if(data.isCollect){
			    list[this.activeIndex].collectionCount += 1
			  }else{
			    list[this.activeIndex].collectionCount -=1
			  }
				list[this.activeIndex].commentCount = data.commentCount;
				list[this.activeIndex].likeCount = data.likeCount;
			  list[this.activeIndex].isCollection = !list[this.activeIndex].isCollection;
			})
			uni.showShareMenu();
		},
		onReady() {
			this.getList();
		},
		onUnload() {
			uni.$off('isCollect');
		},
		// // 触底触发
		// onReachBottom() {
		// 	if (this.pagState.page <= this.pagState.totalPage) {
		// 		this.getList();
		// 	}
		// },
		methods: {
			switchTabs(val) {
				this.active = val;
			},
			changeTabs(i) {
				this.currentVal = i;
				this.selectStatus = i;
			},
			bindscrolltolower() {
				if (this.pagState.page <= this.pagState.totalPage) {
					debounce(this.getList(), 1000);
				}
			},
			// swiper切换此函数被监听
			swiperChange(e) {
				console.log(e,123123,)
				this.selectStatus = e.detail.current;
				this.currentVal = e.detail.current;
				this.pagState.rows = 10;
				this.pagState.page = 1;
				this.pagState.totalPage = "";
				this.pagState.totalRows = "";
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.getList();
			},

			// 监听高度变化
			onHeight(height, tag) {
				if (tag == "left") {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			onJump(list, index, isDecorate) {
				console.log(list, index, isDecorate, ">>>>>>>>>>>")
				// parentType 1 全景图 0  短视频  2 图文
				if (isDecorate == 0) {
					this.activeIndex = index;
					const listUrl = list[index].videoUrl
					uni.navigateTo({
						url: `/pages/real-case/real-case-webview/real-case-webview?id=${list[index].id}`
					})
				} else{
					uni.navigateTo({
						url: `/sub-home/pages/decorate-scene/decorate-scene?projectId=${list[index].id}`
					})
				}
			},
			// 组件点击事件
			onClick(index, tag) {
				this.tag = tag;
				// 对应的数据
				if (tag == "0") {
					this.onJump(this.leftList, index, this.selectStatus);

				} else {
					this.onJump(this.rightList, index, this.selectStatus);
				}
			},
			// 收藏事件
			onCollection(index, tag) {
				const token = uni.getStorageSync("scn")
				if (!token) {
					uni.navigateTo({ url: "/pages/login/login" })
					return;
				}
				let list = [];
				if (tag == 0) {
					list = this.leftList;
				} else {
					list = this.rightList;
				}
				const item = list[index];
				console.log(item, '>>>>>>>>>>>>>>>')
				getCollection({
					routeId: 5001, // 固定内容
					subBizType: item.parentType, // 内容下的子项   视频 VR  图片
					relationId: item.id, // 作品ID
					authorId: item.zeusId, // 作者ID
				}).then((res) => {
					if (list[index].isCollection == false) {
						uni.showToast({
							title:'收藏成功',
							icon: "none"
						})
						list[index].collectionCount += 1;
					} else {
						uni.showToast({
							title:'收藏已取消',
							icon: "none"
						})
						list[index].collectionCount -= 1;
					}
					list[index].isCollection = !list[index].isCollection;
				});
			},
			// 获取数据
			getList() {
				const params = {
					page: this.pagState.page,
					row: this.pagState.rows,
				}
				if (this.currentVal == 0) {
					getCaseList(params).then((res) => {
						if (res && res.list) {
							this.addList(res.list);
							this.pagState.page = res.page + 1;
							this.pagState.totalPage = res.totalPage;
							this.pagState.totalRows = res.totalRows;
						}
					})
				} else {
					const decorateistParams = {
						pageIndex: this.pagState.page,
						pageSize: this.pagState.rows,
					}
					getDecorateist(decorateistParams).then((res) => {
						if (res && res.list) {
							this.addList(res.list);
							this.pagState.page = res.page + 1;
							this.pagState.totalPage = res.totalPage;
							this.pagState.totalRows = res.totalRows;
						}
					})
				}


			},
			addList(res) {
				// 获取到的数据，请注意数据结构
				if (!res || res.length < 1) {
					this.pagState.loadTxt = "没有更多了";
					return;
				}

				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;

				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;

				let [left, right] = [
					[],
					[]
				];
				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 800 && index < 3) {
						differVal = 1;
						return "right";
					}

					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -800 && index < 3) {
						differVal = -1;
						return "left";
					}

					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return "right";
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return "left";
					}

					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return "left";
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return "right";
					}
				};

				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.forEach((item, index) => {
					if (getDirection(index) == "left") {
						//console.log(`差值：${differ},方向：left，序号${index}`)
						left.push(item);
					} else {
						//console.log(`差值：${differ},方向：right，序号${index}`)
						right.push(item);
					}
					i++;
				});

				// 将左右列表的数据插入，第一页时则覆盖
				if (this.pagState.page == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}

				this.pagState.load = true;
				this.pagState.loadTxt = "上拉加载更多";
				this.pagState.page++;
			},
			toRuzhu(){
				uni.navigateTo({
					url:'../../sub-other/pages/merchant-entry/merchant-entry'
				})
			}
		},
	};
</script>

<style scoped>
	.real-case {
		width: 100%;
		background-color: #ffffff;
		height: 100%;
	}



	.selectStatus {
		padding: 10rpx 112rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: bold;
		text-align: center;
		color: #333333;
		background: #ffffff;
		border-radius: 6px;
	}

	.collectWrapper {
		/* 确保swiper 内容填满设备，若需自适应只需取消掉100%即可 */
		width: 100%;
		height: 100%;
	}

	.collectWrapper .tabbar {
		position: fixed;
		z-index: 100;
		background-color: #ffffff;
	}

	.tabbar-switch-box {
		display: flex;
		background: #f5f6f6;
		border-radius: 8px;
		margin: 20rpx 32rpx 8rpx 32rpx;
		padding: 4rpx;
	}

	.tabbar-switch-box .tabbar-switch {
		padding: 10rpx 112rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #999999;
	}

	.collectWrapper .uni-padding-wrap {
		height: 100%;
		padding-top: 96rpx;
	}

	.collectWrapper .uni-padding-wrap .page-section-spacing {
		height: 100%;
	}

	.collectWrapper .uni-padding-wrap .swiper {
		height: 100%;
		background: #fff;
	}

	.collectWrapper .uni-padding-wrap .swiper .swiper-item {
		height: 100%;
	}
</style>
