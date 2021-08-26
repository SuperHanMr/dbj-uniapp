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
	const originImgUrl =
		"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e8945784b68dcdf99160642be0786cd2594d6cabcda-Gljuui_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632541741&t=bb4860ac5dc004037d33f85c390d386f"

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
