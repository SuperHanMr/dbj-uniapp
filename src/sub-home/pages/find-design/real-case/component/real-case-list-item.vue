<template>
	<view class="">
		<view class="head">
			<view class="title">
				<text>{{item.nikeName || '--'}} Ta家</text>
				<collection :item='item' :index='index'/>
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
</template>

<script>
	import ImgList from './img-list.vue';
	import Collection from './collection.vue';
	export default {
		components: {
			ImgList,
			Collection
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
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
			itemHandler(item) {
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
				return arr
			},
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
