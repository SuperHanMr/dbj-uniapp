<template>
	<view>
		<custom-file-picker  fileMediatype="image" mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" @fileChange="onFileChange"></custom-file-picker>
		<button type="default" @click="logList">获取列表</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue:[]
			}
		},
		methods: {
			onFileChange(files){
				this.imageValue=files
			},
			logList(){
				console.log(this.imageValue);
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style>
	page{
		background: #FFF;
	}

</style>
