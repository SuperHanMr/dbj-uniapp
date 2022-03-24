<template>
	<view class="real-case-list" v-if="realCaseListData.length > 0">
		<scroll-view class="real-case-list-scroll" :scroll-top="scrollTop" scroll-y="true" @scroll="scroll"
			@scrolltoupper='scrolltoupper' @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' :refresher-triggered="triggered" :lower-threshold='100'>
			<view class="list" v-for="(item, index) in realCaseListData" :key='item.id'
				@click="toCaseDetail(item, index)">
				<real-case-list-item :item='item' :index="index" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import RealCaseListItem from './real-case-list-item.vue';


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
			RealCaseListItem
		},
		data() {
			return {
				noEmit: false,
				scrollTop: 0,
				triggered: false,
			}
		},
		methods: {
			scroll(e) {
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
			toCaseDetail(item, index) {
				this.$emit('toCaseDetail', index);
				uni.navigateTo({
					url: `/pages/real-case/real-case-webview/real-case-webview?id=${item.id}`,
				});
			},
			scrolltolower() {
				this.$emit('scrolltolower')
			},
			refresherrefresh() {
				this.$emit('refresherrefresh')
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
		}
	}
</style>
