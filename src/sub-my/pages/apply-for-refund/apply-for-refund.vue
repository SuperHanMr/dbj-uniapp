<template>
  <view>
    <view class="container">
      <view  class="product-container">
        <view v-if="type == 'whole'"  v-for="(item,index) in refundInfo.details" :key="index">
					<view v-if="refundId">
						<order-item :refundType="true" :dataList="item"></order-item>
					</view>
					<view v-else>
						<view v-for="item2 in item.details" :key="item2.id">
							<order-item  :dataList="item2"></order-item>
						</view>
					</view>
        </view>

        <view v-if="type == 'partical'">
					<view v-if="refundId">
						<view v-for="item3 in refundInfo" :key="item3.id">
							<order-item :refundType="true" :dataList="item3"></order-item>
						</view>
					</view>
          <order-item  v-else :dataList="refundInfo"></order-item>
        </view>
				
				<!-- 运费和搬运费 -->
        <view class="price-container" >
          <view class="price-item" v-if="refundInfo.freight">
            <view  class="header" style="margin-bottom: 16rpx;">
              <text style="margin-right: 8rpx;">运费</text>
							<!-- <view class="icon">?</view>-->
							<image class="icon" src="../../../static/price_icon.svg" mode="" @click="readExpenses(1)"></image>
            
						</view>
            <text style="font-size: 28rpx;" class="price-font">￥{{handlePrice(refundInfo.freight)[0]}}.{{handlePrice(refundInfo.freight)[1]}}</text>
					</view>
          <view class="price-item" v-if="refundInfo.handlingFees">
            <view class="header">
              <text style="margin-right: 8rpx;">搬运费</text>
							<!-- <view class="icon">?</view> -->
							<image class="icon" src="../../../static/price_icon.svg" @click="readExpenses(2)" mode=""></image>
            
						</view>
            <text  style="font-size: 28rpx;" class="price-font">￥{{handlePrice(refundInfo.handlingFees)[0]}}.{{handlePrice(refundInfo.handlingFees)[1]}}</text>
					</view>
        </view>
      </view>


			<view class="refund-container">
				<view class="refund-reason">
					<view class="left">
						<view class="icon">*</view>
						<text style="color: #666666;">退款原因</text>
					</view>
					<!-- <view class="reason" v-if="!reasonName">
						<text style="color:#C7C7C7;">请选择</text>
						<image src="../../static/ic_arraw_down@2x.png" mode="" @click="openPopup()"/>
					</view>
					<view class="reason" v-else >
					  <text style="margin-right: 16rpx;" @click="openPopup()">{{reasonName}}</text>
					</view> -->
					<view class="reason" >
						<text v-if="!reasonName" @click="openPopup()">请选择</text>
						<text v-else style="margin-right: 16rpx;color: #333333;" @click="openPopup()">{{reasonName}}</text>
						<image src="../../static/ic_arraw_down.svg" mode="" @click="openPopup()"/>
					</view>
        </view>
				
				<view class="line" />
				
				<!-- <view class="refund-price" v-if="type == 'whole'">
					<view class="edit-price">
						<view class="left">
							<view class="icon">*</view>
							<text>退款金额</text>
						</view>
						<view class="right1" >
						  <text >￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0]}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}</text>
						</view>
					</view>
					<view class="tip-text">
						商品未发货，商家同意后将会全额退还。
					</view>
				</view> 
				<view class="refund-price" v-if="type == 'partical'">
					<view	v-if="showEditInput==true"	class="edit-price">
						<view class="left">
							<view class="icon">*</view>
							<text>退款金额</text>
						</view>
						<view class="right1">
							<view class="eidt-style">
								<text>￥</text>
								<input
									type="number"
									:value="inputValue"
									class="input-style"
									:focus="isFocus"
									@input="onKeyInput"
									@focus="onKeyFocus"
									@blur="onKeyBlur"
									:style="{width:inputWidth + 'rpx'}"
								/>
							</view>
						</view>
					</view>
	
					<view v-else class="show-price">
						<view class="left">
							<view class="icon">*</view>
							<text>退款金额</text>
						</view>
						<view class="right2">
							<text style="color:#FF3347;font-size: 40rpx;">￥{{inputValue==0?"0.00":inputValue}}</text>
							<image src="../../static/ic_mine_edit_gray@2x.png" mode="" @click="showEditInput=true"/>
						</view>
					</view>

					<view class="tip-text" >
						最多可以填写￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0]}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}，也可申请部分金额，以您与商家沟通协商的结果为准
					</view>
        </view> -->
				
				<view class="refund-price">
					<view class="edit-price">
						<view class="left">
							<view class="icon">*</view>
							<text style="color:#666666;">退款金额</text>
						</view>
						<view class="right1" >
						  <text v-if="refundInfo.actualIncomeAmount" class="price-font">￥{{handlePrice(refundInfo.actualIncomeAmount)[0] || 0}}.{{handlePrice(refundInfo.actualIncomeAmount)[1]}}</text>
						  <text v-else class="price-font">￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0] || 0}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}</text>
						</view>
					</view>
					<view class="tip-text">
						商品未发货，商家同意后将会全额退还。
					</view>
				</view>
			</view>

      <view class="remark-container">
        <view class="header">
          <text>备注说明</text>
         
        </view>
				<view class="body">
					<textarea
						v-model="query.remarks"
						placeholder="可以填写与客服沟通过的备注信息"
						placeholder-style="color:#AAAAAA;font-size:28rpx;padding-top:12rpx;"
						maxlength="200"
						class="remark"
						@input="onTextAreaInput"
					/>
					<text class="fontNum" style="color: #999999;font-size: 26rpx;">{{textAreaLength}}/200</text>
				</view>
      </view>
      <view class="proposal">建议与商家沟通后再发起退款</view>


      <view class="sumbit-button" :style="{paddingBottom:systemBottom}">
				<view class="buttons1" v-if="!reasonName">
					提交申请
				</view>
				<view v-else class="buttons"  @click="submitApplication" >
					提交申请
				</view>
			</view>
			
		</view>
		<expenses-toast  ref='expensesToast' :expensesType="expensesType"></expenses-toast>
  </view>

</template>

<script>
import { getRefundInfo,refundReason,wholeOrderApplyForRefund,particalOrderApplyForRefund} from "@/api/order.js";
export default {
  data() {
    return {
      query: {
        remarks: "",
				status:"",
      },
      showEditInput: false,
      inputValue: 0,
      inputWidth: 4,
      textAreaLength: 0,
      isFocus: false,

      type: "", //partical部分退款  whole整个退款
      refundInfo: {},
			
			refundReasonList:[],//退款原因
			reasonList:[],
			
			reasonValue:"",
			reasonName:"",
			
			returnMoney:"",
			
			
			refundId:"",
			orderDetailId:"",
      systemBottom: "",
			
			expensesType:"",
    };
  },
  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.containerBottom = menuButtonInfo.bottom;
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
    console.log(this.systemBottom);
  },

  onLoad(e) {
    this.type = e.type;
		if(this.type){
			this.query.orderId=Number(e.id)
			console.log("this.query.orderId=",this.query.orderId)
			this.query.status=Number(e.status);//订单状态1进行中 2已完成
			console.log("this.type=", this.type);
			if (this.type == "partical") {
				this.refundInfo = JSON.parse(
					wx.getStorageSync("particalRefundOrderInfo")
				);
				console.log("进行中数据带过来的数据：this.refundInfo=",this.refundInfo)
				this.orderDetailId = this.refundInfo.orderDetailId
				this.inputValue =  this.refundInfo.actualIncomeAmount
				this.returnMoney = this.inputValue
				console.log("this.inputValue",this.inputValue)
				console.log("this.refundInfo=", this.refundInfo, typeof this.refundInfo);
			} else {
				console.log("进行中数据带过来的数据：this.refundInfo=",this.refundInfo)
				this.refundInfo = JSON.parse(wx.getStorageSync("wholeRefundOrderInfo"));
				this.returnMoney =  this.refundInfo.totalActualIncomeAmount
			}
		}else{
			this.refundId = e.refundId
			console.log("this.refundId=",this.refundId)
			this.getReapplyRefundInfo()
		}
		// 退款原因
		this.getRefundReasonList()
  },

  watch: {
    showEditInput(newVal, oldVal) {
      if (newVal) {
        this.onKeyFocus();
      }
    },
    inputValue(newVal, oldVal) {
      return newVal;
    },
    textAreaLength(newVal, oldVal) {},
  },
  methods: {
    // 重新获取退款订单详情
    getReapplyRefundInfo() {
      getRefundInfo({ id: this.refundId }).then(data => {
        console.log("重新获取的订单信息=",data)
				this.type = data.applyMode==1?'partical':'whole'
				this.query.remarks = data.remark
				this.textAreaLength = data.remark.length
				this.reasonValue = data.reasonId
				this.reasonName = data.reason
				this.returnMoney  =data.refundAmount
				this.inputValue  = data.refundAmount
				console.log("this.type=",this.type)
				if(this.type =='partical'){
					this.refundInfo = data.detailAppVOS
					this.orderDetailId = data.detailAppVOS[0].orderDetailId
					console.log("this.refundInfo=",this.refundInfo )
				}else{
					this.refundInfo.details = data.detailAppVOS
					console.log("this.refundInfo.details = ",this.refundInfo.details)
				}
				this.refundInfo.totalActualIncomeAmount = data.maxRefundAmount
				this.query.orderId = data.orderId
				this.query.status = data.progressed
				this.refundInfo.freight = data.freight
				this.refundInfo.handlingFees = data.handlingFees
      });
    },
		
		// 获取退款原因列表
		getRefundReasonList(){
			refundReason({codeKey:"refund_reason"}).then(list=>{
				this.refundReasonList = list
				this.reasonList = list.map(item=>{
					return item.itermName
				})
			})
		},
		readExpenses(num) {
		  this.expensesType = num
		  this.$refs.expensesToast.showPupop()
		},
		
		submitApplication() {
			// 提交申请后该订单会进入到退款页面，状态显示退款中；并直接跳转到该订单退款详情页
      console.log("申请退款");
			if(this.type =='whole'){
				wholeOrderApplyForRefund({
					orderId:this.query.orderId,//订单明Id字段
					returnMoney:this.returnMoney * 100,//申请退货钱数(分)
					reason:this.reasonName, //退款原因
					reasonId:this.reasonValue,//退款原因id
					remark:this.query.remarks, //备注
					status:this.query.status, //订单状态1进行中 2已完成
				}).then(data=>{
					console.log("data=",data,"data.id=",data.id)
					uni.redirectTo({
						url:`../refund-list/refunding-detail/refunding-detail?orderId=${data.id}`
					})
				})
			}else{
				particalOrderApplyForRefund({
					orderDetailsId:this.orderDetailId,//订单明Id字段
					returnMoney:this.returnMoney * 100,//申请退货钱数(分)
					reason:this.reasonName, //退款原因
					reasonId:this.reasonValue,//退款原因id
					remark:this.query.remarks, //备注
					status:this.query.status, //订单状态1进行中 2已完成
				}).then(data=>{
					console.log("打印返回的数据=",data,"data.id=",data.id)
					uni.redirectTo({
						url:`../refund-list/refunding-detail/refunding-detail?orderId=${data.id}`
					})
				})
			}
    },

    onKeyInput(event) {
      this.inputValue = event.target.value;
			this.inputWidth = event.target.value.length * 24;
    },
    onKeyFocus() {
      this.isFocus = true;
      if (!this.inputValue) {
        this.inputValue = "";
      }
    },
    onKeyBlur() {
      // 缺少输入退款金额值的判断及弹框提示数据
      this.showEditInput = false;
      this.inputValue = Number(this.inputValue).toFixed(2);
      // console.log("this.inputValue=",this.inputValue,Number(this.inputValue).toFixed(2))
    },
		onTextAreaInput(event) {
      this.textAreaLength = event.target.value.length;
    },
		
		// 请选择原因
    openPopup() {
			uni.showActionSheet({
				itemList: this.reasonList,
				success: (res)=>{
					this.reasonName=this.reasonList[res.tapIndex]
					this.reasonValue= this.refundReasonList.filter(item=>{
						return 	item.itermName == this.reasonList[res.tapIndex]
					})[0].itermValue
					console.log("this.reasonValue=",this.reasonValue)
				},
				fail:(res)=>{
						console.log(res.errMsg);
				}
			})
    },

    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f2f3f3;
  padding-bottom: 400rpx;
  .product-container {
    margin-top: 16rpx;
    padding: 32rpx;
    background: #ffffff;
    border-radius: 24rpx;
    .deposit {
      display: flex;
      justify-content: flex-end;
      margin: 24rpx 0 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 22rpx;
      .item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        width: 302rpx;
        color: #999999;
      }
    }

    .price-container {
      .price-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        color: #808080;
        font-size: 24rpx;
        .header {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          .icon {
            width: 24rpx;
            height: 24rpx;
            // border-radius: 50%;
            line-height: 24rpx;
            text-align: center;
            // color: #999999;
            // border: 2rpx solid #999999;
          }
        }
      }
    }
  }

  .refund-container {
    margin-top: 16rpx;
    width: 100%;
    background-color: #ffffff;
    border-radius: 16rpx;
    .refund-reason {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      border-radius: 32rpx 32rpx 0 0;
      padding: 24rpx 16rpx 40rpx 32rpx;
      height: 120rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      .left {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .icon {
          color: #ff3b30;
          width: 24rpx;
          height: 28rpx;
        }
      }
      .reason {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #666666;
        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-left: 16rpx;
					margin-bottom: 8rpx;
        }
      }
    }

    .line {
      height: 0.5px;
      margin-left: 56rpx;
      background: #f2f3f3;
    }

    .refund-price {
      background-color: #ffffff;
      border-radius: 0 0 24rpx 24rpx;

      .show-price {
        padding: 28rpx 16rpx 6rpx 32rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: 28rpx;
          .icon {
            color: #ff3b30;
            width: 24rpx;
            height: 28rpx;
          }
        }
        .right2 {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: #666666;
          image {
            width: 64rpx;
            height: 64rpx;
            object-fit: cover;
            margin-left: 16rpx;
          }
        }
      }

      .edit-price {
        padding: 40rpx 32rpx 16rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: 28rpx;
          .icon {
            color: #ff3b30;
            width: 24rpx;
            height: 28rpx;
          }
        }
        .right1 {
          color: #ff3347;
          font-size: 40rpx;
          line-height: 40rpx;
          .eidt-style {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #ff3347;
            .input-style {
              // background-color: #f3f3f3;
              color: #ff3347;
              font-size: 20px;
              margin-right: 80rpx;
            }
          }
        }
      }
      .tip-text {
        padding: 0 32rpx 40rpx 56rpx;
        color: #aaaaaa;
        font-size: 24rpx;
        line-height: 38rpx;
        border-radius: 0 0 24rpx 24rpx;
      }
    }
  }

  .remark-container {
    margin-top: 16rpx;
    background-color: #ffffff;
    padding: 40rpx 32rpx;
    border-radius: 16rpx;
    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;
      font-size: 28rpx;
      color: #666666;
    }
		.body{
			position: relative;
			.remark {
				background-color: #FAFBFC;
				width: 686rpx;
				height: 388rpx;
				box-sizing: border-box;
				border-radius: 16rpx;
				padding: 24rpx;
				border: 0.5px solid #EEEEEE;
			}
			.fontNum{
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
			}
		}
  }
  .proposal {
    padding: 24rpx 32rpx;
    color: #808080;
    font-size: 24rpx;
    line-height: 34rpx;
  }

  .sumbit-button {
    position: fixed;
    bottom: 0;
    width: 686rpx;
    background-color: #ffffff;
    padding: 24rpx 34rpx;
    .buttons {
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 12rpx;
			font-weight: bold ;
      background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);
      font-size: 32rpx;
      color: #ffffff;
    }
		.buttons1 {
		  height: 88rpx;
		  line-height: 88rpx;
		  text-align: center;
			font-weight: bold ;
		  border-radius: 12rpx;
		  background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);
			opacity: 0.5;
		  font-size: 32rpx;
		  color: #ffffff;
		}
  }
}


</style>
