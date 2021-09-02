<template>
	<view class="item">
		<view class="flex-row-bet">
			<view class="item-name flex-row-start">
				<image src="../../static/svg/ic_mer.svg"></image>
				<!-- <view class="image"></view> -->
				<text>{{itemName}}</text>
			</view>
			<view class="status-name" :class="{
				robbing: status == '抢单中',
				shouldsure: status == '待确认',
				inservice: status == '服务中',
				uncheck: status == '待验收',
				completed: status == '完成'
			}">{{statusName}}</view>
		</view>
	</view>
</template>

<script>
	import "./item.scss"
	export default {
		name: "ServiceItem",
		props: {
			status: {
				style: String,
				required: true
			},
			itemName: {
				style: String,
				required: true
			},
			statusName: {
				style: String,
				required: true
			}
		},
		filters: {}
	}
</script>
