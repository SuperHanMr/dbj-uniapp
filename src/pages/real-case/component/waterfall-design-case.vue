<template>
	<view class="waterfall-item" @tap="onTap">
		<view class="img-box">
			<image :src="params.imageUrl" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
			<view class="comment-like">
				<view class="comment" v-if="params.commentCount">
					<view class="comment-icon">
						<image src="/static/images/real-case/liuyan.png" mode=""></image>
					</view>
					<view class="comment-count">
						{{params.commentCount}}
					</view>
				</view>
				<view class="like" v-if="params.isLike">
					<view class="comment-icon">
						<image src="/static/images/real-case/xihuan.png" mode=""></image>
					</view>
					<view class="comment-count">
						{{params.likeCount}}
					</view>
				</view>
			</view>
			<view class="position-icon">
				<image src="/static/images/real-case/video_ic.png" mode="" v-if="params.parentType == 0"></image>
				<image src="/static/images/real-case/ic_vr.png" mode="" v-if="params.parentType == 1"></image>
				<image src="/static/images/real-case/img_ic.png" mode="" v-if="params.parentType == 2"></image>
			</view>
		</view>
		<!-- <video v-if="params.parentType !== 0" id="myVideo" :src="params.videoUrl"
		                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video> -->
		<view class="content">
			<view class="title">{{params.name}}</view>
			<view class="case-info">
				<view class="info-img">
					<image :src="params.authorAvatar" alt="">
					<view class="info-text">
						{{params.authorNickname}}
					</view>
				</view>
				<view class="collection-box">
					<image src="/static/images/real-case/collection-no.png" v-if="!params.isCollection" mode=""></image>
					<image src="/static/images/real-case/collection.png" v-if="params.isCollection" mode=""></image>
					<view class="collection-number">
						{{params.likeCount}}
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
	margin-right: 16rpx;
	font-size: 28rpx;
	margin-bottom: 20rpx;
	background: #ffffff;
	border: 1px solid #ececec;
	border-radius: 8px;
	.img-box{
		position: relative;
		image{
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			max-height: 600rpx;
			border-radius: 8px 8px 0px 0px;
		}
		.comment-like{
			position: absolute;
			bottom: 10rpx;
			left: 16rpx;
			display: flex;
			align-items: center;
			z-index: 100;
			.comment, .like{
				display: flex;
				align-items: center;
				margin-right: 16rpx;
				.comment-icon{
					width: 20rpx;
					height: 20rpx;
					line-height: 20rpx;
					opacity: 1;
					margin-right: 4rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.comment-count{
					font-size: 22rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #ffffff;
				}
			}
		}
		.position-icon{
			position: absolute;
			right: 16rpx;
			top: 16rpx;
			image{
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
	
	.content{
		.title{
			margin: 20rpx 16rpx 18rpx 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: bold;
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
		.case-info{
			padding: 0 16rpx 24rpx 16rpx;
			display: flex;
			justify-content: space-between;
			.info-img{
				display: flex;
				align-items: center;
				image{
					width: 18px;
					height: 18px;
					opacity: 1;
					border: 1px solid #f2f5f8;
					margin-right: 8rpx;
					border-radius: 0;
				}
				.info-text{
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					max-width: 160rpx;
					height: 34rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
			.collection-box{
				display: flex;
				align-items: center;
				image{
					width: 24rpx;
					height: 24rpx;
					opacity: 1;
					margin-right: 8rpx;
				}
				.collection-number{
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}
		}
	}
}
</style>
