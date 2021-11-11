<template>
	<view class="">

		<view class="goods-view">
			<view>
				<view v-for="(item1,index) in list1" class="row-item " :key=" item1.id">
					<good-list-item :class="{'good-item-first' :index==0}" :item="item1"></good-list-item>
				</view>
				<view class="list-left">

				</view>
			</view>
			<view>
				<view v-for="(item2,index) in list2" class="row-item margin-left24" :key="item2.id">
					<good-list-item :item="item2"></good-list-item>
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
		getGoodsList,

	} from "../../../../api/classify.js";
	import GoodListItem from './good-list-item.vue'
	export default {
		components: {
			GoodListItem
		},
		props: {
			page: {
				type: Number,
				default: 1
			},
			areaId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				list1: [],
				list2: [],
				itemHeight: ''
			}
		},
		mounted() {},
		methods: {
			getHomeGoodsList() {
				getGoodsList({
					pageIndex: this.page,
					areaId: this.areaId,
					simplified: true,
					excludeFields: 'product.spu,product.process, product.store,product.supplier,product.areaIds,product.areaPrices,product.category'
				}).then((e) => {
					this.$emit('loadingFinish')
					if (this.page == 1) {
						this.list1 = [];
						this.list2 = []
					}
					this.resetList(e.page)
				});
			},
			resetList(list) {
				let list1 = [];
				let list2 = [];
				for (let i = 0; i < list.length; i++) {
					if (i % 2) {
						list2.push(list[i])
					} else {
						list1.push(list[i])
					}
				}
				if (!this.itemHeight) {
					let firstItem = uni.createSelectorQuery().in(this).select(".good-item-first");
					firstItem
						.boundingClientRect((firstItemRes) => {

							if (firstItemRes&&firstItemRes.height) {
								this.itemHeight = firstItemRes.height;
							}
						})
						.exec();;
				}

				let leftList = uni.createSelectorQuery().in(this).select(".list-left"); //想要获取高度的元素名（class/id）
				leftList
					.boundingClientRect((left) => {
						let rightList = uni.createSelectorQuery().in(this).select(".list-right");
						rightList
							.boundingClientRect((right) => {
								let diff = Math.abs(right.top - left.top)
								if (this.page != 1 && diff && this.itemHeight && diff > this.itemHeight) {
									if (left.top > right.top) {
										list2[list2.length] = list1[0];
										list1.shift()
									} else {
										list1[list1.length] = list2[0];
										list2.shift()
									}
								}
								if (this.page == 1) {
									this.list1 = []
									this.list2 = []
								}

								this.list1 = this.list1.concat(list1);
								this.list2 = this.list2.concat(list2);
								console.log(this.list1.length,this.list2.length,'SSSSSSSSSSSSS',this.page)
							})
							.exec();
					})
					.exec();
			}

		}
	}
</script>

<style lang="scss" scoped>
	.list-left,
	.list-right {
		flex: 1
	}

	.goods-view {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.margin-left24 {
		margin-left: 24rpx;
	}

	.row-item {
		display: flex;
		flex-direction: column;
	}
</style>
