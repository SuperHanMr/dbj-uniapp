<template>
	<view class="real-case-screening">
		<view class="list" v-for="(item, index) in list" :key='item.key'>
			<view class="left">
				{{item.title}}
			</view>
			<view class="right">
				<view :class="['tag', {'tag-all': tag.key == tagSelect[index]}]" v-for="(tag, tagIndex) in item.list" :key='tag.key' @click="onTag(index,tag.key, tagIndex)">
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
		data(){
			return {
				list: [
					{
						title: '居室',
						key: 1,
						list: [
							{
								name: '全部',
								key: 1
							},
							{
								name: '一室',
								key: 2
							},
							{
								name: '二室',
								key: 3
							},
							{
								name: '三室',
								key: 4
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							},
							{
								name: '四室',
								key: 5
							}
						]
					},
					{
						title: '面积',
						key: 2,
						list: [
							{
								name: '全部',
								key: 1
							},
							{
								name: '60m²一下',
								key: 2
							},
							{
								name: '60-90m²',
								key: 3
							},
							{
								name: '90-120m²',
								key: 4
							},
							{
								name: '110m²',
								key: 5
							}
						]
					}
				],
				tagSelect: [1, 1],
				selectData: {
					0: '全部',
					1: '全部'
				}
			}
		},
		methods:{
			onTag(index,key, tagIndex){
				let arr = JSON.parse(JSON.stringify(this.tagSelect));
				arr[index] = key;
				this.tagSelect = arr;
				this.selectData[index] = this.list[index].list[tagIndex].name;
				this.$emit('updateTag', this.selectData);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.real-case-screening{
		width: 100%;
		height: 100%;
		.list{
			display: flex;
			align-items: center;
			padding: 16rpx 0 16rpx 32rpx;
			position: relative;
			.left{
				display: flex;
				margin-right: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 40rpx;
				text-align: center;
				color: #333333;
			}
			.right{
				flex: 1;
				display: flex;
				font-family: PingFang SC;
				font-size: 24rpx;
				line-height: 34rpx;
				text-align: center;
				color: #333333;
				overflow-y: auto;
				.tag{
					margin-right: 16rpx;
					padding: 2rpx 16rpx 4rpx;
					white-space: nowrap;
				}
				.tag-all{
					background: #F3F3F3;
					border-radius: 6rpx;
				}
			}
			.fade{
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
