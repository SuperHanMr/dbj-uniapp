<template>
	<message-bubble
		:message="message"
		class="case-wrapper"
		no-padding
	>
		<view class="case-template__body" @click="goCaseDetail">
			<view class="case-template__top">
				<image
					class="caseImage"
					:src="data.imageUrl"
					mode="aspectFill"
				/>
				<view class="case-info">
					<text v-if="data.roomNum || data.hallNum || data.kitchenNum || data.bathroomNum ">
						<template v-if="data.roomNum">{{data.roomNum}}室</template>
						<template v-if="data.hallNum">{{data.hallNum}}厅</template>
						<template v-if="data.kitchenNum">{{data.kitchenNum}}厨</template>
						<template v-if="data.bathroomNum">{{data.bathroomNum}}卫</template>
					</text>
					<text v-else>-</text>
					<text>|</text>
					<text>{{data.insideArea || '-'}}㎡</text>
					<text>|</text>
					<text>{{data.housingEstate && data.cityName ? `${data.cityName}·${data.housingEstate}` : '-'}}</text>
				</view>
			</view>
			<view class="case-template__main">
				<view class="title">
					{{data.caseName}}
				</view>
				<view class="tags">
					<view class="tag" v-for="tag in tags" :key="tag.id">
						<text>{{tag.labelName}}</text>
					</view>
				</view>
			</view>
		</view>
	</message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";
export default {
	name: "ServeCardTemplate",
	components: {
		MessageBubble,
	},
	props: {
		message: {
			type: Object,
			required: true,
		},
	},
	computed: {
		data() {
			return this.message.payloadData.params || {};
		},
		tags() {
      return [
        ...(this.data.customLabelList || []),
        ...(this.data.styleName
          ? [{ id: Math.random(), labelName: this.data.styleName }]
          : []),
        ...(this.data.features || []).map((l) => ({
          id: Math.random(),
          labelName: l,
        })),
      ];
    },
	},
	methods: {
		goCaseDetail() {
			uni.navigateTo({
				url: `/pages/real-case/real-case-webview/real-case-webview?id=${this.data.id}`
			});
		}
	},
};
</script>

<style scoped lang="scss">

.case-template__body {
	width: 338rpx;
	overflow: hidden;
	border-top-left-radius: 16rpx;
	border-top-right-radius: 16rpx;
}
.case-template__top {
	height: 338rpx;
	width: 338rpx;
	position: relative;
}
.case-template__top .caseImage {
	height: 338rpx;
	width: 338rpx;
	overflow: hidden;
	object-fit: cover;
	border-radius: 8rpx;
}
.case-info{
	background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.65) 100%);
	position: absolute;
	height: 52rpx;
	bottom: 0rpx;
	left: 0rpx;
	right: 0rpx;
	padding: 0 16rpx;
	color: #fff;
	font-size: 20rpx;
	line-height: 52rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.case-template__main {
	padding: 12px 16px 22rpx 16rpx;
}
.case-template__main .title {
	font-size: 26rpx;
	line-height: 44rpx;
	color: #333;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.case-template__main .tags{
	margin-top: 8rpx;
	height: 32rpx;
	overflow: hidden;
}

.case-template__main .tags .tag{
	display: inline-block;
	margin-right: 12rpx;
	height: 32rpx;
	line-height: 32rpx;
	padding: 0 8rpx;
	background: #F7F3F0;
	border-radius: 4rpx;
	font-size: 18rpx;
	color: #B27436;
}

</style>
