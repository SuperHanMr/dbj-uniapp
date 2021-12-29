<template>
	<view>
		<view v-if="goodsList.length==0" class="noMemo">
			<image class="noMemoImg" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/pic_empty%402x.png">
			</image>
			<view class="noMemoText">暂无内容~</view>
		</view>
		<view class="goods-view">
			<view>
				<view v-for="(item1,index) in list1" class="row-item " :key=" item1.id">
					<design-list-item :class="{'good-item-first' :index==0}" :item="item1"></design-list-item>
				</view>
				<view class="list-left">

				</view>
			</view>
			<view>
				<view v-for="(item2,index) in list2" class="row-item " :key="item2.id">
					<design-list-item :item="item2"></design-list-item>
				</view>
				<view class="list-right">
				</view>
			</view>

		</view>
		<view style="height: 24rpx;width: 700rpx;">
		</view>
	</view>

</template>

<script>
	import {
		defaultSkus
	} from "../../../api/home.js"
	import DesignListItem from "./design-list-item.vue";
	export default {
		components: {
			DesignListItem,
		},
		props: {
			page: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				list1: [],
				list2: [],
				itemHeight: "",
				goodsList:[]
			};
		},
		mounted() {},
		methods: {
			getList(id) {
				defaultSkus({
					relationType: 5,
					relationId: id
				}).then(e => {
					this.goodsList=e
					this.resetList(e)
				})
			},
			resetList(list) {
				let list1 = [];
				let list2 = [];
				for (let i = 0; i < list.length; i++) {
					if (i % 2) {
						list2.push(list[i]);
					} else {
						list1.push(list[i]);
					}
				}
				if (!this.itemHeight) {
					let firstItem = uni
						.createSelectorQuery()
						.in(this)
						.select(".good-item-first");
					firstItem
						.boundingClientRect((firstItemRes) => {
							if (firstItemRes && firstItemRes.height) {
								this.itemHeight = firstItemRes.height;
							}
						})
						.exec();
				}

				let leftList = uni.createSelectorQuery().in(this).select(".list-left"); //想要获取高度的元素名（class/id）
				leftList
					.boundingClientRect((left) => {
						let rightList = uni
							.createSelectorQuery()
							.in(this)
							.select(".list-right");
						rightList
							.boundingClientRect((right) => {
								let diff = Math.abs(right.top - left.top);
								if (
									this.page != 1 &&
									diff &&
									this.itemHeight &&
									diff > this.itemHeight
								) {
									if (left.top > right.top) {
										list2[list2.length] = list1[0];
										list1.shift();
									} else {
										list1[list1.length] = list2[0];
										list2.shift();
									}
								}
								if (this.page == 1) {
									this.list1 = [];
									this.list2 = [];
								}

								this.list1 = this.list1.concat(list1);
								this.list2 = this.list2.concat(list2);
							})
							.exec();
					})
					.exec();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.goods-view {

		padding: 0 22rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.noMemo{
		width: 100%;
		height: fit-content;
		margin-top: 184rpx;
	}
	.noMemo .noMemoImg{
		width: 750rpx;
		height: 580rpx;
		display: block;
	}
	.noMemo .noMemoText{
		width: fit-content;
		height: 36rpx;
		margin-top: 24rpx;
		margin-left: 324rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.margin-left24 {
		margin-left: 24rpx;
	}

	.row-item {
		display: flex;
		flex-direction: column;
	}
</style>
