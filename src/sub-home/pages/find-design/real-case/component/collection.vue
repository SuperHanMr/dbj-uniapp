<template>
	<view class="collection-box" :class="{'collection-box-active': isCollection}"
		@click.stop="collectionHandler(item, index)">
		<image v-if="isCollection" class="collection-icon" src="/static/images/collection.png" mode="">
		</image>
		<image v-if="!isCollection" class="collection-icon" src="/static/images/no_collection.png"
			mode=""></image>
		<view class="text">
			{{isCollection ? "已收藏" : "收藏"}}
		</view>
	</view>
</template>

<script>
	import {
		getCollection,
	} from "@/api/real-case.js";
	export default {
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
		data(){
			return {
				isCollection: this.$props.item.isCollection
			}
		},
		mounted() {
			uni.$on('updateCollection', (val) => {
				if (this.$props.index === val.index) {
					this.isCollection = val.item.isCollect;
				}
			})
		},
		methods: {
			collectionHandler(item, index) {
				getCollection({
					routeId: 5001, // 固定内容
					subBizType: item.parentType, // 内容下的子项   视频 VR  图片
					relationId: item.id, // 作品ID
					authorId: item.zeusId, // 作者ID
				}).then((res) => {
					if (this.isCollection != false) {
						uni.showToast({
							title: "收藏已取消",
							icon: "none",
						});
					}
					this.isCollection = !this.isCollection;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
