<template>
	<view>
		<tabs :items="designArr" :current="currentItem" @changeItem="changeItem"></tabs>
		<!-- 原始户型图 -->
		<view class="original">
			<view class="subtitle">
				<view class="t">原始结构尺寸图</view>
				<view class="date">2021-08-19 20:20:00</view>
			</view>
			<view class="imgs img-original">
				<image :src="originImgUrl" @click="clickImg(originImgUrl)"></image>
			</view>
		</view>
		<!-- 量房图 -->
		<view class="measure">
			<view class="subtitle">
				<view class="t">量房图图片</view>
				<view class="date">2021-08-19 20:20:00</view>
			</view>
			<view class="imgs img-measure">
				<image v-for="(item,index) in measureImgList" :src="item" @click="clickImg(measureImgList)"></image>
			</view>
		</view>
	</view>
</template>

<script>
  import { getDesignList } from "../../../api/decorate.js"
  import Tabs from "../../components/tabs/tabs.vue"
	export default {
    components: {
      Tabs
    },
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
				designArr: ['量房', '设计', '精算'],
				currentItem: "量房"
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
			},
			changeItem(item) {
				if (this.currentItem !== item) {
					this.currentItem = item
				}
			},
      getDesignList() {
        
      }
		}
	}
</script>

<style scoped lang="scss">
	

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

		.subtitle {
			margin-right: 32rpx;
		}

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
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		margin-bottom: 24rpx;

		.t {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
			line-height: 40rpx;
		}

		.date {
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: right;
			color: #999999;
			line-height: 34rpx;
		}
	}
</style>
