<template>
	<view class="waterfall-item">
		<view class="img-box" @tap="onTap">
			<image :src="params.imageUrl + '?x-oss-process=image/resize,m_lfit,h_350,w_350'" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
			<view class="comment-like">
				<view class="comment">
					<view class="comment-icon">
						<view class=".icon-gerenzhuye_anli_ic_pinglun icon_view">
							
						</view>
					</view>
					<view class="comment-count">
						{{((params.commentCount / 10000) > 1 ? ((params.commentCount / 10000).toFixed(1) + "w" ): params.commentCount )|| 0}}
					</view>
				</view>
				<view class="like">
					<view class="comment-icon">
						<view class=".icon-gerenzhuye_anli_ic_dianzan icon_view">
							
						</view>
					</view>
					<view class="comment-count">
						{{((params.likeCount / 10000) > 1 ? ((params.likeCount / 10000).toFixed(1) + "w" ): params.likeCount )|| 0}}
					</view>
				</view>
			</view>
			<view class="position-icon">
				<view class="icon-ic_zhuangxiuxianchang_shipinanli_csn1" v-if="params.parentType == 0">
					
				</view>
				<view class="icon-ic_zhuangxiuxianchang_vranli_csn1" v-if="params.parentType == 1">
					
				</view>
				<view class="icon-ic_zhuangxiuxianchang_tupiananli_csn1" v-if="params.parentType == 2">
					
				</view>
			</view>
		</view>
		<!-- <video v-if="params.parentType !== 0" id="myVideo" :src="params.videoUrl"
		                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video> -->
		<view class="content">
			<view class="title">{{params.name}}</view>
			<view class="case-info">
				<view class="info-img">
					<image :src="params.authorAvatar + '?x-oss-process=image/resize,m_mfit,w_40,h_40'" alt="">
					<view class="info-text">
						{{params.authorNickname}}
					</view>
				</view>
				<view class="collection-box" @tap="onCollection">
					<image src="/static/images/real-case/collection-no.png" v-if="!params.isCollection" mode=""></image>
					<image src="/static/images/real-case/collection.png" v-if="params.isCollection" mode=""></image>
					<view class="collection-number">
						{{params.collectionCount}}
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
				console.log("onTap")
				this.$emit("click",this.$props.index,this.$props.tag);
			},
			onCollection() {
				console.log("收藏")
				this.$emit("collection",this.$props.index);
			}
		} 
	}
</script>

<style lang="scss" scoped>
.waterfall-item{
	margin-right: 32rpx;
	font-size: 28rpx;
	margin-bottom: 20rpx;
	background: #ffffff;
	border-radius: 8px;
	.img-box{
		position: relative;
		image{
			display: block;
			width: 328rpx;
			// 默认设置一个图片的大约值
			max-height: 600rpx;
			border-radius: 16rpx;
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
					.icon_view{
						width: 100%;
						height: 100%;
						font-size: 20rpx;
						color: #ffffff;
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
			width: 44rpx;
			height: 44rpx;
			background: rgba(0,0,0,.2);
			border-radius: 50%;
			right: 16rpx;
			top: 16rpx;
			view{
				font-size: 44rpx;
				color: #ffffff;
			}
		}
	}
	
	.content{
		.title{
			margin: 20rpx 16rpx 18rpx 0;
			line-height: 44rpx;
			font-size: 26rpx;
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
		.case-info{
			padding: 0 16rpx 24rpx 0;
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
					border-radius: 50%;
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
