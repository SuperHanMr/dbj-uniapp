<template>
	<view class="container">
		<view class="body">
			<view class="feedback-descript">
				<view class="header">
					<text style="color: #FF3347;">*</text>
					<text>反馈描述</text>
				</view>
				<view class="descript">
					<textarea
					  v-model="query.remarks"
					  placeholder="您在使用过程中有任何问题与建议都可以写在这里，上传相关页面的截图可以方便我们更快速的给您解决问题~"
					  placeholder-style="color:#bbbbbb;font-size:26rpx;line-height:40rpx;"
						maxlength="140"
					  class="remark"
					  @input="onTextAreaInput"
					/>
					<view class="word-limit">
					  {{textAreaLength<140?textAreaLength:'140'}}/140
					</view>
				</view>
			</view>
			<view class="line"/>
			<view class="feedback-imageContainer">
				<view class="header">
					<text style="margin-right:16rpx;">反馈图片</text>
					<text>(最多上传4张)</text>
				</view>
				<view class="imageContainer">
					<custom-file-picker fileMediatype="image" mode="grid" :limit="4" @fileChange="onFileChange"/>
				</view>
			</view>
		</view>
		<view class="footer-container"  :style="{paddingBottom:systemBottom,height:systemHeight}">
			<view class="confirm-btn" v-if="!textAreaLength"  style="opacity:0.5">
				提交
			</view>
			<view class="confirm-btn" v-else @click="submit">
				提交
			</view>
		</view>
		
	</view>
</template>

<script>
	import {commentsAndFeedBack} from "../../../../api/order.js"
	export default {
		data() {
			return {
				query:{
					remarks:"",
					imageUrls:[],
				},
				systemBottom:"",
				
				textAreaLength:0,
			}
		},
		mounted(e) {
		  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		  this.systemBottom = menuButtonInfo.bottom + "rpx";
		},
		watch: {
		  textAreaLength(newVal, oldVal) {
			 if(newVal>140) return 140
			},
		},
		methods: {
			// 反馈文字
			onTextAreaInput(event) {
			  this.textAreaLength = event.target.value.length;
			},
			//反馈图片
			onFileChange(files) {
				this.query.imageUrls = files.map(item=>{
					return item.url
				})
				console.log("this.imageValue=",this.query.imageUrls)
			},
			// 提交操作
			submit(){
				console.log("提交")
				let params={
					source:1,// 1：客戶端APP 2：服务端APP
					type:3,// 1：功能异常 2：优化建议 3：其他反馈
					content:this.query.remarks,//反馈内容
					imageUrls:this.query.imageUrls,//反馈图片（数组形式）
				}
				commentsAndFeedBack(params).then(()=>{
					console.log("反馈成功")
					uni.showToast({
						title:"反馈成功！",
						icon:"none",
						duration: 1000
					});
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},1000)
				}).catch(()=>{})
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #F7F7F7;
		.body{
			background-color: #FFFFFF;
			.feedback-descript{
				padding: 32rpx 32rpx 42rpx;
				.header{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #808080;
					margin-bottom: 24rpx;
				}
				.descript{
					position: relative;
					.remark {
						background: #fafbfc;
						width: 686rpx;
						height: 280rpx;
						box-sizing: border-box;
						border: 2rpx solid #e8e8e8;
						border-radius: 24rpx;
						padding: 20rpx 24rpx;
						font-size:26rpx;
					}
					.word-limit {
					  position: absolute;
					  right: 24rpx;
					  bottom: 20rpx;
					  color: #999999;
					  font-size: 26rpx;
					  overflow-y: auto;
					}
				}
				
			}
			.line{
				height: 2rpx;
				background: #f2f2f2;
				border-radius: 2rpx;
			}
			.feedback-imageContainer{
				.header{
					padding: 32rpx 32rpx 24rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #808080;
				}
				.imageContainer{
					padding: 0 16rpx 48rpx;
				}
			}
				
		}
	}
	
	// 底部 确认收货 及申请退款按钮
	.footer-container{
	  position: fixed;
	  bottom: 0;
	  width: 686rpx;
	  background-color: #ffffff;
	  display: flex;
	  flex-flow: row nowrap;
	  align-items: center;
	  padding: 24rpx 32rpx;
	  .confirm-btn {
			width: 686rpx;
	    height: 88rpx;
	    line-height: 88rpx;
	    box-sizing: border-box;
	    background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
	    border-radius: 12rpx;
	    font-size: 32rpx;
	    text-align: center;
	    font-weight: 400;
	    color: #ffffff;
	  }
	  
	}
</style>
