<template>
	<view class="search-page">

		<uni-popup ref="popup" type="message">
			<uni-popup-message type="warn" message="关键字不能为空" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view class="search">
			<uni-search-bar
				@confirm="searchConfirm"
				focus="true"
				cancelButton="none"
				@cancel="toBack"
				class="search-bar"
				placeholder="请搜索您想要的设计风格或设计师"
			>
				<uni-icons slot="searchIcon" />
			</uni-search-bar>
		</view>

		<view
			class="user-tags"
			v-if="hasTags"
		>
			<view v-if="hasCharacteristic">
				<view class="tags-title">
					<view class="icon-image icon-topic"></view>
					<text>按设计特色</text>
				</view>
				<view class="tags-wrapper characteristic">
					<view
						v-for="(item, index) in charaList"
						:key="index"
						@click="checkTopic(item)"
						class="tag-item tag-characteristic"
					>
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			<view v-if="hasStyle">
				<view class="tags-title">
					<view class="icon-image icon-style"></view>
					<text>按风格</text>
				</view>
				<view class="tags-wrapper styles">
					<view
						v-for="(item, index) in styleList"
						:key="index"
						@click="checkStyle(item)"
						class="tag-item tag-style"
					>
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { designTopicStyleList } from "@/api/home-find-design";
export default {
	data() {
		return {
			scrollTop: 0,
			charaList: [],
			styleList: [],
		};
	},
	computed: {
		hasTags() {
			return true;
		},
		hasCharacteristic() {
			return this.charaList.length > 0;
		},
		hasStyle() {
			return this.styleList.length > 0;
		},
		// charaList() {
		//   return ["按下状态", "特色", "养老宜居"];
		// },
		// styleList() {
		//   return ["按下状态", "其他", "精算", "日式", "复古", "哥特式"];
		// },
	},
	created() {
		this.designTopicStyleList();
	},
	methods: {
		designTopicStyleList() {
			designTopicStyleList().then((res) => {
				console.log(res);
				if (res instanceof Array) {
					res.forEach((item) => {
						if (item.code === 1) {
							// 特色专题
							this.charaList = item.items;
						}
						if (item.code === 2) {
							// 风格
							this.styleList = item.items;
						}
					});
				}
			});
		},
		search(params) {
			let url = "./designer-list?";
			for (let key in params) {
				url += `${key}=${params[key]}&`;
			}
			uni.navigateTo({
				url,
			});
		},
		searchConfirm(resText) {
			if (typeof resText.value !== 'string' || !resText.value.trim()) {
				// this.$refs.popup.open()
				return;
			}
			this.search({ searchValue: resText.value });
		},
		checkTopic(topic) {
			this.search({ topic });
		},
		checkStyle(style) {
			this.search({ style });
		},
		onPageScroll(scrollTop) {
			this.scrollTop = scrollTop.scrollTop;
		},
		toBack() {
			uni.navigateBack({});
		},
	},
};
</script>

<style>
</style>
<style scoped>
.search-page /deep/ .uni-searchbar__box {
	width: 598rpx !important;
	height: 62rpx !important;
	opacity: 1;
	border: 1rpx solid #999 !important;
	border-radius: 16rpx !important;
	background: #fff !important;
}
.uni-searchbar__cancel {
	line-height: 62rpx !important;
}
.search-page /deep/ input {
	caret-color: #fa4d32;
}
.search-page {
	min-height: 100%;
	padding-top: 144rpx;
	background: #fff;
}
.search {
	height: 104rpx;
}
.search {
	position: fixed;
	top: var(--window-top, 0);
	left: 0;
	right: 0;
	display: flex;
	padding: 0 16rpx;
	align-items: center;
	background: #fff;
	z-index: 1;
}

.search .search-bar {
	flex: 1;
}

.search /deep/ .uni-searchbar {
	background: #fff;
}
.search /deep/ .uni-searchbar .uni-searchbar__box {
	background: #fff;
}
.search-page
	.uni-popup-dialog
	/deep/
	.uni-dialog-button-group
	.uni-border-left
	.uni-dialog-button-text {
	color: rgba(255, 51, 71, 1);
	font-size: 30rpx;
	font-family: PingFangSC, PingFangSC-Medium;
	font-weight: 500;
	text-align: left;
}

.user-tags {
	padding: 0 32rpx;
}

.tags-title {
	font-weight: 500;
	font-size: 32rpx;
	line-height: 44rpx;
	color: #333333;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.tags-wrapper {
	padding: 32rpx 0;
}
.tags-wrapper.characteristic {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
}

.tag-item {
	display: inline-block;
	background: #f6f6f6;
	border-radius: 12rpx;
	color: #333;
	font-size: 28rpx;
	margin-bottom: 16rpx;
}

.tag-item:hover {
	background: #dedede;
}

.tag-characteristic {
	width: 328rpx;
	height: 88rpx;
	border-radius: 16rpx;
	line-height: 88rpx;
	text-align: center;
}
.tag-style {
	height: 64rpx;
	border-radius: 12rpx;

	font-size: 28rpx;
	line-height: 64rpx;
	padding: 0 24rpx;
	color: #333333;
	margin-right: 16rpx;
}

.icon-image {
	width: 32rpx;
	height: 32rpx;
	background-size: auto 100%;
	background-position: center;
	display: inline-block;
	margin-right: 12rpx;
}
.icon-topic {
	background-image: url("/static/images/ic_topic_group@2x.png");
}
.icon-style {
	background-image: url("/static/images/ic_style_group@2x.png");
}
</style>
