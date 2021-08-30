<template>
	<view>
		<!-- 原始户型图 -->
		<view class="original">
			<view class="subtitle">
				量房图（原始结构尺寸图）
			</view>
			<view class="imgs img-original">
				<image mode="aspectFit" :src="data.originImgUrl" @click="clickImg(data.originImgUrl)"></image>
			</view>
		</view>
		<!-- 量房图 -->
		<view class="measure">
			<view class="subtitle">
				量房图（原始结构尺寸图）
			</view>
			<view class="imgs img-measure">
				<image mode="aspectFit" v-for="(item,index) in data.measureImgList" :src="item"
					@click="clickImg(data.measureImgList)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import originImgUrl from "../../../static/app-plus/uni@2x.png"
	export default {
		data() {
			return {
				data: {
					measureImgList: [originImgUrl, originImgUrl, originImgUrl, originImgUrl, originImgUrl, originImgUrl],
					originImgUrl: originImgUrl
				}
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

<style scoped>
	.img-measure image {
		width: 49%;
	}
</style>
