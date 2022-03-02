<template>
	<view class="real-case-screening">
		<view class="list" v-for="(item, index) in list" :key='item.key' :style="{ left : a ? a : 'none', right: v ? v :'none', top: b}">
			<view class="left">
				{{item.title}}
			</view>
			<view class="right">
				<view :class="['tag', {'tag-all': tag.code == tagSelect[index]}]" v-for="(tag, tagIndex) in item.list"
					:key='tag.code' @click="onTag(index,tag.code, tagIndex)">
					{{tag.name}}
				</view>
			</view>
			<view class="fade">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["caseStyleList"],
		data() {
			return {
				list: [{
						title: '居室',
						key: 1,
						list: [{
								name: '全部',
								code: null
							},
							{
								name: '一室',
								code: 1
							},
							{
								name: '二室',
								code: 2
							},
							{
								name: '三室',
								code: 3
							},
							{
								name: '四室',
								code: 4
							},
							{
								name: '五室',
								code: 5
							}
						]
					},
					{
						title: '面积',
						key: 2,
						list: [{
								name: '全部',
								code: null
							},
							{
								name: '60m²以下',
								code: '0-60'
							},
							{
								name: '60-90m²',
								code: '60-90'
							},
							{
								name: '90-120m²',
								code: '90-120'
							},
						]
					},
					{
						title: '风格',
						key: 3,
						list: []
					}
					
				],
				tagSelect: [null, null],
				selectData: {

				}
			}
		},
		watch:{
			caseStyleList: {
				handler: function handler(val){
					let arr = JSON.parse(JSON.stringify(val));
					if (arr[0].code != null) {
						arr.unshift({
							code: null,
							name: '全部'
						})
					}
					console.log(arr, '>>><><><')
					this.list[2].list = arr;
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			onTag(index, key, tagIndex) {
				let arr = JSON.parse(JSON.stringify(this.tagSelect));
				arr[index] = key;
				this.tagSelect = arr;
				this.selectData[index] = {
					name: this.list[index].list[tagIndex].code == null ? '' : this.list[index].list[tagIndex].name,
					code: this.list[index].list[tagIndex].code,
				};
				this.$emit('updateTag', this.selectData);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.real-case-screening {
		width: 100%;
		height: 100%;
		background-color: #ffffff;

		.list {
			display: flex;
			align-items: center;
			padding: 18rpx 0 18rpx 32rpx;
			position: relative;

			.left {
				display: flex;
				margin-right: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 40rpx;
				text-align: center;
				color: #333333;
			}

			.right {
				flex: 1;
				display: flex;
				font-family: PingFang SC;
				font-size: 24rpx;
				line-height: 34rpx;
				text-align: center;
				color: #333333;
				overflow-y: auto;

				.tag {
					margin-right: 16rpx;
					padding: 2rpx 16rpx 4rpx;
					white-space: nowrap;
				}

				.tag-all {
					background: #F3F3F3;
					border-radius: 6rpx;
				}
			}

			.fade {
				position: absolute;
				right: 0;
				bottom: 16rpx;
				width: 40rpx;
				height: 40rpx;
				background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
			}
		}
	}
</style>
