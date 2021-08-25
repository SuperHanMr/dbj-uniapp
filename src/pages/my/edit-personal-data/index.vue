<template>
	<view class="base-info-container">
		<view class="main-body">
			<uni-list class="uni-list">
				<uni-list-item title="头像" link to="" @click="onClick($event,1)" >
					<template slot="footer">	
						<image class="slot-image" src="../../../static/c1.png" ></image>
					</template>
				</uni-list-item>
				<uni-list-item title="昵称" rightText="小仙女儿" link to="" @click="onClick($event,1)" >
				</uni-list-item>
				<uni-list-item title="手机号" rightText="就不告诉你我的手机号"  ></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onClick(){
				console.log("打印数据，哈哈哈")
			}
		}
	}
</script>

<style scoped>
.base-info-container{
	width: 100%;
	height: 100%;
	/* background-color: #FFC0CB; */
}
.base-info-container .main-body{
	padding-top: 40rpx;
}
.slot-image{
	border-radius: 50%;
	width: 60rpx;
	height: 60rpx;
	background-color: yellowgreen;
}
</style>
