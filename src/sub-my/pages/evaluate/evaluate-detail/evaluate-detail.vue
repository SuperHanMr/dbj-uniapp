<template>
  <view>
    <view class="container" :style="{paddingBottom:systemBottom}">
      <view class="body">
        <view class="header">
          <view class="left">
            <image :src="`${serviceInfo.serverAvatar}?x-oss-process=image/resize,m_mfit,w_40,h_40`" mode=""/>
            <text class="serverName">{{serviceInfo.serverName}}</text>
            <view class="icon">
              {{serviceInfo.roleName ? serviceInfo.roleName :''}}
            </view>
          </view>
          <view class="right" v-if="serviceInfo.anonymous == 1">
            <view>匿名评价</view>
          </view>
        </view>
				
				<view class="score-container">
						<view class="star-container">
							<view class="star-item" >
								<image v-for="item in serviceInfo.rank" :key="item" src="../../../static/ic_score_star@2x.png" mode=""  />
							</view>
							<view class="star-item"  v-if="blankStar" >
								<image v-for="item2 in blankStar" :key="item2" src="../../../static/ic_blank_star@2x.png" mode=""  />
							</view>
						</view>
					<view class="time">
						<text>{{serviceInfo.createTime | formatDate}}</text> 
					</view>
				</view>

        <view class="line" />
				<!-- <view class="auto-evaluate" v-if="serviceInfo.anonymous == 1">
					系统自动评价
				</view> -->

        <view class="comment-content" >
        	<view class="comment" :style="{marginBottom:imgList.length>0?'32rpx':'0'}">
						{{ serviceInfo.content ?serviceInfo.content :'' }}
					</view>
					<view class="img-container" v-if="imgList.length>0">
						<image class="imgItem" 
							v-for="item4 in imgList" 
							:key="item4" 
							:src="`${item4}?x-oss-process=image/resize,m_mfit,w_109,h_109`" 
							@click="previewImg(item4)" 
						/>
					</view>
        </view>
				
			</view>
		</view>
		
		
  </view>
</template>

<script>
import {formatDate} from "../../../../utils/common.js"
import {immediateEvaluate,evaluateDetail} from "../../../../api/order.js"
export default {
	filters:{
		formatDate
	},
  data() {
    return {
			id:"",
			type:"",
			serviceInfo:{},
			blankStar:"",
     
			 systemBottom: "",
			 systemHeight: "",
			 containerBottom: "",
			 imgList:[],
    };
  },
	mounted(e) {
	  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	  this.systemBottom = menuButtonInfo.bottom + "rpx";
	  this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
	},
	
	
	
	onLoad(e) {
		this.id =Number(e.id)
		console.log("this.id=",this.id)
		this.getServiceInfo()
		console.log("e.typeName=",e.typeName)
		if(!e.typeName) return 
		uni.setNavigationBarTitle({
				title:`${e.typeName}服务评价`
		});
	},
	
  methods: {
		getServiceInfo(){
			evaluateDetail({id:this.id}).then(data=>{
				this.serviceInfo = data
				this.blankStar = 5 - data.rank
				console.log("this.serviceInfo.imgList===",this.serviceInfo.imgList)
				this.imgList =JSON.parse(this.serviceInfo.imgList)  
				console.log(typeof this.imgList)
				console.log("this.imgList=",this.imgList)
			})
		},
		previewImg(url) {
			uni.previewImage({
				urls: [url],
				current: 0,
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.container {
  background: #F5F6F6;
  padding-top: 16rpx;
  overflow-y: auto;
  .body {
    background-color: #ffffff;

    .header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      .left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        line-height: 80rpx;
        image {
          width: 80rpx;
          height: 80rpx;
          object-fit: cover;
          margin-right: 8rpx;
        }
				.serverName{
					color:#333333;
					max-width: 348rpx;
					font-size: 32rpx;
					overflow: hidden;/*超出部分隐藏*/
					white-space: nowrap;/*不换行*/
					text-overflow:ellipsis;/*超出部分文字以...显示*/
				}
        .icon {
          width: 82rpx;
          height: 32rpx;
          line-height: 32rpx;
          background: linear-gradient(100deg, #7bbff2 0%, #60a8e8 100%);
          border-radius: 6rpx;
          font-size: 22rpx;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          margin-left: 12rpx;
        }
      }
      .right {
				height: 80rpx;
				line-height: 80rpx;
				text{
					width: 96rpx;
					// height: 34rpx;
					line-height: 34rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
				}
      }
    }
		.score-container{
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			padding: 26rpx 189rpx 50rpx 222rpx;
			
			.star-container{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-bottom: 24rpx;
				.star-item{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					image{
						width: 36rpx;
						height: 36rpx;
						object-fit: cover;
						margin-right: 32rpx;
					}
				}
			}
			.time{
				height: 36rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #BBBBBB;
				line-height: 36rpx;
			}	
		}


    .line {
      height: 1rpx;
      background-color: #f2f2f2;
			margin: 0 32rpx;
    }
		.auto-evaluate{
			padding: 48rpx 32rpx;
			background-color: #FFF;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			line-height: 44rpx;
		}
		
		.comment-content{
			// padding:44rpx 32rpx 64rpx;
			padding: 48rpx 32rpx 48rpx ;
			background-color: #FFF;
			.comment{
				font-size: 28rpx;
				line-height: 40rpx;
				font-weight: 400;
				color: #333333;
			}
			.img-container{
				.imgItem{
					width: 218rpx;
					height: 218rpx;
					border-radius: 12rpx;
					border: 2rpx solid #ECECEC;
					box-sizing: border-box;
					margin:0 16rpx 16rpx 0;
				}
				.imgItem:nth-child(3n){
					margin-right: 0;
				}
			}
			
		}

   
	}
}

// 上传图片的样式

::v-deep .uni-file-picker{
	max-height: 564rpx;
	width:  686rpx;
}
::v-deep .file-picker__box{
	width: 160rpx !important;
	height: 160rpx !important;
	object-fit: cover;
	border-radius: 12rpx !important;
	border: 2rpx solid #ECECEC !important;
	padding-top: 0 !important;
	margin:0 8rpx 28rpx  0!important;
}
::v-deep .file-picker__box-content{
	margin: 0 !important;
}





</style>
