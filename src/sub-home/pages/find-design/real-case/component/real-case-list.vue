<template>
	<view class="real-case-list" v-if="listData.length > 0">
		<scroll-view class="real-case-list-scroll" :scroll-top="scrollTop" scroll-y="true" @scroll="scroll"
			@scrolltoupper='scrolltoupper' @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' :refresher-triggered="triggered" :lower-threshold='100'>
			<view class="list" v-for="(item, index) in listData" :key='item.id' @click="toCaseDetail(item)">
				<view class="head">
					<view class="title">
						<text>{{item.nikeName || '--'}} Ta家</text>
						<view class="collection-box" :class="{'collection-box-active': item.isCollection}"
							@click.stop="collectionHandler(item, index)">
							<image v-if="item.isCollection" class="collection-icon" src="/static/images/collection.png"
								mode=""></image>
							<image v-if="!item.isCollection" class="collection-icon"
								src="/static/images/no_collection.png" mode=""></image>
							<view class="text">
								收藏
							</view>
						</view>

					</view>
					<view class="info">
						<view class="pattern" v-if="item.roomNum||item.hallNum">
							<text v-if="item.roomNum">{{item.roomNum || '-'}}室</text>
							<text v-if="item.hallNum ">{{item.hallNum || '-'}}厅</text>
						</view>
						<view class="line" v-if="item.roomNum||item.hallNum">

						</view>
						<view class="area" v-if="item.insideArea != 0">
							{{item.insideArea >= 1 ? Math.floor(item.insideArea) : '-'}}m²
						</view>
						<view class="line" v-if="item.budget != 0">

						</view>
						<view class="preferential" v-if="item.budget != 0">
							预算: ¥{{item.budget >= 1 ? Math.floor(item.budget) : '-'}}万
						</view>
					</view>
					<view class="tag-box">
						<view class="tag" v-for="tag in itemHandler(item)" :key='tag.key'>
							<text v-if="tag">{{tag}}</text>
						</view>
					</view>
				</view>
				<view class="bottom">
					<ImgList :imgList='item.imageUrlList' />
					<view class="addressAndSimilarity" v-if="item.flag || item.cityName || item.similarity">
						<view class="near" v-if="item.flag || item.cityName">
							{{item.flag ? nearHandler(item) : item.cityName}}
						</view>
						<view class="point" v-if="item.similarity">

						</view>
						<view class="similarity" v-if="item.similarity">
							<text>{{item.similarity}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import ImgList from './img-list.vue';
	import {
		getCollection,
	} from "@/api/real-case.js";

	export default {
		props: {
			realCaseListData: {
				type: Array,
				default: []
			},
			currentHouse: {
				type: Object,
				default: {}
			}
		},
		components: {
			ImgList
		},
		data() {
			return {
				noEmit: false,
				scrollTop: 0,
				triggered: false,
				listData: this.$props.realCaseListData
			}
		},
		watch: {
			realCaseListData: {
				handler: function handler(val) {
					this.listData = val;
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			scroll(e) {
				// this.old.scrollTop = e.target.scrollTop;
				if (e.target && e.target.scrollTop < 100) {
					this.$emit('scrollUpper')
				} else {
					this.$emit('triggerScroll')
				}
			},
			scrolltoupper(e) {
				this.$emit('scrollUpper')
			},
			scrollToTop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			},
			getName(item) {
				let name = '';
				if (item.cityName) {
					return name = item.cityName.substring(0, item.cityName.indexOf('市'))
				} else if (item.name) {
					return name = item.name.substring(0, item.name.indexOf('市'))
				}
			},
			toCaseDetail(item) {
				this.$emit('toCaseDetail');
				uni.navigateTo({
					url: `/pages/real-case/real-case-webview/real-case-webview?id=${item.id}`,
				});
			},
			scrolltolower() {
				this.$emit('scrolltolower')
			},
			refresherrefresh() {
				this.$emit('refresherrefresh')
			},
			itemHandler(item) {
				// let arr = [item.styleName];
				// if (item.features && item.features.length) {
				// 	arr.push(item.features[0]);
				// }
				// if (item.customLabelList && item.customLabelList.length){
				// 		arr.unshift(item.customLabelList[0].labelName);
				// }
				// return arr;
				let arr = [];
				if (item.customLabelList && item.customLabelList.length) {
					arr = item.customLabelList.map(Item => {
						return Item.labelName
					})
				}
				if (item.styleName) {
					arr.push(item.styleName)
				}
				if (item.features && item.features.length) {
					arr = arr.concat(item.features)
				}
				// console.log("自定义标签arr",arr)
				return arr
			},
			nearHandler(item) {
				let itemReturn = '';
				if (item.distance < 1000) {
					if (item.distance <= 500) {
						itemReturn = `附近500m以内`
					} else {
						itemReturn = `附近${item.distance}m`
					}
				} else {
					itemReturn = `附近${(item.distance / 1000).toFixed(2)}km`
				}
				return itemReturn;
			},
			collectionHandler(item, index) {
				let list = this.listData;
				getCollection({
					routeId: 5001, // 固定内容
					subBizType: item.parentType, // 内容下的子项   视频 VR  图片
					relationId: item.id, // 作品ID
					authorId: item.zeusId, // 作者ID
				}).then((res) => {
					if (list[index].isCollection != false) {
						uni.showToast({
							title: "收藏已取消",
							icon: "none",
						});
					}
					list[index].isCollection = !list[index].isCollection;
					this.listData = JSON.parse(JSON.stringify(list));
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.real-case-list {
		// margin-top: 32rpx;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;

		.real-case-list-scroll {
			height: 100%;
		}

		.list {
			padding: 0 32rpx 24rpx;

			.head {
				background: #FFFFFF;
				border: 0.5px solid #E8E8E8;
				box-sizing: border-box;
				padding: 32rpx 24rpx;
				border-radius: 16rpx 16rpx 0 0;

				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: 500;
					font-size: 32rpx;
					line-height: 44rpx;
					color: #222222;

					text {
						max-width: 570rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.collection-box {
					background: #FFFFFF;
					border: 0.5px solid #CCCCCC;
					box-sizing: border-box;
					border-radius: 68rpx;
					padding: 10rpx 20rpx;
					display: flex;
					align-items: center;

					.collection-icon {
						width: 20rpx;
						height: 20rpx;
					}

					.text {
						margin-left: 8rpx;
						font-size: 20rpx;
						line-height: 28rpx;
						height: 28rpx;
						text-align: center;
						color: #333333;
					}
				}

				.collection-box-active {
					background: rgba(255, 192, 91, 0.08);
					border: 0.5px solid rgba(255, 192, 91, 0.15);

					.text {
						color: #FFC05B;
					}
				}

				.info {
					display: flex;
					align-items: center;
					margin: 4rpx 0 16rpx;

					.line {
						background: #D1D1D1;
						width: 2rpx;
						height: 20rpx;
						margin-right: 20rpx;
					}

					.pattern,
					.area {
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: center;
						color: #999999;
						margin-right: 20rpx;
					}

					.pattern {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.preferential {
						font-size: 24rpx;
						line-height: 34rpx;
						color: #999999;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.tag-box {
					display: flex;
					align-items: center;
					flex-flow: row wrap;
					overflow: hidden;
					max-height: 40rpx;

					.tag {
						margin-right: 16rpx;
						padding: 2rpx 16rpx 4rpx;
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: center;
						color: #999999;
						background: #F6F6F6;
						border-radius: 6rpx;
					}
				}
			}

			.bottom {
				position: relative;

				.addressAndSimilarity {
					position: absolute;
					top: 24rpx;
					left: 24rpx;
					background: rgba(0, 0, 0, 0.45);
					backdrop-filter: blur(5px);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					padding: 8rpx 12rpx;
					font-weight: 500;
					font-size: 20rpx;
					line-height: 28rpx;
					color: #FFFFFF;

					.point {
						width: 4rpx;
						height: 4rpx;
						background: #FFFFFF;
						margin: 0 12rpx;
					}

					.similarity {
						text {
							margin-left: 4rpx;
						}
					}
				}
			}


		}
	}
</style>
