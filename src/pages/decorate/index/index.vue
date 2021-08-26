<template>
	<view class="content">
		<decorate-notice v-if="noticeActive" @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
		<drag-button-follow :style.sync="style" @btnClick='noticeActive=true' :follow='`left,right`'
			className="drag-button" class="drag-button">
			<view>
				<text>消息</text>
				<text style="color: red;">2</text>
			</view>
		</drag-button-follow>
		<view>
			<view>量房</view>
			<view>计算服务</view>
			<view>设计服务</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view style="background-color: #fff;">
				<button @btnClick="goToAddHouseInfo">添加房屋信息</button>
				<button @btnClick="goToDecorateService">进行装修服务</button>
				<button @btnClick="goToVerifyHouse">进行验房服务</button>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	export default {
		mounted() {
			if(this.houses.length < 1) {
				this.openPopup()
			}
		},
		data() {
			return {
				style: '',
				noticeActive: false,
				houses: [{
					id: 1, housename: "北京市石景山区叠翠庭院1区", isfirend: false, status: "设计阶段"
				},{
					id: 2, housename: "北京市石景山区叠翠庭院1区", isfirend: false, status: "未开工"
				},{
					id: 3, housename: "北京市石景山区叠翠庭院1区", isfirend: true, status: "未开工"
				}]
			}
		},
		methods: {
			closeNotice() {
				this.noticeActive = false
			},
			openPopup() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
			},
			goToAddHouseInfo() {
				
			},
			goToDecorateService() {
				
			},
			goToVerifyHouse() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.drag-button {
		background: #FFFFFF;
		border: 0.5px solid #EEEEEE;
		box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
		width: 100rpx;
		height: 100rpx;
		font-size: 24rpx;
		color: #000000;
		position: absolute;
		right: 0rpx;
		bottom: 188rpx;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
