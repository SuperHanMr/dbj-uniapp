<template>
	<view class="waterfall-item" @tap="onTap">
		<image :src="params.estateIconUrl + '?x-oss-process=image/resize,m_lfit,w_350'" class="waterfall-item-img"></image>
		<!-- <view class="decorate-state">
			{{params.projectStatus == 1 ? "已开启" : params.projectStatus == 2 ? '装修中' : params.projectStatus == 3 ? "已竣工" : "已结束"}}
		</view> -->
		<view class="content">
			<view class="title">{{params.estateNeighbourhood}}</view>
			<view class="decorate-info">
				<view class="size">
					{{params.estateArea ? params.estateArea.toFixed(2) : '0.00'}}m²
				</view>
				<view :class="['phase-box', {'phase-box-border': params.projectStatus == 3}]">
					<view :class="['phase', {'phase-pending' : params.projectStatus != 3}]">
						{{params.projectStatus == 3 ? "已竣工" :  '装修中' }}
					</view>
					<view class="phase-newest-node" v-if="params.newestNodeName && params.projectStatus != 3">
						{{params.newestNodeName}}
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"waterfall-design-case",
		props:{
			params:{
				type: Object,
				default(){
					return {}
				}
			},
			tag:{
				type:String | Number,
				default:''
			},
			index:{
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e){
				const query = uni.createSelectorQuery().in(this);
				query.select('.waterfall-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height",height,this.$props.tag);
				}).exec();
			},
			onTap(){
				this.$emit("click",this.$props.index,this.$props.tag);
			}
		}
	}
</script>

<style lang="scss" scoped>
.waterfall-item{
	position: relative;
	margin-right: 32rpx;
	font-size: 28rpx;
	margin-bottom: 20rpx;
	background: #ffffff;
	.waterfall-item-img{
		height: 344rpx;
	}
	.decorate-state{
		padding: 4rpx 16rpx;
		background: linear-gradient(45deg,rgba(51,51,51,1),rgba(86,86,86,1));
		border-radius: 8px 0px 6px 0px;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 22rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
	}
	image{
		display: block;
		width: 328rpx;
		// 默认设置一个图片的大约值
		height: 344rpx;
		border-radius: 16rpx;
	}
	
	.content{
		.title{
			margin: 16rpx 16rpx 12rpx 0;
			font-size: 26rpx;
			line-height: 44rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			// font-weight: bold;
			text-align: left;
			color: #333333;
			letter-spacing: 0px;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.decorate-info{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 16rpx 28rpx 0;
			.size{
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
			}
			.phase-box{
				display: flex;
				align-items: center;
				border: .5px solid #FA4D32;
				border-radius: 2px
			}
			.phase-box-border{
				border: 0;
				border-radius: 2px;
				background: #FA4D32;
			}
			.phase{
				padding: 0 4rpx;
				font-size: 20rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
				background: #333333;
				border-radius: 4rpx;
			}
			.phase-pending{
				color: #ffffff;
				background: #FA4D32;
			}
			.phase-newest-node{
				padding: 0 4rpx;
				font-size: 20rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #FA4D32;
			}
		}
	}
}
</style>
