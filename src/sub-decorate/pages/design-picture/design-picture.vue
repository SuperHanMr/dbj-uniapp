<template>
	<view>
		<view class="tabs">
			<view class="item active" v-for="(item, index) in designArr" :key="index">
				<view class="name">{{item}}</view>
				<image class="bt" src="http://iph.href.lu/48x6?fg=00ed7d"></image>
			</view>
		</view>
		<!-- 原始户型图 -->
		<view class="original">
			<view class="subtitle">
				原始结构尺寸图
			</view>
			<view class="imgs img-original">
				<image :src="originImgUrl" @click="clickImg(originImgUrl)"></image>
			</view>
		</view>
		<!-- 量房图 -->
		<view class="measure">
			<view class="subtitle">
				量房图图片
			</view>
			<view class="imgs img-measure">
				<image v-for="(item,index) in measureImgList" :src="item" @click="clickImg(measureImgList)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				measureImgList: [
					"http://iph.href.lu/328x216?text=量房图片&fg=EB7662&bg=FFE2DD",
					"http://iph.href.lu/328x216?text=量房图片&fg=EB7662&bg=FFE2DD",
					"http://iph.href.lu/328x216?text=量房图片&fg=EB7662&bg=FFE2DD",
					"http://iph.href.lu/328x216?text=量房图片&fg=EB7662&bg=FFE2DD",
					"http://iph.href.lu/328x216?text=量房图片&fg=EB7662&bg=FFE2DD",
					"http://iph.href.lu/328x216?text=量房图片&fg=EB7662&bg=FFE2DD"
				],
				originImgUrl: "http://iph.href.lu/328x216?text=原始结构尺寸图&fg=EB7662&bg=FFE2DD",
				designArr: ['量房']
			}
		},
		methods: {
			clickImg(url) {
				let arr = new Array();
				if (url instanceof Array) {
					arr = [...url]
				} else {
					arr.push(url)
				}
				console.log(arr)
				uni.previewImage({
					// current: 1,
					urls: arr,
					// longPressActions:{}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabs {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: row;
		padding: 28rpx 0 0 48rpx;
		border: 2rpx solid #EFEFEF;
		margin-bottom: 40rpx;
		box-sizing: border-box;
		margin-bottom: 40rpx;
		.item {
			text-align: center;

			.name {
				margin-bottom: 14rpx;
				width: 56rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 700;
				text-align: center;
				color: #333333;
				line-height: 40rpx;
			}

			.bt {
				display: none;
			}
		}

		.active {
			.bt {
				width: 48rpx;
				height: 6rpx;
				border-radius: 200rpx 200rpx 0rpx 0rpx;
			}
		}
	}

	.original {
		padding: 0 32rpx;
		margin-bottom: 56rpx;
		.img-original {
			image {
				width: 328rpx;
				height: 216rpx;
				border-radius: 12rpx;
			}
		}
	}

	.measure {
		padding: 0 2rpx 0 32rpx;
		.img-measure {
			image {
				width: 328rpx;
				height: 216rpx;
				margin-right: 30rpx;
				margin-bottom: 30rpx;
				border-radius: 12rpx;
			}
		}
	}

	.subtitle {
		width: 196rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		color: #333333;
		line-height: 40rpx;
		margin-bottom: 24rpx;
	}
</style>
