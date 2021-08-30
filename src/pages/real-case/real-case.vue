<template>
	<view class="real-case">
		<view class="collectWrapper">
			<view class="tabbar">
				<view class="tabbar-switch-box">
					<view :class="selectStatus == index ? 'selectStatus' : 'tabbar-switch'"
						v-for="(item, index) in items" @tap="changeTabs(index)">
						{{item}}
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<swiper class="swiper" :duration="duration" @change="swiperChange" :current="currentVal">
					<swiper-item class="swiper-item">
						<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="bindscrolltolower">
							<DesignCase v-if="selectStatus === 0" :leftList="leftList" :rightList="rightList"
								:leftHeight="leftHeight" :rightHeight="rightHeight" />
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="bindscrolltolower">
							<Decorate v-if="selectStatus === 1" :leftList="leftList" :rightList="rightList"
								:leftHeight="leftHeight" :rightHeight="rightHeight" />
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="load-txt">{{pagState.loadTxt}}</view>
	</view>
</template>

<script>
	import DesignCase from "./component/design-case.vue";
	import Decorate from "./component/decorate.vue";
	import {
		getCaseList
	} from "../../api/real-case.js";
	import {
		debounce
	} from "utils/public-fun.js"
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
		onReady() {
			let obj = {
				a: 10,
				b: {
					c: "aaaaa"
				}
			}
			let obj1 = {
				...obj
			}
			obj1.a = 20;
			obj1.b.c = 100;
			console.log(obj, obj1, "aaaaaaaaaaaa");
			this.getList();
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
				console.log("aaaaaaaaaaaaaaaaaa>>>>>>>>>>>>>");
				if (this.pagState.page <= this.pagState.totalPage) {
					debounce(this.getList(), 1000);
				}
			},
			// swiper切换此函数被监听
			swiperChange(e) {
				this.selectStatus = e.detail.current;
				this.pagState.rows = 10;
				this.pagState.page = 10;
				this.pagState.totalPage = "";
				this.pagState.totalRows = "";
				this.leftHeight = 0;
				this.rightHeight = 0;
			},

			// 监听高度变化
			onHeight(height, tag) {
				if (tag == "left") {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			onJump(list, index) {
				console.log(list[index].parentType, 'asdasdas');
				if (list[index].parentType === 1) {
					const listUrl = list[index].videoUrl
					uni.navigateTo({
						url: `./component/panorama/panorama?url=${listUrl}`
					})
				}

			},
			// 组件点击事件
			onClick(index, tag) {
				console.log(index, tag);
				// 对应的数据
				if (tag == "left") {
					console.log(this.leftList);
					this.onJump(this.leftList, index);

				} else {
					console.log(this.rightList);
					this.onJump(this.rightList, index);
				}
				// let direction = {
				// 	left: "左",
				// 	right: "右",
				// };
				// uni.showToast({
				// 	title: `${direction[tag]}侧列表第${index + 1}个被点击`,
				// 	icon: "none",
				// });
			},
			// 获取数据
			getList() {
				/*
					无真实数据，当前由 setTimeout 模拟异步请求、
					自行替换 请求方法将数据 传入 addList() 方法中
					自行解决数据格式，自行修改组件内布局和内容绑定
				*/
				getCaseList({
					page: this.pagState.page,
					rows: this.pagState.rows,
				}).then((res) => {
					if (res && res.list) {
						this.addList(res.list);
						this.pagState.page = res.page + 1;
						this.pagState.totalPage = res.totalPage;
						this.pagState.totalRows = res.totalRows;
					}
					console.log(res, this.pagState.page, 'asd>>>>>>>>>>>>>>>>');
				})
				// if (!this.ajax.load) {
				// 	return;
				// }
				// this.ajax.load = false;
				// this.ajax.loadTxt = "加载中";

				// setTimeout(() => {
				// 	// 生成随机数方法
				// 	let random = (min = 0, max) => {
				// 		return Math.floor(Math.random() * max) + min;
				// 	};
				// 	// 待选的图片数据
				// 	let imgs = [];
				// 	// 待选的标题数据
				// 	let titles = [
				// 		"桃花坞里桃花庵，桃花庵里桃花仙；",
				// 		"桃花仙人种桃树，又摘桃花卖酒钱。",
				// 		"酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。",
				// 		"但愿老死花酒间，不愿鞠躬车马前；",
				// 		"车尘马足富者趣，酒盏花枝贫者缘。若将富贵比贫贱，",
				// 		"一在平地一在天；若将贫贱比车马，他得驱驰我得闲。",
				// 		"别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。",
				// 	];

				// 	let res = [];
				// 	for (let i = 0; i < 10; i++) {
				// 		res.push({
				// 			url: `/uni_modules/helang-waterfall/static/waterfall/${random(
				//           0,
				//           3
				//         )}.jpg`,
				// 			title: titles[random(0, titles.length)],
				// 			money: random(9, 9999),
				// 			label: "官方自营",
				// 			shop: "唐诗三百首旗舰店",
				// 		});
				// 	}
				// 	this.addList(res);
				// }, 1000);
			},
			addList(res) {
				// 获取到的数据，请注意数据结构
				console.log(res);

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
		margin: 4rpx 0 4rpx 4rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: bold;
		text-align: center;
		color: #333333;
		background: #ffffff;
		border-radius: 6px;
	}

	.collectWrapper {
		// 确保swiper 内容填满设备，若需自适应只需取消掉100%即可
		width: 100%;
		height: 100%;
	}

	.collectWrapper .tabbar {
		width: 100%;
		height: 96rpx;
		position: fixed;
		z-index: 100;
		background-color: #ffffff;
	}

	.tabbar-switch-box {
		display: flex;
		background: #f5f6f6;
		border-radius: 8px;
		margin: 20rpx 32rpx 8rpx 32rpx;
	}

	.tabbar-switch-box .tabbar-switch {
		padding: 10rpx 112rpx;
		margin: 4rpx 4rpx 4rpx 0;
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
	}

	.collectWrapper .uni-padding-wrap .swiper .swiper-item {
		height: 100%;
	}
</style>
