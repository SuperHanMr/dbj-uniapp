<template>
  <view>
    <view class="container" :style="{paddingBottom:containerBottom}">
      <view class="body">
        <view class="header">
          <view class="left">
            <image :src="serverAvatar" mode="aspectFill" />
            <text class="serverName">{{serverName}}</text>
            <view class="icon">
              {{serverRoleName}}
            </view>
						
          </view>
          <view class="right" @click="handleCheck">
            <image v-if="isAnonymous" src="../../../static/anonymous_check.svg" mode=""></image>
            <image  v-else  src="../../../static/anonymous_unCheck.svg" mode=""></image>
            <text>匿名评价</text>
          </view>
        </view>

        <view class="line" />

        <view class="main-body">
          <view class="rate-header">
            <text class="text">评分</text>
            <view class="star-container">
							<view class="star-item" v-for="item in list" :key="item.id">
								<image v-if="item.isred"  src="../../../static/ic_blank_star@2x.png" mode=""  @click ="cools(item.id)"></image>
								<image v-else  src="../../../static/ic_score_star@2x.png" mode=""  @click ="cools(item.id)"></image>
							</view>
						</view>
					</view>

          <view class="edit-evaluate">
            <textarea
              v-model="query.remarks"
              placeholder="快来评价一下服务者吧～"
              placeholder-style="color:#AAAAAA;font-size:14px;"
              maxlength="500"
              class="remark"
              @input="onTextAreaInput"
            />
            <view class="word-limit">
              {{textAreaLength>500?500:textAreaLength}}/500
            </view>
          </view>



          <view class="imageInfo">
						
					  <custom-file-picker 
							fileMediatype="image" 
							mode="grid" 
							:limit="9" 
							@fileChange="onFileChange"
						/>
					    
            <!-- <view class="add-image"  @click="upload">
              <image src="../../../static/ic_upload@2x.png" mode=""></image>
							<text>点击上传</text>
            </view>
						<view class="image-container" v-for="(item,index) in 9" :key="index">
              <image
                class="image1"
                src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_interaction@2x.png"
                mode="" />
              <image
                class="image2"
                src="../../../static/icon_image_delete@2x.png"
                mode="" />
            </view> -->
          </view>
				</view>
			</view>
		</view>
	
		<view class="footer-container"  :style="{paddingBottom:systemBottom,height:systemHeight}">
			<view class="confirm-btn" @click="confirmEvaluate">
				确认评价
			</view>
		</view>
</view>
  </view>
</template>

<script>
import {immediateEvaluate,evaluateDetail} from "../../../../api/order.js"
export default {
  data() {
    return {
			id:"",
			type:"",
			serverName:"" ,
			serverRoleName:"",
			serverAvatar:"",
			typeName:"",
			// serviceInfo:{},
      query: {
        remarks: "",
        stars: "",
      },
			isAnonymous:false,
			
      textAreaLength: 0,
			
			list:[
				{
					id:1,
					isred:false
				},
				{
					id:2,
					isred:false
				},
				{
					id:3,
					isred:false
				},
				{
					id:4,
					isred:false
				},
				{
					id:5,
					isred:false
				}
			],
			
			
			imageValue:[],
			
				
				
				
			 systemBottom: "",
			 systemHeight: "",
			 containerBottom: "",
    };
  },
	mounted(e) {
	  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	  this.containerBottom = menuButtonInfo.bottom + 176 + 'rpx';
	  this.systemBottom = menuButtonInfo.bottom + "rpx";
	  this.systemHeight = menuButtonInfo.bottom + 24+ "rpx";
	},
	
	computed:{
		starNum(){
		 let arr = 	this.list.filter(item=>{
				return item.isred == false
			})
			this.query.stars = arr.length
			console.log("this.query.stars=",this.query.stars)
		}
	},
	
  watch: {
    textAreaLength(newVal, oldVal) {},
  },
	
	onLoad(e) {
    let {serveId,serveType,servicerName,servicerRole,servicerAvatar,serveTypeName} = getApp().globalData.decorateMsg
		this.id =Number(e.id) || serveId
		this.type  =Number(e.type) || serveType
		this.serverName = e.serverName || servicerName
		this.serverRoleName = e.serverRoleName || servicerRole
		this.serverAvatar  =e.serverAvatar || servicerAvatar 
		this.typeName = e.typeName || serveTypeName
		console.log("this.id=",this.id,"this.type=",this.type)
		// this.getServiceInfo()
		if (!this.typeName) return 
		uni.setNavigationBarTitle({
				title:`${this.typeName}服务评价`
		});
	},
	
  methods: {
		// getServiceInfo(){
		// 	evaluateDetail({id:this.id}).then(data=>{
		// 		console.log("data=",data)
		// 		this.serviceInfo = data
		// 	})
		// },
		
    // changeTitle() {
    //   uni.setNavigationBarTitle({
    //     title: "新的标题",
    //   });
    // },
		
    onChange(e) {
      console.log("rate发生改变:" + JSON.stringify(e));
    },
    onTextAreaInput(event) {
      this.textAreaLength = event.target.value.length;
    },
		
		// 匿名操作
		handleCheck(){
			this.isAnonymous = !this.isAnonymous
		},
		
		//星星操作
		cools(id){
			this.list.forEach(element => {
				if(element.id<=id){
						element.isred = false
				}else{
						element.isred = true
				}
		 })
		},
		onFileChange(files) {
			this.query.imageUrls = files.map(item=>{
				return item.url
			})
			console.log("this.imageValue=",this.query.imageUrls)
		},
		// 确认评价按钮
	confirmEvaluate(){
		let params={
			refId:this.id, //关联ID"
			refType:this.type,//关联类型",
			anonymous:this.isAnonymous?1:0, //是否匿名 0:非匿名  1:匿名
			userId:"",
			userName:"",
			// userId:this.serviceInfo.userId, //评价人ID",
			// userName:this.serviceInfo.userName,//评价人名称",
			rank:this.query.stars, //评级 1不好，2还行，3一般，4满意，5超惊喜",
			shortComments:"",//快捷评价ids",
			content:this.query.remarks.substr(0,500),,//详细评价内容",
			imgList:this.query.imageUrls,//图片
		}
		immediateEvaluate(params).then(e=>{
			uni.navigateBack({
					delta: 1
			});
		})
		
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
					max-width: 340rpx;
					font-size: 32rpx;
					overflow: hidden;/*超出部分隐藏*/
					white-space: nowrap;/*不换行*/
					text-overflow:ellipsis;/*超出部分文字以...显示*/
				}
        .icon {
					width: 90rpx;
					height: 36rpx;
					line-height: 36rpx;
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
				width: 136rpx;
        height: 80rpx;
				line-height: 80rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
				justify-content: space-between;
				image {
          width: 32rpx;
          height: 32rpx;
					object-fit: cover;
        }
				text{
					width: 96rpx;
					height: 34rpx;
					line-height: 34rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
				}
      }
    }

    .line {
      height: 0.5px;
      background-color: #f2f3f3;
    }

    .main-body {
      .rate-header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 40rpx 32rpx;
				.text {
          margin: 0 24rpx 0 16rpx;
          font-weight: 500;
          color: #333333;
          font-size: 28rpx;
        }
				.star-container{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					
					.star-item{
						image{
							width: 36rpx;
							height: 36rpx;
							object-fit: cover;
							margin-right: 32rpx;
						}
					}
				}
			}

      .edit-evaluate {
        background-color: #ffffff;
        padding: 0 32rpx 48rpx 32rpx;  
        position: relative;
        .remark {
          background: #FAFBFC;
					padding: 24rpx 24rpx 58rpx;
					width: 686rpx;
					font-size: 28rpx;
					height: 360rpx;
					color: #333333;
					line-height: 44rpx;
					box-sizing: border-box;
					border: 0.5px solid #EEEEEE;
					border-radius: 16rpx;
        }
        .word-limit {
          position: absolute;
          right: 66rpx;
          bottom: 76rpx;
          color: #999999;
          font-size: 26rpx;
          overflow-y: auto;
        }
      }
    }
		.imageInfo {
		  padding-bottom: 44rpx;
		}
		
	//   .imageInfo {
  //     padding: 0 28rpx 36rpx 8rpx;
  //     display: flex;
  //     flex-flow: row wrap;
  //     .image-container {
  //       position: relative;
  //       .image1 {
  //         width: 156rpx;
  //         height: 156rpx;
		// 			box-sizing: border-box;
		// 			border: 0.5px solid #ECECEC;
  //         border-radius: 12rpx;
  //         object-fit: cover;
					
  //         margin-right: 16rpx;
  //         margin-bottom: 24rpx;
  //       }
  //       .image2 {
  //         position: absolute;
  //         width: 32rpx;
  //         height: 32rpx;
		// 			border-radius: 50%;
  //         object-fit: cover;
  //         top: -16rpx;
  //         right: 16rpx;
  //       }
  //     }
  //     .image-container:nth-child(4n+1) .image1 {
  //       margin-right: 18rpx;
  //     }

  //     .add-image {
		// 		padding: 24rpx 28rpx;
		// 		margin-right: 16rpx;
		// 		width: 160rpx;
		// 		height: 160rpx;
		// 		box-sizing: border-box;
  //       background: #FFFFFF;
  //       border-radius: 16rpx;
  //       border: 2rpx solid #E7E8E8;
		// 		box-sizing: border-box;
		// 		display: flex;
		// 		flex-flow: column nowrap;
		// 		align-items: center;
		// 		image{
		// 			width: 64rpx;
		// 			height: 64rpx;
		// 			object-fit: cover;
		// 		}
		// 		text{
		// 			width: 104rpx;
		// 			height: 36rpx;
		// 			line-height: 36rpx;
		// 			font-size: 26rpx;
		// 			color: #999999;
		// 		}
				
  //     }
  //   }
  
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
		font-weight: 500;
		background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);
    border-radius: 12rpx;
    font-size: 32rpx;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
  }
  
}

// 上传图片的样式

// ::v-deep .uni-file-picker{
// 	max-height: 564rpx;
// 	width:  686rpx;
// }
// ::v-deeep .file-picker__box-content, .is-add{
// 	border: 0.5px solid #ECECEC !important;
// }
// ::v-deep .file-picker__box{
// 	width: 160rpx !important;
// 	height: 160rpx !important;
// 	object-fit: cover;
// 	border-radius: 12rpx !important;
// 	border: 0.5px solid #ECECEC !important;
// 	padding-top: 0 !important;
// 	margin:0 8rpx 28rpx  0!important;
// }
// ::v-deep .file-picker__box-content{
// 	margin: 0 !important;
// }





</style>
