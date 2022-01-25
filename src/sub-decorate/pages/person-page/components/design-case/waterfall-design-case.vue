<template>
	<view class="waterfall-item" :class="{'is-grab':!isGrab}">
		<view class="img-box" @tap="onTap">
			<image :src="params.imageUrl" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
			<view class="comment-like">
				<view class="address" v-if="params.cityName">
          {{params.roomNum!==0?`${params.roomNum}室`:params.hallNum!==0?`${params.hallNum}厅`:''}}
          <view v-if="params.roomNum||params.hallNum"> | </view>
          {{Math.floor(params.insideArea)<1?'-':Math.floor(params.insideArea)}}㎡
          <view> | </view>
          {{params.cityName}}
          <view class="">
           · 
          </view>
          {{params.housingEstate}}
        </view>
			</view>
      <view class="mask" v-if="params.cityName">
        
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
			<view class="title">{{params.caseName}}</view>
      <view class="tag">
        <view class="" v-if="params.styleName">
          {{params.styleName}}
        </view>
        <view v-for="item of params.features" :key='item'>{{item}}</view>
        
      </view>
			<view class="case-info">
				<view class="info-img">
					<image :src="params.authorAvatar" alt="">
					<view class="info-text">
						{{params.authorName}}
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
      isGrab:{
        type:Boolean,
        default:false,
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
// .is-grab{
//   border: 0.5px solid #ececec;
// }
.waterfall-item{
	// margin-right: 16rpx;
	font-size: 28rpx;
	margin-bottom: 20rpx;
	background: #ffffff;
	
	border-radius: 8px;
	.img-box{
		position: relative;
		image{
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			max-height: 600rpx;
			border-radius: 8px;
		}
		.comment-like{
			position: absolute;
			bottom: 0;
			left: 16rpx;
			display: flex;
			align-items: center;
			z-index: 100;
			.address{
        color: #fff;
        font-size: 20rpx;
        max-width: 310rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 60rpx;
        line-height: 60rpx;
        view{
          display: inline-block;
          margin: 0 8rpx;
        }
      }
      
		}
    .mask{
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.65) 100%);
      width: 100%;
      height: 60rpx;
      position: absolute;
      bottom: 0;
      border-radius: 0 0 16rpx 16rpx;
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
			margin: 20rpx 0 10rpx 0;
			font-size: 26rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			// font-weight: bold;
			text-align: left;
			color: #333333;
			letter-spacing: 0px;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
      line-height: 44rpx;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
    .tag{
      margin-bottom: 12rpx;
      width: 100%;
      height: 40rpx;
      overflow: hidden;
      view{
        display: inline-block;
        background-color: #F7F3F0;
        border-radius: 4rpx;
        color: #B27436;
        font-size: 18rpx;
        height: 32rpx;
    line-height: 32rpx;
    padding: 0 8rpx;
        margin-right: 12rpx;
      }
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
