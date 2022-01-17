<template>
	<view class="designer-wrapper">

		<view class="search">
			<view
				v-if="initSearch"
				class="uni-searchbar"
				@click="clickInitSearch"
			>
				<view class="uni-searchbar__box">
					<view
						class="search-card"
						v-if="searchVal"
					>
						<text>{{searchVal}}</text>
						<uni-icons
							color="#c0c4cc"
							size="15"
							type="clear"
						/>
					</view>
					<view
						v-else
						class="search-default"
					>搜索词语</view>
				</view>
			</view>
			<uni-search-bar
				v-else
				v-model="searchText"
				@confirm="searchConfirm"
				clearButton="auto"
				cancelButton="false"
				:focus="true"
				bgColor="transparent"
				placeholder="搜索词语"
				:radius="8"
			>
				<uni-icons slot="searchIcon" />
			</uni-search-bar>
			<view>
				<sort-button
					@sort-type-change="sortTypeChange"
					class="sort-button"
				></sort-button>
			</view>
		</view>

		<view
			class="designer-list"
			@scrolltolower="loadMoreList"
		>
			<view
				class="designer-item"
				v-for="designer in dataSource"
				:key="designer.id"
				@click="showDesigner(designer)"
			>
				<view class="designer-avatar">
					<image
						class="designer-avatar-img"
						:src="designer.avatar + '?x-oss-process=image/resize,m_mfit,w_88,h_88'"
					/>
				</view>
				<view class="designer-message">
					<view class="base-message">
						<view class="base-items">
							<view class="name-wrapper">
								<text class="designer-name">{{designer.name}}</text>
								<view class="designer-level"><text>{{designer.levelName}}设计师</text></view>
							</view>
							<view class="rate-wrapper">
								<text class="designer-score">接单数 {{designer.totalCount}}</text>
								<view class="split-line"></view>
								<view class="designer-ordernum">
									<text>好评率 {{designer.praiseEfficiency}}%</text>
								</view>
							</view>
						</view>
						<view class="designer-opera">
							<button
								class="btn-find-designer"
								@click.stop="handleChat(designer)"
							>就找Ta</button>
						</view>
					</view>

					<view class="designer-des">
						{{designer.intro}}
					</view>
					<view class="designer-tags">
						<view
							v-for="(style, index) in designer.styles.slice(0, 5)"
							:key="index"
							class="designer-tag"
						><text>{{style}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view
			v-if="isPageReady && dataSource.length === 0"
			class="no-designers"
		>
			<view class="img"></view>
			<view class="text">暂无相关内容～</view>
		</view>
	</view>
</template>
<script>
import SortButton from "./sort-btn.vue";
import { searchDesigner } from "@/api/home-find-design";

function throttle(fn, time) {
	let canUse = true;
	return function () {
		if (!canUse) {
			return false;
		}
		canUse = false;
		setTimeout(() => {
			fn.apply(this, arguments);
			canUse = true;
		}, time);
	};
}

export default {
	components: {
		SortButton,
	},
	data() {
		return {
			isPageReady: false,
			searchText: "",
			dataSource: [],
			initSearch: true,
			sortType: 0,
			isLoadMore: false,
			page: 1,
			totalPage: 0,
			searchVal: "",
			topic: "",
			style: "",
		};
	},
	created() {
		this.throttleGetlist = throttle(this.searchList, 300);
	},
	watch: {
		searchText(v, oldv) {
			if (v !== oldv) {
				this.topic = "";
				this.style = "";
				this.page = 1;
				this.isLoadMore = false;
				this.throttleGetlist();
			}
		},
	},
	onLoad(props) {
		if (props.searchValue) {
			this.searchVal = props.searchValue;
			this.searchText = props.searchValue;
		}
		if (props.topic) {
			this.topic = props.topic;
			// this.searchVal = props.topic;
		}
		if (props.style) {
			this.style = props.style;
			this.searchVal = props.style;
		}
	},
	onPullDownRefresh() {
		this.isLoadMore = false;
		this.page = 1;
		this.searchList();
	},
	onReachBottom() {
		this.loadMoreList();
	},
	mounted() {
		this.searchList();
	},
	methods: {
		showDesigner(designer) {
			let url =
				"/sub-decorate/pages/person-page/person-page?personId=" + designer.id;
			uni.navigateTo({
				url,
			});
		},
		sortTypeChange(e) {
			this.sortType = e;
			this.isLoadMore = false;
			this.page = 1;
			this.searchList();
		},
		searchList() {
			// TODO getlist
			let params = {
				sort: this.sortType,
				page: this.page,
				rows: 20,
			};

			// 关键字、特色、风格 只能传一个
			if (this.topic) {
				params.topic = this.topic;
			} else if (this.style) {
				params.style = this.style;
			} else {
				params.searchKey = this.searchText.trim();
			}

			searchDesigner(params).then((res) => {
				this.totalPage = res.totalPage;
				this.isPageReady = true;
				if (this.isLoadMore) {
					this.dataSource = this.dataSource.concat(res.list || []);
				} else {
					this.dataSource = res.list || [];
				}
			});
		},
		clickInitSearch() {
			this.initSearch = false;
		},

		loadMoreList() {
			if (this.page < this.totalPage) {
				this.page++;
			} else {
				return;
			}
			this.isLoadMore = true;
			this.searchList();
		},
		handleChat(designer) {
			this.$store.dispatch("openC2CConversation", {
				id: designer.id,
				name: designer.name,
			});
		},
	},
};
</script>
<style scoped>
.uni-searchbar__box-icon-search text {
	font-size: 28rpx;
	color: #333333;
}

.uni-searchbar__text-placeholder {
	font-size: 26rpx;
	color: #a9a9a9;
	margin-left: 10rpx;
}

.search {
	position: fixed;
	top: var(--window-top, 0);
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	padding: 0 16rpx;
	align-items: center;
	background: #fff;
	z-index: 1;
}
.search-default {
	font-size: 28rpx;
	color: #a9a9a9;
}
.search-card {
	display: flex;
	align-items: center;
	background-color: #f4f4f4;
	padding: 0 10rpx;
	font-size: 28rpx;
}

.search-card uni-icons {
	margin-left: 10rpx;
}

.search /deep/ .uni-searchbar {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: 500rpx;
	height: 62rpx;
	padding-left: 8px;
	opacity: 1;
	background: #f7f7f7;
	border-radius: 16rpx;
	opacity: 1;
	border: 1rpx solid #999;
	background-color: #ffffff;
	margin-right: 8px;
}

.search /deep/ .uni-searchbar .uni-searchbar__box-icon-search {
	display: none;
}

.search /deep/ .uni-searchbar .uni-searchbar__box {
	border: none;
	padding: 0;
}

.search /deep/ .uni-searchbar .uni-input-placeholder {
	font-size: 14px;
	color: #a9a9a9;
}

.uni-searchbar__box-icon-search text {
	font-size: 28rpx;
	color: #333333;
}

.uni-searchbar__text-placeholder {
	font-size: 26rpx;
	color: #a9a9a9;
	margin-left: 10rpx;
}
</style>
<style scoped lang="scss">
.designer-wrapper {
	background: #fff;
	position: relative;
	padding-top: 104rpx;
	min-height: calc(100% - 104rpx);
	.search {
		height: 104rpx;
	}
	.designer-list {
		padding-bottom: 20rpx;
		position: relative;
		width: 100%;
	}
}

.designer-item {
	padding: 32rpx 32rpx 0;
	display: flex;
	flex-direction: row;
	.designer-avatar {
		width: 88rpx;
		.designer-avatar-img {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			background: #ccc;
		}
	}

	.designer-message {
		flex: 1;
		margin-left: 24rpx;
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 32rpx;
	}
}

.base-message {
	display: flex;
	flex-direction: row;

	.base-items {
		flex: 1;
		overflow: hidden;

		.name-wrapper {
			height: 44rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.designer-name {
			font-size: 32rpx;
			font-weight: 500;
		}
		.designer-level {
			margin-left: 16rpx;
			display: inline-block;
			height: 30rpx;
			line-height: 30rpx;
			background: #f0fbff;
			border-radius: 4rpx;
			padding: 0 8rpx;

			font-weight: 500;
			font-size: 20rpx;
			color: #4fbeed;
		}
		.rate-wrapper {
			margin-top: 6rpx;
			height: 34rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.designer-score,
		.designer-ordernum {
			color: #333333;
			font-size: 24rpx;
		}
		.split-line {
			display: inline-block;
			width: 1rpx;
			background: #ccc;
			height: 22rpx;
			margin: 0 16rpx;
		}
		.designer-ordernum {
			display: inline-block;
		}
	}

	.designer-opera {
		width: 126rpx;
		.btn-find-designer {
			width: 126rpx;
			height: 56rpx;
			border-radius: 8rpx;
			background: linear-gradient(116.19deg, #f83112 16.48%, #fd6421 83.52%);
			text-align: center;
			color: #ffffff;
			font-size: 24rpx;
			font-weight: 500;
			text-align: center;
			padding-left: 0;
			padding-right: 0;
		}
	}
}

.designer-des {
	margin: 8rpx 0;
	max-height: 80rpx;
	font-size: 24rpx;
	line-height: 40rpx;
	letter-spacing: 0.2rpx;
	color: #999999;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.designer-tags {
	.designer-tag {
		display: inline-block;
		height: 34rpx;
		line-height: 34rpx;
		border: 1rpx solid #e8e8e8;
		box-sizing: border-box;
		border-radius: 6rpx;
		font-size: 20rpx;
		color: #999999;
		padding: 0 12rpx;
		margin-right: 16rpx;
	}
}

.no-designers {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.no-designers .img {
	display: inline-block;
	width: 400rpx;
	height: 400rpx;
	background-image: url("../../../static/images/img_no_designer.png");
	background-size: cover;
}

.no-designers .text {
	display: inline-block;
	width: 400rpx;
	height: 80rpx;
	opacity: 1;
	font-size: 24rpx;
	font-family: PingFangSC, PingFangSC-Regular;
	font-weight: 400;
	text-align: center;
	color: #ccc;
	line-height: 34rpx;
}
</style>
