<template>
	<view class="img-list">
		<view class="list-box1" v-if="list1.length > 0 && list2.length == 0">
			<image :src="imgList[0] + '?x-oss-process=image/resize,m_lfit,w_750,h_364'" mode=""></image>
		</view>
		<view class="list-box2" v-if="list2.length > 0">
			<view class="top">
				<view class="left">
					<image :src="imgList[0] + '?x-oss-process=image/resize,m_lfit,w_456,h_364'" mode="" :style="{borderRadius: list3.length > 0 ? 'none' : '0 0 0 32rpx'}"></image>
				</view>
				<view class="right">
					<image :src="item + '?x-oss-process=image/resize,m_lfit,w_226,h_180'" mode="" v-for="(item, index) in list2" :key='item' :style="{borderRadius: (list3.length > 0 || (index != list2.length - 1)) ? 'none' : '0 0 32rpx 0'}"></image>
				</view>
			</view>
			<view class="bottom" v-if="list3.length > 0">
				<image :src="item + '?x-oss-process=image/resize,m_lfit,w_226,h_180'" mode="" v-for="item in list3" :key='item'></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default: []
			}
		},
		mounted() {
			console.log(this.$props.imgList, '>>>>>>>>')
			const list = this.$props.imgList;
			debugger
			if (list.length > 0) {
				this.list1.push(list[0]);
				if (list.length >= 3) {
					this.list2.push(...[list[0], list[1], list[2]]);
				}
				if (list.length >= 6) {
					this.list3.push(...[list[3], list[4], list[5]]);
				}
			} 
		},
		data() {
			return {
				list1: [],
				list2: [],
				list3: [],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img-list {
		width: 100%;

		.list-box1 {
			width: 100%;
			height: 364rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 0px 0px 16rpx 16rpx;
			}
		}

		.list-box2 {
			width: 100%;
			height: 100%;

			.top {
				height: 364rpx;
				width: 100%;
				display: flex;

				.left {
					width: 456rpx;
					height: 100%;
					margin-right: 4rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					width: 226rpx;
					height: 100%;

					image {
						height: 180rpx;
						margin-bottom: 4rpx;
						width: 100%;
					}

					image:last-child {
						margin-bottom: 0;
					}
				}
			}

			.bottom {
				height: 180rpx;
				width: 100%;
				display: flex;

				image {
					height: 100%;
					width: 226rpx;
					margin-right: 4rpx;
				}

				image:first-child {
					border-radius: 0 0 0 16px;
				}

				image:last-child {
					border-radius: 0 0 16px 0;
					margin-right: 0;
				}
			}
		}
	}
</style>
