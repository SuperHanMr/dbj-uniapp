<template>
	<view class="sort">
		<view
			class="sort-content"
			@click="changeSortState"
		>
			<text class="text">{{sort.value}}</text>
			<view class="sort-btn">
				<view class="sort-img up-price"></view>
			</view>
		</view>
		<uni-popup ref="popup">
			<view class="sort-type">
				<view
					@click="changSortType(items)"
					class="sort-items"
					v-for="items in sortType"
					:key="items.key"
				><text>{{items.value}}</text><view v-if="items.key === sort.key" class="selected-icon"></view></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sort: { key: 0, value: "默认排序" },
			sortType: [
				{ key: 0, value: "默认排序" },
				{ key: 1, value: "服务人数" },
				{ key: 2, value: "好评率" },
			],
		};
	},
	methods: {
		changeSortState() {
			this.$refs.popup.open("top");
		},
		changSortType(type) {
			this.sort = type;
			this.$refs.popup.close();
			this.$emit("sort-type-change", type.key);
		},
	},
};
</script>

<style scoped>
.sort {
	width: 168rpx;
	height: 62rpx;
	overflow: hidden;
	background: #f9f9f9;
	border-radius: 16rpx;
}
.sort-content {
	display: flex;
	height: 62rpx;
	line-height: 62rpx;
	padding: 0 16rpx;
}
.text {
	font-size: 28rpx;
	flex: 1;
	color: #333333;
	text-align: center;
}
.sort-btn {
	width: 20rpx;
	text-align: center;
	position: relative;
}
.up-price {
	width: 20rpx;
	height: 10rpx;
	background-size: cover;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto;
	background-image: url("../../../static/images/price_up.png");
}

.sort-type {
}
.sort-items {
	height: 120rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	color: #222222;
	font-weight: 500;
	font-size: 30rpx;
	background: #fff;
	padding: 0 32rpx;
}
.sort-items:not(:last-child) {
	border-bottom: 1px solid #f4f4f4;
}
.sort-items:last-child {
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
}
.selected-icon{
	display: inline-block;
	height: 21rpx;
	width: 28rpx;
	background-image: url("/static/images/ic_curr_selected@2x.png");
	background-size: 100%;
}

</style>
