<template>
  <view class="replace-worker">
    <text>选择更换原因</text>
    <view class="radio-group">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view>{{item.label}}</view>
				</label>
			</radio-group>  
		</view>
		<text>上传照片（{{num}}/6）</text>
		<uni-file-picker 
		    v-model="imageValue" 
		    fileMediatype="image" 
		    mode="grid"   
        :limit="6"
		    @select="select" 
		    @progress="progress" 
		    @success="success" 
		    @fail="fail" 
		/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0,
				items:[
					{
						label:"服务态度不好",
						value:0
					},
					{
						label:"能力不足",
						value:1
					},
					{
						label:"沟通能力不足",
						value:2
					},
					{
						label:"其他原因",
						value:3
					},
				],
				imageValue:[]
			};
		},
		methods:{
			radioChange(evt){
				console.log(evt.detail.value)

			},
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},

			// 上传成功
			success(e){
				console.log('上传成功')
        console.log(this.imageValue)
			},

			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
	}
}
</script>

<style lang="scss">

</style>
