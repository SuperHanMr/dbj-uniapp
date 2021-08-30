<template>
	<view class="waterfall">
		<view class="left">
			<block v-for="(item, index) in leftList" :key="index">
				<view class="waterfall-item" @click="toDetail(item)">
					<image :src="item.src" mode="widthFix" lazy-load @load="onImageLoad"></image>
					<view class="title">{{ item.title }}</view>
				</view>
			</block>
		</view>
		<view class="right">
			<block v-for="(item, index) in rightList" :key="index">
				<view class="waterfall-item" @click="toDetail(item)">
					<image :src="item.src" mode="widthFix" lazy-load @load="onImageLoad"></image>
					<view class="title">{{ item.title }}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'water-fall',
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		watch: {
			list(n, o) {
				let that = this;
				let ol = o.length;
				let nl = n.length;
				if (nl > ol) {
					if (this.leftHeight > this.rightHeight) {
						that.rightList.push(that.list[ol]);
					} else {
						that.leftList.push(that.list[ol]);
					}
					this.onImageLoad();
				}
			}
		},
		data() {
			return {
				leftList: [],
				rightList: [],
				itemIndex: 0,
				leftHeight: 0,
				rightHeight: 0
			};
		},
		created() {
			this.leftList = [this.list[0]]; //第一张图片入栈
		},
		destroyed() {
			console.log('destroy');
		},
		methods: {
			toDetail(item) {
				this.$emit('selectedItem',item)
			},
			onImageLoad(e) {
				if (!e) {
					console.log('无图片！！！！');
					return;
				}
				let imgH = (e.detail.height / e.detail.width) * 345 + 100 +
				20; //图片显示高度加上下面的文字的高度100rpx,加上margin-bottom20rpx
				let that = this;
				if (that.itemIndex === 0) {
					that.leftHeight += imgH; //第一张图片高度加到左边
					that.itemIndex++;
					that.rightList.push(that.list[that.itemIndex]); //第二张图片先入栈
				} else {
					that.itemIndex++;
					//再加高度
					if (that.leftHeight > that.rightHeight) {
						that.rightHeight += imgH;
					} else {
						that.leftHeight += imgH;
					}
					if (that.itemIndex < that.list.length) {
						//下一张图片入栈
						if (that.leftHeight > that.rightHeight) {
							that.rightList.push(that.list[that.itemIndex]);
						} else {
							that.leftList.push(that.list[that.itemIndex]);
						}
					}
				}
			}
		}
	};
</script>

<style lang="scss">
	.waterfall {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;

		.left,
		.right {
			.waterfall-item {
				width: 345rpx;
				margin-bottom: 20rpx;
				background-color: pink;
				box-sizing: border-box;

				image {
					width: 345rpx;
					display: block;
				}

				.title {
					width: 345rpx;
					height: 100rpx;
					overflow: hidden;
				}
			}
		}
	}
</style>
