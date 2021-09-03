<template>
	<view class="item">
		<view class="flex-row-bet">
			<view class="item-name flex-row-start">
				<image src="../../static/svg/ic_mer.svg"></image>
				<text>{{itemName}}</text>
			</view>
			<view class="status-name flex-row-start" :class="{
				robbing: status == '抢单中',
				shouldsure: status == '待确认',
				inservice: status == '服务中',
				uncheck: status == '待验收',
				completed: status == '完成',
				mr: status =='完成' || status =='服务中'
			}">
				<view>{{statusName}}</view>
				<image @click="openProcsss" :class="{open: open}" v-if="status =='完成' || status =='服务中'" src="../../static/svg/ic_triangle_up.svg"></image>
			</view>
		</view>
		<view class="gc" v-if="(status =='完成' || status =='服务中') && open">
			<view class="procsss flex-row-bet">
				<view class="s0">量房员</view>
				<view class="s1 flex-row-start">
					<view>奥特曼</view>
					<image src="../../static/svg/ic_more.svg"></image>
				</view>
			</view>
			<view class="procsss flex-row-bet">
				<view class="s0">进度</view>
				<view class="s1 flex-row-start">
					<view>0/1</view>
					<image src="../../static/svg/ic_more.svg"></image>
				</view>
			</view>
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
		filters: {},
		data() {
			return {
				open: true
			}
		},
		methods:{
			openProcsss() {
				this.open = !this.open
			}
		}
	}
</script>
